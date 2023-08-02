import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ModalOverlay, ModalContent } from './ModalDelete.styles'

interface ModalProps {
  isVisible: boolean
  onClose: Function
  deleteData: any
}

interface deleteData {
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

const ModalDelete = ({
  isVisible,
  onClose,
  deleteData
}: ModalProps) => {
  if (!isVisible) return null

  useEffect(() => {

    console.log("DeleteData")
    console.log(deleteData)

    function onEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', onEsc)

    return () => {
      window.removeEventListener('keydown', onEsc)
    }
  }, [])

  async function handleDelete() {
    try {
      const params = {
        ids : [deleteData.id]
      }
      const response = await fetch(`http://localhost:3333/agendamento`, {
        method: 'DELETE',
        body: JSON.stringify(params),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        toast.success('Agendamento deletado com sucesso!');
        onClose(true);
      } else {
        toast.error('Erro ao deletar agendamento, tente novamente.');
      }
    } catch (error) {
      toast.error('Erro ao deletar agendamento, tente novamente.');
    }
  }

  return (
    <ModalOverlay onClick={() => onClose()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Deletar agendamento</h2>
        <p>ID:{deleteData.id}</p>
        <p>Nome do Professor: </p>
        <p>{deleteData.id_professor}</p>
        <p>Data de agendamento</p>
        <p>{deleteData.date}</p>
        <p>Horario de Inicio</p>
        <p>{deleteData.horario_inicio}</p>
        <p>Horario de Fim</p>
        <p>{deleteData.horario_fim}</p>
        <p>laboratorio</p>
        <p>{deleteData.id_laboratorio}</p>
        <p>Grade</p>
        <p>{deleteData.id_grade}</p>
        <button onClick={() => handleDelete()}>Deletar</button>
        <button onClick={() => onClose()}>Cancelar</button>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ModalDelete
