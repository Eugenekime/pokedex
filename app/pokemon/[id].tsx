import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { getPokemonDetails } from '@/api/pokemon';
import useStore from '@/store/store';
import useSettingStore from '@/store/settingStore';
import { typeColors } from '@/styles/cardStyles';
import TabStats from '@/components/tabsDetails/TabStats';
import TabAbout from '@/components/tabsDetails/TabAbout';

const createStyles = (theme: string) =>
  StyleSheet.create({
    wrapper: {
      height: '70%',
    },
    headerContainer: {
      margin: 8,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    headerTitle: {
      fontSize: 36,
      fontWeight: '600',
      color: 'white',
    },
    headerTypesContainer: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 10,
    },
    headerTypesWrapper: {
      padding: 5,
      paddingLeft: 14,
      paddingRight: 14,
      borderRadius: 50,
      backgroundColor: 'rgba(255, 255, 255, 0.278)',
      alignSelf: 'center',
    },
    headerType: {
      color: '#fcfcfc',
      fontSize: 12,
      fontWeight: '500',
    },
    headerId: {
      fontSize: 24,
      fontWeight: '600',
      color: 'white',
    },
    imgWrapper: {
      justifyContent: 'center',
      alignItems: 'center',
    },
    img: {
      width: 170,
      height: 170,
    },
    tabsWrapper: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
    tabsText: {
      fontSize: 16,
      fontWeight: '500',
      letterSpacing: 0.1,
      color: 'rgba(0, 0, 0, 0.415)',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      padding: 10,
      backgroundColor: 'transparent',
    },
  });

const PokemonDetailScreen = () => {
  const theme = useSettingStore((state) => state.theme);
  const style = createStyles(theme);
  const { id } = useLocalSearchParams();
  const pokemonId = Number(Array.isArray(id) ? id[0] : id);
  const pokemonDetails = useStore((state) => state.pokemonDetails[pokemonId]);
  const setPokemonDetails = useStore((state) => state.setPokemonDetail);
  const [tab, setTab] = useState('about');

  useEffect(() => {
    if (!pokemonDetails) {
      getPokemonDetails(pokemonId).then((data) =>
        setPokemonDetails(data.id, data)
      );
    }
  }, [pokemonId]);

  if (!pokemonDetails) {
    return (
      <ActivityIndicator
        size={40}
        color={'black'}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}
      />
    );
  }
  return (
    <View
      style={[
        style.wrapper,
        { backgroundColor: typeColors[pokemonDetails.types[0]] },
      ]}
    >
      <View style={style.headerContainer}>
        <View style={{ gap: 4 }}>
          <Text style={style.headerTitle}>
            {pokemonDetails.name[0].toUpperCase() +
              pokemonDetails.name.slice(1)}
          </Text>
          <View style={style.headerTypesContainer}>
            {pokemonDetails.types.map((t) => (
              <View
                key={t}
                style={style.headerTypesWrapper}
              >
                <Text style={style.headerType}>
                  {t[0].toUpperCase() + t.slice(1)}
                </Text>
              </View>
            ))}
          </View>
        </View>
        <Text style={style.headerId}>#{pokemonDetails.id}</Text>
      </View>
      <View style={style.imgWrapper}>
        <Image
          source={{ uri: pokemonDetails.image }}
          style={style.img}
        />
      </View>
      <View style={style.tabsWrapper}>
        <Pressable onPress={() => setTab('about')}>
          <Text
            style={[
              style.tabsText,
              {
                color: tab === 'about' ? 'black' : style.tabsText.color,
                fontSize: tab === 'about' ? 18 : style.tabsText.fontSize,
                backgroundColor:
                  tab === 'about' ? 'white' : style.tabsText.backgroundColor,
              },
            ]}
          >
            About
          </Text>
        </Pressable>
        <Pressable onPress={() => setTab('stats')}>
          <Text
            style={[
              style.tabsText,
              {
                color: tab === 'stats' ? 'black' : style.tabsText.color,
                fontSize: tab === 'stats' ? 18 : style.tabsText.fontSize,
                backgroundColor:
                  tab === 'stats' ? 'white' : style.tabsText.backgroundColor,
              },
            ]}
          >
            Base Stats
          </Text>
        </Pressable>
        <Pressable onPress={() => setTab('evolve')}>
          <Text
            style={[
              style.tabsText,
              {
                color: tab === 'evolve' ? 'black' : style.tabsText.color,
                fontSize: tab === 'evolve' ? 18 : style.tabsText.fontSize,
                backgroundColor:
                  tab === 'evolve' ? 'white' : style.tabsText.backgroundColor,
              },
            ]}
          >
            Evolution
          </Text>
        </Pressable>
        <Pressable onPress={() => setTab('ables')}>
          <Text
            style={[
              style.tabsText,
              {
                color: tab === 'ables' ? 'black' : style.tabsText.color,
                fontSize: tab === 'ables' ? 18 : style.tabsText.fontSize,
                backgroundColor:
                  tab === 'ables' ? 'white' : style.tabsText.backgroundColor,
              },
            ]}
          >
            Abilities
          </Text>
        </Pressable>
      </View>
      <View>
        {(tab === 'stats' && <TabStats data={pokemonDetails} />) ||
          (tab === 'about' && <TabAbout data={pokemonDetails} />)}
      </View>
    </View>
  );
};

export default PokemonDetailScreen;
