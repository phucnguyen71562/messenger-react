export const storeObjectInLocalStorage = (key, values) => {
  return localStorage.setItem(key, JSON.stringify(values))
}

export const retrieveObjectInLocalStorage = (key) => {
  return JSON.parse(localStorage.getItem(key))
}
