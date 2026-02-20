import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { PokemonDetail } from '@/types/pokemon';
import useSettingStore from '@/store/settingStore';
type Props = {
  data: PokemonDetail;
};

const createStyles = (theme: string) =>
  StyleSheet.create({
    wrapper: {
      padding: 20,
      backgroundColor: 'white',
      height: '90%',
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%',
      marginVertical: 10,
    },
    column: {
      gap: 10,
      alignItems: 'center',
    },
  });

const TabEvolves = ({ data }: Props) => {
  const theme = useSettingStore((state) => state.theme);
  const styles = createStyles(theme);
  return (
    <View style={styles.wrapper}>
      <Text style={styles.title}>Evolution Chain</Text>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        {data.evolutions.map((item, index) => {
          const next = data.evolutions[index + 1];
          const lvlUp = next;
          if (!next) return null;

          return (
            <View
              style={styles.row}
              key={`${item.name}-${index}`}
            >
              <View style={styles.column}>
                <Image
                  source={{ uri: item.image }}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
                <Text>{item.name}</Text>
              </View>
              <View style={styles.column}>
                <Image
                  source={require('@/assets/images/level-up.png')}
                  style={{ width: 30, height: 30 }}
                />

                <Text>
                  {lvlUp && data.evolutions[index + 1].minLevel
                    ? `Lv. ${next.minLevel}`
                    : 'Special condition'}
                </Text>
              </View>
              <View style={styles.column}>
                <Image
                  source={{ uri: data.evolutions[index + 1].image }}
                  style={{ width: 80, height: 80 }}
                  resizeMode="contain"
                />
                <Text>{next.name}</Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};

export default TabEvolves;
