
const set = (key: string, value: string) => {
    localStorage.setItem(key, value)
}

const get = (key: string) : string | null => {
    return localStorage.getItem(key);
}

const LocalStorageService = {
  set,
  get
};

export default LocalStorageService;