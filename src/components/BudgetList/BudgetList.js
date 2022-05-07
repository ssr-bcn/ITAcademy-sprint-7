import { useState, useEffect, useContext } from "react";
import { BudgetContext } from "../../application/provider";
import { getLocalStorage } from "../../helpers/LocalStorage";
import StyledBudgetList from "./BudgetList.styles";
import BudgetListItem from '../BudgetListItem/BudgetListItem';

const BudgetList = () => {
  const [budgetList, setBudgetList] = useContext(BudgetContext);
  const [renderedList, setRenderedList] = useState([]);

  const generateList = array => {
    return array.map( budget => <BudgetListItem key={budget.date} data={budget} /> );
  }

  const orderByBudgetName = () => {
    const ordered = [...budgetList];
    ordered.sort( (a, b) => ( a.budgetName.toLowerCase() > b.budgetName.toLowerCase() ) ? 1 : -1);
    setRenderedList(ordered);
  }

  const orderByDateAsc = () => {
    const ordered = [...budgetList];
    ordered.sort( (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() )
    setRenderedList(ordered);
  }

  const orderByDateDesc = () => {
    const ordered = [...budgetList];
    ordered.sort( (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() );
    setRenderedList(ordered);
  }

  const initialOrder = () => {
    orderByDateDesc();
  }

  // Control de nuevas adiciones a budgetList
  useEffect( () => {
    orderByDateDesc(); // eslint-disable-next-line
  }, [budgetList])

  useEffect( () => {
    const init = getLocalStorage('budgetList', []);
    setBudgetList(init); // eslint-disable-next-line
  }, []);

    return (
    <StyledBudgetList>
      <h2>Llistat de pressupostos</h2>

      {
        renderedList.length > 0 ?
          <>
            <button onClick={orderByBudgetName}>Ordenar per nom de pressupost</button>
            <button onClick={orderByDateAsc}>Ordenar per data de creació</button>
            <button onClick={initialOrder}>Reiniciar</button>
          </>
          : "No s'ha guardat cap pressupost"
      }

      <ul>
        {
          renderedList.length > 0 ?
            generateList(renderedList)
            : null
        }
      </ul>
    </StyledBudgetList>
  );
}
export default BudgetList;
