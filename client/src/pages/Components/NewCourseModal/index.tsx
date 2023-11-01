import React, { useEffect, useLayoutEffect, useState } from 'react'
import { toast } from 'react-toastify'
import {
  ModalOverlay,
  ModalContent,
  FormWrapper,
  ButtonsWrapper,
  DetailsText,
  SideBysideContainer,
  StyledButton,
  CardWrapper,
  StyledTitle,
  StyledSelect,
  ClocktimeAndButoonsWrapper,

} from './ModalAskSemestre.styles'

const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);
console.log(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL)

import "react-datepicker/dist/react-datepicker.css";
import Swal from 'sweetalert2';

interface ModalProps {
  isVisible: boolean
  onClose: Function
}

const NewCourseModal = ({
  isVisible,
  onClose,
}: ModalProps) => {

  if (!isVisible) return null

  //STATES
  const [newCourse, setNewCourse] = useState<any>(
    ""
  );

  const [selectedSemester, setSemesterProfessor] = useState<Number>(1);

  //USERSESSIONDATA
  const [userData, setUserData] = useState<any>(
    {
      userData: {
        id: 0,
        name: "Selecione um professor",
      },
      token: ""
    }
  );

  //USEFECCTS
  useLayoutEffect(() => {
    console.log('Starting to render stuff...');

  }, []);

  //HANDLE CLICKS

  async function handleCreateNewCourse() {
    //set userData.userData.SemesterVerified to true and update token
    createNewCourse(newCourse);

    onClose(selectedSemester);

  }

  async function createNewCourse(course: String) {


    Swal.fire({

      title: 'Tem certeza que deseja criar um novo curso?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',

      confirmButtonText: 'Sim, criar novo curso!'

    }).then(async (result: any) => {
      if (result.isConfirmed) {
        const params = {
          course_name: course
        }

        await fetch(String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + `/course/create`, {
          method: 'POST',
          body: JSON.stringify(params),
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'bearer ' + userData.token,
          },
        }).then((response) => response.json()).then((data) => {
          console.log(data)
          toast.success('Novo curso criado com sucesso!');
          return data
        }).catch((error) => {
          toast.error('Erro ao criar novo curso!');
          console.log(error)
        })
      }
    }
    )
  }


  //HANDLES INPUTS

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    // console.log(event.target.value)

    setNewCourse(event.target.value)

  }

  return (
    <ModalOverlay onClick={() => onClose()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <FormWrapper>
          <StyledTitle>
            Insira o nome do curso
          </StyledTitle>
          <SideBysideContainer>
            <CardWrapper>
              <DetailsText>Nome do Curso:</DetailsText>
              <input
                type="text"
                onChange={handleInput}
                placeholder="Nome do Curso"
                value={newCourse}
              />
            </CardWrapper>
            <ClocktimeAndButoonsWrapper>
              <ButtonsWrapper>
                <StyledButton onClick={() => handleCreateNewCourse()}>
                  OK
                </StyledButton>
                <StyledButton onClick={() => onClose()}>
                  CANCELAR
                </StyledButton>
              </ButtonsWrapper>
            </ClocktimeAndButoonsWrapper>
          </SideBysideContainer>
        </FormWrapper>
      </ModalContent>
    </ModalOverlay >
  )
}
export default NewCourseModal
