import { useState, useEffect } from 'react';
import {View,Text,TouchableOpacity,FlatList,StyleSheet,} from 'react-native';
import { QUESTIONS } from '../data';
import { colors } from '../theme';
import HistoryItem from '../components/HistoryItem';

export default function MainScreen() {
  const [current, setCurrent] = useState('');
  const [history, setHistory] = useState([]);
  const [count, setCount] = useState(0);

  const pickRandom = () => {
    let question;

    do {
      question =
        QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
    } while (question === current && QUESTIONS.length > 1);

    setCurrent(question);
    setHistory(prev => [question, ...prev]);
    setCount(prev => prev + 1);
  };

  const clearHistory = () => {
    setHistory([]);
    setCount(0);
  };

  useEffect(() => {
    pickRandom();
  }, []);

  return (
    <View style={styles.container}>

      <View style={styles.questionCard}>
        <View style={styles.topRow}>
          <View>
            <Text style={styles.label}>QUESTION</Text>
            <Text style={styles.subtitle}>คำถามชวนคุย</Text>
          </View>

          <Text style={styles.badge}>#{count}</Text>
        </View>

        <View style={styles.divider} />

        <Text style={styles.current}>{current}</Text>
      </View>

      <TouchableOpacity
        style={styles.randomButton}
        onPress={pickRandom}
      >
        <Text style={styles.randomText}>↻  สุ่มคำถามใหม่</Text>
      </TouchableOpacity>

      <View style={styles.historyHeader}>
        <View>
          <Text style={styles.historyTitle}>ประวัติการสุ่ม</Text>
          <Text style={styles.subtitle}>ทั้งหมด {count} คำถาม</Text>
        </View>

        <TouchableOpacity
          style={styles.clearButton}
          onPress={clearHistory}
        >
          <Text style={styles.clearText}>ล้าง</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={history}
        keyExtractor={(item, index) => `${item}-${index}`}
        renderItem={({ item, index }) => (
          <HistoryItem
            question={item}
            number={history.length - index}
          />
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {flex: 1,padding: 18,backgroundColor: colors.bg,},
  questionCard: {backgroundColor: colors.surface,borderWidth: 1,
  borderColor: colors.border,borderRadius: 20,padding: 22,
  minHeight: 220,marginBottom: 16,},
  topRow: {flexDirection: 'row',justifyContent: 'space-between', alignItems: 'center',},
  label: {color: colors.cyan,fontSize: 12,fontWeight: '800',letterSpacing: 2,},
  subtitle: {color: colors.muted,fontSize: 13, marginTop: 4, },
  badge: {color: colors.purple,backgroundColor: colors.border,paddingHorizontal: 11,
  paddingVertical: 6,borderRadius: 20,fontWeight: '800',},
  divider: {height: 1,backgroundColor: colors.border,marginVertical: 20,},
  current: {color: colors.text,fontSize: 25,fontWeight: '700',lineHeight: 36,},
  randomButton: {backgroundColor: colors.green,paddingVertical: 15,borderRadius: 14,
  alignItems: 'center',marginBottom: 22,},
  randomText: {color: colors.bg,fontSize: 17,fontWeight: '800',},
  historyHeader: {flexDirection: 'row',justifyContent: 'space-between',
  alignItems: 'center',marginBottom: 12,},
  historyTitle: {color: colors.text,fontSize: 20,fontWeight: '800',},
  clearButton: {borderWidth: 1,borderColor: colors.border,borderRadius: 10,
  paddingHorizontal: 15,paddingVertical: 8,},
  clearText: {color: colors.muted,fontWeight: '700',},
});