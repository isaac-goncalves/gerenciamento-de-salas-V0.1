import React, { useState } from 'react'
import { PrimaryNav, MenuLink, Menu, AvatarWrapper, RowWrapper, Avatar, UserInfo, UserName, UserWrapper, CalendarIcon } from './Navbar.styles'
import styled from 'styled-components'

import { Colors } from '../../colors';


import { CgProfile } from 'react-icons/cg'
import { GrLogout } from 'react-icons/gr'
import { BsCalendarDate } from 'react-icons/bs'
import { MdSchedule, MdPerson, MdExitToApp, MdOutlineDarkMode } from 'react-icons/md';

import avatar from '../../../public/images/avatar.png';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState<boolean>(false);

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
                            <UserName>GABRIEL SANTOS</UserName>
                            <UserInfo >5º ADS</UserInfo>
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