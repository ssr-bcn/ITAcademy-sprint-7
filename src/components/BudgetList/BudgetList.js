import { useState, useEffect, useContext, useRef } from "react";
import { BudgetContext } from "../../application/provider";
import { getLocalStorage } from "../../helpers/LocalStorage";
import StyledBudgetList from "./BudgetList.styles";
import BudgetListItem from '../BudgetListItem/BudgetListItem';

const BudgetList = () => {
  const [budgetList, setBudgetList] = useContext(BudgetContext);
  const [renderedList, setRenderedList] = useState([]);

  const inputSearch = useRef();

  const generateList = array => {
    return array.map( budget => <BudgetListItem key={budget.date} data={budget} /> );
  }

  const orderByBudgetName = () => {
    const ordered = [...renderedList];
    ordered.sort( (a, b) => ( a.budgetName.toLowerCase() > b.budgetName.toLowerCase() ) ? 1 : -1);
    setRenderedList(ordered);
  }

  const orderByDateAsc = () => {
    const ordered = [...renderedList];
    ordered.sort( (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime() )
    setRenderedList(ordered);
  }

  const orderByDateDesc = (list = null) => {
    const ordered = list ?? [...renderedList];
    ordered.sort( (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime() );
    setRenderedList(ordered);
  }

  const initialOrder = () => {
    inputSearch.current.value = '';
    orderByDateDesc([...budgetList]);
  }

  const filterByBudgetName = e => {
    if ( !Boolean(e.target.value) ) {
      initialOrder();
      return;
    }

    const needle = e.target.value.toLowerCase();
    const filtered = [...budgetList].filter( budget => {
      return budget.budgetName.toLowerCase().includes( needle )
     } );

    filtered.length > 0 ? setRenderedList(filtered) : setRenderedList([]);
  }

  // Control de nuevas adiciones a budgetList
  useEffect( () => {
    orderByDateDesc([...budgetList]); // eslint-disable-next-line
  }, [budgetList])

  // Ejecución tras el primer montado del componente
  useEffect( () => {
    const init = getLocalStorage('budgetList', []);
    setBudgetList(init); // eslint-disable-next-line
  }, []);

    return (
    <StyledBudgetList>
      <h2>Llistat de pressupostos</h2>

      {
        budgetList.length > 0 ?
          <>
            <p>
              <input type="text" ref={inputSearch} placeholder="Buscar per nom de pressupost" onChange={filterByBudgetName} />
            </p>
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
