import styled from 'styled-components';

const StyledBudgetForm = styled.section`
  width: 50%;
  padding: 1.5rem;

  #client-data,
  #action-buttons {
    padding: 0.5rem 0;
    width: 100%;
  }

  #client-data {
    display: flex;
  }

  #client-data > div {
    width: 50%;
  }

  #client-data > div > input {
    margin: 0.3rem 0 0 0;
  }

  #action-buttons button {
    margin: 0 0 0 0.5rem;
  }

  #action-errors {
    margin: 0.3rem 0 0.5rem;
    width: 100%;
    color: red;
  }

  #action-errors p {
    margin: 0 0 0.3rem 0;
  }
`;

export default StyledBudgetForm;
