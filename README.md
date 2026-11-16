# Personal CV & Academic Score App — Vera Amellia (242505023)

Aplikasi mobile **Personal CV & Academic Score App** menggunakan **React Native** dan **Expo** untuk memenuhi tugas **Ujian Tengah Semester (UTS) Pemrograman Mobile 2** di **Universitas Ma'soem**.

---

## Identitas Mahasiswa
- **Nama Lengkap:** Vera Amellia
- **NIM:** 242505023
- **Program Studi:** S1 Sistem Informasi (Fakultas Komputer, Universitas Ma'soem)
- **Mata Kuliah:** Pemrograman Mobile 2
- **Dosen Pengampu:** Iin, M.Kom
- **Target Pencapaian:** **Level 9 — Professional (Multi-Screen CV Application)**

---

## Struktur Proyek
```text
├── assets/
│   └── profile.jpg             # Foto profil lokal Vera Amellia
├── data/
│   ├── academic.json           # Data profil & capaian akademik (Level 5, 6, 8)
│   ├── skills.json             # Data keterampilan teknis UI/UX & Mobile (Level 6, 7)
│   └── projects.json           # Data portofolio proyek desain mobile (Level 6, 7)
├── components/
│   ├── ScoreCard.jsx           # Komponen reusable indikator progress akademik (Level 8)
│   ├── SkillBadge.jsx          # Komponen reusable badge & progress skill (Level 7)
│   └── ProjectCard.jsx         # Komponen reusable kartu portofolio proyek (Level 7)
├── screens/
│   ├── HomeScreen.jsx          # Layar utama profil, bio, & informasi personal (Level 1–3)
│   ├── AcademicScreen.jsx      # Layar dashboard My Score, Grade A, LP, & Progress (Level 8)
│   ├── PortfolioScreen.jsx     # Layar FlatList dinamis Skills & Projects (Level 7)
│   └── ContactScreen.jsx       # Layar formulir kontak interaktif & validasi (Level 4)
├── App.js                      # Konfigurasi NavigationContainer & Bottom Tab Navigator (Level 9)
└── package.json
```

---

## Cara Menjalankan Aplikasi

1. Pastikan dependencies telah terpasang:
   ```bash
   npm install
   ```
2. Jalankan Expo development server:
   ```bash
   npx expo start
   ```
3. Tekan `w` untuk membuka di Web Browser, `a` untuk Android Emulator, atau scan QR Code menggunakan aplikasi **Expo Go**.
