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
  const baseUrl = window.location.protocol + "//" + window.location.host + window.location.pathname;
  const params = ['web', 'seo', 'ads', 'pages', 'languages', 'budget'];
  const paramsUrl = Object.keys(state)
    .filter( property => params.includes(property) )
    .map( property => `${property}=${state[property]}` )
    .join('&');
  const newUrl = `${baseUrl}?${paramsUrl}`;

  window.history.replaceState({path:newUrl},'',newUrl);
}

const getUrlParams = () => {
  const paramsUrl = ( new URL(document.location) ).searchParams;
  const params = ['web', 'seo', 'ads', 'pages', 'languages', 'budget'];
  const properties = {};

  for ( const [key, value] of paramsUrl ) {
    if ( params.includes(key) ) properties[key] = +value;
  }

  return properties;
}

export { getCheckModifiedValues, getClickModifiedValues, checkFormErrors, setUrlParams, getUrlParams };
