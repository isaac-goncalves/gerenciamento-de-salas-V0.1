import React, { useEffect } from 'react'
import { toast } from 'react-toastify'

import { ModalOverlay, ModalContent } from './ModalEdit.styles'

interface ModalProps {
  isVisible: boolean
  onClose: Function
}

const ModalEdit = ({
  isVisible,
  onClose,
}: ModalProps) => {
    if (!isVisible) return null

  useEffect(() => {
    // console.log(selectedIds)
    // console.log(WeekdayGradeIds)

    // const transformedIds = idsToGroups(selectedIds)

    // console.log(transformedIds)

    // const gradeIdstransformed = mapResultToSelected(
    //   WeekdayGradeIds,
    //   transformedIds[0]
    // )

    // setGradeIds(gradeIdstransformed)

    // const HorariosTransformed = mapValuesToStrings(transformedIds[0])

    // console.log(HorariosTransformed)

    // console.log('Final grade Ids= ' + gradeIds)

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

  //   async function handleEditAgendamento (
  //     gradeIds: number[],
  //     selectedLaboratory: number,
  //     selectedDate: Date | null
  //   ) {
  //     console.log(gradeIds)

  // const data = {
  //   "date": "2023-04-01",
  //   "horario_inicio": "09:00:00",
  //   "horario_fim": "12:00:00",
  //   "id_professor": "1234",
  //   "id_grade": "5678",
  //   "id_laboratorio": "9012",
  //   "grade_ids": "1,2,3,4,5" //addition
  // }

  // const finalData: any = {
  //   date: selectedDate,
  //   id_professor: '12',
  //   ids_grade: gradeIds,
  //   id_laboratorio: selectedLaboratory
  // }

  // fetch('http://localhost:3333/agendamento', {
  //   method: 'POST',
  //   headers: {
  //     'Content-Type': 'application/json'
  //   },

  //   body: JSON.stringify(finalData)
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('Success:', data)
  //     toast.success('Agendamento realizado com sucesso!')
  //     onClose(true)
  //   })
  //   .catch(error => {
  //     console.error('Error:', error)
  //   })

  //close modal

  //send to agendamentos screen

  return (
    <ModalOverlay onClick={() => onClose()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Editar Agendamento</h2>
        <p>Nome do Professor: </p>
        {/* <p>Laboratorio: {selectedLaboratory}</p>
        <p>Data: {String(selectedDate)}</p>
        <p>Dia da Semana: {selectedWeekday}</p> */}
        {/* <h3>Horarios:</h3>
        {HorariosTranformed.map(id => {
          return <p>{id}</p>
        })} */}
        {/* <button
          onClick={() =>
            handleSubmitAgendamento()
          }
        >
          Confirmar agendamento
        </button> */}
        <button onClick={() => onClose()}>Cancelar</button>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ModalEdit