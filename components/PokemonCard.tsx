import { Text, View, Image, Pressable, StyleSheet } from 'react-native';
import { useState } from 'react';
import { PokemonDetails, Pokemons } from '@/types/pokemon';
import Icon from 'react-native-vector-icons/FontAwesome';
import useStore from '@/store/store';

import { typeColors } from '@/styles/cardStyles';
import { useRouter } from 'expo-router';

import { addToList, getList, removeItem } from '@/store/asyncStorage';

type PokemonCardProps = {
  data: Pokemons;
};

const PokemonCard = ({ data }: PokemonCardProps) => {
  const router = useRouter();

  const setFavoriteList = useStore((state) => state.setFavoriteList);
  const favoriteList = useStore((state) => state.favoriteList);
  const isLike = favoriteList.some((item) => item === data.id);

  const handleFavoriteButton = async (pokemon: Pokemons) => {
    const list = await getList('favorite');
    const exists = list.includes(pokemon.id);

    let newList = [];

    if (exists) {
      newList = await removeItem({ key: 'favorite', id: pokemon.id });
    } else {
      newList = await addToList({ key: 'favorite', id: pokemon.id });
    }

    setFavoriteList(newList);
  };

  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/pokemon/[id]',
          params: { id: data.id.toString() },
        })
      }
      style={({ pressed }) => [
        {
          backgroundColor: typeColors[data.types[0].name],
          opacity: pressed ? 0.7 : 1,
          transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
        },
        styles.cardContainer,
      ]}
    >
      <View style={styles.topContainer}>
        <View style={styles.idWrapper}>
          <Text style={styles.idText}>#{data.id}</Text>
        </View>
        <Pressable
          onPress={() => handleFavoriteButton(data)}
          style={styles.favoriteWrapper}
        >
          <Icon
            name="heart"
            size={20}
            color={isLike ? 'red' : 'white'}
          />
        </Pressable>
      </View>
      <Image
        source={require('../assets/images/gameBg.png')}
        style={styles.cardBGPicture}
      />
      <Image
        source={{
          uri: data.img,
        }}
        style={styles.pokemonPicture}
      />
      <View style={styles.cardDescription}>
        <Text style={styles.pokemonName}>
          {data.name[0].toUpperCase() + data.name.slice(1)}
        </Text>
        <View style={styles.bottomContainer}>
          {data.types.map((t) => (
            <View
              key={t.name}
              style={styles.typeWrapper}
            >
              <Text style={styles.typeName}>{t.name}</Text>
            </View>
          ))}
        </View>
      </View>
    </Pressable>
  );
};

export default PokemonCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '48%',
    height: 280,
    borderRadius: 20,
    overflow: 'hidden',
    //IOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,

    // Android shadow
    elevation: 6,
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  idWrapper: {
    padding: 8,
    paddingLeft: 8,
    alignSelf: 'center',
  },

  idText: {
    color: '#fcfcfc',
    fontSize: 14,
    fontWeight: '500',
  },
  favoriteWrapper: {
    padding: 8,
    paddingRight: 8,
    alignSelf: 'center',
    zIndex: 1,
  },

  cardBGPicture: {
    position: 'absolute',
    width: 180,
    height: 180,
    right: -10,
    top: 5,
    transform: [{ rotate: '15deg' }],
    opacity: 0.1,
  },

  pokemonPicture: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    backgroundColor: 'transparent',
    borderRadius: 20,
  },
  cardDescription: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 8,
  },
  pokemonName: {
    fontSize: 20,
    fontWeight: '500',
    color: 'white',
    marginBottom: 10,
  },
  bottomContainer: {
    flex: 1,
    height: '100%',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  typeWrapper: {
    padding: 5,
    paddingLeft: 14,
    paddingRight: 14,
    borderRadius: 50,
    backgroundColor: 'rgba(255, 255, 255, 0.278)',
    alignSelf: 'center',
  },
  typeName: {
    color: '#fcfcfc',
    fontSize: 12,
    fontWeight: '500',
  },
});
