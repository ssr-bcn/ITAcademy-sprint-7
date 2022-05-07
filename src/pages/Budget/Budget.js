import BudgetForm from '../../components/BudgetForm/BudgetForm';
import BudgetList from '../../components/BudgetList/BudgetList';
import { BudgetProvider, BudgetFormProvider } from '../../application/provider';

const Budget = () => {
  return (
    <BudgetProvider>
      <BudgetFormProvider>
        <BudgetForm />
      </BudgetFormProvider>
      <BudgetList />
    </BudgetProvider>
  );
}

export default Budget;
