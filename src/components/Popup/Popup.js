import { useState } from 'react';
import StyledPopup from "./Popup.styles";
import Modal from "../Modal/Modal";

const Popup = ({modalText}) => {
  const [modal, setModal] = useState(false);

  const handleClick = e => {
    e.preventDefault();
    
    setModal(true);
  }

  return (
    <>
      <StyledPopup href="#" onClick={handleClick}>ℹ️</StyledPopup>
      {
        modal && <Modal content={modalText} setModal={setModal} />
      }
    </>
  );
}

export default Popup;
