import { useRef, useContext } from 'react';
import { BudgetFormContext } from '../../application/provider';
import { getClickModifiedValues, setUrlParams } from '../BudgetForm/helpers';
import { setLocalStorage } from '../../helpers/LocalStorage';
import StyledCustomInput from "./CustomInput.styles";
import Popup from "../Popup/Popup";

const CustomInput = props => {
  const [budgetElements, setBudgetElements] = useContext(BudgetFormContext);
  const input = useRef();

  const handleClick = (e, addend) => {
    e.preventDefault();

    if ( budgetElements[input.current.name] + addend < 0 ) return;

    const modifiedValues = getClickModifiedValues( budgetElements, input.current.name, budgetElements[input.current.name] + addend);
    const newBudget = {
      ...budgetElements,
      ...modifiedValues
    };

    setBudgetElements(newBudget);
    setLocalStorage('budget', newBudget);
    setUrlParams(newBudget);
  }

  const handleChange = () => {
    if ( !Number.isInteger(+input.current.value) || input.current.value < 0 ) return;

    const modifiedValues = getClickModifiedValues( budgetElements, input.current.name, input.current.value);
    const newBudget = {
      ...budgetElements,
      ...modifiedValues
    };

    setBudgetElements(newBudget);
    setLocalStorage('budget', newBudget);
    setUrlParams( newBudget );
  }

  return (
    <StyledCustomInput>
      <button onClick={(e) => handleClick(e, 1)}>+</button>
      <input type="text" ref={input} id={props.id} name={props.id} value={budgetElements[props.id]} onChange={handleChange} />
      <button onClick={(e) => handleClick(e, -1)}>-</button>
      <Popup modalText={props.modalText}/>
    </StyledCustomInput>
  );
}

export default CustomInput;
