import StyledCustomInput from "./CustomInput.styles";
import Popup from "../Popup/Popup";

const CustomInput = props => {
  const [state, setState] = props.stateProps;
  return (
    <StyledCustomInput>
      <button onClick={ () => setState( state + 1 ) }>+</button>
      <input type="text" id={props.id} value={state} onChange={props.action} />
      <button onClick={ () => setState( state - 1 ) }>-</button>
      <Popup modalText={props.modalText}/>
    </StyledCustomInput>
  );
}

export default CustomInput;
