// Kalkulator Penilaian BGC
// Bahasa: Indonesia
// Fitur: generate dinamis dari objek penilaian (tabel.js), input skor tiap parameter A-F, hitung total, simpan ke localStorage.
// ---- Helper Penyimpanan (reintroduced) ----
const KUNCI_DATA = 'bgc_data_v4';
const KUNCI_WAKTU = 'bgc_waktu_v4';
const KUNCI_CHUNK_META = 'bgc_chunk_meta_v4';

function storageSet(k, v) { try { localStorage.setItem(k, v); } catch (e) { console.warn('[storageSet]', e); } }
function storageGet(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
function storageRemove(k) { try { localStorage.removeItem(k); } catch (e) { console.warn('[storageRemove]', e); } }

function simpanChunked(prefix, obj) {
	try {
		const str = JSON.stringify(obj);
		const MAX = 800_000;
		if (str.length <= MAX) {
			storageSet(prefix, str);
			storageRemove(KUNCI_CHUNK_META);
			return;
		}
		const parts = []; for (let i = 0; i < str.length; i += MAX) parts.push(str.slice(i, i + MAX));
		parts.forEach((p, i) => storageSet(`${prefix}_part_${i}`, p));
		storageSet(KUNCI_CHUNK_META, JSON.stringify({ prefix, jumlah: parts.length }));
	} catch (e) { console.error('[simpanChunked] gagal', e); }
}

function muatChunked(prefix) {
	try {
		const metaRaw = storageGet(KUNCI_CHUNK_META);
		if (!metaRaw) { const s = storageGet(prefix); return s ? JSON.parse(s) : null; }
		const meta = JSON.parse(metaRaw);
		if (meta.prefix !== prefix) return null;
		const arr = []; for (let i = 0; i < meta.jumlah; i++) { const part = storageGet(`${prefix}_part_${i}`); if (part == null) return null; arr.push(part); }
		return JSON.parse(arr.join(''));
	} catch (e) { console.error('[muatChunked] gagal', e); return null; }
}
/* =============================
   IMPLEMENTASI GLOBAL
   ============================= */
const ELEM_IMPLEMENTASI = 16;
let stateImplementasi = { catatanGlobal: {}, kategoriElemen: {} };

function parseImplementasiString(str) {
	if (!str || typeof str !== 'string') return [];
	const hasil = [];
	let i = 0; let elemen = 1;
	while (i < str.length && elemen <= ELEM_IMPLEMENTASI) {
		const huruf = str[i];
		if (!/[wds]/i.test(huruf)) { i++; continue; }
		i++;
		let digits = '';
		while (i < str.length && /[0-9]/.test(str[i])) { digits += str[i]; i++; }
		const catatan = digits.split('').filter(Boolean).map(n => parseInt(n, 10));
		hasil.push({ index: elemen, kategori: huruf.toLowerCase(), catatan });
		elemen++;
	}
	while (hasil.length < ELEM_IMPLEMENTASI) hasil.push({ index: hasil.length + 1, kategori: 's', catatan: [] });
	return hasil;
}

function getEntryImplementasi() {
	const jenis = selectJenis?.value; const klas = selectKlasifikasi?.value;
	if (!jenis || !klas || !matriks || !Array.isArray(matriks[jenis])) return null;
	return matriks[jenis].find(m => m.nama === klas) || null;
}

function buildCatatanGlobalList(dataParsed) {
	const jenis = selectJenis?.value;
	const peta = (typeof catatanImplementasi === 'object') ? catatanImplementasi : {};
	const sumberUtama = (jenis && peta[jenis]) ? peta[jenis] : {};
	const fallback1 = peta['Non-BGN'] || {};
	const fallback2 = peta['BGN'] || {};
	const ambilTeks = (no) => {
		return sumberUtama[no] || fallback1[no] || fallback2[no] || ('Catatan ' + no);
	};
	const setNomor = new Set();
	dataParsed.forEach(d => d.catatan.forEach(c => setNomor.add(c)));
	return Array.from(setNomor).sort((a, b) => a - b).map(no => ({ no, teks: ambilTeks(no) }));
}

function renderCatatanGlobal() {
	const wrap = document.getElementById('catatan-global-wrapper');
	const list = document.getElementById('daftar-catatan-global');
	if (!wrap || !list) return;
	const entry = getEntryImplementasi();
	if (!entry || !entry.implementasi) { wrap.hidden = true; list.innerHTML = ''; return; }
	const parsed = parseImplementasiString(entry.implementasi);
	// Simpan baseline kategori
	parsed.forEach(p => { stateImplementasi.kategoriElemen[p.index] = p.kategori; });
	const daftarCatatan = buildCatatanGlobalList(parsed);
	if (!daftarCatatan.length) { wrap.hidden = true; list.innerHTML = ''; return; }
	wrap.hidden = false;
	list.innerHTML = daftarCatatan.map(c => {
		const id = `cat-global-${c.no}`;
		const cek = stateImplementasi.catatanGlobal[c.no] ? 'checked' : '';
		return `<label><input type="checkbox" id="${id}" data-catatan-global="${c.no}" ${cek}/> <span class="no">${c.no}.</span> <span class="teks">${c.teks}</span></label>`;
	}).join('');
	// After render apply logic degrade
	degradasiKategori(parsed);
}

function degradasiKategori(parsed) {
	// Jika sebuah elemen punya catatan dan ada salah satu catatan yang tidak terpenuhi, kategori -> 's'
	parsed.forEach(p => {
		if (!p.catatan.length) return; // no catatan => tetap
		const semuaTerpenuhi = p.catatan.every(no => !!stateImplementasi.catatanGlobal[no]);
		if (!semuaTerpenuhi) {
			stateImplementasi.kategoriElemen[p.index] = 's';
		} else {
			// restore ke baseline aslinya (p.kategori)
			stateImplementasi.kategoriElemen[p.index] = p.kategori;
		}
	});
	// TODO: jika nanti kategoriElemen mempengaruhi skor, integrasikan di logika perhitungan.
}

document.addEventListener('change', e => {
	const t = e.target;
	if (t && t.matches('input[type=checkbox][data-catatan-global]')) {
		const no = t.getAttribute('data-catatan-global');
		stateImplementasi.catatanGlobal[no] = t.checked;
		const entry = getEntryImplementasi();
		if (entry && entry.implementasi) {
			const parsed = parseImplementasiString(entry.implementasi);
			degradasiKategori(parsed);
			simpanLocal(false);
			perbaruiBadgeElemenF();
			try { tandaiIndikatorWajib(); } catch (_) { }
			// Rehitung agar poin F terpengaruh pengali kategori
			try { hitungDariChecklist(); } catch (_) { }
		}
	}
});

function renderImplementasi() {
	renderCatatanGlobal();
	perbaruiBadgeElemenF();
	// Tandai indikator wajib sesuai status elemen aktif
	try { tandaiIndikatorWajib(); } catch (_) { }
	// Sinkronkan hitungan & tampilan klaim setelah implementasi/badge berubah
	try { hitungDariChecklist(); } catch (_) { }
	try { perbaruiPoinIndikator(); } catch (_) { }
}

function terapkanStateImplementasi() {
	// apply catatan global checkboxes
	Object.entries(stateImplementasi.catatanGlobal || {}).forEach(([no, val]) => {
		const el = document.querySelector(`input[type=checkbox][data-catatan-global="${no}"]`);
		if (el) el.checked = !!val;
	});
	// recalculasi degradasi setelah load
	const entry = getEntryImplementasi();
	if (entry && entry.implementasi) { degradasiKategori(parseImplementasiString(entry.implementasi)); }
	perbaruiBadgeElemenF();
	try { tandaiIndikatorWajib(); } catch (_) { }
}
// Badge status (W/D/S) untuk 16 elemen Parameter F - inline di sebelah nama kriteria
function perbaruiBadgeElemenF() {
	const paramF = document.querySelector('.pc-parameter[data-param="F"]');
	if (!paramF) return; // UI checklist belum dirender
	const entry = getEntryImplementasi();
	if (!entry || !entry.implementasi) {
		// fallback set default S di semua badge inline jika ada
		paramF.querySelectorAll('.pc-kriteria [data-elemen]').forEach(b => { b.classList.remove('f-elemen-w', 'f-elemen-d'); b.classList.add('f-elemen-s'); b.textContent = 'Sukarela (faktor pengali: 1.0)'; b.setAttribute('title', 'Elemen – Sukarela, faktor pengali: 1.0'); });
		return;
	}
	const parsed = parseImplementasiString(entry.implementasi);
	// Ambil faktor pengali aktif untuk menampilkan angka pada badge
	const jenisNow = selectJenis ? selectJenis.value : '';
	const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';
	const faktorKategori = kalkulator.getFaktorPengali(jenisNow, klasNow) || { w: 1, d: 1, s: 1 };
	const labelKategori = { w: 'Wajib', d: 'Disarankan', s: 'Sukarela' };
	parsed.forEach(p => {
		const el = paramF.querySelector(`.pc-kriteria [data-elemen="${p.index}"]`);
		if (!el) return;
		const kat = stateImplementasi.kategoriElemen[p.index] || p.kategori || 's';
		el.classList.remove('f-elemen-w', 'f-elemen-d', 'f-elemen-s');
		el.classList.add(kat === 'w' ? 'f-elemen-w' : kat === 'd' ? 'f-elemen-d' : 'f-elemen-s');
		const f = parseFloat(faktorKategori[kat]) || 1;
		const teks = `${labelKategori[kat]} (faktor pengali: ${f.toFixed(1)})`;
		el.textContent = teks;
		el.setAttribute('title', `Elemen ${p.index} — ${labelKategori[kat]}, faktor pengali: ${f}`);
	});
}
function hapusChunked(kunciDasar) {
	try {
		const metaRaw = storageGet(KUNCI_CHUNK_META);
		if (metaRaw) {
			try {
				const meta = JSON.parse(metaRaw);
				if (meta.prefix === kunciDasar) {
					for (let i = 0; i < meta.jumlah; i++) storageRemove(`${kunciDasar}_part_${i}`);
					storageRemove(KUNCI_CHUNK_META);
				}
			} catch (_) { }
		}
		storageRemove(kunciDasar);
	} catch (e) { console.error('[hapusChunked] Gagal:', e); }
}

// Autosave controller
let jadwalFlush = null;
function autosave(dataObj, paksa = false) {
	// Simpan ringan ke memori agar cepat, flush ke storage terjadwal.
	try {
		window.__cacheTerakhirBGC = dataObj; // cache global (non-kritis)
	} catch (_) { }
	if (paksa) {
		simpanChunked(KUNCI_DATA, dataObj);
		storageSet(KUNCI_WAKTU, Date.now().toString());
		return;
	}
	if (jadwalFlush) clearTimeout(jadwalFlush);
	jadwalFlush = setTimeout(() => {
		simpanChunked(KUNCI_DATA, dataObj);
		storageSet(KUNCI_WAKTU, Date.now().toString());
	}, 400); // debounce flush 400ms
}

function muatDataTersimpan() {
	let data = muatChunked(KUNCI_DATA);
	if (!data) {
		// Coba cache global (fallback terakhir) jika ada
		data = (typeof window !== 'undefined' && window.__cacheTerakhirBGC) ? window.__cacheTerakhirBGC : null;
	}
	return data;
}

function hapusDataTersimpan() {
	hapusChunked(KUNCI_DATA);
	storageRemove(KUNCI_WAKTU);
}

// --- Ambil Referensi DOM (mode checklist saja) ---
const kontainerParameter = null; // form angka tidak lagi digunakan
const totalSkorEl = document.getElementById('total-skor');
const totalMaksEl = document.getElementById('total-maks');
const persentaseEl = document.getElementById('persentase');
const progressEl = document.getElementById('progress-total');
const klasifikasiEl = document.getElementById('klasifikasi-level');
const form = document.getElementById('form-penilaian');
const btnHitung = document.getElementById('btn-hitung');
const btnSimpan = document.getElementById('btn-simpan');
const btnMuat = document.getElementById('btn-muat');
const btnReset = document.getElementById('btn-reset');
const selectJenis = document.getElementById('jenis-bangunan');
const selectKlasifikasi = document.getElementById('klasifikasi-bangunan');
const versiEl = document.getElementById('versi-aplikasi');
const tombolTema = document.getElementById('btn-tema');
const KUNCI_TEMA = 'bgc_tema';

// Tampilkan tahun berjalan di footer
const tahunEl = document.getElementById('tahun');
if (tahunEl) tahunEl.textContent = new Date().getFullYear();

// ===============================
// KELAS KALKULATOR BGC
// ===============================
class KalkulatorBGC {
	constructor(dataPenilaian) {
		this.dataPenilaian = dataPenilaian || {};
		// Simpan nilai aktual parameter (A-F)
		this.nilaiParameter = {};
	}

	static clamp(angka, min, max) { return Math.min(Math.max(angka, min), max); }

	formatPersentase(nilai) { return (Math.round(nilai * 10) / 10).toFixed(1) + '%'; }

	getMaksParameter(kode) {
		const p = this.dataPenilaian[kode];
		return p ? (p.maksPoinParameter || 0) : 0;
	}

	getTotalMaks() {
		return Object.values(this.dataPenilaian).reduce((ak, p) => ak + (p.maksPoinParameter || 0), 0);
	}

	setNilai(kode, nilaiBaru) {
		const maks = this.getMaksParameter(kode);
		const bersih = parseFloat(valor(nilaiBaru));
		const final = isNaN(bersih) ? 0 : KalkulatorBGC.clamp(bersih, 0, maks);
		this.nilaiParameter[kode] = final;
		return final;
	}

	getNilai(kode) { return this.nilaiParameter[kode] || 0; }

	getSemuaNilai() { return { ...this.nilaiParameter }; }

	hitungTotal() { return Object.values(this.nilaiParameter).reduce((a, b) => a + b, 0); }

	// Mendapatkan faktor pengali berdasarkan Jenis & Klasifikasi.
	// Data pengali pada tabel.js memiliki pohon yang tertukar terhadap matriks:
	// - Jenis "Non-BGN" memakai klasifikasi "Klas X" (1a..10b) -> faktor ada di pengali["BGN"]["X"].
	// - Jenis "BGN" memakai klasifikasi "Sederhana/Tidak Sederhana/Khusus" -> faktor ada di pengali["Non-BGN"][klasifikasi].
	getFaktorPengali(jenis, klasifikasi) {
		if (!jenis || !klasifikasi || typeof pengali !== 'object') return null;
		const jen = (jenis || '').toString();
		const klasRaw = (klasifikasi || '').toString().trim();
		const hapusKlasPrefix = s => s.replace(/^Klas\s*/i, '').trim();
		const normLower = s => s.toLowerCase();
		let kandidat = null;
		if (jen === 'Non-BGN') {
			// Ambil kode seperti 1a, 9b, ... dari "Klas 1a"
			const kode = hapusKlasPrefix(klasRaw);
			kandidat = pengali['BGN'] && (pengali['BGN'][kode] || pengali['BGN'][kode.toLowerCase()] || pengali['BGN'][kode.toUpperCase()]);
			if (!kandidat && pengali['BGN']) {
				try { tandaiIndikatorWajib(); } catch (_) { }
				// fallback cari case-insensitive
				const ent = Object.entries(pengali['BGN']).find(([k]) => normLower(k) === normLower(kode));
				if (ent) kandidat = ent[1];
			}
		} else if (jen === 'BGN') {
			// Gunakan nama klasifikasi apa adanya di tree Non-BGN (Sederhana/Tidak Sederhana/Khusus)
			kandidat = pengali['Non-BGN'] && (pengali['Non-BGN'][klasRaw] || pengali['Non-BGN'][klasRaw.toLowerCase()] || pengali['Non-BGN'][klasRaw.toUpperCase()]);
			if (!kandidat && pengali['Non-BGN']) {
				const ent = Object.entries(pengali['Non-BGN']).find(([k]) => normLower(k) === normLower(klasRaw));
				if (ent) kandidat = ent[1];
			}
		}
		// Jika masih belum, coba akses langsung (untuk berjaga-jaga bila data berubah suatu saat)
		if (!kandidat) {
			kandidat = pengali[jen] && (pengali[jen][klasRaw] || pengali[jen][hapusKlasPrefix(klasRaw)]);
		}
		return kandidat && kandidat.katergori ? kandidat.katergori : null;
	}

	hitungTotalDenganPengali(jenis, klasifikasi) {
		const faktor = this.getFaktorPengali(jenis, klasifikasi);
		const total = this.hitungTotal();
		if (!faktor) return { total, faktor: null, totalTerapkan: total };
		// Asumsi: gunakan rata-rata faktor (w,d,s) sebagai multiplier global (tanpa formula resmi disediakan).
		const arr = ['w', 'd', 's'].map(k => parseFloat(faktor[k]) || 0);
		const faktorRata = arr.reduce((a, b) => a + b, 0) / arr.length;
		return { total, faktor, faktorRata, totalTerapkan: Math.round((total * faktorRata) * 100) / 100 };
	}

	validasiInput(kode, nilai) {
		const maks = this.getMaksParameter(kode);
		if (isNaN(nilai)) return { ok: false, pesan: 'Bukan angka' };
		if (nilai < 0) return { ok: false, pesan: 'Kurang dari 0' };
		if (nilai > maks) return { ok: false, pesan: `Melebihi maks (${maks})` };
		return { ok: true };
	}
}

// Fungsi util lokal (diberi nama unik agar tidak tabrakan)
function valor(v) { return v; }
function formatPersentase(nilai) { return (Math.round(nilai * 10) / 10).toFixed(1) + '%'; }
function clamp(angka, min, max) { return Math.min(Math.max(angka, min), max); }
function buatDebounce(fn, t = 250) { let id; return function (...args) { clearTimeout(id); id = setTimeout(() => fn.apply(this, args), t); }; }
function buatThrottle(fn, t = 120) { let tunggu = false, simpan; return function (...args) { if (tunggu) { simpan = args; return; } fn.apply(this, args); tunggu = true; setTimeout(() => { tunggu = false; if (simpan) { fn.apply(this, simpan); simpan = null; } }, t); }; }

// Pembuatan elemen parameter (form angka) dihapus
// --- Data Bangunan (Jenis & Klasifikasi) dari matriks ---
let sudahIsiJenis = false;
const jenisGroup = document.getElementById('jenis-bangunan-group');
const klasGroup = document.getElementById('klasifikasi-bangunan-group');
function escCSS(s) { try { return (CSS && CSS.escape) ? CSS.escape(String(s)) : String(s).replace(/"/g, '\\"'); } catch (_) { return String(s); } }
function buatInfoBtn(title, isi) {
	const wrap = document.createElement('span');
	wrap.className = 'tooltip';
	const btn = document.createElement('span');
	btn.className = 'info-btn';
	btn.setAttribute('aria-label', 'Info');
	btn.setAttribute('role', 'button');
	btn.tabIndex = 0;
	btn.textContent = 'i';
	const konten = document.createElement('div');
	konten.className = 'tooltip-content';
	konten.innerHTML = `<div class="judul">${title}</div><div class="isi">${isi}</div>`;
	wrap.appendChild(btn); wrap.appendChild(konten);
	return wrap;
}
function renderJenisRadios() {
	if (!jenisGroup) return;
	const dataMatriks = (typeof matriks !== 'undefined') ? matriks : (window.matriks || undefined);
	if (!dataMatriks) return;
	const opsi = Object.keys(dataMatriks);
	jenisGroup.innerHTML = '';
	opsi.forEach((j, idx) => {
		const id = `rb-jenis-${idx}`;
		const label = document.createElement('label');
		label.className = 'radio-pill';
		label.htmlFor = id;
		label.innerHTML = `<input type="radio" id="${id}" name="__jenis_rb" value="${j}"><span class="opsi-teks">${j}</span>`;
		jenisGroup.appendChild(label);
	});
	sudahIsiJenis = true;
}
function renderKlasRadios(jenis) {
	if (!klasGroup) return;
	const dataMatriks = (typeof matriks !== 'undefined') ? matriks : (window.matriks || undefined);
	klasGroup.innerHTML = '';
	if (!dataMatriks || !jenis || !dataMatriks[jenis]) return;
	const daftar = dataMatriks[jenis];
	daftar.forEach((k, idx) => {
		const id = `rb-klas-${idx}`;
		const label = document.createElement('label');
		label.className = 'radio-pill';
		label.htmlFor = id;
		const judul = k.nama;
		const info = buatInfoBtn('Definisi & Contoh', `<div><strong>Definisi:</strong> ${k.definisi || '-'}<br><strong>Contoh:</strong> ${k.contoh || '-'}</div>`);
		const span = document.createElement('span');
		span.className = 'opsi-teks';
		span.textContent = judul + ' ';
		span.appendChild(info);
		const inp = document.createElement('input');
		inp.type = 'radio'; inp.id = id; inp.name = '__klas_rb'; inp.value = judul;
		label.appendChild(inp); label.appendChild(span);
		klasGroup.appendChild(label);
	});
}
function isiJenisBangunan() {
	try {
		if (!jenisGroup) return;
		const dataMatriks = (typeof matriks !== 'undefined') ? matriks : (window.matriks || undefined);
		if (!dataMatriks || typeof dataMatriks !== 'object') return;
		renderJenisRadios();
	} catch (e) { console.warn('[isiJenisBangunan] gagal:', e); }
}
function isiKlasifikasi(jenis) {
	renderKlasRadios(jenis);
}
function pastikanJenisTerisi(maksCoba = 40, interval = 125, percobaan = 0) {
	if (sudahIsiJenis) return; // sudah success
	isiJenisBangunan();
	if (!sudahIsiJenis && percobaan < maksCoba) {
		setTimeout(() => pastikanJenisTerisi(maksCoba, interval, percobaan + 1), interval);
	} else if (!sudahIsiJenis) {
		console.warn('[init] Gagal memuat daftar jenis bangunan: matriks tidak tersedia.');
	}
}
function pasangHandlerBangunan() {
	const hiddenJenis = document.getElementById('jenis-bangunan');
	const hiddenKlas = document.getElementById('klasifikasi-bangunan');
	if (jenisGroup) jenisGroup.addEventListener('change', (e) => {
		const rb = jenisGroup.querySelector('input[type=radio][name="__jenis_rb"]:checked');
		if (!rb) return;
		hiddenJenis.value = rb.value;
		hiddenKlas.value = '';
		isiKlasifikasi(rb.value);
		renderImplementasi();
		simpanLocal(false);
		try { tandaiIndikatorWajib(); } catch (_) { }
		try { hitungDariChecklist(); } catch (_) { }
		try { perbaruiPoinIndikator(); } catch (_) { }
	});
	if (klasGroup) klasGroup.addEventListener('change', () => {
		const rb = klasGroup.querySelector('input[type=radio][name="__klas_rb"]:checked');
		const hiddenKlas2 = document.getElementById('klasifikasi-bangunan');
		if (rb && hiddenKlas2) hiddenKlas2.value = rb.value;
		renderImplementasi();
		simpanLocal(false);
		try { tandaiIndikatorWajib(); } catch (_) { }
		try { hitungDariChecklist(); } catch (_) { }
		try { perbaruiPoinIndikator(); } catch (_) { }
	});
	// Hindari toggle radio saat klik ikon info; fokuskan untuk memunculkan tooltip
	const stopInfo = (e) => {
		const b = e.target.closest && e.target.closest('.info-btn');
		if (b) { e.preventDefault(); e.stopPropagation(); b.focus(); }
	};
	if (jenisGroup) jenisGroup.addEventListener('click', stopInfo, true);
	if (klasGroup) klasGroup.addEventListener('click', stopInfo, true);
}
function muatDataBangunan(d) {
	if (!d) return;
	const hiddenJenis = document.getElementById('jenis-bangunan');
	const hiddenKlas = document.getElementById('klasifikasi-bangunan');
	const apply = () => {
		if (!sudahIsiJenis) { setTimeout(apply, 100); return; }
		if (d.jenis) {
			hiddenJenis.value = d.jenis;
			// centang radio
			const rb = jenisGroup && jenisGroup.querySelector(`input[type=radio][name='__jenis_rb'][value="${escCSS(d.jenis)}"]`);
			if (rb) rb.checked = true;
			isiKlasifikasi(d.jenis);
			if (d.klasifikasi) {
				hiddenKlas.value = d.klasifikasi;
				const rk = klasGroup && klasGroup.querySelector(`input[type=radio][name='__klas_rb'][value="${escCSS(d.klasifikasi)}"]`);
				if (rk) rk.checked = true;
			}
			renderImplementasi();
		}
	};
	apply();
}

// generateForm & generateFormGrid dihapus

// =============================
// MODE CHECKLIST (Kriteria & Indikator)
// =============================
const MODE_CHECKLIST = 'checklist';
let modeAktif = 'grid';
let stateChecklist = {}; // { parameter: { kriteriaIndex: { indikatorKey: valueSelected } } }

function gunakanModeChecklist(aktif = true) {
	const elChecklist = document.getElementById('parameter-checklist');
	const elGrid = document.getElementById('parameter-form-grid');
	if (!elChecklist) return;
	if (aktif) {
		modeAktif = MODE_CHECKLIST;
		if (kontainerParameter) kontainerParameter.hidden = true;
		if (elGrid) { elGrid.hidden = true; elGrid.setAttribute('aria-hidden', 'true'); }
		elChecklist.hidden = false; elChecklist.removeAttribute('aria-hidden');
		if (!elChecklist.dataset.rendered) { renderChecklist(); elChecklist.dataset.rendered = '1'; }
	} else {
		modeAktif = 'grid';
		elChecklist.hidden = true; elChecklist.setAttribute('aria-hidden', 'true');
		gunakanModeGridParameter(true);
	}
}

function renderChecklist() {
	const root = document.getElementById('parameter-checklist');
	if (!root) return;
	const frag = document.createDocumentFragment();
	const nav = document.getElementById('param-nav');
	const navFrag = document.createDocumentFragment();
	// Tambah chip khusus: Data Bangunan di awal; Hasil ditambahkan setelah parameter
	let chipHasil = null;
	if (nav) {
		const chipData = document.createElement('button');
		chipData.type = 'button';
		chipData.className = 'chip';
		chipData.innerHTML = '<i class="fa-solid fa-building"></i><span class="nama"> Data Bangunan</span>';
		chipData.setAttribute('data-scroll-target', '#judul-data-bangunan');
		navFrag.appendChild(chipData);

		chipHasil = document.createElement('button');
		chipHasil.type = 'button';
		chipHasil.className = 'chip';
		chipHasil.innerHTML = '<i class="fa-solid fa-chart-column"></i><span class="nama"> Hasil</span>';
		chipHasil.setAttribute('data-scroll-target', '#judul-ringkasan');
	}
	Object.entries(penilaian).forEach(([kode, data]) => {
		const section = document.createElement('details');
		section.className = 'pc-parameter';
		section.dataset.param = kode;
		section.open = false;
		const summary = document.createElement('summary');
		summary.className = 'pc-parameter-summary';
		summary.innerHTML = `<span class="kode">${kode}</span><h3>${data.nama}</h3><span class="maks">Maks ${data.maksPoinParameter || 0}</span>`;
		section.appendChild(summary);
		// Tambahkan chip ke navbar
		if (nav) {
			const chip = document.createElement('button');
			chip.type = 'button';
			chip.className = 'chip';
			chip.innerHTML = `<span class="kode">${kode}</span><span class="nama" aria-hidden="true">${data.nama}</span>`;
			chip.setAttribute('data-target-param', kode);
			chip.setAttribute('aria-label', `Ke parameter ${kode} - ${data.nama}`);
			navFrag.appendChild(chip);
		}
		// Lazy container: render isi kriteria saat pertama kali dibuka atau terlihat
		const daftarKriteria = document.createElement('div');
		daftarKriteria.className = 'daftar-kriteria';
		daftarKriteria.setAttribute('data-lazy', 'true');
		section.appendChild(daftarKriteria);
		frag.appendChild(section);
	});
	root.innerHTML = '';
	root.appendChild(frag);
	// Taruh chip Hasil setelah semua parameter (setelah F)
	if (nav && chipHasil) navFrag.appendChild(chipHasil);
	// Render navbar chips sekaligus
	if (nav) { nav.innerHTML = ''; nav.appendChild(navFrag); pasangNavParameter(); }
	// Pasang lazy-hydration untuk setiap parameter
	pasangLazyHydration();
}

function renderIsiParameter(section) {
	if (!section) return;
	const kode = section.dataset.param;
	const kont = section.querySelector('.daftar-kriteria[data-lazy="true"]');
	if (!kont || kont.dataset.hydrated === '1') return;
	const data = penilaian[kode];
	if (!data) return;
	(data.kriteriaUnjukKerja || []).forEach((kriteria, idxK) => {
		const wrapK = document.createElement('div');
		wrapK.className = 'pc-kriteria';
		wrapK.dataset.kriteriaIndex = idxK;
		if (kode === 'F') {
			wrapK.innerHTML = `<h4>${kriteria.nama} <span class="f-elemen-badge f-elemen-s" data-elemen="${idxK + 1}" title="Elemen ${idxK + 1} — Sukarela, faktor pengali: 1.0">Sukarela (faktor pengali: 1.0)</span></h4>${kriteria.penjelasan ? `<p class=\"penjelasan\">${kriteria.penjelasan}</p>` : ''}<div class="pc-indikator"></div>`;
		} else {
			wrapK.innerHTML = `<h4>${kriteria.nama}</h4>${kriteria.penjelasan ? `<p class=\"penjelasan\">${kriteria.penjelasan}</p>` : ''}<div class="pc-indikator"></div>`;
		}
		const kontInd = wrapK.querySelector('.pc-indikator');
		if (kriteria.indikator && typeof kriteria.indikator === 'object') {
			Object.entries(kriteria.indikator).forEach(([judulInd, detailInd], idxInd) => {
				const item = document.createElement('div');
				item.className = 'indikator-item';
				item.dataset.indikatorKey = judulInd;
				const klaimHTML = (kode === 'F')
					? '<div class="meta klaim"><span class="klaim-label">Klaim poin</span><div class="klaim-values"><span class="multiplier" data-claimed-multiplier>x1.0</span><span class="claimed-mult" data-claimed-mult>0.0</span></div></div>'
					: '<div class="meta klaim"><span class="klaim-label">Klaim poin</span><div class="klaim-values"><span class="claimed" data-claimed-base>0</span></div></div>';
				if (detailInd.tipe === 'checkbox') {
					const id = `chk-${kode}-${idxK}-${idxInd}`;
					item.innerHTML = `<div class="ind-left"><label><input type="checkbox" data-tipe="checkbox" data-param="${kode}" data-kriteria="${idxK}" data-indikator="${encodeURIComponent(judulInd)}" id="${id}" /> <span class=\"judul\">${judulInd} <strong>(${detailInd.poin})</strong></span></label></div><div class=\"ind-right\">${klaimHTML}</div>`;
				} else if (detailInd.tipe === 'radio' && detailInd.poin && typeof detailInd.poin === 'object') {
					const grupName = `rad-${kode}-${idxK}-${idxInd}`;
					let radioHTML = `<div class=\"ind-left\"><div class=\"judul\">${judulInd}</div><div class=\"opsi-radio\">`;
					Object.entries(detailInd.poin).forEach(([opsiLabel, poinVal], idxO) => {
						const id = `${grupName}-${idxO}`;
						radioHTML += `<label><input type="radio" name="${grupName}" id="${id}" data-tipe="radio" data-param="${kode}" data-kriteria="${idxK}" data-indikator="${encodeURIComponent(judulInd)}" value="${encodeURIComponent(opsiLabel)}" data-poin="${poinVal}" /> <span>${opsiLabel} <strong>(${poinVal})</strong></span></label>`;
					});
					radioHTML += '</div></div><div class=\"ind-right\">' + klaimHTML + '</div>';
					item.innerHTML = radioHTML;
				}
				kontInd.appendChild(item);
			});
		}
		kont.appendChild(wrapK);
	});
	kont.dataset.hydrated = '1';
	// Segarkan badge, wajib, dan klaim setelah render
	try { perbaruiBadgeElemenF(); } catch (_) {}
	try { tandaiIndikatorWajib(); } catch (_) {}
	try { perbaruiPoinIndikator(); } catch (_) {}
}

function pasangLazyHydration() {
	const sections = Array.from(document.querySelectorAll('.pc-parameter'));
	// Render isi untuk 1-2 parameter pertama saja agar UX cepat
	sections.slice(0, 2).forEach(renderIsiParameter);
	const obs = new IntersectionObserver((entries, o) => {
		entries.forEach(en => {
			if (en.isIntersecting) {
				renderIsiParameter(en.target);
				o.unobserve(en.target);
			}
		});
	}, { rootMargin: '0px 0px 300px 0px', threshold: 0.01 });
	sections.forEach(sec => obs.observe(sec));
	// Render saat dibuka via klik summary
	sections.forEach(sec => {
		const sum = sec.querySelector('summary');
		if (!sum) return;
		sum.addEventListener('click', () => renderIsiParameter(sec), { passive: true });
	});
}

function pasangNavParameter() {
	const nav = document.getElementById('param-nav');
	if (!nav) return;
	const chips = Array.from(nav.querySelectorAll('.chip'));
	const sections = Array.from(document.querySelectorAll('.pc-parameter'));

	// Smooth scroll untuk chip custom
	chips.forEach(c => {
		const t = c.getAttribute('data-scroll-target');
		if (t) {
			c.addEventListener('click', () => {
				const el = document.querySelector(t);
				if (!el) return;
				const appBar = document.querySelector('.app-bar');
				const headerH = appBar ? appBar.getBoundingClientRect().height : 60;
				const y = el.getBoundingClientRect().top + window.scrollY - (headerH + 8);
				window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
			}, { passive: true });
		}
	});

	const keSection = (kode) => sections.find(s => s.dataset.param === kode);
	const setAktif = (kode) => {
		chips.forEach(c => c.setAttribute('aria-current', c.dataset.targetParam === kode ? 'true' : 'false'));
	};
	const tampilkanNama = (kode) => {
		chips.forEach(c => {
			if (c.dataset.targetParam === kode) c.classList.add('tampil-nama'); else c.classList.remove('tampil-nama');
		});
	};
	// Klik chip -> buka jika tertutup lalu scroll halus
	chips.forEach(c => c.addEventListener('click', () => {
		const sec = keSection(c.dataset.targetParam);
		if (sec) {
			// Pastikan details terbuka agar offset tepat dan konten terlihat
			if (sec.tagName === 'DETAILS' && !sec.open) sec.open = true;
			const appBar = document.querySelector('.app-bar');
			const headerH = appBar ? appBar.getBoundingClientRect().height : 78;
			const extraGap = 12; // beri jarak agar judul tidak tertutup
			const offset = headerH + extraGap;
			const y = sec.getBoundingClientRect().top + window.scrollY - offset; // offset app-bar + gap
			window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
			setAktif(sec.dataset.param);
			tampilkanNama(sec.dataset.param);
		}
	}, { passive: true }));

	// Observer untuk sinkron judul aktif saat scroll
	const obs = new IntersectionObserver(entries => {
		// Pilih yang paling nampak di viewport atas
		const terlihat = entries
			.filter(e => e.isIntersecting)
			.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
		if (terlihat[0]) {
			const k = terlihat[0].target.dataset.param;
			setAktif(k);
			// Hanya tampilkan nama untuk yang aktif jika sebelumnya ada yang dipilih
			const adaTampil = chips.some(c => c.classList.contains('tampil-nama'));
			if (adaTampil) tampilkanNama(k);
		}
	}, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
	sections.forEach(s => obs.observe(s));
}

function hitungDariChecklist() {
	let total = 0;
	// Ambil faktor pengali kategori per kriteria (w/d/s) berdasarkan jenis & klasifikasi aktif
	const jenisNow = selectJenis ? selectJenis.value : '';
	const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';
	const faktorKategori = kalkulator.getFaktorPengali(jenisNow, klasNow) || { w: 1, d: 1, s: 1 };
	Object.entries(penilaian).forEach(([kode, dataParam]) => {
		let subtotalParam = 0;
		(dataParam.kriteriaUnjukKerja || []).forEach((kriteria, idxK) => {
			let subtotalK = 0;
			// Untuk Parameter F, tentukan multiplier per elemen berdasarkan kategori (w/d/s)
			let mult = 1;
			if (kode === 'F') {
				const elemenIndex = idxK + 1; // KUK F ke-(idx+1)
				const kat = (stateImplementasi.kategoriElemen && stateImplementasi.kategoriElemen[elemenIndex]) || 's';
				mult = parseFloat(faktorKategori[kat]) || 1;
			}
			// akumulasi sesuai pilihan
			if (stateChecklist[kode] && stateChecklist[kode][idxK]) {
				Object.entries(stateChecklist[kode][idxK]).forEach(([indKey, valPilihan]) => {
					const detailInd = kriteria.indikator[indKey];
					if (!detailInd) return;
					if (detailInd.tipe === 'checkbox') {
						const p = detailInd.poin || 0;
						subtotalK += (kode === 'F') ? (p * mult) : p;
					} else if (detailInd.tipe === 'radio' && detailInd.poin) {
						// valPilihan adalah label opsi
						if (valPilihan in detailInd.poin) {
							const p = detailInd.poin[valPilihan] || 0;
							subtotalK += (kode === 'F') ? (p * mult) : p;
						}
					}
				});
			}
			// batasi dengan maksPoinKUK
			const maksK = kriteria.maksPoinKUK || 0;
			if (subtotalK > maksK) subtotalK = maksK; // tetap hormati batas KUK
			// tampilkan subtotal kriteria (F ditampilkan 1 angka desimal)
			const elSubtotalK = document.querySelector(`[data-subtotal-kriteria="${kode}-${idxK}"]`);
			if (elSubtotalK) {
				const tampil = (kode === 'F') ? (Number.isFinite(subtotalK) ? subtotalK.toFixed(1) : '0.0') : `${subtotalK}`;
				elSubtotalK.textContent = `${tampil} / ${maksK}`;
			}
			subtotalParam += subtotalK;
		});
		// batasi param terhadap maks param
		const maksParam = dataParam.maksPoinParameter || 0;
		if (subtotalParam > maksParam) subtotalParam = maksParam; // tetap hormati batas per parameter
		kalkulator.setNilai(kode, subtotalParam); // reuse existing logic
		total += subtotalParam;
	});
	perbaruiRingkasan(); // panggil ringkasan standar
	perbaruiPoinIndikator(); // sinkronkan tampilan klaim per-indikator
}

function handleChecklistInput(e) {
	const t = e.target;
	if (!t || !(t.matches('input[type=checkbox][data-tipe], input[type=radio][data-tipe]'))) return;
	const kode = t.getAttribute('data-param');
	const idxK = t.getAttribute('data-kriteria');
	const indikatorKey = decodeURIComponent(t.getAttribute('data-indikator'));
	stateChecklist[kode] = stateChecklist[kode] || {};
	stateChecklist[kode][idxK] = stateChecklist[kode][idxK] || {};
	if (t.dataset.tipe === 'checkbox') {
		if (t.checked) stateChecklist[kode][idxK][indikatorKey] = true; else delete stateChecklist[kode][idxK][indikatorKey];
	} else if (t.dataset.tipe === 'radio') {
		// Radio dapat di-uncheck: jika tidak checked, hapus dari state
		if (t.checked) {
			const valLabel = decodeURIComponent(t.value);
			stateChecklist[kode][idxK][indikatorKey] = valLabel;
		} else {
			delete stateChecklist[kode][idxK][indikatorKey];
		}
	}
	// cleanup kosong
	Object.keys(stateChecklist[kode][idxK]).length === 0 && delete stateChecklist[kode][idxK];
	if (Object.keys(stateChecklist[kode]).length === 0) delete stateChecklist[kode];
	hitungDariChecklist();
	simpanLocal(false); // autosave
}

function pasangChecklistListeners() {
	const root = document.getElementById('parameter-checklist');
	if (!root) return;
	root.addEventListener('change', handleChecklistInput, { passive: true });
	// Izinkan radio bisa di-uncheck dengan klik ulang (termasuk klik pada label/span)
	root.addEventListener('mousedown', (e) => {
		let tgt = e.target;
		if (!tgt) return;
		let inp = null;
		if (tgt.matches && tgt.matches('input[type=radio][data-tipe]')) {
			inp = tgt;
		} else {
			const lbl = tgt.closest && tgt.closest('label');
			if (lbl) inp = lbl.querySelector('input[type=radio][data-tipe]');
		}
		if (inp) {
			inp.dataset.wasChecked = inp.checked ? '1' : '0';
		}
	}, true);
	root.addEventListener('click', (e) => {
		let tgt = e.target;
		if (!tgt) return;
		let inp = null;
		if (tgt.matches && tgt.matches('input[type=radio][data-tipe]')) {
			inp = tgt;
		} else {
			const lbl = tgt.closest && tgt.closest('label');
			if (lbl) inp = lbl.querySelector('input[type=radio][data-tipe]');
		}
		if (inp && inp.dataset.wasChecked === '1') {
			// toggle off sebelum default browser menandai kembali
			e.preventDefault();
			inp.checked = false;
			inp.dispatchEvent(new Event('change', { bubbles: true }));
		}
		if (inp) delete inp.dataset.wasChecked;
	}, true);
	// Dukungan keyboard: Space/Enter untuk uncheck jika sudah terpilih
	root.addEventListener('keydown', (e) => {
		const t = e.target;
		if (!t || !t.matches('input[type=radio][data-tipe]')) return;
		const key = e.key || e.code;
		if (t.checked && (key === ' ' || key === 'Spacebar' || key === 'Space' || key === 'Enter')) {
			e.preventDefault();
			t.checked = false;
			t.dispatchEvent(new Event('change', { bubbles: true }));
		}
	});
}

// Perbarui tampilan poin yang diklaim pada setiap indikator; untuk Parameter F tampilkan kolom tambahan hasil pengali
function perbaruiPoinIndikator() {
	const jenisNow = selectJenis ? selectJenis.value : '';
	const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';
	const faktorKategori = kalkulator.getFaktorPengali(jenisNow, klasNow) || { w: 1, d: 1, s: 1 };
	document.querySelectorAll('.pc-parameter').forEach(section => {
		const kode = section.getAttribute('data-param');
		const dataParam = penilaian[kode];
		if (!dataParam) return;
		section.querySelectorAll('.pc-kriteria').forEach(wrapK => {
			const idxK = parseInt(wrapK.getAttribute('data-kriteria-index'), 10);
			const kriteria = (dataParam.kriteriaUnjukKerja || [])[idxK];
			if (!kriteria) return;
			const elemenIndex = idxK + 1;
			const kat = (kode === 'F') ? ((stateImplementasi.kategoriElemen && stateImplementasi.kategoriElemen[elemenIndex]) || 's') : null;
			const mult = (kode === 'F') ? (parseFloat(faktorKategori[kat]) || 1) : 1;
			wrapK.querySelectorAll('.indikator-item').forEach(item => {
				const key = item.dataset.indikatorKey;
				const detail = kriteria.indikator[key];
				if (!detail) return;
				let base = 0;
				if (detail.tipe === 'checkbox') {
					const inp = item.querySelector('input[type=checkbox]');
					if (inp && inp.checked) base = detail.poin || 0;
				} else if (detail.tipe === 'radio') {
					const sel = item.querySelector('input[type=radio][data-tipe]:checked');
					if (sel) {
						const valLabel = decodeURIComponent(sel.value);
						base = (detail.poin && (valLabel in detail.poin)) ? (detail.poin[valLabel] || 0) : 0;
					}
				}
				const elBase = item.querySelector('[data-claimed-base]');
				if (elBase) elBase.textContent = base;
				if (kode === 'F') {
					const elMulBadge = item.querySelector('[data-claimed-multiplier]');
					const elMult = item.querySelector('[data-claimed-mult]');
					if (elMulBadge) elMulBadge.textContent = `x${(Number.isFinite(mult) ? mult : 1).toFixed(1)}`;
					if (elMult) {
						const nilai = base * mult;
						elMult.textContent = Number.isFinite(nilai) ? nilai.toFixed(1) : '0.0';
					}
				}
			});
		});
	});
}

// Tandai input indikator sebagai required jika kriteria/elemen berstatus Wajib (khusus Parameter F)
function tandaiIndikatorWajib() {
	const jenisNow = selectJenis ? selectJenis.value : '';
	const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';
	// Jika belum ada pilihan jenis/klas, bersihkan semua tanda wajib dan keluar
	const allItems = document.querySelectorAll('.pc-parameter .pc-kriteria .indikator-item');
	const bersihkanItem = (item) => {
		// Hapus required di semua input dalam indikator
		item.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(inp => inp.removeAttribute('required'));
		// Hapus tanda asterisk di judul (untuk label.checkbox atau div.judul radio)
		const judulSpan = item.querySelector('label > .judul, .judul');
		if (judulSpan) {
			judulSpan.classList.remove('is-required');
			const star = judulSpan.querySelector('.asterisk');
			if (star) star.remove();
		}
	};
	if (!jenisNow || !klasNow) { allItems.forEach(bersihkanItem); return; }

	// Proses tiap parameter dan kriteria
	document.querySelectorAll('.pc-parameter').forEach(section => {
		const kode = section.getAttribute('data-param');
		// Saat ini kewajiban mengikuti elemen W/D/S pada Parameter F saja
		section.querySelectorAll('.pc-kriteria').forEach(wrapK => {
			const idxK = parseInt(wrapK.getAttribute('data-kriteria-index'), 10);
			const elemenIndex = idxK + 1;
			let wajib = false;
			if (kode === 'F') {
				const kat = (stateImplementasi.kategoriElemen && stateImplementasi.kategoriElemen[elemenIndex]) || 's';
				wajib = (kat === 'w');
			}
			wrapK.querySelectorAll('.indikator-item').forEach(item => {
				if (!wajib) { bersihkanItem(item); return; }
				// Tambahkan required untuk input dalam indikator ini
				item.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(inp => {
					inp.setAttribute('required', '');
				});
				// Tambahkan asterisk ke judul indikator
				const judulSpan = item.querySelector('label > .judul, .judul');
				if (judulSpan && !judulSpan.querySelector('.asterisk')) {
					const bintang = document.createElement('span');
					bintang.className = 'asterisk';
					bintang.textContent = ' *';
					judulSpan.appendChild(bintang);
					judulSpan.classList.add('is-required');
				}
			});
		});
	});
}

function muatStateChecklist(obj) {
	if (!obj || !obj.checklist) return;
	stateChecklist = obj.checklist;
	// tandai input sesuai state
	Object.entries(stateChecklist).forEach(([kode, mapK]) => {
		Object.entries(mapK).forEach(([idxK, indikatorMap]) => {
			Object.entries(indikatorMap).forEach(([indikatorKey, val]) => {
				// cari element
				const sel = `[data-param="${kode}"][data-kriteria="${idxK}"][data-indikator="${encodeURIComponent(indikatorKey)}"]`;
				if (typeof val === 'boolean') {
					const inp = document.querySelector(`input[type=checkbox]${sel}`);
					if (inp) inp.checked = true;
				} else {
					// radio: value label ada di value attr ter-encode
					const inp = document.querySelector(`input[type=radio]${sel}[value="${encodeURIComponent(val)}"]`);
					if (inp) inp.checked = true;
				}
			});
		});
	});
	setTimeout(() => hitungDariChecklist(), 0);
}

function gunakanModeGridParameter() { /* dinonaktifkan */ }

// --- Perhitungan ---
function sinkronKeObjekKalkulator() { /* tidak digunakan lagi */ }

function perbaruiRingkasan() {
	sinkronKeObjekKalkulator();
	const total = kalkulator.hitungTotal();
	const maks = kalkulator.getTotalMaks();
	// Tampilkan total dengan 1 angka di belakang koma karena mengandung hasil perkalian (F)
	totalSkorEl.textContent = Number.isFinite(total) ? total.toFixed(1) : '0.0';
	totalMaksEl.textContent = maks;
	const persen = maks > 0 ? (total / maks * 100) : 0;
	persentaseEl.textContent = formatPersentase(persen);
	progressEl.value = clamp(persen, 0, 100);
	progressEl.setAttribute('aria-valuenow', progressEl.value);
	// klasifikasi
	if (klasifikasiEl) {
		const { level, label } = tentukanKlasifikasi(persen);
		klasifikasiEl.textContent = label;
		klasifikasiEl.dataset.level = level;
		klasifikasiEl.className = `badge-klasifikasi ${kelasBadge(level)}`;
	}
}

function tentukanKlasifikasi(persen) {
	// Threshold dapat disesuaikan; asumsi:
	// Utama >= 80, Madya >= 60, Pratama >= 40, lain: Belum Terkualifikasi
	if (persen >= 80) return { level: 'utama', label: 'Utama' };
	if (persen >= 60) return { level: 'madya', label: 'Madya' };
	if (persen >= 40) return { level: 'pratama', label: 'Pratama' };
	return { level: 'belum', label: 'Belum' };
}
function kelasBadge(level) {
	switch (level) {
		case 'utama': return 'badge-utamanya';
		case 'madya': return 'badge-madya';
		case 'pratama': return 'badge-pratama';
		default: return 'badge-belum';
	}
}

// --- Penyimpanan Lokal ---
function simpanLocal(manual = false) {
	try {
		if (modeAktif !== MODE_CHECKLIST) sinkronKeObjekKalkulator();
		// Kumpulkan parameter yang sedang terbuka
		const terbuka = Array.from(document.querySelectorAll('.pc-parameter[open]')).map(s => s.dataset.param);
		const data = {
			versi: 4,
			diperbarui: new Date().toISOString(),
			nilai: kalkulator.getSemuaNilai(),
			checklist: stateChecklist,
			mode: modeAktif,
			openParams: terbuka,
			bangunan: {
				jenis: selectJenis ? selectJenis.value : '',
				klasifikasi: selectKlasifikasi ? selectKlasifikasi.value : ''
			},
			implementasi: stateImplementasi
		};
		autosave(data, manual); // jika manual true -> langsung flush
		if (manual) notifikasi('Disimpan');
	} catch (e) {
		console.error('[simpanLocal] Gagal:', e);
		notifikasi('Gagal Simpan');
	}
}

function muatLocal() {
	try {
		const obj = muatDataTersimpan();
		if (!obj || typeof obj !== 'object') return;
		Object.keys(obj.nilai || {}).forEach(k => {
			const input = document.getElementById(`skor-${k}`);
			if (input) {
				const maks = parseFloat(input.max) || 0;
				// Clamp agar tidak melebihi batas baru jika dataset berubah
				const val = clamp(parseFloat(obj.nilai[k]) || 0, 0, maks);
				input.value = val;
			}
		});
		muatDataBangunan(obj.bangunan);
		// Set juga ke objek kalkulator
		kalkulator.nilaiParameter = { ...(obj.nilai || {}) };
		if (obj.mode === MODE_CHECKLIST) {
			gunakanModeChecklist(true);
			// render sudah jalan, muat state checklist setelah rAF agar elemen tersedia
			requestAnimationFrame(() => {
				muatStateChecklist(obj);
				// Buka kembali parameter yang tersimpan
				if (Array.isArray(obj.openParams)) {
					obj.openParams.forEach(k => {
						const det = document.querySelector(`.pc-parameter[data-param="${k}"]`);
						if (det && det.tagName === 'DETAILS') det.open = true;
					});
				}
			});
		}
		if (obj.implementasi) {
			stateImplementasi = obj.implementasi;
			// tandai centang implementasi setelah render (ditunda rAF)
			requestAnimationFrame(() => terapkanStateImplementasi());
		}
		perbaruiRingkasan();
		notifikasi('Dimuat');
	} catch (e) {
		console.error('Gagal muat data:', e);
		notifikasi('Gagal muat');
	}
}

function hapusLocal() { try { hapusDataTersimpan(); } catch (e) { console.error('[hapusLocal]', e); } }

// --- Notifikasi ringan (tanpa library) ---
let timerNotifikasi;
function notifikasi(pesan) {
	let ele = document.getElementById('toast');
	if (!ele) {
		ele = document.createElement('div');
		ele.id = 'toast';
		ele.setAttribute('role', 'status');
		ele.setAttribute('aria-live', 'polite');
	ele.style.cssText = 'position:fixed;right:max(1rem, env(safe-area-inset-right));top:calc(.6rem + env(safe-area-inset-top));background:#ffffff;color:#0f172a;padding:.6rem .8rem;font-size:.8rem;font-weight:600;border-radius:10px;letter-spacing:.3px;border:1px solid #e2e8f0;box-shadow:0 6px 18px rgba(16,24,40,.16);z-index:999;opacity:0;transition:.35s cubic-bezier(.4,0,.2,1);pointer-events:none;transform:translate(8px, -8px)';
		document.body.appendChild(ele);
	}
	ele.textContent = pesan;
	requestAnimationFrame(() => {
	ele.style.opacity = '1';
	ele.style.transform = 'translate(0, 0)';
	});
	clearTimeout(timerNotifikasi);
	timerNotifikasi = setTimeout(() => {
		ele.style.opacity = '0';
	ele.style.transform = 'translate(8px, -8px)';
	}, 1800);
}

// --- Debounce Input ---
let tDebounce;
function debounceUpdate() {
	clearTimeout(tDebounce);
	tDebounce = setTimeout(() => {
		perbaruiRingkasan();
		simpanLocal(false);
	}, 280);
}

// --- Validasi Input (batas min/max) ---
function pasangValidasiInput() { /* tidak diperlukan */ }

// Touch handlers untuk efek sentuh
function pasangTouchHandlers() {
	const tombol = document.querySelectorAll('.btn');
	tombol.forEach(btn => {
		btn.addEventListener('touchstart', () => btn.classList.add('sentuh-aktif'), { passive: true });
		['touchend', 'touchcancel'].forEach(ev => btn.addEventListener(ev, () => btn.classList.remove('sentuh-aktif'), { passive: true }));
	});
}

// --- Handler Tombol ---
function pasangAksiTombol() {
	if (btnSimpan) btnSimpan.addEventListener('click', () => simpanLocal(true));
	if (btnMuat) btnMuat.addEventListener('click', () => muatLocal());
	if (btnReset) btnReset.addEventListener('click', () => {
		if (confirm('Hapus semua input dan data tersimpan?')) {
			resetSemua();
			notifikasi('Direset');
		}
	});
	if (btnHitung && !btnHitung.dataset.listener) {
		btnHitung.addEventListener('click', () => { hitungDariChecklist(); notifikasi('Dihitung'); });
		btnHitung.dataset.listener = '1';
	}
}

function resetSemua() {
	try { hapusLocal(); } catch (_) { }
	stateChecklist = {};
	if (kalkulator) kalkulator.nilaiParameter = {};
	document.querySelectorAll('#parameter-checklist input[type=checkbox], #parameter-checklist input[type=radio]').forEach(inp => { inp.checked = false; });
	// tidak ada subtotal lagi di UI
	if (totalSkorEl) totalSkorEl.textContent = '0';
	if (totalMaksEl) totalMaksEl.textContent = kalkulator ? kalkulator.getTotalMaks() : '0';
	if (persentaseEl) persentaseEl.textContent = '0%';
	if (progressEl) { progressEl.value = 0; progressEl.setAttribute('aria-valuenow', '0'); }
	if (klasifikasiEl) { klasifikasiEl.textContent = '-'; klasifikasiEl.dataset.level = '-'; klasifikasiEl.className = 'badge-klasifikasi badge-belum'; }
	// reset implementasi global
	stateImplementasi = { catatanGlobal: {}, kategoriElemen: {} };
	const implSection = document.getElementById('implementasi-section');
	if (implSection) implSection.hidden = true;
	const catWrap = document.getElementById('catatan-global-wrapper');
	if (catWrap) {
		catWrap.querySelectorAll('input[type=checkbox][data-catatan-global]').forEach(cb => cb.checked = false);
		// hapus badge F jika ada
		const paramF = document.querySelector('.pc-parameter[data-param="F"]');
		if (paramF) { const lama = paramF.querySelector('#f-elemen-kategori-wrapper'); if (lama) lama.remove(); }
		catWrap.hidden = true;
	}
}

// --- Inisialisasi ---
let kalkulator; // instance global dalam closure
function init() {
	if (typeof penilaian !== 'object') {
		console.warn('Objek penilaian tidak ditemukan (tabel.js belum dimuat?)');
		return;
	}
	kalkulator = new KalkulatorBGC(penilaian);
	// Hapus referensi grid lama sepenuhnya
	gunakanModeChecklist(true);
	pasangChecklistListeners();
	pastikanJenisTerisi();
	pasangHandlerBangunan();
	// Render implementasi awal jika sudah ada pilihan
	renderImplementasi();
	pasangValidasiInput();
	pasangAksiTombol();
	pasangTouchHandlers();
	// Muat otomatis jika ada
	muatLocal();
	perbaruiRingkasan();
	if (versiEl) versiEl.textContent = '1.2.0';
	console.info('[init] selesai');
}

// =====================================
// MOBILE UX IMPROVEMENT FUNGSI TAMBAHAN
// =====================================
function setupPreventZoom() {
	// Pastikan meta viewport ada & modifiable
	let meta = document.querySelector('meta[name=viewport]');
	if (!meta) {
		meta = document.createElement('meta');
		meta.name = 'viewport';
		document.head.appendChild(meta);
	}
	const kontenNormal = 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover';
	const kontenFocus = 'width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover';
	meta.setAttribute('content', kontenNormal);
	const isFormTarget = (t) => t && t.nodeType === 1 && typeof t.matches === 'function' && t.matches('input,select,textarea');
	const handlerFocus = (e) => {
		const t = e && e.target;
		if (isFormTarget(t)) {
			// Pastikan font-size cukup (>=16px sudah di CSS)
			meta.setAttribute('content', kontenFocus);
		}
	};
	const handlerBlur = (e) => {
		const t = e && e.target;
		if (isFormTarget(t)) {
			// Kembalikan (sedikit delay untuk menghindari flicker)
			setTimeout(() => meta.setAttribute('content', kontenNormal), 150);
		}
	};
	document.addEventListener('focus', handlerFocus, true);
	document.addEventListener('blur', handlerBlur, true);
}

function scrollKeInputSaatFokus() {
	const gerakHalus = buatThrottle((ele) => {
		try {
			ele.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
		} catch (_) { }
	}, 350);
	document.addEventListener('focus', (e) => {
		const target = e.target;
		if (target && target.matches('input[type=number], input, select, textarea')) {
			// Buka details jika ada
			const det = target.closest('details');
			if (det && !det.open) det.open = true;
			// Delay sedikit agar keyboard muncul dulu (khusus mobile)
			setTimeout(() => gerakHalus(target), 180);
		}
	}, true);
}

function optimisasiPerforma() {
	// Bungkus perbaruiRingkasan dalam rAF agar tidak flooding layout
	const asli = perbaruiRingkasan;
	let dijadwalkan = false;
	window.perbaruiRingkasan = function () {
		if (dijadwalkan) return;
		dijadwalkan = true;
		requestAnimationFrame(() => { asli(); dijadwalkan = false; });
	};
}

function optimisasiMobileInit() {
	setupPreventZoom();
	scrollKeInputSaatFokus();
	optimisasiPerforma();
}

// Lite mode detection (Save-Data / 2G / reduced motion)
function aktifkanLiteModeJikaPerlu() {
	const nav = navigator || {};
	const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
	const saveData = !!(conn && conn.saveData);
	const is2G = !!(conn && /2g/i.test(conn.effectiveType || ''));
	const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (saveData || is2G || prefersReducedMotion) {
		document.documentElement.setAttribute('data-lite', 'true');
		try { window.__LITE_MODE__ = true; } catch (_) {}
	// Disable remote font CSS to save bandwidth
	const linkFonts = document.getElementById('fonts-css');
	if (linkFonts) linkFonts.disabled = true;
	}
}

// Idle helper with fallback
const ric = window.requestIdleCallback || function (fn) { return setTimeout(() => fn({ timeRemaining: () => 1, didTimeout: false }), 1); };
const cRic = window.cancelIdleCallback || function (id) { clearTimeout(id); };

// Chunked hydration using idle time
function jadwalkanHydrationRingan() {
	const sections = Array.from(document.querySelectorAll('.pc-parameter'));
	let i = 2; // dua pertama sudah di-render awal
	function step(deadline) {
		while (i < sections.length && deadline.timeRemaining() > 4) {
			renderIsiParameter(sections[i]);
			i++;
		}
		if (i < sections.length) ric(step);
	}
	ric(step);
}

// =============================
// TEMA TERANG / GELAP MANUAL
// =============================
function muatTemaAwal() {
	try {
		const simpan = localStorage.getItem(KUNCI_TEMA);
		let prefer = simpan;
		if (!prefer) {
			const mq = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
			prefer = mq ? 'gelap' : 'terang';
		}
		terapkanTema(prefer, false);
	} catch (_) { terapkanTema('terang', false); }
}
function terapkanTema(mode, simpan = true) {
	const root = document.documentElement;
	const metaTheme = document.querySelector('meta[name="theme-color"]');
	if (mode === 'gelap') {
		root.setAttribute('data-tema', 'gelap');
		if (tombolTema) { tombolTema.textContent = '\u2600\ufe0f'; tombolTema.setAttribute('aria-label', 'Tema terang'); tombolTema.setAttribute('aria-pressed', 'true'); }
		if (metaTheme) metaTheme.setAttribute('content', '#0b1220');
	} else {
		root.removeAttribute('data-tema');
		if (tombolTema) { tombolTema.textContent = '\ud83c\udf19'; tombolTema.setAttribute('aria-label', 'Tema gelap'); tombolTema.setAttribute('aria-pressed', 'false'); }
		if (metaTheme) metaTheme.setAttribute('content', '#ffffff');
	}
	if (simpan) { try { localStorage.setItem(KUNCI_TEMA, mode); } catch (_) { } }
}
function pasangToggleTema() {
	if (!tombolTema) return;
	tombolTema.addEventListener('click', () => {
		const sekarangGelap = document.documentElement.getAttribute('data-tema') === 'gelap';
		terapkanTema(sekarangGelap ? 'terang' : 'gelap');
	}, { passive: true });
}

// Patch init agar memanggil optimisasiMobileInit + tema
const initAsli = init;
document.addEventListener('DOMContentLoaded', () => {
	initAsli();
	optimisasiMobileInit();
	aktifkanLiteModeJikaPerlu();
	muatTemaAwal();
	pasangToggleTema();
	// Set CSS var --appbar-h agar konten tidak tertutup header fixed
	try {
		const ab = document.querySelector('.app-bar');
		if (ab) {
			const h = Math.round(ab.getBoundingClientRect().height);
			document.documentElement.style.setProperty('--appbar-h', h + 'px');
		}
	} catch (_) {}
	// Daftarkan Service Worker untuk offline-first
	if ('serviceWorker' in navigator) {
		try {
			navigator.serviceWorker.register('./sw.js');
			console.info('[SW] registered');
		} catch (e) { console.warn('[SW] gagal daftar', e); }
	}
	// Jika jenis belum terisi pada akhir siklus init + optimisasi, coba sekali lagi eksplisit
	if (!sudahIsiJenis) {
		console.info('[DOMContentLoaded] retry isiJenisBangunan langsung');
		isiJenisBangunan();
	}
	// Jadwalkan hydration bertahap untuk sisanya (mengurangi puncak CPU)
	try { jadwalkanHydrationRingan(); } catch (_) {}
}, { once: true });

