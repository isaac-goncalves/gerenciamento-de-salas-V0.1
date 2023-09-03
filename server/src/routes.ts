import { Router } from 'express'

import { ETLControllers } from './controllers/ETLControllers'

import { UserController } from './controllers/UsersControllers'
import { GradeController } from './controllers/GradeControllers'
import { AgendamentoController } from './controllers/AgendamentoControllers'
import { ProfessorsController } from './controllers/ProfessorsController'
// import { TransactionsController } from "./controllers/TransactionsControllers";

import multer, { Multer } from 'multer';

const routes = Router()
const userController = new UserController()

routes.post('/verify', new UserController().verify)

routes.post('/professors', new ProfessorsController().get)

routes.post('/laboratory', new ProfessorsController().getLaboratory)

routes.post('/grade/dashboard', new GradeController().getDashboardData)

routes.post('/agendamento', new AgendamentoController().get)

routes.get('/grade/agendamentos', new AgendamentoController().getGroupedById) // GroupByID

routes.post('/grade/agendamentos', new GradeController().getAgendamentosData)

routes.post('/laboratoriosschedule', new AgendamentoController().getLaboratoriosSchedule)

routes.post('/agendamento/grouped', new AgendamentoController().getGroupedById) // this one is used on skedule viewer

routes.post('/login', new UserController().login)
routes.post('/register', new UserController().create)

routes.post('/usuarios', new UserController().get)
routes.post('/professores', new UserController().getProfessores)
routes.post('/alunos', new UserController().getAlunos)

routes.get('/template/download', new ETLControllers().download)
routes.post('/template/upload', new ETLControllers().upload)

routes.post('/agendamento', new AgendamentoController().create)
routes.put('/agendamento', new AgendamentoController().update);
routes.delete('/agendamento', new AgendamentoController().delete);

// routes.post("/transaction", new TransactionsController().create);

export default routes
