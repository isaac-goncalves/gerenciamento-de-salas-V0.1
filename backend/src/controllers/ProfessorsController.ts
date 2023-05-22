import { Request, Response } from 'express'

import { professoresRepository } from '../repositories/professoresRepositories'

export class ProfessorsController {
  
  async get (request: Request, response: Response) {
    console.log('get professores')

    //grab token

    const token = request.headers.authorization

    //verify token

    if (!token) return response.status(401).json({ message: 'missing token' })

    const [, tokenValue] = token.split(' ')

    try {
      const professores = await professoresRepository.find()

      console.log(JSON.stringify(professores, null, 2))

      const newProfessores = await professores.map((professor: any) => {
        const id = professor.id
        const name = professor.name

        console.log(id, name)

        const obj = { 
            id: id, 
            name: name 
        }
        return obj
      })

      console.log(newProfessores)

      return response.status(200).json(newProfessores)
    } catch (error) {
      return response.status(500).json({ message: 'internal server error' })
    }
  }
}
