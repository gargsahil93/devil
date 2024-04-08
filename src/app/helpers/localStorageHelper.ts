'client only';
export const getLocalStorage = (key: string) => {
  if (typeof window === 'undefined') return false;
  return JSON.parse(window.localStorage.getItem(key) || 'null');
};

export const setLocalStorage = (key: string, value: object) => {
  if (typeof window === 'undefined') return false;
  window.localStorage.setItem(key, JSON.stringify(value));
};
