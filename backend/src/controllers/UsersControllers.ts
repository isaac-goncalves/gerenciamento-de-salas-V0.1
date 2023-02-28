import { Request, Response } from "express";

import { usersRepository } from "../repositories/usersRepositories";

import { employeesRepository } from "../repositories/employeesRepository";

import bcrypt from 'bcrypt'

import jwt from 'jsonwebtoken'

export class UserController {

    async create(request: Request, response: Response) {
        const {
            name,
            email,
            password,
            role,
            degree,
            phone,
            address,
            city,
            state,
            zip
        } = request.body;

        if (!email || !password) {
            return response.status(400).json({ error: "Email or password is missing" });
        }
        try {

            const userExists = await usersRepository.findOneBy({ email })

            if (userExists) {
                return response.status(400).json({ error: "User already exists" });
            }

            const newuser = usersRepository.create({ email, password, role, user_verified: false });

            await usersRepository.save(newuser);
            console.log(newuser)

            if (role === 'admin') {

                return response.status(201).json({ message: "Admin created" });

            }

            if (role === 'professor') {

                console.log('professor selected')

                const newEmployee = employeesRepository.create({
                    name,
                    role,
                    degree,
                    email,
                    phone,
                    address,
                    city,
                    state,
                    zip,
                    updated_at: new Date(),
                });

                console.log(newEmployee)

                await employeesRepository.save(newEmployee);

                return response.status(201).json({ message: "professor created" });

            }

            if (role === 'cordenador') {

                console.log('cordenador selected')

                const newEmployee = employeesRepository.create({
                    name,
                    role,
                    degree,
                    email,
                    phone,
                    address,
                    city,
                    state,
                    zip,
                    updated_at: new Date(),
                });

                console.log(newEmployee)

                await employeesRepository.save(newEmployee);

                return response.status(201).json({ message: "cordenador created" });

            }
            else {
                return response.status(400).json({ error: "Role is missing" });
            }
            // const newAccount = accountsRepository.create({ balance: 100 });

            // await accountsRepository.save(newAccount); // creating balance with 100

            // const hashPassword = await bcrypt.hash(password, 10)

            // const newUser = usersRepository.create({ email, password: hashPassword, accountid: newAccount });

            // console.log(newUser);
            // console.log(newAccount + role)

            // await usersRepository.save(newUser); //creating user with hashed password

            // return response.status(201).json({ message: "User created" });

        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ message: "internal server error" });
        }

    }
    async verify(request: Request, response: Response) {
        const {
            email,
            password,

        } = request.body;

        if (!email || !password) {
            return response.status(400).json({ error: "Email or password is missing" });
        }
        try {

            const userExists = await usersRepository.findOneBy({ email })

            if (userExists) {
                return response.status(400).json({ error: "User already exists" });
            }
            else {
                return response.status(200).json({ message: "User does not exists" });
            }
        }
        catch (error) {
            console.log(error);
            return response.status(500).json({ message: "internal server error" });
        }

    }
    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        console.log(email, password)

        if (!email || !password) {
            return response.status(400).json({ error: "email or password is missing" });
        }
        try {

            const userExists = await usersRepository.findOneBy({ email })

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
