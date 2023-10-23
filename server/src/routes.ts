import express, { Router } from 'express'

import { ETLControllers } from './controllers/ETLControllers'

import { UserController } from './controllers/UsersControllers'
import { GradeController } from './controllers/GradeControllers'
import { AgendamentoController } from './controllers/AgendamentoControllers'
import { ProfessorsController } from './controllers/ProfessorsController'
import { DisciplinasController } from './controllers/DisciplinasController'
// import { TransactionsController } from "./controllers/TransactionsControllers";

import multer, { Multer } from 'multer';

const routes = Router()
const userController = new UserController()

routes.post('/verify', new UserController().verify)

routes.post('/professors', new ProfessorsController().get)

//GET DISCIPLINAS
routes.post('/disciplinas', new DisciplinasController().get)

//GET SEMESTERS
routes.post('/semesters' , new GradeController().getSemester)

//GET LABORATORY
routes.post('/laboratory', new ProfessorsController().getLaboratory)


//MAIN GET GRADE DASHBOARD ENDPOINT
routes.post('/grade/dashboard', new GradeController().getDashboardData)

//GET GRADES DATA BY PROFESSOR ID, DISCIPLINA ID AND DAY OF THE WEEK

routes.post('/grade/professors', new GradeController().getGradesByProfessorsAndDisciplinas)



routes.post('/agendamento', new AgendamentoController().get)

routes.get('/grade/agendamentos', new AgendamentoController().getGroupedById) // GroupByID

//GET AGENDAMENTOS BY LABORATORY
routes.post('/grade/agendamentos', new GradeController().getAgendamentosData)

routes.post('/laboratoriosschedule', new AgendamentoController().getLaboratoriosSchedule)

routes.post('/agendamento/grouped', new AgendamentoController().getGroupedById) // this one is used on skedule viewer

routes.post('/login', new UserController().login)
routes.post('/register', new UserController().create)

routes.post('/theme', new UserController().setTheme)

routes.post('/usuarios', new UserController().get)
routes.post('/usuarios/edit', new UserController().edit)
routes.post('/usuarios/upload', new UserController().uploadFile)
routes.get('/usuarios/:userId', new UserController().profilePicture)
routes.get('/server/uploads', express.static('uploads/user/profilepics'));

routes.post('/professores', new UserController().getProfessores)
routes.post('/alunos', new UserController().getAlunos)

routes.get('/template/download', new ETLControllers().download)
routes.post('/template/upload', new ETLControllers().upload)

//CREATE AGENDAMENTO
routes.post('/create/agendamento', new AgendamentoController().create)

routes.put('/agendamento', new AgendamentoController().update);
routes.delete('/agendamento', new AgendamentoController().delete);

// routes.post("/transaction", new TransactionsController().create);

export default routes
