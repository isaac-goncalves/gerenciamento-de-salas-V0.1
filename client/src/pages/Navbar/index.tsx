import React, { useEffect, useState } from 'react'
import { PrimaryNav, MenuLink, Menu, AvatarWrapper, RowWrapper, Avatar, UserInfo, UserName, UserWrapper, CalendarIcon, HamburgerWrapper, HamburgerDiv } from './Navbar.styles'
import styled from 'styled-components'

import { Colors } from '../../colors';


import { CgProfile } from 'react-icons/cg'
import { GrLogout } from 'react-icons/gr'
import { TbFileUpload } from 'react-icons/tb'
import { BiCog } from 'react-icons/bi'
import { GiHamburgerMenu } from 'react-icons/gi'

import { BsCalendarDate } from 'react-icons/bs'
import { MdSchedule, MdPerson, MdExitToApp, MdOutlineDarkMode } from 'react-icons/md';

import avatar from '../../../public/images/avatar.png';

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

    return (
        <>
            <PrimaryNav menuOpen={menuOpen} onClick={toggleMenu} onMouseEnter={toggleMenu} onMouseLeave={closeMenu}>
                <AvatarWrapper >
                    <Avatar src={avatar} />
                    {menuOpen && <>
                        <UserWrapper>
                            {<UserName>{user.name}</UserName>}
                            {<UserInfo>{user.role == "aluno" ? `${user.semestre}º ADS` : user.role == "professor" ? "professor" : "guest"}</UserInfo>}
                            {<UserInfo>{user.role}</UserInfo>}
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
                            <TbFileUpload style={{
                                color: Colors.mainpurple,
                                fontSize: '1.4rem',
                            }} />{
                                menuOpen && <p>Notificaçoes</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/"
                        onClick={() => handleLogout()}
                    >
                        <RowWrapper>
                            <MdOutlineDarkMode style={{
                                color: Colors.mainpurple,
                                fontSize: '1.2rem',
                            }}
                            />
                            {
                                menuOpen && <p>Darkmode</p>
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
                                menuOpen && <p>Logout</p>
                            }
                        </RowWrapper>
                    </MenuLink>
                </Menu>
            </PrimaryNav >
        </>
    )
}
export default Navbar