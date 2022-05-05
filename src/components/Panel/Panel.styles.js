import styled from 'styled-components';

const StyledPanel = styled.div`
  margin: 0.8rem 0;
  padding: 1rem;
  width: 100%;
  border: 2px solid #000;
  border-radius: 0.5rem;

  & > div {
    display: flex;
    justify-content: space-between;

    & > div {
      width: 50%;
    }
  }

  & > div:first-child {
    margin-bottom: 0.8rem;
  }
`;

export default StyledPanel;
