import React, { useEffect, useState } from 'react'
import { PrimaryNav, MenuLink, Menu, AvatarWrapper, RowWrapper, Avatar, UserInfo, UserName, UserWrapper, CalendarIcon, HamburgerWrapper, HamburgerDiv, SchedulesWrapper, ProfileWrapper, GerenciamentoWrapper, TemplateWrapper, NotificationWrapper, DarmodeWrapper, LogoutWrapper, LaboratoriosWrapper, DashboardWrapper } from './Navbar.styles'
const apiUrl = String(import.meta.env.VITE_REACT_LOCAL_APP_API_BASE_URL);
import avatar from '../../../public/images/avatar.jpg';
import { abbreviateCourseName } from '../Laboratorio';



const Navbar = ({ toggleTheme }: any) => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<any>({});
    const [disciplinas, setDisciplinas] = useState<any>([]);

    //cretae useffect the get the user data from local storage and store the data on a state 

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('gerenciamento-de-salas@v1.2') || '{}');
        // console.clear();
        // console.log(userData);
        setUser(userData.userData);
        fetchDisciplinas()
    }, []);



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

    const toggleMenu = (isClick: boolean, e: any) => {

        // console.log("I RAN");

        const itemID = e.target;

        if (itemID == "DARKMODE") {
            return;
        }

        const viewWidth = window.innerWidth;

        const viewWidthIsMobile = viewWidth <= 768;

        if (viewWidthIsMobile && !isClick) {
            return;
        }

        setTimeout(() => {
            setMenuOpen(!menuOpen);
        }, 0);
    };

    const handleLogout = async () => {
        await localStorage.removeItem('gerenciamento-de-salas@v1.2');
        window.location.href = '/';
    }

    const closeMenu = () => {
        setMenuOpen(false);
    };

    function getDescription() {

        switch (user.role) {
            case 'aluno':
                return `${user.semestre}º ${abbreviateCourseName(user.course_name || "")}`;
            case 'professor':
                return getDisciplina()
                    ||
                    "Não encontrado";
            case 'guest':
                return user.course_name || "Não encontrado";
        }
    }

    function getDisciplina() {

        const disciplina = disciplinas.filter((disciplina: any) => {
            return disciplina.id == user.disciplina[0];
        });

        return disciplina[0].disciplina;

    }

    function retornarSomenteAsIniciais(sobrenome: string) {

        const nome = sobrenome.split(" ");
        const iniciais = nome.map((nome) => {
            return nome[0];
        });

        return iniciais.join(" ") + ".";


    }

    return (
        <>
            <PrimaryNav menuOpen={menuOpen} onMouseEnter={() => toggleMenu(false, "")} onMouseLeave={closeMenu}>
                <AvatarWrapper onClick={(e) => toggleMenu(true, e)} >
                    <Avatar src={avatar} />
                    {menuOpen && <>
                        <UserWrapper>
                            {<UserName>{user.name} {retornarSomenteAsIniciais(user.surname)}</UserName>}
                            {<UserInfo>
                                <span>
                                    Função:
                                </span>
                                {user.role == "aluno" ? "Aluno" : user.role == "professor" ? "Professor" : "Guest"}</UserInfo>}
                            {/* {<UserInfo>{user.role == "aluno" ? `${user.semestre}º ADS` : user.role == "professor" ? "professor" : "guest"}</UserInfo>}///////////// */}
                            {<UserInfo>
                                <span>
                                    {user.role == "aluno" ? "Curso:" : user.role == "professor" ? "Disciplina:" : "Curso:"}
                                </span>
                                {getDescription()}</UserInfo>}
                        </UserWrapper>
                    </>
                    }
                </AvatarWrapper >
                {/* <Hamburger /> */}
                <Menu>
                    <HamburgerDiv onClick={(e) => toggleMenu(true, e)}>
                        <RowWrapper >
                            <HamburgerWrapper />
                        </RowWrapper>
                    </HamburgerDiv>
                    <MenuLink to="/dashboard"  >
                        <RowWrapper >
                            <DashboardWrapper />
                            {
                                menuOpen && <p>DASHBOARD</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/grade"  >
                        <RowWrapper >
                            <SchedulesWrapper />
                            {
                                menuOpen && <p>GRADE</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/laboratorio"  >
                        <RowWrapper >
                            <LaboratoriosWrapper />
                            {
                                menuOpen && <p>LABORATÓRIOS</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    {/* <MenuLink to="/agendamentos" >
                        <RowWrapper>
                            <BsCalendarDate style={{
                                color: Colors.mainpurple,
                                fontSize: '1.4rem',
                            }} />
                            {
                                menuOpen && <p>AGENDAMENTOS</p>
                            }
                        </RowWrapper>
                    </MenuLink> */}
                    <MenuLink to="/perfil" >
                        <RowWrapper>
                            <ProfileWrapper />
                            {
                                menuOpen && <p>PERFIL</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/gerenciamento" >
                        <RowWrapper>
                            <GerenciamentoWrapper />{
                                menuOpen && <p>GERENCIAMENTO</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/templates" >
                        <RowWrapper>
                            <TemplateWrapper />{
                                menuOpen && <p>TEMPLATES</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    {/* <MenuLink to="/notification" >
                        <RowWrapper>
                            <NotificationWrapper/>{
                                menuOpen && <p>NOTIFICAÇÕES </p>
                            }
                        </RowWrapper>
                    </MenuLink> */}
                    <MenuLink to="#"
                        id="DARKMODE"
                        onClick={() => toggleTheme()}
                    >
                        <RowWrapper>
                            <DarmodeWrapper />
                            {
                                menuOpen && <p>DARKMODE</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/"
                        onClick={() => handleLogout()}
                    >
                        <RowWrapper>
                            <LogoutWrapper />
                            {
                                menuOpen && <p>LOGOUT</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                </Menu>
            </PrimaryNav >
        </>
    )
}
export default Navbar