import StyledCustomInput from "./CustomInput.styles";

const CustomInput = props => {
  const [state, setState] = props.stateProps;
  return (
    <StyledCustomInput>
      <button onClick={ () => setState( state + 1 ) }>+</button>
      <input type="text" id={props.id} value={state} onChange={props.action} />
      <button onClick={ () => setState( state - 1 ) }>-</button>
    </StyledCustomInput>
  );
}

export default CustomInput;
