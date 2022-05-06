import { useRef, useEffect } from "react";
import StyledModal from "./Modal.styles";

const Modal = ({modalText, stateProps}) => {
  const modalRef = useRef();
  const [setModal] = stateProps;

  useEffect( () => {
    const element = modalRef.current;
    element.addEventListener( 'click', e => {
      e.stopPropagation();

      if (e.target.id !== 'modalContent') {
        setModal(false)
      }
    });

    return () => element.removeEventListener( 'click', setModal(false) );
  });

  return (
    <StyledModal ref={modalRef}>
      <div id="modalContent">{modalText}</div>
    </StyledModal>
  );
}

export default Modal;
