import styled from 'styled-components';

const StyledModal = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);

  & > div {
    max-width: 80%;
    margin: 0;
    padding: 1.5rem;
    border: 2px solid #000;
    border-radius: 0.8rem;
    background-color: #fff;
  }
`;

export default StyledModal;
