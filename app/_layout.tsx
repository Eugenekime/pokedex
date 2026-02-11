import { Stack } from 'expo-router';
import { StatusBar } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function RootLayout() {
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
          <Stack.Screen name="pokemon/[id]" />
        </Stack>
      </SafeAreaView>
    </>
  );
}
