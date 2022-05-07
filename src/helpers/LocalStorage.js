export const setLocalStorage = (key, value) => {
  try {
    window.localStorage.setItem(key, JSON.stringify( value ));
  } catch (error) {
    console.log(error);
  }
}

export const getLocalStorage = (key, defaultValue) => {
  try {
    const item = window.localStorage.getItem(key);
    if (!item) setLocalStorage(key, defaultValue);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    return defaultValue;
  }
}

export const resetLocalStorage = () => {
  window.localStorage.clear();
}
