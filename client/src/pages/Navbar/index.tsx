import React, { useEffect, useState } from 'react'
import { PrimaryNav, MenuLink, Menu, AvatarWrapper, RowWrapper, Avatar, UserInfo, UserName, UserWrapper, CalendarIcon, HamburgerWrapper, HamburgerDiv } from './Navbar.styles'
import styled from 'styled-components'

import { Colors } from '../../colors';


import { CgProfile } from 'react-icons/cg'
import { GrLogout } from 'react-icons/gr'
import { TbFileUpload } from 'react-icons/tb'
import { BiCog } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'
import { IoMdNotificationsOutline } from 'react-icons/io'

import { BsCalendarDate } from 'react-icons/bs'
import { MdSchedule, MdPerson, MdExitToApp, MdOutlineDarkMode } from 'react-icons/md';

import avatar from '../../../public/images/avatar.png';

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

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<any>({});

    //cretae useffect the get the user data from local storage and store the data on a state 

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('gerenciamento-de-salas@v1.1') || '{}');
        console.clear();
        console.log(userData);
        setUser(userData.userData);
    }, []);


    const toggleMenu = () => {
        setTimeout(() => {
            setMenuOpen(!menuOpen);
        }, 0);
    };

    const handleLogout = async () => {
        await localStorage.removeItem('gerenciamento-de-salas@v1.1');
        window.location.href = '/';
    }

    const closeMenu = () => {
        setMenuOpen(false);
    };

    function getDescription() {

        switch (user.role) {
            case 'aluno':
                return `${user.semestre}º ADS`;
            case 'professor':
                return `${user.disciplina ? getDisciplina() : 'Professor'}`;
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

    return (
        <>
            <PrimaryNav menuOpen={menuOpen} onClick={toggleMenu} onMouseEnter={toggleMenu} onMouseLeave={closeMenu}>
                <AvatarWrapper >
                    <Avatar src={avatar} />
                    {menuOpen && <>
                        <UserWrapper>
                            {<UserName>{user.name}</UserName>}
                            {<UserInfo>{user.role == "aluno" ? `${user.semestre}º ADS` : user.role == "professor" ? "professor" : "guest"}</UserInfo>}
                            {<UserInfo>{getDescription()}</UserInfo>}
                        </UserWrapper>
                    </>
                    }
                </AvatarWrapper >
                {/* <Hamburger /> */}
                <Menu>
                    <HamburgerDiv>
                        <RowWrapper >
                            <HamburgerWrapper>
                                <GiHamburgerMenu style={{
                                    color: Colors.mainpurple,
                                    fontSize: '1.4rem',
                                }} />
                            </HamburgerWrapper>
                        </RowWrapper>
                    </HamburgerDiv>
                    <MenuLink to="/dashboard" >
                        <RowWrapper >
                            <MdSchedule style={{
                                color: Colors.mainpurple,
                                fontSize: '1.4rem',
                            }} />

                            {
                                menuOpen && <p>HORÁRIOS</p>
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
                            <CgProfile style={{
                                color: Colors.mainpurple,
                                fontSize: '1.4rem',
                            }} />{
                                menuOpen && <p>PERFIL</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/gerenciamento" >
                        <RowWrapper>
                            <BiCog style={{
                                color: Colors.mainpurple,
                                fontSize: '1.4rem',
                            }} />{
                                menuOpen && <p>GERENCIAMENTO</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/templates" >
                        <RowWrapper>
                            <TbFileUpload style={{
                                color: Colors.mainpurple,
                                fontSize: '1.4rem',
                            }} />{
                                menuOpen && <p>TEMPLATES</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/notification" >
                        <RowWrapper>
                            <IoMdNotificationsOutline style={{
                                color: Colors.mainpurple,
                                fontSize: '1.4rem',
                            }} />{
                                menuOpen && <p>NOTIFICAÇÕES </p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink
                        to="https://darkreader.org/"
                        target="_blank"
                    // onClick={() => handleLogout()}
                    >
                        <RowWrapper>
                            <MdOutlineDarkMode style={{
                                color: "black",
                                fontSize: '1.2rem',
                            }}
                            />
                            {
                                menuOpen && <p>DARKMODE</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/"
                        onClick={() => handleLogout()}
                    >
                        <RowWrapper>
                            <GrLogout style={{
                                color: Colors.mainpurple,
                                fontSize: '1.2rem',
                            }}
                            />
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