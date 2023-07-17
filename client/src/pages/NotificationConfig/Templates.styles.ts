import styled from 'styled-components'

import { Colors } from '../../colors'

export const Container = styled.div`
  width: calc(100% - 5rem);
  height: 100vh;
  margin-left: 5rem;
  background-color: ${Colors.lightgray};
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
`
export const Wrapper = styled.div`
  width: 90%;
  height: 90%;
  background-color: ${Colors.white};
  z-index: 10;
  border-radius: 4px;
  padding: 2rem 8rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
`

export const Header = styled.div`
  width: 80%;
  display: flex;
  justify-content: space-between;
`

export const PageTitle = styled.h1`
 font-size: 2rem;
  color: ${Colors.textcolor};
 
`

export const TemplateImage = styled.img`
  width: 90%;
  margin: 1rem;
 
`

export const CounterWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;

  h1 {
    font-size: 3rem;
  }
  p {
    font-size: 1rem;
  }
`

export const Separator = styled.div`
  border-left: 1px solid ${Colors.lightgray};
  height: 100px;
`

export const MainContainer = styled.div`
  width: 100%;
  display: flex;
  width: 100%;
  justify-content: space-between;
  input {
    width: 80%;
    height: 2.5rem;
    border: none;
    background-color: ${Colors.lightgray};
    border-radius: 4px;
    padding: 0 1rem;
    box-sizing: border-box;
    color: ${Colors.textcolor};
  }

 
`

export const ButtonsWrapper = styled.td`
  display: flex;
  gap: 0.2rem;
  align-items: center;
`

export const EditButton = styled.button`
  background-color: ${Colors.hoverCard};
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
    background-color: ${Colors.lightgray};
    border-radius: 4px;
    padding: 0 1rem;
    box-sizing: border-box;
    color: ${Colors.textcolor};
    margin-right: 1rem;
  }

  option {
    width: 10rem;
    height: 2.5rem;
    border: none;
    background-color: ${Colors.lightgray};
    border-radius: 4px;
    padding: 0 1rem;
    box-sizing: border-box;
    color: ${Colors.textcolor};
    margin-left: 1rem;
  }
`

export const Table = styled.table`
  /* border : 1px solid red; */
  border-collapse: collapse;

  width: 100%;
  background-color: ${Colors.white};
  z-index: 1;
  font-size: 0.9em;

  th {
    color: ${Colors.textcolor};
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
  max-height: 100%; /* Adjust the desired maximum height */
  overflow-y: auto; /* Adjust the desired maximum height */
`

export const TableData = styled.td`
  padding: 8px;
  text-align: left;
`

export const TableRow = styled.tr`
  padding: 8px;
  border: 1px solid #dddddd;
  background-color: ${Colors.hoverCard};
  opacity: 0.8;
  text-align: left;
  font-weight: 400;
`
export const CenteredNumber = styled.td`
  text-align: center;
`

export const NowrapText = styled.td`
  white-space: nowrap;
`
