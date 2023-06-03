import { Request, Response } from 'express'

// import { usersRepository } from "../repositories/dia_da_semanaRepositories";

import { usuariosRepository } from '../repositories/usuariosRepository'

import { alunosRepository } from '../repositories/alunosRepository'

import { professoresRepository } from '../repositories/professoresRepositories'

// import { employeesRepository } from "../repositories/employeesRepository";

interface DecodedPayload {
  id: number
  // add other properties from the payload here
}

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

import { disciplinasRepository } from '../repositories/disciplinasRepositories'

export class UserController {
  async create (request: Request, response: Response) {
    const { name, surname, email, password, role, semester, discipline } =
      request.body

    console.log(name, surname, email, password, role, semester, discipline)

    if (!email || !password) {
      return response
        .status(400)
        .json({ error: 'Email or password is missing' })
    }

    try {
      const userExists = await usuariosRepository.findOneBy({ email })

      if (userExists) {
        console.log('user already exists')
        return response.status(400).json({ error: 'User already exists' })
      }

      const encriptedPassword = await bcrypt.hash(password, 8)

      const newUser = usuariosRepository.create({
        email,
        password: encriptedPassword,
        role: role
      })

      const savedUser = await usuariosRepository.save(newUser) //essa parte me preocupa
      console.log(savedUser)

      if (role === 'aluno') {
        console.log('aluno selected')

        const newAluno = await alunosRepository.create({
          name,
          surname,
          email,
          semestre: semester,
          user_id: savedUser.id,
          created_at: new Date(),
          updated_at: new Date()
        })

        await alunosRepository.save(newAluno)

        console.log(newAluno)

        const token = jwt.sign(
          { id: savedUser.id },
          process.env.JWT_PASS ?? '',
          {
            expiresIn: '8h'
          }
        )

        return response.status(201).json({
          message: 'Aluno created',
          userData: newAluno,
          token: token
        })
      } else if (role === 'professor') {
        console.log('professor selected')

        const obj = {
          name,
          surname,
          email,
          semestre: semester,
          disciplina: discipline,
          user_id: savedUser.id,
          created_at: new Date(),
          updated_at: new Date()
        }

        const newProfessor = await professoresRepository.create(obj)
        const savedProfessor = await professoresRepository.save(newProfessor)

        console.log(savedProfessor)

        const token = jwt.sign(
          { id: savedUser.id },
          process.env.JWT_PASS ?? '',
          {
            expiresIn: '8h'
          }
        )

        return response.status(201).json({
          message: 'Professor created',
          userData: savedProfessor,
          token: token
        })
      } else if (role === 'coordenador') {
        console.log('coordenador selected')

        return response.status(201).json({
          message: 'Coordenador created',
          userData: {
            name,
            surname,
            email,
            password,
            role,
            discipline
          }
        })
      } else {
        return response.status(400).json({ error: 'Role is missing' })
      }
    } catch (error) {
      console.log(error)

      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async verify (request: Request, response: Response) {
    console.log('verify')

    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response
        .status(400)
        .json({ error: 'Authorization header is missing' })
    }

    const [, token] = authHeader.split(' ')

    if (!token) {
      return response.status(400).json({ error: 'Token is missing' })
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_PASS ?? ''
      ) as DecodedPayload

      console.log(decoded.id)

      // uncomment the following lines once you have a working user repository
      const userExists = await usuariosRepository.findOneBy({ id: decoded.id })

      if (!userExists) {
        return response.status(400).json({ error: 'User does not exist' })
      }

      return response.status(200).json({ message: 'User verified' })
    } catch (error: any) {
      console.log('error' + error)

      if (error == 'TokenExpiredError: jwt expired') {
        return response.status(400).json({ error: 'Token expired' })
      }

      if (error == 'JsonWebTokenError: invalid signature') {
        return response.status(400).json({ error: 'Invalid token' })
      }

      return response.status(500).json({ error: 'Internal server error' })
    }
  }

  async verifyVoid (request: Request, response: Response, next: any) {
    console.log('verifyVOIDED')

    const authHeader = request.headers.authorization

    if (!authHeader) {
      return response
        .status(400)
        .json({ error: 'Authorization header is missing' })
    }

    const [, token] = authHeader.split(' ')

    if (!token) {
      return response.status(400).json({ error: 'Token is missing' })
    }

    try {
      const decoded = jwt.verify(
        token,
        process.env.JWT_PASS ?? ''
      ) as DecodedPayload

      console.log(decoded.id)

      // uncomment the following lines once you have a working user repository
      const userExists = await usuariosRepository.findOneBy({ id: decoded.id })

      if (!userExists) {
        return response.status(400).json({ error: 'User does not exist' })
      } else {
        console.log('user exists')
        //go to next function in the route
        next()
      }
    } catch (error: any) {
      console.log('error' + error)

      if (error == 'TokenExpiredError: jwt expired') {
        return response.status(400).json({ error: 'Token expired' })
      }

      if (error == 'JsonWebTokenError: invalid signature') {
        return response.status(400).json({ error: 'Invalid token' })
      }

      return response.status(500).json({ error: 'Internal server error' })
    }
  }

  async login (request: Request, response: Response) {
    const { email, password } = request.body

    console.log(email, password)
    console.log('----------------------------')

    if (!email || !password) {
      return response
        .status(400)
        .json({ error: 'email or password is missing' })
    }
    try {
      const userExists = await usuariosRepository.findOneBy({ email })

      if (!userExists) {
        return response.status(400).json({ error: 'E-mail ou senha inválidos' })
      }

      const passwordMatch = await bcrypt.compare(password, userExists.password)

      if (!passwordMatch) {
        return response.status(400).json({ error: 'E-mail ou senha inválidos' })
      }

      const token = jwt.sign(
        { id: userExists.id },
        process.env.JWT_PASS ?? '',
        {
          expiresIn: '8h'
        }
      )

      console.log(userExists.email)
      console.log(userExists.role)

      let userData = {} as any

      if (userExists.role === 'aluno') {
        const aluno = await alunosRepository.findOneBy({
          //caso o usuario seja um aluno, busca o aluno no banco de dados
          user_id: userExists.id
        })
        console.log('aluno=')
        console.log(aluno)
        userData = aluno
      } else if (userExists.role === 'professor') {
        const professor = await professoresRepository.findOneBy({
          //caso o usuario seja um professor, busca o professor no banco de dados
          user_id: userExists.id
        })
        console.log('professor=')
        console.log(professor)
        userData = professor


        const {disciplina, ...restUserData} = userData

        const disciplinaObj = await disciplinasRepository.findOneBy({
          id: disciplina
        })

        console.log(disciplinaObj)

        const returnObj = {
          ...restUserData,
          nomeDisciplina: disciplinaObj?.descricao
        }

        return response.status(201).json({
          userData: returnObj,
          token: token
        })

      } else {
        console.log('role nao encontrado')
        return response.status(400).json({ error: 'Role nao encontrado' }) //caso o usuario nao seja nem professor nem aluno, retorna erro
      }

      userData.role = userExists.role

      return response.status(201).json({
        userData: userData,
        token: token
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async get (request: Request, response: Response) {
    console.log('get usuários')

    try {
      const usuarios = await usuariosRepository.find()

      console.log(JSON.stringify(usuarios, null, 2))

      return response.status(200).json(usuarios)
    } catch (error) {
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async getAlunos (request: Request, response: Response) {
    console.log('get Alunos')

    try {
      const usuarios = await alunosRepository.find()

      console.log(JSON.stringify(usuarios, null, 2))

      return response.status(200).json(usuarios)
    } catch (error) {
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async getProfessores (request: Request, response: Response) {
    console.log('get Professores')

    try {
      const usuarios = await professoresRepository.find()

      console.log(JSON.stringify(usuarios, null, 2))

      return response.status(200).json(usuarios)
    } catch (error) {
      return response.status(500).json({ message: 'internal server error' })
    }
  }
}
