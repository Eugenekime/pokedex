export const themes = {
  light: {
    backgroundColor: '#F5F5F5',
    color: '#1A1A1A',
  },
  dark: { backgroundColor: '#60A5FA', color: '#F1F5F9' },
};

export type ThemeType = keyof typeof themes;
