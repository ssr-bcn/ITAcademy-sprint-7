import { useEffect, useContext } from "react";
import { BudgetContext } from "../../application/provider";
import { getLocalStorage } from "../../helpers/LocalStorage";
import StyledBudgetList from "./BudgetList.styles";
import BudgetListItem from '../BudgetListItem/BudgetListItem';

const BudgetList = () => {
  const [budgetList, setBudgetList] = useContext(BudgetContext);

  useEffect( () => {
    const init = getLocalStorage('budgetList', []);
    setBudgetList(init); // eslint-disable-next-line
  }, []);

    return (
    <StyledBudgetList>
      <h2>Llistat de pressupostos</h2>
      <ul>
        {
          budgetList.length > 0 ?
            budgetList.map( budget => {
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
