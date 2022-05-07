import { useState, useEffect, useRef, useContext } from 'react';
import { BudgetContext } from '../../application/provider';
import StyledBudgetForm from './BudgetForm.styles';
import Panel from '../../components/Panel';
import { getLocalStorage, setLocalStorage, resetLocalStorage } from '../../Helpers/LocalStorage';

const BudgetForm = () => {
  const [web, setWeb] = useState(0);
  const [seo, setSeo] = useState(0);
  const [ads, setAds] = useState(0);
  const [budget, setBudget] = useState(0);
  const [extra, setExtra] = useState(0);
  const [budgetName, setBudgetName] = useState('');
  const [client, setClient] = useState('');
  const [formErrors, setFormErrors] = useState([]);

  const [budgetElements, setBudgetElements] = useContext(BudgetContext);

  const form = useRef();
  const inputBudgetName = useRef();
  const inputClient = useRef();

  const onMount = () => {
    const states = {web: setWeb, seo: setSeo, ads: setAds, budget: setBudget, extra: setExtra, budgetName: setBudgetName, client: setClient};

    Object.keys(states).forEach( key => {
      const value = key === 'budgetName' || key === 'client' ? '' : 0;
      states[key]( getLocalStorage(key, value) );
    })
  }

  /**
   * Referencia inicializada en false para controlar la ejecución
   * del useEffect que se activa tras la actualización de un estado.
   * Al llamar a useState en las diferentes variables de estado, 
   * ese UseEffect detectaba ya la inicialización y se anticipaba
   * al useEffect que recuperaba los datos de LocalStorage,
   * que de esta manera eran sobreescritos.
   */
  const initializated = useRef(false);

  /**
   * useEffect para actualizar el estado de budget y guardar
   * los cambios de todos los estados en LocalStorage.
   * 
   * Con el condicional se evita que se ejecute en el momento
   * de inicialización del componente, ya que sobreescribiría
   * la información de LocalStorage con los vales por defecto.
   */
  useEffect( () => {
    if (initializated.current) {
      const sum = web + seo + ads + extra;
      setLocalStorage({budget: sum, web, seo, ads, extra, budgetName, client});
      setBudget(sum);
    }
  }, [web, seo, ads, extra, budgetName, client]);


  useEffect( () => {
    if (formErrors.length === 0 && initializated.current) {
      const formData = new FormData(form.current);
      const formProps = Object.fromEntries(formData);

      const saveBudget = {
        date: new Date(),
        budgetName,
        client,
        budget,
        extra,
        web: Boolean(web) ? 'Una pàgina web (500€)' : 0,
        seo: Boolean(seo) ? 'Una consultoria SEO (300€)' : 0,
        ads: Boolean(ads) ? 'Una campanya de Google Ads (200€)' : 0,
        pages: formProps.pages ?? 0,
        languages: formProps.languages ?? 0 
      }

      setBudgetElements([ ...budgetElements, saveBudget ]);
    }// eslint-disable-next-line
  }, [formErrors]);

  /**
   * useEffect de una sola ejecución para recuperar los datos
   * guardados en LocalStorage.
   * 
   * Tras la recuperación de los datos de LocalStorage, 
   * se cambia el valor de la referencia initialization 
   * para que el useEffect de actualización funcione sin trabas.
   */
  useEffect( () => {
    onMount();
    initializated.current = true;
  }, []);

  const saveBudget = (e) => {
    e.preventDefault();

    const errorsMsg = [];

    if (budget === 0) {
      errorsMsg.push('No ha seleccionat cap opció');
    }

    if (budgetName === '') {
      errorsMsg.push('No ha escrit un nom identificatiu del pressupost');
    }

    const existingBudgetname = budgetElements.filter( budget => budget.budgetName === budgetName );

    if (existingBudgetname.length !== 0) {
      errorsMsg.push(`Ja ha guardat un pressupost amb el nom ${budgetName}`)
    }

    if (client === '') {
      errorsMsg.push('No ha escrit un nom de client');
    }

    setFormErrors(errorsMsg);
  }

  const resetStates = e => {
    e.preventDefault();
    initializated.current = false;
    resetLocalStorage();
    onMount();
    initializated.current = true;
  }

  return (
    <>
      <StyledBudgetForm>
        <h2>Què vols fer?</h2>

        <form ref={form}>
          <ul>
            <li>
              <input type="checkbox" id="web" value="500" name="inputWeb" 
                checked={Boolean(web)}
                onChange={ e => setWeb( !Boolean(web) ? +e.target.value : 0 ) }
              />
              <label htmlFor="web">Una pàgina web (500€)</label>
              {
                Boolean(web) && <Panel stateProps={[setExtra]} />
              }
            </li>
            <li>
              <input type="checkbox" id="seo" value="300" name="inputSeo" 
                checked={Boolean(seo)}
                onChange={ e => setSeo( !Boolean(seo) ? +e.target.value : 0 ) } 
              />
              <label htmlFor="seo">Una consultoria SEO (300€)</label>
            </li>
            <li>
              <input type="checkbox" id="ads" value="200" name="inputAds" 
                checked={Boolean(ads)}
                onChange={ e => setAds( !Boolean(ads) ? +e.target.value : 0 ) } 
              />
              <label htmlFor="ads">Una campanya de Google Ads (200€)</label>
            </li>
          </ul>

          <p>Preu: {budget}€</p>

          <div id="client-data">
            <div>
              <label htmlFor="inputBudget">Títol identificatiu del pressupost:</label><br/>
              <input type="text" id="inputBudget" name="inputBudget" ref={inputBudgetName} value={budgetName} onChange={ () => setBudgetName(inputBudgetName.current.value) } />
            </div>
            <div>
              <label htmlFor="inputClient">Nom del client:</label><br />
              <input type="text" id="inputClient" name="inputClient" ref={inputClient} value={client} onChange={ () => setClient(inputClient.current.value) } />
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
    </>
  );
}

export default BudgetForm;
