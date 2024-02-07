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
  justify-content: center;
  align-items: center;
  flex-direction: row;
  /* margin: 1rem 1rem; */
  align-items: center;

  /* border : 1px solid ${props => props.theme.navbarpurpleborder}; */
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
  margin: 0.75rem;
  object-fit: cover;
`

export const CalendarIcon = styled.img`
  height: 1.5rem;
  width: 1.5rem;
  margin-right: 0.75rem;
`

export const UserName = styled.p`
  color: ${props => props.theme.mainpurple};
  font-size: 1rem;
  font-weight: 500;
  white-space: nowrap;
`

export const UserInfo = styled.p`
  color: ${props => props.theme.textcolor};
  font-size: 0, 875rem;

  span {
    color: ${props => props.theme.mainpurple};
    font-weight: 500;
    margin-right: 0.5rem;
  }


`

export const UserWrapper = styled.div`
display: flex;
flex-direction: column;
width: 100%;

`

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


5 anos de experiência na área de TI, com destaque em projetos inovadores e desafiadores.
Experiência sólida em desenvolvimento Front-End utilizando HTML, CSS e React, incluindo TypeScript e ES6.
Competência Back-End em NodeJS, utilizando a biblioteca Express.js, e conhecimento em bancos de dados MongoDB e MySQL com Sequelize.
Participação ativa no desenvolvimento de sistemas de integração, como o Webhook API para Chatbots na LG Eletronics.
Realização do Front-End de sistemas complexos, automatizando controle de licenças e monitoramento de infraestrutura através de dashboards.
Participação em projetos na Embraer, contribuindo para sistemas de gerenciamento de projeto com PHP, Java e AngularJS.
Reconhecimento por impactar positivamente o sistema de gerenciamento de projetos, utilizado por 4k de engenheiros na área de defesa e comercial.
Projeto de Chatbot integrado para a LG Eletronics, que participou de uma premiação de inovação, demonstrando habilidades excepcionais em desenvolvimento e criatividade.
Familiaridade com tecnologias de versionamento, como Git, e experiência em deploy na Google Cloud.
Conhecimento em Linux, experiência em administração de URAs e máquinas virtuais, além do uso efetivo do Jira para controle de chamados e registro de atividades.
Participação em competições técnicas, como a maratona de programação HackaEmbraer, destacando-se como estagiário de engenharia de software na Embraer.
Buscando constantemente maximizar o potencial e explorar novas fronteiras, com uma abordagem entusiasmada e focada em resultados.

EMBRAER - Mar/2023 - Presente

Cargo: Estagiário de Engenharia de Software

Principais atividades:

Colaboração ativa no desenvolvimento de sistemas de gerenciamento de projeto de engenharia utilizando PHP, JavaScript e AngularJS. Impactando positivamente cerca que 5 mil de engenheiros da defesa e aviação comercial que utilizam as interfaces por mim criadas e aprimoradas ativamente. 
Participação ativa em projetos de estágio, focados no aprimoramento de sistemas e processos na área de engenharia, incluindo o desenvolvimento de um sistema de gerenciamento de ausências utilizando Java e Angular 2+.
Destaque na participação e contribuição para a equipe na maratona de programação HackaEmbraer.
Experiência prática na adoção da metodologia Scrum para o desenvolvimento de projetos.
Administração do ambiente Jira para toda a empresa, garantindo operações eficientes e integridade do sistema.
Utilização eficiente do banco de dados MySQL para armazenamento e manipulação de dados, demonstrando sólido conhecimento em gerenciamento de bancos de dados relacionais.
Demonstração consistente de potencial na programação, entregando soluções inovadoras e eficientes no ambiente de engenharia de software.
