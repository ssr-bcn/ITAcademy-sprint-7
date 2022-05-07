import { useContext, useEffect } from 'react';
import { BudgetContext } from "../../application/provider";
import StyledBudgetList from "./BudgetList.styles";
import BudgetListItem from '../BudgetListItem/BudgetListItem';

const BudgetList = () => {
  const [budgetElements] = useContext(BudgetContext);

  useEffect( () => {
  }, [budgetElements]);

  return (
    <StyledBudgetList>
      <h2>Llistat de pressupostos</h2>
      <ul>
        {
          budgetElements.length > 0 ?
            budgetElements.map( budget => {
              return (
                <BudgetListItem key={budget.date.toLocaleString()} data={budget} />
              );
            })
            : null
        }
      </ul>
    </StyledBudgetList>
  );
}
export default BudgetList;
