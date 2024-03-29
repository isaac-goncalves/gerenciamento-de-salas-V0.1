import { Request, Response } from 'express'
import multer, { FileFilterCallback } from 'multer'

import { exec, spawn } from 'child_process'
// Run this command in your terminal: npm install --save-dev @types/glob
import fs from 'fs'
import path from 'path'
import glob from 'glob'

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: FileFilterCallback
) => {
  // Validate the file type if needed
  // For example, only allow .xlsx files
  if (
    file.mimetype !==
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  ) {
    return cb(new Error('Invalid file type. Only .xlsx files are allowed.'))
  }
  cb(null, true)
}

export class ETLControllers {
  async upload (req: Request, res: Response) {
    console.log('upload')

    //grab course_id by url params
    const course_id = req.params.course_id

    console.log(course_id)

    const storage = multer.diskStorage({
      destination: (req, file, cb) => {
        cb(null, path.resolve('uploads')) // Set the destination folder for uploaded files
      },
      filename: (req, file, cb) => {
        const timestamp = Date.now()
        cb(null, `${course_id}_${timestamp}_${file.originalname}`) // Use the original file name
      }
    })

    const upload = multer({ storage, fileFilter })

    try {
      const previousFilePath = path.join(
        __dirname,
        '../../',
        'uploads',
        `*${course_id}_*`
      )
      const filesToDelete = glob.sync(previousFilePath)
      filesToDelete.forEach((file: string) => {
        fs.unlinkSync(file)
        console.log(`Deleted previous file: ${file}`)
      })

      await upload.single('file')(req, res, error => {
        if (error) {
          return res.status(400).json({ error: error.message })
        }

        if (!req.file) {
          return res.status(400).json({ error: 'No file uploaded' })
        }

        const uploadedFile = req.file
        const filePath = path.join(
          __dirname,
          '../../',
          'python_scripts',
          'script.py'
        )

        console.log(uploadedFile.path)

        const childProcess = spawn('python', [
          filePath,
          uploadedFile.path,
          course_id
        ])

        let stdoutData = ''
        let stderrData = ''

        childProcess.stdout.on('data', data => {
          stdoutData += data.toString()
        })

        childProcess.stderr.on('data', data => {
          stderrData += data.toString()
        })

        childProcess.on('error', err => {
          console.error('Child process error:', err)
          return res.status(500).json({ error: 'Failed to process the file' })
        })

        childProcess.on('exit', code => {
          if (code === 0) {
            // File processed successfully
            return res.json({
              message: 'File uploaded and processed successfully',
              stdout: stdoutData,
              stderr: stderrData
            })
          } else {
            console.error('Child process exited with code:', code)
            console.error('Child process stderr:', stderrData)
            return res.status(500).json({
              error: 'Failed to process the file',
              stdout: stdoutData,
              stderr: stderrData
            })
          }
        })
      })
    } catch (error) {
      console.error('An error occurred:', error)
      return res.status(500).json({ error: 'Failed to upload the file' })
    }
  }

  async download (request: Request, response: Response) {
    const filePath = path.join(
      __dirname,
      '../../templates/TEMPLATE_BASE_DADOS1.6.xlsx'
    ) // Caminho para o arquivo no servidor

    const fileName = 'TEMPLATE_BASE_DADOS.xlsx'

    response.setHeader(
      'Content-Disposition',
      `attachment; filename="${fileName}"`
    )

    // Envie o arquivo como resposta
    response.sendFile(filePath)
  }

  async downloadFileById (request: Request, response: Response) {
    const { course_id } = request.params

    // const filePath = path.join(__dirname, `../../templates/${course_id}.xlsx`) // Caminho para o arquivo no servidor
    // const fileName = `${course_id}.xlsx`

    const previousFilePath = path.join(
      __dirname,
      '../../',
      'uploads',
      `*${course_id}_*`
    )

      const filePathToSendToPython = glob.sync(previousFilePath)

      console.log(filePathToSendToPython)
    // Path to the Python script
    const pythonScriptPath = path.join(
      __dirname,
      '../../',
      'python_scripts',
      'scriptFileDownload.py'
    )
    // Run the Python script
    
    exec(
      `python ${pythonScriptPath} ${filePathToSendToPython} ${course_id}`,
      (error: any, stdout: any, stderr: any) => {
        // if (error) {
        //   console.error(`Error executing Python script: ${error.message}`)
        //   return
        // }
        // if (stderr) {
        //   console.error(`Python script execution error: ${stderr}`)
        //   return
        // }

        const filePath = String(filePathToSendToPython)

        const fileName = `${course_id}_filledtemplate.xlsx`
        response.setHeader(
          'Content-Disposition',
          `attachment; filename="${fileName}"`
        )

        console.log('Python script executed successfully')
        console.log('Python script stdout:', stdout)

        // Send the file as a response
        response.sendFile(filePath)
      }
    )
  }
}

//   async create (request: Request, response: Response) {
//     console.log('create agendamento')

//     const { date, id_professor, ids_grade, id_laboratorio } = request.body

//     if (!date || !id_professor || !ids_grade || !id_laboratorio)
//       return response.status(400).json({ message: 'missing data' })

//     console.log(date, id_professor, ids_grade, id_laboratorio)

//     if (ids_grade.length === 0)
//       return response.status(400).json({ message: 'missing data' })

//     ids_grade.forEach(async (id_grade: any) => {
//       const query = ` SELECT horario_inicio, horario_fim FROM grade WHERE id = ${id_grade} `

//       const horariosImportadosGrade = await gradeRepositories.query(query)

//       console.log(horariosImportadosGrade)

//       const horario_inicio = horariosImportadosGrade[0].horario_inicio
//       const horario_fim = horariosImportadosGrade[0].horario_fim

//       try {
//         const newAgendamento = agendamentosRepository.create({
//           date,
//           horario_inicio,
//           horario_fim,
//           id_professor,
//           id_grade,
//           id_laboratorio,
//           created_at: new Date(),
//           updated_at: new Date()
//         })

//         await agendamentosRepository.save(newAgendamento)

//         console.log(`agendamento created with id ${newAgendamento.id}`)
//       } catch (error) {
//         console.log(error)
//         return response.status(500).json({ message: 'internal server error' })
//       }
//     })

//     return response.status(201).json({ message: 'agendamento created' })
//   }

//   async get (request: Request, response: Response) {
//     console.log('GET agendamento')

//     try {
//       const agendamentos = await agendamentosRepository.find()

//       agendamentos.sort((a, b) => {
//         return (
//           new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
//         )
//       })

//       //grab professor_id find his name

//       const agendamentoWithProfessorName = await Promise.all(
//         agendamentos.map(async (agendamento: any) => {
//           const id_professor = agendamento.id_professor

//           const queryProfessor = ` SELECT name FROM professores WHERE id = ${id_professor} `
//           const nomeProfessor = await gradeRepositories.query(queryProfessor)
//           console.log(nomeProfessor)

//           agendamento.nome_professor = nomeProfessor[0]?.name || ''

//           return agendamento
//         })
//       )

//       console.log(JSON.stringify(agendamentoWithProfessorName, null, 2))

//       // const newAgendamento = await agendamentos.map(
//       //   async (agendamento: any) => {
//       //     const id_professor = agendamento.id_professor

//       //     const id_laboratorio = agendamento.id_laboratorio

//       //     const queryProfessor = ` SELECT nome_completo FROM professores WHERE id = ${id_professor} `

//       //     const queryLaboratorio = ` SELECT descricao FROM laboratorios WHERE id = ${id_laboratorio} `

//       //     // const queryGrade = ` SELECT nome FROM grade WHERE id = ${id_grade} `
//       //     // const queryDiscipla = ` SELECT nome FROM disciplina WHERE id = ${} `
//       //     // const nomeDisciplina = await gradeRepositories.query(queryGrade)

//       //     const nomeProfessor = await gradeRepositories.query(queryProfessor)
//       //     const nomeLaboratorio = await gradeRepositories.query(
//       //       queryLaboratorio
//       //     )

//       //     agendamento.nome_professor = nomeProfessor[0].nome
//       //     // agendamento.nome_grade = nomeGrade[0].nome
//       //     agendamento.nome_laboratorio = nomeLaboratorio[0].nome

//       //     return [
//       //       ...agendamento,
//       //       agendamento.nome_professor,
//       //       // agendamento.nome_grade,
//       //       agendamento.nome_laboratorio
//       //     ]
//       //   }
//       // )
//       // console.log(newAgendamento)

//       // const NomeProfessor = await gradeRepositories.query(` SELECT nome FROM professor WHERE id = ${id_professor} `);
//       // console.log(NomeProfessor)

//       return response.status(200).json(agendamentos)
//     } catch (error) {
//       console.log(error)
//       return response.status(500).json({ message: 'internal server error' })
//     }
//   }

//   async getLaboratoriosSchedule (request: Request, response: Response) {

//     try {
//       const { date } = request.body
//       console.log('get Schedules ' + date + '------------------------')
//       console.log(date)

//       const isoDate = new Date(date)
//       isoDate.setHours(0, 0, 0, 0)

//       const allAgendamentos = await agendamentosRepository.find()

//       const agendamentos = allAgendamentos.filter(a => isSameDay(new Date(a.date), isoDate));

//       console.log(agendamentos)

//       //#TODO - get all professors names DONE

//        //----------------------------------------------------
//       const allProfessors = await professoresRepository.find()

//       const newProfessores = await allProfessors.map((professor: any) => {
//         const id = professor.id
//         const name = professor.name
//         const obj = {
//             id: id,
//             name: name
//         }
//         return obj
//       })

//       console.log(newProfessores)

//       //atualizando os agendamentos com os nomes dos professores

//       const updatedAgendamentos = agendamentos.map(agendamento => {
//         // Find the professor with the same id as the current Agendamento's id_professor
//         const professor = allProfessors.find(prof => prof.id === agendamento.id_professor);

//         // Return a new object with all of the original Agendamento properties and the professor_name
//         return {
//           ...agendamento,
//           professor_name: professor ? professor.name : null
//         };
//       });

//       // console.log(updatedAgendamentos);

//  //----------------------------------------------------
//       //#TODO - gmake ids go from 1 to ++ - DOING

// //----------------------------------------------------
//       let scheduleData: any = {}

//       let slotIdCounter = 1;

//       // Create schedule for each laboratory
//       for (let lab = 1; lab <= 7; lab++) {
//         let labSchedule = []

//         for (let i = 1; i <= 5; i++) {
//           let agendamento = updatedAgendamentos.find(
//             a =>
//               new Date(a.date).getDay() == lab &&
//               getTimeSlot(a.horario_inicio) == i
//           )

//           let slotData = {
//             id: slotIdCounter,
//             disponivel: agendamento ? false : true,
//             agendamento: agendamento ? agendamento : undefined
//           }

//           labSchedule.push(slotData)
//           slotIdCounter++;
//         }

//         scheduleData[`laboratorio${lab}`] = labSchedule;
//       }

//       return response.status(200).json(scheduleData)

//     } catch (error) {
//       console.error(error)
//       return response.status(500).json({ message: 'Internal server error' })
//     }
//   }

//   async delete (request: Request, response: Response) {
//     const id = Number(request.params.id)

//     try {
//       const options: FindOneOptions<Agendamento> = {
//         where: { id: id }
//       }

//       const agendamento = await agendamentosRepository.findOne(options)

//       if (!agendamento) {
//         return response.status(404).json({ message: 'Agendamento not found' })
//       }

//       await agendamentosRepository.delete(id)

//       console.log(`Agendamento with id ${id} deleted`)

//       return response.status(204).send()
//     } catch (error) {
//       console.error(error)
//       return response.status(500).json({ message: 'Internal server error' })
//     }
//   }

//   async update (request: Request, response: Response) {
//     const id = Number(request.params.id)
//     const {
//       date,
//       horario_inicio,
//       horario_fim,
//       id_professor,
//       id_grade,
//       id_laboratorio
//     } = request.body

//     // console.log(
//     //   id,
//     //   date,
//     //   horario_inicio,
//     //   horario_fim,
//     //   id_professor,
//     //   id_grade,
//     //   id_laboratorio
//     // )

//     try {
//       const options: FindOneOptions<Agendamento> = {
//         where: { id: id }
//         // other options here, such as relations or order
//       }

//       const agendamento = await agendamentosRepository.findOne(options)

//       if (!agendamento) {
//         return response.status(404).json({ message: 'Agendamento not found' })
//       }

//       agendamentosRepository.merge(agendamento, {
//         date,
//         horario_inicio,
//         horario_fim,
//         id_professor,
//         id_grade,
//         id_laboratorio,
//         updated_at: new Date()
//       })

//       const results = await agendamentosRepository.save(agendamento)

//       console.log(`Agendamento with id ${id} updated`)

//       return response.status(200).json(results)
//     } catch (error) {
//       console.error(error)
//       return response.status(500).json({ message: 'Internal server error' })
//     }
//   }
// }
// function getTimeSlot (horario_inicio: string): number {
//   switch (horario_inicio) {
//     case '18:45':
//       return 1
//     case '19:35':
//       return 2
//     case '20:25':
//       return 3
//     case '20:35':
//       return 4
//     case '21:25':
//       return 5
//     default:
//       // you might want to throw an error here if the given time does not match any slot
//       return -1
//   }
// }
