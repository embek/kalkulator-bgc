/**
 * BGC Calculator - Unified Script
 * Complete BGC (Building Green Certificate) Calculator
 * Combines all functionality in a single file for easier maintenance
 * 
 * Author: GitHub Copilot
 * Version: 1.0.0
 * Date: August 2025
 */

// ========================================
// SECTION 1: BGC PERFORMANCE CRITERIA DATA
// ========================================

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
      "100% implementasi": 27
    },
    "Proteksi login": {
      "Selalu 1 jam waktu blokir akun": 12,
      "Notifikasi langsung saat blokir terjadi": 12
    },
    "Role-Based Access Control (RBAC)": {
      "100% akses dikendalikan dengan RBAC secara konsisten": 27
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
      "100% implementasi": 30
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
      "100% konsistensi data": 18,
      "100% kepatuhan standar data": 18
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
      "≥ 99% akurasi denah lokasi": 15
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

  "TOTAL_POIN_MAKSIMAL": 2010
};

// Faktor Pengali berdasarkan klasifikasi bangunan
const faktorPengali = {
  "BGN Sederhana": { W: 5.0, D: 0.1, S: 0 },
  "Tidak Sederhana": { W: 1.4, D: 0.8, S: 0.2 },
  "Khusus": { W: 1.4, D: 0.5, S: 0.4 },
  "Klas 1a": { W: 4.3, D: 0.3, S: 0.2 },
  "Klas 1b": { W: 4.3, D: 0.3, S: 0.2 },
  "Klas 2": { W: 4.3, D: 0.3, S: 0.2 },
  "Klas 3": { W: 1.8, D: 0.5, S: 0.2 },
  "Klas 4": { W: 1.3, D: 1.2, S: 0.2 },
  "Klas 5": { W: 1.2, D: 0.5, S: 0 },
  "Klas 6": { W: 2.6, D: 0.5, S: 0.1 },
  "Klas 7": { W: 3.8, D: 0, S: 0.1 },
  "Klas 8": { W: 3.2, D: 0.8, S: 0 },
  "Klas 9a": { W: 1.8, D: 0.5, S: 0.2 },
  "Klas 9b": { W: 1.8, D: 0.5, S: 0.2 },
  "Klas 10a": { W: 1.8, D: 0.5, S: 0.2 },
  "Klas 10b": { W: 1.8, D: 0.5, S: 0.2 }
};

// Matriks Implementasi berdasarkan klasifikasi bangunan (W=Wajib, D=Disarankan, S=Sukarela)
const matriksImplementasi = {
  "BGN Sederhana": {
    "KEAMANAN SIBER": {
      "Integritas data yang disimpan di pusat data": "W",
      "Redundansi perangkat keras": "W",
      "Analisis event log": "W",
      "Kontrol akses pada setiap lapisan OSI": "W",
      "Segmentasi jaringan": "W",
      "Enkripsi end-to-end": "W",
      "Sistem kendali akses jaringan": "W",
      "Mekanisme penggantian password standar": "W",
      "Proteksi login": "W",
      "Role-Based Access Control (RBAC)": "W",
      "Manajemen remote": "W",
      "Sistem deteksi intrusi jaringan": "W",
      "Single Sign-On (SSO)": "D",
      "Multi-Factor Authentication (MFA)": "W",
      "Sistem multiakses": "D"
    },
    "PROTOKOL DAN JARINGAN KOMUNIKASI": {
      "Protokol komunikasi standar terbuka": "W",
      "Protokol kompatibel TCP/IP": "W",
      "Optimasi lapisan OSI": "W",
      "Pengelolaan jaringan kabel": "W",
      "Pelabelan infrastruktur kabel": "W",
      "Pengelolaan jaringan nirkabel": "W",
      "Pelabelan infrastruktur nirkabel": "W",
      "Teknologi 5G": "S",
      "Port dan layanan tidak aman": "W",
      "Koneksi kabel di rak server": "W",
      "Kabel patch cord": "W",
      "Quality of Service (QoS)": "W"
    },
    "INTEGRASI DATA DAN SISTEM": {
      "Integrasi dengan BMS": "W",
      "Akuisisi data waktu nyata": "W",
      "Integritas data": "W",
      "Pemrosesan data otomatis": "W",
      "Katalog data terpusat": "W",
      "Standar terbuka untuk interoperabilitas": "W"
    },
    "MANAJEMEN OPERASI": {
      "Perencanaan sistem": "W",
      "Pengorganisasian sistem": "W",
      "Pelatihan dan simulasi": "W",
      "Pengawasan sistem": "W"
    },
    "DAMPAK": {
      "Penghematan energi": "D",
      "Penghematan air": "D",
      "Kepuasan penghuni": "D"
    },
    "KEMAMPUAN SISTEM": {
      "Sistem Alarm Kebencanaan": "W",
      "Sistem Kamera Pengawas": "W",
      "Sistem Kontrol Akses": "W",
      "Sistem Distribusi Video": "D",
      "Sistem Audio Visual": "D",
      "Sistem Jaringan Akses": "W",
      "Sistem Kelistrikan": "W",
      "Sistem Pencahayaan": "W",
      "Sistem Pengondisian Udara": "W",
      "Sistem Ventilasi": "W",
      "Sistem Penyediaan Air Minum": "W",
      "Sistem Pengelolaan Air Limbah": "W",
      "Sistem Pengelolaan Sampah": "D",
      "Sistem Transportasi dalam Gedung": "W",
      "Sistem Parkir": "D",
      "Sistem Pengelolaan Utilitas": "W"
    }
  }
  // Additional classifications would follow the same pattern...
};

// ========================================
// SECTION 2: NAVIGATION CONTROLLER
// ========================================

class NavigationController {
    constructor() {
        this.lastSelectedRadio = {};
        this.init();
    }

    init() {
        this.setupScrollNavigation();
        this.setupRadioButtons();
        this.setupOwnershipToggle();
    }

    setupScrollNavigation() {
        document.querySelectorAll('[data-scroll-to]').forEach(element => {
            element.addEventListener('click', this.handleNavClick.bind(this));
        });
        window.addEventListener('scroll', this.updateActiveNav.bind(this));
    }

    handleNavClick(e) {
        e.preventDefault();
        const targetId = e.target.getAttribute('data-scroll-to');
        const targetElement = document.getElementById(targetId);
        
        if (!targetElement) return;

        // Update navigation states
        document.querySelectorAll('.nav-link').forEach(nav => nav.classList.remove('active'));
        e.target.classList.add('active');

        // Close mobile navbar if open
        const navbar = document.querySelector('.navbar-collapse');
        const toggler = document.querySelector('.navbar-toggler');
        if (navbar?.classList.contains('show')) toggler?.click();

        // Smooth scroll with offset
        const headerOffset = 100;
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }

    updateActiveNav() {
        const sections = document.querySelectorAll('[id^="parameter-"], [id="data-bangunan"], [id="hasil-penilaian"]');
        const navLinks = document.querySelectorAll('[data-scroll-to]');
        const scrollPosition = window.pageYOffset + 150;

        let currentSection = null;
        sections.forEach(section => {
            const { offsetTop: top, offsetHeight: height } = section;
            if (scrollPosition >= top && scrollPosition < top + height) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('data-scroll-to') === currentSection);
        });
    }

    setupRadioButtons() {
        document.querySelectorAll('input[type="radio"]').forEach(radio => {
            radio.addEventListener('click', this.handleRadioClick.bind(this));
            if (radio.checked) this.lastSelectedRadio[radio.name] = radio;
        });
    }

    handleRadioClick(e) {
        const { target: radio } = e;
        const { name } = radio;

        if (this.lastSelectedRadio[name] === radio) {
            radio.checked = false;
            this.lastSelectedRadio[name] = null;
            radio.dispatchEvent(new Event('change'));
        } else {
            this.lastSelectedRadio[name] = radio;
        }
    }

    setupOwnershipToggle() {
        document.querySelectorAll('input[name="kepemilikan"]').forEach(radio => {
            radio.addEventListener('change', this.handleOwnershipChange);
        });
    }

    handleOwnershipChange(e) {
        const bgnContainer = document.getElementById('klasifikasiBgnContainer');
        const nonBgnContainer = document.getElementById('klasNonBgnContainer');
        
        const isBGN = e.target.value === 'BGN';
        bgnContainer.style.display = isBGN ? 'block' : 'none';
        nonBgnContainer.style.display = isBGN ? 'none' : 'block';
    }
}

// ========================================
// SECTION 3: BGC CALCULATOR
// ========================================

class BGCCalculator {
    constructor() {
        this.inputMap = {
            // Parameter A - Keamanan Siber
            'pointVerifikasi': 'integritas_verifikasi',
            'pointDokumentasi': 'integritas_dokumentasi',
            'pointRedundansiPersen': 'redundansi_persen',
            'pointFailover': 'failover',
            'pointAnalisisLog': 'analisis_log',
            'pointDeteksiAnomali': 'deteksi_anomali',
            'pointKontrolAkses': 'kontrol_akses',
            'pointSegmentasiJaringan': 'segmentasi_jaringan',
            'pointPemantauanJaringan': 'pemantauan_jaringan',
            'pointEnkripsiEndToEnd': 'enkripsi_end_to_end',
            'pointKendaliAksesJaringan': 'kendali_akses_jaringan',
            'pointManajemenPassword': 'manajemen_password',
            'pointProteksiLogin': 'proteksi_login',
            'pointRoleBasedAccess': 'role_based_access',
            'pointManajemenRemote': 'manajemen_remote',
            'pointDeteksiIntrusi': 'deteksi_intrusi',
            'pointSingleSignOn': 'single_sign_on',
            'pointMultiFactorAuth': 'multi_factor_auth',
            'pointSistemMultiakses': 'sistem_multiakses',

            // Parameter B - Protokol dan Jaringan Komunikasi (updated to match HTML IDs)
            'pointProtokolStandar': 'protokol_standar',
            'pointProtokolTcpIp': 'protokol_tcpip',
            'pointResponsPengiriman': 'respons_pengiriman',
            'pointTingkatKesalahan': 'tingkat_kesalahan',
            'pointKeberhasilanPaket': 'keberhasilan_paket',
            'pointKoneksiTcp': 'koneksi_tcp',
            'pointSesi': 'sesi',
            'pointEnkripsiDekripsi': 'enkripsi_dekripsi',
            'pointResponsAplikasi': 'respons_aplikasi',
            'pointJaringanKabel': 'jaringan_kabel',
            'pointPelabelan': 'pelabelan',
            'pointJaringanNirkabel': 'jaringan_nirkabel',
            'pointPelabelanNirkabel': 'pelabelan_nirkabel',
            'pointLatensi5g': 'latensi_5g',

            // Parameter C - Integrasi Data dan Sistem
            'pointIntegrasiBms': 'integrasi_bms',
            'pointAkuisisiData': 'akuisisi_data',
            'pointIntegritasData': 'integritas_data_integrasi',
            'pointPemrosesanOtomatis': 'pemrosesan_otomatis',
            'pointKatalogData': 'katalog_data',
            'pointStandarTerbuka': 'standar_terbuka',

            // Parameter D - Manajemen Operasi
            'pointPerencanaan': 'perencanaan',
            'pointPengorganisasian': 'pengorganisasian',
            'pointPelatihan': 'pelatihan',
            'pointPengawasan': 'pengawasan',

            // Parameter E - Dampak
            'pointPenghematanEnergi': 'penghematan_energi',
            'pointPenghematanAir': 'penghematan_air',
            'pointKepuasanPenghuni': 'kepuasan_penghuni',

            // Parameter F - Kemampuan Sistem (need to check HTML for correct IDs)
            'pointAkurasiPengukuran': 'akurasi_pengukuran',
            'pointKontrolOtomatis': 'kontrol_otomatis',
            'pointLaporanEnergi': 'laporan_energi',
            'pointDemandResponse': 'demand_response',
            'pointAlarmAnomali': 'alarm_anomali',
            'pointUptimePencahayaan': 'uptime_pencahayaan',
            'pointKontrolOtomatisPencahayaan': 'kontrol_otomatis_pencahayaan',
            'pointPemantauanPencahayaan': 'pemantauan_pencahayaan',
            'pointPengondisianUdara': 'pengondisian_udara',
            'pointResponsVentilasi': 'respons_ventilasi',
            'pointDeteksiUdaraLuar': 'deteksi_udara_luar',
            'pointKontrolOtomatisVentilasi': 'kontrol_otomatis_ventilasi',
            'pointPrediksiVentilasi': 'prediksi_ventilasi',
            'pointMeterAir': 'meter_air',
            'pointDeteksiKebocoran': 'deteksi_kebocoran',
            'pointResponsDebit': 'respons_debit',
            'pointPembersihanOtomatis': 'pembersihan_otomatis',
            'pointResponsKatup': 'respons_katup',
            'pointPemantauanKualitasAir': 'pemantauan_kualitas_air',
            'pointDeteksiKontaminasi': 'deteksi_kontaminasi',
            'pointOptimisasiDistribusi': 'optimisasi_distribusi',
            'pointResponsVolume': 'respons_volume',
            'pointAkurasiKetinggian': 'akurasi_ketinggian',
            'pointPenggelontoran': 'penggelontoran',
            'pointResponsKebocoranLimbah': 'respons_kebocoran_limbah',
            'pointSistemOverflow': 'sistem_overflow',
            'pointPemantauanKualitasLimbah': 'pemantauan_kualitas_limbah',
            'pointAkurasiSensor': 'akurasi_sensor',
            'pointJaringanIot': 'jaringan_iot',
            'pointInformasiLift': 'informasi_lift',
            'pointResponsBantuan': 'respons_bantuan',
            'pointPengaturanOperasional': 'pengaturan_operasional',
            'pointAntarmukaPengguna': 'antarmuka_pengguna',
            'pointMonitorDarurat': 'monitor_darurat',
            'pointPengendalianJarakJauh': 'pengendalian_jarak_jauh',
            'pointSistemNavigasi': 'sistem_navigasi',
            'pointPembaruanData': 'pembaruan_data',
            'pointDeteksiKebakaran': 'deteksi_kebakaran',
            'pointResponsAlarm': 'respons_alarm',
            'pointIntegrasiSprinkler': 'integrasi_sprinkler',
            'pointNotifikasiKebakaran': 'notifikasi_kebakaran',
            'pointAksesKontrol': 'akses_kontrol',
            'pointMonitoringKeamanan': 'monitoring_keamanan',
            'pointResponDarurat': 'respon_darurat',
            'pointIntegrasiSistem': 'integrasi_sistem'
        };

        this.maxPoints = {
            'A': 390,  // Keamanan Siber
            'B': 318,  // Protokol & Jaringan Komunikasi
            'C': 255,  // Integrasi Data & Sistem
            'D': 177,  // Manajemen Operasi
            'E': 96,   // Dampak
            'F': 774   // Kemampuan Sistem
        };
        
        // Initialize point displays after DOM is ready
        setTimeout(() => this.initializePointDisplays(), 100);
    }

    // Initialize all point displays with consistent data-value="0"
    initializePointDisplays() {
        console.log('🎯 Initializing point displays...');
        
        document.querySelectorAll('.point-display').forEach(display => {
            // Ensure all displays start with "0" and data-value="0"
            if (!display.hasAttribute('data-value') || display.getAttribute('data-value') === '') {
                display.textContent = '0';
                display.setAttribute('data-value', '0');
            }
        });
        
        console.log('✅ Point displays initialized');
    }

    // Calculate points for a parameter with proper selectors
    calculateParameterPoints(parameter) {
        let total = 0;
        
        // Try multiple selectors to find the parameter section
        const selectors = [
            `#parameter-${parameter.toLowerCase()}`,
            `#parameter${parameter}`,
            `[id*="parameter-${parameter.toLowerCase()}"]`,
            `[id*="parameter${parameter}"]`
        ];
        
        for (const selector of selectors) {
            const parameterSection = document.querySelector(selector);
            if (parameterSection) {
                const checkedInputs = parameterSection.querySelectorAll('input:checked');
                total = Array.from(checkedInputs).reduce((sum, input) => {
                    const value = parseInt(input.value) || 0;
                    console.log(`Found input in Parameter ${parameter}: value=${value}, name=${input.name}`);
                    return sum + value;
                }, 0);
                
                console.log(`Parameter ${parameter} total from ${selector}: ${total}`);
                break; // Use the first selector that finds the section
            }
        }
        
        if (total === 0) {
            console.warn(`No checked inputs found for Parameter ${parameter}`);
        }
        
        return total;
    }

    // Calculate category points for a parameter (W/D/S classification)
    calculateParameterCategoryPoints(parameter) {
        const categoryPoints = { W: 0, D: 0, S: 0 };
        
        // Find the parameter section
        const selectors = [
            `#parameter-${parameter.toLowerCase()}`,
            `#parameter${parameter}`,
            `[id*="parameter-${parameter.toLowerCase()}"]`
        ];
        
        let parameterSection = null;
        for (const selector of selectors) {
            parameterSection = document.querySelector(selector);
            if (parameterSection) break;
        }
        
        if (!parameterSection) {
            console.warn(`Parameter section not found for ${parameter}`);
            return categoryPoints;
        }
        
        const checkedInputs = parameterSection.querySelectorAll('input:checked');
        
        // Enhanced categorization logic based on criteria types
        checkedInputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            const inputName = input.name || '';
            
            // Enhanced categorization logic
            if (parameter === 'A') {
                // Parameter A: Most are W (Wajib), some specific ones are D
                if (inputName.includes('single_sign_on') || inputName.includes('multi_factor_auth')) {
                    categoryPoints.D += value;
                } else {
                    categoryPoints.W += value;
                }
            } else if (parameter === 'B') {
                // Parameter B: Most are W, 5G technology is S (Sukarela)
                if (inputName.includes('5g') || inputName.includes('teknologi_5g')) {
                    categoryPoints.S += value;
                } else {
                    categoryPoints.W += value;
                }
            } else if (parameter === 'C') {
                // Parameter C: All are W (Wajib)
                categoryPoints.W += value;
            } else if (parameter === 'D') {
                // Parameter D: All are W (Wajib)
                categoryPoints.W += value;
            } else if (parameter === 'E') {
                // Parameter E: Energy and water are D, satisfaction is S
                if (inputName.includes('kepuasan') || inputName.includes('satisfaction')) {
                    categoryPoints.S += value;
                } else {
                    categoryPoints.D += value;
                }
            } else if (parameter === 'F') {
                // Parameter F: Most are W, some are D
                if (inputName.includes('distribusi_video') || inputName.includes('audio_visual') || inputName.includes('sampah')) {
                    categoryPoints.D += value;
                } else {
                    categoryPoints.W += value;
                }
            } else {
                // Default: treat as W (Wajib)
                categoryPoints.W += value;
            }
        });
        
        console.log(`Parameter ${parameter} category points: W=${categoryPoints.W}, D=${categoryPoints.D}, S=${categoryPoints.S}`);
        return categoryPoints;
    }

    // Update individual point displays
    updateIndividualPoints() {
        document.querySelectorAll('.point-display').forEach(display => {
            const inputName = this.inputMap[display.id];
            if (!inputName) {
                // If no mapping exists, ensure it's set to 0
                display.textContent = '0';
                display.setAttribute('data-value', '0');
                return;
            }

            const points = Array.from(document.querySelectorAll(`input[name="${inputName}"]:checked`))
                .reduce((sum, input) => sum + (parseInt(input.value) || 0), 0);
            
            display.textContent = points;
            display.setAttribute('data-value', points.toString());
        });
    }

    // Calculate multipliers based on building classification
    calculateMultipliers() {
        const ownership = document.querySelector('input[name="kepemilikan"]:checked')?.value;
        let classification = null;

        if (ownership === 'BGN') {
            const bgnClass = document.querySelector('input[name="klasifikasiBgn"]:checked')?.value;
            classification = bgnClass === 'Sederhana' ? 'BGN Sederhana' : bgnClass;
        } else if (ownership === 'Non BGN') {
            classification = document.querySelector('input[name="klasNonBgn"]:checked')?.value;
        }

        // Default multipliers when no classification is selected
        const defaultMultipliers = { W: 1.0, D: 1.0, S: 1.0 };
        
        // Return specific multipliers if classification exists, otherwise default to 1.0
        const multipliers = faktorPengali[classification] || defaultMultipliers;
        
        console.log(`🏢 Building Classification: ${classification || 'Not selected'}`);
        console.log(`📊 Applied Multipliers: W=${multipliers.W}, D=${multipliers.D}, S=${multipliers.S}`);
        
        return multipliers;
    }

    // Calculate totals with proper category breakdown
    calculateTotals() {
        console.log('=== STARTING ENHANCED CALCULATION ===');
        
        const multipliers = this.calculateMultipliers();
        const parameters = ['A', 'B', 'C', 'D', 'E', 'F'];
        
        let totalBase = 0;
        let totalCategoryPoints = { W: 0, D: 0, S: 0 };
        
        // Calculate points for each parameter
        parameters.forEach(param => {
            const basePoints = this.calculateParameterPoints(param);
            const categoryPoints = this.calculateParameterCategoryPoints(param);
            
            // Update parameter subtotal
            const subtotalElement = document.getElementById(`subtotal${param}`);
            if (subtotalElement) {
                subtotalElement.textContent = basePoints;
            }
            
            // Update detail table - base points
            const detailElement = document.getElementById(`detail${param}`);
            if (detailElement) {
                detailElement.textContent = basePoints;
            }
            
            // Update parameter percentage
            const paramMaxPoints = this.maxPoints[param];
            const paramPercentage = basePoints > 0 ? Math.round((basePoints / paramMaxPoints) * 100) : 0;
            const persenElement = document.getElementById(`persen${param}`);
            if (persenElement) {
                persenElement.textContent = `${paramPercentage}%`;
            }
            
            // Add to totals
            totalBase += basePoints;
            totalCategoryPoints.W += categoryPoints.W;
            totalCategoryPoints.D += categoryPoints.D;
            totalCategoryPoints.S += categoryPoints.S;
            
            console.log(`Parameter ${param}: ${basePoints} base points`);
        });
        
        // Apply multipliers to category points
        const enhancedPoints = {
            W: Math.round(totalCategoryPoints.W * multipliers.W),
            D: Math.round(totalCategoryPoints.D * multipliers.D),
            S: Math.round(totalCategoryPoints.S * multipliers.S)
        };
        
        const totalEnhanced = enhancedPoints.W + enhancedPoints.D + enhancedPoints.S;
        const maxPoints = 2010;
        const basePercentage = Math.round((totalBase / maxPoints) * 100);
        const enhancedPercentage = Math.round((totalEnhanced / maxPoints) * 100);
        
        // Update total displays
        const detailTotalElement = document.getElementById('detailTotal');
        if (detailTotalElement) {
            detailTotalElement.textContent = totalBase;
        }
        
        const persenTotalElement = document.getElementById('persenTotal');
        if (persenTotalElement) {
            persenTotalElement.textContent = `${basePercentage}%`;
        }
        
        // Update main displays
        const totalPoinElement = document.getElementById('totalPoin');
        if (totalPoinElement) {
            totalPoinElement.textContent = totalEnhanced;
        }
        
        const persentasePencapaianElement = document.getElementById('persentasePencapaian');
        if (persentasePencapaianElement) {
            persentasePencapaianElement.textContent = `${enhancedPercentage}%`;
        }
        
        // Update classification
        this.updateClassification(enhancedPercentage);
        
        // Update multiplier display
        const multiplierElement = document.getElementById('totalMultiplier');
        if (multiplierElement) {
            multiplierElement.textContent = `W: ${multipliers.W}, D: ${multipliers.D}, S: ${multipliers.S}`;
        }
        
        console.log(`TOTAL BASE POINTS: ${totalBase}`);
        console.log(`TOTAL CATEGORY POINTS: W=${totalCategoryPoints.W}, D=${totalCategoryPoints.D}, S=${totalCategoryPoints.S}`);
        console.log(`ENHANCED POINTS: W=${enhancedPoints.W}, D=${enhancedPoints.D}, S=${enhancedPoints.S}`);
        console.log(`TOTAL ENHANCED: ${totalEnhanced}`);
        console.log(`MULTIPLIERS: W=${multipliers.W}, D=${multipliers.D}, S=${multipliers.S}`);
        console.log(`BASE PERCENTAGE: ${basePercentage}%`);
        console.log(`ENHANCED PERCENTAGE: ${enhancedPercentage}%`);
        
        return { 
            totalBase, 
            totalEnhanced, 
            basePercentage, 
            enhancedPercentage, 
            categoryPoints: totalCategoryPoints,
            enhancedPoints 
        };
    }

    // Update BGC classification based on percentage
    updateClassification(percentage) {
        let classification = 'Belum Dinilai';
        let classType = '';
        
        if (percentage >= 80) {
            classification = 'Utama';
            classType = 'utama';
        } else if (percentage >= 60) {
            classification = 'Madya';
            classType = 'madya';
        } else if (percentage >= 40) {
            classification = 'Pratama';
            classType = 'pratama';
        }
        
        const klasifikasiElement = document.getElementById('klasifikasiBGC');
        if (klasifikasiElement) {
            klasifikasiElement.textContent = classification;
            klasifikasiElement.className = `display-3 bgc-classification ${classType}`;
        }
    }
}

// ========================================
// SECTION 4: STORAGE UTILITIES
// ========================================

class StorageManager {
    static saveData() {
        const formData = new FormData(document.forms[0]);
        const data = Object.fromEntries(formData.entries());
        localStorage.setItem('bgcCalculatorData', JSON.stringify(data));
        console.log('✅ Data saved to localStorage');
    }

    static loadData() {
        const savedData = localStorage.getItem('bgcCalculatorData');
        if (!savedData) return;

        try {
            const data = JSON.parse(savedData);
            Object.entries(data).forEach(([name, value]) => {
                const input = document.querySelector(`input[name="${name}"][value="${value}"]`);
                if (input) {
                    input.checked = true;
                    console.log(`Loaded: ${name} = ${value}`);
                }
            });
            
            console.log('✅ Data loaded from localStorage');
            
            // Update displays after loading
            setTimeout(() => {
                bgcApp.calculator.updateIndividualPoints();
                bgcApp.calculator.calculateTotals();
            }, 100);
            
        } catch (error) {
            console.error('Error loading data:', error);
            localStorage.removeItem('bgcCalculatorData');
        }
    }

    static clearData() {
        localStorage.removeItem('bgcCalculatorData');
        document.querySelectorAll('input[type="radio"], input[type="checkbox"]').forEach(input => {
            input.checked = false;
        });
        this.resetDisplays();
        console.log('✅ Data cleared');
    }

    static resetDisplays() {
        console.log('🔄 Resetting all displays...');
        
        document.querySelectorAll('.point-display').forEach(display => {
            display.textContent = '0';
            display.setAttribute('data-value', '0');
            // Force removal of any inline styles that might interfere
            display.removeAttribute('style');
        });
        
        ['A', 'B', 'C', 'D', 'E', 'F'].forEach(param => {
            const subtotalElement = document.getElementById(`subtotal${param}`);
            const detailElement = document.getElementById(`detail${param}`);
            const persenElement = document.getElementById(`persen${param}`);
            
            if (subtotalElement) subtotalElement.textContent = '0';
            if (detailElement) detailElement.textContent = '0';
            if (persenElement) persenElement.textContent = '0%';
        });
        
        const detailTotalElement = document.getElementById('detailTotal');
        const persenTotalElement = document.getElementById('persenTotal');
        const totalPoinElement = document.getElementById('totalPoin');
        const persentasePencapaianElement = document.getElementById('persentasePencapaian');
        const klasifikasiElement = document.getElementById('klasifikasiBGC');
        
        if (detailTotalElement) detailTotalElement.textContent = '0';
        if (persenTotalElement) persenTotalElement.textContent = '0%';
        if (totalPoinElement) totalPoinElement.textContent = '0';
        if (persentasePencapaianElement) persentasePencapaianElement.textContent = '0%';
        if (klasifikasiElement) {
            klasifikasiElement.textContent = 'Belum Dinilai';
            klasifikasiElement.className = 'display-3 bgc-classification';
        }
    }
}

// ========================================
// SECTION 5: EVENT HANDLERS
// ========================================

class EventManager {
    constructor(calculator) {
        this.calculator = calculator;
        this.init();
    }

    init() {
        this.setupInputListeners();
        this.setupActionButtons();
        this.setupAutoSave();
    }

    setupInputListeners() {
        // Listen for changes on all radio buttons and checkboxes
        document.addEventListener('change', (e) => {
            if (e.target.matches('input[type="radio"], input[type="checkbox"]')) {
                console.log('Input changed:', e.target.name, '=', e.target.value);
                
                // Update individual point displays
                this.calculator.updateIndividualPoints();
                
                // Calculate totals
                this.calculator.calculateTotals();
                
                // Save data
                StorageManager.saveData();
            }
        });

        // Also listen for click events on radio buttons (for deselection functionality)
        document.addEventListener('click', (e) => {
            if (e.target.matches('input[type="radio"], input[type="checkbox"]')) {
                // Small delay to allow the change event to fire first
                setTimeout(() => {
                    this.calculator.updateIndividualPoints();
                    this.calculator.calculateTotals();
                }, 10);
            }
        });
    }

    setupActionButtons() {
        const buttons = {
            resetBtn: () => StorageManager.clearData(),
            clearDataBtn: () => StorageManager.clearData(),
            calculateBtn: () => {
                this.calculator.updateIndividualPoints();
                this.calculator.calculateTotals();
            },
            forceBtn: () => {
                this.calculator.updateIndividualPoints();
                this.calculator.calculateTotals();
                console.log('🔧 Force calculation completed');
            },
            testBtn: () => this.debugTest(),
            exportBtn: () => this.exportToPDF()
        };

        Object.entries(buttons).forEach(([id, handler]) => {
            const button = document.getElementById(id);
            if (button) button.addEventListener('click', handler);
        });
    }

    setupAutoSave() {
        setInterval(() => {
            const hasCheckedInputs = document.querySelector('input:checked');
            if (hasCheckedInputs) StorageManager.saveData();
        }, 30000); // Auto-save every 30 seconds
    }

    debugTest() {
        console.group('🐛 BGC Calculator Debug Information');
        
        // Check if sections exist
        const parameters = ['A', 'B', 'C', 'D', 'E', 'F'];
        parameters.forEach(param => {
            const selectors = [
                `#parameter-${param.toLowerCase()}`,
                `#parameter${param}`,
                `[id*="parameter-${param.toLowerCase()}"]`
            ];
            
            let found = false;
            selectors.forEach(selector => {
                const element = document.querySelector(selector);
                if (element) {
                    const checkedInputs = element.querySelectorAll('input:checked');
                    console.log(`Parameter ${param} (${selector}): ${checkedInputs.length} inputs checked`);
                    found = true;
                }
            });
            
            if (!found) {
                console.warn(`Parameter ${param}: Section not found!`);
            }
        });
        
        console.log('Current totals:', this.calculator.calculateTotals());
        console.log('Multipliers:', this.calculator.calculateMultipliers());
        console.log('Total checked inputs:', document.querySelectorAll('input:checked').length);
        console.log('Available parameter sections:', 
            Array.from(document.querySelectorAll('[id*="parameter"]')).map(el => el.id));
        
        console.groupEnd();
    }

    exportToPDF() {
        console.log('📄 PDF Export feature - Implementation pending');
        alert('Fitur export PDF akan segera tersedia!');
    }

    showAutoSaveIndicator(message = '✓ Tersimpan otomatis') {
        // Remove existing indicator
        const existingIndicator = document.querySelector('.auto-save-indicator');
        if (existingIndicator) {
            existingIndicator.remove();
        }
        
        // Create new indicator
        const indicator = document.createElement('div');
        indicator.className = 'auto-save-indicator';
        indicator.innerHTML = message;
        indicator.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: #28a745;
            color: white;
            padding: 8px 12px;
            border-radius: 4px;
            font-size: 12px;
            z-index: 9999;
            opacity: 0.9;
            transition: opacity 0.3s ease;
        `;
        
        document.body.appendChild(indicator);
        
        // Auto remove after 2 seconds
        setTimeout(() => {
            if (indicator.parentNode) {
                indicator.style.opacity = '0';
                setTimeout(() => {
                    if (indicator.parentNode) {
                        indicator.remove();
                    }
                }, 300);
            }
        }, 2000);
    }
}

// ========================================
// SECTION 6: HTML GENERATOR UTILITIES
// ========================================

class HTMLGenerator {
    static generateParameterSection(parameterCode, parameterName, criteria) {
        const config = {
            containerClass: 'col-12',
            cardClass: 'card border-0 shadow-sm mb-4',
            headerClass: 'card-header bg-primary text-white',
            bodyClass: 'card-body',
            checkboxClass: 'form-check form-check-inline me-3',
            labelClass: 'form-check-label small',
            inputClass: 'form-check-input'
        };

        const generateCriteriaHTML = (criteriaData) => {
            return Object.entries(criteriaData).map(([criteriaName, points]) => {
                if (typeof points === 'object') {
                    return Object.entries(points).map(([subCriteria, subPoints]) => {
                        const inputId = `${parameterCode.toLowerCase()}_${subCriteria.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
                        return `
                            <div class="${config.checkboxClass}">
                                <input class="${config.inputClass}" 
                                       type="checkbox" 
                                       id="${inputId}" 
                                       name="${inputId}" 
                                       value="${subPoints}">
                                <label class="${config.labelClass}" for="${inputId}">
                                    ${subCriteria} (${subPoints} poin)
                                </label>
                            </div>
                        `;
                    }).join('');
                } else {
                    const inputId = `${parameterCode.toLowerCase()}_${criteriaName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}`;
                    return `
                        <div class="${config.checkboxClass}">
                            <input class="${config.inputClass}" 
                                   type="checkbox" 
                                   id="${inputId}" 
                                   name="${inputId}" 
                                   value="${points}">
                            <label class="${config.labelClass}" for="${inputId}">
                                ${criteriaName} (${points} poin)
                            </label>
                        </div>
                    `;
                }
            }).join('');
        };

        return `
            <div class="${config.containerClass}">
                <div class="${config.cardClass}">
                    <div class="${config.headerClass}">
                        <h5 class="mb-0">
                            <i class="fas fa-cogs me-2"></i>
                            Parameter ${parameterCode}: ${parameterName}
                            <span class="badge bg-light text-dark ms-2" id="subtotal${parameterCode}">0</span>
                        </h5>
                    </div>
                    <div class="${config.bodyClass}">
                        ${generateCriteriaHTML(criteria)}
                    </div>
                </div>
            </div>
        `;
    }

    static generateResultsTable() {
        const parameters = [
            { code: 'A', name: 'Keamanan Siber', max: 390 },
            { code: 'B', name: 'Protokol & Jaringan Komunikasi', max: 318 },
            { code: 'C', name: 'Integrasi Data & Sistem', max: 255 },
            { code: 'D', name: 'Manajemen Operasi', max: 177 },
            { code: 'E', name: 'Dampak', max: 96 },
            { code: 'F', name: 'Kemampuan Sistem', max: 774 }
        ];

        const generateTableRows = () => {
            return parameters.map(param => `
                <tr>
                    <td><strong>Parameter ${param.code}</strong><br><small class="text-muted">${param.name}</small></td>
                    <td class="text-center"><span id="detail${param.code}">0</span></td>
                    <td class="text-center">${param.max}</td>
                    <td class="text-center"><span id="persen${param.code}">0%</span></td>
                </tr>
            `).join('');
        };

        return `
            <div class="table-responsive">
                <table class="table table-striped table-hover">
                    <thead class="table-dark">
                        <tr>
                            <th>Parameter</th>
                            <th class="text-center">Poin Tercapai</th>
                            <th class="text-center">Poin Maksimal</th>
                            <th class="text-center">Persentase</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${generateTableRows()}
                    </tbody>
                    <tfoot class="table-secondary">
                        <tr>
                            <th><strong>Total</strong></th>
                            <th class="text-center"><strong id="detailTotal">0</strong></th>
                            <th class="text-center"><strong>2010</strong></th>
                            <th class="text-center"><strong id="persenTotal">0%</strong></th>
                        </tr>
                    </tfoot>
                </table>
            </div>
        `;
    }
}

// ========================================
// SECTION 7: APPLICATION INITIALIZATION
// ========================================

class BGCApp {
    constructor() {
        this.navigation = null;
        this.calculator = null;
        this.eventManager = null;
    }

    init() {
        console.log('🚀 Initializing BGC Calculator...');
        
        // Initialize components
        this.navigation = new NavigationController();
        this.calculator = new BGCCalculator();
        this.eventManager = new EventManager(this.calculator);
        
        // Load saved data
        StorageManager.loadData();
        
        console.log('✅ BGC Calculator initialized successfully!');
    }
}

// ========================================
// SECTION 8: GLOBAL INITIALIZATION
// ========================================

// Create global application instance
const bgcApp = new BGCApp();

// Initialize application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    bgcApp.init();
});

// Export global functions for backward compatibility
window.BGCCalculator = {
    // Core components
    NavigationController,
    BGCCalculator,
    StorageManager,
    EventManager,
    HTMLGenerator,
    
    // Data
    bgcPerformanceCriteria,
    faktorPengali,
    matriksImplementasi,
    
    // Utility functions
    updateIndividualPoints: () => bgcApp.calculator?.updateIndividualPoints(),
    calculateTotal: () => bgcApp.calculator?.calculateTotals(),
    saveData: () => StorageManager.saveData(),
    loadData: () => StorageManager.loadData(),
    clearData: () => StorageManager.clearData(),
    
    // Application instance
    app: bgcApp
};

// Legacy global functions for existing HTML compatibility
window.updateIndividualPoints = () => bgcApp.calculator?.updateIndividualPoints();
window.calculateTotal = () => bgcApp.calculator?.calculateTotals();
window.calculateBGC = () => bgcApp.calculator?.calculateTotals();
window.forceCalculation = () => {
    bgcApp.calculator?.updateIndividualPoints();
    bgcApp.calculator?.calculateTotals();
    console.log('🔧 Force calculation completed');
};
window.testDebug = () => bgcApp.eventManager?.debugTest();
window.exportToPDF = () => bgcApp.eventManager?.exportToPDF();
window.resetForm = () => StorageManager.clearData();
window.clearSavedData = () => StorageManager.clearData();

console.log('📦 BGC Calculator Unified Script Loaded Successfully!');
console.log('📋 Available Components:', Object.keys(window.BGCCalculator));
console.log('🎯 Total Performance Criteria Loaded:', Object.keys(bgcPerformanceCriteria).length);
console.log('⚙️ Multiplier Factors Loaded:', Object.keys(faktorPengali).length);
