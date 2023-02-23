
import { Request, Response } from "express";

import { accountsRepository } from "../repositories/accountsRepositories";

import { userRepository } from "../repositories/usersRepositories";

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

export class UserController {

    async create(request: Request, response: Response) {
        const { 
            username, 
            password, 
            role 
        } = request.body;

        if (!username || !password) {
            return response.status(400).json({ error: "Username or password is missing" });
        }

        const userExists = await userRepository.findOneBy({ username })

        if (userExists) {
            return response.status(400).json({ error: "User already exists" });
        }

        try {

            const newAccount = accountsRepository.create({ balance: 100 });

            await accountsRepository.save(newAccount); // creating balance with 100

            const hashPassword = await bcrypt.hash(password, 10)

            const newUser = userRepository.create({ username, password: hashPassword, accountid: newAccount });

            console.log(newUser);
            console.log(newAccount + role)

            await userRepository.save(newUser); //creating user with hashed password

            return response.status(201).json({ message: "User created" });

        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ message: "internal server error" });
        }

    }
    async login(request: Request, response: Response) {
        const { username, password } = request.body;

        if (!username || !password) {
            return response.status(400).json({ error: "Username or password is missing" });
        }
        try {

            const userExists = await userRepository.findOneBy({ username })

            if (!userExists) {
                return response.status(400).json({ error: "E-mail ou senha inválidos" });

            }

            const passwordMatch = await bcrypt.compare(password, userExists.password)

            if (!passwordMatch) {

                return response.status(400).json({ error: "E-mail ou senha inválidos" });

            }

            const token = jwt.sign({ id: userExists.id }, process.env.JWT_PASS ?? '', {
                expiresIn: '8h',
            })

            const { password: _, ...userLogin } = userExists

            return response.status(201).json({ 
                user: userLogin,
               token: token
            });

        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ message: "internal server error" });
        }

    }
}
