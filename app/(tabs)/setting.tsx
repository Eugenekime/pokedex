import {
  Text,
  View,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Pressable,
  PressableStateCallbackType,
} from 'react-native';
import useSettingStore from '@/store/settingStore';
import { darkTheme } from '@/theme/darkTheme';

const styles = StyleSheet.create({
  header: { padding: 8 },
  headerTitle: {
    fontSize: 42,
    fontWeight: '800',
    opacity: 0.7,
  },
  contentContainer: {
    margin: 8,
    padding: 16,
    borderRadius: 16,
    backgroundColor: 'white',
    //IOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    // Android shadow
    elevation: 6,
  },

  section: {
    padding: 8,
    marginBottom: 12,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonsWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 15,
    alignItems: 'center',
  },

  button: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 75,
    height: 30,
    borderRadius: 16,
    borderWidth: 1,
    //IOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    // Android shadow
    elevation: 6,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: 500,
  },
});

export default function Third() {
  const theme = useSettingStore((state) => state.theme);
  const setTheme = useSettingStore((state) => state.setTheme);
  const isFavoritesFirst = useSettingStore((state) => state.isFavoritesFirst);
  const setIsfavoriteFirst = useSettingStore(
    (state) => state.setIsFavoritesFirst
  );

  const pressedEffect = (state: PressableStateCallbackType) => ({
    opacity: state.pressed ? 0.7 : 1,
    transform: state.pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
  });
  return (
    <ImageBackground
      style={{ flex: 1 }}
      source={
        theme === 'light'
          ? require('@/assets/images/anime-style-clouds.jpg')
          : require('@/assets/images/anime-night-sky-illustration.jpg')
      }
    >
      <View style={styles.header}>
        <Text
          style={[
            styles.headerTitle,
            { color: theme === 'light' ? 'white' : 'black' },
          ]}
        >
          Settings
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={[
          styles.contentContainer,
          {
            backgroundColor:
              theme === 'light' ? 'white' : darkTheme.colors.primary,
          },
        ]}
      >
        <View style={styles.section}>
          <Text style={styles.title}>Theme</Text>
          <View style={styles.buttonsWrapper}>
            <Pressable
              style={(state) => [
                styles.button,
                pressedEffect(state),
                {
                  backgroundColor: theme === 'light' ? '#F26076' : '#BFC6C4',
                },
              ]}
              onPress={() => setTheme('light')}
            >
              <Text style={styles.buttonText}>light</Text>
            </Pressable>
            <Pressable
              style={(state) => [
                styles.button,
                pressedEffect(state),
                {
                  backgroundColor: theme === 'light' ? '#BFC6C4' : '#F26076',
                },
              ]}
              onPress={() => setTheme('dark')}
            >
              <Text style={styles.buttonText}>Dark</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>Favorite first</Text>
          <View style={styles.buttonsWrapper}>
            <Pressable
              style={(state) => [
                styles.button,
                pressedEffect(state),
                {
                  backgroundColor:
                    isFavoritesFirst === true ? '#F26076' : '#BFC6C4',
                },
              ]}
              onPress={() => setIsfavoriteFirst(true)}
            >
              <Text style={styles.buttonText}>on</Text>
            </Pressable>
            <Pressable
              style={(state) => [
                styles.button,
                pressedEffect(state),
                {
                  backgroundColor:
                    isFavoritesFirst === true ? '#BFC6C4' : '#F26076',
                },
              ]}
              onPress={() => setIsfavoriteFirst(false)}
            >
              <Text style={styles.buttonText}>off</Text>
            </Pressable>
          </View>
        </View>
        <View style={styles.section}>
          <Text style={styles.title}>
            Edit app/index.tsx to edit this screen.
          </Text>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}
