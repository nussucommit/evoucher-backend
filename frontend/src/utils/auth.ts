import session, { SessionStorageKey } from "./sessionStorage";

export const getToken = () => {
    const access = session.getItem(SessionStorageKey.access);
    const refresh = session.getItem(SessionStorageKey.refresh);
    if (access && refresh) return { access, refresh } as Token;
};

export const saveToken = (token: Token) => {
    session.setItem(SessionStorageKey.access, token.access);
    session.setItem(SessionStorageKey.refresh, token.refresh);
};

export const deleteToken = () => {
    session.removeItem(SessionStorageKey.access);
    session.removeItem(SessionStorageKey.refresh);
};
