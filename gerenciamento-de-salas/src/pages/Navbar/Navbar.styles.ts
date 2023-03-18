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
export const AvatarWrapper = styled.div`
        display: flex;
        gap: 0.75rem;
        margin: 1.5rem 0;
        `
export const Avatar = styled.img`
    border-radius: 50%;
    height: 3rem;
    width: 3rem;
    `

export const UserName = styled.p`
    color : ${Colors.mainpurple};
    font-size: 0,875rem;
    font-weight : 500;
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
    }
    
    `
