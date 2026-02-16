import { View, Text, StyleSheet } from 'react-native';
import { PokemonDetail } from '@/types/pokemon';
type Props = {
  data: PokemonDetail;
};

const TabStats = ({ data }: Props) => {
  return (
    <View style={{ backgroundColor: 'white' }}>
      <Text>tabStats</Text>
    </View>
  );
};

export default TabStats;
