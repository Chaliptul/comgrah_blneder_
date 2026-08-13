```js
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme';

export default function HistoryItem({ question, number }) {
  return (
    <View style={styles.container}>

      <Text style={styles.number}>
        #{number}
      </Text>

      <Text style={styles.question}>
        {question}
      </Text>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 14,
    marginBottom: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  number: {
    width: 45,
    color: colors.purple,
    fontSize: 16,
    fontWeight: '700',
  },

  question: {
    flex: 1,
    color: colors.text,
    fontSize: 16,
    lineHeight: 24,
  },
});
```
