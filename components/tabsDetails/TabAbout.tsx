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
      gap: 30,
    },
    attributeName: {
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.514)',
      fontWeight: '500',
      width: '20%',
    },
    attributeContainerValue: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    attributeValue: {
      fontSize: 16,
      fontWeight: '500',
      flexWrap: 'wrap',
    },
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
  const styles = createStyles(theme);
  return (
    <View style={styles.wrapper}>
      <View style={styles.attributeContainer}>
        <View style={styles.attributeRow}>
          <Text style={styles.attributeName}>Species:</Text>
          <Text style={styles.attributeValue}>{data.genus}</Text>
        </View>
        <View style={styles.attributeRow}>
          <Text style={styles.attributeName}>Height:</Text>
          <Text style={styles.attributeValue}>{data.height} m</Text>
        </View>
        <View style={styles.attributeRow}>
          <Text style={styles.attributeName}>Weight:</Text>
          <Text style={styles.attributeValue}>{data.weight} kg</Text>
        </View>
        <View style={styles.attributeRow}>
          <Text style={styles.attributeName}>Habitat:</Text>
          <Text style={styles.attributeValue}>{data.habitat}</Text>
        </View>
        <View style={styles.attributeRow}>
          <Text style={styles.attributeName}>Egg groups:</Text>
          <View style={styles.attributeContainerValue}>
            <Text style={styles.attributeValue}>
              {data.eggGroups.join(`, `)}
            </Text>
          </View>
        </View>
        <View style={styles.attributeRow}>
          <Text style={styles.attributeName}>Abilities:</Text>
          <View style={styles.attributeContainerValue}>
            <Text style={styles.attributeValue}>
              {data.abilities
                .map((a) => (a.isHidden ? a.name + '*' : a.name))
                .join(`, `)}
            </Text>
          </View>
        </View>
      </View>
      <View style={styles.descContainer}>
        <Text style={styles.descTitle}>Description</Text>
        <View style={styles.descContainerText}>
          <Text style={styles.descText}>{data.description}</Text>
        </View>
      </View>
    </View>
  );
};

export default TabAbout;
