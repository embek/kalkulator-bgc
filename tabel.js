const kategori = ['Wajib', 'Disarankan', 'Sukarela']

const daftarElemen = [
    { id: 1, label: "alarm kebencanaan dan pemberitahuan massal" },
    { id: 2, label: "kamera pengawas" },
    { id: 3, label: "kontrol akses" },
    { id: 4, label: "distribusi video dan papan informasi digital" },
    { id: 5, label: "audio visual" },
    { id: 6, label: "jaringan akses kabel dan antena terdistribusi" },
    { id: 7, label: "kelistrikan" },
    { id: 8, label: "pencahayaan" },
    { id: 9, label: "pengondisian udara" },
    { id: 10, label: "ventilasi" },
    { id: 11, label: "penyediaan air minum" },
    { id: 12, label: "pengelolaan air limbah" },
    { id: 13, label: "pengelolaan sampah" },
    { id: 14, label: "transportasi dalam gedung" },
    { id: 15, label: "parkir" },
    { id: 16, label: "pengelolaan utilitas" }
]

const matriks = {
    "Non-BGN": [
        {
            nama: "Klas 1a",
            definisi: "Satu rumah tunggal, satu atau lebih rumah gandeng yang dipisahkan dinding tahan api",
            contoh: "Rumah sederhana, rumah deret, vila, rumah taman",
            implementasi: 'wddssswwdsdddsdd'
        },
        {
            nama: "Klas 1b",
            definisi: "Asrama, hostel atau sejenisnya dengan luas paling besar 300 m2 dan tidak dihuni lebih dari 12 orang",
            contoh: "Kos, losmen, hostel yang luasannya tidak lebih dari 300 m2 dan dihuni tidak lebih dari 12 orang",
            implementasi: 'wddssswwdsdddsdd'
        },
        {
            nama: "Klas 2",
            definisi: "Bangunan gedung hunian yang terdiri atas 2 atau lebih unit hunian, yang masing-masing merupakan tempat tinggal terpisah",
            contoh: "Rumah tidak sederhana",
            implementasi: 'wddssswwdsdddsdd'
        },
        {
            nama: "Klas 3",
            definisi: "Bangunan gedung hunian di luar klas 1 dan 2, yang umum digunakan sebagai tempat tinggal lama atau sementara oleh sejumlah orang yang tidak berhubungan",
            contoh: "Asrama, guest house, losmen, panti, dan sejenisnya",
            implementasi: 'w3w23w23ssswww1sd3d3d3w8d3d3'
        },
        {
            nama: "Klas 4",
            definisi: "Bangunan gedung hunian yang berada di dalam suatu bangunan klas 5, 6, 7, 8, atau 9 dan merupakan tempat tinggal yang ada dalam bangunan tersebut",
            contoh: "Apartemen mix-use",
            implementasi: 'ww2w2ssswww1sw4w4w4w8dd'
        },
        {
            nama: "Klas 5",
            definisi: "Bangunan gedung yang dipergunakan untuk tujuan usaha professional, pengurusan administrasi, atau usaha komersial, di luar bangunan klas 6, 7, 8, atau 9",
            contoh: "Gedung perkantoran, gedung pemerintahan, dan sejenisnya",
            implementasi: 'ww2w2dddwww1w2w2w2w2w8dd'
        },
        {
            nama: "Klas 6",
            definisi: "Bangunan gedung toko atau Bangunan Gedung lain yang dipergunakan untuk tempat penjualan barang-barang secara eceran atau pelayanan kebutuhan langsung kepada masyarakat",
            contoh: "Toko, kedai, restoran, pasar, showroom mobil, dan sejenisnya",
            implementasi: 'wssd5sswww1sddw5sd5d5'
        },
        {
            nama: "Klas 7",
            definisi: "Bangunan gedung yang dipergunakan sebagai penyimpanan",
            contoh: "Gudang dan tempat parkir umum",
            implementasi: 'wssssswww1sssssss'
        },
        {
            nama: "Klas 8",
            definisi: "Bangunan gedung laboratorium dan bangunan gedung yang dipergunakan untuk tempat pemrosesan suatu produksi, perakitan, perubahan, perbaikan, pengepakan, finishing, atau pembersihan barang-barang produksi dalam rangka perdagangan atau penjualan",
            contoh: "Laboratorium, bengkel mobil, pabrik, dan sejenisnya",
            implementasi: 'wssssswww1sdddsss'
        },
        {
            nama: "Klas 9a",
            definisi: "Bangunan gedung umum untuk pelayanan perawatan kesehatan",
            contoh: "Rumah sakit",
            implementasi: 'wdddsd6www1w6dddw8d6d6'
        },
        {
            nama: "Klas 9b",
            definisi: "Bangunan gedung umum pertemuan yang tidak termasuk setiap bagian dari bangunan yang merupakan klas lain",
            contoh: "Sekolah, tempat peribadatan, tempat budaya, bengkel kerja (workshop), dan sejenisnya",
            implementasi: 'wssd7d9swww1d7dddsss'
        },
        {
            nama: "Klas 10a",
            definisi: "Bangunan gedung bukan hunian berupa sarana atau prasarana yang dibangun terpisah",
            contoh: "Garasi pribadi, garasi umum, dan sejenisnya",
            implementasi: 'ssssssssssssssss'
        },
        {
            nama: "Klas 10b",
            definisi: "Struktur berupa sarana atau prasarana yang dibangun terpisah",
            contoh: "Pagar, antena (mast), kolam renang, dan sejenisnya",
            implementasi: 'ssssssssssssssss'
        }
    ],

    "BGN": [
        {
            nama: "Sederhana",
            definisi: "Bangunan gedung dengan teknologi dan spesifikasi sederhana meliputi: 1) Bangunan gedung kantor dan BGN lainnya dengan jumlah lantai sampai dengan 2 lantai; 2) Bangunan gedung kantor dan BGN lainnya dengan luas sampai dengan 500 m2; dan Rumah negara meliputi rumah negara tipe C, tipe D, dan tipe E",
            contoh: "Bangunan gedung kantor sederhana, rumah negara tipe C/D/E",
            implementasi: 'wssssswwssssssss'
        },
        {
            nama: "Tidak Sederhana",
            definisi: "Bangunan gedung dengan teknologi dan spesifikasi tidak sederhana meliputi: 1) Bangunan gedung kantor dan BGN lainnya dengan jumlah lantai lebih dari 2 lantai; 2) Bangunan gedung kantor dan BGN lainnya dengan luas lebih dari 500 m2; dan Rumah negara meliputi rumah negara tipe A dan tipe B",
            contoh: "Bangunan gedung kantor tidak sederhana, rumah negara tipe A/B",
            implementasi: 'wwwssswww1dw3w3w3d2sd'
        },
        {
            nama: "Khusus",
            definisi: "Merupakan: 1) BGN yang memiliki standar khusus, serta dalam perencanaan dan pelaksanaannya memerlukan penyelesaian atau teknologi khusus; 2) BGN yang memiliki tingkat kerahasiaan tinggi untuk kepentingan nasional; 3) BGN yang penyelenggaraannya dapat membahayakan masyarakat di sekitarnya; dan 4) BGN yang memiliki risiko bahaya tinggi",
            contoh: "Istana negara, rumah jabatan matan presiden/wapres/menteri, wisma negara, gedung instalasi nuklir, gedung instalasi pertahanan, gedung terminal udara/laut/darat, stasiun kereta api, stadion/gedung olahraga, rumah tahanan, pusat data, gudang benda berbahaya, gedung monumental, gedung cagar budaya, gedung perwakilan negara",
            implementasi: 'wwwddswww1dwwwd2sd'
        }
    ]
};

const catatanImplementasi = {
    "Non-BGN": {
        1: "Menggunakan sistem pengondisian udara terpusat",
        2: "Bertingkat tinggi atau lebih",
        3: "Hotel",
        4: "Apartemen mix-use",
        5: "Shopping mall",
        6: "Rumah sakit tipe A dan B",
        7: "Museum, pertemuan besar, pameran",
        8: "Lebih dari 15 lantai",
        9: "Gedung perguruan tinggi dan sekolah khusus"
    },
    "BGN": {
        1: "Menggunakan sistem pengondisian udara terpusat",
        2: "Bertingkat tinggi atau lebih"
    }
}

const pengali = {
    "BGN": {
        "Sederhana": {
            katergori: {
                "w": 5.0,
                "d": 1.0,
                's': 0.1
            }
        },
        "Tidak Sederhana": {
            katergori: {
                "w": 1.4,
                "d": 0.8,
                's': 0.2
            }
        },
        "Khusus": {
            katergori: {
                "w": 1.4,
                "d": 0.5,
                's': 0.4
            }
        }
    },
    "Non-BGN": {
        "1a": {
            katergori: {
                "w": 4.3,
                "d": 0.3,
                's': 0.2
            }
        },
        "1b": {
            katergori: {
                "w": 4.3,
                "d": 0.3,
                's': 0.2
            }
        },
        "2": {
            katergori: {
                "w": 4.3,
                "d": 0.3,
                's': 0.2
            }
        },
        "3": {
            katergori: {
                "w": 1.8,
                "d": 0.5,
                's': 0.2
            }
        },
        "4": {
            katergori: {
                "w": 1.3,
                "d": 1.2,
                's': 0.2
            }
        },
        "5": {
            katergori: {
                "w": 1.2,
                "d": 0.5,
                's': 1.0
            }
        },
        "6": {
            katergori: {
                "w": 2.6,
                "d": 0.5,
                's': 0.1
            }
        },
        "7": {
            katergori: {
                "w": 3.8,
                "d": 1.0,
                's': 0.1
            }
        },
        "8": {
            katergori: {
                "w": 3.2,
                "d": 0.8,
                's': 0.1
            }
        },
        "9a": {
            katergori: {
                "w": 2.1,
                "d": 0.3,
                's': 0.8
            }
        },
        "9b": {
            katergori: {
                "w": 3.2,
                "d": 0.4,
                's': 0.1
            }
        },
        "10a": {
            katergori: {
                "w": 1.0,
                "d": 1.0,
                's': 1.0
            }
        },
        "10b": {
            katergori: {
                "w": 1.0,
                "d": 1.0,
                's': 1.0
            }
        }
    }
}

const penilaian = {
    "A": {
        "nama": "Keamanan Siber",
        "maksPoinParameter": 384,
        "kriteriaUnjukKerja": [
            {
                "nama": "Integritas data yang disimpan di pusat data telah dipastikan melalui proses",
                "maksPoinKUK": 24,
                "penjelasan": "Sistem memastikan data tidak berubah selama disimpan atau dikirim dengan menggunakan tanda verifikasi digital dan pencatatan riwayat perubahan",
                "indikator": {
                    "100% data berhasil diverifikasi menggunakan checksum atau hashing": {
                        "tipe": "checkbox",
                        "poin": 12,
                        "contohDokumentasi": "Laporan hasil verifikasi checksum/hashing; konfigurasi algoritma hashing (SHA-256, MD5); log sistem verifikasi data",
                        "penjelasan": "Sistem memastikan semua data tidak berubah dengan cara membuat 'cap jempol digital' unik untuk setiap data. Setiap kali data digunakan, sistem mengecek apakah cap jempolnya masih sama dengan aslinya"
                    },
                    "100% perubahan data atau riwayat versi data terdokumentasi": {
                        "tipe": "checkbox",
                        "poin": 12,
                        "contohDokumentasi": "Audit trail database; version control log; change management report",
                        "penjelasan": "Setiap perubahan data dicatat dengan rinci seperti siapa, kapan, dan apa yang diubah, mirip dengan fitur 'riwayat revisi' di dokumen digital"
                    }
                }
            },
            {
                "nama": "Redundansi perangkat keras",
                "maksPoinKUK": 24,
                "penjelasan": "Komponen kritis seperti server dan jaringan memiliki cadangan yang siap mengambil alih jika terjadi kegagalan",
                "indikator": {
                    "Persentase redundansi perangkat kritikal": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 100% redundansi": 4,
                            "100% redundansi": 12
                        },
                        "contohDokumentasi": "Diagram infrastruktur redundansi; laporan failover test; dokumentasi RTO/RPO",
                        "penjelasan": "Pengukur seberapa banyak perangkat penting memiliki 'cadangan' yang siap menggantikan jika perangkat utama rusak"
                    },
                    "Jumlah failover tanpa gangguan layanan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada informasi mengenai jumlahnya": 0,
                            "Terjadi gangguan selama failover": 4,
                            "Tidak ada gangguan selama failover": 12
                        },
                        "contohDokumentasi": "Incident report; availability monitoring log; failover test result",
                        "penjelasan": "Berapa kali sistem berhasil beralih ke cadangan tanpa terputus layanannya ke pengguna"
                    }
                }
            },
            {
                "nama": "Analisis event log telah dilakukan",
                "maksPoinKUK": 24,
                "penjelasan": "Seluruh aktivitas sistem dicatat dan dianalisis untuk mendeteksi pola mencurigakan atau kesalahan operasional",
                "indikator": {
                    "Frekuensi analisis log otomatis": {
                        "tipe": "radio",
                        "poin": {
                            "Setiap lebih dari 1 menit": 4,
                            "Kadang-kadang setiap 1 menit": 8,
                            "Instant atau real-time dengan maksimal setiap 1 menit": 12
                        },
                        "contohDokumentasi": "Jadwal analisis log; configuration SIEM tools; laporan periodic review",
                        "penjelasan": "Seberapa sering sistem secara otomatis memeriksa catatan aktivitas untuk mencari pola mencurigakan"
                    },
                    "Tingkat deteksi insiden berdasarkan hasil analisis log": {
                        "tipe": "radio",
                        "poin": {
                            "Insiden keamanan tidak dapat dideteksi": 0,
                            "Kurang dari 95% insiden keamanan terdeteksi": 4,
                            "Lebih dari 95% insiden keamanan terdeteksi": 12
                        },
                        "contohDokumentasi": "Incident detection report; false positive/negative ratio; threat intelligence feed",
                        "penjelasan": "Kemampuan sistem menemukan kejadian tidak normal dari pemeriksaan catatan aktivitas"
                    }
                }
            },
            {
                "nama": "Kontrol akses (hardware dan software) pada setiap lapisan Open System Interconnection (OSI) telah diterapkan",
                "maksPoinKUK": 27,
                "penjelasan": "Pembatasan akses diterapkan secara menyeluruh mulai dari tingkat fisik hingga aplikasi",
                "indikator": {
                    "Tingkat penerapan kontrol akses pada layer OSI": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 100% layer diterapkan kontrol akses": 9,
                            "100% layer diterapkan kontrol akses tetapi tidak konsisten": 18,
                            "100% layer selalu diterapkan kontrol akses": 27
                        },
                        "contohDokumentasi": "Network security architecture diagram; access control matrix; firewall rules",
                        "penjelasan": "Penerapan pengamanan di semua tingkat jaringan, dari fisik (pintu terkunci) hingga aplikasi (login user)"
                    }
                }
            },
            {
                "nama": "Segmentasi jaringan untuk membatasi akses dan meminimalkan permukaan serangan",
                "maksPoinKUK": 24,
                "penjelasan": "Jaringan dibagi menjadi zona-zona terpisah untuk membatasi penyebaran gangguan",
                "indikator": {
                    "Jumlah segmen jaringan yang terisolasi": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 3 segmen terisolasi": 4,
                            "≥ 3 segmen terisolasi": 12
                        },
                        "contohDokumentasi": "Network segmentation diagram; VLAN configuration; micro-segmentation policy",
                        "penjelasan": "Banyaknya pembagian jaringan menjadi area-area terpisah untuk membatasi penyebaran masalah"
                    },
                    "Persentase lalu lintas jaringan yang dipantau": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 100% lalu lintas jaringan dipantau": 4,
                            "100% lalu lintas jaringan dipantau tetapi tidak konsisten": 8,
                            "100% lalu lintas jaringan selalu dipantau": 12
                        },
                        "contohDokumentasi": "Network monitoring report; traffic analysis dashboard; NetFlow data",
                        "penjelasan": "Seberapa banyak traffic data yang diawasi untuk mendeteksi aktivitas mencurigakan"
                    }
                }
            },
            {
                "nama": "Dilakukannya enkripsi end-to-end pada data yang dikirim melalui jaringan komunikasi",
                "maksPoinKUK": 30,
                "penjelasan": "Data dienkripsi dari sumber hingga tujuan sehingga tidak dapat dibaca pihak lain selama transmisi",
                "indikator": {
                    "100% data yang dikirim dienkripsi menggunakan standar enkripsi tertentu": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "SSL/TLS certificate; encryption protocol configuration; cryptographic key management",
                        "penjelasan": "Semua data yang dikirim antar sistem dilindungi dengan 'kode rahasia' sehingga tidak bisa dibaca pihak lain"
                    },
                    "100% komunikasi data sensitif menggunakan enkripsi": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "Data classification policy; encryption implementation report; secure communication protocol",
                        "penjelasan": "Khusus untuk data rahasia seperti password atau informasi pribadi, harus selalu menggunakan pengamanan ekstra"
                    }
                }
            },
            {
                "nama": "Sistem kendali akses jaringan pada level kontroler memiliki fitur: Pelaporan dan Analitik, Audit Trail",
                "maksPoinKUK": 27,
                "penjelasan": "Terpusatnya pengelolaan akses jaringan dengan kemampuan pelaporan dan pencatatan aktivitas",
                "indikator": {
                    "Tingkat keberhasilan autentikasi": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 98%": 3,
                            "Minimal 98%": 9
                        },
                        "contohDokumentasi": "Authentication success rate report; failed login analysis; MFA effectiveness report",
                        "penjelasan": "Persentase keberhasilan proses login atau verifikasi identitas pengguna"
                    },
                    "Waktu rata-rata autentikasi": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari dua detik": 3,
                            "Tidak selalu, kadang-kadang 2 detik atau lebih": 6,
                            "Selalu kurang dari 2 detik": 9
                        },
                        "contohDokumentasi": "Authentication latency metrics; performance monitoring data; user experience report",
                        "penjelasan": "Rata-rata waktu yang dibutuhkan dari memasukkan password sampai berhasil masuk sistem"
                    },
                    "Cakupan logging aktivitas": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada pencatatan": 0,
                            "Kurang dari 100% tercatat": 3,
                            "Mencakup 100% aktivitas penting (autentikasi dan perubahan konfigurasi terkait kendali akses)": 9
                        },
                        "contohDokumentasi": "Log coverage assessment; audit trail completeness check; logging policy compliance",
                        "penjelasan": "Seberapa lengkap sistem mencatat semua aktivitas yang terjadi, seperti siapa melakukan apa dan kapan"
                    }
                }
            },
            {
                "nama": "100% tingkat kepatuhan dalam mengimplementasikan mekanisme penggantian password standar saat pertama kali digunakan",
                "maksPoinKUK": 15,
                "penjelasan": "Pengguna diwajibkan mengganti kata sandi default saat pertama kali masuk",
                "indikator": {
                    "Kepatuhan implementasi mekanisme penggantian password": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "Password policy compliance report; user account audit; security configuration check",
                        "penjelasan": "Ketaatan terhadap aturan wajib ganti password pertama kali dan periodic password change"
                    }
                }
            },
            {
                "nama": "Kinerja proteksi login jika ada upaya ganti password gagal sebanyak tiga kali",
                "maksPoinKUK": 24,
                "penjelasan": "Sistem mengunci akun setelah tiga kali percobaan gagal mengganti kata sandi",
                "indikator": {
                    "Waktu blokir akun": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 jam": 4,
                            "Tidak selalu, kadang-kadang 1 jam": 8,
                            "Selalu 1 jam": 12
                        },
                        "contohDokumentasi": "Account lockout policy; incident response time; security event log",
                        "penjelasan": "Lama waktu akun terkunci setelah beberapa kali salah password atau percobaan tidak sah"
                    },
                    "Kecepatan notifikasi pengguna": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada notifikasi pengguna": 0,
                            "Tidak langsung saat blokir terjadi": 4,
                            "Notifikasi langsung saat blokir terjadi": 12
                        },
                        "contohDokumentasi": "Notification system log; alert response time; user communication record",
                        "penjelasan": "Cepatnya sistem memberi tahu user tentang aktivitas mencurigakan atau perubahan penting"
                    }
                }
            },
            {
                "nama": "Dapat dipastikan bahwa hanya pengguna yang terautentikasi yang dapat mengakses sistem serta mengotorisasi fitur dan data berdasarkan peran pengguna",
                "maksPoinKUK": 27,
                "penjelasan": "Hak akses pengguna dibatasi sesuai perannya dalam organisasi",
                "indikator": {
                    "100% akses dikendalikan dengan Role-Based Access Control (RBAC) secara konsisten": {
                        "tipe": "checkbox",
                        "poin": 27,
                        "contohDokumentasi": "RBAC matrix; user role assignment; access review report",
                        "penjelasan": "Semua hak akses diatur berdasarkan jabatan/tugas, misal admin bisa semua, staff hanya sebagian"
                    }
                }
            },
            {
                "nama": "Menerapkan manajemen remote",
                "maksPoinKUK": 27,
                "penjelasan": "Administrator dapat mengelola dan memelihara sistem dari jarak jauh",
                "indikator": {
                    "Tingkat keberhasilan pemrosesan permintaan akses jarak jauh": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 98%": 3,
                            "Tidak selalu, kadang-kadang 98-100%": 6,
                            "Selalu 98-100%": 9
                        },
                        "contohDokumentasi": "Remote access log; VPN connection report; access request workflow",
                        "penjelasan": "Persentase berhasilnya permintaan akses sistem dari luar gedung diproses"
                    },
                    "Waktu rata-rata untuk menyelesaikan permintaan remote, mulai dari saat permintaan diajukan hingga akses diberikan atau ditolak": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 menit": 3,
                            "Tidak selalu, kadang-kadang 1-4 menit": 6,
                            "Selalu 1-4 menit": 9
                        },
                        "contohDokumentasi": "Service Level Agreement compliance; request processing timeline; helpdesk performance report",
                        "penjelasan": "Rata-rata waktu dari pengajuan sampai disetujui/tolak akses remote"
                    },
                    "Jumlah upaya akses tidak sah yang diblokir": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada pemblokiran akses tidak sah": 0,
                            "Kurang dari 100% tidak sah diblokir": 3,
                            "100% akses tidak sah diblokir": 9
                        },
                        "contohDokumentasi": "Intrusion attempt log; firewall block report; security incident record",
                        "penjelasan": "Banyaknya percobaan masuk illegal yang berhasil dicegah sistem"
                    }
                }
            },
            {
                "nama": "Sistem deteksi intrusi jaringan efektif dalam mendeteksi dan memberikan peringatan dini terhadap upaya akses yang tidak sah",
                "maksPoinKUK": 27,
                "penjelasan": "Pemantauan lalu lintas jaringan secara real-time untuk deteksi aktivitas mencurigakan",
                "indikator": {
                    "Waktu rata-rata untuk deteksi intrusi": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 menit": 3,
                            "Tidak selalu, kadang-kadang ≤ 1 menit": 6,
                            "Selalu ≤ 1 menit": 9
                        },
                        "contohDokumentasi": "Detection time metrics; SIEM performance data; threat response timeline",
                        "penjelasan": "Kecepatan sistem mendeteksi percobaan pembobolan sejak terjadi"
                    },
                    "Tingkat deteksi intrusi": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 99,5%": 3,
                            "Tidak selalu, kadang-kadang ≥ 99,5%": 6,
                            "Selalu ≥ 99,5%": 9
                        },
                        "contohDokumentasi": "Detection accuracy report; false alarm rate; threat identification effectiveness",
                        "penjelasan": "Akurasi sistem dalam menemukan serangan yang sebenarnya"
                    },
                    "Waktu rata-rata untuk respons intrusi": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 menit": 3,
                            "Tidak selalu, kadang-kadang ≤ 5 menit": 6,
                            "Selalu ≤ 5 menit": 9
                        },
                        "contohDokumentasi": "Incident response time; SOC performance metrics; emergency procedure execution",
                        "penjelasan": "Kecepatan tim security merespons setelah dapat alert serangan"
                    }
                }
            },
            {
                "nama": "Sistem masuk tunggal (single sign-on) memungkinkan pengguna terautentikasi langsung ke dalam sistem akses setelah terautentikasi di sistem operasi komputer workstation",
                "maksPoinKUK": 24,
                "penjelasan": "Pengguna dapat mengakses multiple sistem setelah sekali login",
                "indikator": {
                    "Waktu rata-rata respons sistem masuk tunggal": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 2 detik": 8,
                            "Kadang-kadang 2 detik atau kurang": 16,
                            "Selalu ≤ 2 detik": 24
                        },
                        "contohDokumentasi": "SSO performance metrics; authentication latency; user experience data",
                        "penjelasan": "Kecepatan proses login sekali untuk semua sistem (single sign-on)"
                    }
                }
            },
            {
                "nama": "Multi-Factor Authentication (MFA) telah diimplementasikan",
                "maksPoinKUK": 24,
                "penjelasan": "Verifikasi identitas menggunakan minimal dua faktor autentikasi",
                "indikator": {
                    "Persentase pengguna yang mengaktifkan MFA": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada yang mengaktifkan MFA": 0,
                            "Kurang dari 100% pengguna dengan akses ke data sensitif": 4,
                            "100% pengguna dengan akses ke data sensitif": 12
                        },
                        "contohDokumentasi": "MFA adoption rate; user enrollment report; security compliance metrics",
                        "penjelasan": "Seberapa banyak user yang sudah menggunakan verifikasi 2 langkah (password + kode/hp)"
                    },
                    "Jumlah metode autentikasi yang didukung": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada metode autentikasi": 0,
                            "Terdapat 1 metode autentikasi": 4,
                            "≥ 2 metode autentikasi": 12
                        },
                        "contohDokumentasi": "Authentication method documentation; supported protocol list; security feature matrix",
                        "penjelasan": "Banyaknya cara verifikasi identitas yang tersedia (password, fingerprint, OTP, dll)"
                    }
                }
            },
            {
                "nama": "Sistem memungkinkan untuk multiakses",
                "maksPoinKUK": 24,
                "penjelasan": "Beberapa pengguna dapat mengakses sistem secara bersamaan tanpa gangguan",
                "indikator": {
                    "Tingkat keberhasilan akses bersamaan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak memungkinkan multiakses": 0,
                            "Kurang dari 99,9% keberhasilan": 4,
                            "≥ 99,9% keberhasilan": 12
                        },
                        "contohDokumentasi": "Concurrent user capacity test; load balancing performance; system scalability report",
                        "penjelasan": "Kemampuan sistem melayani banyak user login bersamaan tanpa error"
                    },
                    "Kapasitas maksimal akses bersamaan": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 5 perangkat": 4,
                            "Tidak selalu, kadang-kadang 5 perangkat": 8,
                            "Selalu ≥ 5 perangkat": 12
                        },
                        "contohDokumentasi": "Load test results; system capacity planning; performance benchmark",
                        "penjelasan": "Batas maksimal user yang bisa pakai sistem bersamaan tanpa turun performa"
                    }
                }
            }
        ]
    },
    "B": {
        "nama": "Protokol dan Jaringan Komunikasi",
        "maksPoinParameter": 327,
        "kriteriaUnjukKerja": [
            {
                "nama": "100% menggunakan perangkat berbasis protokol komunikasi standar terbuka",
                "maksPoinKUK": 30,
                "penjelasan": "Penggunaan protokol yang tersedia untuk umum memastikan integrasi perangkat berbagai vendor",
                "indikator": {
                    "Implementasi protokol standar terbuka": {
                        "tipe": "checkbox",
                        "poin": 30,
                        "contohDokumentasi": "Protocol implementation document; interoperability test report; standards compliance",
                        "penjelasan": "Penggunaan bahasa komunikasi universal antar perangkat berbeda merk"
                    }
                }
            },
            {
                "nama": "100% perangkat jaringan menggunakan protokol komunikasi yang kompatibel dengan TCP/IP, seperti BACnet/IP, Modbus TCP, dan lainnya",
                "maksPoinKUK": 30,
                "penjelasan": "Seluruh perangkat jaringan menggunakan protokol standar yang mendukung interoperabilitas",
                "indikator": {
                    "Tingkat kompatibilitas dengan TCP/IP": {
                        "tipe": "checkbox",
                        "poin": 30,
                        "contohDokumentasi": "TCP/IP compliance test; network device certification; protocol analysis report",
                        "penjelasan": "Kemampuan perangkat menggunakan bahasa internet standar untuk saling terhubung"
                    }
                }
            },
            {
                "nama": "Setiap lapisan OSI dipastikan sudah optimal",
                "maksPoinKUK": 21,
                "penjelasan": "Setiap tingkat model OSI dikonfigurasi untuk komunikasi data yang efektif",
                "indikator": {
                    "Waktu respons pengiriman/permintaan data": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 1 detik": 2,
                            "Selalu ≤ 1 detik": 3
                        },
                        "contohDokumentasi": "Network latency measurement; response time monitoring; QoS performance data",
                        "penjelasan": "Kecepatan kirim-terima data antara perangkat dalam jaringan"
                    },
                    "Tingkat kesalahan pengiriman frame data": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        "contohDokumentasi": "Frame error rate measurement; network quality report; error correction log",
                        "penjelasan": "Persentase error dalam pengiriman paket data dasar di jaringan lokal"
                    },
                    "Tingkat keberhasilan pengiriman paket": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        "contohDokumentasi": "Packet delivery ratio; network reliability metrics; data transmission quality",
                        "penjelasan": "Persentase berhasilnya kirim data sampai tujuan tanpa hilang"
                    },
                    "Tingkat keberhasilan koneksi TCP/UDP": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        "contohDokumentasi": "Connection success rate; protocol performance analysis; network health check",
                        "penjelasan": "Keberhasilan membuat koneksi stabil (TCP) atau cepat (UDP) antar perangkat"
                    },
                    "Tingkat keberhasilan pembentukan sesi": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        "contohDokumentasi": "Session establishment log; connection persistence test; application performance data",
                        "penjelasan": "Kemampuan sistem mempertahankan koneksi aktif selama komunikasi berlangsung"
                    },
                    "Tingkat keberhasilan enkripsi-dekripsi data": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        "contohDokumentasi": "Encryption/decryption success rate; cryptographic operation log; security processor performance",
                        "penjelasan": "Akurasi proses mengunci-buka kode data tanpa error"
                    },
                    "Waktu respons aplikasi": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 1 detik": 2,
                            "Selalu ≤ 1 detik": 3
                        },
                        "contohDokumentasi": "Application response time measurement; user experience metrics; performance monitoring",
                        "penjelasan": "Kecepatan aplikasi merespons perintah user setelah diklik/ditekan"
                    }
                }
            },
            {
                "nama": "100% sudah melakukan implementasi standar tertentu untuk pengelolaan jaringan kabel",
                "maksPoinKUK": 30,
                "penjelasan": "Penerapan tata kelola kabel yang teratur dan terdokumentasi",
                "indikator": {
                    "Implementasi standar pengelolaan jaringan kabel": {
                        "tipe": "checkbox",
                        "poin": 30,
                        "contohDokumentasi": "Cable management standard; rack layout diagram; installation compliance report",
                        "penjelasan": "Penerapan aturan penataan kabel yang rapi dan terorganisir"
                    }
                }
            },
            {
                "nama": "Sudah melakukan implementasi pelabelan infrastruktur kabel dan peralatan sesuai standar konvensi penamaan",
                "maksPoinKUK": 30,
                "penjelasan": "Pemberian label yang jelas dan terstruktur pada semua komponen jaringan",
                "indikator": {
                    "Tingkat implementasi pelabelan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada standar pelabelan dan warna yang diterapkan": 0,
                            "Kurang dari 100% infrastruktur diberi label dan warna sesuai standar": 10,
                            "100% infrastruktur diberi label dan warna sesuai standar": 30
                        },
                        "contohDokumentasi": "Labeling compliance check; asset identification audit; maintenance documentation",
                        "penjelasan": "Kelengkapan pemberian label pada kabel dan perangkat untuk memudahkan identifikasi"
                    }
                }
            },
            {
                "nama": "100% sudah melakukan implementasi standar tertentu untuk pengelolaan jaringan nirkabel (jika ada)",
                "maksPoinKUK": 30,
                "penjelasan": "Pengaturan jaringan nirkabel yang optimal mencakup keamanan dan kinerja",
                "indikator": {
                    "Implementasi standar pengelolaan jaringan nirkabel": {
                        "tipe": "checkbox",
                        "poin": 30,
                        "contohDokumentasi": "Wireless policy implementation; WLAN configuration; security compliance report",
                        "penjelasan": "Penerapan aturan pengaturan WiFi yang aman dan optimal"
                    }
                }
            },
            {
                "nama": "Sudah menerapkan pendekatan umum dalam pelabelan infrastruktur peralatan dan titik akses nirkabel",
                "maksPoinKUK": 27,
                "penjelasan": "Pemberian label pada perangkat nirkabel berdasarkan frekuensi lokasi dan fungsi",
                "indikator": {
                    "Tingkat penerapan pendekatan pelabelan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada pendekatan yang diterapkan": 0,
                            "Kurang dari 100% pendekatan umum diterapkan": 9,
                            "100% pendekatan umum diterapkan": 27
                        },
                        "contohDokumentasi": "SSID naming convention; device labeling standard; network documentation",
                        "penjelasan": "Konsistensi penamaan perangkat nirkabel dan jaringan WiFi"
                    }
                }
            },
            {
                "nama": "Jika digunakan, teknologi 5G dapat menjalankan fitur utama yang ada pada standar 3GPP release 17 atau lebih baru",
                "maksPoinKUK": 24,
                "penjelasan": "Implementasi jaringan 5G dengan fitur canggih seperti latency rendah dan network slicing",
                "indikator": {
                    "Latensi end-to-end": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 ms": 4,
                            "Tidak selalu, kadang-kadang ≤ 1 ms": 8,
                            "Selalu ≤ 1 ms": 12
                        },
                        "contohDokumentasi": "End-to-end latency measurement; network performance test; application response analysis",
                        "penjelasan": "Total waktu kirim data dari sumber sampai penerima termasuk semua proses di jalan"
                    },
                    "Network slice throughput": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 50 Mbps per user": 4,
                            "Tidak selalu, kadang-kadang ≥ 50 Mbps per user": 8,
                            "Selalu ≥ 50 Mbps per user": 12
                        },
                        "contohDokumentasi": "Network slicing performance test; throughput measurement; QoS validation report",
                        "penjelasan": "Kapasitas kirim data untuk jenis layanan tertentu (video, voice, data) di jaringan 5G"
                    }
                }
            },
            {
                "nama": "Mengevaluasi penggunaan port dan layanan pada perangkat berbasis IP",
                "maksPoinKUK": 33,
                "penjelasan": "Pemeriksaan berkala terhadap port jaringan dan layanan yang aktif",
                "indikator": {
                    "Persentase port dan layanan tidak aman yang dinonaktifkan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada penonaktifan port dan layanan tidak aman": 0,
                            "Kurang dari 100% port dan layanan tidak aman dinonaktifkan": 11,
                            "100% port dan layanan tidak aman dinonaktifkan": 33
                        },
                        "contohDokumentasi": "Port security audit; service hardening report; vulnerability assessment",
                        "penjelasan": "Banyaknya celah keamanan yang ditutup dengan mematikan port/layanan tidak perlu"
                    }
                }
            },
            {
                "nama": "Koneksi kabel di rak server telah menggunakan patch panel. Koneksi perangkat berbasis IP telah menggunakan modular jack female",
                "maksPoinKUK": 24,
                "penjelasan": "Penerapan sistem koneksi yang terorganisir untuk kabel jaringan",
                "indikator": {
                    "Persentase penggunaan patch panel untuk koneksi kabel di rak server": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada penggunaan patch panel": 0,
                            "Kurang dari 100% penggunaan": 4,
                            "100% penggunaan": 12
                        },
                        "contohDokumentasi": "Rack layout documentation; patch panel installation; cable management photos",
                        "penjelasan": "Seberapa rapi kabel di rak server diatur menggunakan panel khusus"
                    },
                    "Persentase penggunaan modular jack female untuk koneksi perangkat berbasis IP": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada penggunaan modular jack female": 0,
                            "Kurang dari 100% penggunaan": 4,
                            "100% penggunaan": 12
                        },
                        "contohDokumentasi": "Jack installation report; connectivity standard compliance; network outlet documentation",
                        "penjelasan": "Penggunaan stop kontak jaringan standar untuk kemudahan pemasangan"
                    }
                }
            },
            {
                "nama": "Koneksi perangkat berbasis jaringan IP telah menggunakan kabel patch cord",
                "maksPoinKUK": 30,
                "penjelasan": "Pemanfaatan kabel jaringan standar untuk menghubungkan perangkat IP",
                "indikator": {
                    "Persentase penggunaan kabel patch cord": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada penggunaan kabel patch cord": 0,
                            "Kurang dari 100% penggunaan": 10,
                            "100% penggunaan": 30
                        },
                        "contohDokumentasi": "Patch cord inventory; cable specification compliance; installation documentation",
                        "penjelasan": "Penggunaan kabel jaringan pendek standar untuk hubungkan perangkat"
                    }
                }
            },
            {
                "nama": "Sistem dapat mengelola QoS dengan baik",
                "maksPoinKUK": 18,
                "penjelasan": "Pengaturan prioritas lalu lintas data untuk menjamin kinerja optimal aplikasi kritikal",
                "indikator": {
                    "Tingkat penggunaan bandwidth": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 70-85% penggunaan bandwidth": 1,
                            "70-85% penggunaan bandwidth": 3
                        },
                        "contohDokumentasi": "Bandwidth utilization report; network capacity analysis; traffic monitoring data",
                        "penjelasan": "Seberapa penuh kapasitas jaringan digunakan pada kondisi normal"
                    },
                    "Waktu respons pengiriman/permintaan paket data": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 100 ms": 1,
                            "Tidak selalu, kadang-kadang ≤ 100 ms latensi": 2,
                            "Selalu ≤ 100 ms latensi": 3
                        },
                        "contohDokumentasi": "Packet round-trip time; network latency measurement; application performance",
                        "penjelasan": "Kecepatan proses request-response antara client dan server"
                    },
                    "Tingkat kehilangan paket data": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari ≤ 1% kehilangan": 1,
                            "≤ 1% kehilangan": 3
                        },
                        "contohDokumentasi": "Packet loss measurement; network quality report; error rate analysis",
                        "penjelasan": "Persentase data yang hilang di jalan saat dikirim melalui jaringan"
                    },
                    "Variasi waktu rata-rata pengiriman paket data": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 30 ms": 1,
                            "Tidak selalu, kadang-kadang ≤ 30 ms variasi": 2,
                            "Selalu ≤ 30 ms variasi": 3
                        },
                        "contohDokumentasi": "Jitter measurement report; network stability analysis; QoS performance",
                        "penjelasan": "Ketidakstabilan waktu kirim data yang menyebabkan video/audio tersendat"
                    },
                    "Tingkat keberhasilan prioritasi data dengan prioritas tinggi": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% keberhasilan": 1,
                            "100% keberhasilan": 3
                        },
                        "contohDokumentasi": "QoS policy effectiveness; traffic prioritization test; application performance under load",
                        "penjelasan": "Keberhasilan sistem memberi prioritas data penting (video call) daripada data biasa (email)"
                    },
                    "Tingkat efisiensi alokasi sumber daya jaringan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari ≥ 95% efisiensi": 1,
                            "≥ 95% efisiensi": 3
                        },
                        "contohDokumentasi": "Resource allocation report; network optimization analysis; capacity planning",
                        "penjelasan": "Optimalisasi pembagian bandwidth dan resource jaringan ke berbagai kebutuhan"
                    }
                }
            }
        ]
    },
    "C": {
        "nama": "Integrasi Data dan Sistem",
        "maksPoinParameter": 231,
        "kriteriaUnjukKerja": [
            {
                "nama": "Keberjalanan sistem cerdas harus dapat dimonitor di Building Management System (BMS) dan mendukung interoperabilitas data dengan BMS",
                "maksPoinKUK": 45,
                "penjelasan": "Seluruh sistem cerdas dapat dipantau dan dikendalikan secara terpusat melalui BMS",
                "indikator": {
                    "Frekuensi sinkronisasi data dengan BMS": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 60 detik": 5,
                            "Tidak selalu, kadang-kadang realtime atau setiap ≤ 60 detik": 10,
                            "Selalu realtime atau setiap ≤ 60 detik": 15
                        },
                        "contohDokumentasi": "BMS sync schedule; data integration log; synchronization audit",
                        "penjelasan": "Seberapa sering data dari sistem lain disamakan dengan sistem manajemen gedung pusat"
                    },
                    "100% kelengkapan monitoring data di BMS": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "BMS monitoring dashboard; sensor data completeness check; system integration report",
                        "penjelasan": "Semua parameter gedung (suhu, energi, keamanan) bisa dipantau dari satu dashboard"
                    },
                    "100% kompatibilitas dengan standar dan format data yang diterima BMS": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "Data format compliance; protocol conversion documentation; integration interface spec",
                        "penjelasan": "Kemampuan semua sistem menggunakan 'bahasa' yang dimengerti sistem pusat manajemen gedung"
                    }
                }
            },
            {
                "nama": "Akuisisi data waktu nyata pada level fisik",
                "maksPoinKUK": 39,
                "penjelasan": "Pengumpulan data langsung dari sensor dan perangkat fisik untuk pemantauan real-time",
                "indikator": {
                    "Waktu yang dibutuhkan untuk menangkap data dari sensor atau perangkat fisik": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 detik": 13,
                            "Tidak selalu, kadang-kadang ≤ 1 detik": 26,
                            "Selalu ≤ 1 detik": 39
                        },
                        "contohDokumentasi": "Sensor response time; data acquisition latency; real-time performance test",
                        "penjelasan": "Kecepatan sensor membaca kondisi nyata (suhu, gerakan) dan mengirim ke sistem"
                    }
                }
            },
            {
                "nama": "Data yang digunakan dan dihasilkan oleh berbagai komponen dalam sistem dapat dipastikan tetap utuh, akurat, dan tidak ada konflik ketika dipertukarkan atau diakses di seluruh sistem",
                "maksPoinKUK": 36,
                "penjelasan": "Data dari berbagai sistem tetap konsisten dan akurat saat dipertukarkan",
                "indikator": {
                    "100% konsistensi data yang dipertukarkan atau diakses di seluruh sistem": {
                        "tipe": "checkbox",
                        "poin": 18,
                        "contohDokumentasi": "Data consistency audit; synchronization validation; cross-system data verification",
                        "penjelasan": "Kepastian data sama di semua sistem, tidak berbeda-beda versinya"
                    },
                    "100% kepatuhan terhadap standar data dan format yang disepakati": {
                        "tipe": "checkbox",
                        "poin": 18,
                        "contohDokumentasi": "Data standard compliance; format validation report; interoperability certification",
                        "penjelasan": "Ketaatan semua sistem menggunakan format data yang sudah disepakati bersama"
                    }
                }
            },
            {
                "nama": "Sistem secara cepat memproses dan merespons data yang diperoleh dari sensor, perangkat, atau pengguna dan melakukan tindakan tertentu secara otomatis",
                "maksPoinKUK": 39,
                "penjelasan": "Sistem secara otomatis menganalisis data sensor dan mengambil tindakan diperlukan",
                "indikator": {
                    "Waktu yang dibutuhkan untuk melakukan pemrosesan data dan eksekusi tindakan otomatis": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 10 detik": 13,
                            "Tidak selalu, kadang-kadang ≤ 10 detik": 26,
                            "Selalu ≤ 10 detik": 39
                        },
                        "contohDokumentasi": "Automation response time; decision latency measurement; control system performance",
                        "penjelasan": "Kecepatan sistem menganalisa data sensor dan menjalankan perintah otomatis"
                    }
                }
            },
            {
                "nama": "Memiliki katalog data terpusat yang memudahkan dalam pencarian dan penggunaan data",
                "maksPoinKUK": 39,
                "penjelasan": "Pusat penyimpanan metadata yang memudahkan pencarian dan penggunaan data",
                "indikator": {
                    "Persentase data yang masuk ke dalam katalog data dari semua sumber data yang tersedia": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada data yang masuk katalog data": 0,
                            "Kurang dari 100% data terkatalogkan": 13,
                            "100% data terkatalogkan": 39
                        },
                        "contohDokumentasi": "Data catalog coverage; metadata completeness; data governance report",
                        "penjelasan": "Kelengkapan inventaris data yang tercatat di 'katalog pusat' untuk memudahkan pencarian"
                    }
                }
            },
            {
                "nama": "Standar terbuka telah diadopsi untuk memastikan interoperabilitas data dengan sistem lain",
                "maksPoinKUK": 33,
                "penjelasan": "Penerapan standar teknis yang umum digunakan untuk interoperabilitas",
                "indikator": {
                    "Tingkat kepatuhan terhadap standar terbuka": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada kepatuhan": 0,
                            "Kurang dari 100% kepatuhan": 11,
                            "100% kepatuhan": 33
                        },
                        "contohDokumentasi": "Open standards compliance; interoperability test; vendor neutrality assessment",
                        "penjelasan": "Ketaatan menggunakan teknologi yang bisa bekerja dengan sistem lain tanpa batasan vendor"
                    }
                }
            }
        ]
    },
    "D": {
        "nama": "Manajemen Operasi",
        "maksPoinParameter": 114,
        "kriteriaUnjukKerja": [
            {
                "nama": "Perencanaan pengelolaan sistem cerdas telah dilakukan",
                "maksPoinKUK": 30,
                "penjelasan": "Penyusunan kebijakan prosedur dan pembagian tanggung jawab untuk pengelolaan sistem",
                "indikator": {
                    "Tersedia kebijakan yang telah disusun sebagai landasan pengelolaan sistem cerdas": {
                        "tipe": "checkbox",
                        "poin": 12,
                        "contohDokumentasi": "Smart building policy document; governance framework; management directive",
                        "penjelasan": "Keberadaan dokumen aturan resmi untuk mengelola sistem cerdas gedung"
                    },
                    "Tersedia rincian tugas dan tanggung jawab spesifik yang telah disusun sebagai landasan pengelolaan sistem cerdas": {
                        "tipe": "checkbox",
                        "poin": 9,
                        "contohDokumentasi": "RACI matrix; job description; responsibility assignment",
                        "penjelasan": "Keberadaan dokumen pembagian tugas jelas untuk tim pengelola sistem"
                    },
                    "Tersedia prosedur yang telah disusun untuk operasional sistem cerdas": {
                        "tipe": "checkbox",
                        "poin": 9,
                        "contohDokumentasi": "SOP documentation; operational procedure manual; work instruction",
                        "penjelasan": "Keberadaan dokumen panduan langkah-demi-langkah operasi sistem"
                    }
                }
            },
            {
                "nama": "Pengorganisasian pengelolaan sistem cerdas telah dilakukan",
                "maksPoinKUK": 30,
                "penjelasan": "Penempatan personel dengan kompetensi yang sesuai pada setiap peran",
                "indikator": {
                    "Persentase pemenuhan posisi/roles yang diperlukan untuk pengelolaan sistem cerdas": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak terpenuhi": 0,
                            "Kurang dari 100% pemenuhan": 5,
                            "100% pemenuhan": 15
                        },
                        "contohDokumentasi": "Staffing adequacy report; role fulfillment analysis; organizational structure",
                        "penjelasan": "Kelengkapan staff pengelola sesuai kebutuhan (admin, operator, maintenance)"
                    },
                    "Persentase pengelola sistem cerdas dengan kompetensi yang memenuhi sertifikasi, kualifikasi, atau pengalaman kerja yang dibutuhkan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak terpenuhi": 0,
                            "Kurang dari 100% pemenuhan": 5,
                            "100% pemenuhan": 15
                        },
                        "contohDokumentasi": "Competency matrix; certification record; training completion report",
                        "penjelasan": "Kesesuaian keahlian staff dengan kebutuhan teknis sistem"
                    }
                }
            },
            {
                "nama": "Keberjalanan pelatihan dan simulasi insiden terkait pengelolaan sistem cerdas",
                "maksPoinKUK": 27,
                "penjelasan": "Penyelenggaraan pelatihan berkala dan simulasi penanganan insiden",
                "indikator": {
                    "Frekuensi pelatihan dan simulasi insiden": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 6 bulan sekali": 9,
                            "Tidak selalu, kadang-kadang 6 bulan sekali": 18,
                            "Selalu 6 bulan sekali": 27
                        },
                        "contohDokumentasi": "Training schedule; drill frequency; emergency exercise log",
                        "penjelasan": "Seberapa sering staff dilatih dan simulasi menghadapi masalah darurat"
                    }
                }
            },
            {
                "nama": "Pengawasan pengelolaan sistem cerdas telah dilakukan untuk memastikan keberjalanan",
                "maksPoinKUK": 27,
                "penjelasan": "Pemantauan berkelanjutan terhadap dokumentasi audit kinerja dan pemeliharaan",
                "indikator": {
                    "Frekuensi audit kinerja dan kepatuhan": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 1 kali per 3 bulan": 9,
                            "Tidak selalu, kadang-kadang 1 kali per 3 bulan": 18,
                            "Sekurang-kurangnya 1 kali per 3 bulan": 27
                        },
                        "contohDokumentasi": "Audit calendar; compliance check schedule; performance review frequency",
                        "penjelasan": "Seberapa sering dilakukan pemeriksaan kinerja sistem dan ketaatan aturan"
                    }
                }
            }
        ]
    },
    "E": {
        "nama": "Dampak",
        "maksPoinParameter": 96,
        "kriteriaUnjukKerja": [
            {
                "nama": "Penurunan konsumsi energi yang dicapai melalui penggunaan sistem cerdas",
                "maksPoinKUK": 33,
                "penjelasan": "Pencapaian penghematan energi melalui optimisasi sistem terintegrasi",
                "indikator": {
                    "Persentase penurunan konsumsi energi dalam satu tahun": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 10%": 11,
                            "10 - 25%": 22,
                            ">25%": 33
                        },
                        "contohDokumentasi": "Energy consumption report; savings calculation; utility bill comparison",
                        "penjelasan": "Penghematan pemakaian listrik/tahun berkat sistem cerdas dibanding tahun sebelumnya"
                    }
                }
            },
            {
                "nama": "Penurunan konsumsi air yang dicapai melalui penggunaan sistem cerdas",
                "maksPoinKUK": 33,
                "penjelasan": "Pengurangan penggunaan air melalui teknologi efisiensi dan pengelolaan yang lebih baik",
                "indikator": {
                    "Persentase penurunan konsumsi air dalam satu tahun": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 5%": 11,
                            "5 - 10%": 22,
                            ">10%": 33
                        },
                        "contohDokumentasi": "Water usage report; conservation metrics; consumption analysis",
                        "penjelasan": "Penghematan pemakaian air/tahun berkat sistem pengelolaan air cerdas"
                    }
                }
            },
            {
                "nama": "Kepuasan penghuni dengan adanya fitur otomatisasi sistem cerdas",
                "maksPoinKUK": 30,
                "penjelasan": "Tingkat kepuasan pengguna terhadap fitur otomatisasi yang meningkatkan keamanan dan kenyamanan",
                "indikator": {
                    "Persentase kepuasan penghuni berdasarkan hasil survei": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada survei kepuasan": 0,
                            "60 - 80% kepuasan": 10,
                            "> 80% kepuasan": 30
                        },
                        "contohDokumentasi": "Occupant satisfaction survey; user feedback analysis; service quality report",
                        "penjelasan": "Tingkat puas pengguna gedung terhadap fitur-fitur cerdas yang ada"
                    }
                }
            }
        ]
    },
    "F": {
        "nama": "Kemampuan Sistem",
        "maksPoinParameter": 768,
        "kriteriaUnjukKerja": [
            {
                "nama": "Sistem Alarm Kebencanaan dan Pemberitahuan Massal",
                "maksPoinKUK": 48,
                "penjelasan": "Jaringan sensor dan notifikasi yang dapat mendeteksi bahaya secara dini",
                "indikator": {
                    "Sensor mampu mendeteksi bencana secara cepat dan akurat sesuai kondisi lokasi bangunan": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 10 detik": 6,
                            "Tidak selalu, kadang-kadang ≤ 10 detik": 12,
                            "Selalu ≤ 10 detik": 18
                        },
                        "contohDokumentasi": "Sensor calibration certificate; detection test report; emergency system validation",
                        "penjelasan": "Kemampuan sensor mendeteksi bahaya (kebakaran, gempa) dengan tepat dan cepat"
                    },
                    "100% komponen utama sistem dapat dipantau status keberjalanannya secara jarak jauh": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "Remote monitoring dashboard; system availability check; network connectivity test",
                        "penjelasan": "Semua perangkat penting bisa dicek kondisi online dari mana saja"
                    },
                    "Akurasi denah lokasi deteksi alarm pada panel isyarat": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% akurasi": 5,
                            "≥ 99% akurasi": 15
                        },
                        "contohDokumentasi": "Alarm panel screenshot; location accuracy test; emergency response drill",
                        "penjelasan": "Ketepatan penunjukan lokasi masalah di peta digital gedung"
                    }
                }
            },
            {
                "nama": "Sistem Kamera Pengawas",
                "maksPoinKUK": 48,
                "penjelasan": "Jaringan pengawasan dengan kemampuan rekaman terenkripsi dan deteksi objek",
                "indikator": {
                    "Sistem kamera pengawas dapat melakukan perekaman menggunakan DVR/NVR dengan 100% data yang terenkripsi": {
                        "tipe": "checkbox",
                        "poin": 3,
                        "contohDokumentasi": "DVR/NVR configuration; encryption setup; recording verification",
                        "penjelasan": "Kamera merekam dan menyimpan video dengan pengamanan data otomatis"
                    },
                    "Waktu rata-rata pengiriman paket video dari kamera ke pusat kontrol": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 2,
                            "Selalu ≤ 5 detik": 3
                        },
                        "contohDokumentasi": "Video streaming latency; network performance; real-time monitoring test",
                        "penjelasan": "Kecepatan kirim video live dari kamera ke ruang monitor"
                    },
                    "Resolusi dan kualitas video digital pada semua kamera pengawas": {
                        "tipe": "radio",
                        "poin": {
                            "Semua kurang dari 720p": 1,
                            "Tidak semua ≥ 720p": 2,
                            "Semua ≥ 720p": 3
                        },
                        "contohDokumentasi": "Video quality report; resolution verification; image clarity test",
                        "penjelasan": "Tingkat kejernihan dan detail gambar semua kamera pengawas"
                    },
                    "Kecepatan respons interkom setelah pengguna menekan tombol atau memberikan perintah suara": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 2 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 2 detik": 2,
                            "Selalu ≤ 2 detik": 3
                        },
                        "contohDokumentasi": "Intercom response time test; voice communication quality; system performance",
                        "penjelasan": "Waktu tunggu dari tekan tombol sampai ada respons suara"
                    },
                    "Persentase akurasi deteksi gerakan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Motion detection test report; accuracy measurement; false alarm analysis",
                        "penjelasan": "Ketepatan sistem mendeteksi pergerakan orang/objek di area pantau"
                    },
                    "Persentase akurasi deteksi objek": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Object detection validation; AI model accuracy; recognition performance",
                        "penjelasan": "Ketepatan sistem mengenali jenis objek (orang, mobil, dll) dalam video"
                    },
                    "Persentase akurasi pelacakan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Object tracking test; movement analysis; surveillance effectiveness",
                        "penjelasan": "Ketepatan sistem mengikuti pergerakan objek bergerak dalam video"
                    },
                    "Persentase akurasi rekognisi": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Recognition accuracy report; biometric performance; identification test",
                        "penjelasan": "Ketepatan sistem mengenali identitas spesifik (wajah, plat nomor)"
                    },
                    "Persentase akurasi masking": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Privacy masking test; redaction accuracy; compliance with privacy policy",
                        "penjelasan": "Ketepatan sistem menyensor area privat dalam video secara otomatis"
                    },
                    "Persentase akurasi perhitungan jumlah orang": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "People counting validation; occupancy measurement; crowd analysis",
                        "penjelasan": "Ketepatan sistem menghitung jumlah orang di area tertentu"
                    },
                    "Persentase perekaman otomatis berdasarkan pengaturan jadwal, event, atau rekaman berkesinambungan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% terekam": 1,
                            "≥ 99% terekam": 3
                        },
                        "contohDokumentasi": "Recording schedule configuration; event-based recording log; continuous recording audit",
                        "penjelasan": "Kemampuan sistem merekam sesuai jadwal atau saat ada kejadian tertentu"
                    },
                    "Availabilitas sistem manajemen video terpusat": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% availability": 1,
                            "≥ 99% availability": 3
                        },
                        "contohDokumentasi": "VMS availability report; uptime monitoring; system reliability",
                        "penjelasan": "Persentase waktu sistem pusat pengelolaan video bisa diakses dan berfungsi"
                    },
                    "Persentase area publik yang terjangkau kamera": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% area": 1,
                            "100% area": 3
                        },
                        "contohDokumentasi": "Camera coverage map; blind spot analysis; surveillance area assessment",
                        "penjelasan": "Cakupan wilayah umum yang bisa dipantau oleh kamera pengawas"
                    },
                    "Durasi penyimpanan video": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 30 hari": 1,
                            "≥ 30 hari": 3
                        },
                        "contohDokumentasi": "Retention policy compliance; storage capacity planning; archive management",
                        "penjelasan": "Lama waktu rekaman video disimpan sebelum dihapus otomatis"
                    },
                    "Persentase perangkat aktif jaringan yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 1,
                            "≥ 90% perangkat": 3
                        },
                        "contohDokumentasi": "PoE-enabled AV equipment list; power requirement analysis; system design",
                        "penjelasan": "Banyaknya perangkat AV (speaker, display) yang bisa powered via ethernet"
                    },
                    "Persentase perangkat pasif jaringan yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 1,
                            "100% perangkat": 3
                        },
                        "contohDokumentasi": "Network infrastructure for AV; PoE switch configuration; power delivery capacity",
                        "penjelasan": "Banyaknya komponen pendukung AV network yang kompatibel PoE"
                    }
                }
            },
            {
                "nama": "Sistem Kontrol Akses",
                "maksPoinKUK": 48,
                "penjelasan": "Pengaturan akses masuk dengan fitur antipassback dan monitoring real-time",
                "indikator": {
                    "Tingkat fluktuasi tegangan yang diterima perangkat periferal": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu melebihi ±5%": 2,
                            "Tidak selalu, kadang-kadang ±5%": 4,
                            "Selalu ±5%": 6
                        },
                        "contohDokumentasi": "Power quality report; voltage stability measurement; electrical system check",
                        "penjelasan": "Kestabilan daya listrik yang diterima perangkat tambahan"
                    },
                    "Persentase waktu aktif perangkat periferal": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99,9%": 2,
                            "≥ 99,9%": 6
                        },
                        "contohDokumentasi": "Peripheral uptime report; device availability; maintenance record",
                        "penjelasan": "Waktu operasional perangkat tambahan (printer, scanner) tanpa gangguan"
                    },
                    "Jumlah temuan pengguna yang melakukan passback/global passback": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Lebih dari 0 pengguna": 3,
                            "0 pengguna": 9
                        },
                        "contohDokumentasi": "Passback violation report; access control audit; security incident",
                        "penjelasan": "Banyaknya pelanggaran aturan akses ganda tanpa keluar-masuk area"
                    },
                    "Jumlah kendala dalam pengaturan akses pengguna berdasarkan area, tanggal dan waktu": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Lebih dari 0 kendala": 3,
                            "0 kendala": 9
                        },
                        "contohDokumentasi": "Access configuration issue log; system troubleshooting; user management problem",
                        "penjelasan": "Banyaknya masalah teknis dalam mengatur jadwal dan lokasi akses user"
                    },
                    "Tingkat ketersediaan fitur perhitungan penghuni di titik kumpul (mustering point) saat kondisi darurat": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% tersedia": 3,
                            "100% tersedia": 9
                        },
                        "contohDokumentasi": "Mustering system test; emergency drill result; evacuation management",
                        "penjelasan": "Kemampuan sistem menghitung orang di titik evakuasi saat darurat"
                    },
                    "Jumlah kendala dalam fitur penonaktifan kredensial akses secara otomatis saat akun tidak digunakan sama sekali": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Lebih dari 0 kendala": 3,
                            "0 kendala": 9
                        },
                        "contohDokumentasi": "Auto-disable feature test; credential management issue; system error log",
                        "penjelasan": "Banyaknya masalah teknis dalam menonaktifkan kartu akses tidak aktif"
                    }
                }
            },
            {
                "nama": "Sistem Digital Distribusi Video dan Papan Informasi",
                "maksPoinKUK": 48,
                "penjelasan": "Penyebaran konten multimedia dan informasi digital ke berbagai lokasi",
                "indikator": {
                    "Kualitas visual video setelah kompresi berdasarkan skor PSNR atau SSIM": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% kesamaan": 2,
                            "≥ 95% kesamaan": 6
                        },
                        "contohDokumentasi": "Video compression analysis; quality metrics report; codec performance",
                        "penjelasan": "Tingkat kejernihan video setelah diperkecil ukuran filenya"
                    },
                    "Kompatibilitas format file video": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% kompatibilitas": 2,
                            "100% kompatibilitas": 6
                        },
                        "contohDokumentasi": "Supported format list; playback compatibility test; file format validation",
                        "penjelasan": "Kemampuan sistem memutar berbagai jenis format video standar"
                    },
                    "Waktu latency pengiriman data multimedia dari sumber ke tujuan": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 0,1 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 0,1 detik": 4,
                            "Selalu ≤ 0,1 detik": 6
                        },
                        "contohDokumentasi": "Streaming latency measurement; network delay; real-time performance",
                        "penjelasan": "Keterlambatan kirim video/audio dari sumber ke pemirsa"
                    },
                    "Jumlah data yang berhasil dikirimkan dalam satuan waktu": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 5 Mbps": 2,
                            "Tidak selalu, kadang-kadang ≥ 5 Mbps": 4,
                            "Selalu ≥ 5 Mbps": 6
                        },
                        "contohDokumentasi": "Bandwidth measurement; data transfer rate; network capacity",
                        "penjelasan": "Kapasitas kirim data multimedia per detik (throughput)"
                    },
                    "Tingkat keberhasilan event perekaman penjadwalan dan streaming on demand": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% keberhasilan": 4,
                            "100% keberhasilan": 12
                        },
                        "contohDokumentasi": "Recording success rate; on-demand service reliability; event scheduling log",
                        "penjelasan": "Keberhasilan sistem merekam dan menayangkan sesuai jadwal atau permintaan"
                    },
                    "Persentase perangkat aktif jaringan yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 2,
                            "≥ 90% perangkat": 6
                        },
                        "contohDokumentasi": "PoE-enabled AV equipment list; power requirement analysis; system design",
                        "penjelasan": "Banyaknya perangkat AV (speaker, display) yang bisa powered via ethernet"
                    },
                    "Persentase perangkat pasif jaringan yang mendukung PoE, termasuk kabel": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 2,
                            "100% perangkat": 6
                        },
                        "contohDokumentasi": "PoE infrastructure audit; cable specification; connectivity standard",
                        "penjelasan": "Banyaknya infrastruktur pendukung (kabel, port) yang mendukung daya lewat ethernet"
                    }
                }
            },
            {
                "nama": "Sistem Audio Visual",
                "maksPoinKUK": 48,
                "penjelasan": "Infrastruktur presentasi dan komunikasi yang dapat dikontrol terpusat",
                "indikator": {
                    "Persentase komponen sistem audio visual yang dapat dipantau real-time dan dikontrol": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% komponen": 8,
                            "100% komponen": 24
                        },
                        "contohDokumentasi": "AV system monitoring dashboard; device control interface; integration report",
                        "penjelasan": "Kelengkapan pemantauan online perangkat sound system dan display"
                    },
                    "Persentase perangkat aktif jaringan yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 4,
                            "≥ 90% perangkat": 12
                        },
                        "contohDokumentasi": "PoE-enabled AV equipment list; power requirement analysis; system design",
                        "penjelasan": "Banyaknya perangkat AV (speaker, display) yang bisa powered via ethernet"
                    },
                    "Persentase perangkat pasif jaringan yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 4,
                            "100% perangkat": 12
                        },
                        "contohDokumentasi": "Network infrastructure for AV; PoE switch configuration; power delivery capacity",
                        "penjelasan": "Banyaknya komponen pendukung AV network yang kompatibel PoE"
                    }
                }
            },
            {
                "nama": "Sistem Jaringan Akses Kabel dan Antena Terdistribusi",
                "maksPoinKUK": 48,
                "penjelasan": "Infrastruktur komunikasi yang mendukung layanan data suara dan video terintegrasi",
                "indikator": {
                    "100% status perangkat triple play termonitor dalam perangkat lunak manajemen": {
                        "tipe": "checkbox",
                        "poin": 24,
                        "contohDokumentasi": "Triple play monitoring system; service status dashboard; network management",
                        "penjelasan": "Semua perangkat layanan 3-in-1 (data, suara, video) bisa dipantau dari software pusat"
                    },
                    "Ketersediaan fitur tambahan waktu-nyata (panggilan video, konferensi, streaming multicast)": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak tersedia": 0,
                            "Kurang dari 100% tersedia": 8,
                            "100% tersedia": 24
                        },
                        "contohDokumentasi": "Real-time feature validation; service capability test; performance benchmark",
                        "penjelasan": "Kemampuan sistem mendukung layanan real-time seperti video call dan siaran langsung"
                    }
                }
            },
            {
                "nama": "Sistem Kelistrikan",
                "maksPoinKUK": 48,
                "penjelasan": "Manajemen daya dengan pemantauan konsumsi real-time dan kontrol otomatis",
                "indikator": {
                    "Akurasi pengukuran penggunaan energi pada setiap perangkat": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 99% akurasi": 4,
                            "≥ 99% akurasi": 12
                        },
                        "contohDokumentasi": "Energy meter calibration; measurement accuracy test; consumption validation",
                        "penjelasan": "Ketepatan alat ukur listrik dalam mencatat pemakaian energi tiap perangkat"
                    },
                    "Akurasi kontrol otomatis peralatan berdasarkan pola penggunaan energi atau jadwal tertentu 100%": {
                        "tipe": "checkbox",
                        "poin": 9,
                        "contohDokumentasi": "Automation accuracy report; schedule compliance; control system validation",
                        "penjelasan": "Ketepatan sistem menyalakan/mematikan perangkat sesuai jadwal atau kebiasaan pemakaian"
                    },
                    "Kelengkapan data tren, pola konsumsi energi  100% dan identifikasi peluang penghematan energi pada dashboard": {
                        "tipe": "checkbox",
                        "poin": 9,
                        "contohDokumentasi": "Energy analytics dashboard; trend analysis report; conservation opportunity",
                        "penjelasan": "Ketersediaan lengkap grafik analisis pemakaian energi dan saran penghematan"
                    },
                    "Persentase pengurangan konsumsi energi melalui demand response pada waktu beban puncak": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 10% pengurangan": 3,
                            "≥ 10% pengurangan": 9
                        },
                        "contohDokumentasi": "Demand response performance; peak shaving report; energy cost savings",
                        "penjelasan": "Penghematan energi saat listrik mahal dengan mengurangi pemakaian tidak penting"
                    },
                    "Akurasi alarm otomatis untuk anomali daya listrik": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% akurasi": 3,
                            "≥ 99% akurasi": 9
                        },
                        "contohDokumentasi": "Power anomaly detection; alarm accuracy test; emergency notification",
                        "penjelasan": "Ketepatan sistem memberi peringatan saat ada masalah kelistrikan"
                    }
                }
            },
            {
                "nama": "Sistem Pencahayaan",
                "maksPoinKUK": 48,
                "penjelasan": "Kontrol pencahayaan adaptif berdasarkan kondisi lingkungan",
                "indikator": {
                    "Tingkat ketersediaan sistem kontrol pencahayaan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99,5% uptime": 16,
                            "≥ 99,5% uptime": 48
                        },
                        "contohDokumentasi": "Lighting control uptime; system reliability; maintenance record",
                        "penjelasan": "Waktu operasional sistem lampu otomatis tanpa gangguan"
                    }
                }
            },
            {
                "nama": "Sistem Pengondisian Udara",
                "maksPoinKUK": 48,
                "penjelasan": "Regulasi iklim dalam ruangan dengan pemantauan parameter HVAC",
                "indikator": {
                    "Persentase parameter operasional yang dapat dipantau oleh sistem": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% parameter": 16,
                            "100% parameter": 48
                        },
                        "contohDokumentasi": "Operational parameter monitoring; sensor data completeness; system health check",
                        "penjelasan": "Kelengkapan pemantauan kondisi kerja perangkat (suhu, tekanan, status)"
                    }
                }
            },
            {
                "nama": "Sistem Ventilasi",
                "maksPoinKUK": 48,
                "penjelasan": "Pengaturan pertukaran udara berdasarkan kualitas udara dalam dan luar ruangan",
                "indikator": {
                    "Waktu respons sistem ventilasi terhadap perubahan parameter kualitas udara": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 30 detik": 4,
                            "Tidak selalu, kadang-kadang ≤ 30 detik": 8,
                            "Selalu ≤ 30 detik": 12
                        },
                        "contohDokumentasi": "Ventilation response time; air quality control performance; automation speed",
                        "penjelasan": "Kecepatan sistem udara menyesuaikan saat kualitas udara berubah"
                    },
                    "Tingkat ketepatan deteksi kualitas udara luar": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 98% akurasi": 4,
                            "≥ 98% akurasi": 12
                        },
                        "contohDokumentasi": "Outdoor air quality sensor calibration; detection accuracy; environmental monitoring",
                        "penjelasan": "Akurasi sensor dalam membaca kondisi udara lingkungan luar gedung"
                    },
                    "Akurasi kontrol otomatis berdasarkan kondisi lingkungan atau pola keberadaan penghuni": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% akurasi": 4,
                            "≥ 95% akurasi": 12
                        },
                        "contohDokumentasi": "Environmental control validation; occupancy-based automation; comfort system performance",
                        "penjelasan": "Ketepatan sistem mengatur suhu/ventilasi sesuai jumlah orang dan kondisi"
                    },
                    "Akurasi prediksi perubahan kualitas udara menggunakan kecerdasan buatan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 90% akurasi": 4,
                            "≥ 90% akurasi": 12
                        },
                        "contohDokumentasi": "AI prediction accuracy; machine learning performance; forecast validation",
                        "penjelasan": "Ketepatan sistem AI memperkirakan perubahan kualitas udara sebelum terjadi"
                    }
                }
            },
            {
                "nama": "Sistem Penyediaan Air Minum",
                "maksPoinKUK": 48,
                "penjelasan": "Pengelolaan air bersih dengan monitoring kualitas dan deteksi kebocoran",
                "indikator": {
                    "Akurasi meter air cerdas dalam mengukur volume air secara waktu-nyata ≥ 95%": {
                        "tipe": "checkbox",
                        "poin": 9,
                        "contohDokumentasi": "Water meter calibration certificate; accuracy test report; measurement validation",
                        "penjelasan": "Ketepatan alat ukur air digital dalam mencatat pemakaian real-time"
                    },
                    "Waktu deteksi indikasi kebocoran air dan menginformasikan ke pihak terkait": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 jam": 3,
                            "Tidak selalu, kadang-kadang ≤ 1 jam": 6,
                            "Selalu ≤ 1 jam": 9
                        },
                        "contohDokumentasi": "Leak detection response time; notification system performance; emergency alert",
                        "penjelasan": "Kecepatan sistem menemukan tanda kebocoran dan memberi tahu maintenance"
                    },
                    "Waktu respons perubahan debit dan tekanan air oleh ADRS": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 4,
                            "Selalu ≤ 5 detik": 6
                        },
                        "contohDokumentasi": "ADRS performance test; flow control response; pressure adjustment speed",
                        "penjelasan": "Kecepatan sistem menyesuaikan aliran dan tekanan air sesuai kebutuhan"
                    },
                    "Tingkat kesesuaian waktu automated cleaning 100%": {
                        "tipe": "checkbox",
                        "poin": 6,
                        "contohDokumentasi": "Cleaning schedule compliance; automation timing accuracy; maintenance log",
                        "penjelasan": "Ketepatan jadwal pembersihan otomatis sistem perpipaan sesuai rencana"
                    },
                    "Waktu respons katup cerdas sejak perintah dikirim": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 4,
                            "Selalu ≤ 5 detik": 6
                        },
                        "contohDokumentasi": "Valve response time test; remote control performance; actuator speed",
                        "penjelasan": "Kecepatan katup air menutup/membuka setelah dapat perintah remote"
                    },
                    "Persentase parameter kualitas air minum yang terpantau real-time": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 100%": 2,
                            "Tidak selalu 100%": 4,
                            "100% parameter selalu terpantau secara waktu-nyata": 6
                        },
                        "contohDokumentasi": "Water quality monitoring dashboard; parameter coverage; real-time sensor data",
                        "penjelasan": "Kelengkapan pemantauan kondisi air minum (kejernihan, pH, bakteri)"
                    },
                    "Persentase keberhasilan deteksi dini kebocoran air": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% keberhasilan": 2,
                            "≥ 95% keberhasilan": 6
                        },
                        "contohDokumentasi": "Leak detection effectiveness; early warning success rate; prevention system",
                        "penjelasan": "Akurasi sistem dalam menemukan kebocoran air sebelum jadi masalah besar"
                    }
                }
            },
            {
                "nama": "Sistem Pengelolaan Air Limbah",
                "maksPoinKUK": 48,
                "penjelasan": "Pemantauan dan pengolahan air limbah termasuk parameter kualitas dan volume",
                "indikator": {
                    "Waktu respons terhadap perubahan volume air limbah": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 3 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 3 detik": 4,
                            "Selalu ≤ 3 detik": 6
                        },
                        "contohDokumentasi": "Wastewater response time; flow change reaction; treatment system performance",
                        "penjelasan": "Kecepatan sistem menanggapi fluktuasi volume air buangan"
                    },
                    "Akurasi pengukuran ketinggian muka air limbah": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu melebihi ± 5%": 2,
                            "Tidak selalu, kadang-kadang ≤ 5%": 4,
                            "Selalu ≤ 5%": 6
                        },
                        "contohDokumentasi": "Level sensor calibration; measurement accuracy; tank monitoring",
                        "penjelasan": "Ketepatan alat ukur dalam membaca level air limbah di bak penampung"
                    },
                    "Waktu respons penggelontoran otomatis": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 menit": 4,
                            "Tidak selalu, kadang-kadang 5 menit": 8,
                            "Selalu ≤ 5 menit": 12
                        },
                        "contohDokumentasi": "Flushing system response; automation timing; cleaning cycle",
                        "penjelasan": "Kecepatan sistem melakukan flush otomatis saat diperlukan"
                    },
                    "Waktu respons deteksi kebocoran": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 3 detik": 4,
                            "Tidak selalu, kadang-kadang 3 detik": 8,
                            "Selalu ≤ 3 detik": 12
                        },
                        "contohDokumentasi": "Leak detection speed; sewer monitoring performance; pipeline integrity",
                        "penjelasan": "Kecepatan sistem menemukan kebocoran di jaringan air limbah"
                    },
                    "Waktu ketersediaan data monitoring kualitas air limbah secara waktu-nyata": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 30 detik": 4,
                            "Tidak selalu, kadang-kadang 30 detik": 8,
                            "Selalu ≤ 30 detik": 12
                        },
                        "contohDokumentasi": "Wastewater monitoring uptime; data availability; system reliability",
                        "penjelasan": "Kelancaran akses data kondisi air limbah secara real-time di dashboard"
                    }
                }
            },
            {
                "nama": "Sistem Pengelolaan Sampah",
                "maksPoinKUK": 48,
                "penjelasan": "Pengawasan tingkat pengisian tempat sampah dan optimalisasi pengumpulan",
                "indikator": {
                    "Akurasi sensor tingkat pengisian wadah sampah": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% akurasi": 8,
                            "≥ 95% akurasi": 24
                        },
                        "contohDokumentasi": "Fill level sensor calibration; accuracy test; waste monitoring",
                        "penjelasan": "Ketepatan sensor dalam mengukur seberapa penuh tempat sampah"
                    },
                    "Persentase penggunaan Wi-Fi atau LPWAN untuk perangkat IoT": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 100%": 8,
                            "Kadang-kadang 100%": 16,
                            "Selalu 100%": 24
                        },
                        "contohDokumentasi": "IoT network architecture; connectivity report; wireless technology adoption",
                        "penjelasan": "Banyaknya perangkat IoT yang menggunakan jaringan nirkabel khusus"
                    }
                }
            },
            {
                "nama": "Sistem Transportasi dalam Gedung",
                "maksPoinKUK": 48,
                "penjelasan": "Manajemen lift dan transportasi vertikal dengan monitoring kondisi",
                "indikator": {
                    "Ketersediaan informasi pada layar lift": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99,9% availability": 2,
                            "≥ 99,9% availability": 6
                        },
                        "contohDokumentasi": "Lift display content; information availability; passenger communication",
                        "penjelasan": "Kelengkapan info yang ditampilkan di monitor lift (lantai, status, pengumuman)"
                    },
                    "Waktu respons TAS terhadap permintaan bantuan darurat": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 30 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 30 detik": 4,
                            "Selalu ≤ 30 detik": 6
                        },
                        "contohDokumentasi": "Emergency response time; TAS performance; passenger assistance",
                        "penjelasan": "Kecepatan sistem bantuan darurat lift merespons panggilan distress"
                    },
                    "Waktu respons pengaturan parameter operasional lift": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 6,
                            "Selalu ≤ 5 detik": 9
                        },
                        "contohDokumentasi": "Lift control response; parameter adjustment; operational tuning",
                        "penjelasan": "Kecepatan sistem menyesuaikan pengaturan lift (kecepatan, prioritas)"
                    },
                    "Waktu akses informasi di antarmuka pengguna lift": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 3 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 3 detik": 6,
                            "Selalu ≤ 3 detik": 9
                        },
                        "contohDokumentasi": "User interface response; passenger experience; control panel performance",
                        "penjelasan": "Kecepatan tampil informasi saat penumpang menekan tombol/touchscreen"
                    },
                    "Tingkat keberhasilan monitor keadaan darurat oleh kamera IoT": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% berhasil": 2,
                            "100% berhasil": 6
                        },
                        "contohDokumentasi": "Emergency monitoring effectiveness; camera detection accuracy; safety system",
                        "penjelasan": "Akurasi kamera lift dalam mendeteksi situasi darurat penumpang"
                    },
                    "Waktu respons pengendalian lift jarak jauh": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 2 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 2 detik": 4,
                            "Selalu ≤ 2 detik": 6
                        },
                        "contohDokumentasi": "Remote control latency; off-site management; mobile app performance",
                        "penjelasan": "Kecepatan kontrol lift dari ruang monitor/ponsel"
                    },
                    "Waktu pembaruan data pada aplikasi atau antarmuka web": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 4,
                            "Selalu ≤ 5 detik": 6
                        },
                        "contohDokumentasi": "Data refresh rate; real-time update performance; system synchronization",
                        "penjelasan": "Kecepatan update info status lift di software monitoring"
                    }
                }
            },
            {
                "nama": "Sistem Parkir",
                "maksPoinKUK": 48,
                "penjelasan": "Pengelolaan area parkir dengan sensor panduan digital dan pembayaran non-tunai",
                "indikator": {
                    "Uptime sistem sensor dan perangkat IoT parkir": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% uptime": 2,
                            "≥ 99% uptime": 6
                        },
                        "contohDokumentasi": "Parking system availability; IoT device uptime; maintenance record",
                        "penjelasan": "Waktu operasional sistem sensor parkir tanpa downtime"
                    },
                    "Waktu akses kendaraan menggunakan RFID": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 3 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 3 detik": 6,
                            "Selalu ≤ 3 detik": 9
                        },
                        "contohDokumentasi": "RFID response time; gate access speed; vehicle processing",
                        "penjelasan": "Kecepatan proses buka palang parkir dengan kartu/tag RFID"
                    },
                    "Akurasi informasi ketersediaan tempat parkir": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% akurasi": 3,
                            "≥ 95% akurasi": 9
                        },
                        "contohDokumentasi": "Parking availability accuracy; sensor detection reliability; guidance system",
                        "penjelasan": "Ketepatan info slot parkir kosong di aplikasi/papan informasi"
                    },
                    "Persentase keberhasilan pembayaran parkir cashless": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 98% keberhasilan": 3,
                            "≥ 98% keberhasilan": 9
                        },
                        "contohDokumentasi": "Cashless payment success rate; transaction processing; payment gateway",
                        "penjelasan": "Keberhasilan transaksi parkir non-tunai via app/e-wallet"
                    },
                    "Waktu pembaruan informasi ketersediaan parkir pada papan tampilan LED": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 6,
                            "Selalu ≤ 10 detik": 9
                        },
                        "contohDokumentasi": "LED display refresh rate; information update speed; real-time data",
                        "penjelasan": "Kecepatan update info parkir di papan digital"
                    },
                    "Waktu pengolahan dan penyajian laporan visual analisis data parkir": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 10 menit": 2,
                            "Tidak selalu, kadang-kadang 10 menit": 4,
                            "Selalu ≤ 10 menit": 6
                        },
                        "contohDokumentasi": "Data processing time; report generation speed; analytics performance",
                        "penjelasan": "Kecepatan sistem menghasilkan grafik/laporan analisis parkir"
                    },
                    "Persentase perangkat aktif jaringan sistem parkir yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 1,
                            "≥ 90% perangkat": 3
                        },
                        "contohDokumentasi": "PoE device inventory; power requirement analysis; network design",
                        "penjelasan": "Banyaknya perangkat parkir (kamera, sensor) yang powered via ethernet"
                    },
                    "Persentase perangkat pasif jaringan sistem parkir yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 1,
                            "100% perangkat": 3
                        },
                        "contohDokumentasi": "Network infrastructure audit; connectivity standard; power delivery",
                        "penjelasan": "Banyaknya infrastruktur pendukung parkir system yang kompatibel PoE"
                    }
                }
            },
            {
                "nama": "Sistem Pengelolaan Utilitas",
                "maksPoinKUK": 48,
                "penjelasan": "Aplikasi terpadu untuk monitoring dan administrasi seluruh utilitas gedung",
                "indikator": {
                    "Tingkat kesalahan dalam penjadwalan atau eksekusi perintah kerja": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari ≤ 2% kesalahan": 8,
                            "≤ 2% kesalahan": 24
                        },
                        "contohDokumentasi": "Work order error rate; scheduling accuracy; execution quality",
                        "penjelasan": "Banyaknya error dalam perencanaan dan pelaksanaan tugas maintenance"
                    },
                    "Waktu yang dibutuhkan untuk menemukan dokumen tertentu": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 3 menit": 8,
                            "Tidak selalu, kadang-kadang ≤ 3 menit": 16,
                            "Selalu ≤ 3 menit": 24
                        },
                        "contohDokumentasi": "Document retrieval time; search performance; information management",
                        "penjelasan": "Kecepatan pencarian dokumen di sistem manajemen dokumen"
                    }
                }
            }
        ]
    }
} 
;

// Ekspos matriks ke window agar dapat diakses eksplisit (beberapa browser tidak menaruh const global ke window)
try { if (typeof window !== 'undefined') { window.matriks = window.matriks || matriks; } } catch (_) { }
// Trigger event siap agar skrip lain bisa mengisi dropdown tanpa polling panjang
try { document.dispatchEvent(new Event('matriks:ready')); } catch (_) { }
