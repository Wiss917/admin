export const hasToken = () => !!localStorage.getItem('token');

export const removeToken = () => localStorage.removeItem('token');
