import {
  View,
  Text,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { typeColors } from '@/styles/cardStyles';
import useStore from '@/store/store';
import useSettingStore from '@/store/settingStore';

///themes
import { themes, ThemeType } from '@/theme/themes';

type Props = {
  visible: boolean;
  onClose: () => void;
};
const createStyles = (theme: ThemeType) =>
  StyleSheet.create({
    filterContainer: {
      backgroundColor: 'rgba(0,0,0,0.2)',
      flex: 1,
      justifyContent: 'flex-start',
      borderRadius: 20,
    },

    filterWrapper: {
      height: 400,
      backgroundColor: themes[theme].backgroundColor,
      padding: 20,
      paddingTop: 20,
      gap: 20,
      borderBottomLeftRadius: 25,
      borderBottomRightRadius: 25,

      //IOS shadow
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 6,
      // Android shadow
      elevation: 6,
    },

    filterTitle: {
      fontSize: 36,
      fontWeight: '600',
      opacity: 0.7,
    },
  });

const FilterModal = ({ visible, onClose }: Props) => {
  const theme = useSettingStore((state) => state.theme);
  const styles = createStyles(theme);
  const setTypeForFilter = useStore((state) => state.setTypeForFilter);
  const pokemonTypes = [
    'normal',
    'fire',
    'water',
    'electric',
    'grass',
    'ice',
    'fighting',
    'poison',
    'ground',
    'flying',
    'psychic',
    'bug',
    'rock',
    'ghost',
    'dragon',
    'dark',
    'steel',
    'fairy',
  ];
  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
    >
      <Pressable
        onPress={onClose}
        style={styles.filterContainer}
      >
        <View style={styles.filterWrapper}>
          <View>
            <Text style={styles.filterTitle}>Choose type</Text>
          </View>
          <ScrollView
            style={{
              maxHeight: 250,
              paddingBottom: 8,
            }}
          >
            <View
              style={{
                flexDirection: 'row',
                gap: 10,
                flexWrap: 'wrap',
                justifyContent: 'center',
              }}
            >
              {pokemonTypes.map((type) => (
                <Pressable
                  onPress={() => setTypeForFilter(type)}
                  key={type}
                  style={{
                    padding: 8,
                    borderRadius: 20,
                    borderWidth: 1,
                    borderColor: 'grey',
                    backgroundColor: `${typeColors[type]}`,
                    width: 80,
                    alignItems: 'center',

                    //IOS shadow
                    shadowColor: '#000',
                    shadowOffset: { width: 0, height: 4 },
                    shadowOpacity: 0.2,
                    shadowRadius: 6,

                    // Android shadow
                    elevation: 6,
                  }}
                >
                  <Text
                    style={{
                      color: 'white',
                      fontSize: 17,
                      fontWeight: '600',
                    }}
                  >
                    {type}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>
          <Pressable
            onPress={() => setTypeForFilter(null)}
            style={{
              padding: 8,
              borderRadius: 20,
              borderWidth: 1,
              borderColor: 'grey',
              backgroundColor: `white`,
              width: 80,
              alignItems: 'center',

              //IOS shadow
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.2,
              shadowRadius: 6,

              // Android shadow
              elevation: 6,
            }}
          >
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                fontWeight: '600',
              }}
            >
              Clear
            </Text>
          </Pressable>
        </View>
      </Pressable>
    </Modal>
  );
};

export default FilterModal;
