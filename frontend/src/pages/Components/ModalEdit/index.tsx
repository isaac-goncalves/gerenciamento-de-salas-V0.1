import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ModalOverlay, ModalContent, ProfessorSelect } from './ModalEdit.styles'

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

interface ModalProps {
  isVisible: boolean
  onClose: Function
  editedData: any
}

interface EditedData {
  id: number;
  date: any;
  horario_inicio: string;
  horario_fim: string;
  id_professor: string;
  id_grade: string;
  id_laboratorio: string;
  created_at: string;
  updated_at: string;
}

interface ProfessoreProps {
  id: number;
  name: string;
}

interface Professor {
  id: number;
  name: string;
}

const ModalEdit = ({
  isVisible,
  onClose,
  editedData

}: ModalProps) => {


  if (!isVisible) return null
  const [formData, setFormData] = useState<EditedData>(editedData);

  const [selectedProfessorId, setSelectedProfessorId] = useState("");

  const [professores, setProfessores] = useState<ProfessoreProps[]>([
    {
      id: 0,
      name: "Selecione um professor",
    },
  ]);

  const [startDate, setStartDate] = useState<Date>();

  const [selectedProfessor, setSelectedProfessor] = useState<Professor>(
    {
      id: 0,
      name: "Selecione um professor",
    },
  );

  async function handleEdit() {
    try {
      const response = await fetch(`http://localhost:3333/agendamento/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      })

      const data = await response.json()

      if (data) {
        toast.success('Agendamento editado com sucesso!')
        onClose(true)
      }
    } catch (error) {
      toast.error('Erro ao editar agendamento, tente novamente.')
    }
  }
  
  useEffect(() => {

    fetchProfessors("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjgzODQ1Mzc0LCJleHAiOjE2ODM4NzQxNzR9.rCD-m5-nyNEdCLgs8p-ON71dsEAByLbtb9A_xwj-eC4"); //add token verification after login

    setFormData(editedData);

    console.log("editedData")

    console.log(editedData)

    console.log("Formdata")

    console.log(formData)
    
    setStartDate(new Date(formData.date))

    //  const exampleEditedData = {
    //     "id": 26,
    //     "date": "2023-04-14T19:17:02.673Z",
    //     "horario_inicio": "21:25",
    //     "horario_fim": "22:15",
    //     "id_professor": "12",
    //     "id_grade": "24",
    //     "id_laboratorio": "7",
    //     "created_at": "2023-04-12T19:17:14.002Z",
    //     "updated_at": "2023-04-12T19:17:14.002Z"
    // }

    const initialSelectedProfessor = professores.find((professor) => professor.id.toString() === editedData.id_professor);
    if (initialSelectedProfessor) {
      setSelectedProfessor(initialSelectedProfessor);
    }

    function onEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onEsc)

    return () => {
      window.removeEventListener('keydown', onEsc)
    }
  }, [editedData])

  async function fetchProfessors(token: string) {
    console.log("Fetching fetchProfessors...")
    await fetch('http://localhost:3333/professors', {
      method: 'POST',
      headers: {
        'Authorization': 'bearer ' + token,
      }
    }).then((response) => response.json()).then((data) => {
      // console.log(data)
      return setProfessores(data)
    });
  }

  // ... rest of the component

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectProfessorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)
  
    const selectedId = parseInt(event.target.value);
    const selected = professores.find((professor) => professor.id === selectedId);
  
    console.log(selected)
  
    if (selected) {
      setSelectedProfessor(selected);
      // Update the selectedProfessorId state instead of formData
      setSelectedProfessorId(selected.id.toString());
    }
  }

  return (
    <ModalOverlay onClick={() => onClose()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Editar Agendamento</h2>
        <p>{JSON.stringify(formData, null, 2)}</p>
        <p>ID: {formData.id}</p>
        <p>Nome do Professor: </p>

        <ProfessorSelect defaultValue={selectedProfessor.name} onChange={handleSelectProfessorChange}>
          {
            professores && professores.length > 0 ? (
              professores.map((professor) => {
                return (
                  <option key={professor.id} value={professor.id}>
                    {professor.name}
                  </option>
                );
              })
            ) : (
              <option value="">No professors available</option>
            )
          }
        </ProfessorSelect>

        <input type="text" name="id_professor" value={formData.id_professor} onChange={handleChange} />
        <p>Data de agendamento</p>
        <input type="text" name="id" value={startDate || ""} />
        
        <DatePicker selected={startDate} onChange={(date) => {
          setStartDate(date || new Date())
          setFormData( {...formData, date: date || new Date() } )
        }} />
        <p>Horario de Inicio</p>
        
        <input type="text" name="horario_inicio" value={formData.horario_inicio} onChange={handleChange} />
        <p>Horario de Fim</p>
        <input type="text" name="horario_fim" value={formData.horario_fim} onChange={handleChange} />
        <p>laboratorio</p>
        <input type="text" name="id_laboratorio" value={formData.id_laboratorio} onChange={handleChange} />
        <p>Grade</p>
        <input type="text" name="id_grade" value={formData.id_grade} onChange={handleChange} />
        <p>updated_at</p>
        <button onClick={() => handleEdit()}>Editar</button>
        <button onClick={() => onClose()}>Cancelar</button>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ModalEdit