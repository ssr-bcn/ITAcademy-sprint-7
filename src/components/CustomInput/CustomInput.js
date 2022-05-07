import StyledCustomInput from "./CustomInput.styles";
import Popup from "../Popup/Popup";

const CustomInput = props => {
  const [state, setState] = props.stateProps;

  const handleClick = (value, e) => {
    e.preventDefault();
    setState( state + value );
  }

  return (
    <StyledCustomInput>
      <button onClick={ (e) => handleClick(1, e) }>+</button>
      <input type="text" id={props.id} name={props.id} value={state} onChange={props.action} />
      <button onClick={ (e) => handleClick(-1, e) }>-</button>
      <Popup modalText={props.modalText}/>
    </StyledCustomInput>
  );
}

export default CustomInput;
