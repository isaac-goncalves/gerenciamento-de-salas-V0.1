import { Request, Response } from "express";
import { agendamentosRepository } from "../repositories/agendamentoRepository";

export class AgendamentoController {


  async create(request: Request, response: Response) {
    console.log("create agendamento");

    const {
      date,
      horario_inicio,
      horario_fim,
      id_professor,
      id_grade,
      id_laboratorio,
    } = request.body;

    try {
      const newAgendamento = agendamentosRepository.create({
        date,
        horario_inicio,
        horario_fim,
        id_professor,
        id_grade,
        id_laboratorio,
        created_at: new Date(),
        updated_at: new Date(),
      });

      await agendamentosRepository.save(newAgendamento);

      console.log(`agendamento created with id ${newAgendamento.id}`);
      return response.status(201).json(newAgendamento);
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "internal server error" });
    }
  }
}