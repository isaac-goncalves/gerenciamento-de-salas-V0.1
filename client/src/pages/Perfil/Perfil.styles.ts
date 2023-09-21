import styled from 'styled-components'

import { Colors } from '../../colors'

export const Container = styled.div`
  width: calc(100% - 5rem);
  height: 100vh;
  margin-left: 5rem;
  background-color: ${props => props.theme.lightgray};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  animation: appear 1s;
  @keyframes appear {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  @media screen and (max-width: 570px) {
    width: calc(100% - 3rem);
    margin-left: 3rem;
  }
`

export const Wrapper = styled.div`
  width: 90%;
  height: 90%;
  background-color: ${props => props.theme.white};
  z-index: 10;
  border-radius: 4px;
  padding: 2rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  
  gap: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  @media screen and (max-width: 570px) {
    gap: 0.5rem;
    height: 95%;
    width: 95%;
    padding: 1rem 2rem;
    padding: 0.4rem;
  }
`

export const ContentWrapper = styled.div`
  margin-top: 2rem;
  height: 100%;
  width: 100%;
  display: flex;
  flex-flow: column;
  gap: 1rem;
  justify-content: center;
  align-items: center;
`

export const UserWrapper = styled.div`
display: flex;
align-items: center;
justify-content: center;
flex-direction: column;
gap: 1rem;
`

export const UserName = styled.p`
  color: ${props => props.theme.mainpurple};
  font-size: 1.3rem;
  font-weight: 500;
  white-space: nowrap;
`

export const UserInfo = styled.p`
  color: ${props => props.theme.textcolor};
  font-size: 1rem;
`

export const Header = styled.div`
  width: 60%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const CounterWrapper = styled.div`
  color: ${props => props.theme.textcolor};
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;

  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1rem;
  }

  @media screen and (max-width: 570px) {
    h1 {
      font-size: 2rem;
    }
    p {
      font-size: 0.8rem;
    }
  }
`

export const Separator = styled.div`
  border-left: 1px solid ${props => props.theme.lightgray};
  height: 100px;

  @media screen and (max-width: 570px) {
    height: 50px;
    border-left: 3px solid ${props => props.theme.lightgray};
  }
`

export const SearchBar = styled.div`
  width: 100%;
  display: flex;
  input {
    width: 80%;
    height: 2.5rem;
    border: none;
    background-color: ${props => props.theme.lightgray};
    border-radius: 4px;
    padding: 0 1rem;
    box-sizing: border-box;
    color: ${props => props.theme.white};
  }
`

export const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 4rem;
  margin-top: auto;
`

export const InputWrapper = styled.div`
  display: flex;
  width: 100%;
  gap: 0.2rem;
  flex-direction: column;
  color: ${props => props.theme.textcolor};
`

export const StyledSelect = styled.select`
  display: flex;
  width: 100%;
  padding: 0.5rem;
  padding-left: 1rem;
  border-radius: 9999999px;
  border: 1px solid #ccc;
  font-size: 1rem;

  cursor: pointer;
  background-color: #f2f2f2;
  color: #333;
  appearance: none;
  transition: all 0.3s ease-in-out;

  &:hover {
    border-color: #999;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px ${props => props.theme.mainpurple};
    border-color: ${props => props.theme.mainpurple};
  }

  &::placeholder {
    color: #999;
  }

  /* Dropdown styles */
  option {
    /* Add any additional styles for options here */
  }

  /* Dropdown container styles */
  select {
    max-height: 200px; /* Set the desired max height */
    overflow-y: auto; /* Add scrollbar when options exceed max height */
  }
`

export const StyledButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  
  padding: 0.5rem;
  height: 2.5rem;
  max-width: 20rem;
  border: none;
  gap: 0.5rem;
  width: 100%;
  background-color: ${props => props.theme.mainpurple};
  color: ${props => props.theme.realwhite};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;
`

export const StyledButtonWhatsApp = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  padding: 0.5rem;
  height: 2.5rem;
  max-width: 20rem;
  border: none;
  gap: 0.5rem;
  width: 100%;
  background-color: green;
  color: ${props => props.theme.realwhite};
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  white-space: nowrap;
`

export const ButtonsWrapper = styled.td`
  display: flex;
  gap: 0.2rem;
  align-items: center;
`

export const EditButton = styled.button`
  background-color: ${props => props.theme.hoverCard};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  height: 2rem;
  padding: 0 0.4rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  margin-left: 0.5rem;
  p {
    font-size: 0.8rem;
  }

  &:hover {
    background-color: #006f8f;
  }
`

export const DeleteButton = styled.button`
  background-color: #f47174;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  border: none;
  border-radius: 4px;
  color: white;
  font-size: 16px;
  height: 2rem;
  padding: 0 0.4rem;
  cursor: pointer;
  transition: background-color 0.3s ease;

  p {
    font-size: 0.8rem;
  }

  &:hover {
    background-color: #006f8f;
  }
`

export const TableSelector = styled.div`
  display: flex;
  width: 100%;

  select {
    width: 10rem;
    height: 2.5rem;
    border: none;
    background-color: ${props => props.theme.lightgray};
    border-radius: 4px;
    padding: 0 1rem;
    box-sizing: border-box;
    color: ${props => props.theme.textcolor};
    margin-right: 1rem;
  }

  option {
    width: 10rem;
    height: 2.5rem;
    border: none;
    background-color: ${props => props.theme.lightgray};
    border-radius: 4px;
    padding: 0 1rem;
    box-sizing: border-box;
    color: ${props => props.theme.textcolor};
    margin-left: 1rem;
  }
`

export const Table = styled.table`
  /* border: 1px solid red; */
  border-collapse: collapse;

  width: 100%;
  background-color: ${props => props.theme.white};
  z-index: 1;
  font-size: 0.8em;

  th {
    color: ${props => props.theme.white};
  }

  th:last-child {
    text-align: center;
  }

  th,
  td {
    /* border: 1px solid red; */

    padding: 8px 5px;
  }

  tbody {
  }

  tbody tr {
    border-bottom: 1px solid #dddddd;
  }

  overflow: auto;

  ::-webkit-scrollbar {
    width: 12px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 4px;
  }
`

export const TableHeaderData = styled.th``

export const TableHeader = styled.thead`
  position: sticky; /* Make the table header sticky */
  top: 0; /* Fix the header at the top of the container */
`

export const TableBody = styled.tbody``

export const TableContainer = styled.tbody`
  overflow-y: scroll;
`

export const TableData = styled.td`
  padding: 8px;
  text-align: left;
`

export const TableRow = styled.tr`
  padding: 8px;
  border: 1px solid #dddddd;
  background-color: ${props => props.theme.hoverCard};
  text-align: left;
`
export const CenteredNumber = styled.td`
  text-align: center;
`

export const NowrapText = styled.td`
  white-space: nowrap;
`

export const Avatar = styled.img`
  border-radius: 50%;
  border: 2px solid ${props => props.theme.mainpurple};
  height: 8rem;
  width: 8rem;
  margin-right: 0.75rem;
  object-fit: cover;
`
