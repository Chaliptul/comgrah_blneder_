import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function HistoryItem({ question, number }) {
  return (
    <View style={styles.item}>
      <Text style={styles.number}>
        {number}.
      </Text>
      <Text style={styles.question}>
        {question}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  item: {flexDirection: 'row',alignItems: 'center',backgroundColor: colors.surface,borderWidth: 1,
  borderColor: colors.border,borderRadius: 10,padding: 14, marginBottom: 8,},
  number: {color: colors.purple, fontSize: 15,fontWeight: '700',width: 28,},
  question: {flex: 1,color: colors.text,fontSize: 15,lineHeight: 21,},
});