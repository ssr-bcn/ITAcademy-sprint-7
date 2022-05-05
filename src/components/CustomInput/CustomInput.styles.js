import styled from 'styled-components';

const StyledCustomInput = styled.div`
  display: flex;
  justify-content: end;
  align-items: center;

  & > input {
    margin: 0 0.2rem;
    padding: 0.3rem 0.5rem;
    max-width: 4rem;
    border: 2px solid #fff;
    border-radius: 0.3rem;
    text-align: center;
   
    &:focus, &:active {
      border-color: #000;
      outline: 0;
    }
  }

  & > button {
    margin: 0;
    padding: 0.2rem 0.5rem;
    min-width: 1.7rem;
    min-height: 1.7rem;
    border: 1px solid #f77754;
    border-radius: 0.3rem;
    background-color: #f77754;
    font-size: 1.2rem;
    font-weight: bold;
    color: #fff;

    &:hover, &:active {
      background-color: #fff;
      color: #f77754;
    }

    &:active {
      color: #000;
    }
  }
`;

export default StyledCustomInput;
