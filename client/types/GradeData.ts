export type GradeData = {
    id: string; // Unique identifier for the schedule
    disciplina: string; // Subject or course name
    professor: string; // Professor's name
    laboratorio: string; // Laboratory name
    agendamentos: Array<{ // Array of appointment objects
      id: string; // Unique identifier for the appointment
      horario_inicio: string; // Start time for the appointment
      laboratorio: string; // Laboratory name for the appointment
    }>;
  };