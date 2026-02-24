import {
  ImageBackground,
  View,
  StyleSheet,
  TextInput,
  FlatList,
  Image,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useState, useMemo, useEffect } from 'react';

///store
import useStore from '@/store/store';
import useSettingStore from '@/store/settingStore';
///api
import { getAllPokemons } from '@/api/pokemon';
///components
import PokemonSearchItem from '@/components/PokemonSearchItem';
///themes
import { themes, ThemeType } from '@/theme/themes';
///styles
const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      padding: 20,
      paddingTop: 50,
    },
    containerSearch: {
      width: 320,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: themes[theme].backgroundColor,
      borderRadius: 30,
      paddingHorizontal: 15,
      height: 60,
      overflow: 'hidden',
      opacity: 0.5,
    },
    searchIcon: {
      width: 25,
      height: 25,
      marginRight: 10,
    },
    input: {
      flex: 1,
      fontSize: 18,
      paddingRight: 20,
      textAlignVertical: 'center',
      color: themes[theme].color,
    },
  });

export default function Search() {
  const pokemonSearchList = useStore((state) => state.pokemonSearchList);
  const setPokemonSearchList = useStore((state) => state.setPokemonSearchList);
  const theme = useSettingStore((state) => state.theme);
  const [text, setText] = useState('');
  const tabBarHeight = useBottomTabBarHeight();

  const styles = createStyles(theme);

  useEffect(() => {
    const fetchPokemons = async () => {
      try {
        const data = await getAllPokemons();
        setPokemonSearchList(data.results);
      } catch (err) {
        console.error(err);
      }
    };

    fetchPokemons();
  }, []);

  const searchByLetter = useMemo(() => {
    return pokemonSearchList.filter((p) =>
      p.name.toLowerCase().startsWith(text.toLowerCase())
    );
  }, [text, pokemonSearchList]);
  return (
    <>
      <ImageBackground
        source={
          theme === 'light'
            ? require('@/assets/images/anime-rainbow-landscape.jpg')
            : require('@/assets/images/night-style-clouds.jpg')
        }
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.container}>
          <View style={styles.containerSearch}>
            <Image
              source={require('@/assets/images/magnifying-glass.png')}
              style={styles.searchIcon}
            />
            <TextInput
              numberOfLines={1}
              placeholderTextColor="#fff"
              placeholder="Find pokemon"
              autoCorrect={false}
              autoCapitalize="none"
              returnKeyType="search"
              style={styles.input}
              value={text}
              onChangeText={setText}
            />
          </View>
          <FlatList
            data={text ? searchByLetter : []}
            keyExtractor={(item) => item.name}
            style={{ flex: 1 }}
            contentContainerStyle={{
              gap: 20,
              padding: 10,
              paddingBottom: tabBarHeight,
            }}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => <PokemonSearchItem item={item} />}
          />
        </View>
      </ImageBackground>
    </>
  );
}
