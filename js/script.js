// Smooth scrolling navigation
document.addEventListener('DOMContentLoaded', function() {
  // Handle navigation clicks
  document.querySelectorAll('[data-scroll-to]').forEach(function(element) {
    element.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('data-scroll-to');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        // Remove active class from all navigation items
        document.querySelectorAll('.nav-link').forEach(function(navItem) {
          navItem.classList.remove('active');
        });
        
        // Add active class to clicked item
        this.classList.add('active');
        
        // Close mobile navbar if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        const navbarToggler = document.querySelector('.navbar-toggler');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          navbarToggler.click();
        }
        
        // Smooth scroll to target with offset for fixed navbar
        const headerOffset = 100; // Account for fixed navbar height
        const elementPosition = targetElement.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
  
  // Update active navigation on scroll
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('[id^="parameter-"], [id="data-bangunan"], [id="hasil-penilaian"]');
    const navLinks = document.querySelectorAll('[data-scroll-to]');
    
    let currentSection = null;
    const scrollPosition = window.pageYOffset + 150; // Adjusted for navbar
    
    sections.forEach(function(section) {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });
    
    // Update navigation active states
    navLinks.forEach(function(link) {
      link.classList.remove('active');
      if (link.getAttribute('data-scroll-to') === currentSection) {
        link.classList.add('active');
      }
    });
  });
  
  // Make radio buttons unselectable (allow deselection)
  let lastSelectedRadio = {};
  
  document.querySelectorAll('input[type="radio"]').forEach(function(radio) {
    radio.addEventListener('click', function() {
      const radioName = this.name;
      
      // If this radio was already selected, unselect it
      if (lastSelectedRadio[radioName] === this) {
        this.checked = false;
        lastSelectedRadio[radioName] = null;
        
        // Trigger change event for point calculation
        this.dispatchEvent(new Event('change'));
      } else {
        // Track the newly selected radio
        lastSelectedRadio[radioName] = this;
      }
    });
    
    // Track initially selected radios
    if (radio.checked) {
      lastSelectedRadio[radio.name] = radio;
    }
  });
});

// Function to show/hide BGN classification
document.querySelectorAll('input[name="kepemilikan"]').forEach(radio => {
    radio.addEventListener('change', function() {
        const bgnContainer = document.getElementById('klasifikasiBgnContainer');
        const nonBgnContainer = document.getElementById('klasNonBgnContainer');
        
        if (this.value === 'BGN') {
            bgnContainer.style.display = 'block';
            nonBgnContainer.style.display = 'none';
        } else {
            bgnContainer.style.display = 'none';
            nonBgnContainer.style.display = 'block';
        }
    });
});

// Function to calculate points for a parameter
function calculateParameterPoints(parameter) {
    let total = 0;
    
    // Try multiple selectors to find inputs
    const selectors = [
        `#parameter-${parameter.toLowerCase()} input[type="checkbox"]:checked`,
        `#parameter-${parameter.toLowerCase()} input[type="radio"]:checked`,
        `#parameter${parameter} input[type="checkbox"]:checked`,
        `#parameter${parameter} input[type="radio"]:checked`
    ];
    
    selectors.forEach(selector => {
        const inputs = document.querySelectorAll(selector);
        inputs.forEach(input => {
            const value = parseInt(input.value) || 0;
            total += value;
            console.log(`Found input with value: ${value} (selector: ${selector})`);
        });
    });
    
    console.log(`Parameter ${parameter} total: ${total}`);
    return total;
}

// Function to update individual point displays
function updateIndividualPoints() {
    // Get all point display elements
    const pointDisplays = document.querySelectorAll('.point-display');
    
    pointDisplays.forEach(display => {
        const id = display.id;
        
        // Extract the input name from the point display id
        // For example: pointDeteksiBencana -> deteksi_bencana
        let inputName = '';
        
        // Map point display IDs to their corresponding input names
        const idToNameMap = {
            // Parameter A
            'pointVerifikasi': 'integritas_verifikasi',
            'pointDokumentasi': 'integritas_dokumentasi',
            'pointRedundansiPersen': 'redundansi_persen',
            'pointFailover': 'failover',
            'pointAnalisisLog': 'analisis_log',
            'pointDeteksiAnomali': 'deteksi_anomali',
            'pointKontrolAkses': 'kontrol_akses',
            'pointSegmentasiJaringan': 'segmentasi_jaringan',
            'pointPemantauanJaringan': 'pemantauan_jaringan',
            'pointEnkripsiStandar': 'enkripsi_standar',
            'pointEnkripsiSensitif': 'enkripsi_sensitif',
            'pointAutentikasiBerhasil': 'autentikasi_berhasil',
            'pointWaktuAutentikasi': 'waktu_autentikasi',
            'pointLoggingAktivitas': 'logging_aktivitas',
            // Parameter B
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
            'pointThroughput5g': 'throughput_5g',
            'pointPortLayanan': 'port_layanan',
            'pointPatchPanel': 'patch_panel',
            'pointModularJack': 'modular_jack',
            'pointPatchCord': 'patch_cord',
            'pointBandwidth': 'bandwidth',
            'pointResponsPaket': 'respons_paket',
            'pointKehilanganPaket': 'kehilangan_paket',
            'pointVariasiWaktu': 'variasi_waktu',
            'pointPrioritasiData': 'prioritasi_data',
            'pointEfisiensiAlokasi': 'efisiensi_alokasi',
            // Parameter C
            'pointSinkronisasiBms': 'sinkronisasi_bms',
            'pointMonitoringBms': 'monitoring_bms',
            'pointKompatibilitasBms': 'kompatibilitas_bms',
            'pointAkuisisiData': 'akuisisi_data',
            'pointKonsistensiData': 'konsistensi_data',
            'pointKepatuhanData': 'kepatuhan_data',
            'pointPemrosesanData': 'pemrosesan_data',
            'pointKatalogData': 'katalog_data',
            'pointStandarTerbuka': 'standar_terbuka',
            // Parameter D
            'pointKebijakan': 'kebijakan',
            'pointTugasTanggungJawab': 'tugas_tanggungjawab',
            'pointProsedur': 'prosedur',
            'pointPemenuhanPosisi': 'pemenuhan_posisi',
            'pointKompetensi': 'kompetensi',
            'pointPelatihan': 'frekuensi_pelatihan',
            'pointPengawasan': 'frekuensi_audit',
            // Parameter E
            'pointEnergi': 'penurunan_energi',
            'pointAir': 'penurunan_air',
            'pointKepuasan': 'kepuasan_penghuni',
            // Parameter F
            'pointDeteksiBencana': 'deteksi_bencana',
            'pointPemantauanKomponen': 'pemantauan_komponen',
            'pointPelaporanOtomatis': 'pelaporan_otomatis',
            'pointEnkripsiDVR': 'enkripsi_dvr',
            'pointStreamingVideo': 'streaming_video',
            'pointResolusiKamera': 'resolusi_kamera',
            'pointDeteksiGerakan': 'deteksi_gerakan',
            'pointDeteksiObjek': 'deteksi_objek',
            'pointPerekamanOtomatis': 'perekaman_otomatis',
            'pointWaktuResponsAkses': 'waktu_respons_akses',
            'pointAkurasiVerifikasi': 'akurasi_verifikasi',
            'pointAntipassback': 'antipassback',
            'pointPengaturanAkses': 'pengaturan_akses',
            'pointPerhitunganPenghuni': 'perhitungan_penghuni',
            'pointDeaktivasiKredensial': 'deaktivasi_kredensial',
            'pointKualitasVideo': 'kualitas_video',
            'pointKompatibilitasFormat': 'kompatibilitas_format',
            'pointProtokolTerbuka': 'protokol_terbuka',
            'pointJumlahData': 'jumlah_data',
            'pointPenjadwalanStreaming': 'penjadwalan_streaming',
            'pointPoeAktif': 'poe_aktif',
            'pointPoePasif': 'poe_pasif',
            'pointPemantauanAudio': 'pemantauan_audio',
            'pointPoeAudioAktif': 'poe_audio_aktif',
            'pointPoeAudioPasif': 'poe_audio_pasif',
            'pointTriplePlay': 'triple_play',
            'pointSinyalDistribusi': 'sinyal_distribusi',
            'pointAkurasiPengukuran': 'akurasi_pengukuran',
            'pointKontrolOtomatis': 'kontrol_otomatis',
            'pointLaporanEnergi': 'laporan_energi',
            'pointDemandResponse': 'demand_response',
            'pointAlarmAnomali': 'alarm_anomali',
            'pointUptimePencahayaan': 'uptime_pencahayaan',
            'pointKontrolOtomatisPencahayaan': 'kontrol_otomatis_pencahayaan',
            'pointPemantauanPencahayaan': 'pemantauan_pencahayaan',
            'pointPengondisianUdara': 'pemantauan_parameter',
            'pointResponsVentilasi': 'respons_ventilasi',
            'pointDeteksiUdaraLuar': 'deteksi_udara_luar',
            'pointKontrolOtomatisVentilasi': 'kontrol_otomatis_ventilasi',
            'pointPrediksiVentilasi': 'prediksi_ventilasi',
            'pointMeterAir': 'meter_air',
            'pointDeteksiKebocoran': 'deteksi_kebocoran',
            'pointResponsDebit': 'respons_debit',
            'pointPembersihanOtomatis': 'pembersihan_otomatis',
            'pointResponsKatup': 'respons_katup',
            'pointPemantauanKualitasAir': 'pemantauan_kualitas',
            'pointDeteksiKontaminasi': 'deteksi_kontaminasi',
            'pointOptimisasiDistribusi': 'optimisasi_distribusi',
            'pointResponsVolume': 'respons_volume',
            'pointAkurasiKetinggian': 'akurasi_ketinggian',
            'pointPenggelontoran': 'penggelontoran',
            'pointResponsKebocoranLimbah': 'respons_kebocoran',
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
        
        inputName = idToNameMap[id];
        
        if (inputName) {
            // Calculate points for this specific indicator
            let points = 0;
            const checkedInputs = document.querySelectorAll(`input[name="${inputName}"]:checked`);
            
            checkedInputs.forEach(input => {
                points += parseInt(input.value) || 0;
            });
            
            display.textContent = points;
        }
    });
}

// Function to update parameter display
function updateParameterDisplay(parameter, points) {
    const maxPoints = {
        'A': 192, 'B': 318, 'C': 228, 'D': 114, 'E': 96, 'F': 768
    };
    
    const percentage = Math.round((points / maxPoints[parameter]) * 100);
    
    // Update subtotal display
    const subtotalElement = document.getElementById(`subtotal${parameter}`);
    if (subtotalElement) subtotalElement.textContent = points;
    
    // Update detail table
    const detailElement = document.getElementById(`detail${parameter}`);
    const persenElement = document.getElementById(`persen${parameter}`);
    
    if (detailElement) detailElement.textContent = points;
    if (persenElement) persenElement.textContent = percentage + '%';
    
    console.log(`Updated parameter ${parameter}: ${points}/${maxPoints[parameter]} (${percentage}%)`);
}

// Simplified function to calculate total points and classification - FIXED VERSION
function calculateTotal() {
    console.log('=== STARTING CALCULATION ===');
    let total = 0;
    const parameters = ['A', 'B', 'C', 'D', 'E', 'F'];
    
    // Calculate points for each parameter
    parameters.forEach(param => {
        // Try to find all checked inputs in the parameter section
        let parameterTotal = 0;
        
        // Multiple approaches to find inputs
        const parameterSection = document.getElementById(`parameter-${param.toLowerCase()}`);
        if (parameterSection) {
            const checkedInputs = parameterSection.querySelectorAll('input:checked');
            checkedInputs.forEach(input => {
                const value = parseInt(input.value) || 0;
                parameterTotal += value;
                console.log(`Found input in Parameter ${param}: value=${value}, name=${input.name}`);
            });
        } else {
            console.log(`Parameter section ${param} not found!`);
        }
        
        console.log(`Parameter ${param} total: ${parameterTotal}`);
        total += parameterTotal;
        
        // Update parameter display
        updateParameterDisplay(param, parameterTotal);
    });
    
    console.log(`TOTAL POINTS: ${total}`);
    
    // Fixed total max points calculation
    const totalMaxPoints = 1716; // A:192 + B:318 + C:228 + D:114 + E:96 + F:768
    const percentage = total > 0 ? Math.round((total / totalMaxPoints) * 100) : 0;
    
    console.log(`Percentage: ${percentage}%`);
    
    // Update total displays with explicit null checks
    try {
        const totalPoinElement = document.getElementById('totalPoin');
        if (totalPoinElement) {
            totalPoinElement.textContent = total;
            console.log('Updated totalPoin');
        } else {
            console.error('totalPoin element not found!');
        }
        
        const persentasePencapaianElement = document.getElementById('persentasePencapaian');
        if (persentasePencapaianElement) {
            persentasePencapaianElement.textContent = percentage + '%';
            console.log('Updated persentasePencapaian');
        } else {
            console.error('persentasePencapaian element not found!');
        }
        
        const detailTotalElement = document.getElementById('detailTotal');
        if (detailTotalElement) {
            detailTotalElement.textContent = total;
            console.log('Updated detailTotal');
        } else {
            console.error('detailTotal element not found!');
        }
        
        const persenTotalElement = document.getElementById('persenTotal');
        if (persenTotalElement) {
            persenTotalElement.textContent = percentage + '%';
            console.log('Updated persenTotal');
        } else {
            console.error('persenTotal element not found!');
        }
        
        // Update classification
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
            klasifikasiElement.className = 'display-3 bgc-classification ' + classType;
            console.log(`Updated classification: ${classification}`);
        } else {
            console.error('klasifikasiBGC element not found!');
        }
        
    } catch (error) {
        console.error('Error updating displays:', error);
    }
    
    console.log('=== CALCULATION FINISHED ===');
}

// Add event listeners to all form inputs
document.addEventListener('DOMContentLoaded', function() {
    // Load saved data from localStorage on page load
    loadSavedData();
    
    // Add listeners for all radio buttons and checkboxes
    const allInputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"], input[type="text"], input[type="number"]');
    
    allInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Save data to localStorage whenever an input changes
            saveDataToLocalStorage();
            
            // Recalculate everything
            setTimeout(() => {
                updateIndividualPoints();
                calculateTotal();
            }, 10);
        });
    });
    
    // Initial calculation after a short delay to ensure DOM is ready
    setTimeout(() => {
        updateIndividualPoints();
        calculateTotal();
    }, 100);
});

// Function to save all form data to localStorage
function saveDataToLocalStorage() {
    const formData = {};
    
    // Save all input values
    const allInputs = document.querySelectorAll('input[type="radio"], input[type="checkbox"], input[type="text"], input[type="number"]');
    
    allInputs.forEach(input => {
        if (input.type === 'radio' || input.type === 'checkbox') {
            formData[input.id] = input.checked;
        } else {
            formData[input.id] = input.value;
        }
    });
    
    // Save to localStorage
    localStorage.setItem('bgc-calculator-data', JSON.stringify(formData));
    
    // Show auto-save indicator (optional)
    showAutoSaveIndicator();
}

// Function to load saved data from localStorage
function loadSavedData() {
    const savedData = localStorage.getItem('bgc-calculator-data');
    
    if (savedData) {
        try {
            const formData = JSON.parse(savedData);
            
            // Restore all input values
            Object.keys(formData).forEach(inputId => {
                const input = document.getElementById(inputId);
                if (input) {
                    if (input.type === 'radio' || input.type === 'checkbox') {
                        input.checked = formData[inputId];
                    } else {
                        input.value = formData[inputId];
                    }
                }
            });
            
            // Trigger change events for dependent elements (like BGN classification display)
            const kepemilikanInputs = document.querySelectorAll('input[name="kepemilikan"]');
            kepemilikanInputs.forEach(input => {
                if (input.checked) {
                    input.dispatchEvent(new Event('change'));
                }
            });
            
            console.log('Data berhasil dimuat dari penyimpanan browser');
        } catch (error) {
            console.error('Error loading saved data:', error);
        }
    }
}

// Function to show auto-save indicator
function showAutoSaveIndicator(message = '✓ Tersimpan otomatis') {
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

// Function to clear saved data
function clearSavedData() {
    if (confirm('Apakah Anda yakin ingin menghapus semua data tersimpan dari browser?')) {
        localStorage.removeItem('bgc-calculator-data');
        alert('Data tersimpan telah dihapus dari browser');
    }
}

// Reset form function
function resetForm() {
    if (confirm('Apakah Anda yakin ingin mereset semua data? Data tersimpan di browser juga akan dihapus.')) {
        // Uncheck all inputs
        document.querySelectorAll('input[type="checkbox"], input[type="radio"]').forEach(input => {
            input.checked = false;
        });
        
        // Clear text and number inputs
        document.querySelectorAll('input[type="text"], input[type="number"]').forEach(input => {
            input.value = '';
        });
        
        // Hide classification containers
        document.getElementById('klasifikasiBgnContainer').style.display = 'none';
        document.getElementById('klasNonBgnContainer').style.display = 'none';
        
        // Clear localStorage
        localStorage.removeItem('bgc-calculator-data');
        
        // Reset all displays
        document.querySelectorAll('[id^="subtotal"], [id^="detail"], [id^="persen"]').forEach(el => {
            el.textContent = el.id.startsWith('persen') ? '0%' : '0';
        });
        
        // Reset point displays
        document.querySelectorAll('.point-display').forEach(el => {
            el.textContent = '0';
        });
        
        // Reset total displays
        document.getElementById('totalPoin').textContent = '0';
        document.getElementById('persentasePencapaian').textContent = '0%';
        document.getElementById('klasifikasiBGC').textContent = 'Belum Dinilai';
        document.getElementById('klasifikasiBGC').className = 'display-3 bgc-classification';
        
        alert('Semua data telah direset dan dihapus dari penyimpanan browser');
    }
}

// Calculate BGC function - recalculates everything
function calculateBGC() {
    console.log('Memulai kalkulasi ulang BGC...');
    
    // Directly calculate totals
    calculateTotal();
    updateIndividualPoints();
    
    // Show feedback
    showAutoSaveIndicator('Kalkulasi selesai!');
    console.log('Kalkulasi BGC selesai');
}

// Force calculation function for manual testing
function forceCalculation() {
    console.log('FORCING CALCULATION...');
    
    // Force update all individual points first
    updateIndividualPoints();
    
    // Then calculate total
    calculateTotal();
    
    // Show feedback
    showAutoSaveIndicator('Perhitungan dipaksa selesai!');
    
    alert('Perhitungan telah dipaksa dijalankan! Cek console untuk detail.');
}

// Test debug function
function testDebug() {
    console.log('=== DEBUG TEST ===');
    
    // Check if elements exist
    const parameters = ['A', 'B', 'C', 'D', 'E', 'F'];
    parameters.forEach(param => {
        const section = document.getElementById(`parameter-${param.toLowerCase()}`);
        console.log(`Parameter ${param} section exists:`, !!section);
        
        if (section) {
            const inputs = section.querySelectorAll('input[type="checkbox"], input[type="radio"]');
            const checkedInputs = section.querySelectorAll('input[type="checkbox"]:checked, input[type="radio"]:checked');
            console.log(`Parameter ${param} - Total inputs: ${inputs.length}, Checked: ${checkedInputs.length}`);
            
            checkedInputs.forEach((input, index) => {
                console.log(`  Input ${index + 1}: value=${input.value}, name=${input.name}`);
            });
        }
    });
    
    // Check if display elements exist
    const displayElements = ['totalPoin', 'persentasePencapaian', 'klasifikasiBGC'];
    displayElements.forEach(elementId => {
        const element = document.getElementById(elementId);
        console.log(`Element ${elementId} exists:`, !!element);
        if (element) {
            console.log(`  Current content: "${element.textContent}"`);
        }
    });
    
    console.log('=== END DEBUG ===');
    alert('Debug selesai! Cek console untuk detail.');
}

// Export to PDF function (placeholder)
function exportToPDF() {
    alert('Fitur ekspor ke PDF akan tersedia segera!');
}

// Add event listeners to buttons if they exist
document.addEventListener('DOMContentLoaded', function() {
    const resetBtn = document.getElementById('resetBtn');
    const clearDataBtn = document.getElementById('clearDataBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const forceBtn = document.getElementById('forceBtn');
    const testBtn = document.getElementById('testBtn');
    const exportBtn = document.getElementById('exportBtn');
    
    if (resetBtn) resetBtn.addEventListener('click', resetForm);
    if (clearDataBtn) clearDataBtn.addEventListener('click', clearSavedData);
    if (calculateBtn) calculateBtn.addEventListener('click', calculateBGC);
    if (forceBtn) forceBtn.addEventListener('click', forceCalculation);
    if (testBtn) testBtn.addEventListener('click', testDebug);
    if (exportBtn) exportBtn.addEventListener('click', exportToPDF);
});
