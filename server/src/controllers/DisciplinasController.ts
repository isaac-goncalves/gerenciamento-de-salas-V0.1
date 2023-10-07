import { Request, Response } from 'express'
import { disciplinasRepository } from '../repositories/disciplinasRepositories'

export class DisciplinasController {
  async get (request: Request, response: Response) {
    console.log('Get Disciplinas' + request)

    try {
      const Disciplinas = await disciplinasRepository.find()

      console.log(Disciplinas)

      return response.status(200).json(Disciplinas)
    } catch (error) {
      return response
        .status(500)
        .json({ message: 'internal server error' + error })
    }
  }
}
