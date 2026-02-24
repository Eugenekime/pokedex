import { PokemonList } from '@/types/pokemon';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { getPokemonIdByUrl } from '@/api/pokemon';
import { useRouter } from 'expo-router';
import useSettingStore from '@/store/settingStore';
type pokemonItem = {
  item: PokemonList;
};
///themes
import { themes, ThemeType } from '@/theme/themes';

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    wrapper: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      elevation: 6,
    },
    bg: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 16,
      paddingLeft: 10,
      paddingRight: 20,
      backgroundColor: themes[theme].backgroundColor,
      borderWidth: 1,
      borderColor: '#cfcccc',
      overflow: 'hidden',
      minWidth: 260,
    },
    imgPokemon: {
      width: 60,
      height: 60,
    },
    namePokemon: {
      fontSize: 16,
      fontWeight: '600',
      marginLeft: 10,
      color: themes[theme].color,
    },
  });

const PokemonSearchItem = ({ item }: pokemonItem) => {
  const router = useRouter();
  const id = getPokemonIdByUrl(item.url);
  const theme = useSettingStore((state) => state.theme);
  const styles = createStyles(theme);
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/pokemon/[id]',
          params: { id: id.toString() },
        })
      }
      style={styles.wrapper}
    >
      <View style={styles.bg}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
          }}
          style={styles.imgPokemon}
        />
        <Text style={styles.namePokemon}>
          {item.name[0].toUpperCase() + item.name.slice(1)}
        </Text>
      </View>
    </Pressable>
  );
};

export default PokemonSearchItem;

const styles = StyleSheet.create({});
