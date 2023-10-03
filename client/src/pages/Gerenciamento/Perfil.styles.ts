import styled from 'styled-components'

import { Colors } from '../../colors'
import { HiOutlineSearch } from 'react-icons/hi'
import { FaFilter } from 'react-icons/fa'
import PacmanLoader from 'react-spinners/PacmanLoader'

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

export const Header = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`

export const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  h1 {
    font-size: 3rem;
    color: ${props => props.theme.textcolor};
  }
  p {
    font-size: 1rem;
    color: ${props => props.theme.textcolor};
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

export const SearchIcon = styled(HiOutlineSearch)`
  margin-right: 0.5rem;
  color: ${props => props.theme.mainpurple};
`
export const FilterIcon = styled(FaFilter)`
  margin-right: 0.5rem;
  color: white;
  color: ${props => props.theme.mainpurple};
`

export const SearchBar = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  input {
    width: 80%;
    height: 2.5rem;
    border: none;
    background-color: ${props => props.theme.lightgray};
    border-radius: 4px;
    padding: 0 1rem;
    box-sizing: border-box;
    color: ${props => props.theme.textcolor};
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.5rem;
    height: 2.5rem;
    border: none;
    background-color: ${props => props.theme.mainpurple};
    color: ${props => props.theme.realwhite};
    border-radius: 4px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    cursor: pointer;
    white-space: nowrap;
  }
`

export const ButtonsWrapper = styled.div`
  display: flex;
  gap: 0.5rem;
  /* width: 8rem; */
  justify-content: center;
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

  align-items: center;

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

export const PacmanLoaderWrapper = styled(PacmanLoader)`
  color: red;
`

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const TableWrapper = styled.div`
  height: 100%; /* Set the maximum height for the scrollable area */
  overflow: auto; /* Add scrollbars when the content overflows */
  width: 100%;
  border-bottom: 2px solid ${props => props.theme.hoverCard};
`

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  background-color: ${props => props.theme.lightgray};
  z-index: 1;
  font-size: 0.8em;
  /* margin-bottom: 2px solid ${props => props.theme.mainpurple}; */

  th {
    color: ${props => props.theme.tableheadercolor};
  }

  th:last-child {
    text-align: center;
  }

  th,
  td {
    padding: 8px 5px;
    color: ${props => props.theme.textcolor};
  }

  tbody {
  }

  tbody tr {
    border-bottom: 1px solid ${props => props.theme.hoverCard};
  }

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

export const TableBody = styled.tbody`
  tr {
    height: 3rem;
    /* background-color: ${props => props.theme.hoverCard}; */
  }

  tr:hover {
    background-color: ${props => props.theme.tableHover};
    cursor: pointer;
  }

  td {
    /* color: ${props => props.theme.textcolor}; */
  }

  /* border: 1px solid red; */
`

export const TableData = styled.td`
  padding: 8px;
  text-align: left;
`

export const TableRowHeader = styled.tr`
  padding: 8px;
  border: 1px solid ${props => props.theme.border_bottom_color};
  background-color: ${props => props.theme.hoverCard};
  text-align: left;

  th {
    text-align: center;
    color: ${props => props.theme.textcolor};
  }
`
export const CenteredTableData = styled.td`
  text-align: center;
`

export const NowrapText = styled.td`
  white-space: nowrap;
`
