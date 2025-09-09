const kategori = ['Wajib', 'disarankan', 'sukarela']

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
            nama: "1a",
            defnisi: "",
            contoh: "",
            implementasi: [
                { elemenId: 1, kategori: 0 },
                { elemenId: 2, kategori: 1 },
                { elemenId: 3, kategori: 1 },
                { elemenId: 4, kategori: 2 },
                { elemenId: 5, kategori: 2 },
                { elemenId: 6, kategori: 2 },
                { elemenId: 7, kategori: 0 },
                { elemenId: 8, kategori: 0 },
                { elemenId: 9, kategori: 1 },
                { elemenId: 10, kategori: 2 },
                { elemenId: 11, kategori: 1 },
                { elemenId: 12, kategori: 1 },
                { elemenId: 13, kategori: 1 },
                { elemenId: 14, kategori: 2 },
                { elemenId: 15, kategori: 1 },
                { elemenId: 16, kategori: 1 }
            ]
        },
        {
            nama: "1b",
            defnisi: "",
            contoh: "",
            implementasi: [
                { elemenId: 1, kategori: 0 },
                { elemenId: 2, kategori: 1 },
                { elemenId: 3, kategori: 1 },
                { elemenId: 4, kategori: 2 },
                { elemenId: 5, kategori: 2 },
                { elemenId: 6, kategori: 2 },
                { elemenId: 7, kategori: 0 },
                { elemenId: 8, kategori: 0 },
                { elemenId: 9, kategori: 1 },
                { elemenId: 10, kategori: 2 },
                { elemenId: 11, kategori: 1 },
                { elemenId: 12, kategori: 1 },
                { elemenId: 13, kategori: 1 },
                { elemenId: 14, kategori: 2 },
                { elemenId: 15, kategori: 1 },
                { elemenId: 16, kategori: 1 }
            ]
        },
        {
            nama: "2",
            defnisi: "",
            contoh: "",
            implementasi: [
                { elemenId: 1, kategori: 0 },
                { elemenId: 2, kategori: 1 },
                { elemenId: 3, kategori: 1 },
                { elemenId: 4, kategori: 2 },
                { elemenId: 5, kategori: 2 },
                { elemenId: 6, kategori: 2 },
                { elemenId: 7, kategori: 0 },
                { elemenId: 8, kategori: 0 },
                { elemenId: 9, kategori: 1 },
                { elemenId: 10, kategori: 2 },
                { elemenId: 11, kategori: 1 },
                { elemenId: 12, kategori: 1 },
                { elemenId: 13, kategori: 1 },
                { elemenId: 14, kategori: 2 },
                { elemenId: 15, kategori: 1 },
                { elemenId: 16, kategori: 1 }
            ]
        },
        {
            nama: "3",
            defnisi: "",
            contoh: "",
            implementasi: [
                { elemenId: 1, kategori: 0, catatan: [3] },
                { elemenId: 2, kategori: 0, catatan: [2, 3] },
                { elemenId: 3, kategori: 0, catatan: [2, 3] },
                { elemenId: 4, kategori: 2 },
                { elemenId: 5, kategori: 2 },
                { elemenId: 6, kategori: 2 },
                { elemenId: 7, kategori: 0 },
                { elemenId: 8, kategori: 0 },
                { elemenId: 9, kategori: 0, catatan: [1] },
                { elemenId: 10, kategori: 2 },
                { elemenId: 11, kategori: 2, catatan: [3] },
                { elemenId: 12, kategori: 2, catatan: [3] },
                { elemenId: 13, kategori: 2, catatan: [3] },
                { elemenId: 14, kategori: 0, catatan: [8] },
                { elemenId: 15, kategori: 1, catatan: [3] },
                { elemenId: 16, kategori: 1, catatan: [3] }
            ]
        }
    ],

    "BGN": [
        {
            nama: "Sederhana",
            defnisi: "",
            contoh: "",
            implementasi: [
                { elemenId: 1, kategori: 0, catatan: [3] },
                { elemenId: 2, kategori: 0, catatan: [2, 3] },
                { elemenId: 3, kategori: 0, catatan: [2, 3] },
                { elemenId: 4, kategori: 2 },
                { elemenId: 5, kategori: 2 },
                { elemenId: 6, kategori: 2 },
                { elemenId: 7, kategori: 0 },
                { elemenId: 8, kategori: 0 },
                { elemenId: 9, kategori: 0, catatan: [1] },
                { elemenId: 10, kategori: 2 },
                { elemenId: 11, kategori: 2, catatan: [3] },
                { elemenId: 12, kategori: 2, catatan: [3] },
                { elemenId: 13, kategori: 2, catatan: [3] },
                { elemenId: 14, kategori: 0, catatan: [8] },
                { elemenId: 15, kategori: 1, catatan: [3] },
                { elemenId: 16, kategori: 1, catatan: [3] }
            ]
        },
        {
            nama: "Tidak Sederhana",
            defnisi: "",
            contoh: "",
            implementasi: [
                { elemenId: 1, kategori: 0, catatan: [3] },
                { elemenId: 2, kategori: 0, catatan: [2, 3] },
                { elemenId: 3, kategori: 0, catatan: [2, 3] },
                { elemenId: 4, kategori: 2 },
                { elemenId: 5, kategori: 2 },
                { elemenId: 6, kategori: 2 },
                { elemenId: 7, kategori: 0 },
                { elemenId: 8, kategori: 0 },
                { elemenId: 9, kategori: 0, catatan: [1] },
                { elemenId: 10, kategori: 2 },
                { elemenId: 11, kategori: 2, catatan: [3] },
                { elemenId: 12, kategori: 2, catatan: [3] },
                { elemenId: 13, kategori: 2, catatan: [3] },
                { elemenId: 14, kategori: 0, catatan: [8] },
                { elemenId: 15, kategori: 1, catatan: [3] },
                { elemenId: 16, kategori: 1, catatan: [3] }
            ]
        },
        {
            nama: "Khusus",
            defnisi: "",
            contoh: "",
            implementasi:[
                { elemenId: 1, kategori: 0, catatan: [3] },
                { elemenId: 2, kategori: 0, catatan: [2, 3] },
                { elemenId: 3, kategori: 0, catatan: [2, 3] },
                { elemenId: 4, kategori: 2 },
                { elemenId: 5, kategori: 2 },
                { elemenId: 6, kategori: 2 },
                { elemenId: 7, kategori: 0 },
                { elemenId: 8, kategori: 0 },
                { elemenId: 9, kategori: 0, catatan: [1] },
                { elemenId: 10, kategori: 2 },
                { elemenId: 11, kategori: 2, catatan: [3] },
                { elemenId: 12, kategori: 2, catatan: [3] },
                { elemenId: 13, kategori: 2, catatan: [3] },
                { elemenId: 14, kategori: 0, catatan: [8] },
                { elemenId: 15, kategori: 1, catatan: [3] },
                { elemenId: 16, kategori: 1, catatan: [3] }
            ]
        }
    ]
}

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

export { kategori, daftarElemen, matriks, catatanImplementasi }