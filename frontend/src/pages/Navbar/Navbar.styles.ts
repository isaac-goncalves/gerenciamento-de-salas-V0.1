import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

import { Colors } from '../../colors';

// export const PrimaryNav = styled.nav`
//     position: fixed;
//     top: 0;
//     left: 0;
//     width: 15.5rem;

//     z-index: 14;
//     height: 100vh;
//     display: flex;
//     flex-direction: column;
//     padding-left: 1.5rem;
//     background: ${Colors.white};
//     `

export const PrimaryNav = styled.nav`
    position: fixed;
    top: 0;
    left: 0;
    width: ${({ menuOpen }) => (menuOpen ? '15.5rem' : '5rem')};
    border-right : 2px solid #E8EaF6;
    transition: width 0.1s ease-in-out;
    z-index: 14;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background: ${Colors.white};
    `

export const AvatarWrapper = styled.div`
        display: flex;
        width: 100%;
        flex-direction: row;
        margin: 1.5rem 1rem;
        align-items: center;

        `
export const Avatar = styled.img`
    border-radius: 50%;
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
    color : ${Colors.mainpurple};
    font-size: 0,875rem;
    font-weight : 500;
  white-space: nowrap;
        `

export const UserInfo = styled.p`
    color: ${Colors.textcolor};
    font-size: 0,875rem;
    `

export const UserWrapper = styled.div`
      
    `
export const MenuLink = styled(Link)`
 
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  
  &.active {
    color: #000000;
  }


`
export const Hamburger = styled(FaBars)`
  display: none;
  color: #ffffff;
  @media screen and (max-width: 768px) {
    display: block;
    font-size: 1.9rem;
    top: 0;
    right: 0;
    position: absolute;
    cursor: pointer;
    transform: translate(-100%, 75%);
  }
`
export const Menu = styled.div`
  display: flex;
  flex-direction: column;
  width: 12.5rem;
  height: 100%;
  margin-left: 1rem;
  a:nth-of-type(4) {
  
    margin-top: auto;
    margin-bottom: 1.5rem;
  }

`;

export const RowWrapper = styled.div`

    display: flex;
    height: 3rem;
    align-items: center;
    width: 100%;

    p{
        font-size: 0,875rem;
    }

    svg {
        height: 100%;
        color: "red";
        padding: 0 1rem;
        :hover {
            color: ${Colors.mainpurple};
        }

    }
    
    `
