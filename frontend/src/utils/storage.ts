// Keys
export enum StorageKey {}

const getItem = (key: StorageKey) => {
    return localStorage.getItem(StorageKey[key]);
};

const setItem = (key: StorageKey, value: string) => {
    return localStorage.setItem(StorageKey[key], value);
};

const removeItem = (key: StorageKey) => {
    return localStorage.removeItem(key);
};

const removeAllItems = () => {
    return localStorage.clear();
};

const storage = {
    getItem,
    setItem,
    removeItem,
    removeAllItems,
};

export default storage;
