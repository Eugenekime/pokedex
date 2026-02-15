import {
  View,
  FlatList,
  ActivityIndicator,
  Text,
  Pressable,
  Image,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { useEffect, useMemo, useState } from 'react';
/// types
import { PokemonList } from '@/types/pokemon';
///api
import { getPokemonList } from '@/api/pokemon';
import useStore from '@/store/store';
import useSettingStore from '@/store/settingStore';
///themes
import { darkTheme } from '@/theme/darkTheme';
import { lightTheme } from '@/theme/lightTheme';

/////Imported components
import PokemonCard from '@/components/PokemonCard';
import FilterModal from '@/components/FilterModal';
///styles
const createStyles = (theme: string) =>
  StyleSheet.create({
    loadingContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',

      backgroundColor:
        theme === 'light'
          ? lightTheme.colors.background
          : darkTheme.colors.background,
    },
    headerContainer: {
      paddingLeft: 12,
      paddingRight: 6,
      justifyContent: 'space-between',
      alignItems: 'center',
      flexDirection: 'row',
      backgroundColor: 'white',
      borderBottomLeftRadius: 6,
      borderBottomRightRadius: 6,
    },
    headerTitle: {
      fontSize: 42,
      fontWeight: '800',
      opacity: 0.7,
      textAlign: 'center',
    },
  });

export default function Home() {
  const tabBarHeight = useBottomTabBarHeight();

  /////Store
  const pokemons = useStore((state) => state.pokemons);
  const typeForFilter = useStore((state) => state.typeForFilter);
  const setPokemons = useStore((state) => state.setPokemons);
  const theme = useSettingStore((state) => state.theme);
  const favoriteList = useStore((state) => state.favoriteList);
  const isFavoritesFirst = useSettingStore((state) => state.isFavoritesFirst);

  /////Infinity scroll
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [initialLoading, setInitialLoading] = useState(true);
  const maxPokemon = 150;
  const limit = 20;
  /////Filter
  const [openFilter, setOpenFilter] = useState(false);

  const sortedPokemons = useMemo(() => {
    if (!isFavoritesFirst) return pokemons;

    return [...pokemons].sort((a, b) => {
      const aFav = favoriteList.includes(a.id);
      const bFav = favoriteList.includes(b.id);
      if (aFav === bFav) return 0;
      return aFav ? -1 : 1;
    });
  }, [pokemons, favoriteList, isFavoritesFirst]);

  const filteredPokemons = useMemo(
    () =>
      typeForFilter
        ? sortedPokemons.filter((pokemon) =>
            pokemon.types.some((t) => t.name === typeForFilter)
          )
        : sortedPokemons,
    [typeForFilter, sortedPokemons]
  );
  ///colors
  const styles = createStyles(theme);

  const loadPokemon = () => {
    if (loading) return;

    if (pokemons.length >= maxPokemon) return;

    setLoading(true);

    getPokemonList({ limit, offset: offset })
      .then((data) =>
        Promise.all(
          data.results.map((p: PokemonList) =>
            fetch(p.url).then((res) => res.json())
          )
        )
      )
      .then((details) => {
        setPokemons(details);
        setOffset((prev) => prev + limit);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        setInitialLoading(false);
      });
  };

  useEffect(() => {
    loadPokemon();
  }, []);

  if (initialLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          size="large"
          color={theme === 'light' ? 'black' : 'white'}
        />
      </View>
    );
  }

  return (
    <>
      <ImageBackground
        source={
          theme === 'light'
            ? require('@/assets/images/anime-style-clouds.jpg')
            : require('@/assets/images/anime-night-sky-illustration.jpg')
        }
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View
          style={[
            styles.headerContainer,
            {
              backgroundColor:
                theme === 'light'
                  ? lightTheme.colors.background
                  : darkTheme.colors.primary,
            },
          ]}
        >
          <Text style={styles.headerTitle}>Pokedex</Text>
          <Pressable
            style={{ padding: 10, paddingTop: 16 }}
            onPress={() => setOpenFilter(true)}
          >
            <Image
              source={require('@/assets/images/setting.png')}
              style={{
                width: 32,
                height: 32,
                opacity: 0.7,
              }}
            />
          </Pressable>
        </View>
        <FilterModal
          visible={openFilter}
          onClose={() => setOpenFilter(false)}
        />
        <FlatList
          data={filteredPokemons}
          key={typeForFilter ?? 'all'}
          keyExtractor={(item) => item.id.toString()}
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
          onEndReached={loadPokemon}
          onEndReachedThreshold={0.5}
          ListFooterComponent={
            loading ? <ActivityIndicator size="large" /> : null
          }
        />
      </ImageBackground>
    </>
  );
}
