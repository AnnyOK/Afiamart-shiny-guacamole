export const getFromStorage = (key, initial)=>{
    const result = localStorage.getItem(key);
    return result ? JSON.parse(result) : initial
    }
    