import { addToLS, getFromLS } from "./localStorage";

export const toggleFn = (storage, product, addFunc) => {
  let store = getFromLS(storage) || [];
  const element = store?.find((item) =>
    item.uuid === product.uuid ? item : ""
  );
  if (element !== undefined) {
    const filteredArr = store.filter((item) => item.uuid !== product.uuid);
    addToLS(storage, filteredArr);
    addFunc(filteredArr);
  } else {
    product = { ...product, count: 1 };
    addToLS(storage, [...store, product]);
    addFunc([...store, product]);
  }
};
