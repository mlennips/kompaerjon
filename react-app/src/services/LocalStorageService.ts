const get = (key: string) : string | null => {
    return localStorage.getItem(key);
}

const set = (key: string, value: string) => {
  localStorage.setItem(key, value);
}

const remove = (key: string) => {
  localStorage.removeItem(key);
}

const LocalStorageService = {
  set,
  get,
  remove
};

export default LocalStorageService;