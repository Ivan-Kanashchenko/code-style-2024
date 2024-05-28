type TokenKeyType = "access" | "refresh";
type StorageType = "sessionStorage" | "localStorage";

type TokenObject = {
  token: string;
  storage: StorageType;
};

const getToken = (tokenKey: TokenKeyType): TokenObject | undefined => {
  let token = sessionStorage.getItem(tokenKey);

  if (token) {
    return { token, storage: "sessionStorage" };
  }

  token = localStorage.getItem(tokenKey);

  if (token) {
    return { token, storage: "localStorage" };
  }

  return;
};

const setToken = (
  tokenKey: TokenKeyType,
  token: string,
  storageType: StorageType,
) => {
  if (storageType === "sessionStorage") {
    sessionStorage.setItem(tokenKey, token);
  }

  if (storageType === "localStorage") {
    localStorage.setItem(tokenKey, token);
  }
};

const remove = () => {
  sessionStorage.removeItem("access");
  sessionStorage.removeItem("refresh");
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
};

export const token = {
  access: {
    get: () => getToken("access"),
    set: (token: string, storageType: StorageType) =>
      setToken("access", token, storageType),
  },
  refresh: {
    get: () => getToken("refresh"),
    set: (token: string, storageType: StorageType) =>
      setToken("refresh", token, storageType),
  },
  clear: () => remove(),
};
