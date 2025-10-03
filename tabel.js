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
                "penjelasan": "Sistem memastikan data tidak berubah selama disimpan atau dikirim dengan menggunakan tanda verifikasi digital dan pencatatan riwayat perubahan. Tujuan: menjaga integritas dan keaslian data operasional/rekam jejak agar keputusan dan audit dapat dipertanggungjawabkan. Cakupan: mekanisme checksum/hashing, kontrol versi, audit trail, serta prosedur koreksi bila terjadi inkonsistensi. Bukti yang umum: hasil verifikasi checksum/hashing, konfigurasi algoritma, dan log audit yang menelusuri perubahan (siapa, apa, kapan). Keselarasan: sejalan dengan prinsip tata kelola data yang aman pada Permen PUPR 10/2023 dan SE 22/SE/M/2024.",
                "indikator": {
                    "100% data berhasil diverifikasi menggunakan checksum atau hashing": {
                        "tipe": "checkbox",
                        "poin": 12,
                        "contohDokumentasi": "Laporan hasil verifikasi checksum/hashing; konfigurasi algoritma hashing (SHA-256, MD5); log sistem verifikasi data",
                        "penjelasan": "Sistem memastikan semua data tidak berubah dengan cara membuat 'cap jempol digital' unik untuk setiap data. Setiap kali data digunakan, sistem mengecek apakah cap jempolnya masih sama dengan aslinya (checksum = penjumlahan pemeriksaan; hashing = fungsi yang menghasilkan 'sidik jari' digital unik)"
                    },
                    "100% perubahan data atau riwayat versi data terdokumentasi": {
                        "tipe": "checkbox",
                        "poin": 12,
                        "contohDokumentasi": "Jejak audit (audit trail) basis data; log version control; laporan manajemen perubahan",
                        "penjelasan": "Setiap perubahan data dicatat dengan rinci seperti siapa, kapan, dan apa yang diubah, mirip dengan fitur 'riwayat revisi' di dokumen digital"
                    }
                }
            },
            {
                "nama": "Redundansi perangkat keras",
                "maksPoinKUK": 24,
                "penjelasan": "Komponen kritis seperti server dan jaringan memiliki cadangan yang siap mengambil alih jika terjadi kegagalan. Tujuan: memastikan ketersediaan layanan (availability) dan meminimalkan waktu henti saat terjadi insiden. Cakupan: redundansi pada komponen kritis (server, storage, jaringan, listrik) dengan uji failover berkala, target RTO/RPO, dan rencana pemulihan. Bukti: diagram arsitektur redundansi, laporan uji failover terjadwal, parameter RTO/RPO. Keselarasan: mendukung keandalan layanan sebagaimana semangat pengelolaan sistem cerdas dalam Permen PUPR 10/2023.",
                "indikator": {
                    "Persentase redundansi perangkat kritikal": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 100% redundansi": 4,
                            "100% redundansi": 12
                        },
                        "contohDokumentasi": "Diagram infrastruktur redundansi; laporan uji failover; dokumentasi RTO/RPO (Recovery Time/Point Objective)",
                        "penjelasan": "Pengukur seberapa banyak perangkat penting memiliki 'cadangan' yang siap menggantikan jika perangkat utama rusak"
                    },
                    "Jumlah failover tanpa gangguan layanan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada informasi mengenai jumlahnya": 0,
                            "Terjadi gangguan selama failover": 4,
                            "Tidak ada gangguan selama failover": 12
                        },
                        "contohDokumentasi": "Laporan insiden; log pemantauan ketersediaan; hasil uji failover",
                        "penjelasan": "Berapa kali sistem berhasil beralih ke cadangan tanpa terputus layanannya ke pengguna"
                    }
                }
            },
            {
                "nama": "Analisis event log telah dilakukan",
                "maksPoinKUK": 24,
                "penjelasan": "Seluruh aktivitas sistem dicatat dan dianalisis untuk mendeteksi pola mencurigakan atau kesalahan operasional (umumnya menggunakan SIEM = Security Information and Event Management). Tujuan: deteksi dini insiden dan pemenuhan akuntabilitas operasional. Cakupan: kebijakan retensi log, cakupan sumber log (aplikasi, OS, jaringan, perangkat fisik), korelasi event, dan respons insiden. Bukti: jadwal/otomasi analisis log, konfigurasi SIEM, serta laporan tinjauan dan perbaikan. Keselarasan: praktik baik pengawasan sistem untuk menjaga keamanan dan keselamatan gedung sesuai arahan dokumen regulasi terkait.",
                "indikator": {
                    "Frekuensi analisis log otomatis": {
                        "tipe": "radio",
                        "poin": {
                            "Setiap lebih dari 1 menit": 4,
                            "Kadang-kadang setiap 1 menit": 8,
                            "Instant atau real-time dengan maksimal setiap 1 menit": 12
                        },
                        "contohDokumentasi": "Jadwal analisis log; konfigurasi alat SIEM (Security Information and Event Management); laporan tinjauan berkala",
                        "penjelasan": "Seberapa sering sistem secara otomatis memeriksa catatan aktivitas untuk mencari pola mencurigakan"
                    },
                    "Tingkat deteksi insiden berdasarkan hasil analisis log": {
                        "tipe": "radio",
                        "poin": {
                            "Insiden keamanan tidak dapat dideteksi": 0,
                            "Kurang dari 95% insiden keamanan terdeteksi": 4,
                            "Lebih dari 95% insiden keamanan terdeteksi": 12
                        },
                        "contohDokumentasi": "Laporan deteksi insiden; false positive, false negative (positif palsu, negatif palsu); umpan intelijen ancaman (threat intelligence)",
                        "penjelasan": "Kemampuan sistem menemukan kejadian tidak normal dari pemeriksaan catatan aktivitas"
                    }
                }
            },
            {
                "nama": "Kontrol akses (hardware dan software) pada setiap lapisan Open System Interconnection (OSI) telah diterapkan",
                "maksPoinKUK": 27,
                "penjelasan": "Pembatasan akses diterapkan secara menyeluruh mulai dari tingkat fisik hingga aplikasi (OSI = model 7 lapis untuk komunikasi data). Tujuan: prinsip least privilege dan pemisahan tugas diterapkan konsisten agar risiko penyalahgunaan/insiden berkurang. Cakupan: kontrol di lapisan fisik, data link, network, transport, session, presentation, dan application; termasuk autentikasi, otorisasi, dan hardening. Bukti: matriks kontrol akses per lapisan, aturan firewall, dan arsip peninjauan berkala. Keselarasan: mendukung keamanan operasi sistem cerdas sebagaimana semangat Permen PUPR 10/2023.",
                "indikator": {
                    "Tingkat penerapan kontrol akses pada layer OSI": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 100% layer diterapkan kontrol akses": 9,
                            "100% layer diterapkan kontrol akses tetapi tidak konsisten": 18,
                            "100% layer selalu diterapkan kontrol akses": 27
                        },
                        "contohDokumentasi": "Diagram arsitektur keamanan jaringan; matriks kontrol akses; aturan firewall",
                        "penjelasan": "Penerapan pengamanan di semua tingkat jaringan, dari fisik (pintu terkunci) hingga aplikasi (login user)"
                    }
                }
            },
            {
                "nama": "Segmentasi jaringan untuk membatasi akses dan meminimalkan permukaan serangan",
                "maksPoinKUK": 24,
                "penjelasan": "Jaringan dibagi menjadi zona-zona terpisah untuk membatasi penyebaran gangguan (VLAN = Virtual LAN; micro-segmentation = pembagian sangat halus per-perangkat/aplikasi). Tujuan: mengurangi permukaan serangan dan membatasi lateral movement jika terjadi kompromi. Cakupan: perancangan zona, ACL antar‑zona, inspeksi trafik, dan pemantauan kepatuhan. Bukti: diagram segmentasi, kebijakan ACL, hasil review arsitektur. Keselarasan: sejalan dengan prinsip pertahanan berlapis untuk sistem gedung cerdas pada dokumen regulasi.",
                "indikator": {
                    "Jumlah segmen jaringan yang terisolasi": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 3 segmen terisolasi": 4,
                            "≥ 3 segmen terisolasi": 12
                        },
                        "contohDokumentasi": "Diagram segmentasi jaringan; konfigurasi VLAN (Virtual LAN); kebijakan mikro-segmentasi",
                        "penjelasan": "Banyaknya pembagian jaringan menjadi area-area terpisah untuk membatasi penyebaran masalah"
                    },
                    "Persentase lalu lintas jaringan yang dipantau": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 100% lalu lintas jaringan dipantau": 4,
                            "100% lalu lintas jaringan dipantau tetapi tidak konsisten": 8,
                            "100% lalu lintas jaringan selalu dipantau": 12
                        },
                        "contohDokumentasi": "Laporan pemantauan jaringan; dasbor analisis trafik; data NetFlow",
                        "penjelasan": "Seberapa banyak traffic data yang diawasi untuk mendeteksi aktivitas mencurigakan (NetFlow = ringkasan arus data jaringan untuk analisis)"
                    }
                }
            },
            {
                "nama": "Dilakukannya enkripsi end-to-end pada data yang dikirim melalui jaringan komunikasi",
                "maksPoinKUK": 30,
                "penjelasan": "Data dienkripsi dari sumber hingga tujuan sehingga tidak dapat dibaca pihak lain selama transmisi (contoh protokol: TLS = Transport Layer Security). Tujuan: menjaga kerahasiaan dan integritas data selama transit. Cakupan: kebijakan klasifikasi data, pemilihan cipher/protokol, manajemen kunci/sertifikat, dan audit penerapan. Bukti: inventaris sertifikat TLS, konfigurasi protokol, laporan penerapan pada kanal sensitif. Keselarasan: memenuhi kebutuhan komunikasi aman sebagaimana praktik baik yang didorong oleh regulasi.",
                "indikator": {
                    "100% data yang dikirim dienkripsi menggunakan standar enkripsi tertentu": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "Sertifikat SSL/TLS; konfigurasi protokol enkripsi; manajemen kunci kriptografi",
                        "penjelasan": "Semua data yang dikirim antar sistem dilindungi dengan 'kode rahasia' sehingga tidak bisa dibaca pihak lain"
                    },
                    "100% komunikasi data sensitif menggunakan enkripsi": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "Kebijakan klasifikasi data; laporan implementasi enkripsi; protokol komunikasi aman",
                        "penjelasan": "Khusus untuk data rahasia seperti password atau informasi pribadi, harus selalu menggunakan pengamanan ekstra"
                    }
                }
            },
            {
                "nama": "Sistem kendali akses jaringan pada level kontroler memiliki fitur: Pelaporan dan Analitik, Audit Trail",
                "maksPoinKUK": 27,
                "penjelasan": "Terpusatnya pengelolaan akses jaringan dengan kemampuan pelaporan dan pencatatan aktivitas. Tujuan: meningkatkan visibilitas, akuntabilitas, dan pengendalian perubahan. Cakupan: autentikasi yang andal, pencatatan kegiatan admin/perubahan konfigurasi, serta pelaporan metrik kinerja. Bukti: laporan keberhasilan autentikasi, analitik login gagal, cakupan logging, dan review berkala. Keselarasan: praktik administrasi yang baik untuk menjaga keandalan sistem cerdas sesuai arah kebijakan.",
                "indikator": {
                    "Tingkat keberhasilan autentikasi": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 98%": 3,
                            "Minimal 98%": 9
                        },
                        "contohDokumentasi": "Laporan tingkat keberhasilan autentikasi; analisis login gagal; laporan efektivitas MFA (Multi‑Factor Authentication)",
                        "penjelasan": "Persentase keberhasilan proses login atau verifikasi identitas pengguna"
                    },
                    "Waktu rata-rata autentikasi": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari dua detik": 3,
                            "Tidak selalu, kadang-kadang 2 detik atau lebih": 6,
                            "Selalu kurang dari 2 detik": 9
                        },
                        "contohDokumentasi": "Metrik latensi autentikasi; data pemantauan kinerja; laporan pengalaman pengguna",
                        "penjelasan": "Rata-rata waktu yang dibutuhkan dari memasukkan password sampai berhasil masuk sistem"
                    },
                    "Cakupan logging aktivitas": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada pencatatan": 0,
                            "Kurang dari 100% tercatat": 3,
                            "Mencakup 100% aktivitas penting (autentikasi dan perubahan konfigurasi terkait kendali akses)": 9
                        },
                        "contohDokumentasi": "Penilaian cakupan log; pemeriksaan kelengkapan jejak audit; kepatuhan kebijakan pencatatan (logging)",
                        "penjelasan": "Seberapa lengkap sistem mencatat semua aktivitas yang terjadi, seperti siapa melakukan apa dan kapan"
                    }
                }
            },
            {
                "nama": "100% tingkat kepatuhan dalam mengimplementasikan mekanisme penggantian password standar saat pertama kali digunakan",
                "maksPoinKUK": 15,
                "penjelasan": "Pengguna diwajibkan mengganti kata sandi default saat pertama kali masuk. Tujuan: menutup risiko kredensial standar pabrikan yang mudah disalahgunakan. Cakupan: deteksi akun/kata sandi default, pemaksaan penggantian saat login pertama, persyaratan kompleksitas kata sandi, dan penegakan periodik. Bukti: laporan kepatuhan kebijakan kata sandi, audit konfigurasi, dan daftar akun tersanitasi. Keselarasan: selaras dengan prinsip hardening pada sistem cerdas sesuai arahan regulasi.",
                "indikator": {
                    "Kepatuhan implementasi mekanisme penggantian password": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "Laporan kepatuhan kebijakan kata sandi; audit akun pengguna; pemeriksaan konfigurasi keamanan",
                        "penjelasan": "Ketaatan terhadap aturan wajib ganti password pertama kali dan periodic password change"
                    }
                }
            },
            {
                "nama": "Kinerja proteksi login jika ada upaya ganti password gagal sebanyak tiga kali",
                "maksPoinKUK": 24,
                "penjelasan": "Sistem mengunci akun setelah tiga kali percobaan gagal mengganti kata sandi. Tujuan: mencegah brute force/penyalahgunaan akun. Cakupan: ambang batas kegagalan, lama blokir, notifikasi otomatis, dan prosedur pembukaan blokir yang terkontrol. Bukti: kebijakan penguncian, log kejadian, dan catatan notifikasi. Keselarasan: praktik kontrol akses aman untuk menjaga operasional gedung.",
                "indikator": {
                    "Waktu blokir akun": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 jam": 4,
                            "Tidak selalu, kadang-kadang 1 jam": 8,
                            "Selalu 1 jam": 12
                        },
                        "contohDokumentasi": "Kebijakan penguncian akun; waktu respons insiden; log kejadian keamanan",
                        "penjelasan": "Lama waktu akun terkunci setelah beberapa kali salah password atau percobaan tidak sah"
                    },
                    "Kecepatan notifikasi pengguna": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada notifikasi pengguna": 0,
                            "Tidak langsung saat blokir terjadi": 4,
                            "Notifikasi langsung saat blokir terjadi": 12
                        },
                        "contohDokumentasi": "Log sistem notifikasi; waktu respons peringatan; rekam komunikasi pengguna",
                        "penjelasan": "Cepatnya sistem memberi tahu user tentang aktivitas mencurigakan atau perubahan penting"
                    }
                }
            },
            {
                "nama": "Dapat dipastikan bahwa hanya pengguna yang terautentikasi yang dapat mengakses sistem serta mengotorisasi fitur dan data berdasarkan peran pengguna",
                "maksPoinKUK": 27,
                "penjelasan": "Hak akses pengguna dibatasi sesuai perannya dalam organisasi. Tujuan: memastikan setiap pengguna hanya mengakses fitur/data sesuai tugas (least privilege). Cakupan: perancangan peran, pemetaan hak akses ke peran, peninjauan akses berkala, dan pemutakhiran saat perubahan tugas. Bukti: matriks RBAC, berita acara tinjauan akses, dan jejak audit perubahan hak. Keselarasan: mendukung tata kelola akses yang baik sebagaimana prinsip sistem cerdas pada regulasi.",
                "indikator": {
                    "100% akses dikendalikan dengan Role-Based Access Control (RBAC) secara konsisten": {
                        "tipe": "checkbox",
                        "poin": 27,
                        "contohDokumentasi": "Matriks RBAC (Role‑Based Access Control); penetapan peran pengguna; laporan tinjauan akses",
                        "penjelasan": "Semua hak akses diatur berdasarkan jabatan/tugas, misal admin bisa semua, staff hanya sebagian (RBAC = Role-Based Access Control)"
                    }
                }
            },
            {
                "nama": "Menerapkan manajemen remote",
                "maksPoinKUK": 27,
                "penjelasan": "Administrator dapat mengelola dan memelihara sistem dari jarak jauh. Tujuan: meningkatkan keberlanjutan layanan tanpa kehadiran fisik, dengan tetap menjaga keamanan koneksi. Cakupan: kanal aman (VPN/SSH), prosedur persetujuan, SLA pemrosesan akses, dan pemantauan upaya ilegal. Bukti: log akses jarak jauh, laporan koneksi VPN, dan alur persetujuan. Keselarasan: efisiensi operasional yang aman, selaras praktik baik pada pengelolaan gedung cerdas.",
                "indikator": {
                    "Tingkat keberhasilan pemrosesan permintaan akses jarak jauh": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 98%": 3,
                            "Tidak selalu, kadang-kadang 98-100%": 6,
                            "Selalu 98-100%": 9
                        },
                        "contohDokumentasi": "Log akses jarak jauh; laporan koneksi VPN; alur permintaan akses",
                        "penjelasan": "Persentase berhasilnya permintaan akses sistem dari luar gedung diproses (VPN = Virtual Private Network, terowongan terenkripsi ke jaringan internal)"
                    },
                    "Waktu rata-rata untuk menyelesaikan permintaan remote, mulai dari saat permintaan diajukan hingga akses diberikan atau ditolak": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 menit": 3,
                            "Tidak selalu, kadang-kadang 1-4 menit": 6,
                            "Selalu 1-4 menit": 9
                        },
                        "contohDokumentasi": "Kepatuhan SLA (Service Level Agreement); linimasa pemrosesan permintaan; laporan kinerja helpdesk",
                        "penjelasan": "Rata-rata waktu dari pengajuan sampai disetujui/tolak akses remote"
                    },
                    "Jumlah upaya akses tidak sah yang diblokir": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada pemblokiran akses tidak sah": 0,
                            "Kurang dari 100% tidak sah diblokir": 3,
                            "100% akses tidak sah diblokir": 9
                        },
                        "contohDokumentasi": "Log percobaan intrusi; laporan pemblokiran firewall; rekam insiden keamanan",
                        "penjelasan": "Banyaknya percobaan masuk illegal yang berhasil dicegah sistem"
                    }
                }
            },
            {
                "nama": "Sistem deteksi intrusi jaringan efektif dalam mendeteksi dan memberikan peringatan dini terhadap upaya akses yang tidak sah",
                "maksPoinKUK": 27,
                "penjelasan": "Pemantauan lalu lintas jaringan secara real-time untuk deteksi aktivitas mencurigakan (sering disebut IDS/IPS = Intrusion Detection/Prevention System). Tujuan: mempercepat deteksi dan respons terhadap ancaman. Cakupan: sensor pemantauan, korelasi peristiwa, ambang deteksi, dan playbook respons. Bukti: metrik waktu deteksi/respons, laporan akurasi (termasuk false positive/false negative), dan pelatihan SOC. Keselarasan: penguatan keamanan operasional sesuai prinsip keselamatan dan keandalan sistem gedung.",
                "indikator": {
                    "Waktu rata-rata untuk deteksi intrusi": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 menit": 3,
                            "Tidak selalu, kadang-kadang ≤ 1 menit": 6,
                            "Selalu ≤ 1 menit": 9
                        },
                        "contohDokumentasi": "Metrik waktu deteksi; data kinerja SIEM; linimasa respons ancaman",
                        "penjelasan": "Kecepatan sistem mendeteksi percobaan pembobolan sejak terjadi"
                    },
                    "Tingkat deteksi intrusi": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 99,5%": 3,
                            "Tidak selalu, kadang-kadang ≥ 99,5%": 6,
                            "Selalu ≥ 99,5%": 9
                        },
                        "contohDokumentasi": "Laporan akurasi deteksi; false alarm rate (tingkat alarm palsu); efektivitas identifikasi ancaman",
                        "penjelasan": "Akurasi sistem dalam menemukan serangan yang sebenarnya"
                    },
                    "Waktu rata-rata untuk respons intrusi": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 menit": 3,
                            "Tidak selalu, kadang-kadang ≤ 5 menit": 6,
                            "Selalu ≤ 5 menit": 9
                        },
                        "contohDokumentasi": "Waktu respons insiden; metrik kinerja SOC (Security Operations Center); eksekusi prosedur darurat",
                        "penjelasan": "Kecepatan tim security merespons setelah dapat alert serangan"
                    }
                }
            },
            {
                "nama": "Sistem masuk tunggal (single sign-on) memungkinkan pengguna terautentikasi langsung ke dalam sistem akses setelah terautentikasi di sistem operasi komputer workstation",
                "maksPoinKUK": 24,
                "penjelasan": "Pengguna dapat mengakses multiple sistem setelah sekali login (SSO = Single Sign-On, login tunggal). Tujuan: pengalaman pengguna yang baik dan pengelolaan kredensial yang lebih aman. Cakupan: integrasi sumber identitas, kebijakan sesi tunggal, dan pemantauan latensi/keandalan autentikasi. Bukti: metrik kinerja SSO, catatan kegagalan/keberhasilan, dan dokumentasi integrasi. Keselarasan: mendukung efisiensi operasional dan kemudahan layanan.",
                "indikator": {
                    "Waktu rata-rata respons sistem masuk tunggal": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 2 detik": 8,
                            "Kadang-kadang 2 detik atau kurang": 16,
                            "Selalu ≤ 2 detik": 24
                        },
                        "contohDokumentasi": "Metrik kinerja SSO; latensi autentikasi; data pengalaman pengguna",
                        "penjelasan": "Kecepatan proses login sekali untuk semua sistem (single sign-on)"
                    }
                }
            },
            {
                "nama": "Multi-Factor Authentication (MFA) telah diimplementasikan",
                "maksPoinKUK": 24,
                "penjelasan": "Verifikasi identitas menggunakan minimal dua faktor autentikasi (MFA = Multi-Factor Authentication). Tujuan: meningkatkan kekuatan autentikasi pada akses berisiko tinggi. Cakupan: kebijakan cakupan MFA (akun sensitif), jenis faktor (sesuatu yang diketahui/dimiliki/dimiliki—biometrik), dan kesiapan pemulihan. Bukti: tingkat adopsi per segmen pengguna, daftar metode yang didukung, dan pelaporan kepatuhan. Keselarasan: praktik kontrol akses yang kuat sesuai semangat regulasi.",
                "indikator": {
                    "Persentase pengguna yang mengaktifkan MFA": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada yang mengaktifkan MFA": 0,
                            "Kurang dari 100% pengguna dengan akses ke data sensitif": 4,
                            "100% pengguna dengan akses ke data sensitif": 12
                        },
                        "contohDokumentasi": "Tingkat adopsi MFA; laporan pendaftaran pengguna; metrik kepatuhan keamanan",
                        "penjelasan": "Seberapa banyak user yang sudah menggunakan verifikasi 2 langkah (password + kode/hp)"
                    },
                    "Jumlah metode autentikasi yang didukung": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada metode autentikasi": 0,
                            "Terdapat 1 metode autentikasi": 4,
                            "≥ 2 metode autentikasi": 12
                        },
                        "contohDokumentasi": "Dokumentasi metode autentikasi; daftar protokol yang didukung; matriks fitur keamanan",
                        "penjelasan": "Banyaknya cara verifikasi identitas yang tersedia (password, fingerprint, OTP, dll)"
                    }
                }
            },
            {
                "nama": "Sistem memungkinkan untuk multiakses",
                "maksPoinKUK": 24,
                "penjelasan": "Beberapa pengguna dapat mengakses sistem secara bersamaan tanpa gangguan. Tujuan: skalabilitas dan kontinuitas layanan saat beban tinggi. Cakupan: desain kapasitas, load balancing, batas koneksi per layanan, dan pemantauan kinerja. Bukti: uji kapasitas pengguna bersamaan, laporan skalabilitas, dan hasil uji beban. Keselarasan: mendukung layanan sistem cerdas yang andal dan responsif.",
                "indikator": {
                    "Tingkat keberhasilan akses bersamaan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak memungkinkan multiakses": 0,
                            "Kurang dari 99,9% keberhasilan": 4,
                            "≥ 99,9% keberhasilan": 12
                        },
                        "contohDokumentasi": "Uji kapasitas pengguna bersamaan; kinerja load balancing; laporan skalabilitas sistem",
                        "penjelasan": "Kemampuan sistem melayani banyak user login bersamaan tanpa error"
                    },
                    "Kapasitas maksimal akses bersamaan": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 5 perangkat": 4,
                            "Tidak selalu, kadang-kadang 5 perangkat": 8,
                            "Selalu ≥ 5 perangkat": 12
                        },
                        "contohDokumentasi": "Hasil uji beban; perencanaan kapasitas sistem; tolok ukur kinerja",
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
                "penjelasan": "Penggunaan protokol standar terbuka (open standard) yang terdokumentasi publik memastikan perangkat lintas‑vendor dapat saling terhubung tanpa ketergantungan pada satu pabrikan. Tujuan: mencegah vendor lock‑in dan mempermudah integrasi, operasi, serta pemeliharaan jangka panjang. Cakupan: pemilihan protokol terbuka untuk otomasi gedung dan IP (mis. BACnet, Modbus TCP, MQTT, HTTP/REST) beserta spesifikasi antarmuka. Bukti: daftar protokol per subsistem, pernyataan/sertifikasi kompatibilitas, dan hasil uji interoperabilitas. Keselarasan: mendorong keterbukaan dan keberlanjutan ekosistem sistem gedung cerdas sesuai semangat Permen PUPR 10/2023.",
                "indikator": {
                    "Implementasi protokol standar terbuka": {
                        "tipe": "checkbox",
                        "poin": 30,
                        "contohDokumentasi": "Dokumen implementasi protokol; laporan uji interoperabilitas; kepatuhan standar",
                        "penjelasan": "Penggunaan bahasa komunikasi universal antar perangkat berbeda merk"
                    }
                }
            },
            {
                "nama": "100% perangkat jaringan menggunakan protokol komunikasi yang kompatibel dengan TCP/IP, seperti BACnet/IP, Modbus TCP, dan lainnya",
                "maksPoinKUK": 30,
                "penjelasan": "Seluruh perangkat jaringan menggunakan protokol standar yang mendukung interoperabilitas pada tumpukan TCP/IP. Tujuan: memastikan seluruh komunikasi di jaringan gedung berjalan di atas IP agar mudah diintegrasikan dan dipantau. Cakupan: dukungan addressing/routing IP, protokol industri berbasis IP seperti BACnet/IP (otomasi gedung) dan Modbus TCP (perangkat industri), serta praktik konfigurasi yang benar. Bukti: uji kepatuhan/kompatibilitas TCP/IP, konfigurasi jaringan, dan daftar protokol yang digunakan. Keselarasan: menguatkan arsitektur jaringan gedung modern yang terbuka dan terukur sebagaimana praktik baik yang didorong regulasi.",
                "indikator": {
                    "Tingkat kompatibilitas dengan TCP/IP": {
                        "tipe": "checkbox",
                        "poin": 30,
                        "contohDokumentasi": "Uji kepatuhan TCP/IP; sertifikasi perangkat jaringan; laporan analisis protokol",
                        "penjelasan": "Kemampuan perangkat menggunakan bahasa internet standar untuk saling terhubung"
                    }
                }
            },
            {
                "nama": "Setiap lapisan OSI dipastikan sudah optimal",
                "maksPoinKUK": 21,
                "penjelasan": "Setiap lapisan model OSI (L1–L7) dioptimalkan untuk kinerja end‑to‑end. Tujuan: komunikasi data andal dan efisien dari fisik hingga aplikasi. Cakupan: L1 fisik (kabel/optik/optical budget), L2 data link (MAC/VLAN, kontrol error frame), L3 network (IP/routing), L4 transport (tuning TCP/UDP), L5 session (manajemen sesi/keep‑alive), L6 presentation (enkripsi/kompresi), L7 application (protokol aplikasi/industri). Tolok ukur: latensi, tingkat kesalahan frame/paket, keberhasilan pengiriman (packet delivery), pembentukan sesi, akurasi enkripsi/dekripsi, dan waktu respons aplikasi. Bukti: baseline kinerja per lapisan, dokumentasi konfigurasi/tuning, dan hasil uji periodik. Keselarasan: mendukung keandalan layanan sistem gedung cerdas sesuai arahan kebijakan.",
                "indikator": {
                    "Waktu respons pengiriman/permintaan data": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 1 detik": 2,
                            "Selalu ≤ 1 detik": 3
                        },
                        "contohDokumentasi": "Pengukuran latensi jaringan; pemantauan waktu respons; data kinerja QoS (Quality of Service)",
                        "penjelasan": "Kecepatan kirim-terima data antara perangkat dalam jaringan (latensi = jeda waktu kirim-balas)"
                    },
                    "Tingkat kesalahan pengiriman frame data": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        "contohDokumentasi": "Pengukuran tingkat kesalahan frame; laporan kualitas jaringan; log koreksi kesalahan",
                        "penjelasan": "Persentase error dalam pengiriman paket data dasar di jaringan lokal (frame = unit data di jaringan lokal; paket = unit data di jaringan luas)"
                    },
                    "Tingkat keberhasilan pengiriman paket": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        "contohDokumentasi": "Rasio pengiriman paket (packet delivery ratio); metrik keandalan jaringan; kualitas transmisi data",
                        "penjelasan": "Persentase berhasilnya kirim data sampai tujuan tanpa hilang (packet delivery ratio; paket = ‘bungkus’ data di jaringan luas)"
                    },
                    "Tingkat keberhasilan koneksi TCP/UDP": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        "contohDokumentasi": "Tingkat keberhasilan koneksi; analisis kinerja protokol; pemeriksaan kesehatan jaringan",
                        "penjelasan": "Keberhasilan membuat koneksi stabil (TCP) atau cepat (UDP) antar perangkat (TCP = andal/berurutan; UDP = ringan/cepat)"
                    },
                    "Tingkat keberhasilan pembentukan sesi": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        "contohDokumentasi": "Log pembentukan sesi; uji ketahanan koneksi; data kinerja aplikasi",
                        "penjelasan": "Kemampuan sistem mempertahankan koneksi aktif selama komunikasi berlangsung"
                    },
                    "Tingkat keberhasilan enkripsi-dekripsi data": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% keberhasilan": 1,
                            "≥ 99% keberhasilan": 3
                        },
                        "contohDokumentasi": "Tingkat keberhasilan enkripsi/dekripsi; log operasi kriptografi; kinerja prosesor keamanan",
                        "penjelasan": "Akurasi proses mengunci-buka kode data tanpa error"
                    },
                    "Waktu respons aplikasi": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 1 detik": 2,
                            "Selalu ≤ 1 detik": 3
                        },
                        "contohDokumentasi": "Pengukuran waktu respons aplikasi; metrik pengalaman pengguna; pemantauan kinerja",
                        "penjelasan": "Kecepatan aplikasi merespons perintah user setelah diklik/ditekan (waktu respons ujung-ke-ujung)"
                    }
                }
            },
            {
                "nama": "100% sudah melakukan implementasi standar tertentu untuk pengelolaan jaringan kabel",
                "maksPoinKUK": 30,
                "penjelasan": "Penerapan tata kelola jaringan kabel yang rapi, aman, dan terdokumentasi. Tujuan: memudahkan operasi, pemeliharaan, dan audit, serta meminimalkan gangguan layanan. Cakupan: perencanaan rak/tray, manajemen patch cord, pengkodean warna, jarak tikung (bend radius), dan praktik terminasi sesuai standar industri (mis. TIA‑568/TIA‑606 atau praktik setara). Bukti: standar/prosedur penataan kabel, diagram tata letak rak, dan laporan kepatuhan instalasi. Keselarasan: mendukung keselamatan dan keandalan infrastruktur sebagaimana praktik baik pengelolaan gedung.",
                "indikator": {
                    "Implementasi standar pengelolaan jaringan kabel": {
                        "tipe": "checkbox",
                        "poin": 30,
                        "contohDokumentasi": "Standar penataan kabel; diagram tata letak rak; laporan kepatuhan instalasi",
                        "penjelasan": "Penerapan aturan penataan kabel yang rapi dan terorganisir"
                    }
                }
            },
            {
                "nama": "Sudah melakukan implementasi pelabelan infrastruktur kabel dan peralatan sesuai standar konvensi penamaan",
                "maksPoinKUK": 30,
                "penjelasan": "Pemberian label yang konsisten pada kabel dan perangkat untuk identifikasi cepat dan akurat. Tujuan: mempercepat troubleshooting dan audit aset. Cakupan: skema penamaan untuk rak (rack/RU), patch panel/port, jalur trunk, kabel horizontal/backbone, perangkat aktif, serta penggunaan warna/ikon. Bukti: dokumen konvensi penamaan, sampel label terpasang, dan hasil audit kepatuhan. Keselarasan: meningkatkan kematangan operasi jaringan sesuai prinsip tata kelola infrastruktur yang baik.",
                "indikator": {
                    "Tingkat implementasi pelabelan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada standar pelabelan dan warna yang diterapkan": 0,
                            "Kurang dari 100% infrastruktur diberi label dan warna sesuai standar": 10,
                            "100% infrastruktur diberi label dan warna sesuai standar": 30
                        },
                        "contohDokumentasi": "Pemeriksaan kepatuhan pelabelan; audit identifikasi aset; dokumentasi pemeliharaan",
                        "penjelasan": "Kelengkapan pemberian label pada kabel dan perangkat untuk memudahkan identifikasi"
                    }
                }
            },
            {
                "nama": "100% sudah melakukan implementasi standar tertentu untuk pengelolaan jaringan nirkabel (jika ada)",
                "maksPoinKUK": 30,
                "penjelasan": "Pengelolaan WLAN (Wireless LAN) yang terencana untuk kinerja dan keamanan. Tujuan: memastikan pengalaman pengguna yang baik dan jaringan yang aman. Cakupan: desain kanal/daya, perencanaan roaming, pemisahan SSID (nama jaringan), kebijakan keamanan (WPA2/WPA3), isolasi klien, captive portal, dan manajemen spektrum. Bukti: hasil site survey/heatmap, kebijakan Wi‑Fi, dan konfigurasi WLAN/SSID. Keselarasan: mendukung layanan nirkabel yang andal di lingkungan gedung cerdas.",
                "indikator": {
                    "Implementasi standar pengelolaan jaringan nirkabel": {
                        "tipe": "checkbox",
                        "poin": 30,
                        "contohDokumentasi": "Implementasi kebijakan nirkabel; konfigurasi WLAN (Wireless LAN); laporan kepatuhan keamanan",
                        "penjelasan": "Penerapan aturan pengaturan WiFi yang aman dan optimal"
                    }
                }
            },
            {
                "nama": "Sudah menerapkan pendekatan umum dalam pelabelan infrastruktur peralatan dan titik akses nirkabel",
                "maksPoinKUK": 27,
                "penjelasan": "Pemberian label/penamaan konsisten untuk perangkat nirkabel dan SSID guna memudahkan operasi. Tujuan: mempercepat penelusuran lokasi dan fungsi perangkat. Cakupan: penamaan SSID, penomoran/ID access point per lantai/ruang, penandaan radio/band (2,4/5/6 GHz), dan referensi lokasi fisik. Bukti: dokumen konvensi penamaan, inventaris AP/SSID, dan hasil verifikasi lapangan. Keselarasan: memperkuat pengelolaan aset jaringan nirkabel sesuai praktik baik.",
                "indikator": {
                    "Tingkat penerapan pendekatan pelabelan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada pendekatan yang diterapkan": 0,
                            "Kurang dari 100% pendekatan umum diterapkan": 9,
                            "100% pendekatan umum diterapkan": 27
                        },
                        "contohDokumentasi": "Konvensi penamaan SSID (nama jaringan Wi‑Fi); standar pelabelan perangkat; dokumentasi jaringan",
                        "penjelasan": "Konsistensi penamaan perangkat nirkabel dan jaringan WiFi (SSID = nama jaringan Wi‑Fi; WLAN = Wireless LAN)"
                    }
                }
            },
            {
                "nama": "Jika digunakan, teknologi 5G dapat menjalankan fitur utama yang ada pada standar 3GPP release 17 atau lebih baru",
                "maksPoinKUK": 24,
                "penjelasan": "Implementasi jaringan 5G mendukung fitur tingkat lanjut sesuai 3GPP Rel‑17+. Tujuan: menghadirkan konektivitas berperforma tinggi untuk use case kritikal gedung. Cakupan: URLLC (latensi sangat rendah), eMBB (throughput tinggi), network slicing (pembagian jaringan per layanan), pemetaan QoS, dan integrasi in‑building (DAS/Small Cell; DAS = Distributed Antenna System). Bukti: spesifikasi pemasok/ operator, hasil uji latensi end‑to‑end dan throughput per slice, serta konfigurasi slicing/QoS. Keselarasan: kesiapan transformasi digital gedung sesuai arah pengembangan teknologi.",
                "indikator": {
                    "Latensi end-to-end": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 ms": 4,
                            "Tidak selalu, kadang-kadang ≤ 1 ms": 8,
                            "Selalu ≤ 1 ms": 12
                        },
                        "contohDokumentasi": "Pengukuran latensi end-to-end (ujung-ke-ujung); uji kinerja jaringan; analisis respons aplikasi",
                        "penjelasan": "Total waktu kirim data dari sumber sampai penerima termasuk semua proses di jalan (latensi end-to-end/ujung-ke-ujung)"
                    },
                    "Network slice throughput": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 50 Mbps per user": 4,
                            "Tidak selalu, kadang-kadang ≥ 50 Mbps per user": 8,
                            "Selalu ≥ 50 Mbps per user": 12
                        },
                        "contohDokumentasi": "Uji kinerja network slicing; pengukuran throughput; laporan validasi QoS",
                        "penjelasan": "Kapasitas kirim data untuk jenis layanan tertentu (video, voice, data) di jaringan 5G (throughput = laju data per detik; network slicing = pembagian jaringan per jenis layanan)"
                    }
                }
            },
            {
                "nama": "Mengevaluasi penggunaan port dan layanan pada perangkat berbasis IP",
                "maksPoinKUK": 33,
                "penjelasan": "Pemeriksaan berkala port/layanan untuk mengurangi permukaan serangan. Tujuan: menonaktifkan layanan tidak perlu dan menguatkan konfigurasi (hardening). Cakupan: inventaris port/layanan, penutupan layanan legacy (mis. Telnet/FTP), ekspos hanya layanan esensial, pembaruan patch, serta verifikasi banner/konfigurasi aman. Bukti: hasil pemindaian port berkala, daftar layanan yang dinonaktifkan, dan kebijakan hardening. Keselarasan: mendukung keamanan operasional sistem cerdas.",
                "indikator": {
                    "Persentase port dan layanan tidak aman yang dinonaktifkan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada penonaktifan port dan layanan tidak aman": 0,
                            "Kurang dari 100% port dan layanan tidak aman dinonaktifkan": 11,
                            "100% port dan layanan tidak aman dinonaktifkan": 33
                        },
                        "contohDokumentasi": "Audit keamanan port; laporan pengerasan layanan (hardening); asesmen kerentanan",
                        "penjelasan": "Banyaknya celah keamanan yang ditutup dengan mematikan port/layanan tidak perlu"
                    }
                }
            },
            {
                "nama": "Koneksi kabel di rak server telah menggunakan patch panel. Koneksi perangkat berbasis IP telah menggunakan modular jack female",
                "maksPoinKUK": 24,
                "penjelasan": "Penerapan terminasi terstruktur untuk keandalan dan kemudahan pemeliharaan. Tujuan: memudahkan patching/relokasi dan menjaga kualitas sinyal. Cakupan: penggunaan patch panel di rak untuk terminasi kabel horizontal, modular jack female pada outlet/perangkat, serta standar terminasi pin‑out (mis. T568A/T568B). Bukti: dokumentasi instalasi/foto, inspeksi terminasi, dan daftar titik layanan. Keselarasan: meningkatkan keselamatan dan keandalan jaringan gedung.",
                "indikator": {
                    "Persentase penggunaan patch panel untuk koneksi kabel di rak server": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada penggunaan patch panel": 0,
                            "Kurang dari 100% penggunaan": 4,
                            "100% penggunaan": 12
                        },
                        "contohDokumentasi": "Dokumentasi tata letak rak; instalasi patch panel; foto penataan kabel",
                        "penjelasan": "Seberapa rapi kabel di rak server diatur menggunakan panel khusus (patch panel = panel pengatur koneksi kabel di rak)"
                    },
                    "Persentase penggunaan modular jack female untuk koneksi perangkat berbasis IP": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada penggunaan modular jack female": 0,
                            "Kurang dari 100% penggunaan": 4,
                            "100% penggunaan": 12
                        },
                        "contohDokumentasi": "Laporan instalasi jack; kepatuhan standar konektivitas; dokumentasi outlet jaringan",
                        "penjelasan": "Penggunaan stop kontak jaringan standar untuk kemudahan pemasangan (modular jack = soket jaringan pada outlet/perangkat)"
                    }
                }
            },
            {
                "nama": "Koneksi perangkat berbasis jaringan IP telah menggunakan kabel patch cord",
                "maksPoinKUK": 30,
                "penjelasan": "Pemanfaatan patch cord bersertifikasi sesuai kategori kabel untuk koneksi perangkat IP yang andal. Tujuan: memastikan kinerja jaringan sesuai spesifikasi. Cakupan: penggunaan patch cord sesuai kategori (Cat5e/Cat6/Cat6A), panjang yang memadai, dan manajemen patching yang tertata. Bukti: inventaris patch cord, spesifikasi teknis, dan pemeriksaan pemasangan. Keselarasan: menjaga performa dan kerapian infrastruktur jaringan.",
                "indikator": {
                    "Persentase penggunaan kabel patch cord": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada penggunaan kabel patch cord": 0,
                            "Kurang dari 100% penggunaan": 10,
                            "100% penggunaan": 30
                        },
                        "contohDokumentasi": "Inventaris patch cord; kepatuhan spesifikasi kabel; dokumentasi instalasi",
                        "penjelasan": "Penggunaan kabel jaringan pendek standar untuk hubungkan perangkat"
                    }
                }
            },
            {
                "nama": "Sistem dapat mengelola QoS dengan baik",
                "maksPoinKUK": 18,
                "penjelasan": "Pengelolaan Quality of Service (QoS) untuk menjamin kinerja aplikasi kritikal (voice/video/CCTV/BMS) saat terjadi kongesti. Tujuan: menjaga kualitas pengalaman dan kontinuitas layanan. Cakupan: klasifikasi/penandaan trafik (mis. DSCP), kebijakan antrian (queuing), policing/shaping, prioritas trafik penting, admission control, serta pemantauan KPI utama: utilisasi bandwidth, latensi, packet loss, jitter, keberhasilan prioritisasi, dan efisiensi alokasi sumber daya. Bukti: kebijakan/mapping QoS, hasil uji di kondisi beban, dan laporan pemantauan berkala. Keselarasan: memastikan keandalan layanan sistem gedung cerdas sesuai praktik baik pengelolaan jaringan.",
                "indikator": {
                    "Tingkat penggunaan bandwidth": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 70-85% penggunaan bandwidth": 1,
                            "70-85% penggunaan bandwidth": 3
                        },
                        "contohDokumentasi": "Laporan pemakaian bandwidth; analisis kapasitas jaringan; data pemantauan trafik",
                        "penjelasan": "Seberapa penuh kapasitas jaringan digunakan pada kondisi normal"
                    },
                    "Waktu respons pengiriman/permintaan paket data": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 100 ms": 1,
                            "Tidak selalu, kadang-kadang ≤ 100 ms latensi": 2,
                            "Selalu ≤ 100 ms latensi": 3
                        },
                        "contohDokumentasi": "Waktu tempuh bolak-balik paket (RTT); pengukuran latensi jaringan; kinerja aplikasi",
                        "penjelasan": "Kecepatan proses request-response antara client dan server (latency/latensi)"
                    },
                    "Tingkat kehilangan paket data": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari ≤ 1% kehilangan": 1,
                            "≤ 1% kehilangan": 3
                        },
                        "contohDokumentasi": "Pengukuran kehilangan paket; laporan kualitas jaringan; analisis tingkat kesalahan",
                        "penjelasan": "Persentase data yang hilang di jalan saat dikirim melalui jaringan (packet loss)"
                    },
                    "Variasi waktu rata-rata pengiriman paket data": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 30 ms": 1,
                            "Tidak selalu, kadang-kadang ≤ 30 ms variasi": 2,
                            "Selalu ≤ 30 ms variasi": 3
                        },
                        "contohDokumentasi": "Laporan pengukuran jitter; analisis stabilitas jaringan; kinerja QoS",
                        "penjelasan": "Ketidakstabilan waktu kirim data yang menyebabkan video/audio tersendat (jitter)"
                    },
                    "Tingkat keberhasilan prioritasi data dengan prioritas tinggi": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% keberhasilan": 1,
                            "100% keberhasilan": 3
                        },
                        "contohDokumentasi": "Efektivitas kebijakan QoS; uji prioritisasi trafik; kinerja aplikasi saat beban",
                        "penjelasan": "Keberhasilan sistem memberi prioritas data penting (video call) daripada data biasa (email)"
                    },
                    "Tingkat efisiensi alokasi sumber daya jaringan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari ≥ 95% efisiensi": 1,
                            "≥ 95% efisiensi": 3
                        },
                        "contohDokumentasi": "Laporan alokasi sumber daya; analisis optimasi jaringan; perencanaan kapasitas",
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
                "penjelasan": "Seluruh sistem cerdas dapat dipantau dan dikendalikan terpusat melalui BMS (Building Management System). Tujuan: menyatukan pemantauan, alarm, dan kendali agar operasi efisien serta keputusan cepat. Cakupan: cakupan telemetri menyeluruh, alur kendali (command path) yang aman, frekuensi sinkronisasi/publikasi data (polling vs subscribe), kompatibilitas protokol/antarmuka (BACnet/IP, Modbus TCP, OPC UA, REST API/Webhook, MQTT), serta pemetaan data ke model BMS. Bukti: spesifikasi integrasi, kamus data dan pemetaan (data mapping), daftar titik (points list), log/uji integrasi, dan catatan keberhasilan kontrol. Keselarasan: sejalan dengan prinsip interoperabilitas sistem gedung pada Permen PUPR 10/2023.",
                "indikator": {
                    "Frekuensi sinkronisasi data dengan BMS": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 60 detik": 5,
                            "Tidak selalu, kadang-kadang realtime atau setiap ≤ 60 detik": 10,
                            "Selalu realtime atau setiap ≤ 60 detik": 15
                        },
                        "contohDokumentasi": "Jadwal sinkronisasi BMS; log integrasi data; audit sinkronisasi",
                        "penjelasan": "Seberapa sering data dari sistem lain disamakan dengan sistem manajemen gedung pusat"
                    },
                    "100% kelengkapan monitoring data di BMS": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "Dasbor pemantauan BMS; pemeriksaan kelengkapan data sensor; laporan integrasi sistem",
                        "penjelasan": "Semua parameter gedung (suhu, energi, keamanan) bisa dipantau dari satu dashboard"
                    },
                    "100% kompatibilitas dengan standar dan format data yang diterima BMS": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "Kepatuhan format data; dokumentasi konversi protokol; spesifikasi antarmuka integrasi",
                        "penjelasan": "Kemampuan semua sistem menggunakan 'bahasa' yang dimengerti sistem pusat manajemen gedung"
                    }
                }
            },
            {
                "nama": "Akuisisi data real-time (waktu nyata) pada level fisik",
                "maksPoinKUK": 39,
                "penjelasan": "Pengambilan data langsung dari sensor/perangkat fisik dengan latensi rendah untuk pemantauan real‑time (waktu nyata). Tujuan: memungkinkan deteksi dini dan respons cepat. Cakupan: laju sampling sensor, buffering di edge, penandaan waktu (timestamp) yang sinkron (NTP/PTP), anggaran latensi dari sensor ke BMS/aplikasi, serta keandalan koneksi. Bukti: spesifikasi sensor, hasil ukur latensi end‑to‑end, konfigurasi sinkronisasi waktu (NTP/PTP), dan laporan ketersediaan data. Keselarasan: mendukung keselamatan dan keandalan operasi sistem cerdas sesuai arahan regulasi.",
                "indikator": {
                    "Waktu yang dibutuhkan untuk menangkap data dari sensor atau perangkat fisik": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 detik": 13,
                            "Tidak selalu, kadang-kadang ≤ 1 detik": 26,
                            "Selalu ≤ 1 detik": 39
                        },
                        "contohDokumentasi": "Waktu respons sensor; latensi akuisisi data; uji kinerja real-time (waktu nyata)",
                        "penjelasan": "Kecepatan sensor membaca kondisi nyata (suhu, gerakan) dan mengirim ke sistem"
                    }
                }
            },
            {
                "nama": "Data yang digunakan dan dihasilkan oleh berbagai komponen dalam sistem dapat dipastikan tetap utuh, akurat, dan tidak ada konflik ketika dipertukarkan atau diakses di seluruh sistem",
                "maksPoinKUK": 36,
                "penjelasan": "Menjaga data tetap utuh, akurat, dan konsisten di seluruh sistem. Tujuan: satu sumber kebenaran (single source of truth) tanpa konflik. Cakupan: validasi skema/tipe data, kontrol referensial, deduplikasi, penanganan konflik dan urutan kejadian, idempotency pada integrasi, serta rekonsiliasi berkala. Bukti: aturan validasi dan hasil uji, laporan rekonsiliasi/penyelarasan data, audit trail perubahan, dan mekanisme koreksi. Keselarasan: tata kelola data yang baik sebagaimana didorong Permen PUPR 10/2023.",
                "indikator": {
                    "100% konsistensi data yang dipertukarkan atau diakses di seluruh sistem": {
                        "tipe": "checkbox",
                        "poin": 18,
                        "contohDokumentasi": "Audit konsistensi data; validasi sinkronisasi; verifikasi data lintas sistem",
                        "penjelasan": "Kepastian data sama di semua sistem, tidak berbeda-beda versinya"
                    },
                    "100% kepatuhan terhadap standar data dan format yang disepakati": {
                        "tipe": "checkbox",
                        "poin": 18,
                        "contohDokumentasi": "Kepatuhan standar data; laporan validasi format; sertifikasi interoperabilitas",
                        "penjelasan": "Ketaatan semua sistem menggunakan format data yang sudah disepakati bersama"
                    }
                }
            },
            {
                "nama": "Sistem secara cepat memproses dan merespons data yang diperoleh dari sensor, perangkat, atau pengguna dan melakukan tindakan tertentu secara otomatis",
                "maksPoinKUK": 39,
                "penjelasan": "Otomasi pemrosesan data dan eksekusi tindakan secara cepat berbasis aturan. Tujuan: menurunkan waktu tanggap insiden dan meningkatkan efisiensi. Cakupan: arsitektur berbasis peristiwa (event‑driven), aturan/ambang (rule/threshold), orkestrasi alur kerja, prioritas dan interlock keselamatan, fallback/manual override, serta target latensi respons. Bukti: definisi alur otomasi (runbook/workflow), skenario uji, log eksekusi, dan metrik MTTR/latensi. Keselarasan: mendukung operasi gedung yang aman dan efisien.",
                "indikator": {
                    "Waktu yang dibutuhkan untuk melakukan pemrosesan data dan eksekusi tindakan otomatis": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 10 detik": 13,
                            "Tidak selalu, kadang-kadang ≤ 10 detik": 26,
                            "Selalu ≤ 10 detik": 39
                        },
                        "contohDokumentasi": "Waktu respons otomasi; pengukuran latensi pengambilan keputusan; kinerja sistem kontrol",
                        "penjelasan": "Kecepatan sistem menganalisa data sensor dan menjalankan perintah otomatis"
                    }
                }
            },
            {
                "nama": "Memiliki katalog data terpusat yang memudahkan dalam pencarian dan penggunaan data",
                "maksPoinKUK": 39,
                "penjelasan": "Repositori metadata terpusat (data catalog) yang memudahkan penemuan dan penggunaan data. Tujuan: meningkatkan keterlacakan (lineage), akuntabilitas, dan kepatuhan. Cakupan: metadata teknis/bisnis, pemilik data (data owner/steward), klasifikasi dan sensitivitas, kamus istilah (glossary), kontrol akses, kemampuan pencarian dan versi. Bukti: kebijakan katalog data, contoh entri katalog dan lineage, serta laporan kepatuhan akses. Keselarasan: memperkuat tata kelola data untuk integrasi sistem gedung.",
                "indikator": {
                    "Persentase data yang masuk ke dalam katalog data dari semua sumber data yang tersedia": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada data yang masuk katalog data": 0,
                            "Kurang dari 100% data terkatalogkan": 13,
                            "100% data terkatalogkan": 39
                        },
                        "contohDokumentasi": "Cakupan katalog data; kelengkapan metadata; laporan tata kelola data",
                        "penjelasan": "Kelengkapan inventaris data yang tercatat di 'katalog pusat' untuk memudahkan pencarian"
                    }
                }
            },
            {
                "nama": "Standar terbuka telah diadopsi untuk memastikan interoperabilitas data dengan sistem lain",
                "maksPoinKUK": 33,
                "penjelasan": "Adopsi standar terbuka untuk format, skema, dan antarmuka data agar mudah diintegrasikan lintas vendor. Tujuan: portabilitas dan netralitas vendor. Cakupan: format/pertukaran data umum (JSON, CSV, XML), skema yang terdokumentasi (JSON Schema/OpenAPI), protokol industri (OPC UA, BACnet objek), pola integrasi pub/sub (MQTT/AMQP) dan REST API/Webhook, serta pengelolaan versi dan kompatibilitas. Bukti: dokumentasi API/skema, sertifikasi/kepatuhan standar, hasil uji interoperabilitas. Keselarasan: konsisten dengan semangat interoperabilitas pada Permen PUPR 10/2023.",
                "indikator": {
                    "Tingkat kepatuhan terhadap standar terbuka": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada kepatuhan": 0,
                            "Kurang dari 100% kepatuhan": 11,
                            "100% kepatuhan": 33
                        },
                        "contohDokumentasi": "Kepatuhan standar terbuka; uji interoperabilitas; asesmen netralitas vendor",
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
                "penjelasan": "Perencanaan formal pengelolaan sistem cerdas terdokumentasi. Tujuan: memberi arah, prioritas, dan mekanisme kontrol yang jelas. Cakupan: kebijakan/strategi, roadmap pengembangan, pengelolaan risiko, standar teknis/operasional, penganggaran dan SLA, serta rencana insiden dan pemulihan. Bukti: dokumen kebijakan/strategi, rencana kerja dan anggaran, matriks risiko, serta referensi standar yang diadopsi. Keselarasan: memperkuat tata kelola layanan sistem gedung sesuai praktik baik.",
                "indikator": {
                    "Tersedia kebijakan yang telah disusun sebagai landasan pengelolaan sistem cerdas": {
                        "tipe": "checkbox",
                        "poin": 12,
                        "contohDokumentasi": "Dokumen kebijakan gedung cerdas; kerangka tata kelola; arahan manajemen",
                        "penjelasan": "Keberadaan dokumen aturan resmi untuk mengelola sistem cerdas gedung"
                    },
                    "Tersedia rincian tugas dan tanggung jawab spesifik yang telah disusun sebagai landasan pengelolaan sistem cerdas": {
                        "tipe": "checkbox",
                        "poin": 9,
                        "contohDokumentasi": "Matriks RACI (Responsible, Accountable, Consulted, Informed); uraian jabatan; penugasan tanggung jawab",
                        "penjelasan": "Keberadaan dokumen pembagian tugas jelas untuk tim pengelola sistem"
                    },
                    "Tersedia prosedur yang telah disusun untuk operasional sistem cerdas": {
                        "tipe": "checkbox",
                        "poin": 9,
                        "contohDokumentasi": "Dokumentasi SOP; manual prosedur operasional; instruksi kerja",
                        "penjelasan": "Keberadaan dokumen panduan langkah-demi-langkah operasi sistem"
                    }
                }
            },
            {
                "nama": "Pengorganisasian pengelolaan sistem cerdas telah dilakukan",
                "maksPoinKUK": 30,
                "penjelasan": "Struktur organisasi dan peran/ tanggung jawab (roles & responsibilities) ditetapkan. Tujuan: memastikan kapasitas dan akuntabilitas operasional. Cakupan: struktur/eskalasi, uraian jabatan, cakupan on‑call/shift, kompetensi/sertifikasi, rencana pelatihan, serta pengawasan vendor/kontraktor. Bukti: bagan organisasi, deskripsi peran, matriks kompetensi/sertifikasi, dan rencana pelatihan. Keselarasan: mendukung kesinambungan layanan dan keselamatan operasional.",
                "indikator": {
                    "Persentase pemenuhan posisi/roles yang diperlukan untuk pengelolaan sistem cerdas": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak terpenuhi": 0,
                            "Kurang dari 100% pemenuhan": 5,
                            "100% pemenuhan": 15
                        },
                        "contohDokumentasi": "Laporan kecukupan personel; analisis pemenuhan peran; struktur organisasi",
                        "penjelasan": "Kelengkapan staff pengelola sesuai kebutuhan (admin, operator, maintenance)"
                    },
                    "Persentase pengelola sistem cerdas dengan kompetensi yang memenuhi sertifikasi, kualifikasi, atau pengalaman kerja yang dibutuhkan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak terpenuhi": 0,
                            "Kurang dari 100% pemenuhan": 5,
                            "100% pemenuhan": 15
                        },
                        "contohDokumentasi": "Matriks kompetensi; rekam sertifikasi; laporan penyelesaian pelatihan",
                        "penjelasan": "Kesesuaian keahlian staff dengan kebutuhan teknis sistem"
                    }
                }
            },
            {
                "nama": "Keberjalanan pelatihan dan simulasi insiden terkait pengelolaan sistem cerdas",
                "maksPoinKUK": 27,
                "penjelasan": "Program peningkatan kapasitas dan kesiapsiagaan insiden berjalan berkala. Tujuan: menurunkan dampak gangguan dan mempercepat pemulihan. Cakupan: kurikulum pelatihan teknis dan prosedural, simulasi/drill insiden (teknis dan keselamatan), evaluasi pasca‑latihan, dan rencana perbaikan (lessons learned). Bukti: jadwal/rekap pelatihan, skenario drill, laporan evaluasi, dan rencana tindak lanjut. Keselarasan: budaya perbaikan berkelanjutan sesuai prinsip manajemen operasi yang baik.",
                "indikator": {
                    "Frekuensi pelatihan dan simulasi insiden": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 6 bulan sekali": 9,
                            "Tidak selalu, kadang-kadang 6 bulan sekali": 18,
                            "Selalu 6 bulan sekali": 27
                        },
                        "contohDokumentasi": "Jadwal pelatihan; frekuensi drill; log latihan keadaan darurat",
                        "penjelasan": "Seberapa sering staff dilatih dan simulasi menghadapi masalah darurat"
                    }
                }
            },
            {
                "nama": "Pengawasan pengelolaan sistem cerdas telah dilakukan untuk memastikan keberjalanan",
                "maksPoinKUK": 27,
                "penjelasan": "Pengawasan dan audit berkala untuk memastikan kinerja dan kepatuhan. Tujuan: mendeteksi deviasi sedini mungkin dan memperbaikinya. Cakupan: KPI layanan, kepatuhan standar/kebijakan, audit konfigurasi/keamanan, inspeksi pemeliharaan, dan tinjauan manajemen. Bukti: kalender audit, laporan temuan/tindak lanjut, risalah tinjauan berkala, dan dashboard KPI. Keselarasan: pengendalian internal yang konsisten untuk keandalan layanan.",
                "indikator": {
                    "Frekuensi audit kinerja dan kepatuhan": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 1 kali per 3 bulan": 9,
                            "Tidak selalu, kadang-kadang 1 kali per 3 bulan": 18,
                            "Sekurang-kurangnya 1 kali per 3 bulan": 27
                        },
                        "contohDokumentasi": "Kalender audit; jadwal pemeriksaan kepatuhan; frekuensi tinjauan kinerja",
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
                "penjelasan": "Penghematan energi terukur berkat optimisasi lintas sistem. Tujuan: menurunkan konsumsi dan biaya tanpa mengorbankan kenyamanan/keselamatan. Cakupan: otomasi beban, pengaturan setpoint adaptif, penjadwalan, pemantauan dan analitik energi, serta inisiatif efisiensi perangkat. Bukti: baseline dan metode perhitungan (IPMVP atau setara), laporan penghematan, dan validasi pihak ketiga bila perlu. Keselarasan: efisiensi sumber daya sejalan dengan praktik pengelolaan gedung berkelanjutan.",
                "indikator": {
                    "Persentase penurunan konsumsi energi dalam satu tahun": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 10%": 11,
                            "10 - 25%": 22,
                            ">25%": 33
                        },
                        "contohDokumentasi": "Laporan konsumsi energi; perhitungan penghematan; perbandingan tagihan utilitas",
                        "penjelasan": "Penghematan pemakaian listrik/tahun berkat sistem cerdas dibanding tahun sebelumnya"
                    }
                }
            },
            {
                "nama": "Penurunan konsumsi air yang dicapai melalui penggunaan sistem cerdas",
                "maksPoinKUK": 33,
                "penjelasan": "Pengurangan konsumsi air melalui kendali dan pemantauan cerdas. Tujuan: menghemat air bersih dan biaya operasional. Cakupan: deteksi kebocoran dini, kontrol tekanan/debit adaptif, pengaturan jadwal, reuse/recirculation jika ada, serta analitik pola pemakaian. Bukti: baseline konsumsi, metodologi pengukuran dampak, serta ringkasan realisasi penghematan. Keselarasan: mendukung prinsip konservasi sumber daya di lingkungan gedung.",
                "indikator": {
                    "Persentase penurunan konsumsi air dalam satu tahun": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 5%": 11,
                            "5 - 10%": 22,
                            ">10%": 33
                        },
                        "contohDokumentasi": "Laporan penggunaan air; metrik konservasi; analisis konsumsi",
                        "penjelasan": "Penghematan pemakaian air/tahun berkat sistem pengelolaan air cerdas"
                    }
                }
            },
            {
                "nama": "Kepuasan penghuni dengan adanya fitur otomatisasi sistem cerdas",
                "maksPoinKUK": 30,
                "penjelasan": "Kepuasan penghuni meningkat karena otomatisasi yang relevan dan andal. Tujuan: memastikan fitur cerdas benar‑benar bermanfaat dan mudah digunakan. Cakupan: desain pengalaman pengguna, keandalan layanan, kecepatan respons, transparansi privasi, dan kanal umpan balik/perbaikan. Bukti: metodologi survei yang konsisten, ringkasan hasil, dan tindak lanjut perbaikan. Keselarasan: berorientasi pada layanan pengguna sebagaimana semangat pengelolaan gedung modern.",
                "indikator": {
                    "Persentase kepuasan penghuni berdasarkan hasil survei": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada survei kepuasan": 0,
                            "60 - 80% kepuasan": 10,
                            "> 80% kepuasan": 30
                        },
                        "contohDokumentasi": "Survei kepuasan penghuni; analisis umpan balik pengguna; laporan mutu layanan",
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
                "penjelasan": "Jaringan deteksi dan pemberitahuan bahaya yang andal untuk respons darurat. Tujuan: deteksi dini, penyampaian informasi cepat/tepat, dan evakuasi aman. Cakupan: sensor kebakaran/gas/gempa sesuai standar, integrasi ke panel/isyarat, jalur komunikasi redundan, prosedur notifikasi massal (audio/visual/SMS/PA), dan pengujian berkala. Bukti: sertifikat/kalibrasi sensor, skema integrasi, catatan uji fungsi periodik, dan pedoman respons. Keselarasan: prioritas keselamatan penghuni sesuai prinsip pengelolaan gedung.",
                "indikator": {
                    "Sensor mampu mendeteksi bencana secara cepat dan akurat sesuai kondisi lokasi bangunan": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 10 detik": 6,
                            "Tidak selalu, kadang-kadang ≤ 10 detik": 12,
                            "Selalu ≤ 10 detik": 18
                        },
                        "contohDokumentasi": "Sertifikat kalibrasi sensor; laporan uji deteksi; validasi sistem darurat",
                        "penjelasan": "Kemampuan sensor mendeteksi bahaya (kebakaran, gempa) dengan tepat dan cepat"
                    },
                    "100% komponen utama sistem dapat dipantau status keberjalanannya secara jarak jauh": {
                        "tipe": "checkbox",
                        "poin": 15,
                        "contohDokumentasi": "Dasbor pemantauan jarak jauh; pemeriksaan ketersediaan sistem; uji konektivitas jaringan",
                        "penjelasan": "Semua perangkat penting bisa dicek kondisi online dari mana saja"
                    },
                    "Akurasi denah lokasi deteksi alarm pada panel isyarat": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% akurasi": 5,
                            "≥ 99% akurasi": 15
                        },
                        "contohDokumentasi": "Tangkapan layar panel alarm; uji akurasi lokasi; drill respons darurat",
                        "penjelasan": "Ketepatan penunjukan lokasi masalah di peta digital gedung"
                    }
                }
            },
            {
                "nama": "Sistem Kamera Pengawas",
                "maksPoinKUK": 48,
                "penjelasan": "Sistem pengawasan video terintegrasi dengan rekaman aman dan analitik. Tujuan: meningkatkan keamanan situasional dan bukti forensik. Cakupan: kamera, jaringan, perekaman (DVR/NVR/VMS; DVR = Digital Video Recorder, NVR = Network Video Recorder, VMS = Video Management System), enkripsi data, kebijakan retensi, analitik (deteksi gerak/objek), serta pemantauan kinerja. Bukti: konfigurasi perekaman dan enkripsi, kebijakan retensi, laporan kualitas video/kinerja, dan hasil uji fitur analitik. Keselarasan: menjaga keamanan dan privasi sesuai praktik baik.",
                "indikator": {
                    "Sistem kamera pengawas dapat melakukan perekaman menggunakan DVR/NVR dengan 100% data yang terenkripsi": {
                        "tipe": "checkbox",
                        "poin": 3,
                        "contohDokumentasi": "Konfigurasi DVR/NVR; pengaturan enkripsi; verifikasi perekaman",
                        "penjelasan": "Kamera merekam dan menyimpan video dengan pengamanan data otomatis (DVR/NVR = perangkat perekam video analog/digital; VMS = perangkat lunak pengelola kamera)"
                    },
                    "Waktu rata-rata pengiriman paket video dari kamera ke pusat kontrol": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 2,
                            "Selalu ≤ 5 detik": 3
                        },
                        "contohDokumentasi": "Latensi streaming video; kinerja jaringan; uji pemantauan real-time (waktu nyata)",
                        "penjelasan": "Kecepatan kirim video live dari kamera ke ruang monitor"
                    },
                    "Resolusi dan kualitas video digital pada semua kamera pengawas": {
                        "tipe": "radio",
                        "poin": {
                            "Semua kurang dari 720p": 1,
                            "Tidak semua ≥ 720p": 2,
                            "Semua ≥ 720p": 3
                        },
                        "contohDokumentasi": "Laporan kualitas video; verifikasi resolusi; uji kejernihan gambar",
                        "penjelasan": "Tingkat kejernihan dan detail gambar semua kamera pengawas"
                    },
                    "Kecepatan respons interkom setelah pengguna menekan tombol atau memberikan perintah suara": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 2 detik": 1,
                            "Tidak selalu, kadang-kadang ≤ 2 detik": 2,
                            "Selalu ≤ 2 detik": 3
                        },
                        "contohDokumentasi": "Uji waktu respons interkom; kualitas komunikasi suara; kinerja sistem",
                        "penjelasan": "Waktu tunggu dari tekan tombol sampai ada respons suara"
                    },
                    "Persentase akurasi deteksi gerakan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Laporan uji deteksi gerak; pengukuran akurasi; analisis alarm palsu",
                        "penjelasan": "Ketepatan sistem mendeteksi pergerakan orang/objek di area pantau"
                    },
                    "Persentase akurasi deteksi objek": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Validasi deteksi objek; akurasi model AI; kinerja pengenalan",
                        "penjelasan": "Ketepatan sistem mengenali jenis objek (orang, mobil, dll) dalam video"
                    },
                    "Persentase akurasi pelacakan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Uji pelacakan objek; analisis pergerakan; efektivitas pengawasan",
                        "penjelasan": "Ketepatan sistem mengikuti pergerakan objek bergerak dalam video"
                    },
                    "Persentase akurasi rekognisi": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Laporan akurasi pengenalan; kinerja biometrik; uji identifikasi",
                        "penjelasan": "Ketepatan sistem mengenali identitas spesifik (wajah, plat nomor)"
                    },
                    "Persentase akurasi masking": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Uji masking privasi; akurasi redaksi; kepatuhan kebijakan privasi",
                        "penjelasan": "Ketepatan sistem menyensor area privat dalam video secara otomatis"
                    },
                    "Persentase akurasi perhitungan jumlah orang": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 50%": 1,
                            "≥ 50% akurasi": 3
                        },
                        "contohDokumentasi": "Validasi penghitung orang; pengukuran okupansi; analisis kerumunan",
                        "penjelasan": "Ketepatan sistem menghitung jumlah orang di area tertentu"
                    },
                    "Persentase perekaman otomatis berdasarkan pengaturan jadwal, event, atau rekaman berkesinambungan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% terekam": 1,
                            "≥ 99% terekam": 3
                        },
                        "contohDokumentasi": "Konfigurasi jadwal perekaman; log perekaman berbasis kejadian; audit perekaman kontinu",
                        "penjelasan": "Kemampuan sistem merekam sesuai jadwal atau saat ada kejadian tertentu"
                    },
                    "Availabilitas sistem manajemen video terpusat": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% availability": 1,
                            "≥ 99% availability": 3
                        },
                        "contohDokumentasi": "Laporan ketersediaan VMS; pemantauan uptime; keandalan sistem",
                        "penjelasan": "Persentase waktu sistem pusat pengelolaan video bisa diakses dan berfungsi (VMS = Video Management System; availability/uptime = persentase waktu berjalan normal)"
                    },
                    "Persentase area publik yang terjangkau kamera": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% area": 1,
                            "100% area": 3
                        },
                        "contohDokumentasi": "Peta cakupan kamera; analisis titik buta; asesmen area pengawasan",
                        "penjelasan": "Cakupan wilayah umum yang bisa dipantau oleh kamera pengawas"
                    },
                    "Durasi penyimpanan video": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 30 hari": 1,
                            "≥ 30 hari": 3
                        },
                        "contohDokumentasi": "Kepatuhan kebijakan retensi; perencanaan kapasitas penyimpanan; manajemen arsip",
                        "penjelasan": "Lama waktu rekaman video disimpan sebelum dihapus otomatis"
                    },
                    "Persentase perangkat aktif jaringan yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 1,
                            "≥ 90% perangkat": 3
                        },
                        "contohDokumentasi": "Daftar peralatan AV mendukung PoE; analisis kebutuhan daya; desain sistem",
                        "penjelasan": "Banyaknya perangkat AV (speaker, display) yang bisa powered via ethernet (PoE = Power over Ethernet)"
                    },
                    "Persentase perangkat pasif jaringan yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 1,
                            "100% perangkat": 3
                        },
                        "contohDokumentasi": "Infrastruktur jaringan untuk AV; konfigurasi switch PoE; kapasitas penyaluran daya",
                        "penjelasan": "Banyaknya komponen pendukung AV network yang kompatibel PoE (PoE = daya listrik lewat kabel jaringan)"
                    }
                }
            },
            {
                "nama": "Sistem Kontrol Akses",
                "maksPoinKUK": 48,
                "penjelasan": "Pengendalian akses fisik yang aman dan terdokumentasi. Tujuan: hanya orang berwenang yang dapat masuk dan tercatat dengan benar. Cakupan: kredensial (kartu/biometrik), kebijakan jadwal/zona, antipassback (pembatasan penggunaan ulang kartu tanpa keluar-masuk yang sah), integrasi IoT/ACS, pencatatan dan pelaporan, serta fitur mustering saat darurat (pendataan di titik kumpul). Bukti: kebijakan akses dan matriks zona, konfigurasi antipassback, log akses, dan skenario uji darurat. Keselarasan: mendukung keselamatan dan akuntabilitas penghuni.",
                "indikator": {
                    "Tingkat fluktuasi tegangan yang diterima perangkat periferal": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu melebihi ±5%": 2,
                            "Tidak selalu, kadang-kadang ±5%": 4,
                            "Selalu ±5%": 6
                        },
                        "contohDokumentasi": "Laporan kualitas daya; pengukuran stabilitas tegangan; pemeriksaan sistem kelistrikan",
                        "penjelasan": "Kestabilan daya listrik yang diterima perangkat tambahan"
                    },
                    "Persentase waktu aktif perangkat periferal": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99,9%": 2,
                            "≥ 99,9%": 6
                        },
                        "contohDokumentasi": "Laporan uptime periferal; ketersediaan perangkat; catatan pemeliharaan",
                        "penjelasan": "Waktu operasional perangkat tambahan (printer, scanner) tanpa gangguan"
                    },
                    "Jumlah temuan pengguna yang melakukan passback/global passback": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Lebih dari 0 pengguna": 3,
                            "0 pengguna": 9
                        },
                        "contohDokumentasi": "Laporan pelanggaran passback; audit kontrol akses; insiden keamanan",
                        "penjelasan": "Banyaknya pelanggaran aturan akses ganda tanpa keluar-masuk area (passback/antipassback = aturan agar kartu tidak bisa dipakai berulang tanpa keluar dulu)"
                    },
                    "Jumlah kendala dalam pengaturan akses pengguna berdasarkan area, tanggal dan waktu": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Lebih dari 0 kendala": 3,
                            "0 kendala": 9
                        },
                        "contohDokumentasi": "Log masalah konfigurasi akses; penelusuran masalah sistem; kendala manajemen pengguna",
                        "penjelasan": "Banyaknya masalah teknis dalam mengatur jadwal dan lokasi akses user"
                    },
                    "Tingkat ketersediaan fitur perhitungan penghuni di titik kumpul (mustering point) saat kondisi darurat": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% tersedia": 3,
                            "100% tersedia": 9
                        },
                        "contohDokumentasi": "Uji sistem mustering; hasil drill darurat; manajemen evakuasi",
                        "penjelasan": "Kemampuan sistem menghitung orang di titik evakuasi saat darurat (mustering point = titik kumpul aman untuk pendataan penghuni)"
                    },
                    "Jumlah kendala dalam fitur penonaktifan kredensial akses secara otomatis saat akun tidak digunakan sama sekali": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Lebih dari 0 kendala": 3,
                            "0 kendala": 9
                        },
                        "contohDokumentasi": "Uji fitur penonaktifan otomatis; masalah manajemen kredensial; log kesalahan sistem",
                        "penjelasan": "Banyaknya masalah teknis dalam menonaktifkan kartu akses tidak aktif"
                    }
                }
            },
            {
                "nama": "Sistem Digital Distribusi Video dan Papan Informasi",
                "maksPoinKUK": 48,
                "penjelasan": "Distribusi konten multimedia dan informasi secara andal dan tepat waktu. Tujuan: komunikasi efektif dan pengalaman pengguna yang baik. Cakupan: encoder/decoder, jaringan distribusi, manajemen konten, kompatibilitas format, pengukuran kualitas (PSNR/SSIM; PSNR = Peak Signal‑to‑Noise Ratio, SSIM = Structural Similarity Index), dan SLA layanan real‑time. Bukti: daftar format didukung, konfigurasi distribusi, hasil uji kualitas/latensi/throughput, dan log penjadwalan. Keselarasan: mendukung komunikasi internal gedung yang efektif.",
                "indikator": {
                    "Kualitas visual video setelah kompresi berdasarkan skor PSNR atau SSIM": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% kesamaan": 2,
                            "≥ 95% kesamaan": 6
                        },
                        "contohDokumentasi": "Analisis kompresi video; laporan metrik kualitas; kinerja codec",
                        "penjelasan": "Tingkat kejernihan video setelah diperkecil ukuran filenya (PSNR/SSIM = metrik kualitas gambar/video)"
                    },
                    "Kompatibilitas format file video": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% kompatibilitas": 2,
                            "100% kompatibilitas": 6
                        },
                        "contohDokumentasi": "Daftar format yang didukung; uji kompatibilitas pemutaran; validasi format berkas",
                        "penjelasan": "Kemampuan sistem memutar berbagai jenis format video standar"
                    },
                    "Waktu latency pengiriman data multimedia dari sumber ke tujuan": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 0,1 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 0,1 detik": 4,
                            "Selalu ≤ 0,1 detik": 6
                        },
                        "contohDokumentasi": "Pengukuran latensi streaming; keterlambatan jaringan; kinerja real-time (waktu nyata)",
                        "penjelasan": "Keterlambatan kirim video/audio dari sumber ke pemirsa"
                    },
                    "Jumlah data yang berhasil dikirimkan dalam satuan waktu": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu kurang dari 5 Mbps": 2,
                            "Tidak selalu, kadang-kadang ≥ 5 Mbps": 4,
                            "Selalu ≥ 5 Mbps": 6
                        },
                        "contohDokumentasi": "Pengukuran bandwidth; laju transfer data; kapasitas jaringan",
                        "penjelasan": "Kapasitas kirim data multimedia per detik (throughput)"
                    },
                    "Tingkat keberhasilan event perekaman penjadwalan dan streaming on demand": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% keberhasilan": 4,
                            "100% keberhasilan": 12
                        },
                        "contohDokumentasi": "Tingkat keberhasilan perekaman; keandalan layanan on‑demand; log penjadwalan acara",
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
                        "contohDokumentasi": "Audit infrastruktur PoE; spesifikasi kabel; standar konektivitas",
                        "penjelasan": "Banyaknya infrastruktur pendukung (kabel, port) yang mendukung daya lewat ethernet (PoE = Power over Ethernet)"
                    }
                }
            },
            {
                "nama": "Sistem Audio Visual",
                "maksPoinKUK": 48,
                "penjelasan": "Infrastruktur presentasi/komunikasi yang terkelola terpusat dan andal. Tujuan: mendukung kolaborasi dan operasional acara. Cakupan: perangkat AV, kontrol terpusat, pemantauan status, integrasi jaringan (termasuk PoE = Power over Ethernet), dan prosedur pemeliharaan. Bukti: inventaris perangkat, skema kontrol, log pemantauan, dan catatan pemeliharaan. Keselarasan: layanan ruang pertemuan yang konsisten dan siap pakai.",
                "indikator": {
                    "Persentase komponen sistem audio visual yang dapat dipantau real-time dan dikontrol": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% komponen": 8,
                            "100% komponen": 24
                        },
                        "contohDokumentasi": "Dasbor pemantauan sistem AV; antarmuka kontrol perangkat; laporan integrasi",
                        "penjelasan": "Kelengkapan pemantauan online perangkat sound system dan display"
                    },
                    "Persentase perangkat aktif jaringan yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 4,
                            "≥ 90% perangkat": 12
                        },
                        "contohDokumentasi": "Daftar peralatan AV mendukung PoE; analisis kebutuhan daya; desain sistem",
                        "penjelasan": "Banyaknya perangkat AV (speaker, display) yang bisa powered via ethernet"
                    },
                    "Persentase perangkat pasif jaringan yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 4,
                            "100% perangkat": 12
                        },
                        "contohDokumentasi": "Infrastruktur jaringan untuk AV; konfigurasi switch PoE; kapasitas penyaluran daya",
                        "penjelasan": "Banyaknya komponen pendukung AV network yang kompatibel PoE"
                    }
                }
            },
            {
                "nama": "Sistem Jaringan Akses Kabel dan Antena Terdistribusi",
                "maksPoinKUK": 48,
                "penjelasan": "Infrastruktur akses kabel dan antena terdistribusi yang andal untuk layanan data/suara/video. Tujuan: cakupan dan kapasitas komunikasi dalam gedung. Cakupan: perangkat akses berlapis, DAS/Small Cell untuk seluler (DAS = Distributed Antenna System), monitoring status triple‑play, integrasi QoS, serta kesiapan pemulihan gangguan. Bukti: arsitektur jaringan akses, dasbor pemantauan, pengukuran kinerja, dan dokumentasi SLA. Keselarasan: memastikan konektivitas penghuni dan operasional gedung.",
                "indikator": {
                    "100% status perangkat triple play termonitor dalam perangkat lunak manajemen": {
                        "tipe": "checkbox",
                        "poin": 24,
                        "contohDokumentasi": "Sistem pemantauan triple play; dasbor status layanan; manajemen jaringan",
                        "penjelasan": "Semua perangkat layanan 3-in-1 (data, suara, video) bisa dipantau dari software pusat"
                    },
                    "Ketersediaan fitur tambahan real-time (waktu nyata) (panggilan video, konferensi, streaming multicast)": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak tersedia": 0,
                            "Kurang dari 100% tersedia": 8,
                            "100% tersedia": 24
                        },
                        "contohDokumentasi": "Validasi fitur real-time (waktu nyata); uji kapabilitas layanan; tolok ukur kinerja",
                        "penjelasan": "Kemampuan sistem mendukung layanan real-time seperti video call dan siaran langsung"
                    }
                }
            },
            {
                "nama": "Sistem Kelistrikan",
                "maksPoinKUK": 48,
                "penjelasan": "Manajemen daya terintegrasi dengan pemantauan dan kontrol otomatis. Tujuan: keandalan suplai dan efisiensi energi. Cakupan: pengukuran akurat, otomasi beban, alarm anomali, pelaporan tren/peluang penghematan, dan koordinasi dengan utilitas. Bukti: sertifikat/kalibrasi meter, konfigurasi kontrol, laporan kinerja/efisiensi, dan log alarm. Keselarasan: menjaga kontinuitas layanan dan keselamatan kelistrikan.",
                "indikator": {
                    "Akurasi pengukuran penggunaan energi pada setiap perangkat": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 99% akurasi": 4,
                            "≥ 99% akurasi": 12
                        },
                        "contohDokumentasi": "Kalibrasi meter energi; uji akurasi pengukuran; validasi konsumsi",
                        "penjelasan": "Ketepatan alat ukur listrik dalam mencatat pemakaian energi tiap perangkat"
                    },
                    "Akurasi kontrol otomatis peralatan berdasarkan pola penggunaan energi atau jadwal tertentu 100%": {
                        "tipe": "checkbox",
                        "poin": 9,
                        "contohDokumentasi": "Laporan akurasi otomasi; kepatuhan jadwal; validasi sistem kontrol",
                        "penjelasan": "Ketepatan sistem menyalakan/mematikan perangkat sesuai jadwal atau kebiasaan pemakaian"
                    },
                    "Kelengkapan data tren, pola konsumsi energi  100% dan identifikasi peluang penghematan energi pada dashboard": {
                        "tipe": "checkbox",
                        "poin": 9,
                        "contohDokumentasi": "Dasbor analitik energi; laporan analisis tren; peluang konservasi",
                        "penjelasan": "Ketersediaan lengkap grafik analisis pemakaian energi dan saran penghematan"
                    },
                    "Persentase pengurangan konsumsi energi melalui demand response pada waktu beban puncak": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 10% pengurangan": 3,
                            "≥ 10% pengurangan": 9
                        },
                        "contohDokumentasi": "Kinerja demand response; laporan pemangkasan beban puncak; penghematan biaya energi",
                        "penjelasan": "Penghematan energi saat listrik mahal dengan mengurangi pemakaian tidak penting (demand response = penyesuaian beban saat puncak untuk hemat biaya/stabilkan sistem)"
                    },
                    "Akurasi alarm otomatis untuk anomali daya listrik": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% akurasi": 3,
                            "≥ 99% akurasi": 9
                        },
                        "contohDokumentasi": "Deteksi anomali daya; uji akurasi alarm; notifikasi keadaan darurat",
                        "penjelasan": "Ketepatan sistem memberi peringatan saat ada masalah kelistrikan"
                    }
                }
            },
            {
                "nama": "Sistem Pencahayaan",
                "maksPoinKUK": 48,
                "penjelasan": "Kontrol pencahayaan adaptif yang andal dan hemat energi. Tujuan: kenyamanan visual dan efisiensi. Cakupan: sensor cahaya/okupansi, penjadwalan, kontrol terdistribusi/terpusat, pemantauan uptime, dan integrasi keselamatan darurat. Bukti: konfigurasi kontrol/penjadwalan, laporan ketersediaan, dan catatan inspeksi. Keselarasan: mendukung kenyamanan dan keselamatan penghuni.",
                "indikator": {
                    "Tingkat ketersediaan sistem kontrol pencahayaan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99,5% uptime": 16,
                            "≥ 99,5% uptime": 48
                        },
                        "contohDokumentasi": "Uptime kontrol pencahayaan; keandalan sistem; catatan pemeliharaan",
                        "penjelasan": "Waktu operasional sistem lampu otomatis tanpa gangguan (uptime/availability = persentase waktu berjalan normal)"
                    }
                }
            },
            {
                "nama": "Sistem Pengondisian Udara",
                "maksPoinKUK": 48,
                "penjelasan": "Pengendalian HVAC terukur untuk kenyamanan dan efisiensi (HVAC = Heating, Ventilation, and Air Conditioning). Tujuan: menjaga parameter lingkungan dalam batas target. Cakupan: pemantauan parameter operasional lengkap, kontrol otomatis adaptif, notifikasi anomali, dan analitik performa. Bukti: daftar/telemetri parameter, konfigurasi kontrol, dan laporan kinerja. Keselarasan: memastikan kenyamanan serta efisiensi operasional.",
                "indikator": {
                    "Persentase parameter operasional yang dapat dipantau oleh sistem": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% parameter": 16,
                            "100% parameter": 48
                        },
                        "contohDokumentasi": "Pemantauan parameter operasional; kelengkapan data sensor; pemeriksaan kesehatan sistem",
                        "penjelasan": "Kelengkapan pemantauan kondisi kerja perangkat (suhu, tekanan, status)"
                    }
                }
            },
            {
                "nama": "Sistem Ventilasi",
                "maksPoinKUK": 48,
                "penjelasan": "Ventilasi cerdas berbasis kualitas udara untuk kesehatan penghuni. Tujuan: pertukaran udara cukup dengan respons cepat terhadap perubahan kualitas. Cakupan: sensor kualitas udara (indoor/outdoor), kontrol laju udara, otomasi berbasis okupansi/kondisi, prediksi berbasis AI jika ada (AI = Artificial Intelligence), dan alarm anomali. Bukti: spesifikasi/kalibrasi sensor, konfigurasi kontrol, dan laporan kinerja akurasi/latensi. Keselarasan: mendukung kesehatan lingkungan dalam ruang.",
                "indikator": {
                    "Waktu respons sistem ventilasi terhadap perubahan parameter kualitas udara": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 30 detik": 4,
                            "Tidak selalu, kadang-kadang ≤ 30 detik": 8,
                            "Selalu ≤ 30 detik": 12
                        },
                        "contohDokumentasi": "Waktu respons ventilasi; kinerja kontrol kualitas udara; kecepatan otomasi",
                        "penjelasan": "Kecepatan sistem udara menyesuaikan saat kualitas udara berubah"
                    },
                    "Tingkat ketepatan deteksi kualitas udara luar": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 98% akurasi": 4,
                            "≥ 98% akurasi": 12
                        },
                        "contohDokumentasi": "Kalibrasi sensor kualitas udara luar; akurasi deteksi; pemantauan lingkungan",
                        "penjelasan": "Akurasi sensor dalam membaca kondisi udara lingkungan luar gedung"
                    },
                    "Akurasi kontrol otomatis berdasarkan kondisi lingkungan atau pola keberadaan penghuni": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% akurasi": 4,
                            "≥ 95% akurasi": 12
                        },
                        "contohDokumentasi": "Validasi kontrol lingkungan; otomasi berbasis okupansi; kinerja sistem kenyamanan",
                        "penjelasan": "Ketepatan sistem mengatur suhu/ventilasi sesuai jumlah orang dan kondisi"
                    },
                    "Akurasi prediksi perubahan kualitas udara menggunakan kecerdasan buatan": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 90% akurasi": 4,
                            "≥ 90% akurasi": 12
                        },
                        "contohDokumentasi": "Akurasi prediksi AI; kinerja machine learning; validasi prakiraan",
                        "penjelasan": "Ketepatan sistem AI memperkirakan perubahan kualitas udara sebelum terjadi"
                    }
                }
            },
            {
                "nama": "Sistem Penyediaan Air Minum",
                "maksPoinKUK": 48,
                "penjelasan": "Pengelolaan air bersih dengan monitoring kualitas dan kontrol otomatis. Tujuan: ketersediaan dan keamanan air minum. Cakupan: meter cerdas, deteksi kebocoran, ADRS untuk debit/tekanan (ADRS = Automatic Demand/Distribution Regulation System), kontrol katup cerdas, dan pemantauan kualitas real‑time. Bukti: sertifikat/kalibrasi meter/sensor, hasil uji respons, dan log pemantauan kualitas. Keselarasan: menjaga layanan air bersih yang aman.",
                "indikator": {
                    "Akurasi meter air cerdas dalam mengukur volume air secara real-time (waktu nyata) ≥ 95%": {
                        "tipe": "checkbox",
                        "poin": 9,
                        "contohDokumentasi": "Sertifikat kalibrasi meter air; laporan uji akurasi; validasi pengukuran",
                        "penjelasan": "Ketepatan alat ukur air digital dalam mencatat pemakaian real-time"
                    },
                    "Waktu deteksi indikasi kebocoran air dan menginformasikan ke pihak terkait": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 1 jam": 3,
                            "Tidak selalu, kadang-kadang ≤ 1 jam": 6,
                            "Selalu ≤ 1 jam": 9
                        },
                        "contohDokumentasi": "Waktu respons deteksi kebocoran; kinerja sistem notifikasi; peringatan darurat",
                        "penjelasan": "Kecepatan sistem menemukan tanda kebocoran dan memberi tahu maintenance"
                    },
                    "Waktu respons perubahan debit dan tekanan air oleh ADRS": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 4,
                            "Selalu ≤ 5 detik": 6
                        },
                        "contohDokumentasi": "Uji kinerja ADRS; respons kontrol aliran; kecepatan penyesuaian tekanan",
                        "penjelasan": "Kecepatan sistem menyesuaikan aliran dan tekanan air sesuai kebutuhan (ADRS = Automatic Demand/Distribution Regulation System)"
                    },
                    "Tingkat kesesuaian waktu automated cleaning 100%": {
                        "tipe": "checkbox",
                        "poin": 6,
                        "contohDokumentasi": "Kepatuhan jadwal pembersihan; akurasi waktu otomasi; log pemeliharaan",
                        "penjelasan": "Ketepatan jadwal pembersihan otomatis sistem perpipaan sesuai rencana"
                    },
                    "Waktu respons katup cerdas sejak perintah dikirim": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 4,
                            "Selalu ≤ 5 detik": 6
                        },
                        "contohDokumentasi": "Uji waktu respons katup; kinerja kontrol jarak jauh; kecepatan aktuator",
                        "penjelasan": "Kecepatan katup air menutup/membuka setelah dapat perintah remote"
                    },
                    "Persentase parameter kualitas air minum yang terpantau real-time": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 100%": 2,
                            "Tidak selalu 100%": 4,
                            "100% parameter selalu terpantau secara real-time (waktu nyata)": 6
                        },
                        "contohDokumentasi": "Dasbor pemantauan kualitas air; cakupan parameter; data sensor real-time (waktu nyata)",
                        "penjelasan": "Kelengkapan pemantauan kondisi air minum (kejernihan, pH, bakteri)"
                    },
                    "Persentase keberhasilan deteksi dini kebocoran air": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% keberhasilan": 2,
                            "≥ 95% keberhasilan": 6
                        },
                        "contohDokumentasi": "Efektivitas deteksi kebocoran; tingkat keberhasilan peringatan dini; sistem pencegahan",
                        "penjelasan": "Akurasi sistem dalam menemukan kebocoran air sebelum jadi masalah besar"
                    }
                }
            },
            {
                "nama": "Sistem Pengelolaan Air Limbah",
                "maksPoinKUK": 48,
                "penjelasan": "Pemantauan dan pengendalian proses air limbah secara otomatis. Tujuan: operasi yang aman dan patuh lingkungan. Cakupan: sensor level/debit/kualitas, kontrol penggelontoran, deteksi kebocoran, data real‑time, dan alarm anomali. Bukti: kalibrasi sensor, hasil uji respons, uptime pemantauan, dan catatan perawatan. Keselarasan: mendukung kepatuhan dan keselamatan lingkungan.",
                "indikator": {
                    "Waktu respons terhadap perubahan volume air limbah": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 3 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 3 detik": 4,
                            "Selalu ≤ 3 detik": 6
                        },
                        "contohDokumentasi": "Waktu respons air limbah; reaksi perubahan aliran; kinerja sistem pengolahan",
                        "penjelasan": "Kecepatan sistem menanggapi fluktuasi volume air buangan"
                    },
                    "Akurasi pengukuran ketinggian muka air limbah": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu melebihi ± 5%": 2,
                            "Tidak selalu, kadang-kadang ≤ 5%": 4,
                            "Selalu ≤ 5%": 6
                        },
                        "contohDokumentasi": "Kalibrasi sensor level; akurasi pengukuran; pemantauan tangki",
                        "penjelasan": "Ketepatan alat ukur dalam membaca level air limbah di bak penampung"
                    },
                    "Waktu respons penggelontoran otomatis": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 menit": 4,
                            "Tidak selalu, kadang-kadang 5 menit": 8,
                            "Selalu ≤ 5 menit": 12
                        },
                        "contohDokumentasi": "Respons sistem penggelontoran; waktu otomasi; siklus pembersihan",
                        "penjelasan": "Kecepatan sistem melakukan flush otomatis saat diperlukan"
                    },
                    "Waktu respons deteksi kebocoran": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 3 detik": 4,
                            "Tidak selalu, kadang-kadang 3 detik": 8,
                            "Selalu ≤ 3 detik": 12
                        },
                        "contohDokumentasi": "Kecepatan deteksi kebocoran; kinerja pemantauan saluran; integritas pipa",
                        "penjelasan": "Kecepatan sistem menemukan kebocoran di jaringan air limbah"
                    },
                    "Waktu ketersediaan data monitoring kualitas air limbah secara real-time (waktu nyata)": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 30 detik": 4,
                            "Tidak selalu, kadang-kadang 30 detik": 8,
                            "Selalu ≤ 30 detik": 12
                        },
                        "contohDokumentasi": "Uptime pemantauan air limbah; ketersediaan data; keandalan sistem",
                        "penjelasan": "Kelancaran akses data kondisi air limbah secara real-time di dashboard"
                    }
                }
            },
            {
                "nama": "Sistem Pengelolaan Sampah",
                "maksPoinKUK": 48,
                "penjelasan": "Pemantauan tingkat pengisian dan optimasi rute pengumpulan. Tujuan: efisiensi operasional dan kebersihan area. Cakupan: sensor tingkat isi, konektivitas (Wi‑Fi/LPWAN; LPWAN = Low‑Power Wide‑Area Network), dasbor pemantauan, algoritme rute, dan pelaporan kinerja. Bukti: spesifikasi sensor/konektivitas, peta rute, serta laporan efektivitas. Keselarasan: layanan kebersihan yang responsif dan hemat biaya.",
                "indikator": {
                    "Akurasi sensor tingkat pengisian wadah sampah": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% akurasi": 8,
                            "≥ 95% akurasi": 24
                        },
                        "contohDokumentasi": "Kalibrasi sensor tingkat isi; uji akurasi; pemantauan sampah",
                        "penjelasan": "Ketepatan sensor dalam mengukur seberapa penuh tempat sampah"
                    },
                    "Persentase penggunaan Wi-Fi atau LPWAN untuk perangkat IoT": {
                        "tipe": "radio",
                        "poin": {
                            "Kurang dari 100%": 8,
                            "Kadang-kadang 100%": 16,
                            "Selalu 100%": 24
                        },
                        "contohDokumentasi": "Arsitektur jaringan IoT; laporan konektivitas; adopsi teknologi nirkabel",
                        "penjelasan": "Banyaknya perangkat IoT yang menggunakan jaringan nirkabel khusus (LPWAN = Low-Power Wide-Area Network)"
                    }
                }
            },
            {
                "nama": "Sistem Transportasi dalam Gedung",
                "maksPoinKUK": 48,
                "penjelasan": "Manajemen lift/transportasi vertikal dengan pemantauan dan kontrol. Tujuan: keselamatan penumpang dan efisiensi pergerakan. Cakupan: antarmuka informasi, bantuan darurat (TAS; istilah pabrikan bervariasi, umumnya layanan telepon/alarm darurat), kontrol parameter, monitoring kamera, kontrol jarak jauh, dan pembaruan data aplikasi. Bukti: konfigurasi sistem, hasil uji respons, log pemantauan, dan SOP keadaan darurat. Keselarasan: memastikan mobilitas penghuni yang aman.",
                "indikator": {
                    "Ketersediaan informasi pada layar lift": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99,9% availability": 2,
                            "≥ 99,9% availability": 6
                        },
                        "contohDokumentasi": "Konten layar lift; ketersediaan informasi; komunikasi penumpang",
                        "penjelasan": "Kelengkapan info yang ditampilkan di monitor lift (lantai, status, pengumuman)"
                    },
                    "Waktu respons TAS terhadap permintaan bantuan darurat": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 30 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 30 detik": 4,
                            "Selalu ≤ 30 detik": 6
                        },
                        "contohDokumentasi": "Waktu respons darurat; kinerja TAS; bantuan penumpang",
                        "penjelasan": "Kecepatan sistem bantuan darurat lift merespons panggilan distress (TAS = Telephone/Tele‑Alarm/Alarm Service, istilah pabrikan bervariasi)"
                    },
                    "Waktu respons pengaturan parameter operasional lift": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 6,
                            "Selalu ≤ 5 detik": 9
                        },
                        "contohDokumentasi": "Respons kontrol lift; penyesuaian parameter; penyetelan operasional",
                        "penjelasan": "Kecepatan sistem menyesuaikan pengaturan lift (kecepatan, prioritas)"
                    },
                    "Waktu akses informasi di antarmuka pengguna lift": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 3 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 3 detik": 6,
                            "Selalu ≤ 3 detik": 9
                        },
                        "contohDokumentasi": "Respons antarmuka pengguna; pengalaman penumpang; kinerja panel kontrol",
                        "penjelasan": "Kecepatan tampil informasi saat penumpang menekan tombol/touchscreen"
                    },
                    "Tingkat keberhasilan monitor keadaan darurat oleh kamera IoT": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 100% berhasil": 2,
                            "100% berhasil": 6
                        },
                        "contohDokumentasi": "Efektivitas pemantauan darurat; akurasi deteksi kamera; sistem keselamatan",
                        "penjelasan": "Akurasi kamera lift dalam mendeteksi situasi darurat penumpang"
                    },
                    "Waktu respons pengendalian lift jarak jauh": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 2 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 2 detik": 4,
                            "Selalu ≤ 2 detik": 6
                        },
                        "contohDokumentasi": "Latensi kontrol jarak jauh; manajemen off‑site; kinerja aplikasi seluler",
                        "penjelasan": "Kecepatan kontrol lift dari ruang monitor/ponsel"
                    },
                    "Waktu pembaruan data pada aplikasi atau antarmuka web": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 2,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 4,
                            "Selalu ≤ 5 detik": 6
                        },
                        "contohDokumentasi": "Laju penyegaran data; kinerja pembaruan real-time (waktu nyata); sinkronisasi sistem",
                        "penjelasan": "Kecepatan update info status lift di software monitoring"
                    }
                }
            },
            {
                "nama": "Sistem Parkir",
                "maksPoinKUK": 48,
                "penjelasan": "Pengelolaan parkir berbasis sensor dan layanan digital. Tujuan: mempercepat akses, meningkatkan akurasi informasi, dan mempermudah pembayaran. Cakupan: sensor slot, kontrol akses RFID (RFID = Radio‑Frequency Identification), papan informasi LED, aplikasi pembayaran cashless, analitik, dan dukungan PoE (PoE = Power over Ethernet) pada perangkat. Bukti: arsitektur sistem, hasil uji waktu/akurat, laporan transaksi, serta audit infrastruktur PoE. Keselarasan: pengalaman pengguna yang baik dan operasi efisien.",
                "indikator": {
                    "Uptime sistem sensor dan perangkat IoT parkir": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 99% uptime": 2,
                            "≥ 99% uptime": 6
                        },
                        "contohDokumentasi": "Ketersediaan sistem parkir; uptime perangkat IoT; catatan pemeliharaan",
                        "penjelasan": "Waktu operasional sistem sensor parkir tanpa downtime"
                    },
                    "Waktu akses kendaraan menggunakan RFID": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 3 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 3 detik": 6,
                            "Selalu ≤ 3 detik": 9
                        },
                        "contohDokumentasi": "Waktu respons RFID; kecepatan akses gerbang; pemrosesan kendaraan",
                        "penjelasan": "Kecepatan proses buka palang parkir dengan kartu/tag RFID (Radio‑Frequency Identification)"
                    },
                    "Akurasi informasi ketersediaan tempat parkir": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 95% akurasi": 3,
                            "≥ 95% akurasi": 9
                        },
                        "contohDokumentasi": "Akurasi ketersediaan parkir; keandalan deteksi sensor; sistem panduan",
                        "penjelasan": "Ketepatan info slot parkir kosong di aplikasi/papan informasi"
                    },
                    "Persentase keberhasilan pembayaran parkir cashless": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari 98% keberhasilan": 3,
                            "≥ 98% keberhasilan": 9
                        },
                        "contohDokumentasi": "Tingkat keberhasilan pembayaran nontunai; pemrosesan transaksi; gateway pembayaran",
                        "penjelasan": "Keberhasilan transaksi parkir non-tunai via app/e-wallet"
                    },
                    "Waktu pembaruan informasi ketersediaan parkir pada papan tampilan LED": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 5 detik": 3,
                            "Tidak selalu, kadang-kadang ≤ 5 detik": 6,
                            "Selalu ≤ 10 detik": 9
                        },
                        "contohDokumentasi": "Laju penyegaran tampilan LED; kecepatan pembaruan informasi; data real-time (waktu nyata)",
                        "penjelasan": "Kecepatan update info parkir di papan digital"
                    },
                    "Waktu pengolahan dan penyajian laporan visual analisis data parkir": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 10 menit": 2,
                            "Tidak selalu, kadang-kadang 10 menit": 4,
                            "Selalu ≤ 10 menit": 6
                        },
                        "contohDokumentasi": "Waktu pemrosesan data; kecepatan pembuatan laporan; kinerja analitik",
                        "penjelasan": "Kecepatan sistem menghasilkan grafik/laporan analisis parkir"
                    },
                    "Persentase perangkat aktif jaringan sistem parkir yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 90% perangkat": 1,
                            "≥ 90% perangkat": 3
                        },
                        "contohDokumentasi": "Inventaris perangkat PoE; analisis kebutuhan daya; desain jaringan",
                        "penjelasan": "Banyaknya perangkat parkir (kamera, sensor) yang powered via ethernet"
                    },
                    "Persentase perangkat pasif jaringan sistem parkir yang mendukung PoE": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak ada perangkat yang mendukung PoE": 0,
                            "Kurang dari 100% perangkat": 1,
                            "100% perangkat": 3
                        },
                        "contohDokumentasi": "Audit infrastruktur jaringan; standar konektivitas; penyaluran daya",
                        "penjelasan": "Banyaknya infrastruktur pendukung parkir system yang kompatibel PoE"
                    }
                }
            },
            {
                "nama": "Sistem Pengelolaan Utilitas",
                "maksPoinKUK": 48,
                "penjelasan": "Aplikasi terpadu untuk pemantauan dan administrasi utilitas. Tujuan: koordinasi lintas utilitas (listrik, air, HVAC, dll.; HVAC = Heating, Ventilation, and Air Conditioning) yang efektif. Cakupan: manajemen work order, repositori dokumen, pelaporan KPI, integrasi dengan sistem sumber, dan kontrol akses. Bukti: konfigurasi modul, rekam work order, metrik performa, dan bukti integrasi. Keselarasan: konsistensi pengelolaan aset/utilitas sesuai praktik baik.",
                "indikator": {
                    "Tingkat kesalahan dalam penjadwalan atau eksekusi perintah kerja": {
                        "tipe": "radio",
                        "poin": {
                            "Tidak dapat diukur": 0,
                            "Kurang dari ≤ 2% kesalahan": 8,
                            "≤ 2% kesalahan": 24
                        },
                        "contohDokumentasi": "Tingkat kesalahan work order; akurasi penjadwalan; kualitas eksekusi",
                        "penjelasan": "Banyaknya error dalam perencanaan dan pelaksanaan tugas maintenance"
                    },
                    "Waktu yang dibutuhkan untuk menemukan dokumen tertentu": {
                        "tipe": "radio",
                        "poin": {
                            "Selalu lebih dari 3 menit": 8,
                            "Tidak selalu, kadang-kadang ≤ 3 menit": 16,
                            "Selalu ≤ 3 menit": 24
                        },
                        "contohDokumentasi": "Waktu pencarian dokumen; kinerja penelusuran; manajemen informasi",
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
