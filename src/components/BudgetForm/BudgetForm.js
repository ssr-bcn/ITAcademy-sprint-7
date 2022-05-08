import { useState, useEffect, useRef, useContext } from 'react';
import { BudgetContext, BudgetFormContext } from '../../application/provider';
import { getCheckModifiedValues, checkFormErrors, setUrlParams, getUrlParams } from './helpers';
import { setLocalStorage, getLocalStorage } from '../../helpers/LocalStorage';
import StyledBudgetForm from './BudgetForm.styles';
import Panel from '../Panel';
import Modal from '../Modal/Modal';

const BudgetForm = () => {
  const [budgetElements, setBudgetElements] = useContext(BudgetFormContext);
  const [budgetList, setBudgetList] = useContext(BudgetContext);
  const [formErrors, setFormErrors] = useState([]);
  const [modal, setModal] = useState(false);

  const form = useRef();

  const initialBudget = {
    web: 0,
    seo: 0,
    ads: 0,
    pages: 1,
    languages: 1,
    budget: 0,
    budgetName: '',
    client: '',
    date: {}
  };

  // Controla los eventos en los inputs type=checkbox
  const handleCheckClick = e => {
    const modifiedValues = getCheckModifiedValues( budgetElements, e);
    const newBudget = {
      ...budgetElements,
      ...modifiedValues
    };

    setBudgetElements(newBudget);
    setLocalStorage('budget', newBudget);
    setUrlParams( newBudget );
  }

  // Controla los eventos en los inputs type=text
  const handleClientChange = e => {
    const newBudget = {
      ...budgetElements,
      [e.target.name]: e.target.value
    };

    setBudgetElements(newBudget);
    setLocalStorage('budget', newBudget);
  }

  // Controla el guardado del presupuesto
  const saveBudget = e => {
    e.preventDefault();

    setFormErrors([]);
    const errors = checkFormErrors( budgetElements, budgetList );

    if ( errors.length > 0 ) {
      setFormErrors(errors);
      return;
    }

    const saveBudget = {
      ...budgetElements,
      date: new Date(),
      web: Boolean(budgetElements.web) ? 'Una pàgina web (500€)' : 0,
      seo: Boolean(budgetElements.seo) ? 'Una consultoria SEO (300€)' : 0,
      ads: Boolean(budgetElements.ads) ? 'Una campanya de Google Ads (200€)' : 0,
    }

    const newBudgetList = [ ...budgetList, saveBudget ];

    setBudgetList(newBudgetList);
    setLocalStorage('budgetList', newBudgetList);
  }

  // Reinicia a los valores iniciales
  const resetStates = e => {
    e.preventDefault();

    setBudgetElements(initialBudget);
    setLocalStorage('budget', initialBudget);
    setUrlParams(initialBudget);
    setFormErrors([]);
  }

  /**
   * Se ejecuta una sola vez tras el montado del componente y reasigna
   * la referencia para que ya se pueda actualizar el estado
   */
  useEffect( () => {
    let init = {...initialBudget};
    const paramsFromUrl = getUrlParams();

    if ( Object.keys(paramsFromUrl).length > 0 ) {
      init = { ...init, ...paramsFromUrl };
      setLocalStorage('budget', init);
    } else {
      init = getLocalStorage('budget', initialBudget);
      setUrlParams(init);
      setModal(true);
    }

    setBudgetElements(init); // eslint-disable-next-line
  }, []);

  return (
      <StyledBudgetForm>
        {
          modal && <Modal content="La URL introduïda tenia errors. S'ha restablert a la de l'últim pressupost guardat a LocalStorage." setModal={setModal} />
        }
        <h2>Què vols fer?</h2>

        <form ref={form}>
          <ul>
            <li>
              <input type="checkbox" id="web" value="500" name="web" 
                checked={Boolean(budgetElements.web)}
                onChange={handleCheckClick}
              />
              <label htmlFor="web">Una pàgina web (500€)</label>
              {
                Boolean(budgetElements.web) && <Panel />
              }
            </li>
            <li>
              <input type="checkbox" id="seo" value="300" name="seo" 
                checked={Boolean(budgetElements.seo)}
                onChange={handleCheckClick}
              />
              <label htmlFor="seo">Una consultoria SEO (300€)</label>
            </li>
            <li>
              <input type="checkbox" id="ads" value="200" name="ads" 
                checked={Boolean(budgetElements.ads)}
                onChange={handleCheckClick}
              />
              <label htmlFor="ads">Una campanya de Google Ads (200€)</label>
            </li>
          </ul>

          <p>Preu: {budgetElements.budget}€</p>

          <div id="client-data">

            <div>
              <label htmlFor="budgetName">Títol identificatiu del pressupost:</label><br/>
              <input type="text" id="budgetName" name="budgetName" 
                value={budgetElements.budgetName} onChange={handleClientChange} />
            </div>
            <div>
              <label htmlFor="inputClient">Nom del client:</label><br />
              <input type="text" id="client" name="client" 
                value={budgetElements.client} onChange={handleClientChange} />
            </div>
          </div>

          <div id="action-buttons">
            <div id="action-errors">
            {
              formErrors.length > 0 ?
                  formErrors.map( (msg, i) => <p key={i}>{msg}</p> )
                  : null
            }
            </div>
            <input type="submit" value="Guardar pressupost" onClick={saveBudget} />
            <button onClick={resetStates}>Reiniciar valors</button>
          </div>
        </form>
      </StyledBudgetForm>
  );
}

export default BudgetForm;
