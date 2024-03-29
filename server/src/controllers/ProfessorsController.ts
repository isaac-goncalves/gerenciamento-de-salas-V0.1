import { Request, Response } from 'express'

import { professoresRepository } from '../repositories/professoresRepositories'

import { laboratoriosRepository } from '../repositories/laboratoriosRepository'

export class ProfessorsController {
  async get (request: Request, response: Response) {
    console.log('get professores')

    const { selectedCourse } = request.body

    // console.log(selectedCourse)

    const token = request.headers.authorization

    //verify token

    // if (!token) return response.status(401).json({ message: 'missing token' })

    // const [, tokenValue] = token.split(' ')
    //sort alpoabetically
    try {
      let professores = []

      //grab all professores_ids from table professor_curso and bring all professsors from table professores

      if (selectedCourse != null) {
        const query = `SELECT * FROM professores WHERE id IN (SELECT id_professor FROM professores_cursos WHERE course_id = ${selectedCourse}) ORDER BY name ASC`

        professores = await professoresRepository.query(query)
      } else {
        professores = await professoresRepository.find({
          order: { name: 'ASC' }
        })
      }

      // console.log(JSON.stringify(professores, null, 2))

      const newProfessores = await professores.map((professor: any) => {
        const id = professor.id
        const name = professor.name
        const course_id = professor.course_id

        // console.log(id, name)

        const obj = {
          id: id,
          name: name,
          course_id: course_id
        }
        return obj
      })

      // console.log(newProfessores)

      return response.status(200).json(newProfessores)
    } catch (error) {
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async getLaboratory (request: Request, response: Response) {
    // console.log('get getLaboratory')

    //grab token

    const token = request.headers.authorization

    //verify token

    // if (!token) return response.status(401).json({ message: 'missing token' })

    // const [, tokenValue] = token.split(' ')

    try {
      const laboratory = await laboratoriosRepository.find()

      // console.log(JSON.stringify(laboratory, null, 2))

      return response.status(200).json(laboratory)
    } catch (error) {
      return response.status(500).json({ message: 'internal server error' })
    }
  }
}
