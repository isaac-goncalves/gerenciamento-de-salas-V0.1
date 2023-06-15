import React, { useEffect, useState } from 'react'
import { PrimaryNav, MenuLink, Menu, AvatarWrapper, RowWrapper, Avatar, UserInfo, UserName, UserWrapper, CalendarIcon } from './Navbar.styles'
import styled from 'styled-components'

import { Colors } from '../../colors';


import { CgProfile } from 'react-icons/cg'
import { GrLogout } from 'react-icons/gr'
import { TbFileUpload } from 'react-icons/tb'

import { BsCalendarDate } from 'react-icons/bs'
import { MdSchedule, MdPerson, MdExitToApp, MdOutlineDarkMode } from 'react-icons/md';

import avatar from '../../../public/images/avatar.png';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [user, setUser] = useState<any>({});

    //cretae useffect the get the user data from local storage and store the data on a state 

    useEffect(() => {
        const userData = JSON.parse(localStorage.getItem('gerenciamento-de-salas@v1.1') || '{}');
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
                            <UserName>{user.name.toUpperCase()}</UserName>
                            <UserInfo>{user.semestre ? `${user.semestre}º ADS` : `${user.nomedDisciplina || "5º ADS"}`}</UserInfo>
                        </UserWrapper>
                    </>
                    }
                </AvatarWrapper >
                {/* <Hamburger /> */}
                <Menu>
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
                    <MenuLink to="/agendamentos" >
                        <RowWrapper>
                            <BsCalendarDate style={{
                                color: Colors.mainpurple,
                                fontSize: '1.4rem',
                            }} />
                            {
                                menuOpen && <p>AGENDAMENTOS</p>
                            }
                        </RowWrapper>
                    </MenuLink>
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
            </PrimaryNav>
        </>
    )
}
export default Navbar