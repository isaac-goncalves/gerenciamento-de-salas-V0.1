import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ModalOverlay, ModalContent, ImageWrapper, FormWrapper, BackgroundImage, DateTimeWrapper, ButtonsWrapper, DetailsWrapper, DetailsText, ClockTimeWrapper, SideBysideContainer, StyledButton, DateTimeDiv, ProfessorWrapper, StyledTitle, StyledSelect, ClocktimeAndButoonsWrapper, StyledText, StyledDates } from './ModalEdit.styles'
import background from '../../../../public/images/background.jpg';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ScheduleViewer from '../ScheduleViewer';
import { Laboratorio } from '../../Agendamentos/Agendamento.styles';

import Swal from 'sweetalert2'

interface ModalProps {
  isVisible: boolean
  onClose: Function
  editedData: any
  daysIds: any
}

interface EditedData {
  id: number;
  date: any;
  horario_inicio: string;
  horario_fim: string;
  id_professor: string;
  id_grade: string;
  uuid_agendamento: string;
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
  editedData,
  daysIds
}: ModalProps) => {

  if (!isVisible) return null

  const [formData, setFormData] = useState<EditedData>(editedData);
  const [professores, setProfessores] = useState<ProfessoreProps[]>([]);
  const [laboratory, setLaboratory] = useState<LaboratoryProps[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [selectedLaboratory, setSelectedLaboratory] = useState<any>();
  const [selectedProfessor, setSelectedProfessor] = useState<Number>();
  const [selectedData, setSelectedData] = useState<any>();

  async function handleDataSelection(selectedData: any) {
    console.log("handleSelection")
    console.log(selectedData)
    setSelectedData(selectedData);
  }

  async function handleEdit() {
    console.clear()
    console.log("daysIds")
    console.log(daysIds)
    // swal() adicionar swal que pergunta se tem certeza que quer editar

    // const updatedAgendamentos: any = []
    const deletedAgendamentos: any = []
    const newAgendamentos: any = []

    const uuidAgendamento = formData.uuid_agendamento

    console.log("selectedData")
    console.log(selectedData)

    selectedData.forEach((agendamento: any, index: number) => {

      console.log("agendamento")
      console.log(agendamento.agendamento)

      //verify if object is empty inside  

      const agendamentoExist = agendamento.agendamento.id != null ? true : false
      console.log("agendamentoExist:" + agendamentoExist)

      if (!agendamentoExist && agendamento.selecionado) {

        //fazer uma forma de o item agendamento ter o valor da grade neste ponto
        newAgendamentos.push(daysIds[index])
      }

      if (agendamentoExist && agendamento.selecionado === false) {
        deletedAgendamentos.push(agendamento.agendamento.id)
      }
    })

    const updatedAgendamentos = {
      id: formData.id,
      date: startDate,
      id_laboratorio: selectedLaboratory,
      id_professor: selectedProfessor,
    }

    console.log("uuidAgendamento")
    console.log(uuidAgendamento)
    console.log("newAgendamentos")
    console.log(newAgendamentos)
    console.log("deletedAgendamentos")
    console.log(deletedAgendamentos)
    console.log("updatedAgendamentos")
    console.log(updatedAgendamentos)

    
    async function createAgendamento() {

      // "date": "2023-08-04T23:32:05.865Z",
      // "id_laboratorio": 27,
      // "id_professor": "12",
      // "uuid_agendamento": "#89268"

      const finalData: any = {
        ids_grade: newAgendamentos,
        date: startDate,
        id_laboratorio: selectedLaboratory,
        id_professor: selectedProfessor,
        uuid_agendamento: uuidAgendamento,
      }
  
      console.log(finalData)

     await  fetch('http://localhost:3333/agendamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          toast.success('Agendamento realizado com sucesso!');
          onClose(true);
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    }

    async function deleteAgendamento() {
      try {
        const params = {
          ids : [deletedAgendamentos]
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
          console.log("deletado com sucesso")
          onClose(true);
        } else {
          toast.error('Erro ao deletar agendamento, tente novamente.');
        }
      } catch (error) {
        toast.error('Erro ao deletar agendamento, tente novamente.');
      }
    }

    //swall asking to confirm the edit
    Swal.fire({
      title: 'Tem certeza que deseja editar?',
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Editar',
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
     
        if (newAgendamentos.length > 0) {
          await createAgendamento()
        }
        if (deletedAgendamentos.length > 0) {
          await deleteAgendamento()
        }

        Swal.fire(
          'Editado!',
          'O agendamento foi editado.',
          'success'
        )
        onClose(true)
      }
    })
    //enable confetti when edit is confirmed


    console.log("editedData")
    // const updatedFormData = {
    //   ...formData,
    //   date: startDate,
    //   id_laboratorio: selectedLaboratory,
    //   id_professor: selectedProfessor,
    //   nome_professor: professores.find(professor => professor.id === selectedProfessor)?.name
    // }

    try {
      // const response = await fetch(`http://localhost:3333/agendamento/${formData.id}`, {
      //   method: 'PUT',
      //   headers: {
      //     'Content-Type': 'application/json'
      //   },
      //   body: JSON.stringify(updatedFormData)
      // })

      // const data = await response.json()

      // if (data) {
      //   toast.success('Agendamento editado com sucesso!')
      //   onClose(true)
      // }
    } catch (error) {
      toast.error('Erro ao editar agendamento, tente novamente.')
    }
  }

  useEffect(() => {

    console.log("ModalEdit useEffect")

    setFormData(editedData);

    const fetchProfessorData = async () => {
      try {
        await fetchProfessors("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjgzODQ1Mzc0LCJleHAiOjE2ODM4NzQxNzR9.rCD-m5-nyNEdCLgs8p-ON71dsEAByLbtb9A_xwj-eC4");

        // console.log("editedData.id_professor")
        // console.log(editedData.id_professor)

        if (editedData.id_professor) {

          setSelectedProfessor(editedData.id_professor);

        }

        // console.log(selectedProfessor)

      } catch (error) {
        // console.log(error); // Handle the error appropriately
      }
    };

    const fetchLaboratoryData = async () => {
      try {
        await fetchLaboratory("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjgzODQ1Mzc0LCJleHAiOjE2ODM4NzQxNzR9.rCD-m5-nyNEdCLgs8p-ON71dsEAByLbtb9A_xwj-eC4");

        // console.log("editedData.laboratory")
        // console.log(editedData.id_laboratorio)

        if (editedData.id_laboratorio) {

          setSelectedLaboratory(editedData.id_laboratorio);

        }
        // console.log("selectedLaboratory")
        // console.log(selectedLaboratory)

      } catch (error) {
        // console.log(error); // Handle the error appropriately
      }
    };

    fetchProfessorData();
    fetchLaboratoryData();

    // console.log("editedData")

    // console.log(editedData)

    // console.log("Formdata")

    // console.log(formData)

    // console.log("selectedProfessor")
    // console.log(selectedProfessor)

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
  }, [editedData, selectedLaboratory])

  async function fetchProfessors(token: string) {
    // console.log("Fetching fetchProfessors...")
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
    // console.log("Fetching fetchLaboratory...")
    await fetch('http://localhost:3333/laboratory', {
      method: 'GET',
      headers: {
        'Authorization': 'bearer ' + token,
      }
    }).then((response) => response.json()).then((data) => {
      // console.log(data)
      return setLaboratory(data.reverse())
    });
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectProfessorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)

    const selectedId = parseInt(event.target.value);

    // console.log(selectedId)

    if (selectedId) {
      setSelectedProfessor(selectedId);
      // Update the selectedProfessorId state instead of formData
    }
  }

  const handleLaboratoryChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    // console.log(event.target.value)

    const selectedLab = parseInt(event.target.value);

    // console.log(selectedLab)

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

  function getAndarLaboratorio(id: number) {

    const andar = laboratory.find((lab) => lab.id === id)?.andar;

    const andaresString = ['Primeiro Andar', 'Segundo Andar'];

    const dayOfWeek = andaresString[(andar || 0) + 1] || null;

    return dayOfWeek;

  }

  const formatDate = (date: string) => {

    const formatedDate = new Date(date)

    return format(formatedDate, "PPPP", { locale: ptBR });
  };

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
              <DetailsText>Andar: <StyledText>{getAndarLaboratorio(selectedLaboratory)}</StyledText></DetailsText>
              <DetailsText>Criado em: <br /><StyledDates>{formData && formatDate(formData.created_at)}</StyledDates></DetailsText>
              <DetailsText>Editado em: <br /><StyledDates>{formData && formatDate(formData.created_at)}</StyledDates></DetailsText>
              <DetailsText>ID de agendamento: <br />

                <div>
                  <p>
                    {formData.uuid_agendamento}
                  </p>
                </div>

              </DetailsText>
            </DetailsWrapper>
            <ClocktimeAndButoonsWrapper>
              <ClockTimeWrapper>
                <ScheduleViewer props={formData} selectedLaboratory={
                  selectedLaboratory
                } handleDataSelection={handleDataSelection} />
              </ClockTimeWrapper>
              <ButtonsWrapper>
                <StyledButton onClick={() => handleEdit()}>Editar</StyledButton>
                <StyledButton onClick={() => onClose()}>Cancelar</StyledButton>
              </ButtonsWrapper>
            </ClocktimeAndButoonsWrapper>
          </SideBysideContainer>
        </FormWrapper>
      </ModalContent>
    </ModalOverlay >
  )
}

export default ModalEdit