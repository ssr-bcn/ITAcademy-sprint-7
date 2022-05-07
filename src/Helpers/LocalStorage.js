export const setLocalStorage = obj => {
  Object.keys(obj)
    .forEach( key => {
      try {
        window.localStorage.setItem(key, JSON.stringify( obj[key] ));
      } catch (error) {
        console.log(error);
      }
    } );
}

export const getLocalStorage = (key, defaultValue) => {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) setLocalStorage({[key]: defaultValue});
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

export const resetLocalStorage = () => {
  window.localStorage.clear();
}
