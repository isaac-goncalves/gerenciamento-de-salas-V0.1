import { Request, Response } from 'express'

import { gradeRepositories } from '../repositories/gradeRepositories'
import { agendamentosRepository } from '../repositories/agendamentoRepository'
import { addDays, nextFriday, setDay, startOfWeek } from 'date-fns'
import { semestresRepository } from '../repositories/semestresRepository'
// import { professoresRepository } from "../repositories/professoresRepository";
// import { laboratoriosRepository } from "../repositories/laboratoriosRepository";
// import { disciplinasRepository } from "../repositories/disciplinasRepositories";
// import { dia_da_semanaRepositories } from "../repositories/dia_da_semanaRepositories";

// interface IGrade {
//     id: number;
//     horario_inicio: Date;
//     horario_fim: Date;
//     id_professor: string;
//     dia_da_semana: string;
//     id_disciplina: string;
//     id_sala: string;
//     semestre: string;
//     created_at: Date;
//     updated_at: Date;
// }

function getNearestMonday (date: Date) {
  date = new Date(date)

  // console.log (date.getUTCDay())

  //if is sunday return next monday
  if (date.getUTCDay() === 0) {
    const nextMonday = addDays(date, 1)
    return nextMonday
  }
  const nearestMonday = setDay(startOfWeek(date), 1)
  return nearestMonday
}

function formatDateForSQL (date: Date) {
  return date.toISOString()
}

export class GradeController {
  async getDashboardData (request: Request, response: Response) {
    console.log('get grade')

    const { semestre } = request.body
    const { date } = request.body

    // console.log(date)

    try {
      //pegar conteudo da tabela grade juntando os ids dos professores com a disciplina e o laboratorio
      //pegar o semestre da pessoa e filtrar tambem

      const query = `
                  SELECT 
                  grade.id, 
                  grade.horario_inicio, 
                  grade.horario_fim, 
                  grade.dia_da_semana, 
                  grade.semestre, 
                  grade.created_at, 
                  grade.updated_at, 
                  professores.name as professor, 
                  disciplinas.descricao as disciplina, 
                  disciplinas.capacidade as capacidade,
                  laboratorios.descricao as laboratorio 
              FROM 
                  grade 
              LEFT JOIN 
                  professores ON grade.id_professor = professores.id 
              LEFT JOIN 
                  disciplinas ON grade.id_disciplina = disciplinas.id 
              LEFT JOIN 
                  laboratorios ON grade.id_sala = laboratorios.id 
              WHERE 
                  grade.semestre = '${semestre}' 
              ORDER BY
                  grade.id ASC
            `

      const gradeWithProfessor = await gradeRepositories.query(query)

      //pesdquisar sobre os agendamentos de cada grade e retornar junto com a grade

      const gradeWithAgendamento = await Promise.all(
        gradeWithProfessor.map(async (grade: any) => {
          const id_grade = grade.id

          const nearestMonday = getNearestMonday(date)

          console.log(nearestMonday)

          const nextSaturnDay = addDays(nearestMonday, 5)

          console.log(nextSaturnDay)

          const queryAgendamento = `
            SELECT
            agendamento.id as id,
            date,
            uuid_agendamento,
            horario_inicio,
            horario_fim,
            id_professor,
            id_grade,
            id_laboratorio,
            professores.name as professor,
            laboratorios.descricao as laboratorio,
            laboratorios.capacidade as capacidade,
            agendamento.updated_at,
            agendamento.created_at
            FROM
            agendamento
            LEFT JOIN
            professores ON id_professor = professores.id
            LEFT JOIN
            laboratorios ON id_laboratorio = laboratorios.id
            WHERE
            id_grade = '${id_grade}'
            AND 
            agendamento.date BETWEEN '${formatDateForSQL(
              nearestMonday
            )}' AND '${formatDateForSQL(nextSaturnDay)}'
          `
          const agendamentos = await gradeRepositories.query(queryAgendamento)

          //remove 3 hours from date to match the timezone

          if (agendamentos[0] && agendamentos[0].date) {
            const newDate = new Date(agendamentos[0].date)

            newDate.setHours(newDate.getHours() - 3)

            agendamentos[0].date = newDate
          }

          grade.agendamentos = agendamentos || []

          return grade
        })
      )

      //  console.log(JSON.stringify(gradeWithAgendamento))

      return response.status(200).json(gradeWithAgendamento)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async getAgendamentosData (request: Request, response: Response) {
    console.log('getAgendamentosData')
    const { semestre, professor_id, id_laboratorio } = request.body
    console.log(request.body)

    try {
      if (id_laboratorio) {
        //fetach all agendamentos with laboratory id as

        const query = ` 
        SELECT
        agendamento.id as id,
        date,
        uuid_agendamento,
        horario_inicio,
        horario_fim,
        id_professor,
        id_grade,
        id_laboratorio,
        professores.name as professor,
        laboratorios.descricao as laboratorio,
        laboratorios.capacidade as capacidade,
        agendamento.updated_at,
        agendamento.created_at
        FROM
        agendamento
        LEFT JOIN
        professores ON id_professor = professores.id
        LEFT JOIN
        laboratorios ON id_laboratorio = laboratorios.id
        WHERE
        id_laboratorio = '${id_laboratorio}'
        AND schedule_status = 'fixed'
        `

        const agendamentos = await gradeRepositories.query(query)
        //grab all grage data where id_grade - gradeID

        console.log(agendamentos)


        const gradesWithAgendamentoFixed = await Promise.all(agendamentos.map(async (agendamento: any) => {
          const grade: any = await gradeRepositories.findOneBy({
            id: agendamento.id_grade
          });
        
          console.log(grade);
        
          grade.agendamentos = [agendamento];
        
          console.log(grade);
        
          return grade;
        }));

        // AND
        // agendamento.date BETWEEN '${formatDateForSQL(
        //   getNearestMonday(new Date())
        // )}' AND '${formatDateForSQL(nextFriday(new Date()))}'

        console.log(gradesWithAgendamentoFixed)

        return response.status(200).json(gradesWithAgendamentoFixed)
      } else {
        // Retrieve grade data for the specified professor and semester
        const query = `
        SELECT 
          grade.id, 
          grade.horario_inicio, 
          grade.horario_fim, 
          grade.dia_da_semana, 
          grade.semestre, 
          grade.created_at, 
          grade.updated_at, 
          professores.name as professor, 
          disciplinas.descricao as disciplina, 
          disciplinas.capacidade as capacidade,
          laboratorios.descricao as laboratorio 
        FROM 
          grade 
        LEFT JOIN 
          professores ON grade.id_professor = professores.id 
        LEFT JOIN 
          disciplinas ON grade.id_disciplina = disciplinas.id 
        LEFT JOIN 
          laboratorios ON grade.id_sala = laboratorios.id 
        WHERE 
          grade.id_professor = '${professor_id}'
        ORDER BY
          grade.id ASC
      `
        const gradeWithProfessor = await gradeRepositories.query(query)
        // console.log(gradeWithProfessor);

        //coint the items in the array
        const count = gradeWithProfessor.length
        // console.log(count);

        // For each grade, retrieve associated agendamentos
        const gradeWithAgendamento = await Promise.all(
          gradeWithProfessor.map(async (grade: any) => {
            const id_grade = grade.id

            const queryAgendamento = `
            SELECT
              agendamento.id as id_agendamento,
              date,
              horario_inicio,
              horario_fim,
              id_professor,
              id_grade,
              id_laboratorio,
              professores.name as professor,
              laboratorios.descricao as laboratorio
            FROM
              agendamento
            LEFT JOIN
              professores ON CAST(id_professor AS INTEGER) = professores.id
            LEFT JOIN
              laboratorios ON CAST(id_laboratorio AS INTEGER) = laboratorios.id
            WHERE
              id_grade = '${id_grade}'
          `
            const agendamentos = await gradeRepositories.query(queryAgendamento)

            grade.agendamentos = agendamentos || []

            return grade
          })
        )

        // console.log(gradeWithAgendamento);

        return response.status(200).json(gradeWithAgendamento)
      }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async getGradesByProfessorsAndDisciplinas (
    request: Request,
    response: Response
  ) {
    const { dia_da_semana, professor_id, semestre } = request.body

    const query = `
    SELECT
    grade.id,
    grade.horario_inicio,
    grade.horario_fim,
    grade.id_professor,
    grade.id_disciplina,
    grade.id_sala,
    grade.semestre,
    grade.created_at,
    grade.updated_at,
    professores.name as professor,
    disciplinas.descricao as disciplina,
    disciplinas.capacidade as capacidade,
    laboratorios.descricao as laboratorio
    FROM
    grade
    LEFT JOIN
    professores ON grade.id_professor = professores.id
    LEFT JOIN
    disciplinas ON grade.id_disciplina = disciplinas.id
    LEFT JOIN

    laboratorios ON grade.id_sala = laboratorios.id
    WHERE
    grade.id_professor = '${professor_id}'
    AND
    grade.semestre = '${semestre}'
    AND
    grade.dia_da_semana = '${dia_da_semana}'
    ORDER BY
    grade.id ASC
    `
    try {
      const grades = await gradeRepositories.query(query)

      return response.status(200).json(grades)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async getSemester (request: Request, response: Response) {
    const query = `
    SELECT *
    FROM
    semestres
    `
    const semesters = await semestresRepository.query(query)

    return response.status(200).json(semesters)
  }
}
