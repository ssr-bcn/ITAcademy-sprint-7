import { useRef, useEffect } from "react";
import ReactDOM from 'react-dom';
import StyledModal from "./Modal.styles";

const Modal = ({content, setModal}) => {
  const modalRef = useRef();

  const handleClick = e => {
    e.stopPropagation();

    if (e.target.id !== 'modalContent') {
      setModal(false);
    }
  }

  useEffect( () => {
    const element = modalRef.current;
    element.addEventListener( 'click', handleClick );

    return () => element.removeEventListener( 'click', handleClick );
  });

  return ReactDOM.createPortal(
    <StyledModal ref={modalRef}>
      <div id="modalContent">{content}</div>
    </StyledModal>,
    document.body
  );
}

export default Modal;
