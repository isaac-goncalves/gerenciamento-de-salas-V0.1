import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { ModalOverlay, ModalContent, ImageWrapper, FormWrapper, BackgroundImage, DateTimeWrapper, ButtonsWrapper, DetailsWrapper, DetailsText, ClockTimeWrapper, SideBysideContainer, StyledButton, DateTimeDiv, ProfessorWrapper, StyledTitle, StyledSelect, ClocktimeAndButoonsWrapper, StyledText, StyledDates, ModalContentSize, SecondImageWrapper } from './ModalEdit.styles'
import background from '../../../../public/images/background.jpg';
import { format } from 'date-fns';
const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);
console.log(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL)
import { ptBR } from 'date-fns/locale';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import ScheduleViewer from '../ScheduleViewer';

import Swal from 'sweetalert2'
import Multiselect from 'react-widgets/esm/Multiselect';


interface ModalProps {
  idUserLogado: number
  action: string
  isVisible: boolean
  onClose: Function
  initialData: any
  daysIds: any
  userRole: string
}

interface InitialDataProps {
  id: number;
  date: any;
  horario_inicio: string;
  horario_fim: string;
  id_professor: number;
  id_grade: number;
  uuid_agendamento: string;
  id_laboratorio: number;
  capacidade: number;
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
  idUserLogado,
  action,
  isVisible,
  onClose,
  initialData,
  daysIds,
  userRole
}: ModalProps) => {

  if (!isVisible) return null

  //STATES
  const [formData, setFormData] = useState<InitialDataProps>(initialData);
  const [professores, setProfessores] = useState<ProfessoreProps[]>([]);
  const [laboratory, setLaboratory] = useState<LaboratoryProps[]>([]);
  const [startDate, setStartDate] = useState<Date>();
  const [selectedLaboratory, setSelectedLaboratory] = useState<any>();
  const [selectedProfessor, setSelectedProfessor] = useState<Number>();
  const [selectedData, setSelectedData] = useState<any>();

  //MULTISELECT PARAMS
  const [selectedValues, setSelectedValues] = useState([]);
  const [disciplinas, setDisciplinas] = useState([]);



  // const [initialDate, setInitialDate] = useState<any>();

  //USEFECCTS
  useEffect(() => {

    console.log("ModalEdit useEffect")
    console.log(formData)

    //RUNS FOR BOTH
    if (!formData) {
      setFormData(initialData);
      toast.info('Selecione um Laboratorio e horários para criar um agendamento!')
      // setInitialDate(new Date(initialData.date));
    }
    setStartDate(new Date(formData.date))

    fetchProfessorData();
    fetchLaboratoryData();
    fetchDisciplinas();

    //CREATE
    if (action == "CREATE") {
      console.log("CREATE")

    }
    //EDIT
    else
      if (action == "EDIT") {
        console.log("EDIT")

      }
      else
        if (action == "OPEN") {
          console.log("OPEN")
        }
        else {
          console.log("ERROR")
        }
  }, [initialData])

  useEffect(() => {
    console.clear()
    console.log("selectedLaboratory useEffect")
    console.log(selectedLaboratory)
  }, [selectedLaboratory])

  //FETCHES
  const fetchProfessorData = async () => {
    try {
      await fetchProfessors("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjgzODQ1Mzc0LCJleHAiOjE2ODM4NzQxNzR9.rCD-m5-nyNEdCLgs8p-ON71dsEAByLbtb9A_xwj-eC4");

      // console.log("initialData.id_professor")
      // console.log(initialData.id_professor)

      if (initialData.id_professor) {

        setSelectedProfessor(initialData.id_professor);

      }

      // console.log(selectedProfessor)

    } catch (error) {

      // console.log(error); // Handle the error appropriately

    }
  }
  const fetchLaboratoryData = async () => {
    try {
      await fetchLaboratory("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NSwiaWF0IjoxNjgzODQ1Mzc0LCJleHAiOjE2ODM4NzQxNzR9.rCD-m5-nyNEdCLgs8p-ON71dsEAByLbtb9A_xwj-eC4");

      // console.log("editedData.laboratory")
      // console.log(editedData.id_laboratorio)


      console.log("selectedLaboratory")
      console.log(selectedLaboratory)

    } catch (error) {
      // console.log(error); // Handle the error appropriately
    }
  }
  async function fetchProfessors(token: string) {
    // console.log("Fetching fetchProfessors...")
    await fetch(String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + '/professors', {
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
    await fetch(String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + '/laboratory', {
      method: 'POST',
      headers: {
        'Authorization': 'bearer ' + token,
      }
    }).then((response) => response.json()).then((data) => {
      console.log(data)
      const newLabsWithPlaceholder =
      {
        id: 0,
        descricao: 'Selecione um laboratório',
        andar: 0,
        capacidade: 0
      }

      data.push(newLabsWithPlaceholder)

      setLaboratory(data.reverse())

      if (initialData.id_laboratorio) {
        const lab = data.find((lab) => lab.id === formData.id_laboratorio);
        setSelectedLaboratory(lab);
      }

      return data
    });
  }
  //FETCH FUNCTION MULTISELECT
  async function fetchDisciplinas() {
    console.log("Fetching fetchDisciplinas...")
    // console.log(process.env.REACT_APP_API_KEY)
    await fetch(`${apiUrl}/disciplinas`, {
      method: 'POST'

    }).then((response) => response.json()).then((data) => {
      console.log(data)

      let transformedData: any = []

      data.forEach((elemento: any) => {
        if (elemento.descricao !== "-") {


          let dataObject = {
            id: elemento.id,
            disciplina: elemento.descricao
          }

          return transformedData.push(dataObject)
        }
      });

      transformedData.sort()
      console.log(transformedData)
      setDisciplinas(transformedData);

    }).catch((error) => {
      console.log(error)
    })
  }

  //HANDLE CLICKS

  async function handleEdit() {
    const deletedAgendamentos: any = []
    const newAgendamentos: any = []
    console.clear()
    console.log("daysIds")
    console.log(daysIds)
    console.log("selectedData")
    console.log(selectedData)

    //SET UUID
    const uuidAgendamento = formData.uuid_agendamento

    //VERIFY IF UUID IS EMPTY
    selectedData.forEach((agendamento: any, index: number) => {

      console.log("agendamento")
      console.log(agendamento.agendamento)

      //verify if object is empty inside  
      const agendamentoExist = agendamento.agendamento.id != null ? true : false
      console.log("agendamentoExist:" + agendamentoExist)

      //INSERT ON NEW AGENDAMENTO IF (NOT EXIST AND IS SELECTED) aka CREATE AGENDAMENTO
      if (!agendamentoExist && agendamento.selecionado) {
        newAgendamentos.push(daysIds[index])
      }

      //INSERT ON DELETE AGENDAMENTO IF (EXIST AND IS NOT SELECTED) aka DELETE AGENDAMENTO
      if (agendamentoExist && agendamento.selecionado === false) {
        deletedAgendamentos.push(agendamento.agendamento.id)
      }
    })

    console.log("uuidAgendamento")
    console.log(uuidAgendamento)
    console.log("newAgendamentos")
    console.log(newAgendamentos)
    console.log("deletedAgendamentos")
    console.log(deletedAgendamentos)
    console.log("selectedLaboratory")
    console.log(selectedLaboratory)

    async function createAgendamento() {

      // "date": "2023-08-04T23:32:05.865Z",
      // "id_laboratorio": 27,
      // "id_professor": "12",
      // "uuid_agendamento": "#89268"

      const finalData: any = {
        ids_grade: newAgendamentos,
        date: startDate,
        id_laboratorio: selectedLaboratory.id,
        id_professor: selectedProfessor,
        uuid_agendamento: uuidAgendamento?.toString(),
      }

      console.log(finalData)

      await fetch(String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + '/create/agendamento', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(finalData),
      })
        .then(response => response.json())
        .then(data => {

          if (data.length == 0) {
            return toast.error('Erro ao criar agendamento, tente novamente.');
          }

          console.log('success:', data);
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
          ids: deletedAgendamentos
        }
        const response = await fetch(String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + `/agendamento`, {
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

    console.log("updatedAgendamentos")
    console.log(new Date(formData.date))
    // console.log(initialDate)


    //EXCLUDES CHECK FOR UPDATE ID WE ARE CREATING THE AGENDAMENTO aka UPDATE AGENDAMENTO IF UDPATE
    if (uuidAgendamento != "-") {
      const agendamentoAlterado =
        formData.date !== new Date(formData.date).toISOString()
          || formData.id_laboratorio !== selectedLaboratory
          || formData.id_professor !== selectedProfessor ? true : false

      console.log("agendamentoAlterado: " + agendamentoAlterado)

      if (agendamentoAlterado) {
        try {

          const updatedAgendamentos = {
            date: formData.date,
            id_laboratorio: selectedLaboratory,
            id_professor: selectedProfessor,
            uuid_agendamento: uuidAgendamento,
          }

          const response = await fetch(String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL) + `/agendamento`, {
            method: 'PUT',
            body: JSON.stringify(updatedAgendamentos),
            headers: {
              'Content-Type': 'application/json',
            },
          });
          if (response.ok) {
            toast.success('Agendamento Atualizado com sucesso!');
            console.log("Atualizado com sucesso")
            onClose(true);
          } else {
            toast.error('Erro ao Atualizado agendamento, tente novamente.');
          }
        } catch (error) {
          toast.error('Erro ao Atualizado agendamento, tente novamente.');
        }
      }
    }

    //SWAL ASKING TO EDIT
    if (selectedLaboratory === undefined) {
      toast.error('Selecione um laboratório!');
      return
    }
    if (newAgendamentos.length == 0 && action == "CREATE") {
      toast.error('Selecione um horário!');
      return
    }

    Swal.fire({
      title: `Tem certeza que deseja ${action === "CREATE" ? "criar" : "editar"
        }?`,
      text: "Você não poderá reverter isso!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: `${action === "CREATE" ? "Criar" : "Editar"}`,
      cancelButtonText: 'Cancelar'
    }).then(async (result) => {
      if (result.isConfirmed) {
        if (newAgendamentos.length > 0) {
          await createAgendamento()
        }
        if (deletedAgendamentos.length > 0) {
          await deleteAgendamento()
        }
        //  await updateAgendamento()

        Swal.fire(
          `${action === "CREATE" ? "Criado" : "Editado"
          }!`,
          `O agendamento foi ${action === "CREATE" ? "criado" : "editado"
          } com sucesso.`,
          'success'
        )
        onClose(true)
      }
    })
    //enable confetti when edit is confirmed

    // const updatedFormData = {
    //   ...formData,
    //   date: startDate,
    //   id_laboratorio: selectedLaboratory,
    //   id_professor: selectedProfessor,
    //   nome_professor: professores.find(professor => professor.id === selectedProfessor)?.name
    // }

    try {
      // const response = await fetch(`https://6063-201-26-159-52.ngrok-free.app/agendamento/${formData.id}`, {
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

  async function handleDataSelection(selectedData: any) {
    console.log("handleSelection")
    console.log(selectedData)
    setSelectedData(selectedData);
  }

  //HANDLE SELECTS
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
      const labs = laboratory.find((lab) => lab.id == selectedLab);

      setSelectedLaboratory(labs);

      // Update the selectedProfessorId state instead of formData
    }
  }

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  //AUX FUNCTIONS  
  const GetDayOfWeek = (date: any) => {
    const daysOfWeek = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

    const dayOfWeek = daysOfWeek[date.getDay()];

    return dayOfWeek;
  }

  function getAndarLaboratorio(id: number) {

    const andar = laboratory.find((lab) => lab.id === id)?.andar;

    const andaresString = ['Nenhum lab selecionado!', 'Primeiro Andar', 'Segundo Andar'];

    const laboratoryString = andaresString[(andar || 0)] || null;

    return laboratoryString;

  }

  const formatDate = (date: string) => {

    const formatedDate = new Date(date)

    return format(formatedDate, "PPPP", { locale: ptBR });
  };

  function getTitleBasedOnAction(action: string) {
    if (action == "CREATE") {
      return "Criar Agendamento"
    }
    else
      if (action == "EDIT") {
        return "Editar Agendamento"
      }
      else
        if (action == "OPEN") {
          return "Abrir Agendamento"
        }
        else {
          return "ERROR"
        }
  }

  return (
    <ModalOverlay onClick={() => onClose()}>
      <ModalContent onClick={e => e.stopPropagation()}>
        <ImageWrapper>
          <BackgroundImage src={background} />
        </ImageWrapper>
        <FormWrapper>
          <StyledTitle>
            {
              getTitleBasedOnAction(action)
            }
          </StyledTitle>
          <ProfessorWrapper>
            <DetailsText>Professor:</DetailsText>
            <StyledSelect
              value={selectedProfessor || ''}
              onChange={handleSelectProfessorChange}
              disabled={action === 'OPEN'}
            >
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
              <DatePicker
                selected={startDate}
                disabled={action === 'OPEN'}
                onChange={(date) => {
                  //estudar quem vai porder alterar esta funcionalidade
                  //pois grade ids são linkados com a data de agendamento
                  setStartDate(date || new Date())
                  setFormData({ ...formData, date: startDate || new Date() })
                }} />
            </DateTimeDiv>
            <DateTimeDiv>
              <DetailsText>Dia da Semana:</DetailsText>
              <StyledText>{formData && formatDate(formData.date)}</StyledText>
            </DateTimeDiv>
          </DateTimeWrapper>
          <SideBysideContainer>
            <DetailsWrapper>
              <div>
                <DetailsText>Disciplinas:</DetailsText>
                <Multiselect
                  dataKey="id"
                  textField="disciplina"
                  placeholder='Selecione a disciplinas'
                  data={disciplinas}
                  value={selectedValues}
                  onChange={value => {
                    console.log(value)
                    setSelectedValues(value)
                  }
                  }
                />

              </div>
              <div>
                <DetailsText>Laboratório:</DetailsText>
                <StyledSelect
                  value={selectedLaboratory && selectedLaboratory.id}
                  disabled={action === 'OPEN'}
                  onChange={handleLaboratoryChange}>
                  {laboratory.length > 0 ? (
                    laboratory.map((laboratory) => (
                      <option key={laboratory.id} value={laboratory.id}>
                        {laboratory.descricao}
                      </option>
                    ))
                  ) : (
                    <option value="">No laboratory available</option>
                  )}
                </StyledSelect>
              </div>
              <DetailsText>Andar: <StyledText>{getAndarLaboratorio(selectedLaboratory)}</StyledText></DetailsText>
              <DetailsText>Criado em: <br /><StyledDates>{formData && formatDate(formData.created_at)}</StyledDates></DetailsText>
              <DetailsText>Editado em: <br /><StyledDates>{formData && formatDate(formData.created_at)}</StyledDates></DetailsText>
              <DetailsText>Capacidade: <StyledDates>{selectedLaboratory ? selectedLaboratory.capacidade : null} alunos</StyledDates></DetailsText>
              <DetailsText>ID de agendamento: <br />
                {/* formData.uuid_agendamento */}
                <div>
                  <p>
                    {

                      action === "CREATE"

                        ?

                        "-NOVO😂-"

                        :

                        formData.uuid_agendamento

                    }
                  </p>
                </div>
              </DetailsText>
            </DetailsWrapper>
            <ClocktimeAndButoonsWrapper>
              <ClockTimeWrapper>
                <ScheduleViewer props={formData} selectedLaboratory={selectedLaboratory && selectedLaboratory.id} handleDataSelection={handleDataSelection} action={action} professores={professores} idUserLogado={idUserLogado} userRole={userRole} />
              </ClockTimeWrapper>
              <SecondImageWrapper>
                <BackgroundImage src={background} />
              </SecondImageWrapper>
              <ButtonsWrapper>
                {action !== 'OPEN' && (
                  <StyledButton onClick={() => handleEdit()}>
                    {action === 'CREATE' ? 'Criar' : 'Editar'}
                  </StyledButton>
                )}
                <StyledButton onClick={() => onClose()}>
                  {action === 'CREATE' ? 'Cancelar' : 'Fechar'}
                </StyledButton>
              </ButtonsWrapper>
            </ClocktimeAndButoonsWrapper>
          </SideBysideContainer>
        </FormWrapper>
      </ModalContent>
    </ModalOverlay >
  )
}

export default ModalEdit