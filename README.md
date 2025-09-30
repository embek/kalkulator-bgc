# Kalkulator Penilaian Kinerja Bangunan Gedung Cerdas (BGC) – Tahap Pemanfaatan

Dokumentasi lengkap fitur, alur, data, dan mekanisme perhitungan aplikasi kalkulator BGC berbasis HTML/CSS/JavaScript (tanpa backend, berjalan sepenuhnya di browser).

Versi aplikasi: 1.2.0

## Ringkasan

Aplikasi ini membantu melakukan penilaian mandiri (self‑assessment) untuk Penilaian Kinerja Bangunan Gedung Cerdas (Tahap Pemanfaatan). Pengguna memilih Jenis/ Klasifikasi bangunan, menandai Catatan Implementasi (jika relevan), lalu mengisi daftar simak indikator per parameter. Kalkulator akan menghitung:

- Poin per indikator dan subtotal per kriteria (dibatasi Maks Poin KUK)
- Subtotal per parameter (dibatasi Maks Poin Parameter)
- Total poin, Persentase terhadap maksimum, dan Peringkat (Utama/Madya/Pratama/Belum) dengan aturan pengunci (gating) untuk elemen Wajib

Semua data hanya tersimpan lokal di perangkat pengguna (localStorage) dan dapat diekspor ke JSON/CSV atau diimpor kembali dari JSON.

## Fitur Utama

- Penilaian berbasis checklist untuk seluruh parameter A–F
- Otomatis hitung ulang setiap perubahan (indikator, catatan implementasi, jenis, klasifikasi)
- Pengunci peringkat (gating) untuk elemen kategori Wajib
- Ekspor hasil ke JSON (dengan rincian poin) dan CSV
- Impor dari JSON untuk melanjutkan penilaian
- Autosave andal (input/change, buka/tutup section, pindah tab, sebelum tutup halaman)
- PWA-ready (bisa di-install; Service Worker didaftarkan pada https/localhost)
- Responsif (mobile-first), aksesibilitas dasar, dan mitigasi CLS
- Tema Terang/Gelap tersimpan per pengguna

## Cara Pakai

1) Pilih Jenis Bangunan (BGN / Non-BGN) dan Klasifikasi yang sesuai.
2) Jika tersedia, centang Catatan Implementasi yang terpenuhi (berpengaruh pada kategori elemen di Parameter F).
3) Isi Daftar Simak indikator untuk tiap parameter. Gunakan checkbox/radio sesuai deskripsi masing-masing indikator.
4) Ringkasan Hasil (Total, Maks, Persentase, Peringkat) otomatis ter-update.
5) Gunakan tombol:
   - Ekspor JSON: menyimpan snapshot data penilaian beserta rincian poin
   - Ekspor CSV: menyimpan daftar indikator terpilih beserta poinnya
   - Impor JSON: memuat kembali penilaian sebelumnya
   - Reset: menghapus data tersimpan lokal dan mengosongkan input

Catatan: Tombol “Hitung Total” bersifat opsional; semua perhitungan berjalan otomatis pada setiap perubahan.

## Data & Model

Sumber data berada di `tabel.js`.

- `matriks`: Berisi daftar Klasifikasi untuk jenis BGN/Non‑BGN. Setiap klasifikasi memiliki string implementasi 16 elemen (Parameter F). Huruf menandakan kategori elemen default:
  - `w` → Wajib, `d` → Disarankan, `s` → Sukarela
  - Angka setelah huruf mereferensikan nomor Catatan Implementasi yang harus terpenuhi agar kategori elemen tidak turun (degradasi). Contoh: `w3` berarti elemen default Wajib, namun akan turun menjadi Sukarela bila catatan #3 tidak terpenuhi.
- `catatanImplementasi`: Peta nomor → teks catatan per jenis. Digunakan untuk menampilkan daftar Catatan Implementasi yang relevan sesuai Jenis/Klasifikasi terpilih.
- `pengali`: Faktor pengali untuk Parameter F per kategori elemen (w/d/s) berdasarkan Jenis & Klasifikasi bangunan. Struktur internal menggunakan properti `katergori` berisi `{ w, d, s }` (ejaan ini memang apa adanya di dataset).
- `penilaian`: Definisi Parameter A–F. Setiap parameter memiliki:
  - `maksPoinParameter`
  - `kriteriaUnjukKerja`: array berisi objek kriteria yang memiliki `maksPoinKUK`, `nama`, `penjelasan` (opsional), dan `indikator`.
  - `indikator`: map `judulIndikator` → `{ tipe: 'checkbox' | 'radio', poin: number | Record<label, number>, ... }`.

## Mekanisme Perhitungan

Langkah perhitungan untuk setiap perubahan input (otomatis):

1) Untuk setiap Parameter (A–F), telusuri semua kriteria dan indikator yang dipilih.
2) Poin dasar indikator:
   - Checkbox: jika dicentang, bernilai `poin` (angka)
   - Radio: bila suatu label dipilih, bernilai `poin[label]`
3) Khusus Parameter F:
   - Setiap kriteria dianggap sebagai “elemen” ke‑1 s.d. ke‑16
   - Kategori elemen default (W/D/S) berasal dari string `implementasi` pada matriks untuk klasifikasi dipilih
   - Degradasi kategori: jika ada catatan yang dipersyaratkan elemen namun belum terpenuhi (tidak dicentang), kategori elemen turun menjadi Sukarela
   - Faktor pengali diambil dari `pengali[jenis][klasifikasi].katergori[kategoriElemen]`
   - Poin akhir indikator F = poin dasar × faktor pengali elemen tersebut
4) Subtotal per Kriteria dibatasi `maksPoinKUK`
5) Subtotal per Parameter = jumlah semua Kriteria (setelah dibatasi), dibatasi `maksPoinParameter`
6) Total = jumlah semua parameter
7) Persentase = Total / TotalMaks × 100%
8) Peringkat:
   - Utama ≥ 80%
   - Madya ≥ 60%
   - Pratama ≥ 40%
   - Belum < 40%
9) Pengunci peringkat (gating) elemen Wajib: Jika ada elemen F berkategori Wajib tetapi kriteria tersebut belum memiliki indikator terpilih sama sekali, maka peringkat ditahan di “Belum” walaupun persentasenya sudah tinggi.

Catatan: Nilai kontribusi F ditampilkan dengan satu angka desimal saat relevan.

## Implementasi Elemen (Parameter F) & Catatan Global

- Daftar Catatan Implementasi ditentukan berdasarkan Jenis & Klasifikasi yang dipilih.
- Hanya catatan yang relevan yang ditampilkan dan disimpan.
- Centang catatan yang terpenuhi. Jika seluruh catatan syarat suatu elemen terpenuhi, elemen mempertahankan kategori default-nya; bila ada yang tidak terpenuhi, elemen turun menjadi Sukarela.
- Badge kategori W/D/S per elemen ditampilkan di UI pada setiap kriteria parameter F. Perubahan catatan akan memperbarui badge dan perhitungan otomatis.

## Autosave & Penyimpanan Lokal

- Semua data tersimpan di `localStorage` secara otomatis:
  - Pada event input/change di form
  - Saat buka/tutup section parameter (`<details>`) agar daftar terbuka tersimpan
  - Saat tab disembunyikan (visibilitychange) dan sebelum halaman ditutup (beforeunload)
  - Setelah impor sukses (dengan sedikit penundaan untuk memastikan render selesai)
- Kunci utama penyimpanan: `bgc_data_v4` (menggunakan strategi chunk bila ukuran data besar), serta cap waktu `bgc_waktu_v4`, dan metadata chunk `bgc_chunk_meta_v4`.
- Data yang disimpan mencakup:
  - bangunan: `{ jenis, klasifikasi }`
  - implementasi: `{ catatanGlobal: hanya yang relevan, kategoriElemen }`
  - checklist: struktur indikator terpilih `{ [kodeParam]: { [indexKriteria]: { [namaIndikator]: true | 'labelTerpilih' } } }`
  - mode tampilan (saat ini selalu "checklist")
  - daftar parameter yang sedang terbuka
- Strategi chunked localStorage:
  - Jika JSON melebihi ambang batas, data dipecah menjadi beberapa bagian (`prefix_part_0`, dst.) dan metadata jumlah bagian disimpan ke `bgc_chunk_meta_v4`.
  - Muat data akan menyatukan kembali potongan tersebut.

## Ekspor / Impor

### Ekspor JSON (versi 2)

- Tombol: “Ekspor JSON”
- Isi snapshot:
  - tipe: `bgc-penilaian`
  - versi: `2`
  - diperbarui: ISO timestamp
  - bangunan: `{ jenis, klasifikasi }`
  - implementasi: `{ catatanGlobal: hanya yang relevan }`
  - checklist: seluruh pilihan indikator
  - poin: rincian terhitung untuk pelaporan
    - parameter: array berisi objek `{ kode, nama, maksParameter, subtotalParameter, kriteria: [...] }`
    - kriteria: `{ elemenIndex, nama, maksKriteria, kategoriElemen?, multiplier?, indikator: [...], subtotalKriteria }`
    - indikator: `{ key, tipe, pilihan, poinDasar, multiplier?, poinAkhir }`
    - ringkasan: `{ total, maks, persentase }`
- Importer tetap kompatibel mundur: hanya menggunakan `{ bangunan, implementasi.catatanGlobal, checklist }`, lalu menghitung ulang.

### Ekspor CSV

- Tombol: “Ekspor CSV”
- Kolom: `Parameter, Kriteria Index (elemenIndex), Indikator, Tipe, Pilihan/Checked, Poin Dasar, Multiplier(F), Poin Akhir`
- Disertakan juga baris ringkasan Total Poin, Poin Maks, dan Persentase.

### Impor JSON

- Tombol: “Impor JSON” → pilih berkas hasil ekspor sebelumnya
- Yang diterapkan saat impor:
  - bangunan (Jenis & Klasifikasi)
  - implementasi.catatanGlobal (relevan, lalu re‑derive kategori elemen)
  - checklist indikator
- Nilai/hasil akan dihitung ulang otomatis setelah state diterapkan.

## UI & Interaksi

- Mode tampilan: Checklist (default; grid alternatif belum digunakan)
- Navigasi Parameter (param‑nav):
  - Floating/side chips untuk melompat ke parameter
  - Penempatan sidebar di kiri, selalu di bawah app‑bar
  - Auto buka/tutup berdasarkan overlap agar tidak menutupi konten
- Daftar Simak Parameter (A–F): struktur expandable per parameter dan kriteria
- Catatan Implementasi: panel dinamis (tampil bila relevan)
- Ringkasan Hasil: Total, Maks, Persentase, Peringkat, dan progress bar
- Tombol Aksi (`.aksi`): responsif (menurun di mobile, berjajar di layar lebar)
- Tema: tombol toggle tema, disimpan ke localStorage; meta theme-color ikut disesuaikan
- Aksesibilitas: ARIA dasar; radio dapat di-untick dengan Space/Enter saat sudah terpilih (untuk memudahkan koreksi)

## PWA & Offline

- Manifest dirujuk dari `index.html`; Service Worker didaftarkan hanya pada `https:` atau `localhost`
- Mode offline tergantung ketersediaan berkas `sw.js` dan strategi cache di dalamnya
- Instalasi sebagai aplikasi (Add to Home Screen) dimungkinkan pada browser yang mendukung

## Performa & Stabilitas Layout (CLS)

- Lazy hydration untuk isi parameter yang belum terlihat
- `content-visibility` dan `contain-intrinsic-size` untuk meminimalkan reflow
- Min-height terukur pada area checklist, ringkasan, dan tombol aksi
- Sinkron tinggi app‑bar ke variabel CSS `--appbar-h` untuk offset/scroll yang akurat

## Responsif

- Mobile‑first, layar lebar menata ulang komponen agar lebih efisien
- `.aksi` (tombol aksi) menurun di layar kecil, berjajar di layar lebar (≥ 640px)
- Grid hasil menyesuaikan agar informasi utama tetap terbaca

## Ketentuan Peringkat (Ringkasan)

- Persentase dihitung dari total terhadap maksimum
- Peringkat: Utama (≥80), Madya (≥60), Pratama (≥40), Belum (<40)
- Gating: bila ada elemen Wajib (F) yang belum memiliki indikator terpilih, peringkat ditahan di “Belum” walau persentase tinggi

## Troubleshooting

- PWA tidak aktif
  - Pastikan membuka lewat `https://` atau `http://localhost` agar Service Worker terdaftar
- Data tidak tersimpan
  - Periksa apakah browser mengizinkan localStorage; beberapa mode privat membatasi
  - Tutup tab dengan benar; aplikasi juga menyimpan saat tab disembunyikan/ditutup
- Nilai tiba‑tiba berubah setelah ganti Jenis/Klasifikasi
  - Catatan implementasi yang relevan disesuaikan otomatis; kategori elemen dapat berubah dan mempengaruhi multiplier
  - Checklist indikator saat ini dipertahankan ketika ganti Jenis/Klasifikasi (tidak direset); perhitungan otomatis menyesuaikan
- Ingin memulai ulang
  - Gunakan tombol Reset; data localStorage akan dihapus dan input dibersihkan

## Pengembangan Lokal (opsional)

Aplikasi ini statis; Anda dapat langsung membuka `index.html` di browser. Untuk pengalaman PWA (Service Worker), jalankan melalui server lokal.

```bash
# Opsi 1 (Python 3)
python3 -m http.server 8080

# Opsi 2 (Node, jika terpasang)
npx http-server -p 8080
```

Lalu buka `http://localhost:8080/`.

## Versi & Perubahan Ringkas

- 1.2.0
  - Perhitungan otomatis penuh (termasuk saat ganti jenis/klasifikasi/implementasi)
  - Ekspor JSON versi 2 menyertakan rincian poin
  - Ekspor CSV indikator + poin
  - Autosave global (input/change/toggle/visibility/unload) dan simpan paksa setelah impor
  - Catatan Implementasi: hanya relevan yang ditampilkan/disimpan
  - Responsive `.aksi`, mitigasi CLS, dan peningkatan UX/aksesibilitas

## Lisensi

Aplikasi bersifat edukatif/demonstratif. Lihat repositori untuk informasi lisensi atau atribusi data yang berlaku.
