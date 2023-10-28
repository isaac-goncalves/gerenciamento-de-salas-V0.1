import { FaBars, FaRegClock } from 'react-icons/fa'
import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

import { Colors } from '../../colors'
import { GiHamburgerMenu } from 'react-icons/gi'
import { CgProfile } from 'react-icons/cg'

import { BiSolidDashboard } from 'react-icons/bi'
import { GrSchedules } from 'react-icons/gr'
import { BiCog } from 'react-icons/bi'
import { TbFileUpload, TbLogout } from 'react-icons/tb'
import { IoMdNotificationsOutline } from 'react-icons/io'
import { MdNotificationsNone, MdOutlineDarkMode } from 'react-icons/md'
import { HiOutlineDesktopComputer } from 'react-icons/hi'

interface Props {
  menuOpen: boolean
}

export const PrimaryNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  width: ${({ menuOpen }: Props) => (menuOpen ? '15.5rem' : '5rem')};
  border-right: 2px solid ${props => props.theme.navbarpurpleborder};
  transition: width 0.15s ease-in-out;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */

  z-index: 14;
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${props => props.theme.whiteBackgroundNavbar};
  /* border-right: 2px solid red; */

  @media screen and (max-width: 570px) {
    width: ${({ menuOpen }: Props) => (menuOpen ? '12rem' : '3rem')};
  }

  .purple-icon {
    color: ${props => props.theme.mainpurple};
  }
`

export const AvatarWrapper = styled.div`
  display: flex;
  width: 100%;
  flex-direction: row;
  margin: 1rem 1rem;
  align-items: center;

  @media screen and (max-width: 570px) {
    display: none;
  }
`

export const HamburgerDiv = styled.div`
  @media screen and (min-width: 570px) {
    display: none;
  }
`

export const HamburgerWrapper = styled(GiHamburgerMenu)`
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${props => props.theme.mainpurple};
  font-size: 2rem;
  margin-left: -0.23rem;
  margin-top: 1rem;
`

export const SchedulesWrapper = styled(FaRegClock)`
  color: ${props => props.theme.mainpurple};
  font-size: 1.6rem;

  @media screen and (min-width: 570px) {
    font-size: 1.4rem;
  }
`
export const DashboardWrapper = styled(BiSolidDashboard)`
  color: ${props => props.theme.mainpurple};
  font-size: 1.6rem;

  @media screen and (min-width: 570px) {
    font-size: 1.4rem;
  }
`

export const LaboratoriosWrapper = styled(HiOutlineDesktopComputer)`
  color: ${props => props.theme.mainpurple};
  font-size: 1.6rem;

  @media screen and (min-width: 570px) {
    font-size: 1.4rem;
  }
`

export const ProfileWrapper = styled(CgProfile)`
  color: ${props => props.theme.mainpurple};
  font-size: 1.6rem;

  @media screen and (min-width: 570px) {
    font-size: 1.4rem;
  }
`

export const GerenciamentoWrapper = styled(BiCog)`
  color: ${props => props.theme.mainpurple};
  font-size: 1.6rem;

  @media screen and (min-width: 570px) {
    font-size: 1.4rem;
  }
`

export const NotificationWrapper = styled(MdNotificationsNone)`
  color: ${props => props.theme.mainpurple};
  font-size: 1.6rem;

  @media screen and (min-width: 570px) {
    font-size: 1.4rem;
  }
`

export const TemplateWrapper = styled(TbFileUpload)`
  color: ${props => props.theme.mainpurple};
  font-size: 1.6rem;

  @media screen and (min-width: 570px) {
    font-size: 1.4rem;
  }
`
export const DarmodeWrapper = styled(MdOutlineDarkMode)`
  color: ${props => props.theme.mainpurple};
  font-size: 1.6rem;

  @media screen and (min-width: 570px) {
    font-size: 1.4rem;
  }
`

export const LogoutWrapper = styled(TbLogout)`
  color: ${props => props.theme.mainpurple};
  font-size: 1.6rem;

  @media screen and (min-width: 570px) {
    font-size: 1.4rem;
  }
`

export const Avatar = styled.img`
  border-radius: 50%;
  border: 2px solid ${props => props.theme.mainpurple};
  height: 3rem;
  width: 3rem;
  margin-right: 0.75rem;
  object-fit: cover;
`

export const CalendarIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.75rem;
`

export const UserName = styled.p`
  color: ${props => props.theme.mainpurple};
  font-size: 0.875rem;
  font-weight: 500;
  white-space: nowrap;
`

export const UserInfo = styled.p`
  color: ${props => props.theme.textcolor};
  font-size: 0, 875rem;
`

export const UserWrapper = styled.div``

export const MenuLink = styled(Link)`
  cursor: pointer;
  align-items: center;
  text-decoration: none;

  &.active {
    color: ${props => props.theme.iconTextHoverColor};
  }
  &:hover {
    background-color: ${props => props.theme.iconTextHoverColor};
    /* transform: scale(1.10); */
  }

  &:last-child {
    margin-left: 0.2rem;
  }
`
// export const Hamburger = styled(FaBars)`
//   display: none;
//   color: #ffffff;

//   @media screen and (max-width: 768px) {
//     display: block;
//     font-size: 1.9rem;
//     top: 0;
//     right: 0;
//     position: absolute;
//     cursor: pointer;
//     transform: translate(-100%, 75%);
//   }
// `
export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding-left: 1rem;
  padding-bottom: 1rem;

  @media screen and (max-width: 570px) {
    padding-left: 0rem;
  }

  a:nth-of-type(5) {
    margin-top: auto;
  }
`

export const RowWrapper = styled.div`
  display: flex;
  height: 3rem;
  align-items: center;
  width: 100%;
  padding-left: 0.8rem;
  p {
    padding-left: 0.8rem;
    font-size: 1rem;
    color: ${props => props.theme.textcolor};
  }

  &:hover {
    color: ${props => props.theme.mainpurple};
  }

  svg {
    height: 100%;
    color: 'purple';

    :hover {
      color: ${props => props.theme.mainpurple};
    }
  }
`
