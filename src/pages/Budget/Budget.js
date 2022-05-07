import BudgetForm from '../../components/BudgetForm/BudgetForm';
import BudgetList from '../../components/BudgetList/BudgetList';
import { BudgetProvider } from '../../application/provider';

const Budget = () => {
  return (
    <BudgetProvider>
      <BudgetForm />
      <BudgetList />
    </BudgetProvider>
  );
}

export default Budget;
