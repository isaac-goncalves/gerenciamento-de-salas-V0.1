import React, { useEffect, useState } from 'react'
import { PrimaryNav, MenuLink, Menu, AvatarWrapper, RowWrapper, Avatar, UserInfo, UserName, UserWrapper, CalendarIcon, HamburgerWrapper, HamburgerDiv, SchedulesWrapper, ProfileWrapper, GerenciamentoWrapper, TemplateWrapper, NotificationWrapper, DarmodeWrapper, LogoutWrapper, LaboratoriosWrapper, DashboardWrapper } from './Navbar.styles'
import styled from 'styled-components'

import { Colors } from '../../colors';

import avatar from '../../../public/images/avatar.jpg';
import { abbreviateCourseName } from '../Laboratorio';

const disciplinaOptions = [
    { value: "1", label: "Administração Geral" },
    { value: "2", label: "Algoritmos e Lógica de Programação" },
    { value: "3", label: "Arquitetura e Organização de Computadores" },
    { value: "4", label: "Banco de Dados" },
    { value: "5", label: "Cálculo" },
    { value: "6", label: "Comunicação e Expressão" },
    { value: "7", label: "Contabilidade" },
    { value: "8", label: "Economia e Finanças" },
    { value: "9", label: "Eletiva - Programação para Dispositivos Móveis" },
    { value: "10", label: "Engenharia de Software I" },
    { value: "11", label: "Engenharia de Software II" },
    { value: "12", label: "Engenharia de Software III" },
    { value: "13", label: "Estatística Aplicada" },
    { value: "14", label: "Estruturas de Dados" },
    { value: "15", label: "Inglês I" },
    { value: "16", label: "Inglês II" },
    { value: "17", label: "Inglês III" },
    { value: "18", label: "Inglês IV" },
    { value: "19", label: "Interação Humano Computador" },
    { value: "20", label: "Laboratório de Hardware" },
    { value: "21", label: "Linguagem de Programação" },
    { value: "22", label: "Matemática Discreta" },
    { value: "23", label: "Metodologia da Pesquisa Científico-Tecnológica" },
    { value: "24", label: "Programação em Microinformática" },
    { value: "25", label: "Programação Orientada a Objetos" },
    { value: "26", label: "Sistemas de Informação" },
    { value: "27", label: "Sistemas Operacionais I" },
    { value: "28", label: "Sistemas Operacionais II" },
    { value: "29", label: "Sociedade e Tecnologia" }
];

const Navbar = ({ toggleTheme }: any) => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<any>({});

    //cretae useffect the get the user data from local storage and store the data on a state 

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('gerenciamento-de-salas@v1.2') || '{}');
        // console.clear();
        // console.log(userData);
        setUser(userData.userData);
    }, []);


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
                return user.nomeDisciplina[0] || "Não encontrado";
            default:
                return 'guest';
        }
    }

    function getDisciplina() {

        const disciplina = disciplinaOptions.filter((disciplina) => {
            return disciplina.value == user.disciplina;
        });

        return disciplina[0].label;

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
                                    Curso:
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