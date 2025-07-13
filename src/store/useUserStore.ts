import { create } from "zustand";
import { persist } from "zustand/middleware";

type User = {
  id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  role: string;
  profile?: {
    profilePhoto?: string;
  };
};

interface UserStore {
  user: User | null;
  setUser: (user: User) => void;
  clearUser: () => void;
}

export const useUserStore = create<UserStore>()(
  persist(
    (set) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
    }),
    {
      name: "skill-bridge-user", // localStorage key
    }
  )
);
