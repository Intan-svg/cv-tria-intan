import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Animated,
  StatusBar
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';

import skillsData from '../data/skills.json';
import projectsData from '../data/projects.json';
import SkillBadge from '../components/SkillBadge';
import ProjectCard from '../components/ProjectCard';

export default function PortfolioScreen() {
  const [activeTab, setActiveTab] = useState('projects');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Semua');
  
  const scrollY = useRef(new Animated.Value(0)).current;

  // Keamanan Data: Mencegah Error Layar Putih (Blank Screen) jika format JSON berbeda
  const safeProjects = Array.isArray(projectsData) 
    ? projectsData 
    : (projectsData?.projects || Object.values(projectsData || {}) || []);
    
  const safeSkills = Array.isArray(skillsData) 
    ? skillsData 
    : (skillsData?.skills || Object.values(skillsData || {}) || []);

  const categories = ['Semua', 'Web', 'Mobile', 'Desain', 'Database'];

  const renderSkillItem = ({ item }) => <SkillBadge item={item} />;
  const renderProjectItem = ({ item }) => <ProjectCard project={item} />;

  // Logika Filter Ganda: Pencarian Teks & Kategori Interaktif
  const filteredProjects = safeProjects.filter((item) => {
    const matchesSearch = 
      (item.judul?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
      (item.teknologi?.toLowerCase() || '').includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      activeCategory === 'Semua' || 
      (item.kategori?.toLowerCase() || '').includes(activeCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  // Efek Animasi Parallax pada Header
  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -10],
    extrapolate: 'clamp',
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Animated Ultra-Luxurious Header */}
      <Animated.View style={[
        styles.topSection, 
        { transform: [{ translateY: headerTranslateY }], opacity: headerOpacity }
      ]}>
        
        {/* Aesthetic Floral Top Decoration */}
        <View style={styles.floralDeco}>
          <MaterialCommunityIcons name="star-four-points" size={12} color="#93C5FD" />
          <Text style={styles.floralText}>✦ Professional Space ✦</Text>
          <MaterialCommunityIcons name="star-four-points" size={12} color="#93C5FD" />
        </View>

        <View style={styles.headerTitleWrap}>
          <View style={styles.headerIcon}>
            <Ionicons name="rocket" size={24} color="#FFFFFF" />
          </View>
          <View style={styles.headerTextWrap}>
            <Text style={styles.screenTitle}>Skills & Portofolio</Text>
            <Text style={styles.screenSubtitle}>
              Eksplorasi karya, desain interaktif, dan keahlian teknis
            </Text>
          </View>
        </View>

        {/* Bubbly Segment Switcher */}
        <View style={styles.segmentContainer}>
          <TouchableOpacity
            style={[styles.segmentButton, activeTab === 'projects' && styles.segmentButtonActive]}
            activeOpacity={0.8}
            onPress={() => setActiveTab('projects')}
          >
            <Ionicons
              name={activeTab === 'projects' ? "layers" : "layers-outline"}
              size={18}
              color={activeTab === 'projects' ? '#2563EB' : '#64748B'}
            />
            <Text style={[styles.segmentText, activeTab === 'projects' && styles.segmentTextActive]}>
              Projects ({safeProjects.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.segmentButton, activeTab === 'skills' && styles.segmentButtonActive]}
            activeOpacity={0.8}
            onPress={() => {
              setActiveTab('skills');
              setSearchQuery('');
            }}
          >
            <Ionicons
              name={activeTab === 'skills' ? "sparkles" : "sparkles-outline"}
              size={18}
              color={activeTab === 'skills' ? '#2563EB' : '#64748B'}
            />
            <Text style={[styles.segmentText, activeTab === 'skills' && styles.segmentTextActive]}>
              Tech Skills ({safeSkills.length})
            </Text>
          </TouchableOpacity>
        </View>
        
        {/* Complex Search & Filter Array for Projects Tab */}
        {activeTab === 'projects' && (
          <View style={styles.filterSection}>
            <View style={styles.searchContainer}>
              <Feather name="search" size={18} color="#94A3B8" style={styles.searchIcon} />
              <TextInput
                style={styles.searchInput}
                placeholder="Cari proyek atau teknologi..."
                placeholderTextColor="#94A3B8"
                value={searchQuery}
                onChangeText={setSearchQuery}
              />
              {searchQuery.length > 0 && (
                <TouchableOpacity onPress={() => setSearchQuery('')} style={styles.clearBtn}>
                  <Ionicons name="close-circle" size={18} color="#94A3B8" />
                </TouchableOpacity>
              )}
            </View>

            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              data={categories}
              keyExtractor={(item) => item}
              contentContainerStyle={styles.categoryScroll}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[styles.categoryChip, activeCategory === item && styles.categoryChipActive]}
                  onPress={() => setActiveCategory(item)}
                >
                  <Text style={[styles.categoryText, activeCategory === item && styles.categoryTextActive]}>
                    {item}
                  </Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </Animated.View>

      {/* Dynamic Content Renderer */}
      {activeTab === 'skills' ? (
        <Animated.FlatList
          key="skills-list"
          data={safeSkills}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderSkillItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
        />
      ) : (
        <Animated.FlatList
          key="projects-list"
          data={filteredProjects}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderProjectItem}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
          )}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <View style={styles.emptyIconWrap}>
                <Ionicons name="telescope" size={48} color="#DBEAFE" />
              </View>
              <Text style={styles.emptyTitle}>Belum ada penemuan</Text>
              <Text style={styles.emptyText}>Coba ubah kata kunci atau kategori pencarianmu.</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F5F9',
  },
  topSection: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 22,
    paddingTop: 16,
    paddingBottom: 24,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
    shadowColor: '#2563EB',
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
    marginBottom: 10,
    zIndex: 10,
  },
  floralDeco: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
    backgroundColor: '#F8FAFC',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },
  floralText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#60A5FA',
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  },
  headerTitleWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  headerIcon: {
    width: 56,
    height: 56,
    borderRadius: 20,
    backgroundColor: '#3B82F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
  },
  headerTextWrap: {
    flex: 1,
  },
  screenTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: '#0F172A',
    marginBottom: 4,
  },
  screenSubtitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#64748B',
    lineHeight: 18,
  },
  segmentContainer: {
    flexDirection: 'row',
    backgroundColor: '#F8FAFC',
    borderRadius: 20,
    padding: 6,
    borderWidth: 1.5,
    borderColor: '#F1F5F9',
  },
  segmentButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    gap: 8,
  },
  segmentButtonActive: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#94A3B8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  segmentText: {
    fontSize: 13.5,
    fontWeight: '800',
    color: '#94A3B8',
  },
  segmentTextActive: {
    color: '#2563EB',
  },
  filterSection: {
    marginTop: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 16,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 14.5,
    fontWeight: '600',
    color: '#0F172A',
  },
  clearBtn: {
    padding: 4,
  },
  categoryScroll: {
    gap: 10,
    paddingBottom: 4,
  },
  categoryChip: {
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  categoryChipActive: {
    backgroundColor: '#DBEAFE',
    borderColor: '#BFDBFE',
  },
  categoryText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  categoryTextActive: {
    color: '#1D4ED8',
  },
  listContent: {
    padding: 22,
    paddingTop: 16,
    paddingBottom: 40,
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 60,
  },
  emptyIconWrap: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
    borderWidth: 2,
    borderColor: '#EFF6FF',
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#334155',
    marginBottom: 8,
  },
  emptyText: {
    textAlign: 'center',
    color: '#94A3B8',
    fontSize: 14,
    fontWeight: '600',
    maxWidth: '80%',
    lineHeight: 22,
  }
});