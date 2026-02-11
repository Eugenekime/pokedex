import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  FlatList,
} from 'react-native';
import { PokemonDetails, Pokemons } from '@/types/pokemon';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEffect } from 'react';
import useStore from '@/store/store';
import useSettingStore from '@/store/settingStore';
import PokemonCard from '@/components/PokemonCard';
import { getList } from '@/store/asyncStorage';
import { darkTheme } from '@/theme/darkTheme';
import { lightTheme } from '@/theme/lightTheme';

const createStyles = (theme: string) =>
  StyleSheet.create({
    headerContainer: {
      paddingBottom: 2,
      paddingLeft: 12,
      paddingRight: 6,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor:
        theme === 'light'
          ? lightTheme.colors.background
          : darkTheme.colors.primary,
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
    },
    headerTitle: {
      fontSize: 42,
      fontWeight: '800',
      opacity: 0.7,
      textAlign: 'center',
    },
    emptyContainer: {
      flex: 1,
      marginTop: 10,
      padding: 20,
      maxWidth: 320,
    },
    emptyText: {
      fontSize: 48,
      fontWeight: 900,
      opacity: 0.5,
    },
    emptySmallText: {
      marginTop: 10,
      fontSize: 24,
      fontWeight: 600,
      opacity: 0.6,
    },
  });

export default function Favorite() {
  const tabBarHeight = useBottomTabBarHeight();
  const pokemons = useStore((state) => state.pokemons);
  const favoriteList = useStore((state) => state.favoriteList);
  const setFavoriteList = useStore((state) => state.setFavoriteList);
  const theme = useSettingStore((state) => state.theme);

  const styles = createStyles(theme);

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const list = await getList('favorite');
        setFavoriteList(list);
      } catch (err) {
        console.log(err);
      }
    };

    fetchFavorites();
  }, []);

  const formattedPokemons = pokemons.filter((obj) =>
    favoriteList.includes(obj.id)
  );
  return (
    <>
      <ImageBackground
        source={
          theme === 'light'
            ? require('@/assets/images/anime-style-clouds.jpg')
            : require('@/assets/images/anime-night-sky-illustration2.jpg')
        }
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View style={styles.headerContainer}>
          <Text style={styles.headerTitle}>My favorites</Text>
        </View>
        {favoriteList[0] ? null : (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>Your favorites list is empty</Text>
            <Text style={styles.emptySmallText}>
              Add Pokémon to favorites by tapping the ❤️ icon.
            </Text>
          </View>
        )}

        <FlatList
          data={formattedPokemons}
          keyExtractor={(item: Pokemons) => item.id.toString()}
          style={{ flex: 1 }}
          contentContainerStyle={{
            padding: 12,
            gap: 14,
            paddingBottom: tabBarHeight + 12,
          }}
          numColumns={2}
          columnWrapperStyle={{
            justifyContent: 'space-around',
            gap: 14,
          }}
          renderItem={({ item }) => {
            return <PokemonCard data={item} />;
          }}
          onEndReachedThreshold={0.5}
        />
      </ImageBackground>
    </>
  );
}
