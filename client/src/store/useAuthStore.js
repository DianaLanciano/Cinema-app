import { create } from 'zustand';

const useAuthStore = create((set, get) => ({
  // State
  userAdmin: null, // Store user object
  isLoggedIn: false, // Boolean to check login status

  // Actions
  setLoggedUser: (userData) => {
      set({
        userAdmin: userData,
        isLoggedIn: true,
      });
  },
  adminLogout: () => set({ userAdmin: null, isLoggedIn: false }),

  // Derived state (utility function)
  isAdminConnected: () => {
    const user = get().user;
    return user !== null; // Returns true if an admin is logged in
  },
}));

export default useAuthStore;
