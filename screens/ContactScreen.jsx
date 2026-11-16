import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import academicData from "../data/academic.json";

export default function ContactScreen() {
  const { student } = academicData;

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});
  const [submittedData, setSubmittedData] = useState(null);

  const validateAndSubmit = () => {
    const newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Nama lengkap wajib diisi.";
    }
    if (!email.trim()) {
      newErrors.email = "Alamat email wajib diisi.";
    } else if (!email.includes("@") || !email.includes(".")) {
      newErrors.email = "Format email tidak valid (contoh: nama@email.com).";
    }
    if (!message.trim()) {
      newErrors.message = "Pesan atau keperluan kolaborasi tidak boleh kosong.";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      Alert.alert(
        "Form Belum Lengkap",
        "Mohon periksa kembali kolom input yang masih kosong atau belum sesuai format.",
        [{ text: "Mengerti", style: "default" }],
      );
      return;
    }

    const payload = {
      senderName: name.trim(),
      senderEmail: email.trim(),
      senderMessage: message.trim(),
      sentAt: new Date().toLocaleTimeString("id-ID", {
        hour: "2-digit",
        minute: "2-digit",
      }),
    };

    setSubmittedData(payload);

    Alert.alert(
      "Pesan Berhasil Dikirim! 🚀",
      `Terima kasih ${payload.senderName}, pesan Anda untuk ${student.name} telah berhasil tercatat.`,
      [
        {
          text: "Selesai",
          onPress: () => {
            setName("");
            setEmail("");
            setMessage("");
            setErrors({});
          },
        },
      ],
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
      >
        {/* Contact Header Card */}
        <View style={styles.headerCard}>
          <View style={styles.headerTop}>
            <View style={styles.iconBadge}>
              <Feather name="mail" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.headerTextWrap}>
              <Text style={styles.headerTitle}>Let's Collaborate!</Text>
              <Text style={styles.headerSubtitle}>
                Hubungi {student.name} untuk diskusi UI/UX, Web, atau proyek
                React Native.
              </Text>
            </View>
          </View>

          <View style={styles.quickContactRow}>
            <View style={styles.contactPill}>
              <Ionicons name="mail-outline" size={15} color="#2563EB" />
              <Text style={styles.contactPillText}>
                {student.email || "email@mahasiswa.com"}
              </Text>
            </View>
            <View style={styles.contactPill}>
              <Ionicons name="logo-github" size={15} color="#2563EB" />
              <Text style={styles.contactPillText}>GitHub Profile</Text>
            </View>
          </View>
        </View>

        {/* Interactive Form Card */}
        <View style={styles.formCard}>
          <Text style={styles.formSectionTitle}>Kirim Pesan Langsung</Text>

          {/* Input Nama */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Nama Lengkap *</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.name && styles.inputWrapperError,
              ]}
            >
              <Ionicons
                name="person-outline"
                size={18}
                color={errors.name ? "#EF4444" : "#64748B"}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="Masukkan nama lengkap Anda"
                placeholderTextColor="#94A3B8"
                value={name}
                onChangeText={(text) => {
                  setName(text);
                  if (errors.name) setErrors({ ...errors, name: null });
                }}
              />
            </View>
            {errors.name ? (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle" size={14} color="#EF4444" />
                <Text style={styles.errorText}>{errors.name}</Text>
              </View>
            ) : null}
          </View>

          {/* Input Email */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Alamat Email *</Text>
            <View
              style={[
                styles.inputWrapper,
                errors.email && styles.inputWrapperError,
              ]}
            >
              <Ionicons
                name="at-outline"
                size={18}
                color={errors.email ? "#EF4444" : "#64748B"}
                style={styles.inputIcon}
              />
              <TextInput
                style={styles.input}
                placeholder="contoh: nama@domain.com"
                placeholderTextColor="#94A3B8"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={(text) => {
                  setEmail(text);
                  if (errors.email) setErrors({ ...errors, email: null });
                }}
              />
            </View>
            {errors.email ? (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle" size={14} color="#EF4444" />
                <Text style={styles.errorText}>{errors.email}</Text>
              </View>
            ) : null}
          </View>

          {/* Input Pesan */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Pesan / Keperluan *</Text>
            <View
              style={[
                styles.inputWrapper,
                styles.textAreaWrapper,
                errors.message && styles.inputWrapperError,
              ]}
            >
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Tuliskan pesan, penawaran proyek, atau sapaan..."
                placeholderTextColor="#94A3B8"
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                value={message}
                onChangeText={(text) => {
                  setMessage(text);
                  if (errors.message) setErrors({ ...errors, message: null });
                }}
              />
            </View>
            {errors.message ? (
              <View style={styles.errorRow}>
                <Ionicons name="alert-circle" size={14} color="#EF4444" />
                <Text style={styles.errorText}>{errors.message}</Text>
              </View>
            ) : null}
          </View>

          <TouchableOpacity
            style={styles.submitButton}
            activeOpacity={0.85}
            onPress={validateAndSubmit}
          >
            <Feather name="send" size={18} color="#FFFFFF" />
            <Text style={styles.submitButtonText}>Kirim Pesan Sekarang</Text>
          </TouchableOpacity>
        </View>

        {/* Visual Feedback Response Card */}
        {submittedData ? (
          <View style={styles.responseCard}>
            <View style={styles.responseHeader}>
              <Ionicons name="checkmark-circle" size={22} color="#10B981" />
              <Text style={styles.responseTitle}>
                Pesan Terkirim ({submittedData.sentAt})
              </Text>
            </View>
            <Text style={styles.responseDetail}>
              <Text style={styles.boldText}>Dari:</Text>{" "}
              {submittedData.senderName} ({submittedData.senderEmail})
            </Text>
            <Text style={styles.responseMessage}>
              "{submittedData.senderMessage}"
            </Text>
          </View>
        ) : null}
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F1F5F9",
  },
  scrollContent: {
    padding: 18,
    paddingBottom: 40,
  },
  headerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 18,
  },
  iconBadge: {
    width: 54,
    height: 54,
    borderRadius: 18,
    backgroundColor: "#2563EB",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 16,
  },
  headerTextWrap: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 13,
    color: "#475569",
    lineHeight: 20,
  },
  quickContactRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  contactPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
    gap: 6,
  },
  contactPillText: {
    fontSize: 12.5,
    fontWeight: "600",
    color: "#334155",
  },
  formCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: "#DBEAFE",
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 10,
    elevation: 3,
    marginBottom: 16,
  },
  formSectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#0F172A",
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 18,
  },
  label: {
    fontSize: 13.5,
    fontWeight: "700",
    color: "#334155",
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8FAFC",
    borderWidth: 1.5,
    borderColor: "#E2E8F0",
    borderRadius: 14,
    paddingHorizontal: 14,
  },
  inputWrapperError: {
    borderColor: "#F87171",
    backgroundColor: "#FEF2F2",
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    paddingVertical: 14,
    fontSize: 14,
    color: "#0F172A",
  },
  textAreaWrapper: {
    alignItems: "flex-start",
    paddingVertical: 8,
  },
  textArea: {
    minHeight: 100,
  },
  errorRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    gap: 6,
  },
  errorText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#EF4444",
  },
  submitButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#2563EB",
    paddingVertical: 16,
    borderRadius: 16,
    gap: 8,
    marginTop: 8,
    shadowColor: "#2563EB",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },
  responseCard: {
    backgroundColor: "#ECFDF5",
    borderRadius: 20,
    padding: 18,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
  responseHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginBottom: 10,
  },
  responseTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: "#065F46",
  },
  responseDetail: {
    fontSize: 13,
    color: "#047857",
    marginBottom: 8,
  },
  boldText: {
    fontWeight: "700",
    color: "#064E3B",
  },
  responseMessage: {
    fontSize: 13.5,
    fontStyle: "italic",
    color: "#064E3B",
    backgroundColor: "#FFFFFF",
    padding: 14,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#D1FAE5",
  },
});
