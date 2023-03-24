import React, { useState } from 'react'
import { PrimaryNav, MenuLink, Menu, Hamburger, AvatarWrapper, RowWrapper, Avatar, UserInfo, UserName, UserWrapper } from './Navbar.styles'
import styled from 'styled-components'

import { Colors } from '../../colors';

import { GrSchedule } from 'react-icons/gr';
import { GrSchedules } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg'
import { GrLogout } from 'react-icons/gr'

import avatar from '../../../public/images/avatar.png';

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <>
            <PrimaryNav menuOpen={menuOpen} onClick={toggleMenu}>
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
                            <GrSchedule />
                            {
                                menuOpen && <>HORÁRIOS</>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/dashboard" >
                        <RowWrapper>
                            <GrSchedules />
                            {
                                menuOpen && <>AGENDAMENTOS</>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/perfil" >
                        <RowWrapper>
                            <CgProfile />{
                                menuOpen && <>PERFIL</>
                            }
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/">
                        <RowWrapper>
                            <GrLogout />
                            {
                                menuOpen && <>LOGOUT</>
                            }
                        </RowWrapper>
                    </MenuLink>
                </Menu>
            </PrimaryNav>
        </>
    )
}
export default Navbar