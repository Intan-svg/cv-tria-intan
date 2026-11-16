import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Animated 
} from 'react-native';
import { Ionicons, Feather, MaterialCommunityIcons } from '@expo/vector-icons';

export default function ProjectCard({ project }) {
  const [liked, setLiked] = useState(false);
  
  if (!project) return null;

  const techTags = project.teknologi ? project.teknologi.split(',').map(t => t.trim()) : [];

  return (
    <View style={styles.card}>
      {/* Aesthetic Floral Top Banner */}
      <View style={styles.floralBanner}>
        <MaterialCommunityIcons name="flower-tulip" size={16} color="#DBEAFE" />
        <Text style={styles.floralText}>✧ Aesthetic Project Display ✧</Text>
        <MaterialCommunityIcons name="flower-tulip" size={16} color="#DBEAFE" />
      </View>

      <View style={styles.headerRow}>
        <View style={styles.bubblyIcon}>
          <Ionicons name="airplane" size={26} color="#FFFFFF" />
        </View>
        <View style={styles.meta}>
          <View style={styles.cuteBadge}>
            <Text style={styles.badgeText}>{project.kategori}</Text>
          </View>
          <Text style={styles.title}>{project.judul}</Text>
        </View>
      </View>

      <Text style={styles.desc}>{project.deskripsi}</Text>

      <View style={styles.tagsContainer}>
        {techTags.map((tag, i) => (
          <View key={i} style={styles.cuteTag}>
            <Text style={styles.tagText}>🌸 {tag}</Text>
          </View>
        ))}
      </View>

      <View style={styles.divider} />

      {/* Interactive Footer */}
      <View style={styles.footerRow}>
        <View style={styles.travelNote}>
          <Feather name="map-pin" size={12} color="#94A3B8" />
          <Text style={styles.travelText}>Journey & Milestones</Text>
        </View>

        <TouchableOpacity 
          style={styles.likeButton} 
          activeOpacity={0.7}
          onPress={() => setLiked(!liked)}
        >
          <Ionicons 
            name={liked ? "heart" : "heart-outline"} 
            size={22} 
            color={liked ? "#F43F5E" : "#94A3B8"} 
          />
          <Text style={[styles.likeText, liked && styles.likeTextActive]}>
            {liked ? "Loved!" : "Appreciate"}
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
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
  floralBanner: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 16,
    gap: 8,
  },
  floralText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#94A3B8',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  bubblyIcon: {
    width: 60,
    height: 60,
    borderRadius: 24,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
  },
  meta: {
    flex: 1,
    justifyContent: 'center',
  },
  cuteBadge: {
    alignSelf: 'flex-start',
    backgroundColor: '#DBEAFE',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 14,
    marginBottom: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '900',
    color: '#1D4ED8',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  title: {
    fontSize: 18,
    fontWeight: '900',
    color: '#0F172A',
    lineHeight: 24,
  },
  desc: {
    fontSize: 14.5,
    color: '#475569',
    lineHeight: 24,
    marginBottom: 18,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 18,
  },
  cuteTag: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 18,
  },
  tagText: {
    fontSize: 12.5,
    fontWeight: '800',
    color: '#3B82F6',
  },
  divider: {
    height: 2,
    backgroundColor: '#F1F5F9',
    borderRadius: 2,
    marginBottom: 16,
  },
  footerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  travelNote: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  travelText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
  },
  likeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#FFF1F2',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
  },
  likeText: {
    fontSize: 13,
    fontWeight: '800',
    color: '#94A3B8',
  },
  likeTextActive: {
    color: '#F43F5E',
  },
});