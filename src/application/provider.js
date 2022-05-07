import { createContext, useState } from 'react';

const BudgetContext = createContext(undefined);

const BudgetProvider = ({ children }) => {
  const [budgetElements, setBudgetElements] = useState([]);

  return (            
    <BudgetContext.Provider value={[budgetElements, setBudgetElements]}>
      {children}
    </BudgetContext.Provider>  
  );
}

export { BudgetProvider, BudgetContext };
