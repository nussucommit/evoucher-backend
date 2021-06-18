export enum SessionStorageKey {
  access = 'access',
  refresh = 'refresh',
  sessionTimedOut = 'sessionTimedOut',
}

const getItem = (key: SessionStorageKey) => {
  return sessionStorage.getItem(SessionStorageKey[key])
}

const setItem = (key: SessionStorageKey, value: string) => {
  return sessionStorage.setItem(SessionStorageKey[key], value)
}

const removeItem = (key: SessionStorageKey) => {
  return sessionStorage.removeItem(key)
}

const removeAllItems = () => {
  return sessionStorage.clear()
}

const session = {
  getItem,
  setItem,
  removeItem,
  removeAllItems,
}

export default session
