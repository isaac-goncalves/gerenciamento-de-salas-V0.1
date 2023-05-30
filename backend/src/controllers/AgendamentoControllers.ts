import { Request, Response } from 'express'
import { agendamentosRepository } from '../repositories/agendamentoRepository'
import { gradeRepositories } from '../repositories/gradeRepositories'
import { professoresRepository } from '../repositories/professoresRepositories'
import { FindOneOptions } from 'typeorm'
import { Agendamento } from '../entities/Agendamento'
import { isSameDay } from 'date-fns'
const { v4: uuidv4 } = require('uuid')

export class AgendamentoController {
  async create (request: Request, response: Response) {
    console.log('create agendamento')

    const { date, id_professor, ids_grade, id_laboratorio } = request.body

    if (!date || !id_professor || !ids_grade || !id_laboratorio)
      return response.status(400).json({ message: 'missing data' })

    console.log(date, id_professor, ids_grade, id_laboratorio)

    if (ids_grade.length === 0)
      return response.status(400).json({ message: 'missing data' })

    //create  unique identifier for agendamento and store on uuid_agendamento

    function generateID () {
      const randomNumber = Math.floor(Math.random() * 100000) // Generate a random number between 0 and 99999
      const paddedNumber = randomNumber.toString().padStart(5, '0') // Pad the number with leading zeros if necessary
      const id = `#${paddedNumber}` // Concatenate the "#" symbol with the padded number
      return id
    }

    // Usage example
    const uniqueId = generateID()

    ids_grade.forEach(async (id_grade: any) => {
      const query = ` SELECT horario_inicio, horario_fim FROM grade WHERE id = ${id_grade} `

      const horariosImportadosGrade = await gradeRepositories.query(query)

      console.log(horariosImportadosGrade)

      const horario_inicio = horariosImportadosGrade[0].horario_inicio
      const horario_fim = horariosImportadosGrade[0].horario_fim

      try {
        const newAgendamento = agendamentosRepository.create({
          date,
          horario_inicio,
          horario_fim,
          id_professor,
          uuid_agendamento: uniqueId,
          id_grade,
          id_laboratorio,
          created_at: new Date(),
          updated_at: new Date()
        })

        await agendamentosRepository.save(newAgendamento)

        console.log(
          `agendamento created with id ${newAgendamento.id} and uuid ${uniqueId}`
        )
      } catch (error) {
        console.log(error)
        return response.status(500).json({ message: 'internal server error' })
      }
    })

    return response.status(201).json({ message: 'agendamento created' })
  }

  async get (request: Request, response: Response) {
    console.log('GET agendamento')

    try {
      const agendamentos = await agendamentosRepository.find()

      agendamentos.sort((a, b) => {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
      })

      //grab professor_id find his name

      const agendamentoWithProfessorName = await Promise.all(
        agendamentos.map(async (agendamento: any) => {
          const id_professor = agendamento.id_professor

          const queryProfessor = ` SELECT name FROM professores WHERE id = ${id_professor} `
          const nomeProfessor = await gradeRepositories.query(queryProfessor)
          console.log(nomeProfessor)

          agendamento.nome_professor = nomeProfessor[0]?.name || ''

          return agendamento
        })
      )

      console.log(JSON.stringify(agendamentoWithProfessorName, null, 2))

      return response.status(200).json(agendamentos)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async getLaboratoriosSchedule (request: Request, response: Response) {
    try {
      const { date } = request.body
      console.log('get Schedules ' + date + '------------------------')
      console.log(date)

      const isoDate = new Date(date)
      isoDate.setHours(0, 0, 0, 0)

      const allAgendamentos = await agendamentosRepository.find()

      const agendamentos = allAgendamentos.filter(a =>
        isSameDay(new Date(a.date), isoDate)
      )

      console.log(agendamentos)

      //#TODO - get all professors names DONE

      //----------------------------------------------------
      const allProfessors = await professoresRepository.find()

      const newProfessores = await allProfessors.map((professor: any) => {
        const id = professor.id
        const name = professor.name
        const obj = {
          id: id,
          name: name
        }
        return obj
      })

      console.log(newProfessores)

      //atualizando os agendamentos com os nomes dos professores

      const updatedAgendamentos = agendamentos.map(agendamento => {
        // Find the professor with the same id as the current Agendamento's id_professor
        const professor = allProfessors.find(
          prof => prof.id === agendamento.id_professor
        )

        // Return a new object with all of the original Agendamento properties and the professor_name
        return {
          ...agendamento,
          professor_name: professor ? professor.name : null
        }
      })

      // console.log(updatedAgendamentos);

      //----------------------------------------------------
      //#TODO - gmake ids go from 1 to ++ - DOING

      //----------------------------------------------------
      let scheduleData: any = {}

      let slotIdCounter = 1

      // Create schedule for each laboratory
      for (let lab = 1; lab <= 7; lab++) {
        let labSchedule = []

        for (let i = 1; i <= 5; i++) {
          let agendamento = updatedAgendamentos.find(
            a =>
              new Date(a.date).getDay() == lab &&
              getTimeSlot(a.horario_inicio) == i
          )

          let slotData = {
            id: slotIdCounter,
            disponivel: agendamento ? false : true,
            agendamento: agendamento ? agendamento : undefined
          }

          labSchedule.push(slotData)
          slotIdCounter++
        }

        scheduleData[`laboratorio${lab}`] = labSchedule
      }

      return response.status(200).json(scheduleData)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async delete (request: Request, response: Response) {
    const id = Number(request.params.id)

    try {
      const options: FindOneOptions<Agendamento> = {
        where: { id: id }
      }

      const agendamento = await agendamentosRepository.findOne(options)

      if (!agendamento) {
        return response.status(404).json({ message: 'Agendamento not found' })
      }

      await agendamentosRepository.delete(id)

      console.log(`Agendamento with id ${id} deleted`)

      return response.status(204).send()
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async update (request: Request, response: Response) {
    const id = Number(request.params.id)
    const {
      date,
      horario_inicio,
      horario_fim,
      id_professor,
      id_grade,
      id_laboratorio
    } = request.body

    // console.log(
    //   id,
    //   date,
    //   horario_inicio,
    //   horario_fim,
    //   id_professor,
    //   id_grade,
    //   id_laboratorio
    // )

    try {
      const options: FindOneOptions<Agendamento> = {
        where: { id: id }
        // other options here, such as relations or order
      }

      const agendamento = await agendamentosRepository.findOne(options)

      if (!agendamento) {
        return response.status(404).json({ message: 'Agendamento not found' })
      }

      agendamentosRepository.merge(agendamento, {
        date,
        horario_inicio,
        horario_fim,
        id_professor,
        id_grade,
        id_laboratorio,
        updated_at: new Date()
      })

      const results = await agendamentosRepository.save(agendamento)

      console.log(`Agendamento with id ${id} updated`)

      return response.status(200).json(results)
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Internal server error' })
    }
  }
  async getGrouped (request: Request, response: Response) {
    console.log('GET agendamento ByID')

    try {
      const agendamentos = await agendamentosRepository.find()

      agendamentos.sort((a, b) => {
        return (
          new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
      })

      //grab professor_id find his name

      const agendamentoWithProfessorName = await Promise.all(
        agendamentos.map(async (agendamento: any) => {
          const id_professor = agendamento.id_professor

          const queryProfessor = ` SELECT name FROM professores WHERE id = ${id_professor} `
          const nomeProfessor = await gradeRepositories.query(queryProfessor)
          console.log(nomeProfessor)

          agendamento.nome_professor = nomeProfessor[0]?.name || ''

          return agendamento
        })
      )

      console.log(JSON.stringify(agendamentoWithProfessorName, null, 2))

      // Group by uuid_agendamento
      const groupedAgendamentos: Record<string, any[]> = {}
      agendamentoWithProfessorName.forEach((agendamento: any) => {
        const uuidAgendamento = agendamento.uuid_agendamento
        if (!groupedAgendamentos[uuidAgendamento]) {
          groupedAgendamentos[uuidAgendamento] = []
        }
        groupedAgendamentos[uuidAgendamento].push(agendamento)
      })

      console.log(JSON.stringify(groupedAgendamentos, null, 2))

      return response.status(200).json(agendamentos)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }
}
function getTimeSlot (horario_inicio: string): number {
  switch (horario_inicio) {
    case '18:45':
      return 1
    case '19:35':
      return 2
    case '20:25':
      return 3
    case '20:35':
      return 4
    case '21:25':
      return 5
    default:
      // you might want to throw an error here if the given time does not match any slot
      return -1
  }
}
