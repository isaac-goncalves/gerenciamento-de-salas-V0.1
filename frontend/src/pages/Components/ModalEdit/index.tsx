import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

import { ModalOverlay, ModalContent, ImageWrapper, FormWrapper, BackgroundImage, DateTimeWrapper, ButtonsWrapper, DetailsWrapper, DetailsText, ClockTimeWrapper, SideBysideContainer, StyledButton, DateTimeDiv, ProfessorWrapper, StyledTitle, StyledSelect, ClocktimeAndButoonsWrapper } from './ModalEdit.styles'

import background from '../../../../public/images/background.jpg';

import { format, parseISO } from 'date-fns';

import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import ScheduleViewer from '../ScheduleViewer';
import { Laboratorio } from '../../Agendamentos/Agendamento.styles';

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

interface LaboratoryProps {
  id: number;
  descricao: string;
  andar: number;
  capacidade: number;
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

  const [professores, setProfessores] = useState<ProfessoreProps[]>([]);

  const [laboratory, setLaboratory] = useState<LaboratoryProps[]>([]);




  const [startDate, setStartDate] = useState<Date>();

  const [selectedLaboratory, setSelectedLaboratory] = useState<Number>();
  const [selectedProfessor, setSelectedProfessor] = useState<Number>();

  async function handleEdit() {

    const updatedFormData = {
      ...formData,
      date: startDate,
      id_laboratorio: selectedLaboratory,
      id_professor: selectedProfessor,
      nome_professor: professores.find(professor => professor.id === selectedProfessor)?.name
    }

    try {
      const response = await fetch(`http://localhost:3333/agendamento/${formData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedFormData)
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

    console.log(editedData)

    setFormData(editedData);

    const fetchProfessorData = async () => {
      try {
        await fetchProfessors("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjgzODQ1Mzc0LCJleHAiOjE2ODM4NzQxNzR9.rCD-m5-nyNEdCLgs8p-ON71dsEAByLbtb9A_xwj-eC4");

        console.log("editedData.id_professor")
        console.log(editedData.id_professor)

        if (editedData.id_professor) {

          setSelectedProfessor(editedData.id_professor);

        }

        console.log(selectedProfessor)

      } catch (error) {
        console.log(error); // Handle the error appropriately
      }
    };

    const fetchLaboratoryData = async () => {
      try {
        await fetchLaboratory("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjgzODQ1Mzc0LCJleHAiOjE2ODM4NzQxNzR9.rCD-m5-nyNEdCLgs8p-ON71dsEAByLbtb9A_xwj-eC4");

        console.log("editedData.laboratory")
        console.log(editedData.id_laboratorio)

        if (editedData.id_laboratorio) {

          setSelectedLaboratory(editedData.id_laboratorio);

        }
        console.log("selectedLaboratory")
        console.log(selectedLaboratory)

      } catch (error) {
        console.log(error); // Handle the error appropriately
      }
    };

    fetchProfessorData();
    fetchLaboratoryData();

    console.log("editedData")

    console.log(editedData)

    console.log("Formdata")

    console.log(formData)

    console.log("selectedProfessor")
    console.log(selectedProfessor)

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

  async function fetchLaboratory(token: string) {
    console.log("Fetching fetchLaboratory...")
    await fetch('http://localhost:3333/laboratory', {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + token,
      }
    }).then((response) => response.json()).then((data) => {
      console.log(data)
      return setLaboratory(data.reverse())
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

    console.log(selectedId)

    if (selectedId) {
      setSelectedProfessor(selectedId);
      // Update the selectedProfessorId state instead of formData
    }
  }

  const handleLaboratoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    console.log(event.target.value)

    const selectedLab = parseInt(event.target.value);

    console.log(selectedLab)

    if (selectedLab) {
      setSelectedLaboratory(selectedLab);
      // Update the selectedProfessorId state instead of formData
    }
  }

  const GetDayOfWeek = (date: any) => {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const dayOfWeek = daysOfWeek[date.getDay()];

    return dayOfWeek;
  }

  return (
    <ModalOverlay onClick={() => onClose()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ImageWrapper>
          <BackgroundImage src={background} />
        </ImageWrapper>
        <FormWrapper>
          <StyledTitle>Editar Agendamento</StyledTitle>
          {/* <p>{JSON.stringify(formData, null, 2)}</p> */}
          {/* <p>ID: {formData.id}</p> */}
          <ProfessorWrapper>
            <DetailsText>Professor:</DetailsText>
            <StyledSelect value={selectedProfessor || ''} onChange={handleSelectProfessorChange}>
              {professores.length > 0 ? (
                professores.map((professor) => (
                  <option key={professor.id} value={professor.id}>
                    {professor.name}
                  </option>
                ))
              ) : (
                <option value="">No professors available</option>
              )}
            </StyledSelect>
          </ProfessorWrapper>
          <DateTimeWrapper>
            <DateTimeDiv>
              <DetailsText>Data de agendamento</DetailsText>
              <DatePicker selected={startDate} onChange={(date) => {
                setStartDate(date || new Date())
                setFormData({ ...formData, date: date || new Date() })
              }} />
            </DateTimeDiv>
            <DateTimeDiv>
              <DetailsText>Dia da Semana:</DetailsText>
              {/* <p>{GetDayOfWeek(startDate)}</p> */}
              <p>Segunda-Feira</p>
            </DateTimeDiv>
          </DateTimeWrapper>
          <SideBysideContainer>
            <DetailsWrapper>
              <div>


                <DetailsText>Semestre:</DetailsText>
                <StyledSelect value={selectedLaboratory || ''} onChange={handleLaboratoryChange}>
                  {laboratory.length > 0 ? (
                    laboratory.map((laboratory) => (
                      <option key={laboratory.id} value={laboratory.id}>
                        {laboratory.descricao}
                      </option>
                    ))
                  ) : (
                    <option value="">No professors available</option>
                  )}
                </StyledSelect>
              </div>
              <div>
                <DetailsText>Laboratório:</DetailsText>
                <StyledSelect value={selectedLaboratory || ''} onChange={handleLaboratoryChange}>
                  {laboratory.length > 0 ? (
                    laboratory.map((laboratory) => (
                      <option key={laboratory.id} value={laboratory.id}>
                        {laboratory.descricao}
                      </option>
                    ))
                  ) : (
                    <option value="">No professors available</option>
                  )}
                </StyledSelect>
              </div>
              <DetailsText>Andar: <span>Segundo Andar</span></DetailsText>
              <DetailsText>Criado em: <span>Segundo Andar</span></DetailsText>
              <DetailsText>Editado em: <span>Segundo Andar</span></DetailsText>
            </DetailsWrapper>
            <ClocktimeAndButoonsWrapper>
              <ClockTimeWrapper>
                <ScheduleViewer props={formData} />
              </ClockTimeWrapper>
              <ButtonsWrapper>
                <StyledButton onClick={() => handleEdit()}>Editar</StyledButton>
                <StyledButton onClick={() => onClose()}>Cancelar</StyledButton>
              </ButtonsWrapper>
            </ClocktimeAndButoonsWrapper>
          </SideBysideContainer>
        </FormWrapper>
      </ModalContent>
    </ModalOverlay>
  )
}

export default ModalEdit