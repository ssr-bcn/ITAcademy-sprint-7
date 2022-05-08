const getCheckModifiedValues = ( state, event ) => {
  // Posibles sumandos del presupuesto total
  const possibleAddends = ['web', 'seo', 'ads'];

  // Eliminamos el sumando que acaba de ser modificado por el evento
  const finalAddends = possibleAddends.filter( x => x !== event.target.name );
  
  // Sumamos los valores de los restantes sumandos
  let budget = finalAddends.reduce( (a, b) => state[a] + state[b] );
  
  // Determinamos el valor del sumando modificado por el evento y lo sumamos
  const newValue = event.target.checked ? +event.target.value : 0;
  budget += newValue;
  
  // Si la opción 'web' está activada, hay que añadir la suma de páginas e idiomas
  let webActive = Boolean(state.web);
  webActive = event.target.name === 'web' ? event.target.checked : webActive;
  budget += webActive ? state.pages * state.languages * 30 : 0;

  // Si no está activada, reseteamos los estados de pages y languages
  const pagesAndLanguages = webActive ? {} : { pages: 1, languages: 1};
  

  return { [event.target.name]: newValue, ...pagesAndLanguages, budget };
}

const getClickModifiedValues = (state, property, newValue) => {
  // Sumandos del presupuesto total
  const addends = ['web', 'seo', 'ads'];

  // Sumamos los valores de los restantes sumandos
  let budget = addends.reduce( (a, b) => (a + state[b]), 0);
  
  // Si la opción 'web' está activada, hay que añadir la suma de páginas e idiomas
  const possibleAddends = ['pages', 'languages'];
  const finalAddend = possibleAddends.filter( x => x !== property );
  budget += Boolean(state.web) ? newValue * state[finalAddend[0]] * 30 : 0;

  return { [property]: +newValue, budget };
}

const checkFormErrors = ( state, stateList ) => {
  const errorsMsg = [];

  if (state.budget === 0) {
    errorsMsg.push('No ha seleccionat cap opció');
  }

  if (state.budgetName === '') {
    errorsMsg.push('No ha escrit un nom identificatiu del pressupost');
  }

  const existingBudgetname = stateList.filter( budget => budget.budgetName === state.budgetName );

  if (existingBudgetname.length !== 0) {
    errorsMsg.push(`Ja ha guardat un pressupost amb el nom ${state.budgetName}`)
  }

  if (state.client === '') {
    errorsMsg.push('No ha escrit un nom de client');
  }

  return errorsMsg;
}

const setUrlParams = state => {
  const baseUrl = document.location.protocol + "//" + document.location.host + document.location.pathname;
  const params = ['web', 'seo', 'ads', 'pages', 'languages', 'budget'];
  const trustyValues = { web: 500, seo: 300, ads: 200 };
  const paramsUrl = Object.keys(state)
    .filter( property => params.includes(property) )
    .map( property => {
      const value = Object.keys(trustyValues).includes(property) ? Boolean(state[property]) : state[property];
      return `${property}=${value}` 
    })
    .join('&');
  const newUrl = `${baseUrl}?${paramsUrl}`;

  window.history.replaceState( {path:newUrl}, '', newUrl );
}

/**
 * Devuelve array con dos valores:
 * - el primero indica si la URL tenía params que recuperar
 * - el segundo devuelve un objeto con los params recuperados y sus valores
 */
const getUrlParams = () => {
  // Si la URL no tiene params, se impiden comprobaciones innecesarias
  if (!document.location.toString().includes('?')) {
    return [false, {}];
  }

  // URL con params
  const paramsUrl = ( new URL(document.location) ).searchParams;
  const params = ['web', 'seo', 'ads', 'pages', 'languages', 'budget'];
  const trustyValues = { web: 500, seo: 300, ads: 200 };
  let properties = {};

  // Se almacenan los params y sus valores en un objeto con una sanitización inicial
  for ( const [prop, value] of paramsUrl ) {
    if ( params.includes(prop) ) {
      let assignment;

      if ( Object.keys(trustyValues).includes(prop) ) {
        assignment = value === 'true' ? trustyValues[prop] : 0;
      } else {
        assignment = Number.isInteger(+value) ? +value : 0;
      }

      properties[prop] = assignment;
    }
  }

  // Comprobación de que la suma de los valores de params = budget
  const addends = ['web', 'seo', 'ads'];
  let propertiesSum = addends.reduce( (a, b) => ( a + ( properties[b] ?? 0 ) ), 0);

  if ( properties['web'] && properties['web'] === 500 ) {
    propertiesSum += properties['pages'] && properties['languages'] ? properties['pages'] * properties['languages'] * 30 : 0;
  }

  if ( !properties['budget'] || propertiesSum !== properties['budget'] ) properties = {};

  return [true, properties];
}

export { getCheckModifiedValues, getClickModifiedValues, checkFormErrors, setUrlParams, getUrlParams };
