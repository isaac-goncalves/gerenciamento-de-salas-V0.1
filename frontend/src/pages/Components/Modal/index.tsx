import React, { useEffect } from 'react';
import styled from 'styled-components';

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;

  animation: appear 0.8s;
    @keyframes appear {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }

`;

const ModalContent = styled.div`
  background: white;
  padding: 2rem;
  border-radius: 8px;
`;

async function handleSubmitAgendamento(selectedIds: number[]) {

  console.log(selectedIds)

  const data = {
    "date": "2023-04-01",
    "horario_inicio": "09:00:00",
    "horario_fim": "12:00:00",
    "id_professor": "1234",
    "id_grade": "5678",
    "id_laboratorio": "9012"
  }

  fetch('http://localhost:3333/agendamento', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },

    body: JSON.stringify(data),
  })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  //close modal

  //send to agendamentos screen

}

const labs = [[1, 2, 3, 4, 5],
[6, 7, 8, 9, 10],
[11, 12, 13, 14, 15],
[16, 17, 18, 19, 20],
[21, 22, 23, 24, 25],
[26, 27, 28, 29, 30],
[31, 32, 33, 34, 35]
];

function mapValuesToStrings(array: number[]) {
  const strings = [
    '1ª Aula: 18:45 - 19:35',
    '2ª Aula: 19:35 - 20:25',
    '3ª Aula: 20:25 - 20:35',
    '4ª Aula: 20:35 - 21:25',
    '5ª Aula: 21:25 - 22:15'
  ];
  const result = [];
  for (let i = 0; i < array.length; i++) {
    const index = array[i] - 1; // Adjust index to match the 0-based array index
    result.push(strings[index]);
  }
  return result;
}

function idsToGroups(ids: number[]) {
  const groups = [];
  for (let i = 0; i < labs.length; i++) {
    const lab = labs[i];
    const group = [];
    for (let j = 0; j < ids.length; j++) {
      if (lab.includes(ids[j])) {
        group.push(lab.indexOf(ids[j]) + 1);
      }
    }
    if (group.length > 0) {
      groups.push(group);
    }
  }
  return groups;
}

function mapResultToSelected(result: number[], selected: number[]): number[] {
  return selected.map((index) => result[index - 1]).filter(Boolean);
}

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  WeekdayGradeIds: number[];
  selectedWeekday: string;
  selectedIds: number[];
  selectedLaboratory: number;
  startDate: Date | null;
}

const Modal = ({ isVisible, onClose, WeekdayGradeIds, selectedWeekday, selectedIds, selectedLaboratory, startDate }: ModalProps) => {
  if (!isVisible) return null;

  const transformedIds = idsToGroups(selectedIds);

  const HorariosTranformed = mapValuesToStrings(transformedIds[0]);

  useEffect(() => {

    console.log(selectedIds)
    console.log(WeekdayGradeIds)

    const transformedIds = idsToGroups(selectedIds);

    console.log(transformedIds)

    const gradeIds = mapResultToSelected(WeekdayGradeIds, transformedIds[0])

    const HorariosTransformed = mapValuesToStrings(transformedIds[0]);
   
    console.log(HorariosTransformed);

    console.log("Final grade Ids= " + gradeIds)

    function onEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    window.addEventListener('keydown', onEsc);

    return () => {
      window.removeEventListener('keydown', onEsc);
    };
  }, []);

  return (
    <ModalOverlay onClick={onClose}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <h2>Confirme os dados do agendamento</h2>
        <p>Nome do Professor: </p>
        <p>Laboratorio: {selectedLaboratory}</p>
        <p>Data: {String(startDate)}</p>
        <p>Dia da Semana: {selectedWeekday}</p>
        <h3>Horarios:</h3>
        {HorariosTranformed.map((id) => {
          return <p>{id}</p>
        })
        }
        <button onClick={() => handleSubmitAgendamento(selectedIds)}>
          Confirmar agendamento
        </button>
      </ModalContent>
    </ModalOverlay>
  );
}

export default Modal;