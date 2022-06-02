export const setLocalStorage = (key: string, value: string) => {
  try {
    localStorage.setItem(key, value);
  } catch (event) {
    console.error(event);
  }
};
