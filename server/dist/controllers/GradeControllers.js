"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GradeController = void 0;
const gradeRepositories_1 = require("../repositories/gradeRepositories");
const date_fns_1 = require("date-fns");
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
function getNearestMonday(date) {
    date = new Date(date);
    // console.log (date.getUTCDay())
    //if is sunday return next monday
    if (date.getUTCDay() === 0) {
        const nextMonday = (0, date_fns_1.addDays)(date, 1);
        return nextMonday;
    }
    const nearestMonday = (0, date_fns_1.setDay)((0, date_fns_1.startOfWeek)(date), 1);
    return nearestMonday;
}
function formatDateForSQL(date) {
    return date.toISOString();
}
class GradeController {
    getDashboardData(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('get grade');
            const { semestre } = request.body;
            const { date } = request.body;
            // console.log(date)
            const nearestMonday = getNearestMonday(date);
            // console.log(nearestMonday)
            const nextFriday = (0, date_fns_1.addDays)(nearestMonday, 4);
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
            `;
                const gradeWithProfessor = yield gradeRepositories_1.gradeRepositories.query(query);
                //pesdquisar sobre os agendamentos de cada grade e retornar junto com a grade
                const gradeWithAgendamento = yield Promise.all(gradeWithProfessor.map((grade) => __awaiter(this, void 0, void 0, function* () {
                    const id_grade = grade.id;
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
            date BETWEEN '${formatDateForSQL(nearestMonday)}' AND '${formatDateForSQL(nextFriday)}'
          `;
                    const agendamentos = yield gradeRepositories_1.gradeRepositories.query(queryAgendamento);
                    grade.agendamentos = agendamentos || [];
                    return grade;
                })));
                //  console.log(JSON.stringify(gradeWithAgendamento))
                return response.status(200).json(gradeWithAgendamento);
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ message: 'internal server error' });
            }
        });
    }
    getAgendamentosData(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('getAgendamentosData');
            const { semestre, professor_id } = request.body;
            // console.log(request.body)
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
                const gradeWithProfessor = yield gradeRepositories_1.gradeRepositories.query(query);
                // console.log(gradeWithProfessor);
                //coint the items in the array
                const count = gradeWithProfessor.length;
                // console.log(count);
                // For each grade, retrieve associated agendamentos
                const gradeWithAgendamento = yield Promise.all(gradeWithProfessor.map((grade) => __awaiter(this, void 0, void 0, function* () {
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
            LEFT JOIN
              professores ON CAST(id_professor AS INTEGER) = professores.id
            LEFT JOIN
              laboratorios ON CAST(id_laboratorio AS INTEGER) = laboratorios.id
            WHERE
              id_grade = '${id_grade}'
          `;
                    const agendamentos = yield gradeRepositories_1.gradeRepositories.query(queryAgendamento);
                    grade.agendamentos = agendamentos || [];
                    return grade;
                })));
                // console.log(gradeWithAgendamento);
                return response.status(200).json(gradeWithAgendamento);
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ message: 'internal server error' });
            }
        });
    }
}
exports.GradeController = GradeController;
