// --- Global Constants & Configs ---
const DEFAULT_BACKGROUND_IMAGE_URL = 'https://static.tildacdn.com/tild3364-3164-4862-b135-396663353236/Background.png';
const LOGO_IMAGE_URL = 'https://static.tildacdn.com/tild3239-6438-4235-a166-343836353232/Logo.svg';
const HOLO_IMAGE_URL = 'https://static.tildacdn.com/tild3161-6561-4931-a566-323966633562/Holo_1.png';
const STAMP_IMAGE_URL = 'https://static.tildacdn.com/tild3363-3937-4735-a634-656561376366/stamp_1_1.png';

const A4_WIDTH_PX = 842;
const A4_HEIGHT_PX = 595;

// --- Data Holders (will be populated from JSON) ---
let translations = {}; // Changed from const to let
let courseData = {};   // Changed from const to let

// --- DOM Element References (ensure all are captured) ---
const a4Page = document.getElementById('a4Page');
const backgroundImageElement = document.getElementById('backgroundImage');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const htmlPageSection = document.querySelector('.html-page-section');
const dateInput = document.getElementById('dateInputField');
const line2Input = document.getElementById('line2');
const courseSelect = document.getElementById('courseSelect');
const levelSelect = document.getElementById('levelSelect');
const languageControl = document.getElementById('languageControl');
const toggleStampInput = document.getElementById('toggleStamp');
const stampImageElement = document.getElementById('stampImage');
const dateTextElement = document.getElementById('dateDisplay');
const line2TextElement = document.getElementById('line2Text');
const line3TextElement = document.getElementById('line3Text');
const customTextAreaElement = document.getElementById('customTextArea');
const ceoTextElement = document.getElementById('ceo');
const caption2TextElement = document.getElementById('caption2');
const certificateTitleElement = document.getElementById('myh1');
const levelElement = document.getElementById('level');
const ceoCaptionElement = document.getElementById('ceo-caption');
const textXxsElement = document.getElementById('text-xxs');
const messageBox = document.getElementById('messageBox');
const messageBoxText = document.getElementById('messageBoxText');
const messageBoxCloseBtn = document.getElementById('messageBoxCloseBtn');
const logoImageElement = document.getElementById('logoImage');
const holoImageElement = document.getElementById('holoImage');

// --- Initial Page Setup ---
// Ensure a4Page is not null before setting style (it should exist)
if (a4Page) {
    a4Page.style.width = `${A4_WIDTH_PX}px`;
    a4Page.style.height = `${A4_HEIGHT_PX}px`;
}

// --- Data Fetching ---
async function loadExternalData() {
    try {
        const [translationsResponse, courseDataResponse] = await Promise.all([
            fetch('translations.json'), // Assumes files are in the same directory as index.html
            fetch('courseData.json')
        ]);

        if (!translationsResponse.ok) {
            throw new Error(`Failed to load translations.json: ${translationsResponse.statusText} (status ${translationsResponse.status})`);
        }
        if (!courseDataResponse.ok) {
            throw new Error(`Failed to load courseData.json: ${courseDataResponse.statusText} (status ${courseDataResponse.status})`);
        }

        translations = await translationsResponse.json();
        courseData = await courseDataResponse.json();
        console.log("Translations and course data loaded successfully.");
    } catch (error) {
        console.error("Error loading external data:", error);
        if (typeof showMessageBox === 'function') {
            showMessageBox(`Critical error: Could not load required data files. ${error.message}. Please try refreshing the page or check file paths.`);
        } else {
            alert(`Critical error: Could not load required data files. ${error.message}. Please try refreshing the page or check file paths.`);
        }
        throw error;
    }
}

// --- Utility Functions ---
// (scaleA4Page, showMessageBox - keep existing versions, ensure they don't rely on data before it's loaded)
// Make sure scaleA4Page is robust if a4Page or a4Page.parentElement is null on initial calls
function scaleA4Page() {
    if (a4Page && a4Page.parentElement) {
        const containerWidth = a4Page.parentElement.clientWidth - (15 * 2);
        const scale = Math.min(1, containerWidth / A4_WIDTH_PX);
        a4Page.style.transform = `scale(${scale})`;
        a4Page.style.marginBottom = `${(A4_HEIGHT_PX * scale) - A4_HEIGHT_PX}px`;
    }
}

function showMessageBox(message) {
    if (messageBoxText && messageBox) {
        messageBoxText.textContent = message;
        messageBox.classList.remove('hidden');
    } else {
        alert(message); // Fallback if messageBox elements aren't ready
    }
}


// --- Localization ---
// (setLanguage - keep existing, ensure it uses the global 'translations' variable)
function setLanguage(lang) {
    if (!translations || !Object.keys(translations).length || !translations[lang]) {
        console.error(`Translations for language '${lang}' not found or translations not loaded.`);
        // Optionally, try to load default UI text if this happens early
        return;
    }
    // ... rest of the function
    const currentTranslations = translations[lang];
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (currentTranslations[key]) {
            if (element.id === 'myh1' && certificateTitleElement) {
                 certificateTitleElement.textContent = currentTranslations[key];
            } else {
                element.textContent = currentTranslations[key];
            }
        }
    });
    document.querySelectorAll('[data-lang-placeholder-key]').forEach(element => {
        const key = element.getAttribute('data-lang-placeholder-key');
        if (currentTranslations[key]) {
            element.placeholder = currentTranslations[key];
        }
    });
    if (languageControl && languageControl.children) {
        Array.from(languageControl.children).forEach(button => {
            button.classList.toggle('active', button.dataset.lang === lang);
        });
    }

    if (toggleStampInput) {
        if (lang === 'ru') {
            toggleStampInput.checked = true;
        } else if (lang === 'en') {
            toggleStampInput.checked = false;
        }
        updateStampVisibility();
    }

    populateCourses(); // This function depends on translations and courseData
    localStorage.setItem('lang', lang);
}

// --- Course & Level Logic ---
// (populateCourses, populateLevels, updateCourseAndTopicsDisplay - keep existing, ensure they use global 'translations' and 'courseData')
function populateCourses() {
    const currentLang = document.querySelector('.segment-control button.active')?.dataset.lang;
    if (!currentLang || !translations || !Object.keys(translations).length || !translations[currentLang] || !courseData || !Object.keys(courseData).length) {
        console.error("Cannot populate courses: language data or course data not loaded.");
        if(courseSelect) courseSelect.innerHTML = '<option value="">Error loading courses</option>';
        return;
    }
    // ... rest of the function
    courseSelect.innerHTML = `<option value="">${translations[currentLang].selectCourseOption}</option>`;
    let coursesForLang = {};

    // This logic might need to be more robust depending on how courseData keys are structured vs. language
    if (currentLang === 'ru') {
        coursesForLang = {
            "Графический дизайн в редакторе FIGMA": courseData["Графический дизайн в редакторе FIGMA"],
            "Веб-разработка": courseData["Веб-разработка"]
        };
    } else if (currentLang === 'en') {
        coursesForLang = {
            "Graphic Design in Figma": courseData["Graphic Design in Figma"],
            "Web Development": courseData["Web Development"]
        };
    } else {
         Object.keys(courseData).forEach(key => {
            // Attempt a generic fallback if courses are not strictly tied to ru/en keys
            if (courseData[key] && (key.toLowerCase().includes("figma") || key.toLowerCase().includes("web"))) {
                coursesForLang[key] = courseData[key];
            }
         });
    }

    for (const courseName in coursesForLang) {
        if (coursesForLang.hasOwnProperty(courseName)) {
            const option = document.createElement('option');
            option.value = courseName;
            option.textContent = courseName;
            courseSelect.appendChild(option);
        }
    }

    const savedCourse = localStorage.getItem('selectedCourse-' + currentLang);
    if (savedCourse && coursesForLang.hasOwnProperty(savedCourse)) {
        courseSelect.value = savedCourse;
    } else if (Object.keys(coursesForLang).length > 0) {
        courseSelect.value = Object.keys(coursesForLang)[0];
    } else {
        courseSelect.value = '';
    }
    populateLevels();
}

function populateLevels() {
    const currentLang = document.querySelector('.segment-control button.active')?.dataset.lang;
     if (!currentLang || !translations || !Object.keys(translations).length || !translations[currentLang] || !courseData || !Object.keys(courseData).length) {
        console.error("Cannot populate levels: language data or course data not loaded.");
        if(levelSelect) levelSelect.innerHTML = '<option value="">Error loading levels</option>';
        return;
    }
    // ... rest of the function
    levelSelect.innerHTML = `<option value="">${translations[currentLang].selectLevelOption}</option>`;
    const selectedCourse = courseSelect.value;
    let levelsForCourse = {};

    if (selectedCourse && courseData[selectedCourse]) {
        levelsForCourse = courseData[selectedCourse];
    }

    for (const levelName in levelsForCourse) {
         if (levelsForCourse.hasOwnProperty(levelName)) {
            const option = document.createElement('option');
            option.value = levelName;
            option.textContent = levelName;
            levelSelect.appendChild(option);
        }
    }
    const savedLevel = localStorage.getItem('selectedLevel-' + currentLang + '-' + selectedCourse);
    if (savedLevel && levelsForCourse.hasOwnProperty(savedLevel)) {
        levelSelect.value = savedLevel;
    } else if (Object.keys(levelsForCourse).length > 0) {
        levelSelect.value = Object.keys(levelsForCourse)[0];
    } else {
        levelSelect.value = '';
    }
    updateCourseAndTopicsDisplay();
}

function updateCourseAndTopicsDisplay() {
    const currentLang = document.querySelector('.segment-control button.active')?.dataset.lang;
    if (!currentLang || !translations || !Object.keys(translations).length || !translations[currentLang] || !courseData || !Object.keys(courseData).length) {
        console.error("Cannot update display: language data or course data not loaded.");
        return;
    }
    // ... rest of the function
    const selectedCourse = courseSelect.value;
    const selectedLevel = levelSelect.value;
    let courseText = '';
    let topicsText = '';

    if (selectedCourse) {
        courseText = selectedCourse;
    }
    if (selectedCourse && selectedLevel && courseData[selectedCourse] && courseData[selectedCourse][selectedLevel]) {
        topicsText = courseData[selectedCourse][selectedLevel].join('; ');
    }

    if(line3TextElement) line3TextElement.textContent = courseText;
    const caption2Prefix = translations[currentLang].caption2Prefix || "";
    const caption2Suffix = translations[currentLang].caption2Suffix || "";
    if(caption2TextElement) caption2TextElement.textContent = `${caption2Prefix} ${selectedLevel || ''} ${caption2Suffix}`;
    if(levelElement) levelElement.textContent = selectedLevel || (translations[currentLang].initialLevel || "Level");

    let items = topicsText.split(';').map(item => item.trim()).filter(item => item !== '');
    if(customTextAreaElement) customTextAreaElement.innerHTML = items.length > 0 ? `<ul>${items.map(item => `<li>${item}</li>`).join('')}</ul>` : '';

    updateHtmlContent();
    localStorage.setItem('selectedCourse-' + currentLang, selectedCourse);
    localStorage.setItem('selectedLevel-' + currentLang + '-' + selectedCourse, selectedLevel);
}

// --- UI Element Updaters ---
// (updateStampVisibility, updateHtmlContent - keep existing, ensure they use global 'translations')
function updateStampVisibility() {
    if (!toggleStampInput || !stampImageElement) return;
    // ... rest of the function
    if (toggleStampInput.checked) {
        stampImageElement.style.opacity = '1';
        stampImageElement.style.display = 'block';
    } else {
        stampImageElement.style.opacity = '0';
        setTimeout(() => {
            if (!toggleStampInput.checked) { // Re-check condition
                 stampImageElement.style.display = 'none';
            }
        }, 300);
    }
}

function updateHtmlContent() {
    const currentLang = document.querySelector('.segment-control button.active')?.dataset.lang;
    if (!currentLang || !translations || !Object.keys(translations).length || !translations[currentLang]) {
         console.error("Cannot update HTML content: language data not loaded.");
        return;
    }
    // ... rest of the function
    const dateValue = dateInput.value;
    if (dateValue && dateTextElement) {
        const date = new Date(dateValue);
        const day = date.getDate();
        const year = date.getFullYear();
        // Month names could also be moved to translations.json if they need to be more dynamic
        const monthNames = {
            ru: ["января", "февраля", "марта", "апреля", "мая", "июня", "июля", "августа", "сентября", "октября", "ноября", "декабря"],
            en: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
        };
        // Ensure the currentLang exists in monthNames, or provide a fallback.
        const currentMonthNames = monthNames[currentLang] || monthNames['en'];
        dateTextElement.textContent = `${day} ${currentMonthNames[date.getMonth()]}, ${year}`;
    } else if (dateTextElement) {
        dateTextElement.textContent = '';
    }
    if (line2TextElement) line2TextElement.textContent = line2Input.value;

    if (backgroundImageElement) {
        backgroundImageElement.src = DEFAULT_BACKGROUND_IMAGE_URL;
        backgroundImageElement.onerror = () => {
            console.warn('Не удалось загрузить фоновое изображение по умолчанию.', DEFAULT_BACKGROUND_IMAGE_URL);
            backgroundImageElement.src = `https://placehold.co/${A4_WIDTH_PX}x${A4_HEIGHT_PX}/cccccc/333333?text=Image+Load+Error`;
        };
    }
    if (logoImageElement) logoImageElement.src = LOGO_IMAGE_URL;
    if (holoImageElement) holoImageElement.src = HOLO_IMAGE_URL;
    if (stampImageElement) stampImageElement.src = STAMP_IMAGE_URL;
}

// --- PDF Export ---
// (exportPdfBtn event listener - keep existing, ensure it uses global 'translations')
if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', async () => {
        const currentLang = document.querySelector('.segment-control button.active')?.dataset.lang;
        if (!currentLang || !translations || !Object.keys(translations).length || !translations[currentLang]) {
            showMessageBox("Language data not loaded. Cannot export PDF.");
            return;
        }
        // ... rest of the function
        if (line2Input.value.trim() === '') {
            showMessageBox(translations[currentLang].studentNameRequired);
            return;
        }

        const loadingMessageDiv = document.createElement('div');
        loadingMessageDiv.textContent = translations[currentLang].pdfLoadingMessage;
        loadingMessageDiv.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50';
        document.body.appendChild(loadingMessageDiv);
        if(htmlPageSection) htmlPageSection.classList.add('thinking-animation');
        if(a4Page) a4Page.classList.add('certificate-gradient-animation');

        try {
            const minAnimationDuration = new Promise(resolve => setTimeout(resolve, 4000));
            const canvas = await html2canvas(a4Page, {
                scale: 4, useCORS: true, logging: false,
                onclone: (clonedDoc) => {
                    // Re-apply image sources in the cloned document
                    const clonedBackgroundImage = clonedDoc.getElementById('backgroundImage');
                    if (clonedBackgroundImage) clonedBackgroundImage.src = DEFAULT_BACKGROUND_IMAGE_URL;
                    const clonedLogoImage = clonedDoc.getElementById('logoImage');
                    if (clonedLogoImage) clonedLogoImage.src = LOGO_IMAGE_URL;
                    const clonedHoloImage = clonedDoc.getElementById('holoImage');
                    if (clonedHoloImage) clonedHoloImage.src = HOLO_IMAGE_URL;
                    const clonedStampImage = clonedDoc.getElementById('stampImage');
                    if (clonedStampImage) clonedStampImage.src = STAMP_IMAGE_URL;
                }
            });
            await minAnimationDuration;

            if(document.body.contains(loadingMessageDiv)) document.body.removeChild(loadingMessageDiv);
            if(htmlPageSection) htmlPageSection.classList.remove('thinking-animation');
            if(a4Page) {
                a4Page.classList.remove('certificate-gradient-animation');
                a4Page.style.backgroundImage = '';
                a4Page.style.backgroundSize = '';
            }

            const imgData = canvas.toDataURL('image/jpeg', 0.8);
            const pdf = new window.jspdf.jsPDF({ orientation: 'landscape', unit: 'px', format: [A4_WIDTH_PX, A4_HEIGHT_PX] });
            pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_PX, A4_HEIGHT_PX);
            pdf.save('html_page_content.pdf');
        } catch (error) {
            if(document.body.contains(loadingMessageDiv)) document.body.removeChild(loadingMessageDiv);
            if(htmlPageSection) htmlPageSection.classList.remove('thinking-animation');
            if(a4Page) {
                a4Page.classList.remove('certificate-gradient-animation');
                a4Page.style.backgroundImage = '';
                a4Page.style.backgroundSize = '';
            }
            console.error('Ошибка при создании PDF:', error);
            const errPrefix = translations[currentLang]?.pdfErrorMessagePrefix || "PDF Error:";
            const errSuffix = translations[currentLang]?.pdfErrorMessageSuffix || "";
            showMessageBox(`${errPrefix} ${error.message}${errSuffix}`);
        }
    });
}


// --- Event Listeners ---
if(dateInput) dateInput.addEventListener('input', updateHtmlContent);
if(line2Input) line2Input.addEventListener('input', updateHtmlContent);
if(courseSelect) courseSelect.addEventListener('change', populateLevels);
if(levelSelect) levelSelect.addEventListener('change', updateCourseAndTopicsDisplay);
if(toggleStampInput) toggleStampInput.addEventListener('change', updateStampVisibility);
if(messageBoxCloseBtn) messageBoxCloseBtn.addEventListener('click', () => messageBox.classList.add('hidden'));
if(languageControl) {
    languageControl.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            setLanguage(event.target.dataset.lang);
        }
    });
}

// --- Initialization ---
window.onload = async () => {
    // Ensure DOM elements are available before trying to use them
    if (!a4Page || !backgroundImageElement || !exportPdfBtn || !htmlPageSection ||
        !dateInput || !line2Input || !courseSelect || !levelSelect || !languageControl ||
        !toggleStampInput || !stampImageElement || !dateTextElement || !line2TextElement ||
        !line3TextElement || !customTextAreaElement || !ceoTextElement || !caption2TextElement ||
        !certificateTitleElement || !levelElement || !ceoCaptionElement || !textXxsElement ||
        !messageBox || !messageBoxText || !messageBoxCloseBtn || !logoImageElement || !holoImageElement) {
        console.error("One or more critical DOM elements are missing. Initialization cannot proceed.");
        alert("Error: Critical page elements are missing. Please check the HTML structure.");
        return;
    }

    try {
        await loadExternalData(); // Load data first

        const today = new Date();
        dateInput.value = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

        // Set initial images - these should already be in HTML, but good to ensure via constants if needed
        // Forcing src here might be redundant if HTML is correct and updateHtmlContent covers it.
        // updateHtmlContent(); // Will be called via setLanguage path.

        const savedLang = localStorage.getItem('lang') || 'ru';
        setLanguage(savedLang); // This will trigger populateCourses, populateLevels, updateCourseAndTopicsDisplay, and updateHtmlContent

        scaleA4Page();
        // updateStampVisibility(); // Also called within setLanguage
    } catch (error) {
        // Error during loadExternalData is already handled and displayed
        console.error("Initialization sequence failed after data loading attempt.");
        // If showMessageBox is available and error is not about missing showMessageBox itself
        if (typeof showMessageBox === 'function' && !error.message.includes("showMessageBox")) {
            showMessageBox("Page initialization failed. Some features might not work.");
        } else if (!error.message.includes("showMessageBox")) { // Avoid alert loop if showMessageBox is the issue
            alert("Page initialization failed. Some features might not work.");
        }
    }
};
window.addEventListener('resize', scaleA4Page);
