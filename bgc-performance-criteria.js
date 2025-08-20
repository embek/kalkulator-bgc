const bgcPerformanceCriteria = {
  "KEAMANAN SIBER": {
    "Integritas data yang disimpan di pusat data": {
      "100% data berhasil diverifikasi menggunakan checksum atau hashing": 12,
      "100% perubahan data atau riwayat versi data terdokumentasi": 12
    },
    "Redundansi perangkat keras": {
      "100% redundansi perangkat kritikal": 12,
      "Tidak ada gangguan selama failover": 12
    },
    "Analisis event log": {
      "Instant atau real-time dengan maksimal setiap 1 menit": 12,
      "Lebih dari 95% insiden keamanan terdeteksi": 12
    },
    "Kontrol akses pada setiap lapisan OSI": {
      "100% layer selalu diterapkan kontrol akses": 27
    },
    "Segmentasi jaringan": {
      "≥ 3 segment terisolasi": 12,
      "100% lalu lintas jaringan selalu dipantau": 12
    },
    "Enkripsi end-to-end": {
      "100% data yang dikirim dienkripsi": 15,
      "100% komunikasi data sensitif menggunakan enkripsi": 15
    },
    "Sistem kendali akses jaringan": {
      "Minimal 98% tingkat keberhasilan autentikasi": 9,
      "Selalu kurang dari 2 detik waktu autentikasi": 9,
      "Mencakup 100% aktivitas penting (audit trail)": 9
    },
    "Mekanisme penggantian password standar": {
      "100% implementasi": 30
    },
    "Proteksi login": {
      "Selalu 1 jam waktu blokir akun": 12,
      "Notifikasi langsung saat blokir terjadi": 12
    },
    "Role-Based Access Control (RBAC)": {
      "100% akses dikendalikan dengan RBAC secara konsisten": 30
    },
    "Manajemen remote": {
      "Selalu 98-100% keberhasilan permintaan akses": 9,
      "Selalu 1-4 menit waktu penyelesaian": 9,
      "100% akses tidak sah diblokir": 9
    },
    "Sistem deteksi intrusi jaringan": {
      "Selalu ≤ 1 menit waktu deteksi": 9,
      "Selalu ≥ 99.5% tingkat deteksi": 9,
      "Selalu ≤ 5 menit waktu respons": 9
    },
    "Single Sign-On (SSO)": {
      "Selalu ≤ 2 detik waktu respons": 24
    },
    "Multi-Factor Authentication (MFA)": {
      "100% pengguna dengan akses ke data sensitif": 12,
      "≥ 2 metode autentikasi": 12
    },
    "Sistem multiakses": {
      "≥ 99.9% keberhasilan akses bersamaan": 12,
      "Selalu ≥ 5 perangkat kapasitas maksimal": 12
    }
  },

  "PROTOKOL DAN JARINGAN KOMUNIKASI": {
    "Protokol komunikasi standar terbuka": {
      "100% implementasi": 30
    },
    "Protokol kompatibel TCP/IP": {
      "100% implementasi": 21
    },
    "Optimasi lapisan OSI": {
      "Selalu ≤ 1 detik waktu respons": 3,
      "≥ 99% keberhasilan pengiriman frame": 3,
      "≥ 99% keberhasilan pengiriman paket": 3,
      "≥ 99% keberhasilan koneksi TCP/UDP": 3,
      "≥ 99% keberhasilan pembentukan sesi": 3,
      "≥ 99% keberhasilan enkripsi-dekripsi": 3,
      "Selalu ≤ 1 detik waktu respons aplikasi": 3
    },
    "Pengelolaan jaringan kabel": {
      "100% implementasi standar": 30
    },
    "Pelabelan infrastruktur kabel": {
      "100% label dan warna sesuai standar": 30
    },
    "Pengelolaan jaringan nirkabel": {
      "100% implementasi standar": 30
    },
    "Pelabelan infrastruktur nirkabel": {
      "100% pendekatan umum diterapkan": 27
    },
    "Teknologi 5G": {
      "Selalu ≤ 1 ms latensi end-to-end": 12,
      "Selalu ≥ 50 Mbps per user throughput": 12
    },
    "Port dan layanan tidak aman": {
      "100% port dan layanan tidak aman dinonaktifkan": 33
    },
    "Koneksi kabel di rak server": {
      "100% penggunaan patch panel": 12,
      "100% penggunaan modular jack female": 12
    },
    "Kabel patch cord": {
      "100% penggunaan": 30
    },
    "Quality of Service (QoS)": {
      "70-85% penggunaan bandwidth": 3,
      "Selalu ≤ 100 ms latensi": 3,
      "≤ 1% packet loss": 3,
      "Selalu ≤ 30 ms jitter": 3,
      "100% keberhasilan prioritasi data": 3,
      "≥ 95% efisiensi alokasi sumber daya": 3
    }
  },

  "INTEGRASI DATA DAN SISTEM": {
    "Integrasi dengan BMS": {
      "Selalu realtime atau setiap ≤ 60 detik sinkronisasi": 15,
      "100% kelengkapan monitoring data": 15,
      "100% kompatibilitas standar data": 15
    },
    "Akuisisi data waktu nyata": {
      "Selalu ≤ 1 detik waktu tangkap data": 39
    },
    "Integritas data": {
      "100% konsistensi data": 30,
      "100% kepatuhan standar data": 30
    },
    "Pemrosesan data otomatis": {
      "Selalu ≤ 10 detik waktu pemrosesan": 39
    },
    "Katalog data terpusat": {
      "100% data terkatalogkan": 39
    },
    "Standar terbuka untuk interoperabilitas": {
      "100% kepatuhan": 33
    }
  },

  "MANAJEMEN OPERASI": {
    "Perencanaan sistem": {
      "Kebijakan tersedia": 12,
      "Rincian tugas dan tanggung jawab tersedia": 9,
      "Prosedur operasional tersedia": 9
    },
    "Pengorganisasian sistem": {
      "100% pemenuhan posisi/roles": 15,
      "100% kompetensi personel terpenuhi": 15
    },
    "Pelatihan dan simulasi": {
      "Selalu 6 bulan sekali frekuensi pelatihan": 27
    },
    "Pengawasan sistem": {
      "Dokumentasi/laporan": 9,
      "Audit kinerja dan kepatuhan": 18,
      "Pemeliharaan sistem": 18,
      "Pelaporan dan mitigasi insiden": 18,
      "Sekurang-kurangnya 1 kali per 3 bulan audit": 27
    }
  },

  "DAMPAK": {
    "Penghematan energi": {
      ">25% penurunan konsumsi": 33
    },
    "Penghematan air": {
      ">10% penurunan konsumsi": 33
    },
    "Kepuasan penghuni": {
      ">80% kepuasan berdasarkan survei": 30
    }
  },

  "KEMAMPUAN SISTEM": {
    "Sistem Alarm Kebencanaan": {
      "Selalu ≤ 10 detik waktu deteksi": 18,
      "100% komponen utama termonitor": 15,
      "Pelaporan otomatis ke layanan darurat": 15
    },
    "Sistem Kamera Pengawas": {
      "100% data terenkripsi": 3,
      "Selalu ≤ 5 detik waktu pengiriman video": 3,
      "Fungsi interkom": 6,
      "Semua kamera ≥ 720p": 3,
      "Selalu ≤ 2 detik respons interkom": 3,
      "≥50% akurasi deteksi gerakan/objek": 12,
      "≥99% rekaman terekam": 3,
      "≥99% availabilitas sistem": 3,
      "100% area publik terjangkau": 3,
      "≥30 hari penyimpanan video": 3,
      "≥90% perangkat mendukung PoE": 6
    },
    "Sistem Kontrol Akses": {
      "Fluktuasi tegangan ≤ ±5%": 6,
      "≥99.9% waktu aktif perangkat": 6,
      "0 temuan passback": 9,
      "0 kendala pengaturan akses": 9,
      "100% tersedia fitur penghitungan penghuni": 9,
      "0 kendala deaktivasi kredensial": 9
    },
    "Sistem Distribusi Video": {
      "≥95% kesamaan kualitas video": 6,
      "100% kompatibilitas format file": 6,
      "Selalu ≤ 0.1 detik latensi pengiriman": 6,
      "Selalu ≥5 Mbps throughput": 6,
      "100% keberhasilan penjadwalan": 12,
      "≥90% perangkat mendukung PoE": 12
    },
    "Sistem Audio Visual": {
      "100% komponen termonitor real-time": 24,
      "≥90% perangkat mendukung PoE": 24
    },
    "Sistem Jaringan Akses": {
      "100% status perangkat triple play termonitor": 24,
      "100% fitur tambahan tersedia": 24
    },
    "Sistem Kelistrikan": {
      "≥99% akurasi pengukuran energi": 12,
      "Akurasi kontrol otomatis": 9,
      "100% data tren tersedia": 9,
      "≥10% pengurangan konsumsi WBP": 9,
      "≥99% akurasi alarm anomali": 9
    },
    "Sistem Pencahayaan": {
      "≥99.5% uptime sistem kontrol": 48
    },
    "Sistem Pengondisian Udara": {
      "100% parameter termonitor": 48
    },
    "Sistem Ventilasi": {
      "Selalu ≤30 detik waktu respons": 12,
      "≥98% akurasi deteksi udara luar": 12,
      "≥95% akurasi kontrol otomatis": 12,
      "≥90% akurasi prediksi AI": 12
    },
    "Sistem Penyediaan Air Minum": {
      "≥95% akurasi meter air": 9,
      "Selalu ≤1 jam deteksi kebocoran": 9,
      "Selalu ≤5 detik respons perubahan debit": 6,
      "100% sesuaian waktu automated cleaning": 6,
      "Selalu ≤5 detik respons katup cerdas": 6,
      "100% parameter kualitas air termonitor": 6,
      "≥95% deteksi dini kebocoran": 6
    },
    "Sistem Pengelolaan Air Limbah": {
      "Selalu ≤3 detik respons perubahan volume": 6,
      "Akurasi ≤5% pengukuran muka air": 6,
      "Selalu ≤5 menit respons penggelontoran": 12,
      "Selalu ≤3 detik deteksi kebocoran": 12,
      "Selalu ≤30 detik ketersediaan data kualitas": 12
    },
    "Sistem Pengelolaan Sampah": {
      "≥95% akurasi sensor smart bin": 24,
      "100% penggunaan Wi-Fi/LPWAN": 24
    },
    "Sistem Transportasi dalam Gedung": {
      "≥99.9% availabilitas informasi lift": 6,
      "Selalu ≤30 detik respons TAS": 6,
      "Selalu ≤5 detik respons pengaturan lift": 9,
      "Selalu ≤3 detik akses informasi antarmuka": 9,
      "100% keberhasilan monitor keadaan darurat": 6,
      "Selalu ≤2 detik respons kendali jarak jauh": 6,
      "Selalu ≤5 detik pembaruan data aplikasi": 6
    },
    "Sistem Parkir": {
      "≥99% uptime sensor IoT": 6,
      "Selalu ≤2 detik akses RFID": 9,
      "≥95% akurasi informasi parkir": 9,
      "≥95% keberhasilan pembayaran cashless": 9,
      "Selalu ≤5 detik pembaruan informasi LED": 9,
      "Waktu pengolahan laporan visual": 6,
      "≥90% perangkat mendukung PoE": 6
    },
    "Sistem Pengelolaan Utilitas": {
      "≤2% kesalahan penjadwalan kerja": 24,
      "Selalu ≤3 menit pencarian dokumen": 24
    }
  },

  "TOTAL_POIN_MAKSIMAL": 1920
};

// Export untuk digunakan di modul lain
if (typeof module !== 'undefined' && module.exports) {
  module.exports = bgcPerformanceCriteria;
}

// Contoh penggunaan:
// bgcPerformanceCriteria["KEAMANAN SIBER"]["Integritas data yang disimpan di pusat data"]["100% data berhasil diverifikasi menggunakan checksum atau hashing"] 
// akan mengembalikan nilai 12
