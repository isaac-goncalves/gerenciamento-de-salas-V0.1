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
  border-radius: 8px;
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

export const SearchBar = styled.div`
  width: 100%;
  display: flex;
  input {
    width: 80%;
    height: 2.5rem;
    border: none;
    background-color: ${Colors.lightgray};
    border-radius: 8px;
    padding: 0 1rem;
    box-sizing: border-box;
    color: ${Colors.textcolor};
  }

  button {
    width: 12rem;
    height: 2.5rem;
    border: none;
    background-color: ${Colors.mainpurple};
    color: ${Colors.white};
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 1rem;
    cursor: pointer;
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
    border-radius: 8px;
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
    border-radius: 8px;
    padding: 0 1rem;
    box-sizing: border-box;
    color: ${Colors.textcolor};
    margin-left: 1rem;
  }
`

export const TableContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;

  overflow: auto;

  ::-webkit-scrollbar {
    width: 12px;
    height: 8px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f5f5f5;
    border-radius: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 8px;
  }

  table {
    width: 100%;
    height: 100%;
    border-collapse: collapse;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1), 0 6px 6px rgba(0, 0, 0, 0.1);
  }

  thead {
    width: 100%;
    display: flex;
    flex-direction: column;
    position: sticky;
    top: 0;
    z-index: 1; /* to position above tbody when scrolling */
  
  }

  th {
    width: 25%;
    background-color: ${Colors.hoverCard};
    color: ${Colors.white};
    font-weight: 500;
    padding: 0.5rem 2rem;
    text-align: left;
    font-size: 0.8rem;
    white-space: nowrap;

    &:first-child {
      border-top-left-radius: 8px;
      border-bottom-left-radius: 8px;
    }
    
    &:last-child {
      border-top-right-radius: 8px;
      border-bottom-right-radius: 8px;
    }

  }

  tbody {
    width: 100%;
    height: 100%;
  }

  tr {
    transition: background-color 0.2s;
    width: 100%;
  }

  tr td:last-child {
 display: flex;
}

  td {
    width: 25%;
    padding: 0.5rem 2rem;
    border-bottom: 1px solid ${Colors.lightgray};
    font-size: 0.8rem;
    white-space: nowrap;
  }

  tr:hover {
    background-color: ${Colors.lightgray};
  }

  tr:nth-child(even) {
    background-color: ${Colors.lightgray};
  }

  tr:nth-child(odd) {
    background-color: ${Colors.white};
  }
`
