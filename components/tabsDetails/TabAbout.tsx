import { View, Text, StyleSheet } from 'react-native';
import { PokemonDetail } from '@/types/pokemon';
import useSettingStore from '@/store/settingStore';
type Props = {
  data: PokemonDetail;
};

const createStyles = (theme: string) =>
  StyleSheet.create({
    wrapper: {
      backgroundColor: 'white',
      padding: 8,
      height: '100%',
    },
    attributeContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 8,
      paddingTop: 20,
      paddingBottom: 20,
      gap: 12,
    },
    attributeRow: {
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'center',
      gap: 40,
    },
    attributeName: {
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.514)',
      fontWeight: '500',
      width: '20%',
    },
    attributeContainerValue: {
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    attributeValue: { fontSize: 16, fontWeight: '500' },
    descContainer: {
      gap: 10,
    },
    descTitle: {
      fontSize: 18,
      fontWeight: '500',
      textAlign: 'center',
      color: 'rgba(0, 0, 0, 0.514)',
    },
    descContainerText: {
      paddingHorizontal: 16,
      width: '100%',
    },
    descText: {
      fontSize: 14,
      lineHeight: 22,
      color: '#444',
      textAlign: 'justify',
    },
  });

const TabAbout = ({ data }: Props) => {
  const theme = useSettingStore((state) => state.theme);
  const style = createStyles(theme);
  return (
    <View style={style.wrapper}>
      <View style={style.attributeContainer}>
        <View style={style.attributeRow}>
          <Text style={style.attributeName}>Species:</Text>
          <Text style={style.attributeValue}>{data.genus}</Text>
        </View>
        <View style={style.attributeRow}>
          <Text style={style.attributeName}>Height:</Text>
          <Text style={style.attributeValue}>{data.height} m</Text>
        </View>
        <View style={style.attributeRow}>
          <Text style={style.attributeName}>Weight:</Text>
          <Text style={style.attributeValue}>{data.weight} kg</Text>
        </View>
        <View style={style.attributeRow}>
          <Text style={style.attributeName}>Habitat:</Text>
          <Text style={style.attributeValue}>{data.habitat}</Text>
        </View>
        <View style={style.attributeRow}>
          <Text style={style.attributeName}>Egg groups:</Text>
          <View style={style.attributeContainerValue}>
            {data.eggGroups.map((item) => (
              <Text
                key={item}
                style={style.attributeValue}
              >
                {item}
              </Text>
            ))}
          </View>
        </View>
        <View style={style.attributeRow}>
          <Text style={style.attributeName}>Abilities:</Text>
          <View style={style.attributeContainerValue}>
            {data.abilities.map((ablts) => (
              <Text
                key={ablts.name}
                style={style.attributeValue}
              >
                {ablts.name}
              </Text>
            ))}
          </View>
        </View>
      </View>
      <View style={style.descContainer}>
        <Text style={style.descTitle}>Description</Text>
        <View style={style.descContainerText}>
          <Text style={style.descText}>{data.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default TabAbout;
