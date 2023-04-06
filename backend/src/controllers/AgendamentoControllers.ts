import { Request, Response } from 'express'
import { agendamentosRepository } from '../repositories/agendamentoRepository'
import { gradeRepositories } from '../repositories/gradeRepositories'

export class AgendamentoController {
  async create (request: Request, response: Response) {
    console.log('create agendamento')

    const { date, id_professor, ids_grade, id_laboratorio } = request.body

    if (!date || !id_professor || !ids_grade || !id_laboratorio)
      return response.status(400).json({ message: 'missing data' })

    console.log(date, id_professor, ids_grade, id_laboratorio)

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
          id_grade,
          id_laboratorio,
          created_at: new Date(),
          updated_at: new Date()
        })

        await agendamentosRepository.save(newAgendamento)

        console.log(`agendamento created with id ${newAgendamento.id}`)
      } catch (error) {
        console.log(error)
        return response.status(500).json({ message: 'internal server error' })
      }
    })

    return response.status(201).json({ message: 'agendamento created' })
  }

  async get (request: Request, response: Response) {
    console.log('get agendamento')

    try {
      const agendamentos = await agendamentosRepository.find()

      console.log(JSON.stringify(agendamentos, null, 2))

      // const newAgendamento = await agendamentos.map(
      //   async (agendamento: any) => {
      //     const id_professor = agendamento.id_professor
        
          
      //     const id_laboratorio = agendamento.id_laboratorio

      //     const queryProfessor = ` SELECT nome_completo FROM professores WHERE id = ${id_professor} `

      //     const queryLaboratorio = ` SELECT descricao FROM laboratorios WHERE id = ${id_laboratorio} `

      //     // const queryGrade = ` SELECT nome FROM grade WHERE id = ${id_grade} `
      //     // const queryDiscipla = ` SELECT nome FROM disciplina WHERE id = ${} `
      //     // const nomeDisciplina = await gradeRepositories.query(queryGrade)

      //     const nomeProfessor = await gradeRepositories.query(queryProfessor)
      //     const nomeLaboratorio = await gradeRepositories.query(
      //       queryLaboratorio
      //     )

      //     agendamento.nome_professor = nomeProfessor[0].nome
      //     // agendamento.nome_grade = nomeGrade[0].nome
      //     agendamento.nome_laboratorio = nomeLaboratorio[0].nome

      //     return [
      //       ...agendamento,
      //       agendamento.nome_professor,
      //       // agendamento.nome_grade,
      //       agendamento.nome_laboratorio
      //     ]
      //   }
      // )
      // console.log(newAgendamento)

      // const NomeProfessor = await gradeRepositories.query(` SELECT nome FROM professor WHERE id = ${id_professor} `);
      // console.log(NomeProfessor)

      return response.status(200).json(agendamentos)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }
}
