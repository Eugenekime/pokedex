import { View, Text, StyleSheet } from 'react-native';
import { PokemonDetail } from '@/types/pokemon';
import useSettingStore from '@/store/settingStore';
import ProgressBar from './ProgressBar';
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
    },
    attributeName: {
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.514)',
      fontWeight: '500',
      width: '37%',
    },
    attributeContainerValue: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'flex-start',
    },
    attributeValue: { fontSize: 16, fontWeight: '500', width: 30 },
    bar: { flex: 0.95 },
  });

const TabStats = ({ data }: Props) => {
  const theme = useSettingStore((state) => state.theme);
  const styles = createStyles(theme);
  return (
    <View style={styles.wrapper}>
      <View style={styles.attributeContainer}>
        {data.stats.map((item) => (
          <View
            key={item.name}
            style={styles.attributeRow}
          >
            <Text style={styles.attributeName}>{`${item.name}:`}</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 6,
              }}
            >
              <Text style={styles.attributeValue}>{item.value}</Text>
              <View style={styles.bar}>
                <ProgressBar value={item.value} />
              </View>
            </View>
          </View>
        ))}
        <View style={{ width: '100%', height: 1, backgroundColor: 'grey' }} />
        <View style={styles.attributeRow}>
          <Text style={styles.attributeName}>Total</Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <Text style={styles.attributeValue}>
              {data.stats.reduce((acc, item) => acc + item.value, 0)}
            </Text>
            <View style={styles.bar}>
              <ProgressBar
                value={data.stats.reduce((acc, item) => acc + item.value, 0)}
                max={255 * 6}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TabStats;
