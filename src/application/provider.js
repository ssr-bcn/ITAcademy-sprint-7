import { createContext, useState } from 'react';

const BudgetContext = createContext();

const BudgetProvider = ({ children }) => {
  const [budgetList, setBudgetList] = useState([]);

  return (            
    <BudgetContext.Provider value={[budgetList, setBudgetList]}>
      {children}
    </BudgetContext.Provider>  
  );
}

const BudgetFormContext = createContext();

const BudgetFormProvider = ({ children }) => {
  const [budgetElements, setBudgetElements] = useState({
    web: 0,
    seo: 0,
    ads: 0,
    pages: 1,
    languages: 1,
    budget: 0,
    budgetName: '',
    client: '',
    date: {}
  });

  return (            
    <BudgetFormContext.Provider value={[budgetElements, setBudgetElements]}>
      {children}
    </BudgetFormContext.Provider>  
  );
}

export { BudgetProvider, BudgetContext, BudgetFormProvider, BudgetFormContext };
