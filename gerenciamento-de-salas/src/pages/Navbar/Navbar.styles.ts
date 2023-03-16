import { FaBars } from 'react-icons/fa'
import styled from 'styled-components'
import { NavLink as Link } from 'react-router-dom'

import { Colors } from '../../colors';

export const PrimaryNav = styled.nav`
position: fixed;
    top: 0;
    left: 0;
    width: 12%;
  z-index: 14;
  height: 100vh;
  display: flex;
  flex-direction: column;
  background: ${Colors.white};
`
export const MenuLink = styled(Link)`
  color: ${Colors.mainpurple};
  cursor: pointer;
  align-items: center;
  text-decoration: none;
  padding: 0 1.2rem;
  height: 100%;
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
  align-items: center;
  margin-right: -25px;
  @media screen and (max-width: 768px) {
    display: none;
  }
`
export const AvatarWrapper = styled.div`
    display: flex;
    `