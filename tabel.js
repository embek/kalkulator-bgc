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
    "Non-BGN": {
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
    "BGN": {
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
        nama: "Keamanan Siber",
        maksPoinParameter: 384,
        kriteriaUnjukKerja: [
            {
                nama: "Integritas data yang disimpan di pusat data telah dipastikan melalui proses",
                maksPoinKUK: 24,
                penjelasan: "Verifikasi data dengan checksum atau hashing. Pembuatan versi data dan stempel waktu (timestamp).",
                indikator: {
                    "100% data berhasil diverifikasi menggunakan checksum atau hashing": {
                        tipe: "checkbox",
                        poin: 12,
                        contohDokumentasi: "a. Snapshot konfigurasi, integrasi atau protokol pada sistem atau software b. Manual perangkat atau software c. Report sampling",
                        penjelasan: "Semua data harus terverifikasi dengan checksum atau hashing untuk memastikan integritas"
                    },
                    "100% perubahan data atau riwayat versi data terdokumentasi": {
                        tipe: "checkbox",
                        poin: 12,
                        contohDokumentasi: "a. Snapshot konfigurasi, integrasi atau protokol pada sistem atau software b. Manual perangkat atau software c. Report sampling",
                        penjelasan: "Semua perubahan data harus memiliki riwayat versi yang terdokumentasi"
                    }
                }
            },
            {
                nama: "Redundansi perangkat keras",
                maksPoinKUK: 24,
                penjelasan: "Redundansi perangkat keras untuk memastikan ketersediaan sistem",
                indikator: {
                    "Persentase redundansi perangkat kritikal": {
                        tipe: "radio",
                        poin: {
                            "Kurang dari 100% redundansi": 4,
                            "100% redundansi": 12,
                        },
                        contohDokumentasi: "Dokumentasi spesifikasi perangkat dan konfigurasi redundansi",
                        penjelasan: "Tingkat redundansi perangkat kritikal yang diterapkan"
                    },
                    "Jumlah failover tanpa gangguan layanan": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada informasi mengenai jumlahnya": 0,
                            "Terjadi gangguan selama failover": 4,
                            "Tidak ada gangguan selama failover": 12,
                        },
                        contohDokumentasi: "Laporan insiden dan failover testing",
                        penjelasan: "Kemampuan sistem untuk melakukan failover tanpa mengganggu layanan"
                    }
                }
            },
            {
                nama: "Analisis event log telah dilakukan",
                maksPoinKUK: 24,
                penjelasan: "Analisis log peristiwa untuk mendeteksi insiden keamanan",
                indikator: {
                    "Frekuensi analisis log otomatis": {
                        tipe: "radio",
                        poin: {
                            "Setiap lebih dari 1 menit": 4,
                            "Kadang-kadang setiap 1 menit": 8,
                            "Instant atau real-time dengan maksimal setiap 1 menit": 12
                        },
                        contohDokumentasi: "Konfigurasi sistem analisis log dan laporan monitoring",
                        penjelasan: "Seberapa sering analisis log dilakukan secara otomatis"
                    },
                    "Tingkat deteksi insiden berdasarkan hasil analisis log": {
                        tipe: "radio",
                        poin: {
                            "Insiden keamanan tidak dapat dideteksi": 0,
                            "Kurang dari 95% insiden keamanan terdeteksi": 4,
                            "Lebih dari 95% insiden keamanan terdeteksi": 12
                        },
                        contohDokumentasi: "Laporan deteksi insiden dan hasil analisis log",
                        penjelasan: "Tingkat keberhasilan sistem dalam mendeteksi insiden keamanan"
                    }
                }
            },
            {
                nama: "Kontrol akses (hardware dan software) pada setiap lapisan Open System Interconnection (OSI) telah diterapkan",
                maksPoinKUK: 27,
                penjelasan: "Penerapan kontrol akses pada semua layer OSI",
                indikator: {
                    "Tingkat penerapan kontrol akses pada layer OSI": {
                        tipe: "radio",
                        poin: {
                            "Kurang dari 100% layer diterapkan kontrol akses": 9,
                            "100% layer diterapkan kontrol akses tetapi tidak konsisten": 18,
                            "100% layer selalu diterapkan kontrol akses": 27
                        },
                        contohDokumentasi: "Dokumentasi konfigurasi kontrol akses dan audit keamanan",
                        penjelasan: "Tingkat konsistensi penerapan kontrol akses pada semua layer OSI"
                    }
                }
            },
            {
                nama: "Segmentasi jaringan untuk membatasi akses dan meminimalkan permukaan serangan",
                maksPoinKUK: 24,
                penjelasan: "Segmentasi jaringan untuk meningkatkan keamanan",
                indikator: {
                    "Jumlah segmentasi jaringan yang terisolasi": {
                        tipe: "radio",
                        poin: {
                            "Kurang dari 3 segment terisolasi": 4,
                            "≥ 3 segment terisolasi": 12
                        },
                        contohDokumentasi: "Diagram jaringan dan dokumentasi konfigurasi segmentasi",
                        penjelasan: "Jumlah segmentasi jaringan yang telah diisolasi"
                    },
                    "Persentase lalu lintas jaringan yang dipantau": {
                        tipe: "radio",
                        poin: {
                            "Kurang dari 100% lalu lintas jaringan dipantau": 4,
                            "100% lalu lintas jaringan dipantau tetapi tidak konsisten": 8,
                            "100% lalu lintas jaringan selalu dipantau": 12
                        },
                        contohDokumentasi: "Laporan monitoring jaringan dan konfigurasi tools monitoring",
                        penjelasan: "Tingkat pemantauan lalu lintas jaringan"
                    }
                }
            },
            {
                nama: "Dilakukannya enkripsi end-to-end pada data yang dikirim melalui jaringan komunikasi",
                maksPoinKUK: 30,
                penjelasan: "Enkripsi end-to-end untuk melindungi data selama transmisi",
                indikator: {
                    "100% data yang dikirim dienkripsi menggunakan standar enkripsi tertentu": {
                        tipe: "checkbox",
                        poin: 15,
                        contohDokumentasi: "Dokumentasi konfigurasi enkripsi dan sertifikat keamanan",
                        penjelasan: "Semua data yang dikirim harus dienkripsi dengan standar yang ditetapkan"
                    },
                    "100% komunikasi data sensitif menggunakan enkripsi": {
                        tipe: "checkbox",
                        poin: 15,
                        contohDokumentasi: "Kebijakan keamanan data dan dokumentasi implementasi enkripsi",
                        penjelasan: "Semua komunikasi data sensitif harus menggunakan enkripsi"
                    }
                }
            },
            {
                nama: "Sistem kendali akses jaringan pada level kontroler memiliki fitur: Pelaporan dan Analitik, Audit Trail",
                maksPoinKUK: 27,
                penjelasan: "Sistem kendali akses dengan fitur pelaporan dan audit trail",
                indikator: {
                    "Tingkat keberhasilan autentikasi": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 98%": 9,
                            "Minimal 98%": 9
                        },
                        contohDokumentasi: "Laporan autentikasi dan log sistem",
                        penjelasan: "Tingkat keberhasilan proses autentikasi"
                    },
                    "Waktu rata-rata autentikasi": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari dua detik": 3,
                            "Tidak selalu, kadang-kadang 2 detik atau lebih": 6,
                            "Selalu kurang dari 2 detik": 9
                        },
                        contohDokumentasi: "Log performa sistem dan laporan monitoring",
                        penjelasan: "Waktu rata-rata yang dibutuhkan untuk proses autentikasi"
                    },
                    "Cakupan logging aktivitas": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada pencatatan": 0,
                            "Kurang dari 100% tercatat": 3,
                            "Mencakup 100% aktivitas penting (autentikasi dan perubahan konfigurasi terkait kendali akses)": 9
                        },
                        contohDokumentasi: "Kebijakan logging dan contoh log aktivitas",
                        penjelasan: "Tingkat cakupan pencatatan aktivitas sistem"
                    }
                }
            },
            {
                nama: "100% tingkat kepatuhan dalam mengimplementasikan mekanisme penggantian password standar saat pertama kali digunakan",
                maksPoinKUK: 15,
                penjelasan: "Penerapan mekanisme penggantian password standar",
                indikator: {
                    "Kepatuhan implementasi mekanisme penggantian password": {
                        tipe: "checkbox",
                        poin: 15,
                        contohDokumentasi: "Kebijakan password dan dokumentasi implementasi",
                        penjelasan: "Tingkat kepatuhan dalam menerapkan mekanisme penggantian password standar"
                    }
                }
            },
            {
                nama: "Kinerja proteksi login jika ada upaya ganti password gagal sebanyak tiga kali",
                maksPoinKUK: 24,
                penjelasan: "Proteksi login terhadap upaya ganti password yang gagal",
                indikator: {
                    "Waktu blokir akun": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 1 jam": 4,
                            "Tidak selalu, kadang-kadang 1 jam": 8,
                            "Selalu 1 jam": 12
                        },
                        contohDokumentasi: "Konfigurasi sistem keamanan dan log insiden",
                        penjelasan: "Lama waktu blokir akun setelah multiple failed attempts"
                    },
                    "Kecepatan notifikasi pengguna": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada notifikasi pengguna": 0,
                            "Tidak langsung saat blokir terjadi": 4,
                            "Notifikasi langsung saat blokir terjadi": 12
                        },
                        contohDokumentasi: "Sistem notifikasi dan contoh notifikasi yang dikirim",
                        penjelasan: "Kecepatan sistem dalam memberikan notifikasi kepada pengguna"
                    }
                }
            },
            {
                nama: "Dapat dipastikan bahwa hanya pengguna yang terautentikasi yang dapat mengakses sistem serta mengotorisasi fitur dan data berdasarkan peran pengguna",
                maksPoinKUK: 30,
                penjelasan: "Kontrol akses berdasarkan peran (RBAC)",
                indikator: {
                    "100% akses dikendalikan dengan Role-Based Access Control (RBAC) secara konsisten": {
                        tipe: "checkbox",
                        poin: 30,
                        contohDokumentasi: "Kebijakan RBAC dan dokumentasi implementasi",
                        penjelasan: "Semua akses harus dikendalikan melalui RBAC secara konsisten"
                    }
                }
            },
            {
                nama: "Menerapkan manajemen remote",
                maksPoinKUK: 27,
                penjelasan: "Manajemen akses remote yang aman",
                indikator: {
                    "Tingkat keberhasilan pemrosesan permintaan akses jarak jauh": {
                        tipe: "radio",
                        poin: {
                            "Selalu kurang dari 98%": 3,
                            "Tidak selalu, kadang-kadang 98-100%": 6,
                            "Selalu 98-100%": 9
                        },
                        contohDokumentasi: "Log akses remote dan laporan performa sistem",
                        penjelasan: "Tingkat keberhasilan dalam memproses permintaan akses remote"
                    },
                    "Waktu rata-rata untuk menyelesaikan permintaan remote": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 5 menit": 3,
                            "Tidak selalu, kadang-kadang 1-4 menit": 6,
                            "Selalu 1-4 menit": 9
                        },
                        contohDokumentasi: "Log respons sistem dan laporan performa",
                        penjelasan: "Waktu rata-rata yang dibutuhkan untuk menanggapi permintaan remote"
                    },
                    "Jumlah upaya akses tidak sah yang diblokir": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada pemblokiran akses tidak sah": 0,
                            "Kurang dari 100% tidak sah diblokir": 3,
                            "100% akses tidak sah diblokir": 9
                        },
                        contohDokumentasi: "Log keamanan dan laporan insiden",
                        penjelasan: "Tingkat keberhasilan dalam memblokir akses tidak sah"
                    }
                }
            },
            {
                nama: "Sistem deteksi intrusi jaringan efektif dalam mendeteksi dan memberikan peringatan dini terhadap upaya akses yang tidak sah",
                maksPoinKUK: 27,
                penjelasan: "Sistem deteksi intrusi jaringan",
                indikator: {
                    "Waktu rata-rata untuk deteksi intrusi": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 1 menit": 3,
                            "Tidak selalu, kadang-kadang ≤ 1 menit": 6,
                            "Selalu ≤ 1 menit": 9
                        },
                        contohDokumentasi: "Log sistem deteksi intrusi dan laporan respons",
                        penjelasan: "Waktu rata-rata yang dibutuhkan untuk mendeteksi intrusi"
                    },
                    "Tingkat deteksi intrusi": {
                        tipe: "radio",
                        poin: {
                            "Selalu kurang dari 99,5%": 3,
                            "Tidak selalu, kadang-kadang ≥ 99,5%": 6,
                            "Selalu ≥ 99,5%": 9
                        },
                        contohDokumentasi: "Laporan efektivitas sistem deteksi intrusi",
                        penjelasan: "Tingkat akurasi sistem dalam mendeteksi intrusi"
                    },
                    "Waktu rata-rata untuk respons intrusi": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 5 menit": 3,
                            "Tidak selalu, kadang-kadang ≤ 5 menit": 6,
                            "Selalu ≤ 5 menit": 9
                        },
                        contohDokumentasi: "Log respons insiden dan prosedur penanganan",
                        penjelasan: "Waktu rata-rata yang dibutuhkan untuk merespons intrusi"
                    }
                }
            },
            {
                nama: "Sistem masuk tunggal (single sign-on) memungkinkan pengguna terautentikasi langsung ke dalam sistem akses setelah terautentikasi di sistem operasi komputer",
                maksPoinKUK: 24,
                penjelasan: "Sistem single sign-on (SSO)",
                indikator: {
                    "Waktu rata-rata respons sistem masuk tunggal": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 2 detik": 8,
                            "Kadang-kadang 2 detik atau kurang": 16,
                            "Selalu ≤ 2 detik": 24
                        },
                        contohDokumentasi: "Log performa SSO dan laporan monitoring",
                        penjelasan: "Waktu respons sistem single sign-on"
                    }
                }
            },
            {
                nama: "Multi-Factor Authentication (MFA) telah diimplementasikan",
                maksPoinKUK: 24,
                penjelasan: "Implementasi autentikasi multi-faktor",
                indikator: {
                    "Persentase pengguna yang mengaktifkan MFA": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada yang mengaktifkan MFA": 0,
                            "Kurang dari 100% pengguna dengan akses ke data sensitif": 4,
                            "100% pengguna dengan akses ke data sensitif": 12
                        },
                        contohDokumentasi: "Laporan implementasi MFA dan statistik pengguna",
                        penjelasan: "Tingkat adopsi MFA oleh pengguna"
                    },
                    "Jumlah metode autentikasi yang didukung": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada metode autentikasi": 0,
                            "Terdapat 1 metode autentikasi": 4,
                            "≥ 2 metode autentikasi": 12
                        },
                        contohDokumentasi: "Dokumentasi metode autentikasi yang didukung",
                        penjelasan: "Jumlah metode autentikasi yang tersedia dalam sistem MFA"
                    }
                }
            },
            {
                nama: "Sistem memungkinkan untuk multiakses",
                maksPoinKUK: 24,
                penjelasan: "Kemampuan sistem untuk mendukung multiakses",
                indikator: {
                    "Tingkat keberhasilan akses bersamaan": {
                        tipe: "radio",
                        poin: {
                            "Tidak memungkinkan multiakses": 0,
                            "Kurang dari 99,9% keberhasilan": 4,
                            "≥ 99,9% keberhasilan": 12
                        },
                        contohDokumentasi: "Laporan performa sistem dan testing multiakses",
                        penjelasan: "Tingkat keberhasilan akses bersamaan ke sistem"
                    },
                    "Kapasitas maksimal akses bersamaan": {
                        tipe: "radio",
                        poin: {
                            "Selalu kurang dari 5 perangkat": 4,
                            "Tidak selalu, kadang-kadang 5 perangkat": 8,
                            "Selalu ≥ 5 perangkat": 12
                        },
                        contohDokumentasi: "Spesifikasi sistem dan laporan load testing",
                        penjelasan: "Kapasitas maksimal sistem dalam menangani akses bersamaan"
                    }
                }
            }
        ]
    },
    "B": {
        nama: "Protokol dan Jaringan Komunikasi",
        maksPoinParameter: 327,
        kriteriaUnjukKerja: [
            {
                nama: "100% menggunakan perangkat berbasis protokol komunikasi standar terbuka",
                maksPoinKUK: 30,
                penjelasan: "Seluruh perangkat menggunakan protokol komunikasi standar terbuka",
                indikator: {
                    "Implementasi protokol standar terbuka": {
                        tipe: "checkbox",
                        poin: 30,
                        contohDokumentasi: "a. Snapshot konfigurasi, integrasi atau protokol pada sistem atau software b. Manual perangkat atau software c. Report sampling",
                        penjelasan: "Semua perangkat harus menggunakan protokol komunikasi standar terbuka"
                    }
                }
            },
            {
                nama: "100% perangkat jaringan menggunakan protokol komunikasi yang kompatibel dengan TCP/IP, seperti BACnet/IP, Modbus TCP, dan lainnya",
                maksPoinKUK: 21,
                penjelasan: "Kompatibilitas perangkat jaringan dengan TCP/IP",
                indikator: {
                    "Tingkat kompatibilitas dengan TCP/IP": {
                        tipe: "checkbox",
                        poin: 21,
                        contohDokumentasi: "a. Snapshot konfigurasi, integrasi atau protokol pada sistem atau software b. Manual perangkat atau software c. Report sampling",
                        penjelasan: "Semua perangkat jaringan harus kompatibel dengan protokol TCP/IP"
                    }
                }
            },
            {
                nama: "Setiap lapisan OSI dipastikan sudah optimal",
                maksPoinKUK: 21,
                penjelasan: "Optimasi semua lapisan OSI (Fisik, Data Link, Jaringan, Transport, Sesi, Presentasi, dan Aplikasi)",
                indikator: {
                    "Waktu respons pengiriman/permintaan data": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 1 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 1 detik": 2,
                            "Selalu ≤ 1 detik": 3
                        },
                        contohDokumentasi: "Laporan performa jaringan dan testing latency",
                        penjelasan: "Waktu respons untuk pengiriman dan permintaan data"
                    },
                    "Tingkat kesalahan pengiriman frame data": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        contohDokumentasi: "Laporan error rate dan monitoring jaringan",
                        penjelasan: "Tingkat kesalahan dalam pengiriman frame data"
                    },
                    "Tingkat keberhasilan pengiriman paket": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        contohDokumentasi: "Laporan performa jaringan dan packet loss",
                        penjelasan: "Tingkat keberhasilan dalam pengiriman paket data"
                    },
                    "Tingkat keberhasilan koneksi TCP/UDP": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        contohDokumentasi: "Laporan konektivitas dan monitoring jaringan",
                        penjelasan: "Tingkat keberhasilan dalam membangun koneksi TCP/UDP"
                    },
                    "Tingkat keberhasilan pembentukan sesi": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        contohDokumentasi: "Laporan sesi koneksi dan monitoring",
                        penjelasan: "Tingkat keberhasilan dalam pembentukan sesi komunikasi"
                    },
                    "Tingkat keberhasilan enkripsi-dekripsi data": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        contohDokumentasi: "Laporan keamanan dan testing enkripsi",
                        penjelasan: "Tingkat keberhasilan dalam proses enkripsi dan dekripsi data"
                    },
                    "Waktu respons aplikasi": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 1 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 1 detik": 2,
                            "Selalu ≤ 1 detik": 3
                        },
                        contohDokumentasi: "Laporan performa aplikasi dan testing respons",
                        penjelasan: "Waktu respons aplikasi dalam menangani permintaan"
                    }
                }
            },
            {
                nama: "100% sudah melakukan implementasi standar tertentu untuk pengelolaan jaringan kabel",
                maksPoinKUK: 30,
                penjelasan: "Implementasi standar pengelolaan jaringan kabel (Standar Kabel, Desain dan Topologi Jaringan, Switch dan Router, Langkah Keamanan, Pemantauan dan Manajemen Perangkat, Kualitas Layanan/QoS, Kepatuhan Regulasi)",
                indikator: {
                    "Implementasi standar pengelolaan jaringan kabel": {
                        tipe: "checkbox",
                        poin: 30,
                        contohDokumentasi: "Dokumentasi standar jaringan kabel dan implementasi",
                        penjelasan: "Tingkat implementasi standar pengelolaan jaringan kabel"
                    }
                }
            },
            {
                nama: "Sudah melakukan implementasi pelabelan infrastruktur kabel dan peralatan sesuai standar konvensi penamaan",
                maksPoinKUK: 30,
                penjelasan: "Pelabelan infrastruktur kabel dan peralatan (lokasi, jenis perangkat, nomor urut, fungsi) dengan warna berbeda untuk beberapa kategori",
                indikator: {
                    "Tingkat implementasi pelabelan": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada standar pelabelan dan warna yang diterapkan": 0,
                            "Kurang dari 100% infrastruktur diberi label dan warna sesuai standar": 10,
                            "100% infrastruktur diberi label dan warna sesuai standar": 30
                        },
                        contohDokumentasi: "Dokumentasi standar pelabelan dan foto implementasi",
                        penjelasan: "Tingkat implementasi sistem pelabelan infrastruktur"
                    }
                }
            },
            {
                nama: "100% sudah melakukan implementasi standar tertentu untuk pengelolaan jaringan nirkabel (jika ada)",
                maksPoinKUK: 30,
                penjelasan: "Implementasi standar pengelolaan jaringan nirkabel (Wi-Fi, WiMAX, Zigbee, Bluetooth, Jaringan Otomasi Rumah, Komunikasi RF, Langkah Keamanan, Desain dan Topologi Jaringan, Pemantauan dan Manajemen, QoS, Kepatuhan Regulasi)",
                indikator: {
                    "Implementasi standar pengelolaan jaringan nirkabel": {
                        tipe: "checkbox",
                        poin: 30,
                        contohDokumentasi: "Dokumentasi standar jaringan nirkabel dan implementasi",
                        penjelasan: "Tingkat implementasi standar pengelolaan jaringan nirkabel"
                    }
                }
            },
            {
                nama: "Sudah menerapkan pendekatan umum dalam pelabelan infrastruktur peralatan dan titik akses nirkabel",
                maksPoinKUK: 27,
                penjelasan: "Pelabelan frekuensi jaringan nirkabel, pelabelan perangkat jaringan nirkabel, penggunaan warna pada antarmuka pengguna jaringan",
                indikator: {
                    "Tingkat penerapan pendekatan pelabelan": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada pendekatan yang diterapkan": 0,
                            "Kurang dari 100% pendekatan umum diterapkan": 9,
                            "100% pendekatan umum diterapkan": 27
                        },
                        contohDokumentasi: "Dokumentasi standar pelabelan nirkabel dan implementasi",
                        penjelasan: "Tingkat penerapan pendekatan pelabelan infrastruktur nirkabel"
                    }
                }
            },
            {
                nama: "Jika digunakan, teknologi 5G dapat menjalankan fitur utama yang ada pada standar 3GPP release 17",
                maksPoinKUK: 24,
                penjelasan: "Implementasi teknologi 5G dengan fitur Ultra-Reliable Low Latency Communications (URLLC) dan Radio Access Network (RAN) Slicing",
                indikator: {
                    "Latensi end-to-end": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 1 ms": 4,
                            "Tidak selalu, kadang-kadang ≤ 1 ms": 8,
                            "Selalu ≤ 1 ms": 12
                        },
                        contohDokumentasi: "Laporan performa jaringan 5G dan testing latency",
                        penjelasan: "Latensi end-to-end pada jaringan 5G"
                    },
                    "Network slice throughput": {
                        tipe: "radio",
                        poin: {
                            "Selalu kurang dari 50 Mbps per user": 4,
                            "Tidak selalu, kadang-kadang ≥ 50 Mbps per user": 8,
                            "Selalu ≥ 50 Mbps per user": 12
                        },
                        contohDokumentasi: "Laporan throughput jaringan 5G dan testing performa",
                        penjelasan: "Throughput yang dicapai pada network slicing 5G"
                    }
                }
            },
            {
                nama: "Mengevaluasi penggunaan port dan layanan pada perangkat berbasis IP",
                maksPoinKUK: 33,
                penjelasan: "Evaluasi dan penonaktifan port dan layanan tidak aman pada perangkat IP",
                indikator: {
                    "Persentase port dan layanan tidak aman yang dinonaktifkan": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada penonaktifan port dan layanan tidak aman": 0,
                            "Kurang dari 100% port dan layanan tidak aman dinonaktifkan": 11,
                            "100% port dan layanan tidak aman dinonaktifkan": 33
                        },
                        contohDokumentasi: "Laporan audit keamanan dan konfigurasi perangkat",
                        penjelasan: "Tingkat penonaktifan port dan layanan yang tidak aman"
                    }
                }
            },
            {
                nama: "Koneksi kabel di rak server telah menggunakan patch panel. Koneksi perangkat berbasis IP telah menggunakan modular jack female",
                maksPoinKUK: 24,
                penjelasan: "Penggunaan patch panel untuk koneksi kabel di rak server dan modular jack female untuk perangkat IP",
                indikator: {
                    "Persentase penggunaan patch panel untuk koneksi kabel di rak server": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada penggunaan patch panel": 0,
                            "Kurang dari 100% penggunaan": 4,
                            "100% penggunaan": 12
                        },
                        contohDokumentasi: "Dokumentasi infrastruktur dan foto implementasi",
                        penjelasan: "Tingkat penggunaan patch panel untuk koneksi kabel server"
                    },
                    "Persentase penggunaan modular jack female untuk koneksi perangkat berbasis IP": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada penggunaan modular jack female": 0,
                            "Kurang dari 100% penggunaan": 4,
                            "100% penggunaan": 12
                        },
                        contohDokumentasi: "Dokumentasi infrastruktur dan foto implementasi",
                        penjelasan: "Tingkat penggunaan modular jack female untuk koneksi perangkat IP"
                    }
                }
            },
            {
                nama: "Koneksi perangkat berbasis jaringan IP telah menggunakan kabel patch cord",
                maksPoinKUK: 30,
                penjelasan: "Penggunaan kabel patch cord untuk koneksi perangkat jaringan IP",
                indikator: {
                    "Persentase penggunaan kabel patch cord": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada penggunaan kabel patch cord": 0,
                            "Kurang dari 100% penggunaan": 10,
                            "100% penggunaan": 30
                        },
                        contohDokumentasi: "Dokumentasi infrastruktur dan foto implementasi",
                        penjelasan: "Tingkat penggunaan kabel patch cord untuk koneksi perangkat jaringan IP"
                    }
                }
            },
            {
                nama: "Sistem dapat mengelola QoS dengan baik",
                maksPoinKUK: 18,
                penjelasan: "Manajemen Quality of Service (bandwidth utilization, latency, packet loss, jitter, prioritization, resource allocation)",
                indikator: {
                    "Tingkat penggunaan bandwidth": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 70-85% penggunaan bandwidth": 1,
                            "70-85% penggunaan bandwidth": 3
                        },
                        contohDokumentasi: "Laporan utilisasi bandwidth dan monitoring jaringan",
                        penjelasan: "Tingkat utilisasi bandwidth yang optimal"
                    },
                    "Waktu respons pengiriman/permintaan paket data": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 100 ms": 1,
                            "Tidak selalu, kadang-kadang ≤ 100 ms latensi": 2,
                            "Selalu ≤ 100 ms latensi": 3
                        },
                        contohDokumentasi: "Laporan latency jaringan dan testing performa",
                        penjelasan: "Waktu respons untuk pengiriman paket data"
                    },
                    "Tingkat kehilangan paket data": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari ≤ 1% kehilangan": 1,
                            "≤ 1% kehilangan": 3
                        },
                        contohDokumentasi: "Laporan packet loss dan monitoring jaringan",
                        penjelasan: "Tingkat kehilangan paket data dalam jaringan"
                    },
                    "Variasi waktu rata-rata pengiriman paket data": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 30 ms": 1,
                            "Tidak selalu, kadang-kadang ≤ 30 ms variasi": 2,
                            "Selalu ≤ 30 ms variasi": 3
                        },
                        contohDokumentasi: "Laporan jitter jaringan dan testing performa",
                        penjelasan: "Variasi waktu dalam pengiriman paket data (jitter)"
                    },
                    "Tingkat keberhasilan prioritasi data dengan prioritas tinggi": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% keberhasilan": 1,
                            "100% keberhasilan": 3
                        },
                        contohDokumentasi: "Laporan QoS dan testing prioritasi data",
                        penjelasan: "Tingkat keberhasilan dalam memprioritaskan data penting"
                    },
                    "Tingkat efisiensi alokasi sumber daya jaringan": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari ≥ 95% efisiensi": 1,
                            "≥ 95% efisiensi": 3
                        },
                        contohDokumentasi: "Laporan utilisasi sumber daya dan efisiensi jaringan",
                        penjelasan: "Tingkat efisiensi dalam mengalokasikan sumber daya jaringan"
                    }
                }
            }
        ]
    },
    "C": {
        nama: "Integrasi Data dan Sistem",
        maksPoinParameter: 231,
        kriteriaUnjukKerja: [
            {
                nama: "Keberjalanan sistem cerdas harus dapat dimonitor di Building Management System (BMS) dan mendukung interoperabilitas data dengan BMS",
                maksPoinKUK: 45,
                penjelasan: "Pemantauan sistem melalui BMS dan interoperabilitas data",
                indikator: {
                    "Frekuensi sinkronisasi data dengan BMS": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 60 detik": 5,
                            "Tidak selalu, kadang-kadang realtime atau setiap ≤ 60 detik": 10,
                            "Selalu realtime atau setiap ≤ 60 detik": 15
                        },
                        contohDokumentasi: "Laporan sinkronisasi data dan konfigurasi BMS",
                        penjelasan: "Frekuensi sinkronisasi data antara sistem dan BMS"
                    },
                    "100% kelengkapan monitoring data di BMS": {
                        tipe: "checkbox",
                        poin: 15,
                        contohDokumentasi: "Dokumentasi antarmuka BMS dan laporan monitoring",
                        penjelasan: "Kelengkapan data yang dimonitor melalui BMS"
                    },
                    "100% kompatibilitas dengan standar dan format data yang diterima BMS": {
                        tipe: "checkbox",
                        poin: 15,
                        contohDokumentasi: "Dokumentasi standar data dan format yang digunakan",
                        penjelasan: "Tingkat kompatibilitas data dengan standar dan format BMS"
                    }
                }
            },
            {
                nama: "Akuisisi data waktu nyata pada level fisik",
                maksPoinKUK: 39,
                penjelasan: "Akuisisi data real-time dari sensor atau perangkat fisik",
                indikator: {
                    "Waktu yang dibutuhkan untuk menangkap data dari sensor atau perangkat fisik": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 1 detik": 13,
                            "Tidak selalu, kadang-kadang ≤ 1 detik": 26,
                            "Selalu ≤ 1 detik": 39
                        },
                        contohDokumentasi: "Laporan performa sistem dan testing akuisisi data",
                        penjelasan: "Waktu respons sistem dalam mengakuisisi data dari perangkat fisik"
                    }
                }
            },
            {
                nama: "Data yang digunakan dan dihasilkan oleh berbagai komponen dalam sistem dapat dipastikan tetap utuh, akurat, dan tidak ada konflik ketika dipertukarkan atau diakses di seluruh sistem",
                maksPoinKUK: 30,
                penjelasan: "Integritas dan konsistensi data across systems",
                indikator: {
                    "100% konsistensi data yang dipertukarkan atau diakses di seluruh sistem": {
                        tipe: "checkbox",
                        poin: 15,
                        contohDokumentasi: "Laporan konsistensi data dan audit integritas",
                        penjelasan: "Tingkat konsistensi data across systems"
                    },
                    "100% kepatuhan terhadap standar data dan format yang disepakati": {
                        tipe: "checkbox",
                        poin: 15,
                        contohDokumentasi: "Dokumentasi standar data dan format yang digunakan",
                        penjelasan: "Tingkat kepatuhan terhadap standar data dan format"
                    }
                }
            },
            {
                nama: "Sistem secara cepat memproses dan merespons data yang diperoleh dari sensor, perangkat, atau pengguna dan melakukan tindakan tertentu secara otomatis",
                maksPoinKUK: 39,
                penjelasan: "Pemrosesan data cepat dan eksekusi otomatis",
                indikator: {
                    "Waktu yang dibutuhkan untuk melakukan pemrosesan data dan eksekusi tindakan otomatis": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 10 detik": 13,
                            "Tidak selalu, kadang-kadang ≤ 10 detik": 26,
                            "Selalu ≤ 10 detik": 39
                        },
                        contohDokumentasi: "Laporan performa sistem dan testing respons",
                        penjelasan: "Waktu yang dibutuhkan untuk memproses data dan mengeksekusi tindakan otomatis"
                    }
                }
            },
            {
                nama: "Memiliki katalog data terpusat yang memudahkan dalam pencarian dan penggunaan data",
                maksPoinKUK: 39,
                penjelasan: "Katalog data terpusat untuk kemudahan akses dan penggunaan",
                indikator: {
                    "Persentase data yang masuk ke dalam katalog data dari semua sumber data yang tersedia": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada data yang masuk katalog data": 0,
                            "Kurang dari 100% data terkatalogkan": 13,
                            "100% data terkatalogkan": 39
                        },
                        contohDokumentasi: "Dokumentasi katalog data dan laporan cakupan",
                        penjelasan: "Tingkat kelengkapan katalog data terhadap semua sumber data"
                    }
                }
            },
            {
                nama: "Standar terbuka telah diadopsi untuk memastikan interoperabilitas data dengan sistem lain",
                maksPoinKUK: 33,
                penjelasan: "Adopsi standar terbuka untuk interoperabilitas data",
                indikator: {
                    "Tingkat kepatuhan terhadap standar terbuka": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada kepatuhan": 0,
                            "Kurang dari 100% kepatuhan": 11,
                            "100% kepatuhan": 33
                        },
                        contohDokumentasi: "Dokumentasi standar data dan laporan compliance",
                        penjelasan: "Tingkat kepatuhan terhadap standar terbuka untuk interoperabilitas"
                    }
                }
            }
        ]
    },
    "D": {
        nama: "Manajemen Operasi",
        maksPoinParameter: 114,
        kriteriaUnjukKerja: [
            {
                nama: "Perencanaan pengelolaan sistem cerdas telah dilakukan",
                maksPoinKUK: 30,
                penjelasan: "Perencanaan pengelolaan sistem cerdas",
                indikator: {
                    "Tersedia kebijakan yang telah disusun sebagai landasan pengelolaan sistem cerdas": {
                        tipe: "checkbox",
                        poin: 12,
                        contohDokumentasi: "a. Snapshot konfigurasi, integrasi atau protokol pada sistem atau software b. Manual perangkat atau software c. Report sampling",
                        penjelasan: "Ketersediaan kebijakan pengelolaan sistem cerdas"
                    },
                    "Tersedia rincian tugas dan tanggung jawab spesifik yang telah disusun sebagai landasan pengelolaan sistem cerdas": {
                        tipe: "checkbox",
                        poin: 9,
                        contohDokumentasi: "a. Snapshot konfigurasi, integrasi atau protokol pada sistem atau software b. Manual perangkat atau software c. Report sampling",
                        penjelasan: "Ketersediaan rincian tugas dan tanggung jawab pengelolaan sistem"
                    },
                    "Tersedia prosedur yang telah disusun untuk operasional sistem cerdas": {
                        tipe: "checkbox",
                        poin: 9,
                        contohDokumentasi: "a. Snapshot konfigurasi, integrasi atau protokol pada sistem atau software b. Manual perangkat atau software c. Report sampling",
                        penjelasan: "Ketersediaan prosedur operasional sistem cerdas"
                    }
                }
            },
            {
                nama: "Pengorganisasian pengelolaan sistem cerdas telah dilakukan",
                maksPoinKUK: 30,
                penjelasan: "Pengorganisasian pengelolaan sistem cerdas",
                indikator: {
                    "Persentase pemenuhan posisi/roles yang diperlukan untuk pengelolaan sistem cerdas": {
                        tipe: "radio",
                        poin: {
                            "Tidak terpenuhi": 0,
                            "Kurang dari 100% pemenuhan": 5,
                            "100% pemenuhan": 15
                        },
                        contohDokumentasi: "Struktur organisasi dan dokumentasi roles & responsibilities",
                        penjelasan: "Tingkat pemenuhan posisi yang diperlukan untuk pengelolaan sistem"
                    },
                    "Persentase pengelola sistem cerdas dengan kompetensi yang memenuhi sertifikasi, kualifikasi, atau pengalaman kerja yang dibutuhkan": {
                        tipe: "radio",
                        poin: {
                            "Tidak terpenuhi": 0,
                            "Kurang dari 100% pemenuhan": 5,
                            "100% pemenuhan": 15
                        },
                        contohDokumentasi: "Dokumentasi kualifikasi dan sertifikasi staf",
                        penjelasan: "Tingkat kompetensi pengelola sistem cerdas"
                    }
                }
            },
            {
                nama: "Keberjalanan pelatihan dan simulasi insiden terkait pengelolaan sistem cerdas",
                maksPoinKUK: 27,
                penjelasan: "Pelatihan dan simulasi insiden untuk pengelolaan sistem",
                indikator: {
                    "Frekuensi pelatihan dan simulasi insiden": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 6 bulan sekali": 9,
                            "Tidak selalu, kadang-kadang 6 bulan sekali": 18,
                            "Selalu 6 bulan sekali": 27
                        },
                        contohDokumentasi: "Jadwal dan laporan pelatihan serta simulasi",
                        penjelasan: "Frekuensi pelaksanaan pelatihan dan simulasi insiden"
                    }
                }
            },
            {
                nama: "Pengawasan pengelolaan sistem cerdas telah dilakukan untuk memastikan keberjalanan",
                maksPoinKUK: 27,
                penjelasan: "Pengawasan pengelolaan sistem (dokumentasi/laporan, audit kinerja dan kepatuhan, pemeliharaan sistem, pelaporan, respons, dan mitigasi insiden)",
                indikator: {
                    "Frekuensi audit kinerja dan kepatuhan": {
                        tipe: "radio",
                        poin: {
                            "Selalu kurang dari 1 kali per 3 bulan": 9,
                            "Tidak selalu, kadang-kadang 1 kali per 3 bulan": 18,
                            "Sekurang-kurangnya 1 kali per 3 bulan": 27
                        },
                        contohDokumentasi: "Jadwal dan laporan audit kinerja serta kepatuhan",
                        penjelasan: "Frekuensi pelaksanaan audit kinerja dan kepatuhan"
                    }
                }
            }
        ]
    },
    "E": {
        nama: "Dampak",
        maksPoinParameter: 96,
        kriteriaUnjukKerja: [
            {
                nama: "Penurunan konsumsi energi yang dicapai melalui penggunaan sistem cerdas",
                maksPoinKUK: 33,
                penjelasan: "Penurunan konsumsi energi dibandingkan dengan baseline",
                indikator: {
                    "Persentase penurunan konsumsi energi dalam satu tahun": {
                        tipe: "radio",
                        poin: {
                            "Kurang dari 10%": 11,
                            "10 - 25%": 22,
                            ">25%": 33
                        },
                        contohDokumentasi: "a. Snapshot konfigurasi, integrasi atau protokol pada sistem atau software b. Manual perangkat atau software c. Report sampling",
                        penjelasan: "Tingkat penurunan konsumsi energi setelah implementasi sistem cerdas"
                    }
                }
            },
            {
                nama: "Penurunan konsumsi air yang dicapai melalui penggunaan sistem cerdas",
                maksPoinKUK: 33,
                penjelasan: "Penurunan konsumsi air dibandingkan dengan baseline",
                indikator: {
                    "Persentase penurunan konsumsi air dalam satu tahun": {
                        tipe: "radio",
                        poin: {
                            "Kurang dari 5%": 11,
                            "5 - 10%": 22,
                            ">10%": 33
                        },
                        contohDokumentasi: "a. Snapshot konfigurasi, integrasi atau protokol pada sistem atau software b. Manual perangkat atau software c. Report sampling",
                        penjelasan: "Tingkat penurunan konsumsi air setelah implementasi sistem cerdas"
                    }
                }
            },
            {
                nama: "Kepuasan penghuni dengan adanya fitur otomatisasi sistem cerdas",
                maksPoinKUK: 30,
                penjelasan: "Tingkat kepuasan penghuni terhadap sistem cerdas (aman, sehat, nyaman, mudah)",
                indikator: {
                    "Persentase kepuasan penghuni berdasarkan hasil survei": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada survei kepuasan": 0,
                            "60 - 80% kepuasan": 10,
                            "> 80% kepuasan": 30
                        },
                        contohDokumentasi: "a. Snapshot konfigurasi, integrasi atau protokol pada sistem atau software b. Manual perangkat atau software c. Report sampling",
                        penjelasan: "Tingkat kepuasan penghuni terhadap sistem cerdas berdasarkan survei"
                    }
                }
            }
        ]
    },
    "F": {
        nama: "Kemampuan Sistem",
        maksPoinParameter: 768,
        kriteriaUnjukKerja: [
            {
                nama: "Sistem Alarm Kebencanaan dan Pemberitahuan Massal",
                maksPoinKUK: 48,
                penjelasan: "Sistem alarm untuk bencana dan pemberitahuan massal",
                indikator: {
                    "Sensor mampu mendeteksi bencana secara cepat dan akurat sesuai kondisi lokasi bangunan": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 10 detik": 6,
                            "Tidak selalu, kadang-kadang ≤ 10 detik": 12,
                            "Selalu ≤ 10 detik": 18
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu deteksi bencana oleh sensor"
                    },
                    "100% komponen utama sistem dapat dipantau status keberjalanannya secara jarak jauh": {
                        tipe: "checkbox",
                        poin: 15,
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Pemantauan panel kontrol utama, sensor, alarm, pengeras suara, penyedia daya cadangan, tombol tekan manual"
                    },
                    "Akurasi denah lokasi deteksi alarm pada panel isyarat": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% akurasi": 5,
                            "≥ 99% akurasi": 15
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi denah dan lokasi deteksi alarm pada panel isyarat canggih"
                    }
                }
            },
            {
                nama: "Sistem Kamera Pengawas",
                maksPoinKUK: 48,
                penjelasan: "Sistem kamera pengawas dengan kemampuan perekaman dan monitoring",
                indikator: {
                    "Sistem kamera pengawas dapat melakukan perekaman menggunakan DVR/NVR dengan 100% data yang terenkripsi": {
                        tipe: "checkbox",
                        poin: 3,
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Perekaman dengan DVR/NVR dan enkripsi data"
                    },
                    "Waktu rata-rata pengiriman paket video dari kamera ke pusat kontrol": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 5 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 2,
                            "Selalu ≤ 5 detik": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu pengiriman video untuk live streaming"
                    },
                    "Resolusi dan kualitas video digital pada semua kamera pengawas": {
                        tipe: "radio",
                        poin: {
                            "Semua kurang dari 720p": 1,
                            "Tidak semua ≥ 720p": 2,
                            "Semua ≥ 720p": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Resolusi video semua kamera pengawas"
                    },
                    "Kecepatan respons interkom setelah pengguna menekan tombol atau memberikan perintah suara": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 2 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 2 detik": 2,
                            "Selalu ≤ 2 detik": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu respons sistem interkom"
                    },
                    "Persentase akurasi deteksi gerakan": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi deteksi gerakan oleh sistem"
                    },
                    "Persentase akurasi deteksi objek": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi deteksi objek oleh sistem"
                    },
                    "Persentase akurasi pelacakan": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi pelacakan objek oleh sistem"
                    },
                    "Persentase akurasi rekognisi": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi rekognisi oleh sistem"
                    },
                    "Persentase akurasi masking": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi masking oleh sistem"
                    },
                    "Persentase akurasi perhitungan jumlah orang": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi perhitungan jumlah orang oleh sistem"
                    },
                    "Persentase perekaman otomatis berdasarkan pengaturan jadwal, event, atau rekaman berkesinambungan": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% terekam": 1,
                            "≥ 99% terekam": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat keberhasilan perekaman otomatis"
                    },
                    "Availabilitas sistem manajemen video terpusat": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% availability": 1,
                            "≥ 99% availability": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat ketersediaan sistem manajemen video"
                    },
                    "Persentase area publik yang terjangkau kamera": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% area": 1,
                            "100% area": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Cakupan area yang terjangkau kamera"
                    },
                    "Durasi penyimpanan video": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 30 hari": 1,
                            "30 hari": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Lama waktu penyimpanan video"
                    },
                    "Persentase perangkat aktif jaringan yang mendukung PoE": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 1,
                            "≥ 90% perangkat": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat dukungan Power over Ethernet pada perangkat aktif"
                    },
                    "Persentase perangkat pasif jaringan yang mendukung PoE": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 1,
                            "100% perangkat": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat dukungan Power over Ethernet pada perangkat pasif termasuk kabel"
                    }
                }
            },
            {
                nama: "Sistem Kontrol Akses",
                maksPoinKUK: 48,
                penjelasan: "Sistem kontrol akses dengan berbagai fitur keamanan",
                indikator: {
                    "Tingkat fluktuasi tegangan yang diterima perangkat periferal": {
                        tipe: "radio",
                        poin: {
                            "Selalu melebihi ±5%": 2,
                            "Tidak selalu, kadang-kadang ±5%": 4,
                            "Selalu ±5%": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Stabilitas tegangan yang diterima perangkat periferal"
                    },
                    "Persentase waktu aktif perangkat periferal": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99,9%": 2,
                            "≥ 99,9%": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat ketersediaan perangkat periferal"
                    },
                    "Jumlah temuan pengguna yang melakukan passback/global passback": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Lebih dari 0 pengguna": 3,
                            "0 pengguna": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat keberhasilan fitur antipassback"
                    },
                    "Jumlah kendala dalam pengaturan akses pengguna berdasarkan area, tanggal dan waktu": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Lebih dari 0 kendala": 3,
                            "0 kendala": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Kemudahan pengaturan akses berdasarkan area, tanggal dan waktu"
                    },
                    "Tingkat ketersediaan fitur perhitungan penghuni di titik kumpul": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% tersedia": 3,
                            "100% tersedia": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Ketersediaan fitur perhitungan penghuni di titik kumpul darurat"
                    },
                    "Jumlah kendala dalam fitur penonaktifan kredensial akses secara otomatis": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Lebih dari 0 kendala": 3,
                            "0 kendala": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Keandalan fitur penonaktifan kredensial otomatis"
                    }
                }
            },
            {
                nama: "Sistem Digital Distribusi Video dan Papan Informasi",
                maksPoinKUK: 48,
                penjelasan: "Sistem distribusi video dan papan informasi digital",
                indikator: {
                    "Kualitas visual video setelah kompresi berdasarkan skor PSNR atau SSIM": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% kesamaan": 2,
                            "≥ 95% kesamaan": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Kualitas video setelah proses kompresi"
                    },
                    "Kompatibilitas format file video": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% kompatibilitas": 2,
                            "100% kompatibilitas": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat kompatibilitas format file video (MPA, MKV, AVI, dll)"
                    },
                    "Waktu latency pengiriman data multimedia dari sumber ke tujuan": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 0,1 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 0,1 detik": 4,
                            "Selalu ≤ 0,1 detik": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu pengiriman data multimedia"
                    },
                    "Throughput pengiriman data multimedia": {
                        tipe: "radio",
                        poin: {
                            "Selalu kurang dari 5 Mbps": 2,
                            "Tidak selalu, kadang-kadang ≥ 5 Mbps": 4,
                            "Selalu ≥ 5 Mbps": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Kecepatan pengiriman data multimedia"
                    },
                    "Tingkat keberhasilan event perekaman penjadwalan dan streaming on demand": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% keberhasilan": 4,
                            "100% keberhasilan": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Keberhasilan penjadwalan dan streaming on demand"
                    },
                    "Persentase perangkat aktif jaringan yang mendukung PoE": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 2,
                            "≥ 90% perangkat": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat dukungan Power over Ethernet pada perangkat aktif"
                    },
                    "Persentase perangkat pasif jaringan yang mendukung PoE": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 2,
                            "100% perangkat": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat dukungan Power over Ethernet pada perangkat pasif termasuk kabel"
                    }
                }
            },
            {
                nama: "Sistem Audio Visual",
                maksPoinKUK: 48,
                penjelasan: "Sistem audio visual dengan kemampuan monitoring dan kontrol",
                indikator: {
                    "Persentase komponen sistem audio visual yang dapat dipantau real-time dan dikontrol": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% komponen": 8,
                            "100% komponen": 24
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat kemampuan pemantauan dan kontrol komponen audio visual"
                    },
                    "Persentase perangkat aktif jaringan yang mendukung PoE": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 4,
                            "≥ 90% perangkat": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat dukungan Power over Ethernet pada perangkat aktif"
                    },
                    "Persentase perangkat pasif jaringan yang mendukung PoE": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 4,
                            "100% perangkat": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat dukungan Power over Ethernet pada perangkat pasif termasuk kabel"
                    }
                }
            },
            {
                nama: "Sistem Jaringan Akses Kabel dan Antena Terdistribusi",
                maksPoinKUK: 48,
                penjelasan: "Sistem jaringan akses kabel dengan support triple play dan fitur tambahan",
                indikator: {
                    "100% status perangkat triple play termonitor dalam perangkat lunak manajemen": {
                        tipe: "checkbox",
                        poin: 24,
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Pemantauan status perangkat triple play (data, suara, televisi)"
                    },
                    "Ketersediaan fitur tambahan waktu-nyata (panggilan video, konferensi, streaming multicast)": {
                        tipe: "radio",
                        poin: {
                            "Tidak tersedia": 0,
                            "Kurang dari 100% tersedia": 8,
                            "100% tersedia": 24
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Ketersediaan fitur panggilan video, konferensi, dan streaming multicast"
                    }
                }
            },
            {
                nama: "Sistem Kelistrikan",
                maksPoinKUK: 48,
                penjelasan: "Sistem monitoring dan kontrol kelistrikan bangunan",
                indikator: {
                    "Akurasi pengukuran penggunaan energi pada setiap perangkat": {
                        tipe: "radio",
                        poin: {
                            "Kurang dari 99% akurasi": 4,
                            "≥ 99% akurasi": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi pengukuran penggunaan energi per perangkat"
                    },
                    "Akurasi kontrol otomatis peralatan berdasarkan pola penggunaan energi": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% akurasi": 3,
                            "≥ 95% akurasi": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi kontrol otomatis berdasarkan pola energi"
                    },
                    "Kelengkapan data tren dan pola konsumsi energi pada dashboard": {
                        tipe: "checkbox",
                        poin: 9,
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Kelengkapan data arus, konsumsi energi, tegangan, dan faktor daya pada dashboard"
                    },
                    "Persentase pengurangan konsumsi energi melalui demand response": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 10% pengurangan": 3,
                            "≥ 10% pengurangan": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat pengurangan konsumsi energi selama beban puncak"
                    },
                    "Akurasi alarm otomatis untuk anomali daya listrik": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% akurasi": 3,
                            "≥ 99% akurasi": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi sistem alarm untuk mendeteksi anomali daya"
                    }
                }
            },
            {
                nama: "Sistem Pencahayaan",
                maksPoinKUK: 48,
                penjelasan: "Sistem kontrol pencahayaan untuk efisiensi energi dan kenyamanan",
                indikator: {
                    "Tingkat ketersediaan sistem kontrol pencahayaan": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99,5% uptime": 16,
                            "≥ 99,5% uptime": 48
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat ketersediaan sistem kontrol pencahayaan dengan fitur penjadwalan, sensor kehadiran, pemanfaatan pencahayaan alami, dan pengaturan kecerahannya"
                    }
                }
            },
            {
                nama: "Sistem Pengondisian Udara",
                maksPoinKUK: 48,
                penjelasan: "Sistem monitoring parameter operasional pengondisian udara",
                indikator: {
                    "Persentase parameter operasional yang dapat dipantau oleh sistem": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% parameter": 16,
                            "100% parameter": 48
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Kelengkapan pemantauan parameter (tekanan dan laju aliran refrigeran, suhu dan kelembapan ruangan, laju aliran udara, kecepatan kipas, status operasional peralatan)"
                    }
                }
            },
            {
                nama: "Sistem Ventilasi",
                maksPoinKUK: 48,
                penjelasan: "Sistem ventilasi dengan deteksi kualitas udara dan kontrol otomatis",
                indikator: {
                    "Waktu respons sistem ventilasi terhadap perubahan parameter kualitas udara": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 30 detik": 4,
                            "Tidak selalu, kadang-kadang ≤ 30 detik": 8,
                            "Selalu ≤ 30 detik": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu respons dari deteksi perubahan hingga penyesuaian ventilasi selesai"
                    },
                    "Tingkat ketepatan deteksi kualitas udara luar": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 98% akurasi": 4,
                            "≥ 98% akurasi": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi deteksi kualitas udara luar bangunan"
                    },
                    "Akurasi kontrol otomatis berdasarkan kondisi lingkungan atau pola keberadaan penghuni": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% akurasi": 4,
                            "≥ 95% akurasi": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi kontrol otomatis berdasarkan kondisi lingkungan"
                    },
                    "Akurasi prediksi perubahan kualitas udara menggunakan kecerdasan buatan": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 90% akurasi": 4,
                            "≥ 90% akurasi": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi prediksi AI untuk perubahan kualitas udara"
                    }
                }
            },
            {
                nama: "Sistem Penyediaan Air Minum",
                maksPoinKUK: 48,
                penjelasan: "Sistem penyediaan air minum dengan monitoring dan kontrol cerdas",
                indikator: {
                    "Akurasi meter air cerdas dalam mengukur volume air": {
                        tipe: "checkbox",
                        poin: 9,
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi ≥ 95% pada meter air cerdas"
                    },
                    "Waktu deteksi kebocoran air dan pemberitahuan": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 1 jam": 3,
                            "Tidak selalu, kadang-kadang ≤ 1 jam": 6,
                            "Selau ≤ 1 jam": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu dari deteksi kebocoran hingga pemberitahuan"
                    },
                    "Waktu respons perubahan debit dan tekanan air oleh ADRS": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 5 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 4,
                            "Selalu ≤ 5 detik": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu respons Automated Demand-Responsive System"
                    },
                    "Tingkat kesesuaian waktu automated cleaning": {
                        tipe: "checkbox",
                        poin: 6,
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "100% kesesuaian waktu automated cleaning tanpa intervensi manual"
                    },
                    "Waktu respons katup cerdas sejak perintah dikirim": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 5 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 4,
                            "Selalu ≤ 5 detik": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu respons katup cerdas terhadap perintah kontrol"
                    },
                    "Persentase parameter kualitas air minum yang terpantau real-time": {
                        tipe: "radio",
                        poin: {
                            "Kurang dari 100%": 2,
                            "Tidak selalu 100%": 4,
                            "100% parameter selalu terpantau secara waktu-nyata": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Kelengkapan pemantauan parameter kualitas air (kekeruhan, pH, disinfektan, total padatan terlarut)"
                    },
                    "Persentase keberhasilan deteksi dini kebocoran air": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% keberhasilan": 2,
                            "≥ 95% keberhasilan": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat keberhasilan deteksi dini kebocoran menggunakan sensor dan algoritma"
                    }
                }
            },
            {
                nama: "Sistem Pengelolaan Air Limbah",
                maksPoinKUK: 48,
                penjelasan: "Sistem monitoring dan pengelolaan air limbah",
                indikator: {
                    "Waktu respons terhadap perubahan volume air limbah": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 3 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 3 detik": 4,
                            "Selalu ≤ 3 detik": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu respons sistem terhadap perubahan volume air limbah"
                    },
                    "Akurasi pengukuran ketinggian muka air limbah": {
                        tipe: "radio",
                        poin: {
                            "Selalu melebihi ± 5%": 2,
                            "Tidak selalu, kadang-kadang ≤ 5%": 4,
                            "Selalu ≤ 5%": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi pengukuran ketinggian muka air limbah"
                    },
                    "Waktu respons penggelontoran otomatis": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 5 menit": 4,
                            "Tidak selalu, kadang-kadang 5 menit": 8,
                            "Selalu ≤ 5 menit": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu respons sistem untuk penggelontoran otomatis"
                    },
                    "Waktu respons deteksi kebocoran": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 3 detik": 4,
                            "Tidak selalu, kadang-kadang 3 detik": 8,
                            "Selalu ≤ 3 detik": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu respons deteksi kebocoran sistem pengelolaan air limbah"
                    },
                    "Waktu ketersediaan data monitoring kualitas air limbah": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 30 detik": 4,
                            "Tidak selalu, kadang-kadang 30 detik": 8,
                            "Selalu ≤ 30 detik": 12
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu ketersediaan data monitoring kualitas air limbah real-time"
                    }
                }
            },
            {
                nama: "Sistem Pengelolaan Sampah",
                maksPoinKUK: 48,
                penjelasan: "Sistem pengelolaan sampah dengan sensor dan konektivitas IoT",
                indikator: {
                    "Akurasi sensor tingkat pengisian wadah sampah": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% akurasi": 8,
                            "≥ 95% akurasi": 24
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi sensor smart bin dalam mendeteksi tingkat pengisian"
                    },
                    "Persentase penggunaan Wi-Fi atau LPWAN untuk perangkat IoT": {
                        tipe: "radio",
                        poin: {
                            "Kurang dari 100%": 8,
                            "Kadang-kadang 100%": 16,
                            "Selalu 100%": 24
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat penggunaan konektivitas nirkabel untuk perangkat IoT sampah"
                    }
                }
            },
            {
                nama: "Sistem Transportasi dalam Gedung",
                maksPoinKUK: 48,
                penjelasan: "Sistem transportasi dalam gedung (lift) dengan fitur cerdas",
                indikator: {
                    "Ketersediaan informasi pada layar lift": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99,9% availability": 2,
                            "≥ 99,9% availability": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat ketersediaan informasi pada layar lift"
                    },
                    "Waktu respons TAS terhadap permintaan bantuan darurat": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 30 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 30 detik": 4,
                            "Selalu ≤ 30 detik": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu respons Tele Assistant System untuk bantuan darurat"
                    },
                    "Waktu respons pengaturan parameter operasional lift": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 5 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 6,
                            "Selalu ≤ 5 detik": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu respons pengaturan parameter operasional lift"
                    },
                    "Waktu akses informasi di antarmuka pengguna lift": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 3 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 3 detik": 6,
                            "Selalu ≤ 3 detik": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu akses informasi di antarmuka pengguna lift"
                    },
                    "Tingkat keberhasilan monitor keadaan darurat oleh kamera IoT": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% berhasil": 2,
                            "100% berhasil": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Keberhasilan kamera IoT dalam memantau keadaan darurat"
                    },
                    "Waktu respons pengendalian lift jarak jauh": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 2 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 2 detik": 4,
                            "Selalu ≤ 2 detik": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu respons pengendalian lift melalui aplikasi/web"
                    },
                    "Waktu pembaruan data pada aplikasi atau antarmuka web": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 5 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 4,
                            "Selalu ≤ 5 detik": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu pembaruan data monitoring lift pada aplikasi/web"
                    }
                }
            },
            {
                nama: "Sistem Parkir",
                maksPoinKUK: 48,
                penjelasan: "Sistem parkir cerdas dengan sensor, IoT dan fitur cashless",
                indikator: {
                    "Uptime sistem sensor dan perangkat IoT parkir": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% uptime": 2,
                            "≥ 99% uptime": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat ketersediaan sistem sensor dan IoT parkir"
                    },
                    "Waktu akses kendaraan menggunakan RFID": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 3 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 3 detik": 6,
                            "Selalu ≤ 3 detik": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu akses kendaraan dengan teknologi RFID"
                    },
                    "Akurasi informasi ketersediaan tempat parkir": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% akurasi": 3,
                            "≥ 95% akurasi": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Akurasi informasi ketersediaan dan lokasi parkir real-time"
                    },
                    "Persentase keberhasilan pembayaran parkir cashless": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 98% keberhasilan": 3,
                            "≥ 98% keberhasilan": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat keberhasilan pembayaran parkir cashless"
                    },
                    "Waktu pembaruan informasi pada papan tampilan LED": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 10 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 10 detik": 6,
                            "Selalu ≤ 10 detik": 9
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu pembaruan informasi ketersediaan parkir pada LED"
                    },
                    "Waktu pengolahan dan penyajian laporan visual analisis data parkir": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 5 menit": 2,
                            "Tidak selalu, kadang-kadang ≤ 5 menit": 4,
                            "Selalu ≤ 5 menit": 6
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu pengolahan data penggunaan lahan parkir menjadi laporan visual"
                    },
                    "Persentase perangkat aktif jaringan yang mendukung PoE": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 1,
                            "≥ 90% perangkat": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat dukungan Power over Ethernet pada perangkat aktif"
                    },
                    "Persentase perangkat pasif jaringan yang mendukung PoE": {
                        tipe: "radio",
                        poin: {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 1,
                            "100% perangkat": 3
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat dukungan Power over Ethernet pada perangkat pasif termasuk kabel"
                    }
                }
            },
            {
                nama: "Sistem Pengelolaan Utilitas",
                maksPoinKUK: 48,
                penjelasan: "Sistem pengelolaan utilitas untuk administrasi dan koordinasi",
                indikator: {
                    "Tingkat kesalahan dalam penjadwalan atau eksekusi perintah kerja": {
                        tipe: "radio",
                        poin: {
                            "Tidak dapat diukur": 0,
                            "Kurang dari ≤ 2% kesalahan": 8,
                            "≤ 2% kesalahan": 24
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemeriksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Tingkat kesalahan dalam penjadwalan atau eksekusi perintah kerja utilitas"
                    },
                    "Waktu yang dibutuhkan untuk menemukan dokumen tertentu": {
                        tipe: "radio",
                        poin: {
                            "Selalu lebih dari 3 menit": 8,
                            "Tidak selalu, kadang-kadang ≤ 3 menit": 16,
                            "Selalu ≤ 3 menit": 24
                        },
                        contohDokumentasi: "a. Inspeksi fisik perangkat b. Uji fungsi perangkat c. Pemericksaan integrasi sistem d. Laporan audit/hasil uji lapangan",
                        penjelasan: "Waktu pencarian dokumen dalam sistem manajemen dokumen utilitas"
                    }
                }
            }
        ]
    }
};

// Ekspos matriks ke window agar dapat diakses eksplisit (beberapa browser tidak menaruh const global ke window)
try { if (typeof window !== 'undefined') { window.matriks = window.matriks || matriks; } } catch(_) {}
// Trigger event siap agar skrip lain bisa mengisi dropdown tanpa polling panjang
try { document.dispatchEvent(new Event('matriks:ready')); } catch(_) {}
