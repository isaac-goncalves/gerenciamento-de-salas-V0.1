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

    const { date, id_professor, ids_grade, id_laboratorio, uuid_agendamento } =
      request.body

    if (!date || !id_professor || !ids_grade || !id_laboratorio)
      return response.status(400).json({ message: 'missing data' })

    // console.log(date, id_professor, ids_grade, id_laboratorio)

    if (ids_grade.length === 0)
      return response.status(400).json({ message: 'missing data' })

    function generateID () {
      const randomNumber = Math.floor(Math.random() * 100000) // Generate a random number between 0 and 99999
      const paddedNumber = randomNumber.toString().padStart(5, '0') // Pad the number with leading zeros if necessary
      const id = `#${paddedNumber}` // Concatenate the "#" symbol with the padded number
      return id
    }

    let uniqueId = uuid_agendamento ? uuid_agendamento : generateID()

    if (uuid_agendamento == '-') {
      uniqueId = generateID()
    }

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

  async delete (request: Request, response: Response) {
    const ids = request.body.ids
    try {
      // console.log(ids)
      ids.map(async (idAgendamento: any) => {
        const options: FindOneOptions<Agendamento> = {
          where: { id: idAgendamento }
        }

        const agendamento = await agendamentosRepository.findOne(options)

        if (!agendamento) {
          return response.status(404).json({ message: 'Agendamento not found' })
        }

        await agendamentosRepository.delete(idAgendamento)

        console.log(`Agendamento with id ${idAgendamento} deleted`)
      })
      return response.status(200).json({ message: 'Agendamento deleted' })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async update (request: Request, response: Response) {
    const id = Number(request.params.id)

    const { date, id_professor, id_laboratorio, uuid_agendamento } =
      request.body

    console.log(date, id_professor, id_laboratorio, uuid_agendamento)

    try {
      const options: FindOneOptions<Agendamento> = {
        where: { uuid_agendamento: uuid_agendamento }
      }
      //grab all agendamentes with thar uuid_agendamento
      const agendamentos = await agendamentosRepository.find(options)

      console.log(agendamentos)

      if (agendamentos.length === 0) {
        return response.status(404).json({ message: 'Agendamento not found' })
      }

      //update all agendamentos with that uuid_agendamento
      agendamentos.forEach(agendamento => {
        agendamento.date = date
        agendamento.id_professor = id_professor
        agendamento.id_laboratorio = id_laboratorio
        agendamento.updated_at = new Date()
      })

      // Save the updated agendamentos
      await agendamentosRepository.save(agendamentos)

      return response.status(200).json({ message: 'Agendamento updated' })
    } catch (error) {
      console.error(error)
      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async get (request: Request, response: Response) {
    console.log('get agendamento')

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
          // console.log(nomeProfessor)

          agendamento.nome_professor = nomeProfessor[0]?.name || ''

          return agendamento
        })
      )

      // console.log(JSON.stringify(agendamentoWithProfessorName, null, 2))

      return response.status(200).json(agendamentos)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async getLaboratoriosSchedule (request: Request, response: Response) {
    try {
      const { date } = request.body
      // console.log('get Schedules ' + date + '------------------------')
      // console.log(date)

      const isoDate = new Date(date)
      isoDate.setHours(0, 0, 0, 0)

      const allAgendamentos = await agendamentosRepository.find()

      const agendamentos = allAgendamentos.filter(a =>
        isSameDay(new Date(a.date), isoDate)
      )

      // console.log(agendamentos)

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

      // console.log(newProfessores)

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

  async getGroupedById (request: Request, response: Response) {
    console.log('getGroupedById')
    const { uuid_agendamento, date, laboratory_id, action } = request.body

    console.log(uuid_agendamento, date, laboratory_id, action)

    let query = null

    // if (uuid_agendamento == '-') {
    //   console.log('uuid_agendamento == -')
    //   query = `
    //   SELECT *
    //   FROM agendamento
    //   WHERE DATE_TRUNC('day', date) = DATE_TRUNC('day', '${date}'::timestamp)
    //   AND id_laboratorio = ${laboratory_id}
    //   `
    // } 
     if (laboratory_id == undefined) {
      console.log('laboratory_id == undefined')
      query = `
      SELECT * 
      FROM agendamento 
      AND DATE_TRUNC('day', date) = DATE_TRUNC('day', '${date}'::timestamp)
      `
    } else {
      console.log('full query when editing')
        console.log('full query when creating only')
        query = `
        SELECT * 
        FROM agendamento 
        WHERE id_laboratorio = ${laboratory_id}
        AND DATE_TRUNC('day', date) = DATE_TRUNC('day', '${date}'::timestamp)`

      }
    

    try {
      // Retrieve grade data for the specified professor and semester
      if (date == undefined) {
        return response.status(200).json([
          {
            message: 'no data'
          }
        ])
      }
      const gradeGroupedById = await agendamentosRepository.query(query)

      console.log(gradeGroupedById)

      return response.status(200).json(gradeGroupedById)
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
