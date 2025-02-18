const todokey = "reactTodo";

export const getLocalStorageTodoData = () => {
    const rawTodo = localStorage.getItem(todokey);
    return rawTodo ? JSON.parse(rawTodo) || [] : [];  // ✅ FIXED: Ensures it's never null
};

export const setLocalStorageTodoData = (store) => {
    localStorage.setItem(todokey, JSON.stringify(store));
};
