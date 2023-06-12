import Cookies from 'js-cookie'
import create from 'zustand'

const useAuthStore = create((set) => ({
    user: JSON.parse(localStorage.getItem('user')) || null,
    setUser: (user) => set({ user }),
    logout: () => {
        Cookies.remove('token');
        localStorage.removeItem('user');
        set({ user: null });
    },
}));

export default useAuthStore;
