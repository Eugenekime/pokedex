import { Tabs } from 'expo-router';
import { Image } from 'react-native';
import useSettingStore from '@/store/settingStore';
import { lightTheme } from '@/theme/lightTheme';
import { darkTheme } from '@/theme/darkTheme';

export default function Index() {
  const theme = useSettingStore((state) => state.theme);
  return (
    <Tabs
      screenOptions={{
        tabBarShowLabel: false,
        headerShown: false,

        tabBarIconStyle: {
          marginTop: 10,
        },

        tabBarStyle: {
          position: 'absolute',
          bottom: 10,
          left: 25,
          right: 25,
          height: 60,
          borderRadius: 45,
          backgroundColor:
            theme === 'light'
              ? lightTheme.colors.background
              : darkTheme.colors.primary,
        },
      }}
    >
      <Tabs.Screen
        name="home/index"
        options={{
          tabBarIcon: ({ size, focused }) => (
            <Image
              source={require('../../assets/images/pokeball.png')}
              style={{
                width: size,
                height: size,
                opacity: focused ? 1 : 0.7,
                transform: [
                  { scale: focused ? 1.2 : 1 },
                  { rotate: focused ? '30deg' : '0deg' },
                ],
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require('../../assets/images/transparency.png')}
              style={{
                width: focused ? size * 1.24 : size,
                height: focused ? size * 1.24 : size,
                opacity: focused ? 1 : 0.7,
                transform: [{ rotate: focused ? '30deg' : '0deg' }],
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="favorite"
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require('@/assets/images/star.png')}
              style={{
                width: focused ? size * 1.24 : size,
                height: focused ? size * 1.24 : size,
                opacity: focused ? 1 : 0.7,
                transform: [{ rotate: focused ? '70deg' : '0deg' }],
              }}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          tabBarIcon: ({ focused, size }) => (
            <Image
              source={require('../../assets/images/gear.png')}
              style={{
                width: focused ? size * 1.24 : size,
                height: focused ? size * 1.24 : size,
                opacity: focused ? 1 : 0.7,
                transform: [{ rotate: focused ? '30deg' : '0deg' }],
              }}
            />
          ),
        }}
      />
    </Tabs>
  );
}
