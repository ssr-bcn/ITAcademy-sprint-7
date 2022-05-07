import { useContext } from 'react';
import { BudgetFormContext } from '../../application/provider';
import StyledPanel from "./Panel.styles";
import CustomInput from '../CustomInput/CustomInput';

const Panel = () => {
  const [budgetElements] = useContext(BudgetFormContext);

  return (
    <StyledPanel>
      <div>
        <label htmlFor="pages">Quantitat de pàgines:</label>
        <CustomInput 
          id="pages"
          modalText={
            `Indiqui la quantitat de pàgines que tindrà la seva pàgina web.
            Ara mateix el pressupost contempla que ${ !Boolean(budgetElements.pages) ? 'no' : '' } tindrà 
            ${ !Boolean(budgetElements.pages) ? 'cap' : budgetElements.pages} 
            ${ !Boolean(budgetElements.pages) || budgetElements.pages === 1 ? 'pàgina' : 'pàgines'}`
          }
        />
      </div>
      <div>
        <label htmlFor="languages">Quantitat d'idiomes:</label>
        <CustomInput 
          id="languages" 
          modalText={
            `Indiqui la quantitat d'idiomes que tindrà la seva pàgina web.\r\n
            Ara mateix el pressupost contempla que ${ !Boolean(budgetElements.languages) ? 'no' : '' } tindrà 
            ${ !Boolean(budgetElements.languages) ? 'cap' : budgetElements.languages} 
            ${ !Boolean(budgetElements.languages) || budgetElements.languages === 1 ? 'idioma' : 'idiomes'}`
          }
        />
      </div>
    </StyledPanel>
  );
}

export default Panel;
