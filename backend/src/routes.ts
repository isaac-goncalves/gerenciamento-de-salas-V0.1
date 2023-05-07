import { Router } from 'express'

import { UserController } from './controllers/UsersControllers'
import { GradeController } from './controllers/GradeControllers'
import { AgendamentoController } from './controllers/AgendamentoControllers'
import { ProfessorsController } from './controllers/ProfessorsController'
// import { TransactionsController } from "./controllers/TransactionsControllers";

const routes = Router()
const userController = new UserController()

routes.post('/verify', new UserController().verify)

routes.post('/professors', userController.verifyVoid, new ProfessorsController().get)

routes.post('/grade/dashboard', new GradeController().getDashboardData)
routes.post('/grade/agendamentos', new GradeController().getAgendamentosData)

routes.post('/agendamento', new AgendamentoController().create)
routes.get('/agendamento', new AgendamentoController().get)
routes.put('/agendamento/:id', new AgendamentoController().update);
routes.delete('/agendamento/:id', new AgendamentoController().delete);

routes.post('/login', new UserController().login)
routes.post('/register', new UserController().create)

routes.get('/usuarios', new UserController().get)
routes.get('/professores', new UserController().getProfessores)
routes.get('/alunos', new UserController().getAlunos)
// routes.post("/transaction", new TransactionsController().create);

export default routes
