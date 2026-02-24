import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';

import { PokemonDetail, MoveDetailType } from '@/types/pokemon';
import useSettingStore from '@/store/settingStore';
import MoveDetail from './MoveDetail';
///themes
import { themes, ThemeType } from '@/theme/themes';

type Props = {
  data: PokemonDetail;
};

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: themes[theme].backgroundColor,
    },
    scroll: {
      padding: 10,
      gap: 20,
      paddingBottom: 110,
      alignItems: 'center',
    },
    btn: {
      width: '60%',
      padding: 8,
      borderRadius: 20,
      borderWidth: 1,
      borderColor: themes[theme].color,
      backgroundColor: themes[theme].backgroundColor,
      alignItems: 'center',
    },
    text: { fontSize: 18, fontWeight: '500', color: themes[theme].color },
  });

const TabMoves = ({ data }: Props) => {
  const theme = useSettingStore((state) => state.theme);
  const styles = createStyles(theme);
  const [selectedMove, setSelectedMove] = useState<string | null>(null);
  const [moveDetails, setMoveDetails] = useState<{
    [key: string]: MoveDetailType;
  }>({});

  const handleSelectedMove = async (move: { name: string; url: string }) => {
    if (!moveDetails[move.name]) {
      const res = await fetch(move.url);
      const data: MoveDetailType = await res.json();
      const formattedData = {
        ...data,
        name: data.name[0].toUpperCase() + data.name.slice(1),
        type: {
          ...data.type,
          name: data.type.name[0].toUpperCase() + data.type.name.slice(1),
        },
        damage_class: {
          ...data.damage_class,
          name:
            data.damage_class.name[0].toUpperCase() +
            data.damage_class.name.slice(1),
        },
      };

      setMoveDetails((prev) => ({
        ...prev,
        [move.name]: formattedData,
      }));
    }
    setSelectedMove(move.name);
  };
  const handleBack = async (name: string) => {
    setMoveDetails((prev) => {
      const { [name]: removed, ...rest } = prev;
      return rest;
    });
    setSelectedMove(null);
  };
  if (selectedMove) {
    return (
      <MoveDetail
        data={moveDetails[selectedMove]}
        onBack={() => handleBack(selectedMove)}
      />
    );
  }

  return (
    <View style={styles.wrapper}>
      <ScrollView contentContainerStyle={styles.scroll}>
        {data.moves.map((item, index) => (
          <Pressable
            key={`${item.name}-${index}`}
            style={({ pressed }) => [
              {
                opacity: pressed ? 0.7 : 1,
                transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
              },
              styles.btn,
            ]}
            onPress={() => handleSelectedMove(item)}
          >
            <Text style={styles.text}>{item.name}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default TabMoves;
