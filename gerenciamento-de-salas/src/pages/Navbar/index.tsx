import React, { useState } from 'react'
import { MenuLink, Menu, Hamburger, AvatarWrapper, RowWrapper, Avatar, UserInfo, UserName, UserWrapper } from './Navbar.styles'
import styled from 'styled-components'

import { GrSchedule } from 'react-icons/gr';
import { GrSchedules } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg'
import { GrLogout } from 'react-icons/gr'

import avatar from '../../../public/images/avatar.png';

const PrimaryNav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    /* width: 15.5rem; */
    width: ${{menuOpen} => menuOpen ? '15.5rem' : '4.5rem'};
     transition: width 0.3s ease-in-out;
    z-index: 14;
    height: 100vh;
    display: flex;
    flex-direction: column;
    padding-left: 1.5rem;
    /* background: ${Colors.white}; */
    `

const Navbar = () => {

    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
      };

    return (
        <>
            <PrimaryNav menuOpen={menuOpen} >
                <AvatarWrapper >
                    <Avatar src={avatar} />
                    <UserWrapper>
                        <UserName>GABRIEL SANTOS</UserName>
                        <UserInfo>5º ADS</UserInfo>
                    </UserWrapper>
                </AvatarWrapper >
                {/* <Hamburger /> */}
                <Menu>
                    <MenuLink to="/horarios" >
                        <RowWrapper >
                            <GrSchedule/>
                            Horários
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/agendamentos" >
                        <RowWrapper>
                            <GrSchedules />
                            Agendamento
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/perfil" >
                        <RowWrapper>
                            <CgProfile />
                            Perfil
                        </RowWrapper>
                    </MenuLink>
                    <MenuLink to="/logout">
                        <RowWrapper>
                            <GrLogout />
                            Logout
                        </RowWrapper>
                    </MenuLink>
                </Menu>
            </PrimaryNav>
        </>
    )
}
export default Navbar