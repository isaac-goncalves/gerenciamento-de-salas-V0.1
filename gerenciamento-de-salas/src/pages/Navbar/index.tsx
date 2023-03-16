import React from 'react'
import { PrimaryNav, MenuLink, Menu, Hamburger, AvatarWrapper } from './Navbar.styles'


import { GrSchedule } from 'react-icons/gr';
import { GrSchedules } from 'react-icons/gr';
import { CgProfile } from 'react-icons/cg'
import { GrLogout } from 'react-icons/gr'

const Navbar = () => {
    return (
        <>
            <PrimaryNav>
                <AvatarWrapper>
                    <p>Avatar</p>
                    <p>Usuário</p>
                    <p>5º ADS</p>
                </AvatarWrapper >
                <Hamburger />
                <Menu>
                    <GrSchedule />
                    <MenuLink to="/horarios" >
                        Horários
                    </MenuLink>
                    <MenuLink to="/agendamentos" >
                        <GrSchedules />
                        Agendamento
                    </MenuLink>
                    <MenuLink to="/perfil" >
                        <CgProfile />
                        Perfil
                    </MenuLink>
                    <MenuLink to="/logout">
                    <GrLogout/>
                        Logout
                    </MenuLink>
                </Menu>
            </PrimaryNav>
        </>
    )
}
export default Navbar