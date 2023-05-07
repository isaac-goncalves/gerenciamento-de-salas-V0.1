import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ModalOverlay, ModalContent } from './ModalEdit.styles'

interface ModalProps {
  isVisible: boolean
  onClose: Function
  editedData: any
}

interface EditedData {
  id: number;
  date: string;
  horario_inicio: string;
  horario_fim: string;
  id_professor: string;
  id_grade: string;
  id_laboratorio: string;
  created_at: string;
  updated_at: string;
}

const ModalEdit = ({
  isVisible,
  onClose,
  editedData

}: ModalProps) => {


  if (!isVisible) return null
  const [formData, setFormData] = useState<EditedData>(editedData);

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
        onClose()
      }
    } catch (error) {
      toast.error('Erro ao editar agendamento, tente novamente.')
    }
  }

  useEffect(() => {

    console.log("Formdata")

    console.log(formData)

    console.log("editedData")

    console.log(editedData)
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

    function onEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onEsc)

    return () => {
      window.removeEventListener('keydown', onEsc)
    }
  }, [formData])


  // ... rest of the component

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <ModalOverlay onClick={() => onClose()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Editar Agendamento</h2>
        <p>{JSON.stringify(formData, null, 2)}</p>
        <p>ID: {formData.id}</p>
        <p>Nome do Professor: </p>
        <input type="text" name="id_professor" value={formData.id_professor} onChange={handleChange} />
        <p>Data de agendamento</p>
        <input type="text" name="id" value={formData.date} onChange={handleChange} />
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