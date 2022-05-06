import { useState, useEffect, useRef } from 'react';
import Panel from './components/Panel';
import { getLocalStorage, setLocalStorage } from './Helpers/LocalStorage';

function App() {
  const [web, setWeb] = useState(0);
  const [seo, setSeo] = useState(0);
  const [ads, setAds] = useState(0);
  const [budget, setBudget] = useState(0);
  const [extra, setExtra] = useState(0);

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
      setBudget(sum);
      setLocalStorage({budget: sum, web, seo, ads, extra});
    }
  }, [web, seo, ads, extra]);

  /**
   * useEffect de una sola ejecución para recuperar los datos
   * guardados en LocalStorage.
   * 
   * Tras la recuperación de los datos de LocalStorage, 
   * se cambia el valor de la referencia initialization 
   * para que el useEffect de actualización funcione sin trabas.
   */
  useEffect( () => {
    const states = {web: setWeb, seo: setSeo, ads: setAds, budget: setBudget, extra: setExtra};

    Object.keys(states).forEach( key => {
      states[key]( getLocalStorage(key, 0) );
    })
    
    initializated.current = true;
  }, []);

  return (
    <>
      <section>
        <h2>Què vols fer?</h2>
        <ul>
          <li>
            <input type="checkbox" id="web" value="500" 
              checked={Boolean(web)}
              onChange={ e => setWeb( !Boolean(web) ? +e.target.value : 0 ) }
            />
            <label htmlFor="web">Una pàgina web (500€)</label>
            {
              Boolean(web) && <Panel stateProps={[setExtra]} />
            }
          </li>
          <li>
            <input type="checkbox" id="seo" value="300" 
              checked={Boolean(seo)}
              onChange={ e => setSeo( !Boolean(seo) ? +e.target.value : 0 ) } 
            />
            <label htmlFor="seo">Una consultoria SEO (300€)</label>
          </li>
          <li>
            <input type="checkbox" id="ads" value="200" 
              checked={Boolean(ads)}
              onChange={ e => setAds( !Boolean(ads) ? +e.target.value : 0 ) } 
            />
            <label htmlFor="ads">Una campanya de Google Ads (200€)</label>
          </li>
        </ul>
        <p>Preu: {budget}€</p>
      </section>
    </>
  );
}

export default App;
