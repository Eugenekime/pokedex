import AsyncStorage from '@react-native-async-storage/async-storage';
import { create } from 'zustand';
import { ThemeType } from '@/theme/themes';

type settingType = {
  theme: ThemeType;
  isFavoritesFirst: boolean;
  setTheme: (theme: ThemeType) => void;
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
    const storedTheme = await AsyncStorage.getItem('theme');
    const isFavoritesFirst = await AsyncStorage.getItem('favoritesFirst');
    const turnedToBoolean = isFavoritesFirst === 'true';
    const theme: ThemeType = storedTheme === 'dark' ? 'dark' : 'light';

    set({ theme: theme || 'light', isFavoritesFirst: turnedToBoolean });
  },
}));

export default useSettingStore;
