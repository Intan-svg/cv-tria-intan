import React, { useState, useEffect, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated, 
  TouchableOpacity,
  Easing
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

export default function ScoreCard({ 
  title, 
  subtitle, 
  percentage, 
  icon, 
  accentColor = '#3B82F6' 
}) {
  const [celebrate, setCelebrate] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Animasi mewah saat bar persentase terisi
  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: percentage,
      duration: 1500,
      easing: Easing.out(Easing.cubic),
      useNativeDriver: false,
    }).start();
  }, [percentage]);

  const widthInterpolated = progressAnim.interpolate({
    inputRange: [0, 100],
    outputRange: ['0%', '100%']
  });

  return (
    <View style={styles.cardWrapper}>
      {/* Aesthetic Top Decoration */}
      <View style={styles.topDecoration}>
        <MaterialCommunityIcons name="sparkles" size={14} color="#FBBF24" />
        <Text style={styles.decorText}>✦ Academic Excellence ✦</Text>
        <MaterialCommunityIcons name="sparkles" size={14} color="#FBBF24" />
      </View>

      <View style={styles.mainContent}>
        <View style={[styles.iconContainer, { backgroundColor: `${accentColor}15` }]}>
          <Ionicons name={icon || 'school'} size={28} color={accentColor} />
        </View>
        
        <View style={styles.textWrap}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.subtitle}>{subtitle}</Text>
        </View>
        
        <View style={styles.scoreBadge}>
          <Text style={[styles.percentageText, { color: accentColor }]}>
            {percentage}%
          </Text>
        </View>
      </View>
      
      {/* Animated Progress Bar Section */}
      <View style={styles.progressSection}>
        <View style={styles.track}>
          <Animated.View 
            style={[
              styles.fill, 
              { 
                width: widthInterpolated, 
                backgroundColor: accentColor 
              }
            ]} 
          />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressMin}>Beginner</Text>
          <Text style={styles.progressMax}>Mastery</Text>
        </View>
      </View>

      <View style={styles.divider} />

      {/* Interactive Bubbly Footer */}
      <View style={styles.footer}>
        <View style={styles.milestone}>
          <FontAwesome5 name="medal" size={14} color="#F59E0B" />
          <Text style={styles.milestoneText}>
            {percentage >= 90 ? 'Outstanding Achievement' : 'Great Progress'}
          </Text>
        </View>

        <TouchableOpacity 
          style={[styles.cheerBtn, celebrate && styles.cheerBtnActive]}
          activeOpacity={0.7}
          onPress={() => setCelebrate(!celebrate)}
        >
          <Ionicons 
            name={celebrate ? "star" : "star-outline"} 
            size={16} 
            color={celebrate ? "#FFFFFF" : accentColor} 
          />
          <Text style={[styles.cheerText, { color: celebrate ? '#FFFFFF' : accentColor }]}>
            {celebrate ? 'Awesome!' : 'Cheer!'}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    backgroundColor: '#FFFFFF',
    borderRadius: 32,
    paddingTop: 16,
    paddingBottom: 20,
    paddingHorizontal: 22,
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#EFF6FF',
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.06,
    shadowRadius: 20,
    elevation: 5,
  },
  topDecoration: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FEF3C7',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginBottom: 16,
    alignSelf: 'center',
    gap: 8,
  },
  decorText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#D97706',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  mainContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  iconContainer: {
    width: 56,
    height: 56,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    borderWidth: 1,
    borderColor: '#EFF6FF',
  },
  textWrap: {
    flex: 1,
  },
  title: {
    fontSize: 17,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
  },
  scoreBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  percentageText: {
    fontSize: 18,
    fontWeight: '900',
  },
  progressSection: {
    marginBottom: 16,
  },
  track: {
    height: 16,
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 8,
  },
  fill: {
    height: '100%',
    borderRadius: 12,
  },
  progressLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 4,
  },
  progressMin: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  progressMax: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
  },
  divider: {
    height: 2,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    marginBottom: 16,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  milestone: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  milestoneText: {
    fontSize: 12,
    fontWeight: '800',
    color: '#D97706',
  },
  cheerBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EFF6FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  cheerBtnActive: {
    backgroundColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  cheerText: {
    fontSize: 12,
    fontWeight: '900',
  },
});