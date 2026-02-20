import { View, StyleSheet } from 'react-native';
type Props = {
  value: number;
  max?: number;
};

const styles = StyleSheet.create({
  container: {
    height: 4,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
    width: '60%',
  },
  fill: {
    height: '100%',
    backgroundColor: '#4CAF50',
  },
});

function getColor(value: number) {
  if (value < 50) return '#ff4d4d';
  if (value < 100) return '#ffa500';
  return '#4CAF50';
}

const ProgressBar = ({ value, max = 225 }: Props) => {
  const percent = (value / max) * 100;
  return (
    <View style={styles.container}>
      <View
        style={[
          styles.fill,
          { width: `${percent}%`, backgroundColor: getColor(value) },
        ]}
      />
    </View>
  );
};

export default ProgressBar;
