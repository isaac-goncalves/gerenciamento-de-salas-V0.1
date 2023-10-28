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
  ProfessorWrapper,
  StyledTitle,
  StyledSelect,
  ClocktimeAndButoonsWrapper,

} from './ModalAskSemestre.styles'

const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);
console.log(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL)

import "react-datepicker/dist/react-datepicker.css";

interface ModalProps {
  isVisible: boolean
  onCloseModalAskSemester: Function
}

const ModalAskSemestre = ({
  isVisible,
  onCloseModalAskSemester,
}: ModalProps) => {

  if (!isVisible) return null

  //STATES
  const [semestres, setSemestres] = useState<Number[]>(
    [1, 2, 3, 4, 5, 6]
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

    if (userData.token === '' || userData.userData.id === 0) {
      console.log('userData is null');

      const localUserData = localStorage.getItem('gerenciamento-de-salas@v1.2');
      const userDataJson = JSON.parse(localUserData || '{}');
      const { userData: storedUserData, token } = userDataJson;

      console.log(JSON.stringify(storedUserData));
      console.log('token' + token);

      if (token == null || localUserData == null) {
        toast.error('Você precisa estar logado para acessar essa página!');
        localStorage.removeItem('gerenciamento-de-salas@v1.2');
        setTimeout(() => {
          window.location.href = '/';
        }, 2000);
      } else {
        setUserData({ userData: storedUserData, token });
      }
    }
  }, []);

  //HANDLE CLICKS

  async function handleEdit() {

    toast.success('Semestre padrão alterado com sucesso!');

    //set userData.userData.SemesterVerified to true and update token

    const newUserData = {
      token: userData.token,
      userData: {
        ...userData.userData,
        semester: selectedSemester,
        semesterverified: true
      }
    }


    localStorage.setItem("gerenciamento-de-salas@v1.2", JSON.stringify(newUserData))

    setUserSemestre(selectedSemester)

    onCloseModalAskSemester(selectedSemester);

  }

  async function setUserSemestre(semestre: Number) {
    const params = {
      semestre: selectedSemester,
      email: userData.userData.email,
    }

    await fetch(String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + `/usuarios/semestre`, {
      method: 'POST',
      body: JSON.stringify(params),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'bearer ' + userData.token,
      },
    }).then((response) => response.json()).then((data) => {
      console.log(data)
      return data
    }).catch((error) => {
      console.log(error)
    })
  }
  //HANDLE SELECTS
  const handleSelectSemestreChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)

    const selectedId = parseInt(event.target.value);

    console.log(selectedId)

    if (selectedId) {
      setSemesterProfessor(selectedId);
      // Update the selectedProfessorId state instead of formData
    }
  }

  return (
    <ModalOverlay onClick={() => onCloseModalAskSemester()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <FormWrapper>
          <StyledTitle>
            Selecione o semestre/curso padrão
          </StyledTitle>
          <SideBysideContainer>
            <ProfessorWrapper>
              <DetailsText>Semestre:</DetailsText>
              <StyledSelect
                value={selectedSemester || ''}
                onChange={handleSelectSemestreChange}
              >
                {semestres.length > 0 ? (
                  semestres.map((semestre) => (
                    <option key={String(semestre)} value={String(semestre)}>
                      {String(semestre)}º Semestre
                    </option>
                  ))
                ) : (
                  <option value="">No professors available</option>
                )}
              </StyledSelect>

              <DetailsText>Curso:</DetailsText>
              <StyledSelect
                value={selectedSemester || ''}
                onChange={handleSelectSemestreChange}
              >
                {semestres.length > 0 ? (
                  semestres.map((semestre) => (
                    <option key={String(semestre)} value={String(semestre)}>
                      {String(semestre)}º Semestre
                    </option>
                  ))
                ) : (
                  <option value="">No professors available</option>
                )}
              </StyledSelect>
            </ProfessorWrapper>
            <ClocktimeAndButoonsWrapper>
              <ButtonsWrapper>
                <StyledButton onClick={() => handleEdit()}>
                  OK
                </StyledButton>
                <StyledButton onClick={() => onCloseModalAskSemester()}>
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
export default ModalAskSemestre
