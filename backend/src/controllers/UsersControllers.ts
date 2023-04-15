import { Request, Response } from 'express'

// import { usersRepository } from "../repositories/dia_da_semanaRepositories";

import { usuariosRepository } from '../repositories/usuariosRepository'

import { alunosRepository } from '../repositories/alunosRepository'

import { professoresRepository } from '../repositories/professoresRepositories'

// import { employeesRepository } from "../repositories/employeesRepository";

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

export class UserController {
  async create(request: Request, response: Response) {
    const { name, surname, email, password, role, semester , discipline } = request.body;
  
    if (!email || !password) {
      return response.status(400).json({ error: 'Email or password is missing' });
    }
  
    try {
      const userExists = await usuariosRepository.findOneBy({ email });
  
      if (userExists) {
        console.log('user already exists');
        return response.status(400).json({ error: 'User already exists' });
      }
  
      const newUser = usuariosRepository.create({ email, password });
      const savedUser = await usuariosRepository.save(newUser);
  
      console.log(savedUser);
  
      if (role === 'aluno') {
        console.log('aluno selected');
  
        const newAluno = await alunosRepository.create({
          name,
          surname,
          email,
          semestre: semester,
          user_id: savedUser.id,
          created_at: new Date(),
          updated_at: new Date(),
        });
  
        await alunosRepository.save(newAluno);
  
        console.log(newAluno);
  
        return response.status(201).json({
          message: 'Aluno created',
          userData: newAluno,
        });
      } else if (role === 'professor') {
        console.log('professor selected');
  
        const obj = {
          name,
          surname,
          email,
          discipline,
          user_id: savedUser.id,
          created_at: new Date(),
          updated_at: new Date(),
        };
  
        const newProfessor = await professoresRepository.create(obj);
        const savedProfessor = await professoresRepository.save(newProfessor);
  
        console.log(savedProfessor);
  
        return response.status(201).json({
          message: 'Professor created',
          userData: savedProfessor,
        });
      } else if (role === 'coordenador') {
        console.log('coordenador selected');
  
        return response.status(201).json({
          message: 'Coordenador created',
          userData: {
            name,
            surname,
            email,
            password,
            role,
            discipline,
          },
        });
      } else {
        return response.status(400).json({ error: 'Role is missing' });
      }
    } catch (error) {
      console.log(error);
  
      return response.status(500).json({ message: 'Internal server error' });
    }
  }
  async verify (request: Request, response: Response) {
    const { email, password } = request.body

    if (!email || !password) {
      return response
        .status(400)
        .json({ error: 'Email or password is missing' })
    }
    try {
      const userExists = await usuariosRepository.findOneBy({ email })

      if (userExists) {
        return response.status(400).json({ error: 'User already exists' })
      } else {
        return response.status(200).json({ message: 'User does not exists' })
      }
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }
  async login (request: Request, response: Response) {
    const { email, password } = request.body

    console.log(email, password)

    if (!email || !password) {
      return response
        .status(400)
        .json({ error: 'email or password is missing' })
    }
    try {
      const userExists = await usuariosRepository.findOneBy({ email })

      console.log(userExists)

      if (!userExists) {
        return response.status(400).json({ error: 'E-mail ou senha inválidos' })
      }

      // const passwordMatch = await bcrypt.compare(password, userExists.password)

      // if (!passwordMatch) {
      //   return response.status(400).json({ error: 'E-mail ou senha inválidos' })
      // }

      if(password !== userExists.password){
        return response.status(400).json({ error: 'E-mail ou senha inválidos' })
      }
    
      const token = jwt.sign(
        { id: userExists.id },
        process.env.JWT_PASS ?? '',
        {
          expiresIn: '8h'
        }
      )

      const { password: _, ...userLogin } = userExists

      return response.status(201).json({
        user: userLogin,
        token: token
      })
    } catch (error) {
      console.log(error)
      return response.status(500).json({ message: 'internal server error' })
    }
  }
}
