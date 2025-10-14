

const KUNCI_DATA = 'bgc_data_v4';
const KUNCI_WAKTU = 'bgc_waktu_v4';
const KUNCI_CHUNK_META = 'bgc_chunk_meta_v4';
const ELEM_IMPLEMENTASI = 16;

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
		const arr = [];
		for (let i = 0; i < meta.jumlah; i++) {
			const part = storageGet(`${prefix}_part_${i}`);
			if (part == null) return null;
			arr.push(part);
		}
		return JSON.parse(arr.join(''));
	} catch (e) { console.error('[muatChunked] gagal', e); return null; }
}

let stateChecklist = {};

(function createApp() {
	const initialState = {
		versi: 5,
		diperbarui: '',
		mode: 'checklist',
		openParams: [],
		bangunan: { jenis: '', klasifikasi: '' },
		checklist: {},
		implementasi: { catatanGlobal: {}, kategoriElemen: {} }
	};

	let state = (() => {
		try {
			const loaded = muatChunked(KUNCI_DATA);
			if (loaded && typeof loaded === 'object') return { ...initialState, ...loaded };
		} catch (_) { }
		return { ...initialState };
	})();

	stateChecklist = state.checklist || {};
	stateImplementasi = state.implementasi || { catatanGlobal: {}, kategoriElemen: {} };

	function buildPersistable(next) {
		const terbuka = Array.from(document.querySelectorAll('.pc-parameter[open]')).map(s => s.dataset.param);
		return { ...next, versi: 5, diperbarui: new Date().toISOString(), openParams: terbuka };
	}

	function save(next, immediate = false) {
		const data = buildPersistable(next);
		autosave(data, immediate);
		try { storageSet(KUNCI_WAKTU, Date.now().toString()); } catch (_) { }
	}

	function render(next) {
		stateChecklist = next.checklist || {};
		stateImplementasi = next.implementasi || { catatanGlobal: {}, kategoriElemen: {} };

		if (selectJenis) selectJenis.value = next.bangunan?.jenis || '';
		if (selectKlasifikasi) selectKlasifikasi.value = next.bangunan?.klasifikasi || '';

		try {
			if (!sudahIsiJenis) isiJenisBangunan();
			if (sudahIsiJenis && next.bangunan?.jenis) {
				isiKlasifikasi(next.bangunan.jenis);
				const rbJ = jenisGroup && jenisGroup.querySelector(`input[type=radio][name='__jenis_rb'][value="${escCSS(next.bangunan.jenis)}"]`);
				if (rbJ) rbJ.checked = true;
				if (next.bangunan.klasifikasi) {
					const rbK = klasGroup && klasGroup.querySelector(`input[type=radio][name='__klas_rb'][value="${escCSS(next.bangunan.klasifikasi)}"]`);
					if (rbK) rbK.checked = true;
				}
			}
		} catch (_) { }

		try { renderImplementasi(); } catch (_) { }
		try { muatStateChecklist({ checklist: next.checklist }); } catch (_) { }
		try { tandaiIndikatorWajib(); } catch (_) { }
		try { perbaruiPoinIndikator(); } catch (_) { }
		try { perbaruiRingkasan(); } catch (_) { }
		try { perbaruiJudulHalaman(); } catch (_) { }

		// Jika Mode Ringkas aktif saat render, terapkan filter tanpa membuka section tertutup
		try {
			if (next && next.modeRingkas) {
				const root = document.getElementById('parameter-checklist');
				if (root) {
					root.classList.add('ringkas-aktif');
					// Hydrate semua section tanpa mengubah open
					const terbukaMap = new Map();
					Array.from(document.querySelectorAll('.pc-parameter')).forEach(sec => {
						terbukaMap.set(sec, !!sec.open);
						renderIsiParameter(sec);
					});
					terbukaMap.forEach((wasOpen, sec) => { try { sec.open = wasOpen; } catch(_){} });
					// Terapkan kelas pada indikator
					Array.from(root.querySelectorAll('.pc-parameter')).forEach(sec => {
						const kode = sec.getAttribute('data-param');
						const data = penilaian[kode];
						if (!data) return;
						sec.querySelectorAll('.pc-kriteria').forEach((wrapK, idxK) => {
							const kriteria = (data.kriteriaUnjukKerja || [])[idxK];
							if (!kriteria) return;
							wrapK.querySelectorAll('.indikator-item').forEach(item => {
								const key = item.dataset.indikatorKey;
								const detail = kriteria.indikator[key];
								let terisi = false;
								if (detail && detail.tipe === 'checkbox') {
									const inp = item.querySelector('input[type=checkbox]');
									terisi = !!(inp && inp.checked);
								} else if (detail && detail.tipe === 'radio') {
									terisi = !!item.querySelector('input[type=radio]:checked');
								}
								if (terisi) item.classList.add('sembunyi-ringkas'); else item.classList.remove('sembunyi-ringkas');
							});
						});
					});
				}
			}
		} catch (_) {}
	}

	function setState(update, immediate = false) {
		const patch = (typeof update === 'function') ? update(state) : update;
		const next = { ...state, ...(patch || {}) };
		if (patch && patch.checklist) next.checklist = patch.checklist;
		if (patch && patch.implementasi) next.implementasi = patch.implementasi;
		if (patch && patch.bangunan) next.bangunan = patch.bangunan;
		state = next;
		save(state, immediate);
		render(state);
	}

	App = { get state() { return state; }, setState, save: (s, imm) => save(s ?? state, imm), render: (s) => render(s ?? state) };
})();

function parseImplementasiString(str, jenis) {
	if (!str || typeof str !== 'string') return [];
	const hasil = [];
	let i = 0; let elemen = 1;
	while (i < str.length && elemen <= ELEM_IMPLEMENTASI) {
		const huruf = str[i];
		if (!/[wds]/i.test(huruf)) { i++; continue; }
		i++;
		let digits = '';
		while (i < str.length && /[0-9]/.test(str[i])) { digits += str[i]; i++; }
		let catatan = digits.split('').filter(Boolean).map(n => parseInt(n, 10));
		// Khusus BGN: abaikan catatan implementasi nomor 3 (tidak digunakan)
		if ((jenis || selectJenis?.value) === 'BGN') {
			catatan = catatan.filter(no => no !== 3);
		}
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
	const parsed = parseImplementasiString(entry.implementasi, selectJenis ? selectJenis.value : undefined);

	parsed.forEach(p => { stateImplementasi.kategoriElemen[p.index] = p.kategori; });
	const daftarCatatan = buildCatatanGlobalList(parsed);
	if (!daftarCatatan.length) { wrap.hidden = true; list.innerHTML = ''; return; }
	wrap.hidden = false;
	list.innerHTML = daftarCatatan.map(c => {
		const id = `cat-global-${c.no}`;
		const cek = stateImplementasi.catatanGlobal[c.no] ? 'checked' : '';
		return `<label><input type="checkbox" id="${id}" data-catatan-global="${c.no}" ${cek}/> <span class="no">${c.no}.</span> <span class="teks">${c.teks}</span></label>`;
	}).join('');

	degradasiKategori(parsed);
}

function degradasiKategori(parsed) {
	parsed.forEach(p => {
		if (!p.catatan.length) return;
		const semua = p.catatan.every(no => !!stateImplementasi.catatanGlobal[no]);
		stateImplementasi.kategoriElemen[p.index] = semua ? p.kategori : 's';
	});
}

function resetDanIsiCatatanGlobalRelevant() {
	const entry = getEntryImplementasi();
	if (!entry || !entry.implementasi) {
		stateImplementasi.catatanGlobal = {};
		stateImplementasi.kategoriElemen = {};
		return;
	}

	const parsed = parseImplementasiString(entry.implementasi, selectJenis ? selectJenis.value : undefined);
	const daftarRelevant = buildCatatanGlobalList(parsed);

	const catatanBaru = {};
	daftarRelevant.forEach(c => {
		catatanBaru[c.no] = (stateImplementasi.catatanGlobal && stateImplementasi.catatanGlobal[c.no]) || false;
	});

	stateImplementasi.catatanGlobal = catatanBaru;

	parsed.forEach(p => {
		stateImplementasi.kategoriElemen[p.index] = p.kategori;
	});
}

function renderImplementasi() {
	resetDanIsiCatatanGlobalRelevant();
	renderCatatanGlobal();
	perbaruiBadgeElemenF();
	try {
		const implSec = document.getElementById('implementasi-section');
		const entry = getEntryImplementasi();
		if (implSec) {
			let tampil = false;
			if (entry && entry.implementasi) {
				try {
					const parsed = parseImplementasiString(entry.implementasi, selectJenis ? selectJenis.value : undefined);
					const daftarCatatan = buildCatatanGlobalList(parsed);
					tampil = Array.isArray(daftarCatatan) && daftarCatatan.length > 0;
				} catch (_) { tampil = false; }
			}
			implSec.hidden = !tampil;
		}
	} catch (_) { }
}

function perbaruiBadgeElemenF() {
	const paramF = document.querySelector('.pc-parameter[data-param="F"]');
	if (!paramF) return;
	const entry = getEntryImplementasi();
	if (!entry || !entry.implementasi) {
		paramF.querySelectorAll('.pc-kriteria [data-elemen]').forEach(b => { b.classList.remove('f-elemen-w', 'f-elemen-d'); b.classList.add('f-elemen-s'); b.textContent = 'Sukarela (faktor pengali: 1.0)'; b.setAttribute('title', 'Elemen – Sukarela, faktor pengali: 1.0'); });
		return;
	}
	const parsed = parseImplementasiString(entry.implementasi, selectJenis ? selectJenis.value : undefined);

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
		el.setAttribute('title', `Elemen ${p.index} – ${labelKategori[kat]}. Faktor pengali ${f} (berdasarkan klasifikasi bangunan). Wajib harus terpenuhi untuk kelayakan peringkat. Sumber: Matriks Implementasi & faktor pengali internal.`);
	});
}

document.addEventListener('change', (e) => {
	const t = e.target;
	if (!t || !t.matches('input[type=checkbox][data-catatan-global]')) return;
	const no = t.getAttribute('data-catatan-global');
	const nextImpl = {
		...(App.state.implementasi || {}),
		catatanGlobal: { ...(App.state.implementasi?.catatanGlobal || {}), [no]: !!t.checked }
	};
	App.setState({ implementasi: nextImpl });
}, { passive: true });
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

let jadwalFlush = null;
function autosave(dataObj, paksa = false) {

	try {
		window.__cacheTerakhirBGC = dataObj;
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
	}, 400);
}


function hapusDataTersimpan() {
	hapusChunked(KUNCI_DATA);
	storageRemove(KUNCI_WAKTU);
}

const totalSkorEl = document.getElementById('total-skor');
const totalMaksEl = document.getElementById('total-maks');
const persentaseEl = document.getElementById('persentase');
const progressEl = document.getElementById('progress-total');
// Sticky rekap elements
const rekapSticky = document.getElementById('rekap-sticky');
const rekapTotalSkorEl = document.getElementById('rekap-total-skor');
const rekapTotalMaksEl = document.getElementById('rekap-total-maks');
const rekapPersenEl = document.getElementById('rekap-persentase');
const rekapProgressEl = document.getElementById('rekap-progress');
const peringkatEl = document.getElementById('klasifikasi-level');
const form = document.getElementById('form-penilaian');
const btnHitung = document.getElementById('btn-hitung');
// Mode Ringkas control: prefer header button, fallback to legacy sidebar chip
let btnRingkas = document.getElementById('btn-ringkas') || document.getElementById('chip-ringkas');
// Tombol & menu ekspor dibuat let supaya bisa dire-assign setelah cloning
let btnEkspor = document.getElementById('btn-ekspor');
let menuEkspor = document.getElementById('menu-ekspor');
const btnImpor = document.getElementById('btn-impor');
const fileImpor = document.getElementById('file-impor');
const btnReset = document.getElementById('btn-reset');
const selectJenis = document.getElementById('jenis-bangunan');
const selectKlasifikasi = document.getElementById('klasifikasi-bangunan');
const versiEl = document.getElementById('versi-aplikasi');
// Ganti: tombol tema berada di sidebar sebagai chip dengan id #chip-tema
const tombolTema = document.getElementById('chip-tema');
const KUNCI_TEMA = 'bgc_tema';

function perbaruiJudulHalaman() {
	const base = 'Kalkulator Penilaian Kinerja Bangunan Gedung Cerdas (BGC) – Tahap Pemanfaatan';
	try {
		const j = (selectJenis && selectJenis.value) ? selectJenis.value : (App && App.state && App.state.bangunan && App.state.bangunan.jenis) ? App.state.bangunan.jenis : '';
		const k = (selectKlasifikasi && selectKlasifikasi.value) ? selectKlasifikasi.value : (App && App.state && App.state.bangunan && App.state.bangunan.klasifikasi) ? App.state.bangunan.klasifikasi : '';
		let suffix = '';
		if (j) suffix += ` — ${j}`;
		if (k) suffix += (j ? ' / ' : ' — ') + k;
		document.title = base + suffix;
	} catch (_) { document.title = base; }
}

const tahunEl = document.getElementById('tahun');
if (tahunEl) tahunEl.textContent = new Date().getFullYear();

class KalkulatorBGC {
	constructor(dataPenilaian) {
		this.dataPenilaian = dataPenilaian || {};

		this.nilaiParameter = {};
		this.modeRingkas = false; // Added modeRingkas property
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
		const bersih = parseFloat(nilaiBaru);
		const final = isNaN(bersih) ? 0 : KalkulatorBGC.clamp(bersih, 0, maks);
		this.nilaiParameter[kode] = final;
		return final;
	}

	getNilai(kode) { return this.nilaiParameter[kode] || 0; }

	getSemuaNilai() { return { ...this.nilaiParameter }; }

	hitungTotal() { return Object.values(this.nilaiParameter).reduce((a, b) => a + b, 0); }

	getFaktorPengali(jenis, klasifikasi) {
		if (!jenis || !klasifikasi || typeof pengali !== 'object') return null;
		const jen = String(jenis).trim();
		const klasRaw = String(klasifikasi).trim();
		const stripKlas = s => s.replace(/^Klas\s*/i, '').trim();
		if (jen === 'BGN') {
				const entry = pengali['BGN'] && pengali['BGN'][klasRaw] || null;
				if (entry) {
					if (entry.kategori) return entry.kategori;
					if (entry.katergori) return entry.katergori; // fallback kompatibilitas mundur
				}
				return null;
		}
		if (jen === 'Non-BGN') {
			const code = stripKlas(klasRaw);
			const entry = pengali['Non-BGN'] && pengali['Non-BGN'][code];
				if (entry) {
					if (entry.kategori) return entry.kategori;
					if (entry.katergori) return entry.katergori;
				}
				return null;
		}

		const fallback = pengali[jen] && (pengali[jen][klasRaw] || pengali[jen][stripKlas(klasRaw)]);
			if (fallback) {
				if (fallback.kategori) return fallback.kategori;
				if (fallback.katergori) return fallback.katergori;
			}
			return null;
	}

	hitungTotalDenganPengali(jenis, klasifikasi) {
		const faktor = this.getFaktorPengali(jenis, klasifikasi);
		const total = this.hitungTotal();
		if (!faktor) return { total, faktor: null, totalTerapkan: total };

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

function formatPersentase(nilai) { return (Math.round(nilai * 10) / 10).toFixed(1) + '%'; }
function clamp(angka, min, max) { return Math.min(Math.max(angka, min), max); }
function buatDebounce(fn, t = 250) { let id; return function (...args) { clearTimeout(id); id = setTimeout(() => fn.apply(this, args), t); }; }
function buatThrottle(fn, t = 120) { let tunggu = false, simpan; return function (...args) { if (tunggu) { simpan = args; return; } fn.apply(this, args); tunggu = true; setTimeout(() => { tunggu = false; if (simpan) { fn.apply(this, simpan); simpan = null; } }, t); }; }


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
	wrap.appendChild(btn);

	btn.addEventListener('click', (e) => { e.preventDefault(); bukaModalInfo(title, isi); });
	btn.addEventListener('keydown', (e) => {
		const key = e.key || e.code;
		if (key === 'Enter' || key === ' ' || key === 'Spacebar' || key === 'Space') { e.preventDefault(); bukaModalInfo(title, isi); }
	});
	return wrap;
}

// =============================
// Modal A11y helpers: inert background + focus trap
// =============================
let _modalPrevFocus = null;
let _modalKeydownHandler = null;
function _getFocusable(container) {
    if (!container) return [];
    const sel = [
        'a[href]', 'area[href]', 'input:not([disabled]):not([type="hidden"])',
        'select:not([disabled])', 'textarea:not([disabled])', 'button:not([disabled])',
        'iframe', 'object', 'embed', '[tabindex]:not([tabindex="-1"])', '[contenteditable="true"]'
    ].join(',');
    return Array.from(container.querySelectorAll(sel)).filter(el => el.offsetParent !== null || el === document.activeElement);
}
function _setInertBackground(aktif) {
    const elems = [
        document.querySelector('header.app-bar'),
        document.getElementById('utama'),
		document.getElementById('param-nav'),
		document.getElementById('param-nav-ringkas'),
        document.querySelector('footer.footer')
    ].filter(Boolean);
    elems.forEach(el => {
        if (aktif) {
            el.setAttribute('inert', '');
            el.setAttribute('aria-hidden', 'true');
        } else {
            el.removeAttribute('inert');
            el.removeAttribute('aria-hidden');
        }
    });
}
function _pasangPerangkapFokus(modal) {
    const dlg = modal && modal.querySelector('.modal-dialog');
    if (!dlg) return;
    const fokusAwal = _getFocusable(dlg);
    if (fokusAwal.length) fokusAwal[0].focus(); else { dlg.setAttribute('tabindex', '-1'); dlg.focus(); }
    const handler = (e) => {
        if (e.key !== 'Tab') return;
        const fokus = _getFocusable(dlg);
        if (!fokus.length) return;
        const pertama = fokus[0];
        const terakhir = fokus[fokus.length - 1];
        if (e.shiftKey) {
            if (document.activeElement === pertama || !dlg.contains(document.activeElement)) {
                e.preventDefault(); terakhir.focus();
            }
        } else {
            if (document.activeElement === terakhir) {
                e.preventDefault(); pertama.focus();
            }
        }
    };
    _modalKeydownHandler = handler;
    modal.addEventListener('keydown', handler);
}
function _lepasPerangkapFokus(modal) {
    if (_modalKeydownHandler && modal) {
        modal.removeEventListener('keydown', _modalKeydownHandler);
    }
    _modalKeydownHandler = null;
}

function bukaModalInfo(judul, isiHTML) {
	try {
		const modal = document.getElementById('modal-info');
		if (!modal) return;
		const ttl = modal.querySelector('#modal-info-title');
		const konten = modal.querySelector('#modal-info-content');
		if (ttl) ttl.textContent = judul || 'Info';
		if (konten) {
			const frag = document.createDocumentFragment();
			const wrap = document.createElement('div');
			const html = formatKontenInfo(isiHTML || '');
			let safe = html;
			try {
				if (typeof window !== 'undefined' && window.DOMPurify && typeof window.DOMPurify.sanitize === 'function') {
					safe = window.DOMPurify.sanitize(html);
				}
			} catch (_) { /* abaikan, gunakan html apa adanya */ }
			wrap.innerHTML = safe;
			frag.appendChild(wrap);
			konten.innerHTML = '';
			konten.appendChild(frag);
		}
		// Simpan fokus sebelumnya & aktifkan inert + perangkap fokus
		_modalPrevFocus = (document.activeElement && typeof document.activeElement.focus === 'function') ? document.activeElement : null;
		modal.setAttribute('aria-hidden', 'false');
		document.body.style.overflow = 'hidden';
		_setInertBackground(true);
		_pasangPerangkapFokus(modal);
		setTimeout(() => {
			const close = modal.querySelector('.modal-close');
			if (close) close.focus();
		}, 0);
	} catch (_) { }
}
function tutupModalInfo() {
	try {
		const modal = document.getElementById('modal-info');
		if (!modal) return;
		modal.setAttribute('aria-hidden', 'true');
		document.body.style.overflow = '';
		_lepasPerangkapFokus(modal);
		_setInertBackground(false);
		// Kembalikan fokus ke pemicu sebelumnya bila masih ada di dokumen
		if (_modalPrevFocus && typeof _modalPrevFocus.focus === 'function') {
			try { _modalPrevFocus.focus(); } catch (_) { }
		}
		_modalPrevFocus = null;
	} catch (_) { }
}
function formatKontenInfo(isiHTML) {
	const s = String(isiHTML || '');
	// Jika konten sudah terdiri dari satu atau lebih .blok (multi-card), jangan bungkus ulang
	if (/class\s*=\s*"blok"/i.test(s)) return s;
	return `<div class="blok">${s}</div>`;
}

// ==============================================================
// Glossary / Istilah Teknis untuk diperkaya di penjelasan indikator
// ==============================================================
// Catatan:
// 1. Fokus hanya istilah yang sering muncul di penjelasan indikator (bukan semua istilah panjang
//    parameter) agar ringan dan cepat.
// 2. Jika suatu penjelasan mengandung istilah berikut (pencocokan boundary sederhana, case-insensitive),
//    kita tambahkan blok "Istilah Terkait" di bawah penjelasan utama.
// 3. Idempoten: render hanya saat pertama kali build isi indikator; tidak menulis ulang pada re-render lazy.
// 4. Mudah diperluas: cukup tambah entry baru pada objek glossaryTerms.

const __GLOSSARY_TERMS = (function() {
	// Ambil sumber data istilah dari tabel.js bila tersedia
	let source = {};
	try {
		if (typeof window !== 'undefined' && window.glossaryTerms && typeof window.glossaryTerms === 'object') {
			source = window.glossaryTerms;
		}
	} catch (_) {}
	// Fallback minimal (kosong) jika belum tersedia; tabel.js dimuat sebelum main.js sehingga normalnya terisi
	const lower = {};
	Object.entries(source).forEach(([k,v]) => { lower[String(k).toLowerCase()] = v; });
	return lower;
})();

function __cariIstilahTerkait(teks) {
	if (!teks) return [];
	const hasil = [];
	const sumber = teks.toLowerCase();
	Object.entries(__GLOSSARY_TERMS).forEach(([term, penjelasan]) => {
		// Cari boundary sederhana: gunakan regex word boundary jika term alfanumerik
		// Beberapa istilah memiliki spasi / tanda hubung; gunakan pencarian inklusif
		const escaped = term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
		const re = new RegExp(`(^|[^a-z0-9])${escaped}([^a-z0-9]|$)`, 'i');
		if (re.test(sumber)) hasil.push({ term: term, arti: penjelasan });
	});
	return hasil.sort((a,b) => a.term.localeCompare(b.term));
}

function __bangunBlokIstilah(list) {
	if (!Array.isArray(list) || !list.length) return '';
	const items = list.map(it => `<li><strong>${it.term.replace(/</g,'&lt;')}</strong>: ${it.arti}</li>`).join('');
	return `<div class="blok blok-istilah"><h4>Istilah Terkait</h4><ul class="istilah-terkait">${items}</ul></div>`;
}

// Bersihkan definisi inline redundan (misal: (latensi = ...)) jika istilah sudah akan ditampilkan di blok istilah.
function __bersihkanDefinisiInline(teks, istilahList) {
	if (!teks || !Array.isArray(istilahList) || !istilahList.length) return teks;
	let hasil = teks;
	istilahList.forEach(it => {
		const term = it.term.trim();
		if (!term) return;
		const escaped = term.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&');
		// Pola definisi dalam kurung: ( ... term ... = ... ) hingga 140 char di dalam kurung
		const reParen = new RegExp(`\\((?=[^)]{0,140}?)[^)]*?\\b${escaped}\\b[^)]*?=+[^)]*?\\)`, 'gi');
		hasil = hasil.replace(reParen, '');
		// Pola "term = definisi" langsung (maks 80 char setelah =) jika diapit oleh batas kalimat/komponen
		const reInline = new RegExp(`(?:^|[\s.,;:()\-])${escaped}\s*=\s[^.,;:()]{1,80}`, 'gi');
		hasil = hasil.replace(reInline, (m) => {
			// Pertahankan spasi/koma pembuka jika ada
			const first = m[0];
			return /[\s.,;:()]/.test(first) ? first : ' ';
		});
	});
	// Rapikan spasi dan tanda baca ganda
	hasil = hasil.replace(/\s{2,}/g,' ').replace(/\(\s*\)/g,'').replace(/\s+([.,;:])/g,'$1').replace(/([.,;:]){2,}/g,'$1');
	return hasil.trim();
}

// ==============================================================
// Rekomendasi contoh dokumen berbasis regulasi (Permen 10/2023, SE 22/2024)
// Catatan: menggunakan kata kunci pada judul kriteria/indikator untuk memunculkan saran dokumen.
// ==============================================================
function __saranDokumenRegulasi(judulKriteria, judulIndikator) {
	const s = `${judulKriteria || ''} ${judulIndikator || ''}`.toLowerCase();
	const hasil = new Set();
	const add = (arr) => arr.forEach(x => { const t = String(x || '').trim(); if (t) hasil.add(t); });
	// Umum
	if (/kebijakan|prosedur|sop|pengelolaan|perencanaan|pengorganisasian/.test(s)) {
		add([
			'Dokumen kebijakan/strategi pengelolaan sistem cerdas',
			'SOP operasional dan pemeliharaan',
			'RACI dan uraian jabatan',
			'Risalah/berita acara tinjauan manajemen'
		]);
	}
	// Keamanan siber & akses
	if (/rbac|kontrol akses|mfa|sso|autentikasi|login|password|lock(ing)?|blokir|failover|redundan/i.test(s)) {
		add([
			'Matriks RBAC dan persetujuan akses',
			'Kebijakan kata sandi & catatan kepatuhan penggantian awal',
			'Laporan akurasi/latensi autentikasi/SSO/MFA',
			'Rencana uji failover & laporan hasil uji'
		]);
	}
	// Jaringan & protokol
	if (/tcp|udp|qos|vlan|segmen|bacnet|modbus|mqtt|rest|wifi|wlan|ssid|5g|slice|dscp/i.test(s)) {
		add([
			'Diagram arsitektur jaringan & segmentasi (VLAN/micro‑segmentation)',
			'Hasil uji interoperabilitas protokol (BACnet/IP, Modbus TCP, MQTT/REST)',
			'Kebijakan & mapping QoS (DSCP) beserta hasil uji beban',
			'Site survey/heatmap Wi‑Fi & konfigurasi SSID/WPA2/WPA3'
		]);
	}
	// BMS & integrasi data
	if (/bms|integrasi|interoperabilitas|katalog|lineage|json|csv|xml|openapi|opc ua/i.test(s)) {
		add([
			'Spesifikasi integrasi & daftar titik (points list)',
			'Kamus data & pemetaan ke model BMS',
			'Dokumentasi API/OpenAPI dan skema data',
			'Contoh entri katalog data dan lineage'
		]);
	}
	// Energi & utilitas
	if (/energi|kelistrikan|demand response|penghematan|uptime|availability/i.test(s)) {
		add([
			'Baseline konsumsi & metodologi verifikasi (IPMVP)',
			'Laporan analitik energi & peluang penghematan',
			'Kalibrasi meter energi & log alarm anomali daya'
		]);
	}
	// Air & air limbah
	if (/air minum|limbah|kualitas air|kebocoran|tss|cod|nh3|adrs/i.test(s)) {
		add([
			'Sertifikat/kalibrasi sensor air & hasil uji kualitas',
			'Log deteksi kebocoran & notifikasi',
			'Uji kinerja ADRS (debit/tekanan)' 
		]);
	}
	// Keamanan fisik (CCTV, ACS)
	if (/kamera|cctv|vms|dvr|nvr|masking|rekognisi|kontrol akses|antipassback|mustering/i.test(s)) {
		add([
			'Konfigurasi enkripsi perekaman (DVR/NVR/VMS) & kebijakan retensi',
			'Hasil uji akurasi analitik video (deteksi gerak/objek/rekognisi/masking)',
			'Kebijakan antipassback & log pelanggaran',
			'Skenario drill mustering & laporan kehadiran di titik kumpul'
		]);
	}
	return Array.from(hasil);
}


document.addEventListener('click', (e) => {
	const t = e.target;
	if (!t) return;
	const isClose = t.matches('[data-close="modal"], .modal-backdrop');
	if (isClose) { e.preventDefault(); e.stopPropagation(); tutupModalInfo(); }
}, true);
document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') tutupModalInfo();
});
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
		let tampil = j.replace('BGN', 'Bangunan Gedung Negara');
		label.innerHTML = `<input type="radio" id="${id}" name="__jenis_rb" value="${j}"><span class="opsi-teks">${tampil}</span>`;
		jenisGroup.appendChild(label);
	});
	sudahIsiJenis = true;

	// Setelah render, sesuaikan lebar bila terjadi wrap
	try { requestAnimationFrame(() => samakanLebarJenisJikaWrap()); } catch (_) { }
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
		const info = buatInfoBtn(judul, `<div><strong>Definisi:</strong> ${k.definisi || '-'}<br><strong>Contoh:</strong> ${k.contoh || '-'}</div>`);
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
		try { requestAnimationFrame(() => samakanLebarJenisJikaWrap()); } catch (_) { }
	} catch (e) { console.warn('[isiJenisBangunan] gagal:', e); }
}
function isiKlasifikasi(jenis) {
	renderKlasRadios(jenis);
}
function pastikanJenisTerisi(maksCoba = 40, interval = 125, percobaan = 0) {
	if (sudahIsiJenis) return;
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
		App.setState({ bangunan: { jenis: rb.value, klasifikasi: '' } });
		try { perbaruiJudulHalaman(); } catch (_) {}
	});
	if (klasGroup) klasGroup.addEventListener('change', () => {
		const rb = klasGroup.querySelector('input[type=radio][name="__klas_rb"]:checked');
		const hiddenKlas2 = document.getElementById('klasifikasi-bangunan');
		if (rb && hiddenKlas2) hiddenKlas2.value = rb.value;
		App.setState({ bangunan: { jenis: hiddenJenis.value || App.state.bangunan.jenis, klasifikasi: rb ? rb.value : '' } });
		try { perbaruiJudulHalaman(); } catch (_) {}
	});

	if (hiddenJenis && !hiddenJenis.dataset.listener) {
		['input', 'change'].forEach(ev => {
			hiddenJenis.addEventListener(ev, () => {
				try { isiKlasifikasi(hiddenJenis.value); } catch (_) { }
				App.setState({ bangunan: { jenis: hiddenJenis.value, klasifikasi: '' } });
				try { perbaruiJudulHalaman(); } catch (_) {}
			}, { passive: true });
		});
		hiddenJenis.dataset.listener = '1';
	}
	if (hiddenKlas && !hiddenKlas.dataset.listener) {
		['input', 'change'].forEach(ev => {
			hiddenKlas.addEventListener(ev, () => {
				App.setState({ bangunan: { jenis: hiddenJenis.value || App.state.bangunan.jenis, klasifikasi: hiddenKlas.value } });
				try { perbaruiJudulHalaman(); } catch (_) {}
			}, { passive: true });
		});
		hiddenKlas.dataset.listener = '1';
	}

	const stopInfo = (e) => {
		const b = e.target.closest && e.target.closest('.info-btn');
		if (b) { e.preventDefault(); b.focus(); }
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

			const rb = jenisGroup && jenisGroup.querySelector(`input[type=radio][name='__jenis_rb'][value="${escCSS(d.jenis)}"]`);
			if (rb) rb.checked = true;
			isiKlasifikasi(d.jenis);
			if (d.klasifikasi) {
				hiddenKlas.value = d.klasifikasi;
				const rk = klasGroup && klasGroup.querySelector(`input[type=radio][name='__klas_rb'][value="${escCSS(d.klasifikasi)}"]`);
				if (rk) rk.checked = true;
			}
			App.setState({ bangunan: { jenis: d.jenis, klasifikasi: d.klasifikasi || '' } });
			try { perbaruiJudulHalaman(); } catch (_) {}
		}
	};
	apply();
}

const MODE_CHECKLIST = 'checklist';
let modeAktif = 'grid';

function gunakanModeChecklist(aktif = true) {
	const elChecklist = document.getElementById('parameter-checklist');
	const elGrid = document.getElementById('parameter-form-grid');
	if (!elChecklist) return;
	if (aktif) {
		modeAktif = MODE_CHECKLIST;
		if (elGrid) { elGrid.hidden = true; elGrid.setAttribute('aria-hidden', 'true'); }
		elChecklist.hidden = false; elChecklist.removeAttribute('aria-hidden');
		if (!elChecklist.dataset.rendered) { renderChecklist(); elChecklist.dataset.rendered = '1'; }
		// Jika Mode Ringkas aktif sejak awal, pastikan bagian ter-render memakai filter
		if (App && App.state && App.state.modeRingkas) {
			try {
				// Paksa lazy hydration ulang agar filter diterapkan
				const secs = Array.from(document.querySelectorAll('.pc-parameter'));
				secs.forEach(s => { const d = s.querySelector('.daftar-kriteria'); if (d) d.removeAttribute('data-lazy'); });
				document.querySelectorAll('.pc-parameter').forEach(renderIsiParameter);
			} catch (_) {}
		}
	} else {
		modeAktif = 'grid';
		elChecklist.hidden = true; elChecklist.setAttribute('aria-hidden', 'true');
	}
}

function renderChecklist() {
	const root = document.getElementById('parameter-checklist');
	if (!root) return;
	const frag = document.createDocumentFragment();
	const nav = document.getElementById('param-nav');
	const navFrag = document.createDocumentFragment();
	const navHardcoded = !!(nav && nav.hasAttribute('data-hardcoded'));

	let chipHasil = null;
	if (nav && !navHardcoded) {
		const chipData = document.createElement('button');
		chipData.type = 'button';
		chipData.className = 'chip';
		chipData.innerHTML = '<i class="fa-solid fa-building" aria-hidden="true"></i><span class="nama"> Data Bangunan</span>';
		chipData.setAttribute('data-scroll-target', '#judul-data-bangunan');
		chipData.setAttribute('aria-label', 'Ke bagian Data Bangunan');
		chipData.setAttribute('title', 'Data Bangunan');
		navFrag.appendChild(chipData);

		chipHasil = document.createElement('button');
		chipHasil.type = 'button';
		chipHasil.className = 'chip';
		chipHasil.innerHTML = '<i class="fa-solid fa-chart-column" aria-hidden="true"></i><span class="nama"> Hasil</span>';
		chipHasil.setAttribute('data-scroll-target', '#judul-ringkasan');
		chipHasil.setAttribute('aria-label', 'Ke bagian Rekapitulasi Hasil Penilaian');
		chipHasil.setAttribute('title', 'Rekapitulasi Hasil');
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

		if (nav && !navHardcoded) {
			const chip = document.createElement('button');
			chip.type = 'button';
			chip.className = 'chip';
			chip.innerHTML = `<span class="kode">${kode}</span><span class="nama" aria-hidden="true">${data.nama}</span>`;
			chip.setAttribute('data-target-param', kode);
			chip.setAttribute('aria-label', `Ke parameter ${kode} - ${data.nama}`);
			chip.setAttribute('title', `${kode} • ${data.nama}`);
			navFrag.appendChild(chip);
		}

		const daftarKriteria = document.createElement('div');
		daftarKriteria.className = 'daftar-kriteria';
		daftarKriteria.setAttribute('data-lazy', 'true');
		section.appendChild(daftarKriteria);
		frag.appendChild(section);
	});
	root.innerHTML = '';
	root.appendChild(frag);

	if (nav && !navHardcoded && chipHasil) navFrag.appendChild(chipHasil);

	if (nav) {
		if (!navHardcoded) {
			nav.innerHTML = '';
			nav.appendChild(navFrag);
		}
		pasangNavParameter();
	}

	pasangLazyHydration();
	// Terapkan kembali state terbuka/tertutup dari localStorage
	try { terapkanOpenParams(); } catch (_) {}
	try { hitungDariChecklist(); } catch (_) { try { perbaruiRingkasan(); } catch (_) { } }
}

function renderIsiParameter(section) {
	if (!section) return;
	const kode = section.dataset.param;
	const kont = section.querySelector('.daftar-kriteria[data-lazy="true"]');
	if (!kont || kont.dataset.hydrated === '1') return;
	const data = penilaian[kode];
	if (!data) return;

	// Helper: deteksi indikator yang belum diisi (unfilled)
	const indikatorBelumDiisi = (kodeParam, idxK, judulInd, detailInd) => {
		const mapParam = stateChecklist[kodeParam] || {};
		const mapK = mapParam[idxK] || {};
		const key = String(judulInd);
		const val = mapK[key];
		if (detailInd.tipe === 'checkbox') {
			return val !== true; // belum dicentang
		}
		if (detailInd.tipe === 'radio') {
			return typeof val !== 'string' || !val.trim();
		}
		// default: anggap belum jika tidak ada nilai
		return typeof val === 'undefined';
	};

	// Hilangkan bagian "Bukti" dan "Keselarasan" pada penjelasan kriteria (permintaan pengguna)
	function sanitizePenjelasanKriteria(txt) {
		if (!txt) return '';
		let s = String(txt);
		// Hapus segmen yang diawali "Keselarasan:" hingga akhir
		s = s.replace(/\bKeselarasan\s*:[\s\S]*$/g, '').trim();
		// Hapus segmen "Bukti:" atau "Bukti yang umum:" hingga sebelum "Keselarasan:" atau akhir
		s = s.replace(/\b(Bukti yang umum|Bukti)\s*:[\s\S]*?(?=(\bKeselarasan\s*:)|$)/g, '').trim();
		// Rapikan spasi berlebih dan tanda baca ganda
		s = s.replace(/\s{2,}/g, ' ').replace(/\s*([.,;:])\s*/g, '$1 ').replace(/\s+$/,'').replace(/^\s+/, '');
		return s;
	}
	(data.kriteriaUnjukKerja || []).forEach((kriteria, idxK) => {
		const wrapK = document.createElement('div');
		wrapK.className = 'pc-kriteria';
		wrapK.dataset.kriteriaIndex = idxK;
		if (kode === 'F') {
			wrapK.innerHTML = `<h4><span class="kjudul">${kriteria.nama}</span> <span class="f-elemen-badge f-elemen-s" data-elemen="${idxK + 1}" title="Elemen ${idxK + 1} — Sukarela, faktor pengali: 1.0">Sukarela (faktor pengali: 1.0)</span></h4><div class="pc-indikator"></div>`;
		} else {
			wrapK.innerHTML = `<h4><span class="kjudul">${kriteria.nama}</span></h4><div class="pc-indikator"></div>`;
		}
		if (kriteria.penjelasan) {
			try {
				const judulWrap = wrapK.querySelector('h4 .kjudul');
				if (judulWrap) {
					const full = sanitizePenjelasanKriteria(kriteria.penjelasan);
					if (full) {
						const text = full.trim();
						const splitSections = (src) => {
							const labelRe = /(Penjelasan|Tujuan|Cakupan)\s*:/ig;
							const marks = [];
							let m;
							while ((m = labelRe.exec(src)) !== null) {
								marks.push({ label: m[1].toLowerCase(), start: m.index });
							}
							if (!marks.length) {
								return { penjelasan: src.trim(), tujuan: '', cakupan: '' };
							}
							// Tentukan rentang setiap label
							for (let i = 0; i < marks.length; i++) {
								marks[i].end = (i + 1 < marks.length) ? marks[i + 1].start : src.length;
							}
							const get = (label) => {
								const entry = marks.find(x => x.label === label);
								if (!entry) return '';
								const colonPos = src.indexOf(':', entry.start);
								const start = (colonPos !== -1 ? colonPos + 1 : entry.start);
								return src.slice(start, entry.end).trim();
							};
							let penjelasan = get('penjelasan');
							const tujuan = get('tujuan');
							const cakupan = get('cakupan');
							if (!penjelasan) {
								// Jika tidak ada label Penjelasan, gunakan teks sebelum label pertama sebagai penjelasan
								penjelasan = src.slice(0, marks[0].start).trim();
							}
							return { penjelasan, tujuan, cakupan };
						};

						const { penjelasan, tujuan, cakupan } = splitSections(text);
						// Cari istilah pada gabungan judul + isi agar blok istilah tetap muncul meski istilah ada di judul
						const gabungan = [kriteria.nama || '', penjelasan || '', tujuan || '', cakupan || ''].filter(Boolean).join('. ');
						const istilahKriteria = __cariIstilahTerkait(gabungan);
						const penjelasanBersih = __bersihkanDefinisiInline(penjelasan || '', istilahKriteria);
						let multi = '';
						if (penjelasanBersih) multi += `<div class=\"blok\"><h4>Penjelasan</h4><div>${penjelasanBersih}</div></div>`;
						if (tujuan) multi += `<div class=\"blok\"><h4>Tujuan</h4><div>${tujuan}</div></div>`;
						if (cakupan) multi += `<div class=\"blok\"><h4>Cakupan</h4><div>${cakupan}</div></div>`;
						const blokIstilahK = __bangunBlokIstilah(istilahKriteria);
						if (blokIstilahK) multi += blokIstilahK;

						const info = buatInfoBtn(kriteria.nama || 'Penjelasan', multi || `<div class=\"blok\">${text}</div>`);
						judulWrap.appendChild(info);
					}
				}
			} catch (_) { }
		}
		const kontInd = wrapK.querySelector('.pc-indikator');
		if (kriteria.indikator && typeof kriteria.indikator === 'object') {
			Object.entries(kriteria.indikator).forEach(([judulInd, detailInd], idxInd) => {
				// Filter berdasarkan mode ringkas: tampilkan hanya indikator yang belum diisi
				if (App && App.state && App.state.modeRingkas) {
					if (!indikatorBelumDiisi(kode, idxK, judulInd, detailInd)) return; // skip yang sudah terisi
				}
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

				try {
					const judulNode = item.querySelector('.judul');
					if (judulNode) {
						const penjelasanRaw = (detailInd && detailInd.penjelasan) ? String(detailInd.penjelasan) : '';
						const contohRaw = (detailInd && detailInd.contohDokumentasi) ? String(detailInd.contohDokumentasi) : '';
						// Helper: nilai placeholder kosong
						const isEmpty = (s) => !s || !String(s).trim() || /^[-–—]+$/.test(String(s).trim());
						// Helper: format contoh jadi <ul><li>...</li></ul> dengan jumlah fleksibel sesuai kebutuhan
						const formatContohList = (s) => {
							if (isEmpty(s)) return '';
							// Pisahkan hanya pada tanda titik koma (;)
							const parts = String(s).split(';').map(v => v.trim()).filter(Boolean);
							// buang placeholder umum yang tak berguna
							const blacklist = new Set(['-', 'tidak ada', 'n/a', 'na']);
							const uniq = Array.from(new Set(parts)).filter(v => !blacklist.has(v.toLowerCase()));
							if (!uniq.length) return '';
							return '<ul>' + uniq.map(v => `<li>${v}</li>`).join('') + '</ul>';
						};
						// Tampilkan hanya contoh dari dataset (tabel.js), tanpa saran otomatis
						const contohListHTML = formatContohList(contohRaw);

						const penjelasan = isEmpty(penjelasanRaw) ? '' : penjelasanRaw;
						let isi = '';
						if (penjelasan) {
							// Cari istilah terkait pada gabungan judul indikator + penjelasan
							const sumberIstilah = `${judulInd}. ${penjelasan}`;
							const istilah = __cariIstilahTerkait(sumberIstilah);
							// Bersihkan definisi inline redundan (term = definisi) agar hanya muncul di blok istilah
							const penjelasanBersih = __bersihkanDefinisiInline(penjelasan, istilah);
							const blokIstilah = __bangunBlokIstilah(istilah);
							isi += `<h4>Penjelasan</h4><div>${penjelasanBersih}</div>` + blokIstilah;
						}
						if (contohListHTML) isi += `<h4>Contoh Dokumentasi</h4>${contohListHTML}`;
						if (isi) {
							const info = buatInfoBtn(judulInd, isi);
							judulNode.appendChild(info);
						}
					}
				} catch (_) { }
				kontInd.appendChild(item);
			});
		}
		kont.appendChild(wrapK);
	});
	kont.dataset.hydrated = '1';

	try { perbaruiBadgeElemenF(); } catch (_) { }
	try { tandaiIndikatorWajib(); } catch (_) { }
	try { perbaruiPoinIndikator(); } catch (_) { }

	try { sinkronkanInputSectionDenganState(section); } catch (_) { }
}

function sinkronkanInputSectionDenganState(section) {
	if (!section) return;
	const kode = section.getAttribute('data-param');
	if (!kode || !stateChecklist[kode]) return;
	const mapK = stateChecklist[kode];
	Object.entries(mapK).forEach(([idxK, indikatorMap]) => {
		Object.entries(indikatorMap).forEach(([indikatorKey, val]) => {
			const encKey = encodeURIComponent(indikatorKey);
			if (typeof val === 'boolean') {
				const sel = `input[type=checkbox][data-tipe="checkbox"][data-param="${kode}"][data-kriteria="${idxK}"][data-indikator="${encKey}"]`;
				const inp = section.querySelector(sel);
				if (inp) inp.checked = true;
			} else {
				const encVal = encodeURIComponent(val);
				const sel = `input[type=radio][data-tipe="radio"][data-param="${kode}"][data-kriteria="${idxK}"][data-indikator="${encKey}"][value="${encVal}"]`;
				const inp = section.querySelector(sel);
				if (inp) inp.checked = true;
			}
		});
	});
}

function pasangLazyHydration() {
	const sections = Array.from(document.querySelectorAll('.pc-parameter'));

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

	sections.forEach(sec => {
		const sum = sec.querySelector('summary');
		if (!sum) return;
		// Hydrate on first interaction
		sum.addEventListener('click', () => { renderIsiParameter(sec); }, { passive: true });
		// Animate open/close instead of abrupt toggle
		sum.addEventListener('click', (e) => {
			e.preventDefault();
			const details = sec; // <details>
			const kont = details.querySelector('.daftar-kriteria');
			if (!kont) { details.open = !details.open; return; }
			const akanBuka = !details.open;
			try { renderIsiParameter(details); } catch(_){}
			requestAnimationFrame(() => {
				const startH = akanBuka ? 0 : kont.scrollHeight;
				if (akanBuka) details.open = true;
				// Measure target height
				kont.style.height = 'auto';
				const targetH = akanBuka ? kont.scrollHeight : 0;
				// Prepare and animate
				kont.classList.add('animating');
				kont.style.height = startH + 'px';
				kont.style.opacity = akanBuka ? '0' : '1';
				requestAnimationFrame(() => {
					kont.style.height = targetH + 'px';
					kont.style.opacity = akanBuka ? '1' : '0';
				});
				const selesai = () => {
					kont.classList.remove('animating');
					kont.style.height = '';
					kont.style.opacity = '';
					if (!akanBuka) details.open = false;
					kont.removeEventListener('transitionend', selesai);
				};
				kont.addEventListener('transitionend', selesai);
			});
		});
	});
}

// Terapkan daftar parameter yang harus terbuka dari state (openParams)
function terapkanOpenParams() {
	try {
		const daftar = (App && App.state && Array.isArray(App.state.openParams)) ? App.state.openParams : [];
		if (!daftar || daftar.length === 0) return;
		const target = new Set(daftar);
		Array.from(document.querySelectorAll('.pc-parameter')).forEach(sec => {
			const kode = sec && sec.dataset ? sec.dataset.param : '';
			const harusBuka = kode && target.has(kode);
			try { sec.open = !!harusBuka; } catch(_) {}
			// Pastikan konten ter-hydrate bila dibuka
			if (harusBuka) { try { renderIsiParameter(sec); } catch(_) {} }
		});
	} catch (_) { }
}

function pasangNavParameter() {
	const nav = document.getElementById('param-nav');
	if (!nav) return;
	const chips = Array.from(nav.querySelectorAll('.chip'));
	const sections = Array.from(document.querySelectorAll('.pc-parameter'));

	// Header chips (Data & Ringkasan)
	const chipData = nav.querySelector('.chip[data-scroll-target="#judul-data-bangunan"]');
	const chipRingkasan = nav.querySelector('.chip[data-scroll-target="#judul-ringkasan"]');
	let headerAktif = false; // jika true, abaikan penandaan aktif di chip parameter

	// Scroll handler for header chips with data-scroll-target
	chips.forEach(c => {
		const t = c.getAttribute('data-scroll-target');
		if (!t) return;
		c.addEventListener('click', () => {
			const el = document.querySelector(t);
			if (!el) return;
			// Immediately reflect active state for header chips
			if (t === '#judul-data-bangunan') { setAktifHeader('data'); headerAktif = true; }
			else if (t === '#judul-ringkasan') { setAktifHeader('ringkasan'); headerAktif = true; }
			try {
				// Prefer precise scroll with header offset
				const appBar = document.querySelector('.app-bar');
				const headerH = appBar ? appBar.getBoundingClientRect().height : 78;
				const extraGap = 12;
				const y = el.getBoundingClientRect().top + window.scrollY - (headerH + extraGap);
				window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
			} catch(_) {
				try { el.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' }); } catch(_) {}
			}
			try { updateStickyVisibility && updateStickyVisibility(); } catch(_) {}
		}, { passive: true });
	});

	const keSection = (kode) => sections.find(s => s.dataset.param === kode);
	const setAktif = (kode) => {
		chips.forEach(c => {
			if (c.dataset.targetParam) {
				c.setAttribute('aria-current', c.dataset.targetParam === kode ? 'true' : 'false');
			} else {
				// Pastikan chip header tidak aktif saat param aktif
				c.setAttribute('aria-current', 'false');
			}
		});
	};

	const setAktifHeader = (jenis) => {
		chips.forEach(c => {
			const t = c.getAttribute('data-scroll-target');
			if (!t) { c.setAttribute('aria-current', 'false'); return; }
			const isData = (t === '#judul-data-bangunan');
			const isRingkasan = (t === '#judul-ringkasan');
			const aktif = (jenis === 'data' && isData) || (jenis === 'ringkasan' && isRingkasan);
			c.setAttribute('aria-current', aktif ? 'true' : 'false');
		});
	};
	const tampilkanNama = (kode) => {
		chips.forEach(c => {
			if (c.dataset.targetParam === kode) c.classList.add('tampil-nama'); else c.classList.remove('tampil-nama');
		});
	};

	chips.forEach(c => c.addEventListener('click', () => {
		const kode = c.dataset.targetParam;
		if (!kode) return;
		const sec = keSection(kode);
		if (!sec) return;

		// Buka section jika tertutup dan pastikan isi ter-hydrate sebelum menghitung posisi scroll
		if (sec.tagName === 'DETAILS' && !sec.open) sec.open = true;
		try {
			const kont = sec.querySelector('.daftar-kriteria[data-lazy="true"]');
			if (kont) renderIsiParameter(sec);
		} catch (_) {}

		// Gunakan dua kali rAF agar layout update selesai sebelum menghitung posisi
		const doScroll = () => {
			try {
				const appBar = document.querySelector('.app-bar');
				const headerH = appBar ? appBar.getBoundingClientRect().height : 78;
				const extraGap = 12;
				const offset = headerH + extraGap;
				const y = sec.getBoundingClientRect().top + window.scrollY - offset;
				window.scrollTo({ top: Math.max(0, y), behavior: 'smooth' });
			} catch(_) {}
			setAktif(sec.dataset.param);
			tampilkanNama(sec.dataset.param);
		};
		try { requestAnimationFrame(() => requestAnimationFrame(doScroll)); } catch(_) { doScroll(); }
	}, { passive: true }));

	const obs = new IntersectionObserver(entries => {

		const terlihat = entries
			.filter(e => e.isIntersecting)
			.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
		if (!headerAktif && terlihat[0]) {
			const k = terlihat[0].target.dataset.param;
			setAktif(k);

			const adaTampil = chips.some(c => c.classList.contains('tampil-nama'));
			if (adaTampil) tampilkanNama(k);
		}
		// Toggle sticky rekap: tampil hanya saat parameter A–F terlihat.
		try { if (typeof updateStickyVisibility === 'function') updateStickyVisibility(); } catch (_) {}
	}, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] });
	sections.forEach(s => obs.observe(s));

	// Observer untuk judul Data & Ringkasan agar chip header bisa aktif saat terlihat
	const hdrTargets = [];
	const judulData = document.getElementById('judul-data-bangunan');
	const judulRingkasan = document.getElementById('judul-ringkasan');
	if (judulData) hdrTargets.push(judulData);
	if (judulRingkasan) hdrTargets.push(judulRingkasan);
	const hdrObs = new IntersectionObserver(() => {
		const dataInView = !!(judulData && rectIsInViewport(judulData));
		const ringkasanInView = !!(judulRingkasan && rectIsInViewport(judulRingkasan));
		headerAktif = dataInView || ringkasanInView;
		if (ringkasanInView) setAktifHeader('ringkasan');
		else if (dataInView) setAktifHeader('data');
		else setAktifHeader(null);
	}, { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.1, 0.25, 0.5] });
	judulData && hdrObs.observe(judulData);
	judulRingkasan && hdrObs.observe(judulRingkasan);

	// Inisialisasi state aktif di awal
	try {
		const dataInView0 = !!(judulData && rectIsInViewport(judulData));
		const ringkasanInView0 = !!(judulRingkasan && rectIsInViewport(judulRingkasan));
		headerAktif = dataInView0 || ringkasanInView0;
		if (ringkasanInView0) setAktifHeader('ringkasan');
		else if (dataInView0) setAktifHeader('data');
	} catch (_) {}

	// A11y: Roving tabindex + keyboard navigation (Arrow/Home/End) on chips
	try {
		const setRoving = (aktifIdx) => {
			chips.forEach((c, i) => { c.tabIndex = (i === aktifIdx ? 0 : -1); });
		};
		const idxAktifAwal = (() => {
			const idx = chips.findIndex(c => c.getAttribute('aria-current') === 'true');
			return idx >= 0 ? idx : 0;
		})();
		setRoving(idxAktifAwal);

		// Sync roving on click
		chips.forEach((c, i) => {
			c.addEventListener('click', () => setRoving(i), { passive: true });
		});

		// Keyboard navigation on container
		nav.addEventListener('keydown', (e) => {
			const key = e.key;
			if (!['ArrowDown','ArrowUp','ArrowRight','ArrowLeft','Home','End','Enter',' '].includes(key)) return;
			const fokusIdx = Math.max(0, chips.indexOf(document.activeElement));
			let next = fokusIdx;
			if (key === 'ArrowRight' || key === 'ArrowDown') { e.preventDefault(); next = (fokusIdx + 1) % chips.length; }
			else if (key === 'ArrowLeft' || key === 'ArrowUp') { e.preventDefault(); next = (fokusIdx - 1 + chips.length) % chips.length; }
			else if (key === 'Home') { e.preventDefault(); next = 0; }
			else if (key === 'End') { e.preventDefault(); next = chips.length - 1; }
			else if (key === 'Enter' || key === ' ') {
				const btn = document.activeElement;
				if (btn && btn.classList && btn.classList.contains('chip')) { e.preventDefault(); btn.click(); }
				return;
			}
			setRoving(next);
			chips[next] && chips[next].focus();
		});
	} catch (_) { }
}

// Helper: cek apakah elemen berada di viewport (sebagian terlihat)
function rectIsInViewport(el) {
	try {
		const rect = el.getBoundingClientRect();
		const vh = window.innerHeight || document.documentElement.clientHeight;
		const vw = window.innerWidth || document.documentElement.clientWidth;
		return rect.bottom > 0 && rect.right > 0 && rect.top < vh && rect.left < vw;
	} catch (_) { return false; }
}

// ==== Sticky rekap visibility based on viewport edge intersection ====
function _isParamAtPoint(x, y) {
	try {
		const arr = (document.elementsFromPoint ? document.elementsFromPoint(x, y) : [document.elementFromPoint(x, y)].filter(Boolean)) || [];
		for (const el of arr) {
			if (!el) continue;
			// Skip overlays and own sticky
			if (el.id === 'rekap-sticky' || (el.closest && el.closest('#rekap-sticky'))) continue;
			if (el.closest && el.closest('.param-nav')) continue;
			if (el.closest && el.closest('header.app-bar')) continue;
			if (el.closest && el.closest('.modal-info, .modal-upload')) continue;
			if (el.closest && el.closest('.pc-parameter')) return true;
			// Stop early if we hit main sections explicitly non-parameter
			if (el.closest && (el.closest('.data-bangunan') || el.closest('#judul-ringkasan'))) return false;
		}
	} catch (_) { }
	return false;
}

function shouldShowStickyRekap() {
	try {
		const appBar = document.querySelector('.app-bar');
		const headerH = appBar ? Math.ceil(appBar.getBoundingClientRect().height) : 0;
		const w = window.innerWidth || document.documentElement.clientWidth || 800;
		const vh = window.innerHeight || document.documentElement.clientHeight || 600;
		const x = Math.max(10, Math.min(w - 10, Math.floor(w / 2)));
		// Offsets: sample slightly below header and slightly above sticky area to be more permissive
		const topOffset = Math.max(8, Math.floor(headerH + 12));
		const stickyH = (rekapSticky && !rekapSticky.hidden) ? Math.ceil(rekapSticky.getBoundingClientRect().height) : 0;
		const bottomOffset = Math.max(10, stickyH + 14);
		const topY = Math.min(vh - 2, Math.max(1, topOffset));
		const bottomY = Math.max(1, vh - 1 - bottomOffset);
		const topIsParam = _isParamAtPoint(x, topY);
		const bottomIsParam = _isParamAtPoint(x, bottomY);
		return topIsParam && bottomIsParam;
	} catch (_) { return false; }
}

const updateStickyVisibility = buatThrottle(() => {
	try {
		if (!rekapSticky) return;
		const should = shouldShowStickyRekap();
		if (should) {
			rekapSticky.hidden = false;
			rekapSticky.classList.add('tampak');
		} else {
			rekapSticky.classList.remove('tampak');
			clearTimeout(rekapSticky.__hideTid);
			rekapSticky.__hideTid = setTimeout(() => { rekapSticky.hidden = true; }, 260);
		}
	} catch (_) {}
}, 120);

window.addEventListener('scroll', () => { try { updateStickyVisibility(); } catch(_) {} }, { passive: true });
window.addEventListener('resize', () => { try { updateStickyVisibility(); } catch(_) {} });

// Mode Ringkas: tampilkan hanya indikator yang belum terisi
(function setupModeRingkas() {
	if (!btnRingkas) return;
	const applyPressed = (aktif) => {
		btnRingkas.setAttribute('aria-pressed', aktif ? 'true' : 'false');
		btnRingkas.classList.toggle('aktif', !!aktif);
		btnRingkas.title = aktif ? 'Mode Ringkas aktif: hanya indikator belum terisi' : 'Mode Ringkas: tampilkan hanya indikator yang belum terisi';
		// Jika tombol di header, pertahankan ikon filter, tidak perlu teks
	};
	// Inisialisasi dari state
	try { applyPressed(App && App.state ? !!App.state.modeRingkas : false); } catch(_){}
	btnRingkas.addEventListener('click', (e) => {
		e.preventDefault();
		const nextVal = !(App && App.state && App.state.modeRingkas);
		App.setState({ modeRingkas: nextVal }, true);
		applyPressed(nextVal);
		// Terapkan filter animasi tanpa membuka section tertutup
		try {
			const root = document.getElementById('parameter-checklist');
			if (!root) return;
			root.classList.toggle('ringkas-aktif', nextVal);
			// Pastikan isi ter-hydrate agar status indikator bisa dievaluasi, tapi jangan ubah open state
			const terbukaMap = new Map();
			Array.from(document.querySelectorAll('.pc-parameter')).forEach(sec => {
				terbukaMap.set(sec, !!sec.open);
				renderIsiParameter(sec);
			});
			// Kembalikan state open sesuai sebelumnya
			terbukaMap.forEach((wasOpen, sec) => { try { sec.open = wasOpen; } catch(_){} });

			// Terapkan kelas sembunyi/muncul
			Array.from(root.querySelectorAll('.pc-parameter')).forEach(sec => {
				const kode = sec.getAttribute('data-param');
				const data = penilaian[kode];
				if (!data) return;
				const klistas = sec.querySelectorAll('.pc-kriteria');
				klistas.forEach((wrapK, idxK) => {
					const kriteria = (data.kriteriaUnjukKerja || [])[idxK];
					if (!kriteria) return;
					wrapK.querySelectorAll('.indikator-item').forEach(item => {
						const key = item.dataset.indikatorKey;
						const detail = kriteria.indikator[key];
						let terisi = false;
						if (detail && detail.tipe === 'checkbox') {
							const inp = item.querySelector('input[type=checkbox]');
							terisi = !!(inp && inp.checked);
						} else if (detail && detail.tipe === 'radio') {
							terisi = !!item.querySelector('input[type=radio]:checked');
						}
						if (nextVal && terisi) {
							item.classList.add('sembunyi-ringkas');
							item.classList.remove('muncul-ringkas');
						} else {
							const wasHidden = item.classList.contains('sembunyi-ringkas');
							item.classList.remove('sembunyi-ringkas');
							if (wasHidden) item.classList.add('muncul-ringkas');
							setTimeout(() => item.classList.remove('muncul-ringkas'), 260);
						}
					});
				});
			});
		} catch (_) {}
	});
})();

function hitungDariChecklist() {
	let total = 0;

	const jenisNow = selectJenis ? selectJenis.value : '';
	const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';
	const faktorKategori = kalkulator.getFaktorPengali(jenisNow, klasNow) || { w: 1, d: 1, s: 1 };
	Object.entries(penilaian).forEach(([kode, dataParam]) => {
		let subtotalParam = 0;
		(dataParam.kriteriaUnjukKerja || []).forEach((kriteria, idxK) => {
			let subtotalK = 0;

			let mult = 1;
			if (kode === 'F') {
				const elemenIndex = idxK + 1;
				const kat = (stateImplementasi.kategoriElemen && stateImplementasi.kategoriElemen[elemenIndex]) || 's';
				mult = parseFloat(faktorKategori[kat]) || 1;
			}

			if (stateChecklist[kode] && stateChecklist[kode][idxK]) {
				Object.entries(stateChecklist[kode][idxK]).forEach(([indKey, valPilihan]) => {
					const detailInd = kriteria.indikator[indKey];
					if (!detailInd) return;
					if (detailInd.tipe === 'checkbox') {
						const p = detailInd.poin || 0;
						subtotalK += (kode === 'F') ? (p * mult) : p;
					} else if (detailInd.tipe === 'radio' && detailInd.poin) {

						if (valPilihan in detailInd.poin) {
							const p = detailInd.poin[valPilihan] || 0;
							subtotalK += (kode === 'F') ? (p * mult) : p;
						}
					}
				});
			}

			const maksK = kriteria.maksPoinKUK || 0;
			if (subtotalK > maksK) subtotalK = maksK;

			const elSubtotalK = document.querySelector(`[data-subtotal-kriteria="${kode}-${idxK}"]`);
			if (elSubtotalK) {
				const tampil = (kode === 'F') ? (Number.isFinite(subtotalK) ? subtotalK.toFixed(1) : '0.0') : `${subtotalK}`;
				elSubtotalK.textContent = `${tampil} / ${maksK}`;
			}
			subtotalParam += subtotalK;
		});

		const maksParam = dataParam.maksPoinParameter || 0;
		if (subtotalParam > maksParam) subtotalParam = maksParam;
		kalkulator.setNilai(kode, subtotalParam);
		total += subtotalParam;
	});
	perbaruiRingkasan();
	perbaruiPoinIndikator();
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

		if (t.checked) {
			const valLabel = decodeURIComponent(t.value);
			stateChecklist[kode][idxK][indikatorKey] = valLabel;
		} else {
			delete stateChecklist[kode][idxK][indikatorKey];
		}
	}

	Object.keys(stateChecklist[kode][idxK]).length === 0 && delete stateChecklist[kode][idxK];
	if (Object.keys(stateChecklist[kode]).length === 0) delete stateChecklist[kode];
	hitungDariChecklist();
	simpanLocal(false);
}

function pasangChecklistListeners() {
	const root = document.getElementById('parameter-checklist');
	if (!root) return;
	root.addEventListener('click', (e) => {
		const infoBtn = e.target && (e.target.closest ? e.target.closest('.info-btn') : null);
		if (infoBtn) {
			e.preventDefault();
		}
	}, true);
	root.addEventListener('change', handleChecklistInput, { passive: true });
	root.addEventListener('input', (e) => {
		if (e && e.target && e.target.matches('input[type=checkbox][data-tipe], input[type=radio][data-tipe]')) {
			handleChecklistInput(e);
		}
	}, { passive: true });

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

			e.preventDefault();
			inp.checked = false;
			inp.dispatchEvent(new Event('change', { bubbles: true }));
		}
		if (inp) delete inp.dataset.wasChecked;
	}, true);

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

function tandaiIndikatorWajib() {
	const jenisNow = selectJenis ? selectJenis.value : '';
	const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';

	const allItems = document.querySelectorAll('.pc-parameter .pc-kriteria .indikator-item');
	const bersihkanItem = (item) => {

		item.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(inp => inp.removeAttribute('required'));

		const judulSpan = item.querySelector('label > .judul, .judul');
		if (judulSpan) {
			judulSpan.classList.remove('is-required');
			const star = judulSpan.querySelector('.asterisk');
			if (star) star.remove();
		}
	};
	if (!jenisNow || !klasNow) { allItems.forEach(bersihkanItem); return; }

	document.querySelectorAll('.pc-parameter').forEach(section => {
		const kode = section.getAttribute('data-param');

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

				const hasRadio = !!item.querySelector('input[type="radio"][data-tipe]');
				const hasCheckbox = !!item.querySelector('input[type="checkbox"][data-tipe]');

				if (hasRadio) {
					item.querySelectorAll('input[type="radio"][data-tipe]').forEach(inp => {
						inp.setAttribute('required', '');
					});
					const judulSpan = item.querySelector('label > .judul, .judul');
					if (judulSpan && !judulSpan.querySelector('.asterisk')) {
						const bintang = document.createElement('span');
						bintang.className = 'asterisk';
						bintang.textContent = ' *';
						judulSpan.appendChild(bintang);
						judulSpan.classList.add('is-required');
					}
				} else if (hasCheckbox) {
					item.querySelectorAll('input[type="checkbox"][data-tipe]').forEach(inp => inp.removeAttribute('required'));
					const judulSpan = item.querySelector('label > .judul, .judul');
					if (judulSpan) {
						judulSpan.classList.remove('is-required');
						const star = judulSpan.querySelector('.asterisk');
						if (star) star.remove();
					}
				} else {
					bersihkanItem(item);
				}
			});
		});
	});
}

function muatStateChecklist(obj) {
	if (!obj || !obj.checklist) return;
	stateChecklist = obj.checklist;

	Object.entries(stateChecklist).forEach(([kode, mapK]) => {
		Object.entries(mapK).forEach(([idxK, indikatorMap]) => {
			Object.entries(indikatorMap).forEach(([indikatorKey, val]) => {

				const sel = `[data-param="${kode}"][data-kriteria="${idxK}"][data-indikator="${encodeURIComponent(indikatorKey)}"]`;
				if (typeof val === 'boolean') {
					const inp = document.querySelector(`input[type=checkbox]${sel}`);
					if (inp) inp.checked = true;
				} else {

					const inp = document.querySelector(`input[type=radio]${sel}[value="${encodeURIComponent(val)}"]`);
					if (inp) inp.checked = true;
				}
			});
		});
	});
	setTimeout(() => hitungDariChecklist(), 0);
}


function perbaruiRingkasan() {
	const total = hitungTotalSepertiCSV();
	const maks = kalkulator.getTotalMaks();

	totalSkorEl.textContent = Number.isFinite(total) ? total.toFixed(1) : '0.0';
	totalMaksEl.textContent = maks;
	let persen = maks > 0 ? (total / maks * 100) : 0;
	persentaseEl.textContent = formatPersentase(persen);
	progressEl.value = clamp(persen, 0, 100);
	progressEl.setAttribute('aria-valuenow', progressEl.value);

	let wajibKurang = false;
	try {
		const jenisNow = selectJenis ? selectJenis.value : '';
		const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';
		const faktorKategori = kalkulator.getFaktorPengali(jenisNow, klasNow) || { w: 1, d: 1, s: 1 };
		const dataF = penilaian['F'];
		if (dataF && dataF.kriteriaUnjukKerja) {
			dataF.kriteriaUnjukKerja.forEach((kriteria, idxK) => {
				const elemenIndex = idxK + 1;
				const kat = (stateImplementasi.kategoriElemen && stateImplementasi.kategoriElemen[elemenIndex]) || 's';
				const wajib = (kat === 'w');
				if (!wajib) return;
				const ada = stateChecklist['F'] && stateChecklist['F'][idxK] && Object.keys(stateChecklist['F'][idxK]).length > 0;
				if (!ada) wajibKurang = true;
			});
		}
	} catch (_) { }

	const warn = document.getElementById('peringkat-warning');
	const target = tentukanPeringkat(persen);
	const showWarning = wajibKurang && persen >= 40;
	if (showWarning) {
		if (warn) warn.hidden = false;
		if (peringkatEl) {
			const level = 'belum';
			const label = 'Belum';
			peringkatEl.textContent = label;
			peringkatEl.dataset.level = level;
			peringkatEl.className = `badge-klasifikasi ${kelasBadge(level)}`;
		}
	} else {
		if (warn) warn.hidden = true;
		if (peringkatEl) {
			const { level, label } = target;
			peringkatEl.textContent = label;
			peringkatEl.dataset.level = level;
			peringkatEl.className = `badge-klasifikasi ${kelasBadge(level)}`;
		}

		// Update sticky rekap values (mirror main summary)
		try {
			if (rekapTotalSkorEl) rekapTotalSkorEl.textContent = Number.isFinite(total) ? total.toFixed(1) : '0.0';
			if (rekapTotalMaksEl) rekapTotalMaksEl.textContent = maks;
			if (rekapPersenEl) rekapPersenEl.textContent = formatPersentase(persen);
			if (rekapProgressEl) {
				const val = clamp(persen, 0, 100);
				rekapProgressEl.value = val;
				rekapProgressEl.setAttribute('aria-valuenow', String(val));
			}
			try { updateStickyVisibility && updateStickyVisibility(); } catch(_) {}
		} catch (_) {}
	}
}

function hitungTotalSepertiCSV() {
	try {
		const jenisNow = selectJenis ? selectJenis.value : '';
		const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';
		const faktorKategori = kalkulator.getFaktorPengali(jenisNow, klasNow) || { w: 1, d: 1, s: 1 };
		let total = 0;
		Object.entries(penilaian).forEach(([kode, dataParam]) => {
			(dataParam.kriteriaUnjukKerja || []).forEach((kriteria, idxK) => {
				const elemenIndex = idxK + 1;
				const kat = (kode === 'F') ? ((stateImplementasi.kategoriElemen && stateImplementasi.kategoriElemen[elemenIndex]) || 's') : null;
				const mult = (kode === 'F') ? (parseFloat(faktorKategori[kat]) || 1) : 1;
				const stateK = stateChecklist[kode] && stateChecklist[kode][idxK];
				if (!stateK) return;
				Object.entries(stateK).forEach(([indikatorKey, val]) => {
					const detail = kriteria.indikator[indikatorKey];
					if (!detail) return;
					let base = 0; let akhir = 0;
					if (detail.tipe === 'checkbox') {
						base = detail.poin || 0; akhir = (kode === 'F') ? base * mult : base;
					} else if (detail.tipe === 'radio') {
						const label = val;
						base = (detail.poin && (label in detail.poin)) ? (detail.poin[label] || 0) : 0;
						akhir = (kode === 'F') ? base * mult : base;
					}
					total += akhir;
				});
			});
		});
		return Number.isFinite(total) ? Math.round(total * 10) / 10 : 0;
	} catch (_) { return 0; }
}

function tentukanPeringkat(persen) {

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

function simpanLocal(manual = false) {
	try {
		App.save(App.state, manual);
		if (manual) notifikasi('Disimpan', { senyap: document.visibilityState === 'hidden' });
	} catch (e) {
		console.error('[simpanLocal] Gagal:', e);
		notifikasi('Gagal Simpan');
	}
}

function snapshotState() {
	function buildRincianPenilaian() {
		const jenisNow = selectJenis ? selectJenis.value : '';
		const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';
		const faktorKategori = kalkulator.getFaktorPengali(jenisNow, klasNow) || { w: 1, d: 1, s: 1 };
		const hasilParam = [];
		let totalSemua = 0;
		let totalSemuaSebelumBatas = 0;
		let totalMaks = 0;
		Object.entries(penilaian).forEach(([kode, dataParam]) => {
			const detParam = { kode, nama: dataParam.nama, maksParameter: dataParam.maksPoinParameter || 0, subtotalParameterSebelumBatas: 0, subtotalParameter: 0, kriteria: [] };
			(dataParam.kriteriaUnjukKerja || []).forEach((kriteria, idxK) => {
				const stateK = stateChecklist[kode] && stateChecklist[kode][idxK];
				if (!stateK) return; // hanya kriteria yang punya pilihan
				const elemenIndex = idxK + 1;
				const kat = (kode === 'F') ? ((stateImplementasi.kategoriElemen && stateImplementasi.kategoriElemen[elemenIndex]) || 's') : null;
				const mult = (kode === 'F') ? (parseFloat(faktorKategori[kat]) || 1) : 1;
				const detK = { indeks: idxK, elemenIndex, nama: kriteria.nama, maksKriteria: kriteria.maksPoinKUK || 0, kategoriElemen: (kode === 'F') ? (kat || 's') : undefined, multiplier: (kode === 'F') ? mult : undefined, indikator: [], subtotalKriteriaSebelumBatas: 0, subtotalKriteria: 0 };
				Object.entries(stateK).forEach(([indikatorKey, val]) => {
					const detail = kriteria.indikator[indikatorKey];
					if (!detail) return;
					let base = 0; let akhir = 0; let pilihan = (typeof val === 'boolean') ? !!val : val;
					if (detail.tipe === 'checkbox') {
						base = detail.poin || 0;
						akhir = (kode === 'F') ? base * mult : base;
					} else if (detail.tipe === 'radio') {
						const label = val;
						base = (detail.poin && (label in detail.poin)) ? (detail.poin[label] || 0) : 0;
						akhir = (kode === 'F') ? base * mult : base;
					}
					detK.indikator.push({ key: indikatorKey, tipe: detail.tipe, pilihan, poinDasar: base, multiplier: (kode === 'F') ? mult : undefined, poinAkhir: Number.isFinite(akhir) ? Math.round(akhir * 10) / 10 : 0 });
					detK.subtotalKriteriaSebelumBatas += akhir;
				});
				detK.subtotalKriteria = Math.min(detK.subtotalKriteriaSebelumBatas, detK.maksKriteria || 0);
				if (detK.indikator.length) {
					detParam.kriteria.push(detK);
					detParam.subtotalParameterSebelumBatas += detK.subtotalKriteria;
				}
			});
			detParam.subtotalParameter = Math.min(detParam.subtotalParameterSebelumBatas, detParam.maksParameter || 0);
			if (detParam.kriteria.length) {
				hasilParam.push(detParam);
				totalSemuaSebelumBatas += detParam.subtotalParameter;
				totalSemua += detParam.subtotalParameter;
			}
			totalMaks += detParam.maksParameter || 0;
		});
		const persen = totalMaks > 0 ? (totalSemua / totalMaks * 100) : 0;
		return {
			parameter: hasilParam,
			ringkasan: {
				total: Number.isFinite(totalSemua) ? Math.round(totalSemua * 10) / 10 : 0,
				maks: totalMaks,
				persentase: (Math.round(persen * 10) / 10)
			}
		};
	}

	return {
		tipe: 'bgc-penilaian',
		versi: 2,
		diperbarui: new Date().toISOString(),
		bangunan: {
			jenis: selectJenis ? selectJenis.value : '',
			klasifikasi: selectKlasifikasi ? selectKlasifikasi.value : ''
		},
		implementasi: {
			catatanGlobal: (() => {
				const jenisNow = selectJenis ? selectJenis.value : '';
				const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';
				if (!jenisNow || !klasNow) return {};
				const entry = getEntryImplementasi();
				if (!entry || !entry.implementasi) return {};
				const parsed = parseImplementasiString(entry.implementasi, jenisNow);
				const daftarRelevant = buildCatatanGlobalList(parsed);
				const nomorRelevant = new Set(daftarRelevant.map(c => c.no.toString()));
				const hasil = {};
				Object.entries(stateImplementasi.catatanGlobal || {}).forEach(([no, val]) => {
					if (nomorRelevant.has(no.toString()) && val) hasil[no] = val;
				});
				return hasil;
			})()
		},
		checklist: { ...stateChecklist },
		poin: buildRincianPenilaian()
	};
}

function muatDariObj(obj) {
	if (!obj || typeof obj !== 'object') return false;
	try {
		App.setState({
			bangunan: { ...(obj.bangunan || {}) },
			implementasi: { ...(App.state.implementasi || {}), ...(obj.implementasi || {}) },
			checklist: { ...(obj.checklist || {}) }
		}, true);
		return true;
	} catch (e) {
		console.error('[muatDariObj] gagal:', e);
		return false;
	}
}

// ================= Validasi Struktur JSON Impor =================
function validateImportedState(obj) {
	const errors = [];
	if (!obj || typeof obj !== 'object') return { ok:false, errors:['Bukan objek JSON'] };
	if (obj.tipe !== 'bgc-penilaian') errors.push('tipe != "bgc-penilaian"');
	if (typeof obj.versi !== 'number') errors.push('versi harus number');
	if (!obj.bangunan || typeof obj.bangunan !== 'object') errors.push('bangunan hilang/invalid');
	else {
		if (typeof obj.bangunan.jenis !== 'string') errors.push('bangunan.jenis harus string');
		if (typeof obj.bangunan.klasifikasi !== 'string') errors.push('bangunan.klasifikasi harus string');
	}
	if (obj.implementasi && typeof obj.implementasi !== 'object') errors.push('implementasi harus objek jika ada');
	// Validasi ringan catatanGlobal & kategoriElemen jika ada
	if (obj.implementasi) {
		if (obj.implementasi.catatanGlobal && typeof obj.implementasi.catatanGlobal !== 'object') errors.push('implementasi.catatanGlobal harus object');
		if (obj.implementasi.kategoriElemen && typeof obj.implementasi.kategoriElemen !== 'object') errors.push('implementasi.kategoriElemen harus object');
	}
	// Checklist struktur dasar: parameter -> (array indeks) atau object dengan key numerik -> object indikator
	if (obj.checklist && typeof obj.checklist === 'object') {
		Object.entries(obj.checklist).forEach(([param, block]) => {
			if (Array.isArray(block)) {
				block.forEach((kriteria, idx) => {
					if (kriteria && typeof kriteria !== 'object') errors.push(`checklist.${param}[${idx}] bukan object`);
				});
			} else if (block && typeof block === 'object') {
				Object.entries(block).forEach(([kIdx, kriteria]) => {
					if (kriteria && typeof kriteria !== 'object') errors.push(`checklist.${param}.${kIdx} bukan object`);
				});
			} else {
				errors.push(`checklist.${param} harus array atau object`);
			}
		});
	}
	// Batasi jumlah error agar pesan ringkas
	const MAX_ERR = 6;
	let trimmed = errors;
	if (errors.length > MAX_ERR) trimmed = errors.slice(0, MAX_ERR).concat(`... ${errors.length - MAX_ERR} lainnya`);
	return { ok: errors.length === 0, errors: trimmed };
}

function muatLocal() {
	try {
		let obj = muatChunked(KUNCI_DATA);
		if (!obj) {
			obj = (typeof window !== 'undefined' && window.__cacheTerakhirBGC) ? window.__cacheTerakhirBGC : null;
		}
		if (!obj || typeof obj !== 'object') return;
		App.setState(obj, true);
		notifikasi('Dimuat');
	} catch (e) {
		console.error('Gagal muat data:', e);
		notifikasi('Gagal muat');
	}
}

function eksporJSON() {
	try {
		const data = snapshotState();
		const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		const ts = new Date().toISOString().replace(/[:]/g, '-');
		a.href = url;
		a.download = `bgc-penilaian-${ts}.json`;
		document.body.appendChild(a);
		a.click();
		setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
		notifikasi('Diekspor ke JSON');
	} catch (e) {
		console.error('[eksporJSON] gagal:', e);
		notifikasi('Gagal Ekspor');
	}
}

function toCSVRow(arr) {
	return arr.map(v => {
		if (v == null) return '';
		const s = String(v);
		if (/[",\n]/.test(s)) return '"' + s.replace(/"/g, '""') + '"';
		return s;
	}).join(',');
}

function eksporCSV() {
	try {
		const jenisNow = selectJenis ? selectJenis.value : '';
		const klasNow = selectKlasifikasi ? selectKlasifikasi.value : '';
		const header = ['Parameter', 'Kriteria Index', 'Indikator', 'Tipe', 'Pilihan/Checked', 'Poin Dasar', 'Multiplier(F)', 'Poin Akhir'];
		const rows = [toCSVRow(['Jenis', jenisNow]), toCSVRow(['Klasifikasi', klasNow]), '', toCSVRow(header)];
		let total = 0;
		const faktorKategori = kalkulator.getFaktorPengali(jenisNow, klasNow) || { w: 1, d: 1, s: 1 };
		Object.entries(penilaian).forEach(([kode, dataParam]) => {
			(dataParam.kriteriaUnjukKerja || []).forEach((kriteria, idxK) => {
				const elemenIndex = idxK + 1;
				const kat = (kode === 'F') ? ((stateImplementasi.kategoriElemen && stateImplementasi.kategoriElemen[elemenIndex]) || 's') : null;
				const mult = (kode === 'F') ? (parseFloat(faktorKategori[kat]) || 1) : 1;
				const stateK = stateChecklist[kode] && stateChecklist[kode][idxK];
				if (!stateK) return;
				Object.entries(stateK).forEach(([indikatorKey, val]) => {
					const detail = kriteria.indikator[indikatorKey];
					if (!detail) return;
					let base = 0; let akhir = 0; let pilihan = '';
					if (detail.tipe === 'checkbox') {
						base = detail.poin || 0; akhir = (kode === 'F') ? base * mult : base; pilihan = val ? 'true' : 'false';
					} else if (detail.tipe === 'radio') {
						pilihan = val; base = (detail.poin && (val in detail.poin)) ? (detail.poin[val] || 0) : 0; akhir = (kode === 'F') ? base * mult : base;
					}
					total += akhir;
					rows.push(toCSVRow([kode, elemenIndex, indikatorKey, detail.tipe, pilihan, base, (kode === 'F') ? mult : '', akhir]));
				});
			});
		});
		const maks = kalkulator.getTotalMaks();
		const persen = maks > 0 ? (total / maks * 100) : 0;
		rows.push('', toCSVRow(['Total Poin', total.toFixed(1)]), toCSVRow(['Poin Maks', maks]), toCSVRow(['Persentase', (Math.round(persen * 10) / 10).toFixed(1) + '%']));
		const csv = rows.join('\n');
		const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
		const url = URL.createObjectURL(blob);
		const a = document.createElement('a');
		const ts = new Date().toISOString().replace(/[:]/g, '-');
		a.href = url;
		a.download = `bgc-penilaian-${ts}.csv`;
		document.body.appendChild(a);
		a.click();
		setTimeout(() => { URL.revokeObjectURL(url); a.remove(); }, 0);
		notifikasi('Diekspor ke CSV');
	} catch (e) {
		console.error('[eksporCSV] gagal:', e);
		notifikasi('Gagal Ekspor CSV');
	}
}

function imporJSONDariFile(file) {
	if (!file) return;
	const reader = new FileReader();
	reader.onload = () => {
		try {
			const obj = JSON.parse(reader.result);
			const val = validateImportedState(obj);
			if (!val.ok) {
				console.warn('[imporJSON] validasi gagal:', val.errors);
				notifikasi('JSON tidak valid');
				return;
			}
			// Normalisasi checklist param array -> object numerik
			if (obj && obj.checklist) {
				Object.entries(obj.checklist).forEach(([param, block]) => {
					if (Array.isArray(block)) {
						const converted = {};
						block.forEach((kriteria, idx) => { if (kriteria && typeof kriteria === 'object' && Object.keys(kriteria).length) converted[idx] = kriteria; });
						obj.checklist[param] = converted;
					}
				});
			}
			const ok = muatDariObj(obj);
			if (ok) { notifikasi('Impor sukses'); setTimeout(() => { try { simpanLocal(true); } catch (_) { } }, 120); }
			else { notifikasi('Gagal Impor'); }
		} catch (e) {
			console.error('[imporJSON] parse gagal:', e);
			notifikasi('JSON tidak valid');
		}
	};
	reader.onerror = () => { notifikasi('Gagal membaca berkas'); };
	reader.readAsText(file);
}

function hapusLocal() { try { hapusDataTersimpan(); } catch (e) { console.error('[hapusLocal]', e); } }

let timerNotifikasi;
let lastToast = { msg: '', at: 0 };
function notifikasi(pesan, opsi = {}) {
	if (document.visibilityState === 'hidden' || opsi.senyap) return;
	const now = Date.now();
	if (lastToast.msg === pesan && (now - lastToast.at) < 1200) return;
	let ele = document.getElementById('toast');
	if (!ele) {
		ele = document.createElement('div');
		ele.id = 'toast';
		ele.setAttribute('role', 'status');
		ele.setAttribute('aria-live', 'polite');
			// Styling kini didefinisikan di CSS (#toast). Inline style dihapus untuk mendukung tema gelap.
		document.body.appendChild(ele);
	}
	ele.textContent = pesan;
	lastToast = { msg: pesan, at: now };
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

let tDebounce;
function debounceUpdate() {
	clearTimeout(tDebounce);
	tDebounce = setTimeout(() => {
		try { hitungDariChecklist(); } catch (_) { perbaruiRingkasan(); }
		try { simpanLocal(false); } catch (_) { }
	}, 280);
}


function pasangTouchHandlers() {
	const tombol = document.querySelectorAll('.btn');
	tombol.forEach(btn => {
		btn.addEventListener('touchstart', () => btn.classList.add('sentuh-aktif'), { passive: true });
		['touchend', 'touchcancel'].forEach(ev => btn.addEventListener(ev, () => btn.classList.remove('sentuh-aktif'), { passive: true }));
	});
}


let _eksporLastFocus = null;
function tutupMenuEkspor(kembalikanFokus = false) {
	if (menuEkspor && !menuEkspor.hidden) {
		menuEkspor.hidden = true;
		if (btnEkspor) btnEkspor.setAttribute('aria-expanded', 'false');
		if (kembalikanFokus && btnEkspor) {
			try { btnEkspor.focus(); } catch(_) {}
		}
	}
}

function toggleMenuEkspor() {
	if (!menuEkspor || !btnEkspor) return;
	const buka = menuEkspor.hidden;
	if (buka) _eksporLastFocus = document.activeElement;
	menuEkspor.hidden = !buka;
	btnEkspor.setAttribute('aria-expanded', buka ? 'true' : 'false');
	if (buka) {
		try {
			const r = btnEkspor.getBoundingClientRect();
			menuEkspor.style.position = 'absolute';
			menuEkspor.style.top = (window.scrollY + r.bottom + 4) + 'px';
			menuEkspor.style.left = (window.scrollX + r.left) + 'px';
			menuEkspor.style.minWidth = r.width + 'px';
		} catch (_) { }
		setTimeout(() => {
			const first = menuEkspor.querySelector('.menu-item');
			if (first) first.focus();
		}, 0);
	} else {
		if (_eksporLastFocus && typeof _eksporLastFocus.focus === 'function') {
			try { _eksporLastFocus.focus(); } catch(_) {}
		}
	}
}

document.addEventListener('click', (e) => {
	const t = e.target;
	if (!t) return;
	if (btnEkspor && t === btnEkspor) return; // handled in its own listener
	if (menuEkspor && (menuEkspor.contains(t))) return; // clicks inside menu
	tutupMenuEkspor();
}, true);

document.addEventListener('keydown', (e) => {
	if (e.key === 'Escape') tutupMenuEkspor();
});

function pasangAksiTombol() {
	// Jaga-jaga jika masih ada listener lama (versi sebelum dropdown) yang langsung ekspor JSON:
	// clone & replace untuk menghapus semua listener terdahulu.
	if (btnEkspor && !btnEkspor.dataset.dropdownApplied) {
		const baru = btnEkspor.cloneNode(true);
		btnEkspor.parentNode.replaceChild(baru, btnEkspor);
		btnEkspor = baru; // re-assign
		btnEkspor.dataset.dropdownApplied = '1';
	}
	if (btnEkspor && !btnEkspor.dataset.listener) {
		btnEkspor.addEventListener('click', (ev) => { ev.preventDefault(); toggleMenuEkspor(); });
		btnEkspor.dataset.listener = '1';
	}
	if (menuEkspor && !menuEkspor.dataset.listener) {
		// Klik pilih format
		menuEkspor.addEventListener('click', (e) => {
			const b = e.target && e.target.closest('.menu-item');
			if (!b) return;
			const fmt = b.getAttribute('data-format');
			if (fmt === 'json') eksporJSON();
			else if (fmt === 'csv') eksporCSV();
			tutupMenuEkspor(true);
		});
		// Navigasi keyboard (ArrowUp/Down, Home/End, Enter/Space)
		menuEkspor.addEventListener('keydown', (e) => {
			const key = e.key;
			const items = Array.from(menuEkspor.querySelectorAll('.menu-item'));
			if (!items.length) return;
			const aktif = document.activeElement;
			let idx = items.indexOf(aktif);
			if (key === 'ArrowDown') {
				e.preventDefault();
				idx = (idx + 1 + items.length) % items.length;
				items[idx].focus();
			} else if (key === 'ArrowUp') {
				e.preventDefault();
				idx = (idx - 1 + items.length) % items.length;
				items[idx].focus();
			} else if (key === 'Home') {
				e.preventDefault(); items[0].focus();
			} else if (key === 'End') {
				e.preventDefault(); items[items.length - 1].focus();
			} else if (key === 'Enter' || key === ' ') {
				if (aktif && aktif.classList.contains('menu-item')) {
					e.preventDefault(); aktif.click();
				}
			} else if (key === 'Tab') {
				// Tutup saat keluar dengan Tab
				if (!e.shiftKey && idx === items.length - 1) {
					// setelah item terakhir, tutup dan biarkan focus pindah natural
					tutupMenuEkspor();
				}
			}
		});
		menuEkspor.dataset.listener = '1';
	}
	// Gantikan aksi tombol impor menjadi buka modal upload custom
	if (btnImpor && !btnImpor.dataset.uploadModal) {
		btnImpor.addEventListener('click', (e) => {
			e.preventDefault();
			bukaModalUpload();
		});
		btnImpor.dataset.uploadModal = '1';
	}
	// Listener lama fileImpor (langsung impor) dihapus: impor dialihkan via modal (pasangUploadHandlers)
	if (btnReset) btnReset.addEventListener('click', () => {
		if (confirm('Hapus semua input dan data tersimpan?')) {
			resetSemua();
			notifikasi('Direset');
		}
	});
	if (btnHitung && !btnHitung.dataset.listener) {
		btnHitung.addEventListener('click', () => { hitungDariChecklist(); try { simpanLocal(true); } catch (_) { } notifikasi('Dihitung'); });
		btnHitung.dataset.listener = '1';
	}
/* CSV diekspor via dropdown menu */
}

// =============================
// Modal Upload Drag & Drop JSON
// =============================
let _modalUploadPrevFocus = null;
function bukaModalUpload() {
	const modal = document.getElementById('modal-upload');
	if (!modal) return;
	// Jika handler belum terpasang (misal race condition), pasang sekarang
	try {
		const dz = document.getElementById('upload-dropzone');
		if (dz && !dz.dataset.enhanced) {
			pasangUploadHandlers();
		}
	} catch(_) {}
	_modalUploadPrevFocus = document.activeElement;
	modal.setAttribute('aria-hidden', 'false');
	document.body.style.overflow = 'hidden';
	_setInertBackground(true);
	_pasangPerangkapFokus(modal);
	const dz = document.getElementById('upload-dropzone');
	if (dz) dz.focus();
	// Sinkronkan UI pilihan file (awal: kosong)
	try {
		if (window.__UPLOAD_CTX__) { window.__UPLOAD_CTX__.fileTerpilih = null; window.__UPLOAD_CTX__.sudahKonfirmasi = false; window.__UPLOAD_CTX__.validasi = null; window.__UPLOAD_CTX__.parsedObj = null; }
		if (typeof updateUploadSelectedUI === 'function') updateUploadSelectedUI(null);
	} catch(_) {}
	// Pastikan input file kosong agar event change tetap terpicu walau pilih berkas yang sama
	try { if (fileImpor) fileImpor.value = ''; } catch(_) {}
}
function tutupModalUpload(fokusKembali = true) {
	const modal = document.getElementById('modal-upload');
	if (!modal) return;
	modal.setAttribute('aria-hidden', 'true');
	document.body.style.overflow = '';
	_lepasPerangkapFokus(modal);
	_setInertBackground(false);
	// Bersihkan status & busy state
	try {
		const dz = document.getElementById('upload-dropzone');
		if (dz) { dz.classList.remove('dz-active','dz-busy','dz-error'); const load = dz.querySelector('.dz-loading'); if (load) load.hidden = true; }
		// Reset teks dropzone
		try { if (typeof updateUploadSelectedUI === 'function') updateUploadSelectedUI(null); } catch(_) {}
		if (fileImpor) fileImpor.value='';
		// Reset file terpilih (jika ada state di handler)
		try { if (window.__UPLOAD_CTX__) { window.__UPLOAD_CTX__.fileTerpilih = null; window.__UPLOAD_CTX__.sudahKonfirmasi = false; window.__UPLOAD_CTX__.validasi = null; window.__UPLOAD_CTX__.parsedObj = null; } } catch(_) {}
	} catch(_) {}
	if (fokusKembali && _modalUploadPrevFocus && typeof _modalUploadPrevFocus.focus === 'function') {
		try { _modalUploadPrevFocus.focus(); } catch(_) {}
	}
	_modalUploadPrevFocus = null;
}

function pasangUploadHandlers() {
	const dz = document.getElementById('upload-dropzone');
	const pilihBtn = document.getElementById('upload-pilih-btn');
	const modal = document.getElementById('modal-upload');
	// statusEl dihapus; gunakan notifikasi dan teks di dropzone untuk feedback
	if (!dz || !modal) return;

	// Helper untuk mengaktif/nonaktifkan tombol Muat
	function setLoadButtonEnabled(enabled) {
		try { if (pilihBtn) pilihBtn.disabled = !enabled; } catch(_) {}
	}

	// Helper untuk memperbarui UI berdasarkan file terpilih
	function updateUploadSelectedUI(fileObj) {
		try {
			const teks = dz && dz.querySelector('.dz-teks');
			const hint = dz && dz.querySelector('.dz-hint');
			const btnSpan = document.querySelector('#upload-pilih-btn span');
			if (!teks || !hint) return;
			if (fileObj && fileObj.name) {
				const kb = (fileObj.size/1024).toFixed(1);
				teks.textContent = `Dipilih: ${fileObj.name} (${kb} KB)`;
				// Tampilkan status validasi jika sudah ada
				let ctx = null; try { ctx = window.__UPLOAD_CTX__ || null; } catch(_) {}
				if (ctx && ctx.validasi) {
					if (ctx.validasi.ok) {
						hint.textContent = 'Valid. Klik tombol di bawah untuk memuat. Seret ulang untuk mengganti berkas.';
						if (dz) dz.classList.remove('dz-error');
						setLoadButtonEnabled(true);
					} else {
						const err = Array.isArray(ctx.validasi.errors) && ctx.validasi.errors[0] ? ctx.validasi.errors[0] : 'Tidak valid';
						hint.textContent = `Tidak valid: ${err}. Klik/seret untuk memilih berkas lain.`;
						if (dz) dz.classList.add('dz-error');
						setLoadButtonEnabled(false);
					}
				} else {
					hint.textContent = 'Memvalidasi berkas...';
					if (dz) dz.classList.remove('dz-error');
					setLoadButtonEnabled(false);
				}
				if (btnSpan) btnSpan.textContent = 'Muat Berkas';
			} else {
				teks.textContent = 'Seret berkas JSON ke sini, atau klik untuk memilih';
				hint.textContent = 'Hanya 1 berkas, format JSON hasil ekspor aplikasi ini.';
				if (btnSpan) btnSpan.textContent = 'Pilih Berkas JSON';
				if (dz) dz.classList.remove('dz-error');
				setLoadButtonEnabled(true);
			}
		} catch(_) {}
	}
	// Ekspos helper untuk dipakai di open/close
	try { window.updateUploadSelectedUI = updateUploadSelectedUI; } catch(_) {}

	// Context state untuk menyimpan pilihan file sementara sebelum dimuat
	if (!window.__UPLOAD_CTX__) window.__UPLOAD_CTX__ = { fileTerpilih: null, sudahKonfirmasi: false, validasi: null, parsedObj: null };
	const CTX = window.__UPLOAD_CTX__;
	// Hidden file input (reuse existing fileImpor) untuk fallback pilih
	if (pilihBtn && fileImpor) {
		pilihBtn.addEventListener('click', () => {
			if (CTX.fileTerpilih) {
				// Jika sudah ada file terpilih, ini bertindak sebagai tombol MUAT
				if (prosesSedang) return;
				if (!CTX.validasi || !CTX.validasi.ok) { setStatus('Berkas belum lolos validasi', 'error'); return; }
				const f = CTX.fileTerpilih;
				// Konfirmasi sebelum memuat
				const adaChecklist = !!(App && App.state && App.state.checklist && Object.keys(App.state.checklist).length);
				const adaBangunan = !!(App && App.state && App.state.bangunan && (App.state.bangunan.jenis || App.state.bangunan.klasifikasi));
				const adaImpl = !!(App && App.state && App.state.implementasi && App.state.implementasi.catatanGlobal && Object.keys(App.state.implementasi.catatanGlobal).length);
				const msg = `Muat data dari "${f.name}"?\nTindakan ini akan mengganti isian yang sudah ada.`;
				if (adaChecklist || adaBangunan || adaImpl) {
					const ok = window.confirm(msg);
					if (!ok) { setStatus('Dibatalkan', ''); return; }
				}
				// Tandai sudah konfirmasi agar handle tidak menanyakan lagi
				CTX.sudahKonfirmasi = true;
				handleFileSelected(f);
				return;
			}
				// Belum ada file → buka file picker
			try { fileImpor.value = ''; } catch(_) {}
			fileImpor.click();
		});
	}
	if (fileImpor && !fileImpor.dataset.uploadExtra) {
		fileImpor.addEventListener('change', () => {
			const f = fileImpor.files && fileImpor.files[0];
			if (!f) return;
			const err = validateFile(f);
			if (err) { setStatus(err, 'error'); notifikasi('Gagal: ' + err); CTX.fileTerpilih = null; CTX.validasi = null; CTX.parsedObj = null; updateUploadSelectedUI(null); return; }
			CTX.fileTerpilih = f; CTX.validasi = null; CTX.parsedObj = null;
			setStatus(`Berkas dipilih: ${f.name} (${(f.size/1024).toFixed(1)} KB)`, '');
			updateUploadSelectedUI(f);
			// Pre-validasi: baca & cek struktur
			try {
				setBusy();
				const reader = new FileReader();
				reader.onload = () => {
					try {
						const txt = reader.result;
						let obj;
						try { obj = JSON.parse(txt); } catch (e) {
							CTX.validasi = { ok:false, errors:['Format JSON tidak valid'] };
							CTX.parsedObj = null; updateUploadSelectedUI(f); return;
						}
						const val = validateImportedState(obj);
						CTX.validasi = val;
						CTX.parsedObj = val.ok ? obj : null;
						updateUploadSelectedUI(f);
						if (!val.ok) try { notifikasi('Berkas tidak valid'); } catch(_) {}
					} catch (e) {
						console.error('[upload] validasi gagal:', e);
						CTX.validasi = { ok:false, errors:['Kesalahan saat validasi'] };
						CTX.parsedObj = null; updateUploadSelectedUI(f);
					} finally { resetBusy(); }
				};
				reader.onerror = () => { CTX.validasi = { ok:false, errors:['Gagal membaca berkas'] }; CTX.parsedObj = null; updateUploadSelectedUI(f); resetBusy(); };
				reader.readAsText(f);
			} catch (e) { console.error('[upload] exception validate:', e); CTX.validasi = { ok:false, errors:['Kesalahan tak terduga'] }; CTX.parsedObj = null; updateUploadSelectedUI(f); resetBusy(); }
		});
		fileImpor.dataset.uploadExtra = '1';
	}

	// ===== Robust drag state management =====
	let dragCounter = 0;
	function setHighlight(on) {
		if (!dz) return; if (on) dz.classList.add('dz-active'); else dz.classList.remove('dz-active');
	}
	function resetBusy() {
		if (!dz) return; dz.classList.remove('dz-busy'); const load = dz.querySelector('.dz-loading'); if (load) load.hidden = true;
	}
	function setBusy() {
		if (!dz) return; dz.classList.add('dz-busy'); const load = dz.querySelector('.dz-loading'); if (load) load.hidden = false;
	}
	function setStatus(msg, tipe) {
		// Sederhanakan: tampilkan toast untuk error/sukses; info ringan bisa diabaikan agar tidak bising
		if (!msg) return;
		if (tipe === 'error' || tipe === 'sukses') { try { notifikasi(msg); } catch(_) {} }
	}
	function validateFile(f) {
		if (!f) return 'Berkas tidak ditemukan';
		if (!/\.json$/i.test(f.name)) return 'Ekstensi bukan .json';
		if (f.type && f.type !== 'application/json' && f.type !== 'text/json' && f.type !== 'application/octet-stream') {
			// masih izinkan sebagian, tapi beri peringatan ringan
			console.info('[upload] MIME tidak standar:', f.type);
		}
		const MAX = 5 * 1024 * 1024; // 5MB batas wajar
		if (f.size > MAX) return 'Ukuran > 5MB';
		return null;
	}
	let prosesSedang = false;
	function handleFileSelected(f) {
		if (prosesSedang) { setStatus('Sedang memproses, tunggu...', ''); return; }
		const err = validateFile(f);
		if (err) { setStatus(err, 'error'); notifikasi('Gagal: ' + err); return; }
		// Jika sudah tervalidasi & ada parsedObj, gunakan langsung
		if (window.__UPLOAD_CTX__ && window.__UPLOAD_CTX__.validasi && window.__UPLOAD_CTX__.validasi.ok && window.__UPLOAD_CTX__.parsedObj) {
			setStatus('Menerapkan data...', ''); setBusy(); prosesSedang = true;
			try {
				const ok = muatDariObj(window.__UPLOAD_CTX__.parsedObj);
				if (ok) { setStatus('Impor sukses', 'sukses'); notifikasi('Impor sukses'); setTimeout(() => tutupModalUpload(), 350); }
				else { throw new Error('Gagal menerapkan state'); }
			} catch (e) {
				console.error('[upload] gagal apply parsed:', e);
				setStatus(e.message || 'Gagal menerapkan', 'error'); notifikasi('Gagal Impor');
			} finally { resetBusy(); prosesSedang = false; if (fileImpor) fileImpor.value=''; }
			return;
		}
		setStatus('Memuat & memvalidasi JSON...', ''); setBusy(); prosesSedang = true;
		// Gunakan FileReader existing melalui imporJSON tetapi bungkus try-catch dan status
		try {
			const reader = new FileReader();
			reader.onload = () => {
				try {
					const txt = reader.result;
					let obj;
					try { obj = JSON.parse(txt); } catch (e) { throw new Error('Format JSON tidak valid'); }
					const val = validateImportedState(obj);
					if (!val.ok) { throw new Error('Struktur tidak valid: ' + val.errors.join(', ')); }
					// Normalisasi checklist jika masih array
					if (obj && obj.checklist) {
						Object.entries(obj.checklist).forEach(([param, block]) => {
							if (Array.isArray(block)) {
								const c = {}; block.forEach((k, i) => { if (k && typeof k === 'object' && Object.keys(k).length) c[i] = k; });
								obj.checklist[param] = c;
							}
						});
					}
					const ok = muatDariObj(obj);
					if (ok) { setStatus('Impor sukses', 'sukses'); notifikasi('Impor sukses'); setTimeout(() => tutupModalUpload(), 350); }
					else { throw new Error('Gagal menerapkan state'); }
				} catch (e) {
					console.error('[upload] gagal:', e);
					setStatus(e.message || 'Gagal memproses', 'error'); notifikasi('Gagal Impor');
				} finally { resetBusy(); prosesSedang = false; if (fileImpor) fileImpor.value=''; }
			};
			reader.onerror = () => { setStatus('Gagal membaca berkas', 'error'); resetBusy(); prosesSedang = false; notifikasi('Baca gagal'); };
			reader.readAsText(f);
		} catch(e) {
			console.error('[upload] exception:', e); setStatus('Kesalahan tak terduga', 'error'); resetBusy(); prosesSedang = false;
		}
	}

	['dragenter','dragover'].forEach(ev => dz.addEventListener(ev, (e) => {
		e.preventDefault(); e.stopPropagation();
		dragCounter++;
		setHighlight(true);
	},{ passive:false }));
	['dragleave','dragend'].forEach(ev => dz.addEventListener(ev, (e) => {
		if (dragCounter > 0) dragCounter--;
		if (dragCounter === 0) setHighlight(false);
	},{ passive:true }));
	dz.addEventListener('drop', (e) => {
		e.preventDefault(); e.stopPropagation(); dragCounter = 0; setHighlight(false);
		const files = e.dataTransfer && e.dataTransfer.files;
		if (!files || !files.length) { setStatus('Tidak ada berkas', 'error'); updateUploadSelectedUI(null); return; }
		if (files.length > 1) setStatus('Hanya gunakan 1 berkas, dipakai pertama', '');
		const f = files[0];
		const err = validateFile(f);
		if (err) { setStatus(err, 'error'); CTX.fileTerpilih = null; CTX.validasi = null; CTX.parsedObj = null; updateUploadSelectedUI(null); return; }
		CTX.fileTerpilih = f; CTX.validasi = null; CTX.parsedObj = null;
		setStatus(`Berkas dipilih: ${f.name} (${(f.size/1024).toFixed(1)} KB)`, '');
		updateUploadSelectedUI(f);
		// Pre-validasi setelah drop
		try {
			setBusy();
			const reader = new FileReader();
			reader.onload = () => {
				try {
					const txt = reader.result;
					let obj;
					try { obj = JSON.parse(txt); } catch (e) { CTX.validasi = { ok:false, errors:['Format JSON tidak valid'] }; CTX.parsedObj = null; updateUploadSelectedUI(f); return; }
					const val = validateImportedState(obj);
					CTX.validasi = val;
					CTX.parsedObj = val.ok ? obj : null;
					updateUploadSelectedUI(f);
					if (!val.ok) try { notifikasi('Berkas tidak valid'); } catch(_) {}
				} catch (e) {
					console.error('[upload] validasi gagal:', e);
					CTX.validasi = { ok:false, errors:['Kesalahan saat validasi'] };
					CTX.parsedObj = null; updateUploadSelectedUI(f);
				} finally { resetBusy(); }
			};
			reader.onerror = () => { CTX.validasi = { ok:false, errors:['Gagal membaca berkas'] }; CTX.parsedObj = null; updateUploadSelectedUI(f); resetBusy(); };
			reader.readAsText(f);
		} catch (e) { console.error('[upload] exception validate:', e); CTX.validasi = { ok:false, errors:['Kesalahan tak terduga'] }; CTX.parsedObj = null; updateUploadSelectedUI(f); resetBusy(); }
	});
	dz.addEventListener('click', () => {
		if (prosesSedang) return;
		// Klik area dropzone selalu menawarkan pilih file baru (reselect), meski sudah ada fileTerpilih
		try { if (fileImpor) fileImpor.value = ''; } catch(_) {}
		if (fileImpor) fileImpor.click();
	});
	dz.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!prosesSedang) pilihBtn && pilihBtn.click(); } });

    // Catatan: walaupun tombol dimatikan saat invalid, pengguna masih bisa klik area dropzone atau tekan Enter/Space di dropzone untuk memilih ulang berkas.

	// Tombol tutup / backdrop
	modal.addEventListener('click', (e) => {
		const t = e.target;
		if (!t) return;
		if (t.matches('[data-close="modal-upload"], .modal-backdrop')) {
			e.preventDefault(); tutupModalUpload();
		}
	}, true);
	// Escape handler khusus (hindari multi listener tiap re-init)
	if (!modal.dataset.esc) {
		document.addEventListener('keydown', (e) => { if (modal.getAttribute('aria-hidden') === 'false' && e.key === 'Escape') tutupModalUpload(); });
		modal.dataset.esc = '1';
	}
	dz.dataset.enhanced = '1';
}


function resetSemua() {
	try { hapusLocal(); } catch (_) { }
	stateChecklist = {};
	if (kalkulator) kalkulator.nilaiParameter = {};
	document.querySelectorAll('#parameter-checklist input[type=checkbox], #parameter-checklist input[type=radio]').forEach(inp => { inp.checked = false; });

	if (selectJenis) selectJenis.value = '';
	if (selectKlasifikasi) selectKlasifikasi.value = '';
	if (jenisGroup) jenisGroup.querySelectorAll('input[type=radio][name="__jenis_rb"]').forEach(rb => rb.checked = false);
	if (klasGroup) klasGroup.querySelectorAll('input[type=radio][name="__klas_rb"]').forEach(rb => rb.checked = false);

	if (totalSkorEl) totalSkorEl.textContent = '0';
	if (totalMaksEl) totalMaksEl.textContent = kalkulator ? kalkulator.getTotalMaks() : '0';
	if (persentaseEl) persentaseEl.textContent = '0%';
	if (progressEl) { progressEl.value = 0; progressEl.setAttribute('aria-valuenow', '0'); }
	if (peringkatEl) { peringkatEl.textContent = '-'; peringkatEl.dataset.level = '-'; peringkatEl.className = 'badge-klasifikasi badge-belum'; }
	const warn = document.getElementById('peringkat-warning');
	if (warn) warn.hidden = true;

	stateImplementasi = { catatanGlobal: {}, kategoriElemen: {} };
	const implSection = document.getElementById('implementasi-section');
	if (implSection) implSection.hidden = true;
	const catWrap = document.getElementById('catatan-global-wrapper');
	if (catWrap) {
		catWrap.querySelectorAll('input[type=checkbox][data-catatan-global]').forEach(cb => cb.checked = false);

		const paramF = document.querySelector('.pc-parameter[data-param="F"]');
		if (paramF) { const lama = paramF.querySelector('#f-elemen-kategori-wrapper'); if (lama) lama.remove(); }
		catWrap.hidden = true;
	}

	document.querySelectorAll('[data-claimed-base]').forEach(el => el.textContent = '0');
	document.querySelectorAll('[data-claimed-mult]').forEach(el => el.textContent = '0.0');
	document.querySelectorAll('[data-claimed-multiplier]').forEach(el => el.textContent = 'x1.0');
	try { perbaruiBadgeElemenF(); } catch (_) {}
	try { tandaiIndikatorWajib(); } catch (_) {}
	try { perbaruiPoinIndikator(); } catch (_) {}
	try { perbaruiRingkasan(); } catch (_) {}
	try { perbaruiJudulHalaman(); } catch (_) {}

	// Matikan Mode Ringkas sepenuhnya (state + UI)
	try {
		// Update tombol (header chip)
		if (btnRingkas) {
			btnRingkas.setAttribute('aria-pressed', 'false');
			btnRingkas.classList.remove('aktif');
			btnRingkas.title = 'Mode Ringkas: tampilkan hanya indikator yang belum terisi';
		}
		// Hapus kelas filter pada konten
		const root = document.getElementById('parameter-checklist');
		if (root) {
			root.classList.remove('ringkas-aktif');
			root.querySelectorAll('.sembunyi-ringkas').forEach(el => el.classList.remove('sembunyi-ringkas'));
			root.querySelectorAll('.muncul-ringkas').forEach(el => el.classList.remove('muncul-ringkas'));
		}
	} catch (_) {}

	try {
		App.setState({
			bangunan: { jenis: '', klasifikasi: '' },
			checklist: {},
			implementasi: { catatanGlobal: {}, kategoriElemen: {} },
			modeRingkas: false
		}, true);
	} catch (_) {}
}

let kalkulator;
function init() {
	if (typeof penilaian !== 'object') {
		console.warn('Objek penilaian tidak ditemukan (tabel.js belum dimuat?)');
		return;
	}
	kalkulator = new KalkulatorBGC(penilaian);

	gunakanModeChecklist(true);
	pasangChecklistListeners();
	pastikanJenisTerisi();
	pasangHandlerBangunan();

	renderImplementasi();
	pasangAksiTombol();
	pasangTouchHandlers();

	muatLocal();
	perbaruiRingkasan();
	try { terapkanOpenParams(); } catch (_) {}
	if (versiEl) versiEl.textContent = '1.2.1';
	console.info('[init] selesai');
}

function setupPreventZoom() {

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

			meta.setAttribute('content', kontenFocus);
		}
	};
	const handlerBlur = (e) => {
		const t = e && e.target;
		if (isFormTarget(t)) {

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
		if (target && typeof target === 'object' && typeof target.matches === 'function' && target.matches('input[type=number], input, select, textarea')) {

			const det = target.closest('details');
			if (det && !det.open) det.open = true;

			setTimeout(() => gerakHalus(target), 180);
		}
	}, true);
}

function optimisasiPerforma() {

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

function pasangAutosaveGlobalListeners() {
	try {
		const formEl = document.getElementById('form-penilaian');
		if (formEl) {
			formEl.addEventListener('input', debounceUpdate, true);
			formEl.addEventListener('change', debounceUpdate, true);
		}
		document.addEventListener('toggle', (e) => {
			const d = e && e.target;
			if (d && d.matches && d.matches('details.pc-parameter')) {
				debounceUpdate();
			}
		}, true);
		window.addEventListener('beforeunload', () => {
			try { hitungDariChecklist(); } catch (_) { }
			try { simpanLocal(true); } catch (_) { }
			try { notifikasi('', { senyap: true }); } catch (_) { }
		});
		document.addEventListener('visibilitychange', () => {
			if (document.visibilityState === 'hidden') {
				try { hitungDariChecklist(); } catch (_) { }
				try { simpanLocal(true); } catch (_) { }
				try { notifikasi('', { senyap: true }); } catch (_) { }
			}
		});
	} catch (_) { }
}

function aktifkanLiteModeJikaPerlu() {
	const nav = navigator || {};
	const conn = nav.connection || nav.mozConnection || nav.webkitConnection;
	const saveData = !!(conn && conn.saveData);
	const is2G = !!(conn && /2g/i.test(conn.effectiveType || ''));
	const downlinkLow = !!(conn && typeof conn.downlink === 'number' && conn.downlink > 0 && conn.downlink < 1.2);
	const cpuLow = typeof nav.hardwareConcurrency === 'number' && nav.hardwareConcurrency > 0 && nav.hardwareConcurrency <= 2;
	const memLow = typeof nav.deviceMemory === 'number' && nav.deviceMemory > 0 && nav.deviceMemory <= 2;
	const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
	if (saveData || is2G || downlinkLow || cpuLow || memLow || prefersReducedMotion) {
		document.documentElement.setAttribute('data-lite', 'true');
		try { window.__LITE_MODE__ = true; } catch (_) { }

		const linkFonts = document.getElementById('fonts-css');
		if (linkFonts) linkFonts.disabled = true;

		try { window.__HYDRATION_DELAY__ = 300; } catch (_) { }
	}
}

const ric = window.requestIdleCallback || function (fn) { return setTimeout(() => fn({ timeRemaining: () => 1, didTimeout: false }), 1); };
const cRic = window.cancelIdleCallback || function (id) { clearTimeout(id); };

function jadwalkanHydrationRingan() {
	const sections = Array.from(document.querySelectorAll('.pc-parameter'));
	let i = 2;
	function step(deadline) {
		const delay = (typeof window.__HYDRATION_DELAY__ === 'number') ? window.__HYDRATION_DELAY__ : 0;
		while (i < sections.length && deadline.timeRemaining() > 4) {
			renderIsiParameter(sections[i]);
			i++;
			if (delay) break; // hydrate satu per siklus bila lite mode
		}
		if (i < sections.length) {
			if (delay) setTimeout(() => ric(step), delay);
			else ric(step);
		}
	}
	ric(step);
}

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
		if (tombolTema) {
			// Ganti ikon di chip: matahari untuk beralih ke terang
			const ikon = tombolTema.querySelector('i');
			if (ikon) ikon.className = 'fa-solid fa-sun';
			tombolTema.setAttribute('aria-label', 'Beralih ke tema terang');
			tombolTema.setAttribute('title', 'Tema Terang');
			tombolTema.setAttribute('aria-pressed', 'true');
		}
		if (metaTheme) metaTheme.setAttribute('content', '#0b1220');
	} else {
		root.removeAttribute('data-tema');
		if (tombolTema) {
			// Ganti ikon di chip: bulan untuk beralih ke gelap
			const ikon = tombolTema.querySelector('i');
			if (ikon) ikon.className = 'fa-solid fa-moon';
			tombolTema.setAttribute('aria-label', 'Beralih ke tema gelap');
			tombolTema.setAttribute('title', 'Tema Gelap');
			tombolTema.setAttribute('aria-pressed', 'false');
		}
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

const initAsli = init;
document.addEventListener('DOMContentLoaded', () => {
	initAsli();
	optimisasiMobileInit();
	aktifkanLiteModeJikaPerlu();
	muatTemaAwal();
	pasangToggleTema();
	pasangAutosaveGlobalListeners();
	try { pasangUploadHandlers(); } catch(_) {}

	function sejajarkanHeaderJudul() {
		try {
			const btn = document.getElementById('btn-menu');
			const judul = document.querySelector('.app-bar h1');
			if (!btn || !judul) return;
			judul.style.transform = 'none';
			const rBtn = btn.getBoundingClientRect();
			const rJudul = judul.getBoundingClientRect();
			const cs = getComputedStyle(judul);
			let lineHeight = parseFloat(cs.lineHeight);
			if (!lineHeight || isNaN(lineHeight)) {
				const fontSize = parseFloat(cs.fontSize) || 16;
				lineHeight = fontSize * 1.2;
			}
			const lines = Math.round(rJudul.height / lineHeight);
			if (lines < 2) return;
			const selisih = rJudul.top - rBtn.top;
			if (Math.abs(selisih) > 0.5) {
				judul.style.transform = `translateY(${-selisih}px)`;
			}
		} catch (_) { }
	}
	requestAnimationFrame(() => sejajarkanHeaderJudul());
	setTimeout(sejajarkanHeaderJudul, 300);
	window.addEventListener('resize', sejajarkanHeaderJudul, { passive: true });
	window.addEventListener('orientationchange', () => setTimeout(sejajarkanHeaderJudul, 60), { passive: true });
	try {
		const btnMenu = document.getElementById('btn-menu');
		const nav = document.getElementById('param-nav');
		const navRingkas = document.getElementById('param-nav-ringkas');
		const posisikanNavTerhadapBurger = () => {
			if (!btnMenu || !document.body.classList.contains('nav-open')) return;
			const br = btnMenu.getBoundingClientRect();
			const vw = document.documentElement.clientWidth || window.innerWidth || 0;
			const atur = (ele) => {
				if (!ele) return;
				const nr = ele.getBoundingClientRect();
				const navW = Math.round(nr.width || ele.offsetWidth || 0);
				const burgerCenterX = br.left + (br.width / 2);
				let left = Math.round(burgerCenterX - navW / 2);
				const margin = 8;
				if (left < margin) left = margin;
				if (left + navW > vw - margin) left = Math.max(margin, vw - margin - navW);
				ele.style.left = left + 'px';
				ele.style.right = 'auto';
			};
			atur(navRingkas);
			atur(nav);

			// Stack vertically: place param-nav just below param-nav-ringkas
			try {
				if (navRingkas && nav) {
					const rr = navRingkas.getBoundingClientRect();
					const gap = 10; // extra spacing between the two stacks
					const paramTop = Math.max(0, Math.round(rr.top + rr.height + gap));
					nav.style.top = paramTop + 'px';
					// Also adjust max-height to prevent off-screen overflow
					const bottomMargin = 16; // breathing room near bottom
					const maxH = Math.max(100, Math.round((window.innerHeight || document.documentElement.clientHeight || 0) - paramTop - bottomMargin));
					nav.style.maxHeight = maxH + 'px';
				}
			} catch(_) { }
		};
		const openNav = () => {
			document.body.classList.add('nav-open');
			if (btnMenu) { btnMenu.setAttribute('aria-expanded', 'true'); btnMenu.setAttribute('aria-label', 'Tutup navigasi'); }
			requestAnimationFrame(() => {
				posisikanNavTerhadapBurger();
				// Fokus ke chip tema (baru) untuk akses cepat; fallback ke chip ringkas
				try {
					const chipTema = document.getElementById('chip-tema');
					if (chipTema) chipTema.focus(); else {
						const chip = document.getElementById('chip-ringkas');
						if (chip) chip.focus();
					}
				} catch(_) {}
			});
		};
		const closeNav = () => {
			document.body.classList.remove('nav-open');
			if (btnMenu) { btnMenu.setAttribute('aria-expanded', 'false'); btnMenu.setAttribute('aria-label', 'Buka navigasi'); }
			if (nav) { nav.style.left = ''; nav.style.right = ''; nav.style.top = ''; nav.style.maxHeight = ''; }
			if (navRingkas) { navRingkas.style.left = ''; navRingkas.style.right = ''; }
		};
		const toggleNav = () => { document.body.classList.contains('nav-open') ? closeNav() : openNav(); };

		let jadwalAutoNav = null;
		function evaluasiAutoNav() {
			if (!nav) return;
			const main = document.getElementById('utama');
			if (!main) return;
			const semulaOpen = document.body.classList.contains('nav-open');
			if (!semulaOpen) {
				if (nav) nav.style.visibility = 'hidden';
				if (navRingkas) navRingkas.style.visibility = 'hidden';
				document.body.classList.add('nav-open');
				requestAnimationFrame(() => lakukanEvaluasi(semulaOpen));
			} else {
				requestAnimationFrame(() => lakukanEvaluasi(semulaOpen));
			}
			function lakukanEvaluasi(semulaOpenFlag) {
				try {
					posisikanNavTerhadapBurger();
					const nr = nav.getBoundingClientRect();
					const mr = main.getBoundingClientRect();
					const overlap = !(nr.right <= mr.left || nr.left >= mr.right);
					if (overlap) {
						closeNav();
					} else {
						openNav();
					}
				} catch (_) { }
				finally {
					if (nav) nav.style.visibility = '';
					if (navRingkas) navRingkas.style.visibility = '';
				}
			}
		}
		function jadwalkanEvaluasiAutoNav() {
			if (jadwalAutoNav) cancelAnimationFrame(jadwalAutoNav);
			jadwalAutoNav = requestAnimationFrame(() => evaluasiAutoNav());
		}
		requestAnimationFrame(jadwalkanEvaluasiAutoNav);
		setTimeout(jadwalkanEvaluasiAutoNav, 180);
		window.addEventListener('resize', jadwalkanEvaluasiAutoNav, { passive: true });
		window.addEventListener('orientationchange', () => setTimeout(jadwalkanEvaluasiAutoNav, 80), { passive: true });
		if (btnMenu) btnMenu.addEventListener('click', toggleNav, { passive: true });
		document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeNav(); });
		document.addEventListener('click', (e) => {
			const t = e.target;
			if (!t) return;
			if (document.body.classList.contains('nav-open')) {
				const withinNav = (nav && nav.contains(t)) || (navRingkas && navRingkas.contains(t));
				const withinBtn = btnMenu && btnMenu.contains(t);
				if (!withinNav && !withinBtn) closeNav();
			}
		}, true);
		window.addEventListener('resize', () => { if (document.body.classList.contains('nav-open')) requestAnimationFrame(posisikanNavTerhadapBurger); });
		window.addEventListener('orientationchange', () => { if (document.body.classList.contains('nav-open')) setTimeout(() => posisikanNavTerhadapBurger(), 50); });
	} catch (_) { }

	try {
		const setAppbarH = () => {
			const ab = document.querySelector('.app-bar');
			if (ab) {
				const h = Math.round(ab.getBoundingClientRect().height);
				document.documentElement.style.setProperty('--appbar-h', h + 'px');
			}
		};
		setAppbarH();
		if (document.fonts && document.fonts.ready) {
			document.fonts.ready.then(() => {
				requestAnimationFrame(() => {
					setAppbarH();
					try { samakanLebarJenisJikaWrap(); } catch (_) { }
				});
			}).catch(() => { });
		}
		window.addEventListener('load', () => setTimeout(setAppbarH, 60), { once: true });
	} catch (_) { }

	try {
		let rafId;
		const syncAppbarHeight = () => {
			cancelAnimationFrame(rafId);
			rafId = requestAnimationFrame(() => {
				const ab2 = document.querySelector('.app-bar');
				if (ab2) {
					const hh = Math.round(ab2.getBoundingClientRect().height);
					document.documentElement.style.setProperty('--appbar-h', hh + 'px');
				}
			});
		};
		window.addEventListener('resize', syncAppbarHeight);
		window.addEventListener('orientationchange', syncAppbarHeight);
	} catch (_) { }

	if ('serviceWorker' in navigator) {
		try {
			const proto = (location && location.protocol) ? location.protocol : '';
			const host = (location && location.hostname) ? location.hostname : '';
			const isHttps = proto === 'https:';
			const isLocalhost = host === 'localhost' || host === '127.0.0.1' || host === '::1';
			if (isHttps || isLocalhost) {
				navigator.serviceWorker.register('./sw.js')
					.then(reg => console.info('[SW] registered', reg && reg.scope ? `scope: ${reg.scope}` : ''))
					.catch(err => console.warn('[SW] gagal daftar', err));
			} else {
				console.info('[SW] dilewati: protokol tidak didukung untuk SW:', proto || 'null');
			}
		} catch (e) { console.warn('[SW] gagal daftar', e); }
	}

	if (!sudahIsiJenis) {
		console.info('[DOMContentLoaded] retry isiJenisBangunan langsung');
		isiJenisBangunan();
	}

	try { jadwalkanHydrationRingan(); } catch (_) { }
}, { once: true });

// =============================
// UI: Samakan lebar radio "Jenis Bangunan" bila terjadi wrap
// =============================
function samakanLebarJenisJikaWrap() {
	try {
		const grup = document.getElementById('jenis-bangunan-group');
		if (!grup) return;
		const pills = Array.from(grup.querySelectorAll('label.radio-pill'));
		if (pills.length < 2) return;

		// Reset width sebelum ukur
		pills.forEach(p => { p.style.width = ''; p.style.minWidth = ''; });

		const getOpsitek = (pill) => pill.querySelector('.opsi-teks') || pill;
		const isWrap = (el) => {
			const cs = window.getComputedStyle(el);
			let lh = parseFloat(cs.lineHeight);
			if (!lh || isNaN(lh)) { const fs = parseFloat(cs.fontSize) || 16; lh = fs * 1.2; }
			const h = el.getBoundingClientRect().height;
			return h > lh * 1.25; // ambang aman untuk mendeteksi >1 baris
		};

		const info = pills.map(p => ({ pill: p, teks: getOpsitek(p), wrap: false, val: (p.querySelector('input') || {}).value || '' }));
		info.forEach(i => { i.wrap = isWrap(i.teks); i.width = Math.ceil(i.pill.getBoundingClientRect().width); });

		const adaWrap = info.some(i => i.wrap);
		if (!adaWrap) return; // tidak ada wrap – biarkan apa adanya

		// Targetkan kasus umum: Non-BGN wrap lebih dulu → samakan lebar BGN
		const non = info.find(i => i.val === 'Non-BGN');
		const bgn = info.find(i => i.val === 'BGN');
		if (non && bgn && non.wrap && !bgn.wrap) {
			bgn.pill.style.minWidth = non.width + 'px';
			return;
		}

		// General fallback: samakan ke lebar maksimum di antara yang wrap
		const maxW = Math.max(...info.map(i => i.width));
		info.filter(i => !i.wrap).forEach(i => { i.pill.style.minWidth = maxW + 'px'; });
	} catch (_) { }
}

// Jalankan saat jendela berubah ukuran/orientasi
window.addEventListener('resize', buatThrottle(() => samakanLebarJenisJikaWrap(), 120));
window.addEventListener('orientationchange', () => setTimeout(() => samakanLebarJenisJikaWrap(), 80));

