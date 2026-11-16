import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

export default function SkillBadge({ item }) {
  if (!item) return null;

  // Logika Deteksi: Teknis vs Bahasa / Travel
  const isLanguage = 
    item.nama.toLowerCase().includes('english') || 
    item.nama.toLowerCase().includes('bahasa') ||
    item.nama.toLowerCase().includes('ielts');

  const iconName = isLanguage ? 'earth' : 'star-four-points';
  const iconColor = isLanguage ? '#10B981' : '#3B82F6';
  const bgColor = isLanguage ? '#D1FAE5' : '#DBEAFE';
  const borderColor = isLanguage ? '#ECFDF5' : '#EFF6FF';

  return (
    <View style={[styles.bubblyCard, { borderColor: borderColor }]}>
      <View style={styles.leftSide}>
        <View style={[styles.iconCircle, { backgroundColor: bgColor }]}>
          <MaterialCommunityIcons name={iconName} size={20} color={iconColor} />
        </View>
        
        <View style={styles.textContainer}>
          <Text style={styles.skillName}>{item.nama}</Text>
          <Text style={styles.aestheticSub}>
            {isLanguage ? '🌍 Global Communication' : '💻 Technical Mastery'}
          </Text>
        </View>
      </View>

      <View style={styles.rightSide}>
        <View style={styles.levelPill}>
          <Text style={styles.levelText}>{item.level}</Text>
        </View>
        {isLanguage && (
          <Ionicons name="airplane" size={14} color="#10B981" style={styles.flyIcon} />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  bubblyCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 18,
    borderRadius: 28,
    marginBottom: 14,
    borderWidth: 2,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.04,
    shadowRadius: 12,
    elevation: 2,
  },
  leftSide: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    paddingRight: 10,
  },
  iconCircle: {
    width: 46,
    height: 46,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  skillName: {
    fontSize: 15.5,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  aestheticSub: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 0.3,
  },
  rightSide: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  levelPill: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  levelText: {
    fontSize: 12.5,
    fontWeight: '900',
    color: '#334155',
    textTransform: 'capitalize',
  },
  flyIcon: {
    marginLeft: 8,
    opacity: 0.8,
  }
});