const fs = require('fs');
const { bgcPerformanceCriteria: criteria } = require('./bgc-performance-criteria.js');

// Utility function to create safe HTML IDs
const createId = (text) => text.toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');

// Generate radio button HTML
const generateRadioHTML = (criteriaName, indicatorText, points, index) => {
    const nameAttr = createId(`${criteriaName}_${indicatorText}`);
    const id = `${nameAttr}_${index}`;
    
    return `
                              <div class="form-check">
                                <input class="form-check-input" type="radio" name="${nameAttr}" id="${id}" value="${points}">
                                <label class="form-check-label" for="${id}">
                                  ${indicatorText} (${points} poin)
                                </label>
                              </div>`;
};

// Generate table header
const generateTableHeader = () => `
                        <tr>
                          <th style="width: 5%">No.</th>
                          <th style="width: 40%">Kriteria</th>
                          <th style="width: 40%">Indikator</th>
                          <th style="width: 15%">Poin</th>
                        </tr>`;

// Parameter configuration
const PARAMETER_CONFIG = [
    'KEAMANAN SIBER', 
    'PROTOKOL DAN JARINGAN KOMUNIKASI', 
    'INTEGRASI DATA DAN SISTEM', 
    'MANAJEMEN OPERASI', 
    'DAMPAK', 
    'KEMAMPUAN SISTEM'
];

// Generate parameter HTML
const generateParameterHTML = (parameterKey, parameterData) => {
    let html = generateTableHeader();
    let rowNumber = 1;
    
    Object.entries(parameterData).forEach(([criteriaName, indicators]) => {
        const radioButtons = Object.entries(indicators)
            .map(([indicatorText, points], index) => 
                generateRadioHTML(criteriaName, indicatorText, points, index))
            .join('');
        
        html += `
                        <tr>
                          <td class="text-center fw-bold">${rowNumber}</td>
                          <td class="fw-semibold">${criteriaName}</td>
                          <td>
                            <div class="radio-group">
${radioButtons}
                            </div>
                          </td>
                          <td class="text-center">
                            <span class="point-display" id="point${createId(criteriaName)}">0</span>
                          </td>
                        </tr>`;
        
        rowNumber++;
    });
    
    // Add subtotal row
    const paramIndex = PARAMETER_CONFIG.indexOf(parameterKey);
    const paramLetter = String.fromCharCode(65 + paramIndex);
    
    html += `
                        <tr class="table-secondary">
                          <td colspan="3" class="text-end fw-bold">Subtotal Poin Parameter ${paramLetter}</td>
                          <td class="text-center fw-bold">
                            <span class="fs-5 text-primary" id="subtotal${paramLetter}">0</span>
                          </td>
                        </tr>`;
    
    return html;
};

// Results table configuration
const RESULTS_CONFIG = [
    { letter: 'A', name: 'Keamanan Siber', maxPoints: 390 },
    { letter: 'B', name: 'Protokol & Jaringan Komunikasi', maxPoints: 318 },
    { letter: 'C', name: 'Integrasi Data & Sistem', maxPoints: 255 },
    { letter: 'D', name: 'Manajemen Operasi', maxPoints: 177 },
    { letter: 'E', name: 'Dampak', maxPoints: 96 },
    { letter: 'F', name: 'Kemampuan Sistem', maxPoints: 774 }
];

// Generate results table HTML
const generateResultsTableHTML = () => {
    const headerRow = `
                    <tr>
                      <th>Parameter</th>
                      <th>Poin Diperoleh</th>
                      <th>Poin Maksimal</th>
                      <th>Persentase</th>
                    </tr>`;
    
    const parameterRows = RESULTS_CONFIG.map(({ letter, name, maxPoints }) => `
                    <tr>
                      <td>Parameter ${letter}: ${name}</td>
                      <td class="text-center" id="detail${letter}">0</td>
                      <td class="text-center">${maxPoints}</td>
                      <td class="text-center" id="persen${letter}">0%</td>
                    </tr>`).join('');
    
    const totalRow = `
                    <tr class="table-dark">
                      <td class="fw-bold">TOTAL</td>
                      <td class="text-center fw-bold" id="detailTotal">0</td>
                      <td class="text-center fw-bold">2010</td>
                      <td class="text-center fw-bold" id="persenTotal">0%</td>
                    </tr>`;
    
    return headerRow + parameterRows + totalRow;
};

// Action buttons configuration
const ACTION_BUTTONS = [
    { id: 'resetBtn', class: 'btn-danger', icon: 'fa-redo', text: 'Reset Semua' },
    { id: 'clearDataBtn', class: 'btn-warning', icon: 'fa-trash', text: 'Hapus Data Tersimpan' },
    { id: 'calculateBtn', class: 'btn-success', icon: 'fa-calculator', text: 'Hitung Ulang' },
    { id: 'forceBtn', class: 'btn-primary', icon: 'fa-bolt', text: 'Paksa Hitung' },
    { id: 'testBtn', class: 'btn-secondary', icon: 'fa-bug', text: 'Debug Test' },
    { id: 'exportBtn', class: 'btn-info', icon: 'fa-file-pdf', text: 'Export PDF' }
];

// Generate action buttons HTML
const generateActionButtonsHTML = () => 
    ACTION_BUTTONS.map(({ id, class: btnClass, icon, text }) => `
                    <button type="button" class="btn ${btnClass} me-2 mb-2" id="${id}">
                      <i class="fas ${icon} me-1"></i> ${text}
                    </button>`).join('');

// Classification options
const BGN_CLASSES = ['Kelas 1', 'Kelas 2', 'Kelas 3'];
const NON_BGN_CLASSES = ['Sederhana', 'Tidak Sederhana', 'Khusus'];

// Generate classification radio buttons
const generateClassificationHTML = (name, classes, prefix) => 
    classes.map((className, index) => {
        const id = `${prefix}${className.replace(/\s+/g, '')}`;
        return `
                        <div class="form-check">
                          <input class="form-check-input" type="radio" name="${name}" id="${id}" value="${className}">
                          <label class="form-check-label" for="${id}">${className}</label>
                        </div>`;
    }).join('');

// Generate BGN classification HTML
const generateBGNClassificationHTML = () => 
    generateClassificationHTML('klasifikasiBGN', BGN_CLASSES, 'bgnKelas');

// Generate Non-BGN classification HTML
const generateNonBGNClassificationHTML = () => 
    generateClassificationHTML('kelasNonBGN', NON_BGN_CLASSES, 'nonBgn');

// Main execution
const htmlContent = fs.readFileSync('./baru.html', 'utf8');

// Parameter mapping
const parameters = PARAMETER_CONFIG.reduce((acc, key, index) => {
    acc[String.fromCharCode(65 + index)] = criteria[key];
    return acc;
}, {});

let updatedHTML = htmlContent;

// Update Parameter A (example - can be extended for other parameters)
const parameterAHTML = generateParameterHTML('KEAMANAN SIBER', parameters['A']);
updatedHTML = updatedHTML.replace(
    /<!-- Parameter A: Keamanan Siber -->[\s\S]*?<thead>\s*<\/thead>\s*<tbody>\s*<\/tbody>/,
    `<!-- Parameter A: Keamanan Siber -->
              <fieldset class="parameter-section" id="parameter-a">
                <legend class="parameter-legend">
                  <span class="parameter-title">
                    <i class="fas fa-shield-alt me-2"></i>Parameter A: Keamanan Siber
                  </span>
                  <span class="badge bg-primary text-white">390 Poin</span>
                </legend>
                <div class="px-3 px-md-4 pb-4">
                  <div class="table-responsive">
                    <table class="table align-middle">
                      <thead>${parameterAHTML}</thead>
                      <tbody>
                      </tbody>`
);

console.log('✅ HTML generation script refactored successfully!');
console.log('📝 Usage: node generate-html.js');
