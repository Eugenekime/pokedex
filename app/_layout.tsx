import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import useSettingStore from '@/store/settingStore';
import { useEffect } from 'react';
import useStore from '@/store/store';

export default function RootLayout() {
  const loadSettings = useSettingStore((state) => state.loadSettings);
  const loadFavorites = useStore((state) => state.loadFavorites);

  useEffect(() => {
    loadSettings();
    loadFavorites();
  }, []);
  return (
    <>
      <StatusBar
        hidden={false}
        translucent={false}
        backgroundColor="black"
        barStyle="light-content"
      />

      <SafeAreaView style={{ flex: 1, backgroundColor: 'black' }}>
        <Stack
          screenOptions={
            {
              // headerShown: false,
            }
          }
        >
          <Stack.Screen
            name="(tabs)"
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name="pokemon/[id]"
            options={{
              headerShown: false,
            }}
          />
        </Stack>
      </SafeAreaView>
    </>
  );
}
