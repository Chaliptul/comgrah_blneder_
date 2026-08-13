import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';

import { QUESTIONS } from '../data';
import { colors } from '../theme';
import HistoryItem from '../components/HistoryItem';

// ========== หน้าหลัก ==========
export default function MainScreen() {

  // TODO 1: สร้าง state
  // current = คำถามที่แสดงตอนนี้
  // history = array คำถามที่สุ่มมาแล้ว
  const [current, setCurrent] = useState('');
  const [history, setHistory] = useState([]);

  // TODO 2: ฟังก์ชัน pickRandom()
  const pickRandom = () => {
    let randomQuestion;

    do {
      const randomIndex = Math.floor(
        Math.random() * QUESTIONS.length
      );

      randomQuestion = QUESTIONS[randomIndex];

    } while (
      QUESTIONS.length > 1 &&
      randomQuestion === current
    );

    // เปลี่ยนคำถามปัจจุบัน
    setCurrent(randomQuestion);

    // เพิ่มคำถามใหม่ไว้ด้านบน
    // โดยสร้าง array ใหม่เสมอ
    setHistory((prev) => [
      randomQuestion,
      ...prev,
    ]);
  };

  // TODO 3: สุ่มคำถามแรกอัตโนมัติ
  useEffect(() => {
    pickRandom();
  }, []);

  return (
    <View style={styles.container}>

      {/* TODO 4: แสดง current */}
      <View style={styles.questionBox}>
        <Text style={styles.label}>
          คำถามปัจจุบัน
        </Text>

        <Text style={styles.current}>
          {current}
        </Text>
      </View>

      {/* TODO 5: ปุ่มสุ่มใหม่ */}
      <TouchableOpacity
        style={styles.button}
        onPress={pickRandom}
      >
        <Text style={styles.buttonText}>
          สุ่มใหม่
        </Text>
      </TouchableOpacity>

      {/* หัวข้อประวัติ */}
      <View style={styles.historyHeader}>
        <Text style={styles.historyTitle}>
          ประวัติการสุ่ม
        </Text>

        <Text style={styles.count}>
          สุ่มมาแล้ว {history.length} ครั้ง
        </Text>
      </View>

      {/* TODO 6: FlatList แสดง history */}
      <FlatList
        data={history}
        keyExtractor={(item, index) =>
          `${item}-${index}`
        }
        renderItem={({ item, index }) => (
          <HistoryItem
            question={item}
            number={history.length - index}
          />
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.list}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  questionBox: {
    minHeight: 180,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    marginTop: 20,
    marginBottom: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
  },

  label: {
    color: colors.muted,
    fontSize: 14,
    marginBottom: 15,
  },

  current: {
    color: colors.text,
    fontSize: 24,
    fontWeight: '700',
    textAlign: 'center',
    lineHeight: 34,
  },

  button: {
    backgroundColor: colors.purple,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 24,
  },

  buttonText: {
    color: colors.bg,
    fontSize: 18,
    fontWeight: '700',
  },

  historyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },

  historyTitle: {
    color: colors.cyan,
    fontSize: 20,
    fontWeight: '700',
  },

  count: {
    color: colors.muted,
    fontSize: 14,
  },

  list: {
    paddingBottom: 20,
  },
});

