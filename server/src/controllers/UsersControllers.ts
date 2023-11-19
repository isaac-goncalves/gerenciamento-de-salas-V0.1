import { Request, Response } from "express";

// import { usersRepository } from "../repositories/dia_da_semanaRepositories";

import { usuariosRepository } from "../repositories/usuariosRepository";

import { alunosRepository } from "../repositories/alunosRepository";

import { professoresRepository } from "../repositories/professoresRepositories";

import fs from "fs";
// import { employeesRepository } from "../repositories/employeesRepository";

interface DecodedPayload {
    id: number;
    // add other properties from the payload here
}

import multer, { FileFilterCallback } from "multer";
import path from "path";

import bcrypt from "bcrypt";

import jwt from "jsonwebtoken";

import { disciplinasRepository } from "../repositories/disciplinasRepositories";
import { professorDisciplinaRepositories } from "../repositories/professorDisciplinaRepositories";
import { tr } from "date-fns/locale";
import { guestRepositories } from "../repositories/guestRepositories";
import { Guests } from "../entities/Guests";
import { coursesRepository } from "../repositories/coursesRepository";

// Define storage for uploaded files

// Define file filter for image files
const fileFilter = (
    req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback
) => {
    const allowedMimes = [
        "image/jpeg",
        "image/pjpeg",
        "image/png",
        "image/gif",
    ];

    if (allowedMimes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error("Invalid file type"));
    }
};
// Create multer instance with the storage configuration

export class UserController {
    async create(request: Request, response: Response) {
        const {
            name,
            surname,
            email,
            password,
            role,
            semester,
            discipline,
            course_id,
        } = request.body;

        //CONSOLE
        console.log(name, surname, email, password, course_id);
        console.log("role=" + role);
        console.log("semester=" + semester);
        console.log("discipline=" + discipline);
        console.log("course_id=" + course_id);

        //CHECK IF PARAMS ARE MISSING
        if (!name || !surname || !email || !password || !role) {
            return response.status(400).json({ error: "Missing params" });
        }

        //CHECK IF ROLE AND SEMESTER OR DISCIPLINE IS PRESENT

        if (role === "aluno" && !semester) {
            return response.status(400).json({ error: "Semester is missing" });
        } else if (role === "professor" && !discipline) {
            return response
                .status(400)
                .json({ error: "Discipline is missing" });
        } else if (role != "aluno" && role != "professor" && role != "guest") {
            return response.status(400).json({ error: "Role is invalid" });
        }

        //CHECK IF EMAIL AND PASSOWRD IS PRESENT
        if (!email || !password) {
            return response
                .status(400)
                .json({ error: "Email or password is missing" });
        }

        //START TO CREATE USER ============================================================
        try {
            const userExists = await usuariosRepository.findOneBy({ email });

            //CHECK IF USER EXISTS
            if (userExists) {
                console.log("user already exists");
                return response
                    .status(400)
                    .json({ error: "User already exists" });
            }

            //ENCRYPT PASSWORD
            const encriptedPassword = await bcrypt.hash(password, 8);

            //CREATE USER
            const newUser = usuariosRepository.create({
                email,
                password: encriptedPassword,
                role: role,
            });

            // SAVE USER ON DATABASE
            const savedUser = await usuariosRepository.save(newUser); //essa parte me preocupa

            //CASE USER IS ALUNO
            if (role === "aluno") {
                //CREATE ALUNO
                const newAluno = await alunosRepository.create({
                    name,
                    surname,
                    email,
                    semestre: semester,
                    course_id: course_id,
                    user_id: savedUser.id,
                    created_at: new Date(),
                    updated_at: new Date(),
                });
                await alunosRepository.save(newAluno);

                //CREATE TOKEN
                const token = jwt.sign(
                    { id: savedUser.id },
                    process.env.JWT_PASS ?? "",
                    {
                        expiresIn: "8h",
                    }
                );

                const courseName = await coursesRepository.findOneBy({
                    id: course_id,
                });

                const alunoWithCourseName = {
                    ...newAluno,
                    course_name: courseName?.course_name || "no course name",
                };

                //RETURN USER DATA
                return response.status(201).json({
                    message: "Aluno created",
                    userData: alunoWithCourseName,
                    token: token,
                });

                //CASE USER IS PROFESSOR
            } else if (role === "professor") {
                //CREATE PROFESSOR
                const NewProfessorObj = {
                    name,
                    surname,
                    email,
                    semestre: semester,
                    course_id: course_id,
                    user_id: savedUser.id,
                    created_at: new Date(),
                    updated_at: new Date(),
                };

                //VERIFY IF PROFESSOR ALREADY EXISTS
                const professorExists = await professoresRepository.findOneBy({
                    email,
                });

                let newProfessor = {} as any;

                //IF PROFESSOR DOESNT EXISTS, CREATE A NEW ONE
                if (!professorExists) {
                    return response
                        .status(400)
                        .json({ error: "Professor not found" });
                    //IF PROFESSOR ALREADY EXISTS, UPDATE IT
                } else {
                    newProfessor = professorExists;
                    //save user id on professor table as user_id search by email
                    professoresRepository.update(newProfessor.id, {
                        user_id: savedUser.id,
                    });
                }

                // SAVE PROFESSOR ON DATABASE
                const savedProfessor = await professoresRepository.save(
                    newProfessor
                );

                //SAVE DISCIPLINA ON DATABASE PROFESSOR DISCIPLINA RELATION
                discipline.forEach(async (item: any) => {
                    const DicsiplinasObj = {
                        id_disciplina: item,
                        id_professor: savedProfessor.id,
                    };

                    const createdDisciplineProfessorItem =
                        await professorDisciplinaRepositories.create(
                            DicsiplinasObj
                        );

                    await professorDisciplinaRepositories.save(
                        createdDisciplineProfessorItem
                    );

                    console.log("created user ");
                    console.log(createdDisciplineProfessorItem);
                });

                professorDisciplinaRepositories;

                //ADD DISCIPLINA TO PROFESSOR TOKEN
                const professorWithDisciplinas = {
                    ...savedProfessor,
                    disciplina: discipline,
                    theme: 1,
                };

                const courseName = await coursesRepository.findOneBy({
                    id: course_id,
                });

                const professorWithCourseName = {
                    ...professorWithDisciplinas,
                    course_name: courseName?.course_name || "no course name",
                };

                // console.log(savedProfessor)

                //CREATE TOKEN
                const token = jwt.sign(
                    { id: savedUser.id },
                    process.env.JWT_PASS ?? "",
                    {
                        expiresIn: "8h",
                    }
                );

                savedProfessor.role = role;

                return response.status(201).json({
                    message: "Professor created",
                    userData: professorWithCourseName,
                    token: token,
                });
            }

            //CASE USER IS GUEST
            else if (role == "guest") {
                //create user guest on database guest

                if (semester == undefined) {
                    return response
                        .status(400)
                        .json({ error: "Semester is missing" });
                }

                const newGuest: any = await guestRepositories.create({
                    email,
                    semester: semester,
                    user_id: savedUser.id,
                    created_at: new Date(),
                    updated_at: new Date(),
                });

                // console.log("newGuest")
                // console.log(newGuest)

                const savedGuest = await guestRepositories.save(newGuest);

                // console.log("savedGuest")
                // console.log(savedGuest)

                //CREATE TOKEN

                const token = jwt.sign(
                    { id: savedUser.id },
                    process.env.JWT_PASS ?? "",
                    {
                        expiresIn: "8h",
                    }
                );

                return response.status(201).json({
                    message: "Guest created",
                    userData: {
                        name,
                        surname,
                        email,
                        password,
                        role,
                        semester,
                        theme: 1,
                    },
                    token: token,
                });
            } else {
                return response.status(400).json({ error: "Role is missing" });
            }
            // else if (role === 'coordenador') {
            //   console.log('coordenador selected')

            //   return response.status(201).json({
            //     message: 'Coordenador created',
            //     userData: {
            //       name,
            //       surname,
            //       email,
            //       password,
            //       role,
            //       discipline
            //     }
            //   })
            // }
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .json({ message: "Internal server error" });
        }
    }
    //LOGIN FUNCTION
    async login(request: Request, response: Response) {
        const { email, password } = request.body;

        console.log("----------------------------");
        console.log("LOGIN ATTEMPT");

        //CHECK IF EMAIL AND PASSOWRD IS PRESENT
        if (!email || !password) {
            return response
                .status(400)
                .json({ error: "email or password is missing" });
        }

        //START TO VALIDADE AND RETURN USER TOKEN ============================================================
        try {
            //CHECK IF USER EXISTS
            const userExists = await usuariosRepository.findOneBy({ email });
            if (!userExists) {
                return response
                    .status(400)
                    .json({ error: "E-mail ou senha inválidos" });
            }

            //CHECK IF PASSWORD MATCH
            const passwordMatch = await bcrypt.compare(
                password,
                userExists.password
            );
            if (!passwordMatch) {
                return response
                    .status(400)
                    .json({ error: "E-mail ou senha inválidos" });
            }

            //CREATE TOKEN
            const token = jwt.sign(
                { id: userExists.id },
                process.env.JWT_PASS ?? "",
                {
                    expiresIn: "8h",
                }
            );

            let userData = {} as any;

            //CASE USER IS ALUNO
            if (userExists.role === "aluno") {
                const aluno = await alunosRepository.findOneBy({
                    //caso o usuario seja um aluno, busca o aluno no banco de dados
                    user_id: userExists.id,
                });

                const AlunoWithRole = {
                    ...aluno,
                    role: userExists.role,
                };

                userData = AlunoWithRole;

                const courseName = await coursesRepository.findOneBy({
                    id: userData.course_id,
                });

                const userDataWithCourseName = {
                    ...userData,
                    course_name: courseName?.course_name || "no course name",
                };

                return response.status(201).json({
                    userData: userDataWithCourseName,
                    token: token,
                });

                //CASE USER IS PROFESSOR
            }
            //CASE USER IS PROFESSOR
            else if (userExists.role === "professor") {
                //FINDBY USER ID
                let professor: any = await professoresRepository.findOneBy({
                    user_id: userExists.id,
                });

                const professorId = professor?.id;

                professor = {
                    ...professor,
                    professor_id: professorId,
                };

                console.log("professor=");
                console.log(professor);

                userData = professor;

                //GET DISCIPLINAS
                const disciplinasArray =
                    await professorDisciplinaRepositories.find({
                        where: { id_professor: professorId },
                    });

                const disciplinasIds = disciplinasArray.map(
                    (item: any) => item.id_disciplina
                );

                console.log("disciplinasArray=");
                console.log(disciplinasArray);

                const promises = disciplinasIds.map(async (element: any) => {
                    const disciplineObj: any =
                        await disciplinasRepository.findOne({
                            where: { id: element },
                        });

                    console.log("disciplineObj=");
                    console.log(disciplineObj.descricao);

                    return disciplineObj ? disciplineObj.descricao : ""; // Return the description or an empty string if not found
                });

                Promise.all(promises)
                    .then(async (disciplinasNamesArray) => {
                        console.log("disciplinasNamesArray=");
                        console.log(disciplinasNamesArray);

                        const courseName = await coursesRepository.findOneBy({
                            id: userData.course_id,
                        });

                        const returnObj = {
                            ...userData,
                            disciplina: disciplinasIds,
                            nomeDisciplina: disciplinasNamesArray,
                            role: userExists.role,
                            theme: userExists.theme,
                            course_name:
                                courseName?.course_name || "no course name",
                        };

                        return response.status(201).json({
                            userData: returnObj,
                            token: token,
                        });
                    })
                    .catch((error) => {
                        return response
                            .status(500)
                            .json({ message: "internal server error" });
                    });
            }
            //CASE USER IS GUEST
            else if (userExists.role === "coordenador") {
                console.log("coordenador selected");
            }
            //CASE USER IS ADMIN
            else if (userExists.role === "admin") {
                console.log("admin selected");
                return response.status(201).json({
                    userData: userExists,
                    token: token,
                });
            } else {
                // console.log('role nao encontrado')
                return response
                    .status(400)
                    .json({ error: "Role nao encontrado" }); //caso o usuario nao seja nem professor nem aluno, retorna erro
            }
        } catch (error) {
            return response
                .status(500)
                .json({ message: "internal server error" });
        }
    }

    async verify(request: Request, response: Response) {
        // console.log('verify')

        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response
                .status(400)
                .json({ error: "Authorization header is missing" });
        }

        const [, token] = authHeader.split(" ");

        if (!token) {
            return response.status(400).json({ error: "Token is missing" });
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_PASS ?? ""
            ) as DecodedPayload;

            // console.log(decoded.id)

            // uncomment the following lines once you have a working user repository
            const userExists = await usuariosRepository.findOneBy({
                id: decoded.id,
            });

            if (!userExists) {
                return response
                    .status(400)
                    .json({ error: "User does not exist" });
            }

            return response.status(200).json({ message: "User verified" });
        } catch (error: any) {
            // console.log('error' + error)

            if (error == "TokenExpiredError: jwt expired") {
                return response.status(400).json({ error: "Token expired" });
            }

            if (error == "JsonWebTokenError: invalid signature") {
                return response.status(400).json({ error: "Invalid token" });
            }

            return response
                .status(500)
                .json({ error: "Internal server error" });
        }
    }

    async verifyVoid(request: Request, response: Response, next: any) {
        // console.log('verifyVOIDED')

        const authHeader = request.headers.authorization;

        if (!authHeader) {
            return response
                .status(400)
                .json({ error: "Authorization header is missing" });
        }

        const [, token] = authHeader.split(" ");

        if (!token) {
            return response.status(400).json({ error: "Token is missing" });
        }

        try {
            const decoded = jwt.verify(
                token,
                process.env.JWT_PASS ?? ""
            ) as DecodedPayload;

            // console.log(decoded.id)

            // uncomment the following lines once you have a working user repository
            const userExists = await usuariosRepository.findOneBy({
                id: decoded.id,
            });

            if (!userExists) {
                return response
                    .status(400)
                    .json({ error: "User does not exist" });
            } else {
                // console.log('user exists')
                //go to next function in the route
                next();
            }
        } catch (error: any) {
            // console.log('error' + error)

            if (error == "TokenExpiredError: jwt expired") {
                return response.status(400).json({ error: "Token expired" });
            }

            if (error == "JsonWebTokenError: invalid signature") {
                return response.status(400).json({ error: "Invalid token" });
            }

            return response
                .status(500)
                .json({ error: "Internal server error" });
        }
    }

    async get(request: Request, response: Response) {
        // console.log('get usuários')

        try {
            const usuarios = await usuariosRepository.find();

            // console.log(JSON.stringify(usuarios, null, 2))

            return response.status(200).json(usuarios);
        } catch (error) {
            return response
                .status(500)
                .json({ message: "internal server error" });
        }
    }

    async editUserData(request: Request, response: Response) {
        const { email, role, semester, disciplina } = request.body;

        //COO00000000000LOCAR name, surname, tmb depois

        //PRINTS TO CONSOLE FOR DEBUG
        console.log(request.body);
        console.log(email);

        //CHECK IF PARAMS ARE MISSING

        if (!email || !role) {
            return response.status(400).json({ error: "Missing params" });
        }

        //CHECK IF ROLE AND SEMESTER OR DISCIPLINE IS PRESENT

        if (role == "aluno" && !semester) {
            return response.status(400).json({ error: "Semester is missing" });
        } else if (role == "professor" && !disciplina) {
            return response
                .status(400)
                .json({ error: "Discipline is missing" });
        }
        const userExists = await usuariosRepository.findOneBy({ email });
        if (!userExists) {
            return response.status(400).json({ error: "User does not exist" });
        }
        try {
            //ID USER IS ALUNO
            if (role == "aluno") {
                //FIND USER ON ALUNO TABLE

                const aluno = await alunosRepository.findOneBy({
                    user_id: userExists.id,
                });
                if (!aluno) {
                    return response
                        .status(400)
                        .json({ error: "Aluno does not exist" });
                }

                //UPDATE USER
                const updatedAluno = {
                    ...aluno,
                    // name,
                    // surname,
                    email,
                    semestre: semester,
                    updated_at: new Date(),
                };

                //UPDATE USER ON DATABASE
                await alunosRepository.update(aluno.id, updatedAluno);

                console.log("User updated!");

                return response.status(200).json({ message: "User updated" });
            } else if (role == "guest") {
                //FIND USER ON ALUNO TABLE

                const guest = await guestRepositories.findOneBy({
                    user_id: userExists.id,
                });
                if (!guest) {
                    return response
                        .status(400)
                        .json({ error: "Guest does not exist" });
                }

                //UPDATE USER
                const updatedGuest = {
                    ...guest,
                    // name,
                    // surname,
                    email,
                    semester: semester,
                    updated_at: new Date(),
                };

                //UPDATE USER ON DATABASE
                await guestRepositories.update(guest.id, updatedGuest);

                console.log("Guest updated!");

                return response.status(200).json({ message: "User updated" });
            }
            //IF USER IS PROFESSOR
            else if (role == "professor") {
                const professor = await professoresRepository.findOneBy({
                    user_id: userExists.id,
                });

                if (!professor) {
                    return response
                        .status(400)
                        .json({ error: "Professor does not exist" });
                }

                const updatedProfessor = {
                    ...professor,
                    // name,
                    // surname,
                    updated_at: new Date(),
                };

                const updatedProfessorObject =
                    await professoresRepository.update(
                        professor.id,
                        updatedProfessor
                    );

                // console.log('disciplinasArray=')
                // console.log(disciplina)

                const idArray = disciplina.map((item: any) => item.id);

                // console.log('idArray=')
                // console.log(idArray)

                let changed = false;

                //GETS ALL DISCIPLINAS FROM PROFESSOR AND DELETE THE ONES THAT ARE NOT IN THE NEW ARRAY
                const allDisciplines =
                    await professorDisciplinaRepositories.find({
                        where: { id_professor: professor.id },
                    });

                allDisciplines.forEach(async (item: any) => {
                    if (!idArray.includes(item.id_disciplina)) {
                        await professorDisciplinaRepositories.delete(item.id);
                        console.log("-- deleting disciplina " + item.id);
                        changed = true;
                    }
                });

                //ADD DISCIPLINA TO PROFESSOR TOKEN AND SAVE IT ON DATABASE
                await idArray.forEach(async (item: any) => {
                    //update professor disciplina
                    const professorDisciplina =
                        await professorDisciplinaRepositories.findOneBy({
                            id_disciplina: item,
                            id_professor: professor.id,
                        });

                    if (!professorDisciplina) {
                        const DicsiplinasObj = {
                            id_disciplina: item,
                            id_professor: professor.id,
                        };

                        const createdDisciplineProfessorItem =
                            await professorDisciplinaRepositories.create(
                                DicsiplinasObj
                            );

                        await professorDisciplinaRepositories.save(
                            createdDisciplineProfessorItem
                        );
                        changed = true;
                        console.log("++ created disciplina " + item);
                    }
                });
                console.log("User updated!");

                return response.status(200).json({ message: "User updated" });
            } else {
                return response.status(400).json({ error: "Role is missing" });
            }
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .json({ message: "internal server error" });
        }
    }

    async getAlunos(request: Request, response: Response) {
        // console.log('get Alunos')

        try {
            const usuarios = await alunosRepository.find();

            // console.log(JSON.stringify(usuarios, null, 2))

            return response.status(200).json(usuarios);
        } catch (error) {
            return response
                .status(500)
                .json({ message: "internal server error" });
        }
    }

    async getProfessores(request: Request, response: Response) {
        // console.log('get Professores')

        try {
            const professores = await professoresRepository.find();

            // add course name from couses repository
            const professorsWithCursoName: any[] = [];

            await Promise.all(
                professores.map(async (item: any) => {
                    const courseName = await coursesRepository.findOneBy({
                        id: item.course_id,
                    });

                    // console.log(courseName?.course_name);

                    item.course_name =
                        courseName?.course_name || "no course name";

                    //  console.log(item);

                    professorsWithCursoName.push(item);
                })
            );
            // console.log(JSON.stringify(professorsWithCursoName, null, 2))

            //  console.log(JSON.stringify(professores, null, 2))

            return response.status(200).json(professorsWithCursoName);
        } catch (error) {
            console.log(error);
            return response
                .status(500)
                .json({ message: "internal server error" });
        }
    }

    async setTheme(request: Request, response: Response) {
        const { email, theme } = request.body;

        console.log(request.body);

        const userExists = await usuariosRepository.findOneBy({ email });

        if (!userExists) {
            return response.status(400).json({ error: "User does not exist" });
        }

        const updatedUser = {
            ...userExists,
            theme,
        };

        const updatedUserObject = await usuariosRepository.update(
            userExists.id,
            updatedUser
        );

        console.log("updated user");
        console.log(updatedUserObject);

        return response.status(200).json({ message: "User updated" });
    }

    async uploadFile(req: Request, res: Response) {
        console.log("req.file");
        console.log(req.file);

        const userId = 12;

        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, path.resolve("uploads/user/profilepics"));
            },
            filename: (req, file, cb) => {
                const fileName = `${Date.now()}-${userId}-${file.originalname}`;
                cb(null, fileName);
            },
        });

        const upload = multer({ storage, fileFilter });

        //grab userId

        try {
            // Use multer middleware to handle file upload

            await upload.single("file")(req, res, (error) => {
                console.log("req.file");
                if (error) {
                    return res.status(400).json({ error: error.message });
                }

                // The uploaded file information is available in req.file
                if (!req.file) {
                    console.error("No file uploaded");
                    return res
                        .status(400)
                        .json({ message: "No file uploaded" });
                }

                const { filename } = req.file;
                console.log("Uploaded filename:", filename);

                return res
                    .status(200)
                    .json({ message: "File uploaded", filename });
            });
        } catch (error) {
            console.error("Error during upload:", error);
            return res.status(500).json({ message: "Internal server error" });
        }
    }

    async profilePicture(req: Request, res: Response) {
        const { userId } = req.params;

        const user = await usuariosRepository.findOneBy({
            id: parseInt(userId),
        });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("user");
        console.log(user);

        //grab userId and search on C:\Users\Isaac\Documents\GitHub\gerenciamento-de-salas-V0.1\server\uploads\user\profilepics for a file name like 000-01-file.jpg

        const filesNames = await fs.promises.readdir(
            path.resolve("uploads/user/profilepics")
        );

        let fileName = "";

        filesNames.forEach((file) => {
            const userIdFile = file.split("-")[1];

            if (userIdFile === userId) {
                console.log("file found");
                fileName = file;
            }
            console.log(file);
        });

        if (fileName === "") {
            return res.status(404).json({ error: "File not found" });
        }

        console.log("fileName");

        console.log(fileName);

        //send file to frontend

        const file = path.resolve("uploads/user/profilepics", fileName);

        console.log("file");

        console.log(file);

        res.setHeader("Content-Type", "image/jpeg");

        res.sendFile(file);
    }

    async setGuestSemester(request: Request, response: Response) {
        const { email, semester } = request.body;

        console.log(request.body);

        const userExists = await usuariosRepository.findOneBy({ email });

        if (!userExists) {
            return response.status(400).json({ error: "User does not exist" });
        }

        const guestExists = await guestRepositories.findOneBy({
            user_id: userExists.id,
        });

        if (!guestExists) {
            return response.status(400).json({ error: "Guest does not exist" });
        }

        const updatedGuest = {
            ...guestExists,
            semester,
        };

        const updatedGuestObject = await guestRepositories.update(
            guestExists.id,
            updatedGuest
        );

        console.log("updated guest");
        console.log(updatedGuestObject);

        return response.status(200).json({ message: "Guest updated" });
    }
}
