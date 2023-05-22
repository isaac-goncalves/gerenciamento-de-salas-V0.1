import { Request, Response } from 'express'

import { gradeRepositories } from '../repositories/gradeRepositories'
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

export class GradeController {
  async getDashboardData (request: Request, response: Response) {
    console.log('get grade')
    const { semestre } = request.body
    console.log(request.body)

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
            INNER JOIN
            professores ON CAST(id_professor AS INTEGER) = professores.id
            INNER JOIN
            laboratorios ON CAST(id_laboratorio AS INTEGER) = laboratorios.id
            WHERE
            id_grade = '${id_grade}'
          `
          const agendamentos = await gradeRepositories.query(queryAgendamento)

          grade.agendamentos = agendamentos || []

          return grade
        })
      )

      console.log(gradeWithAgendamento)

      return response.status(200).json(gradeWithProfessor)
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }
  async getAgendamentosData(request: Request, response: Response) {
    console.log("get grade");
    const { semestre, professor_id } = request.body;
    console.log(request.body);
  
    try {
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
      `;
      const gradeWithProfessor = await gradeRepositories.query(query);
      // console.log(gradeWithProfessor);
      
      //coint the items in the array
      const count = gradeWithProfessor.length;
      console.log(count);

      // For each grade, retrieve associated agendamentos
      const gradeWithAgendamento = await Promise.all(
        gradeWithProfessor.map(async (grade: any) => {
          const id_grade = grade.id;
  
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
            INNER JOIN
              professores ON CAST(id_professor AS INTEGER) = professores.id
            INNER JOIN
              laboratorios ON CAST(id_laboratorio AS INTEGER) = laboratorios.id
            WHERE
              id_grade = '${id_grade}'
          `;
          const agendamentos = await gradeRepositories.query(queryAgendamento);
  
          grade.agendamentos = agendamentos || [];
  
          return grade;
        })
      );
  
      // console.log(gradeWithAgendamento);
  
      return response.status(200).json(gradeWithAgendamento);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "internal server error" });
    }
  }
}
