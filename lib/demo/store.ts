import { create } from 'zustand';
import { doctor } from './healthcare-data';
import { hotel } from './hotel-data';

type AuthState<TUser> = {
  isAuthenticated: boolean;
  user: TUser;
  signIn: () => void;
  signOut: () => void;
};

function createAuthStore<TUser>(user: TUser) {
  // Defaults to signed-in so a shared deep link to any dashboard page works
  // without a redirect gate — this is a showcase, not a real authenticated app.
  return create<AuthState<TUser>>((set) => ({
    isAuthenticated: true,
    user,
    signIn: () => set({ isAuthenticated: true }),
    signOut: () => set({ isAuthenticated: false }),
  }));
}

export const useDemoAuth = createAuthStore(doctor);
export const useHotelAuth = createAuthStore(hotel.manager);

type UIState = {
  mobileSidebarOpen: boolean;
  setMobileSidebarOpen: (open: boolean) => void;
};

export const useDemoUI = create<UIState>((set) => ({
  mobileSidebarOpen: false,
  setMobileSidebarOpen: (open) => set({ mobileSidebarOpen: open }),
}));
