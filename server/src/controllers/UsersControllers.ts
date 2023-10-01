import { Request, Response } from 'express'

// import { usersRepository } from "../repositories/dia_da_semanaRepositories";

import { usuariosRepository } from '../repositories/usuariosRepository'

import { alunosRepository } from '../repositories/alunosRepository'

import { professoresRepository } from '../repositories/professoresRepositories'

import fs from 'fs'
// import { employeesRepository } from "../repositories/employeesRepository";

interface DecodedPayload {
  id: number
  // add other properties from the payload here
}

import multer, { FileFilterCallback } from 'multer'
import path from 'path'

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

import { disciplinasRepository } from '../repositories/disciplinasRepositories'

// Define storage for uploaded files


// Define file filter for image files
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  const allowedMimes = ['image/jpeg', 'image/pjpeg', 'image/png', 'image/gif']

  if (allowedMimes.includes(file.mimetype)) {
    cb(null, true)
  } else {
    cb(new Error('Invalid file type'))
  }
}
// Create multer instance with the storage configuration


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

      //CHECK IF USER EXISTS
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
      // console.log(savedUser)

      if (role === 'aluno') {
        // console.log('aluno selected')

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

        // console.log(newAluno)

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
        // console.log('professor selected')

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

        //verify if professor exists in professors table

        const professorExists = await professoresRepository.findOneBy({
          email
        })

        let newProfessor = {} as any

        if (!professorExists) {
          newProfessor = await professoresRepository.create(obj)
        } else {
          newProfessor = professorExists
          //save user id on professor table as user_id search by email
          professoresRepository.update(newProfessor.id, {
            user_id: savedUser.id
          })
        }

        const savedProfessor = await professoresRepository.save(newProfessor)

        // console.log(savedProfessor)

        const token = jwt.sign(
          { id: savedUser.id },
          process.env.JWT_PASS ?? '',
          {
            expiresIn: '8h'
          }
        )

        savedProfessor.role = role

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
      } else if (role === 'guest') {
        const token = jwt.sign(
          { id: savedUser.id },
          process.env.JWT_PASS ?? '',
          {
            expiresIn: '8h'
          }
        )

        return response.status(201).json({
          message: 'Guest created',
          userData: {
            name,
            surname,
            email,
            password,
            role,
            semester,
            theme: 0
          },
          token: token
        })
      } else {
        return response.status(400).json({ error: 'Role is missing' })
      }
    } catch (error) {
      // console.log(error)

      return response.status(500).json({ message: 'Internal server error' })
    }
  }

  async verify (request: Request, response: Response) {
    // console.log('verify')

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

      // console.log(decoded.id)

      // uncomment the following lines once you have a working user repository
      const userExists = await usuariosRepository.findOneBy({ id: decoded.id })

      if (!userExists) {
        return response.status(400).json({ error: 'User does not exist' })
      }

      return response.status(200).json({ message: 'User verified' })
    } catch (error: any) {
      // console.log('error' + error)

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
    // console.log('verifyVOIDED')

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

      // console.log(decoded.id)

      // uncomment the following lines once you have a working user repository
      const userExists = await usuariosRepository.findOneBy({ id: decoded.id })

      if (!userExists) {
        return response.status(400).json({ error: 'User does not exist' })
      } else {
        // console.log('user exists')
        //go to next function in the route
        next()
      }
    } catch (error: any) {
      // console.log('error' + error)

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

    console.log('----------------------------')
    console.log('LOGIN ATTEMPT')

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

      // console.log(userExists.email)
      // console.log(userExists.role)

      let userData = {} as any

      if (userExists.role === 'aluno') {
        const aluno = await alunosRepository.findOneBy({
          //caso o usuario seja um aluno, busca o aluno no banco de dados
          user_id: userExists.id
        })
        // console.log('aluno=')
        // console.log(aluno)

        const AlunoWithRole = {
          ...aluno,
          role: userExists.role
        }

        userData = AlunoWithRole
      } else if (userExists.role === 'professor') {
        let professor: any = await professoresRepository.findOneBy({
          //caso o usuario seja um professor, busca o professor no banco de dados
          user_id: userExists.id
        })

        const professorId = professor?.id

        professor = {
          ...professor,
          professor_id: professorId
        }

        console.log('professor=')
        console.log(professor)
        userData = professor

        const { disciplina, ...restUserData } = userData

        const disciplinaObj = await disciplinasRepository.findOneBy({
          id: disciplina
        })

        // console.log(disciplinaObj)

        const returnObj = {
          ...restUserData,
          disciplina: disciplinaObj?.id,
          nomeDisciplina: disciplinaObj?.descricao,
          role: userExists.role,
          theme: userExists.theme
        }

        return response.status(201).json({
          userData: returnObj,
          token: token
        })
      } else if (userExists.role === 'coordenador') {
        console.log('coordenador selected')
      } else {
        // console.log('role nao encontrado')
        return response.status(400).json({ error: 'Role nao encontrado' }) //caso o usuario nao seja nem professor nem aluno, retorna erro
      }

      userData.role = userExists.role
      userData.theme = userExists.theme

      return response.status(201).json({
        userData: userData,
        token: token
      })
    } catch (error) {
      // console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async get (request: Request, response: Response) {
    // console.log('get usuários')

    try {
      const usuarios = await usuariosRepository.find()

      // console.log(JSON.stringify(usuarios, null, 2))

      return response.status(200).json(usuarios)
    } catch (error) {
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async edit (request: Request, response: Response) {
    const { name, surname, email, password, role, semester, disciplina } =
      request.body

    console.log(request.body)

    console.log(email)

    const userExists = await usuariosRepository.findOneBy({ email })

    if (!userExists) {
      return response.status(400).json({ error: 'User does not exist' })
    }

    if (role == 'aluno') {
      const aluno = await alunosRepository.findOneBy({ user_id: userExists.id })

      if (!aluno) {
        return response.status(400).json({ error: 'Aluno does not exist' })
      }

      const updatedAluno = {
        ...aluno,
        name,
        surname,
        email,
        semestre: semester,
        updated_at: new Date()
      }

      await alunosRepository.update(aluno.id, updatedAluno)
    } else if (role == 'professor') {
      const professor = await professoresRepository.findOneBy({
        user_id: userExists.id
      })

      if (!professor) {
        return response.status(400).json({ error: 'Professor does not exist' })
      }

      const updatedProfessor = {
        ...professor,
        disciplina,
        updated_at: new Date()
      }

      const updatedProfessorObject = await professoresRepository.update(
        professor.id,
        updatedProfessor
      )

      console.log('updated professor')
      console.log(updatedProfessorObject)
    }

    return response.status(200).json({ message: 'User updated' })
  }

  async getAlunos (request: Request, response: Response) {
    // console.log('get Alunos')

    try {
      const usuarios = await alunosRepository.find()

      // console.log(JSON.stringify(usuarios, null, 2))

      return response.status(200).json(usuarios)
    } catch (error) {
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async getProfessores (request: Request, response: Response) {
    // console.log('get Professores')

    try {
      const usuarios = await professoresRepository.find()

      // console.log(JSON.stringify(usuarios, null, 2))

      return response.status(200).json(usuarios)
    } catch (error) {
      return response.status(500).json({ message: 'internal server error' })
    }
  }

  async setTheme (request: Request, response: Response) {
    const { email, theme } = request.body

    console.log(request.body)

    const userExists = await usuariosRepository.findOneBy({ email })

    if (!userExists) {
      return response.status(400).json({ error: 'User does not exist' })
    }

    const updatedUser = {
      ...userExists,
      theme
    }

    const updatedUserObject = await usuariosRepository.update(
      userExists.id,
      updatedUser
    )

    console.log('updated user')
    console.log(updatedUserObject)

    return response.status(200).json({ message: 'User updated' })
  }

  async uploadFile (req: Request, res: Response) {
    console.log('req.file')
    console.log(req.file)

    const userId = 12

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve('uploads/user/profilepics'))
      },
      filename: (req, file, cb) => {
        const fileName = `${Date.now()}-${userId}-${file.originalname}`
        cb(null, fileName)
      }
    })


    const upload = multer({ storage, fileFilter })
    
    //grab userId

    try {
      // Use multer middleware to handle file upload

      await upload.single('file')(req, res, error => {
        console.log('req.file')
        if (error) {
          return res.status(400).json({ error: error.message })
        }

        // The uploaded file information is available in req.file
        if (!req.file) {
          console.error('No file uploaded')
          return res.status(400).json({ message: 'No file uploaded' })
        }

        const { filename } = req.file
        console.log('Uploaded filename:', filename)

        return res.status(200).json({ message: 'File uploaded', filename })
      })
    } catch (error) {
      console.error('Error during upload:', error)
      return res.status(500).json({ message: 'Internal server error' })
    }
  }

  async profilePicture (req: Request, res: Response) {
    const { userId } = req.params

    const user = await usuariosRepository.findOneBy({ id: parseInt(userId) })

    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    console.log('user')
    console.log(user)

    //grab userId and search on C:\Users\Isaac\Documents\GitHub\gerenciamento-de-salas-V0.1\server\uploads\user\profilepics for a file name like 000-01-file.jpg

    const filesNames = await fs.promises.readdir(
      path.resolve('uploads/user/profilepics')
    )

    let fileName = ''

    filesNames.forEach(file => {
      const userIdFile = file.split('-')[1]

      if (userIdFile === userId) {
        console.log('file found')
        fileName = file
      }
      console.log(file)
    })

    if (fileName === '') {
      return res.status(404).json({ error: 'File not found' })
    }

    console.log('fileName')

    console.log(fileName)

    //send file to frontend 

    const file = path.resolve(
      'uploads/user/profilepics',
      fileName
    )

    console.log('file')

    console.log(file)

    res.setHeader('Content-Type', 'image/jpeg')
      
    res.sendFile(file)

  }
}
