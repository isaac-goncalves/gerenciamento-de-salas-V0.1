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
exports.AgendamentoController = void 0;
const agendamentoRepository_1 = require("../repositories/agendamentoRepository");
const gradeRepositories_1 = require("../repositories/gradeRepositories");
const professoresRepositories_1 = require("../repositories/professoresRepositories");
const date_fns_1 = require("date-fns");
const { v4: uuidv4 } = require('uuid');
class AgendamentoController {
    create(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('create agendamento');
            const { date, id_professor, ids_grade, id_laboratorio } = request.body;
            if (!date || !id_professor || !ids_grade || !id_laboratorio)
                return response.status(400).json({ message: 'missing data' });
            console.log(date, id_professor, ids_grade, id_laboratorio);
            if (ids_grade.length === 0)
                return response.status(400).json({ message: 'missing data' });
            //create  unique identifier for agendamento and store on uuid_agendamento
            function generateID() {
                const randomNumber = Math.floor(Math.random() * 100000); // Generate a random number between 0 and 99999
                const paddedNumber = randomNumber.toString().padStart(5, '0'); // Pad the number with leading zeros if necessary
                const id = `#${paddedNumber}`; // Concatenate the "#" symbol with the padded number
                return id;
            }
            // Usage example
            const uniqueId = generateID();
            ids_grade.forEach((id_grade) => __awaiter(this, void 0, void 0, function* () {
                const query = ` SELECT horario_inicio, horario_fim FROM grade WHERE id = ${id_grade} `;
                const horariosImportadosGrade = yield gradeRepositories_1.gradeRepositories.query(query);
                console.log(horariosImportadosGrade);
                const horario_inicio = horariosImportadosGrade[0].horario_inicio;
                const horario_fim = horariosImportadosGrade[0].horario_fim;
                try {
                    const newAgendamento = agendamentoRepository_1.agendamentosRepository.create({
                        date,
                        horario_inicio,
                        horario_fim,
                        id_professor,
                        uuid_agendamento: uniqueId,
                        id_grade,
                        id_laboratorio,
                        created_at: new Date(),
                        updated_at: new Date()
                    });
                    yield agendamentoRepository_1.agendamentosRepository.save(newAgendamento);
                    console.log(`agendamento created with id ${newAgendamento.id} and uuid ${uniqueId}`);
                }
                catch (error) {
                    console.log(error);
                    return response.status(500).json({ message: 'internal server error' });
                }
            }));
            return response.status(201).json({ message: 'agendamento created' });
        });
    }
    get(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('GET agendamento');
            try {
                const agendamentos = yield agendamentoRepository_1.agendamentosRepository.find();
                agendamentos.sort((a, b) => {
                    return (new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
                });
                //grab professor_id find his name
                const agendamentoWithProfessorName = yield Promise.all(agendamentos.map((agendamento) => __awaiter(this, void 0, void 0, function* () {
                    var _a;
                    const id_professor = agendamento.id_professor;
                    const queryProfessor = ` SELECT name FROM professores WHERE id = ${id_professor} `;
                    const nomeProfessor = yield gradeRepositories_1.gradeRepositories.query(queryProfessor);
                    console.log(nomeProfessor);
                    agendamento.nome_professor = ((_a = nomeProfessor[0]) === null || _a === void 0 ? void 0 : _a.name) || '';
                    return agendamento;
                })));
                console.log(JSON.stringify(agendamentoWithProfessorName, null, 2));
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
                return response.status(200).json(agendamentos);
            }
            catch (error) {
                console.log(error);
                return response.status(500).json({ message: 'internal server error' });
            }
        });
    }
    getLaboratoriosSchedule(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { date } = request.body;
                console.log('get Schedules ' + date + '------------------------');
                console.log(date);
                const isoDate = new Date(date);
                isoDate.setHours(0, 0, 0, 0);
                const allAgendamentos = yield agendamentoRepository_1.agendamentosRepository.find();
                const agendamentos = allAgendamentos.filter(a => (0, date_fns_1.isSameDay)(new Date(a.date), isoDate));
                console.log(agendamentos);
                //#TODO - get all professors names DONE
                //----------------------------------------------------
                const allProfessors = yield professoresRepositories_1.professoresRepository.find();
                const newProfessores = yield allProfessors.map((professor) => {
                    const id = professor.id;
                    const name = professor.name;
                    const obj = {
                        id: id,
                        name: name
                    };
                    return obj;
                });
                console.log(newProfessores);
                //atualizando os agendamentos com os nomes dos professores
                const updatedAgendamentos = agendamentos.map(agendamento => {
                    // Find the professor with the same id as the current Agendamento's id_professor
                    const professor = allProfessors.find(prof => prof.id === agendamento.id_professor);
                    // Return a new object with all of the original Agendamento properties and the professor_name
                    return Object.assign(Object.assign({}, agendamento), { professor_name: professor ? professor.name : null });
                });
                // console.log(updatedAgendamentos);
                //----------------------------------------------------      
                //#TODO - gmake ids go from 1 to ++ - DOING
                //----------------------------------------------------
                let scheduleData = {};
                let slotIdCounter = 1;
                // Create schedule for each laboratory
                for (let lab = 1; lab <= 7; lab++) {
                    let labSchedule = [];
                    for (let i = 1; i <= 5; i++) {
                        let agendamento = updatedAgendamentos.find(a => new Date(a.date).getDay() == lab &&
                            getTimeSlot(a.horario_inicio) == i);
                        let slotData = {
                            id: slotIdCounter,
                            disponivel: agendamento ? false : true,
                            agendamento: agendamento ? agendamento : undefined
                        };
                        labSchedule.push(slotData);
                        slotIdCounter++;
                    }
                    scheduleData[`laboratorio${lab}`] = labSchedule;
                }
                return response.status(200).json(scheduleData);
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    delete(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            try {
                const options = {
                    where: { id: id }
                };
                const agendamento = yield agendamentoRepository_1.agendamentosRepository.findOne(options);
                if (!agendamento) {
                    return response.status(404).json({ message: 'Agendamento not found' });
                }
                yield agendamentoRepository_1.agendamentosRepository.delete(id);
                console.log(`Agendamento with id ${id} deleted`);
                return response.status(204).send();
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    update(request, response) {
        return __awaiter(this, void 0, void 0, function* () {
            const id = Number(request.params.id);
            const { date, horario_inicio, horario_fim, id_professor, id_grade, id_laboratorio } = request.body;
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
                const options = {
                    where: { id: id }
                    // other options here, such as relations or order
                };
                const agendamento = yield agendamentoRepository_1.agendamentosRepository.findOne(options);
                if (!agendamento) {
                    return response.status(404).json({ message: 'Agendamento not found' });
                }
                agendamentoRepository_1.agendamentosRepository.merge(agendamento, {
                    date,
                    horario_inicio,
                    horario_fim,
                    id_professor,
                    id_grade,
                    id_laboratorio,
                    updated_at: new Date()
                });
                const results = yield agendamentoRepository_1.agendamentosRepository.save(agendamento);
                console.log(`Agendamento with id ${id} updated`);
                return response.status(200).json(results);
            }
            catch (error) {
                console.error(error);
                return response.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.AgendamentoController = AgendamentoController;
function getTimeSlot(horario_inicio) {
    switch (horario_inicio) {
        case '18:45':
            return 1;
        case '19:35':
            return 2;
        case '20:25':
            return 3;
        case '20:35':
            return 4;
        case '21:25':
            return 5;
        default:
            // you might want to throw an error here if the given time does not match any slot
            return -1;
    }
}
