import {
  View,
  Text,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { MoveDetailType } from '@/types/pokemon';
import useSettingStore from '@/store/settingStore';
type Props = {
  data?: MoveDetailType;
  onBack: () => void;
};
///themes
import { themes, ThemeType } from '@/theme/themes';

const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    loadingContainer: {
      width: '100%',
      height: '90%',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: themes[theme].backgroundColor,
    },
    wrapper: {
      padding: 16,
      backgroundColor: themes[theme].backgroundColor,
      height: '100%',
    },
    btnBackWrapper: {
      padding: 10,
      paddingHorizontal: 15,
      borderRadius: 12,
      borderWidth: 1,
      alignSelf: 'flex-start',
      backgroundColor: '#E62727',
    },
    btnBackText: {
      fontSize: 16,
      fontWeight: '500',
      color: 'white',
    },
    wrapperTitle: {
      alignItems: 'center',
      padding: 16,
    },
    title: { fontSize: 24, fontWeight: '600', color: themes[theme].color },
    textName: {
      fontSize: 16,
      color: 'rgba(0, 0, 0, 0.514)',
      fontWeight: '500',
      width: 100,
    },

    textValue: {
      fontSize: 16,
      fontWeight: '500',
      flex: 1,
      color: themes[theme].color,
    },

    bottomContainer: {
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 8,
      paddingTop: 20,
      paddingBottom: 20,
      gap: 12,
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
    },
  });

const MoveDetail = ({ data, onBack }: Props) => {
  const theme = useSettingStore((state) => state.theme);
  const styles = createStyles(theme);
  if (!data) {
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
    <View style={styles.wrapper}>
      <Pressable
        onPress={() => onBack()}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.7 : 1,
            transform: pressed ? [{ scale: 0.97 }] : [{ scale: 1 }],
          },
          styles.btnBackWrapper,
        ]}
      >
        <Text style={styles.btnBackText}>Back</Text>
      </Pressable>
      <View style={styles.wrapperTitle}>
        <Text style={styles.title}>{data?.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textName}>Type:</Text>
        <Text style={styles.textValue}>{data.type.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.textName}>Class:</Text>
        <Text style={styles.textValue}>{data.damage_class.name}</Text>
      </View>
      <View
        style={{
          width: '100%',
          height: 1,
          backgroundColor: 'grey',
          marginBottom: 20,
          marginTop: 20,
        }}
      />
      <View style={styles.bottomContainer}>
        <View style={styles.row}>
          <Text style={styles.textName}>Power:</Text>
          <Text style={styles.textValue}>{data.power ?? `---`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textName}>Accuracy:</Text>
          <Text style={styles.textValue}>{data.accuracy ?? `---`}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.textName}>PP:</Text>
          <Text style={styles.textValue}>{data.pp ?? `---`}</Text>
        </View>
      </View>
    </View>
  );
};

export default MoveDetail;
