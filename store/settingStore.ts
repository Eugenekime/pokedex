import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';

type settingType = {
  theme: string;
  isFavoritesFirst: boolean;
  setTheme: (theme: string) => void;
  setIsFavoritesFirst: (favoritesFirst: boolean) => void;
  loadSettings: () => void;
};

const useSettingStore = create<settingType>((set) => ({
  theme: 'light',
  isFavoritesFirst: false,
  setTheme: async (theme) => {
    set({ theme });
    await AsyncStorage.setItem('theme', theme);
  },
  setIsFavoritesFirst: async (isFavoritesFirst) => {
    set({ isFavoritesFirst });
    await AsyncStorage.setItem('favoritesFirst', isFavoritesFirst.toString());
  },
  loadSettings: async () => {
    const theme = await AsyncStorage.getItem('theme');
    const isFavoritesFirst = await AsyncStorage.getItem('isFavoritesFirst');
    const turnedToBoolean = isFavoritesFirst === 'true';
    if (theme) set({ theme });
    if (isFavoritesFirst)
      set({
        isFavoritesFirst: turnedToBoolean,
      });
  },
}));

export default useSettingStore;
