import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import academicData from "../data/academic.json";
import ScoreCard from "../components/ScoreCard";

export default function AcademicScreen() {
  const { student, course, currentScore, learningPoints, progress } =
    academicData;

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollContent}
      showsVerticalScrollIndicator={false}
    >
      {/* Top Score Hero Dashboard */}
      <View style={styles.heroScoreCard}>
        <View style={styles.heroHeaderRow}>
          <View style={styles.heroTextContent}>
            <Text style={styles.heroLabel}>MY SCORE DASHBOARD</Text>
            <Text style={styles.courseTitle}>{course.mataKuliah}</Text>
            <Text style={styles.lecturerText}>
              Dosen Pengampu: {course.dosen}
            </Text>
          </View>

          <View style={styles.gradeCircle}>
            <Text style={styles.gradeTitle}>GRADE</Text>
            <Text style={styles.gradeValue}>{currentScore.grade}</Text>
          </View>
        </View>

        <View style={styles.metricsRow}>
          <View style={styles.metricBox}>
            <View style={styles.metricHeader}>
              <Ionicons name="star" size={16} color="#2563EB" />
              <Text style={styles.metricTitle}>Current Score</Text>
            </View>
            <Text style={styles.metricBigValue}>
              Nilai {currentScore.nilai}
            </Text>
            <Text style={styles.metricSub}>{currentScore.predikat}</Text>
          </View>

          <View style={styles.metricBox}>
            <View style={styles.metricHeader}>
              <Ionicons name="flash" size={16} color="#3B82F6" />
              <Text style={styles.metricTitle}>Learning Points</Text>
            </View>
            <Text style={styles.metricBigValue}>
              {learningPoints.formatted}
            </Text>
            <Text style={styles.metricSub}>{learningPoints.rankBadge}</Text>
          </View>
        </View>
      </View>

      {/* Academic Identity Card */}
      <View style={styles.identityCard}>
        <View style={styles.identityTitleRow}>
          <Ionicons name="school-outline" size={18} color="#2563EB" />
          <Text style={styles.identityHeaderTitle}>
            Identitas Akademik Mahasiswa
          </Text>
        </View>

        <View style={styles.gridRow}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Nama Mahasiswa</Text>
            <Text style={styles.gridValue}>{student.name}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>NIM</Text>
            <Text style={styles.gridValue}>{student.nim}</Text>
          </View>
        </View>

        <View style={styles.gridRow}>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Mata Kuliah</Text>
            <Text style={styles.gridValue}>{course.mataKuliah}</Text>
          </View>
          <View style={styles.gridItem}>
            <Text style={styles.gridLabel}>Dosen</Text>
            <Text style={styles.gridValue}>{course.dosen}</Text>
          </View>
        </View>
      </View>

      {/* Learning Progress Section */}
      <View style={styles.sectionHeaderWrap}>
        <Text style={styles.sectionHeading}>Indikator Capaian Belajar</Text>
        <Text style={styles.sectionSubheading}>
          Visualisasi progres mingguan mata kuliah {course.mataKuliah}
        </Text>
      </View>

      {progress.map((item) => (
        <ScoreCard
          key={item.id}
          title={item.title}
          subtitle={item.subtitle}
          percentage={item.percentage}
          icon={item.icon}
          accentColor="#2563EB" // Memaksa komponen ScoreCard mengikuti tema biru
        />
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9", // Abu-abu muda standar tema baru
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },
  heroScoreCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24, // Sudut lebih membulat
    padding: 22,
    borderWidth: 1,
    borderColor: "#DBEAFE", // Border biru transparan
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.1,
    shadowRadius: 14,
    elevation: 4,
    marginBottom: 20,
  },
  heroHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  heroTextContent: {
    flex: 1,
    paddingRight: 10,
  },
  heroLabel: {
    fontSize: 11,
    fontWeight: "800",
    color: "#2563EB",
    letterSpacing: 0.8,
    marginBottom: 6,
  },
  courseTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A", // Navy gelap
    marginBottom: 4,
  },
  lecturerText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#475569",
  },
  gradeCircle: {
    width: 72,
    height: 72,
    borderRadius: 24,
    backgroundColor: "#2563EB", // Biru utama
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 3,
  },
  gradeTitle: {
    fontSize: 10,
    fontWeight: "700",
    color: "#DBEAFE",
    letterSpacing: 0.6,
  },
  gradeValue: {
    fontSize: 30,
    fontWeight: "900",
    color: "#FFFFFF",
    lineHeight: 34,
  },
  metricsRow: {
    flexDirection: "row",
    gap: 14,
  },
  metricBox: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  metricHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 8,
  },
  metricTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: "#475569",
  },
  metricBigValue: {
    fontSize: 22,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 2,
  },
  metricSub: {
    fontSize: 11,
    fontWeight: "700",
    color: "#2563EB",
  },
  identityCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 24,
  },
  identityTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F5F9",
  },
  identityHeaderTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#0F172A",
  },
  gridRow: {
    flexDirection: "row",
    marginBottom: 12,
    gap: 12,
  },
  gridItem: {
    flex: 1,
    backgroundColor: "#F8FAFC",
    padding: 14,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E2E8F0",
  },
  gridLabel: {
    fontSize: 12,
    color: "#475569",
    marginBottom: 4,
  },
  gridValue: {
    fontSize: 14,
    fontWeight: "800",
    color: "#0F172A",
  },
  sectionHeaderWrap: {
    marginBottom: 16,
    paddingHorizontal: 4,
  },
  sectionHeading: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
  },
  sectionSubheading: {
    fontSize: 13,
    color: "#475569",
    marginTop: 4,
  },
});
