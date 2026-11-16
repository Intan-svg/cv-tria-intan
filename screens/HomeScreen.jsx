import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import academicData from "../data/academic.json";
import skillsData from "../data/skills.json";
import projectsData from "../data/projects.json";

export default function HomeScreen({ navigation }) {
  const { student, currentScore, learningPoints } = academicData;

  const personalDetails = [
    {
      id: "info-1",
      label: "Program Studi",
      value: `${student.prodi} (${student.fakultas})`,
      icon: "book-outline",
    },
    {
      id: "info-2",
      label: "Perguruan Tinggi",
      value: student.universitas,
      icon: "business-outline",
    },
    {
      id: "info-3",
      label: "Semester & Status",
      value: `${student.semester} • ${student.status}`,
      icon: "ribbon-outline",
    },
    {
      id: "info-4",
      label: "Domisili",
      value: student.location,
      icon: "location-outline",
    },
    {
      id: "info-5",
      label: "Email Akademik",
      value: student.email,
      icon: "mail-outline",
    },
  ];

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Hero Profile Card */}
      <View style={styles.heroCard}>
        <View style={styles.topTag}>
          <Ionicons name="sparkles" size={13} color="#2563EB" />
          <Text style={styles.topTagText}>
            Personal CV & Academic Portfolio
          </Text>
        </View>

        {/* Circular Profile Image with Soft Pink Ring & Shadow */}
        <View style={styles.avatarOuterRing}>
          <View style={styles.avatarInnerRing}>
            <Image
              source={require("../assets/profile.jpg")}
              style={styles.profileImage}
              resizeMode="cover"
            />
          </View>
          <View style={styles.verifiedBadge}>
            <Ionicons name="shield-checkmark" size={13} color="#FFFFFF" />
          </View>
        </View>

        <Text style={styles.nameText}>{student.name}</Text>

        <View style={styles.nimBadge}>
          <Feather name="hash" size={13} color="#2563EB" />
          <Text style={styles.nimText}>NIM: {student.nim}</Text>
        </View>

        <Text style={styles.roleText}>{student.role}</Text>

        <View style={styles.divider} />

        <Text style={styles.bioText}>{student.bio}</Text>

        {/* Quick CTA Buttons */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={styles.primaryButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Portfolio")}
          >
            <Ionicons name="layers-outline" size={17} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>Lihat Portofolio</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.secondaryButton}
            activeOpacity={0.85}
            onPress={() => navigation.navigate("Contact")}
          >
            <Feather name="send" size={16} color="#2563EB" />
            <Text style={styles.secondaryButtonText}>Hubungi Saya</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Highlight Summary Stats */}
      <View style={styles.statsContainer}>
        <TouchableOpacity
          style={styles.statBox}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Academic")}
        >
          <Text style={styles.statValue}>{currentScore.nilai}</Text>
          <Text style={styles.statLabel}>
            Score (Grade {currentScore.grade})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statBox}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Portfolio")}
        >
          <Text style={styles.statValue}>{skillsData.length}</Text>
          <Text style={styles.statLabel}>Core Skills</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.statBox}
          activeOpacity={0.85}
          onPress={() => navigation.navigate("Portfolio")}
        >
          <Text style={styles.statValue}>{projectsData.length}</Text>
          <Text style={styles.statLabel}>UI Projects</Text>
        </TouchableOpacity>
      </View>

      {/* Personal Information Card */}
      <View style={styles.sectionCard}>
        <View style={styles.sectionHeader}>
          <View style={styles.sectionIconWrap}>
            <Ionicons name="person-outline" size={18} color="#2563EB" />
          </View>
          <View>
            <Text style={styles.sectionTitle}>
              Informasi Personal & Akademik
            </Text>
            <Text style={styles.sectionSubtitle}>
              Identitas resmi mahasiswi Universitas Ma&apos;soem
            </Text>
          </View>
        </View>

        {personalDetails.map((item, index) => (
          <View
            key={item.id}
            style={[
              styles.infoRow,
              index === personalDetails.length - 1 && styles.infoRowLast,
            ]}
          >
            <View style={styles.infoIconCircle}>
              <Ionicons name={item.icon} size={17} color="#2563EB" />
            </View>
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>{item.label}</Text>
              <Text style={styles.infoValue}>{item.value}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* Academic Banner Preview */}
      <TouchableOpacity
        style={styles.academicBanner}
        activeOpacity={0.9}
        onPress={() => navigation.navigate("Academic")}
      >
        <View style={styles.bannerLeft}>
          <View style={styles.bannerBadge}>
            <Ionicons name="trophy" size={18} color="#2563EB" />
          </View>
          <View style={styles.bannerTextWrap}>
            <Text style={styles.bannerTitle}>Capaian Learning Points</Text>
            <Text style={styles.bannerDesc}>
              {learningPoints.formatted} • {learningPoints.rankBadge}
            </Text>
          </View>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#2563EB" />
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 32,
  },
  heroCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 24,
    alignItems: "flex-start",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
    marginBottom: 18,
  },
  topTag: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 999,
    marginBottom: 20,
    gap: 6,
  },
  topTagText: {
    fontSize: 11.5,
    fontWeight: "700",
    color: "#2563EB",
    letterSpacing: 0.3,
  },
  avatarOuterRing: {
    padding: 6,
    borderRadius: 999,
    backgroundColor: "#DBEAFE",
    borderWidth: 2,
    borderColor: "#BFDBFE",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 5,
    marginBottom: 16,
    position: "relative",
  },
  avatarInnerRing: {
    width: 118,
    height: 118,
    borderRadius: 59,
    borderWidth: 3,
    borderColor: "#FFFFFF",
    overflow: "hidden",
    backgroundColor: "#F1F5F9",
  },
  profileImage: {
    width: "100%",
    height: "100%",
  },
  verifiedBadge: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#2563EB",
    borderWidth: 2.5,
    borderColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },
  nameText: {
    fontSize: 24,
    fontWeight: "800",
    color: "#0F172A",
    textAlign: "left",
    marginBottom: 8,
  },
  nimBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DBEAFE",
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 14,
    marginBottom: 10,
    gap: 5,
  },
  nimText: {
    fontSize: 13,
    fontWeight: "700",
    color: "#2563EB",
  },
  roleText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#334155",
    textAlign: "left",
  },
  divider: {
    width: "100%",
    height: 1,
    backgroundColor: "#DBEAFE",
    marginVertical: 16,
  },
  bioText: {
    fontSize: 14,
    color: "#334155",
    textAlign: "left",
    lineHeight: 22,
    marginBottom: 20,
  },
  actionRow: {
    flexDirection: "row",
    width: "100%",
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    borderRadius: 16,
    gap: 7,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 2,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "700",
  },
  secondaryButton: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    borderWidth: 1.5,
    borderColor: "#BFDBFE",
    paddingVertical: 14,
    borderRadius: 16,
    gap: 7,
  },
  secondaryButtonText: {
    color: "#2563EB",
    fontSize: 13,
    fontWeight: "700",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 18,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#DBEAFE",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  statValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#2563EB",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontWeight: "600",
    color: "#334155",
    textAlign: "center",
  },
  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.07,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#DBEAFE",
  },
  sectionIconWrap: {
    width: 40,
    height: 40,
    borderRadius: 14,
    backgroundColor: "#DBEAFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: "800",
    color: "#0F172A",
  },
  sectionSubtitle: {
    fontSize: 12.5,
    color: "#334155",
    marginTop: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  infoRowLast: {
    borderBottomWidth: 0,
    paddingBottom: 4,
  },
  infoIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 12,
    backgroundColor: "#F1F5F9",
    borderWidth: 1,
    borderColor: "#BFDBFE",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  infoTextWrap: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: "#334155",
    marginBottom: 3,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "700",
    color: "#0F172A",
  },
  academicBanner: {
    backgroundColor: "#DBEAFE",
    borderRadius: 22,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#BFDBFE",
  },
  bannerLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  bannerBadge: {
    width: 44,
    height: 44,
    borderRadius: 14,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },
  bannerTextWrap: {
    flex: 1,
  },
  bannerTitle: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0F172A",
  },
  bannerDesc: {
    fontSize: 13,
    fontWeight: "600",
    color: "#334155",
    marginTop: 3,
  },
});
