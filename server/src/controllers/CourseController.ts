import { Request, Response } from 'express'

import { coursesRepository } from '../repositories/coursesRepository'

export class CoursesController {
  async createNewCourse (request: Request, response: Response) {
    console.log('Creating Course')

    const { course_name } = request.body

    const courseAlreadyExists = await coursesRepository.findOneBy({
      course_name: course_name
    })

    if (courseAlreadyExists) {
      return response.status(400).json({ message: 'Course already exists' })
    }

    const newCourse = await coursesRepository.create({ course_name })

    await coursesRepository.save(newCourse)

    return response.status(201).json(newCourse)
  }

  async get (request: Request, response: Response) {
    console.log('Getting Courses')

    const courses = await coursesRepository.find()

    return response.status(200).json(courses)
  }

  async delete (request: Request, response: Response) {
    console.log('Deleting Course')

    const { id } = request.body

    try {
      const course = await coursesRepository.findOneBy({
        id: id
      })

      if (!course) {
        return response.status(400).json({ message: 'Course not found' })
      }

      await coursesRepository.delete(course)

      return response.status(200).json({ message: 'Course deleted' })
    } catch (err) {
      console.log(err)
      return response.status(400).json({ message: 'Course not found' })
    }
  }
}
