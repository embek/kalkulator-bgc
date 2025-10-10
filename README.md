# Kalkulator Penilaian Kinerja Bangunan Gedung Cerdas (BGC) – Tahap Pemanfaatan

Dokumentasi aplikasi kalkulator BGC berbasis HTML/CSS/JavaScript murni (tanpa backend, berjalan sepenuhnya di browser).

Versi aplikasi: 1.2.1

## Ringkasan

Aplikasi ini membantu penilaian mandiri (self‑assessment) untuk Penilaian Kinerja BGC (Tahap Pemanfaatan). Alur: pilih Jenis/Klasifikasi bangunan, tandai Catatan Implementasi (jika relevan), lalu isi daftar simak indikator per parameter. Sistem menghitung otomatis:

- Poin indikator dan subtotal per kriteria (dibatasi Maks Poin KUK)
- Subtotal per parameter (dibatasi Maks Poin Parameter)
- Total poin, Persentase, dan Peringkat (Utama/Madya/Pratama/Belum) dengan pengunci (gating) untuk elemen Wajib

Data tersimpan lokal (localStorage), termasuk status terbuka/tertutup setiap parameter. Ekspor JSON/CSV tersedia dari menu Simpan (dropdown); impor dilakukan lewat tombol “Muat Data” yang membuka modal unggah.

## Fitur Utama

- Checklist parameter A–F dengan perhitungan otomatis pada setiap perubahan
- Pengunci peringkat (gating) untuk elemen F kategori Wajib
- Ekspor CSV, Ekspor JSON (melalui menu dropdown “Simpan Data”)
- Impor JSON melalui tombol “Muat Data” (modal unggah dengan drag & drop)
- Autosave (input/change/toggle/visibility/unload) dengan penyimpanan chunk untuk objek besar
- PWA-ready (Service Worker + manifest; pendaftaran pada https/localhost)
- Responsif mobile‑first dengan skala spacing konsisten; tema Terang/Gelap tersimpan per pengguna (tombol tema berupa chip di sidebar)
- Aksesibilitas: ARIA dasar, radiobutton dapat di‑uncheck dengan Space/Enter, serta modal info dengan focus‑trap, inert background, dan pengembalian fokus ke pemicu
 - Mode Ringkas: tampilkan hanya indikator yang belum diisi (chip filter pada sidebar)
 - Navigasi Parameter di sidebar (burger) dengan dua tumpukan nav dan chip:
   - Chip Tema (gelap/terang) di paling atas
   - Chip Mode Ringkas di bawah chip tema
   - Diikuti daftar chip parameter (A–F)
   Penempatan ini mencegah overlap dan memudahkan akses cepat.

## Cara Pakai

1) Pilih Jenis Bangunan (BGN / Non-BGN) dan Klasifikasi yang sesuai.
2) Jika tersedia, centang Catatan Implementasi yang terpenuhi (berpengaruh pada kategori elemen di Parameter F).
3) Isi Daftar Simak indikator untuk tiap parameter. Gunakan checkbox/radio sesuai deskripsi masing-masing indikator.
4) Ringkasan Hasil (Total, Maks, Persentase, Peringkat) otomatis ter-update.
5) Gunakan tombol:
  - Simpan Data ▾: pilih Simpan JSON atau Simpan CSV dari menu dropdown
  - Muat Data: membuka modal untuk memilih/drag & drop berkas JSON hasil ekspor
  - Reset: menghapus data tersimpan lokal dan mengosongkan input

Catatan: Tombol “Hitung Total” bersifat opsional; semua perhitungan berjalan otomatis pada setiap perubahan.

## Data & Model

Sumber data berada di `tabel.js`.

- `matriks`: Berisi daftar Klasifikasi untuk jenis BGN/Non‑BGN. Setiap klasifikasi memiliki string implementasi 16 elemen (Parameter F). Huruf menandakan kategori elemen default:
  - `w` → Wajib, `d` → Disarankan, `s` → Sukarela
  - Angka setelah huruf mereferensikan nomor Catatan Implementasi yang harus terpenuhi agar kategori elemen tidak turun (degradasi). Contoh: `w3` berarti elemen default Wajib, namun akan turun menjadi Sukarela bila catatan #3 tidak terpenuhi.
- `catatanImplementasi`: Peta nomor → teks catatan per jenis. Digunakan untuk menampilkan daftar Catatan Implementasi yang relevan sesuai Jenis/Klasifikasi terpilih.
- `pengali`: Faktor pengali untuk Parameter F per kategori elemen (w/d/s) berdasarkan Jenis & Klasifikasi bangunan. Struktur internal menggunakan properti `katergori` berisi `{ w, d, s }` (ejaan sesuai dataset asli).
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
- Kunci utama penyimpanan: `bgc_data_v4` (menggunakan strategi chunk bila ukuran data besar), cap waktu `bgc_waktu_v4`, dan metadata chunk `bgc_chunk_meta_v4`.
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

### Ekspor CSV

- Kolom: `Parameter, Kriteria Index (elemenIndex), Indikator, Tipe, Pilihan/Checked, Poin Dasar, Multiplier(F), Poin Akhir`
- Disertakan baris ringkasan Total Poin, Poin Maks, dan Persentase.

### Ekspor/Impor JSON

- Snapshot JSON (versi 2):
  - tipe: `bgc-penilaian`, versi: `2`, diperbarui: ISO timestamp
  - bangunan `{ jenis, klasifikasi }`, implementasi `{ catatanGlobal: hanya relevan }`, checklist seluruh pilihan
  - poin terhitung: rincian parameter/kriteria/indikator dan ringkasan `{ total, maks, persentase }`
- Impor JSON: menerapkan `{ bangunan, implementasi.catatanGlobal, checklist }` lalu menghitung ulang.

## UI & Interaksi

- Mode tampilan: Checklist (default; grid alternatif belum digunakan)
- Navigasi Parameter: sidebar (burger) dengan roving tabindex dan keyboard navigation (Arrow/Home/End/Enter/Space), serta floating chips pada layout tertentu.
- Daftar Simak Parameter (A–F): struktur expandable per parameter dan kriteria
- Catatan Implementasi: panel dinamis (tampil bila relevan)
- Ringkasan Hasil: Total, Maks, Persentase, Peringkat, dan progress bar
- Tombol Aksi (`.aksi`): responsif (menurun di mobile, berjajar di layar lebar)
- Tema: tombol toggle tema berupa chip di sidebar (di atas Mode Ringkas). Status tersimpan ke localStorage, beserta penyesuaian meta theme-color.
- Aksesibilitas tambahan: roving tabindex pada chip navigasi parameter; dukungan keyboard (Arrow, Home/End, Enter/Space) untuk berpindah dan memilih chip.
- Aksesibilitas: ARIA dasar; radio dapat di-untick dengan Space/Enter saat sudah terpilih (untuk memudahkan koreksi)

Detail UI terbaru:
 - CSS mobile‑first ringkas (~500+ baris) dengan breakpoint: 600px, 768px, 1024px
- Skala spacing konsisten (variabel `--sp-*`) untuk margin/gap/padding
- Offset header akurat via `--appbar-h` (disetel dinamis oleh JS); toast diposisikan tepat di bawah app bar agar tidak menutupi banner
- Panel bantuan memiliki `scroll-margin-top` dan margin adaptif (termasuk di rentang 600–680 px) agar kartu tidak tertutup banner
- Radio pill “Jenis Bangunan”: lebar diselaraskan secara kondisional via JavaScript hanya ketika salah satu opsi membungkus baris terlebih dahulu (umumnya Non‑BGN). Bila Non‑BGN wrap dan BGN tidak, BGN diberi `min-width` mengikuti Non‑BGN; jika tidak ada wrap, tampilan dibiarkan alami (tidak memaksakan grid lebar sama)
- Modal Info: focus trap aktif, latar belakang inert, fokus kembali ke pemicu; konten disanitasi dengan DOMPurify (SRI diperbarui)
- Modal Muat Data: drag & drop JSON + pre-validasi struktur; tombol aksi menyesuaikan (Pilih/Muat)

## PWA & Offline

- Manifest dirujuk dari `index.html`; Service Worker didaftarkan hanya pada `https:` atau `localhost`
- Mode offline tergantung ketersediaan berkas `sw.js` dan strategi cache di dalamnya
- Instalasi sebagai aplikasi (Add to Home Screen) dimungkinkan pada browser yang mendukung

## Performa

- Lazy hydration/hydration bertahap via `IntersectionObserver` dan `requestIdleCallback`
- Sinkron tinggi app‑bar ke variabel CSS `--appbar-h` untuk offset/scroll yang akurat

## Responsif

- Mobile‑first, layar lebar menata ulang komponen
- Breakpoint: ≥600px (penataan tombol aksi dan grid-form dua kolom), ≥768px (kriteria & indikator berdampingan), ≥1024px (lebar maksimal konten)

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

## Struktur Proyek Singkat

- `index.html` — markup utama; termasuk chip Tema & Mode Ringkas di sidebar, panel bantuan, form penilaian, nav parameter, modal info, dan modal muat data
- `style.css` — stylesheet ringkas mobile‑first (~500 baris) dengan spacing konsisten dan sedikit breakpoint
- `main.js` — logika state, render checklist, kalkulasi poin, autosave, tema, dan interaksi UI
- `tabel.js` — dataset penilaian (matriks, catatan, pengali, penilaian A–F)
- `sw.js` — service worker sederhana (cache core assets)
- `manifest.webmanifest` + `icons/*` — PWA meta & ikon

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

- 1.2.1
  - Pindah tombol Tema ke sidebar sebagai chip di atas chip Mode Ringkas; ikon dan ARIA diperbarui, fokus awal nav diarahkan ke chip Tema
  - Mode Ringkas (chip) memfilter indikator yang belum terisi; saat aktif, seluruh parameter otomatis dibuka untuk peninjauan cepat
  - Menu Simpan menjadi dropdown (JSON/CSV); tombol Muat Data membuka modal unggah dengan drag & drop dan pre‑validasi JSON
  - Modal Info: perbaikan aksesibilitas (focus trap, inert background, kembalikan fokus ke pemicu); konten disanitasi dengan DOMPurify (SRI diperbarui)
  - Radio pill Jenis Bangunan: penyeragaman lebar kondisional via JS saat terjadi wrapping; tanpa memaksakan tampilan dua kolom tetap
  - Perbaikan overlap/nav: dua nav sidebar (chip Tema/Mode Ringkas dan daftar parameter) ditata vertikal tanpa tumpang tindih; toast dan panel memiliki offset yang akurat
  - Pembaruan dokumentasi agar sejalan dengan kode

- 1.2.0
  - Perhitungan otomatis penuh (termasuk saat ganti jenis/klasifikasi/implementasi)
  - Ekspor JSON versi 2 menyertakan rincian poin
  - Ekspor CSV indikator + poin
  - Autosave global (input/change/toggle/visibility/unload) dan simpan paksa setelah impor
  - Catatan Implementasi: hanya relevan yang ditampilkan/disimpan
  - Responsif mobile‑first, spacing konsisten, dan peningkatan UX/aksesibilitas

## Lisensi

Aplikasi bersifat edukatif/demonstratif. Lihat repositori untuk informasi lisensi atau atribusi data yang berlaku.
