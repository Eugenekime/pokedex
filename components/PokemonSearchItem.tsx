import { PokemonList } from '@/types/pokemon';
import { View, Text, StyleSheet, Image, Pressable } from 'react-native';
import { getPokemonIdByUrl } from '@/api/pokemon';
type pokemonItem = {
  item: PokemonList;
};

const PokemonSearchItem = ({ item }: pokemonItem) => {
  return (
    <Pressable style={styles.wrapper}>
      <View style={styles.bg}>
        <Image
          source={{
            uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${getPokemonIdByUrl(item.url)}.png`,
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

const styles = StyleSheet.create({
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
    backgroundColor: 'rgba(255,255,255,0.85)',
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
  },
});
