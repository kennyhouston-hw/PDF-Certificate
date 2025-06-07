// Получаем ссылки на HTML элементы
const a4Page = document.getElementById('a4Page');
const backgroundImageElement = document.getElementById('backgroundImage');
const exportPdfBtn = document.getElementById('exportPdfBtn');
const htmlPageSection = document.querySelector('.html-page-section');
// Получаем ссылку на html-page-section

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
const myh1Element = document.getElementById('myh1');
const levelElement = document.getElementById('level');
const ceoCaptionElement = document.getElementById('ceo-caption');
const textXxsElement = document.getElementById('text-xxs');
const messageBox = document.getElementById('messageBox');
const messageBoxText = document.getElementById('messageBoxText');
const messageBoxCloseBtn = document.getElementById('messageBoxCloseBtn');
// Размеры A4 в ландшафтной ориентации (297мм x 210мм) при 96 DPI)
const A4_WIDTH_PX = 842;
const A4_HEIGHT_PX = 595;

// URL изображения по умолчанию
const DEFAULT_BACKGROUND_IMAGE_URL = 'https://static.tildacdn.com/tild3364-3164-4862-b135-396663353236/Background.png';
// Объект с переводами
const translations = {
    ru: {
        languageLabel: "Язык:",
        certificateDataTitle: "Данные для сертификата:",
        dateLabel: "Дата:",
        studentNameLabel: "Имя ученика:",
        studentNamePlaceholder: "Имя ученика",
        courseLabel: "Курс:",
        selectCourseOption: "Выберите курс",
        levelLabel: "Уровень:",
        selectLevelOption: "Выберите уровень",
        exportPdfButton: "Экспорт в PDF",
        certificateTitle: "сертификат",
        initialLevel: "Начальный уровень",
        caption1: "СЕРТИФИКАТ ПОДТВЕРЖДАЕТ, ЧТО:",
        caption2Prefix: "успешно закончил(а)",
        caption2Suffix: "уровень курса:",
        caption3: "ИЗУЧИЛ(А) темы:",
        ceo: "Винников Константин Владимирович",
        ceoCaption: "Директор ООО «Онлайн-школа программирования»",
        footerText: "ООО «Онлайн-школа программирования» · ОГРН 1186952015645 · Образовательная лицензия Л035-01257-69/00191630 ",
        toggleStampLabel: "Показать печать",
        okButton: "ОК",
        pdfLoadingMessage: "Создание PDF... Пожалуйста, подождите.",
        pdfErrorMessagePrefix: "Произошла ошибка при создании PDF:",
        pdfErrorMessageSuffix: ". Если вы используете фоновое изображение, убедитесь, что оно доступно через CORS.",
        studentNameRequired: "Поле 'Имя ученика' обязательно для заполнения."
    },
    en: {
        languageLabel: "Language:",
        certificateDataTitle: "Certificate Data:",
        dateLabel: "Date:",
        studentNameLabel: "Student Name:",
        studentNamePlaceholder: "Student Name",
        courseLabel: "Course:",
        selectCourseOption: "Select a course",
        levelLabel: "Level:",
        selectLevelOption: "Select a level",
        exportPdfButton: "Export to PDF",
        certificateTitle: "certificate",
        initialLevel: "Initial Level",
        caption1: "THIS CERTIFICATE CONFIRMS THAT:",
        caption2Prefix: "has successfully completed",
        caption2Suffix: "level of the course:",
        caption3: "STUDIED topics:",
        ceo:"Konstantin Vinnikov",
        ceoCaption: "Director of LLC \"Online Programming School\"",
        footerText: "LLC \"Online Programming School\" · OGRN 1186952015645 · Educational license Л035-01257-69/00191630 ",
        toggleStampLabel: "Show stamp",
        okButton: "OK",
        pdfLoadingMessage: "Creating PDF... Please wait.",
        pdfErrorMessagePrefix: "An error occurred while creating the PDF:",
        pdfErrorMessageSuffix: ". If you are using a background image, make sure it is available via CORS.",
        studentNameRequired: "The 'Student Name' field is required."
    }
};

// Данные курсов и уровней
const courseData = {
    "Графический дизайн в редакторе FIGMA": {
        "Начальный уровень": [
            "основы редактора Figma",
            "контуры, фигуры, слои",
            "создание объемных изображений",
            "контраст, цветовой контраст",
            "перспективу, изометрию"
        ],
        "Базовый уровень": [
            "основы создания логотипов, 3D иконок, стикерпаков",
            "создание фирменного стиля",
            "принципы инфографики",
            "правила рисования веб-баннеров",
            "основы веб-дизайна (создание лендинга)"
        ]
    },
    "Веб-разработка": {
        "Основы HTML/CSS": [
            "Введение в HTML",
            "Базовый CSS синтаксис",
            "Работа с блочной моделью",
            "Flexbox основы",
            "Создание простых веб-страниц"
        ],
        "Продвинутый JavaScript": [
            "Функции высшего порядка",
            "Асинхронный JavaScript (Promise, Async/Await)",
            "Работа с DOM",
            "Модули ES6",
            "Обработка событий"
        ]
    },
    "Graphic Design in Figma": {
        "Initial": [
            "Figma editor basics",
            "contours, shapes, layers",
            "creating volumetric images",
            "contrast, color contrast",
            "perspective, isometry"
        ],
        "Basic": [
            "basics of creating logos, 3D icons, sticker packs",
            "creating corporate identity",
            "principles of infographics",
            "rules for drawing web banners",
            "basics of web design (landing page creation)"
        ]
    },
    "Web Development": {
        "HTML/CSS Fundamentals": [
            "Introduction to HTML",
            "Basic CSS syntax",
            "Working with the box model",
            "Flexbox basics",
            "Creating simple web pages"
        ],
        "Advanced JavaScript": [
            "Higher-order functions",
            "Aysnchronous JavaScript (Promise, Async/Await)",
            "Working with DOM",
            "ES6 Modules",
            "Event handling"
        ]
    }
};
// Задаем размеры HTML-страницы
a4Page.style.width = `${A4_WIDTH_PX}px`;
a4Page.style.height = `${A4_HEIGHT_PX}px`;
/**
 * Масштабирует HTML-страницу для предварительного просмотра.
 */
function scaleA4Page() {
    const containerWidth = a4Page.parentElement.clientWidth - (15 * 2);
    const scale = Math.min(1, containerWidth / A4_WIDTH_PX);
    a4Page.style.transform = `scale(${scale})`;
    a4Page.style.marginBottom = `${(A4_HEIGHT_PX * scale) - A4_HEIGHT_PX}px`;
}

/**
 * Отображает кастомное модальное окно с сообщением.
 * @param {string} message - Текст сообщения для отображения.
 */
function showMessageBox(message) {
    messageBoxText.textContent = message;
    messageBox.classList.remove('hidden');
}

/**
 * Устанавливает язык интерфейса.
 * @param {string} lang - Код языка ('ru' или 'en').
 */
function setLanguage(lang) {
    const currentTranslations = translations[lang];
    document.querySelectorAll('[data-lang-key]').forEach(element => {
        const key = element.getAttribute('data-lang-key');
        if (currentTranslations[key]) {
            element.textContent = currentTranslations[key];
        }
    });
    document.querySelectorAll('[data-lang-placeholder-key]').forEach(element => {
        const key = element.getAttribute('data-lang-placeholder-key');
        if (currentTranslations[key]) {
            element.placeholder = currentTranslations[key];
        }
    });
    Array.from(languageControl.children).forEach(button => {
        if (button.dataset.lang === lang) {
            button.classList.add('active');
        } else {
            button.classList.remove('active');
        }
    });

    // Обновляем состояние тоггла штампа в зависимости от от выбранного языка
    if (lang === 'ru') {
        toggleStampInput.checked = true;
    } else if (lang === 'en') {
        toggleStampInput.checked = false;
    }
    updateStampVisibility();
    // Применяем новое состояние видимости штампа

    populateCourses();
    localStorage.setItem('lang', lang);
}

/**
 * Заполняет выпадающий список курсов.
 */
function populateCourses() {
    const currentLang = document.querySelector('.segment-control button.active').dataset.lang;
    courseSelect.innerHTML = `<option value="">${translations[currentLang].selectCourseOption}</option>`;

    let coursesForLang = {};
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
    }

    for (const courseName in coursesForLang) {
        const option = document.createElement('option');
        option.value = courseName;
        option.textContent = courseName;
        courseSelect.appendChild(option);
    }

    const savedCourse = localStorage.getItem('selectedCourse-' + currentLang);
    if (savedCourse && Object.keys(coursesForLang).includes(savedCourse)) {
        courseSelect.value = savedCourse;
    } else if (Object.keys(coursesForLang).length > 0) {
        courseSelect.value = Object.keys(coursesForLang)[0];
    } else {
        courseSelect.value = '';
    }
    populateLevels();
}

/**
 * Заполняет выпадающий список уровней на основе выбранного курса.
 */
function populateLevels() {
    const currentLang = document.querySelector('.segment-control button.active').dataset.lang;
    levelSelect.innerHTML = `<option value="">${translations[currentLang].selectLevelOption}</option>`;
    const selectedCourse = courseSelect.value;

    let levelsForCourse = {};
    if (selectedCourse && courseData[selectedCourse]) {
        levelsForCourse = courseData[selectedCourse];
    }

    for (const levelName in levelsForCourse) {
        const option = document.createElement('option');
        option.value = levelName;
        option.textContent = levelName;
        levelSelect.appendChild(option);
    }

    const savedLevel = localStorage.getItem('selectedLevel-' + currentLang + '-' + selectedCourse);
    if (savedLevel && Object.keys(levelsForCourse).includes(savedLevel)) {
        levelSelect.value = savedLevel;
    } else if (Object.keys(levelsForCourse).length > 0) {
        levelSelect.value = Object.keys(levelsForCourse)[0];
    } else {
        levelSelect.value = '';
    }
    updateCourseAndTopicsDisplay();
}

/**
 * Обновляет элементы отображения "Название курса для сертификата" и "Детальный текст"
 * на основе выбранного курса и уровня.
 */
function updateCourseAndTopicsDisplay() {
    const currentLang = document.querySelector('.segment-control button.active').dataset.lang;
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

    line3TextElement.textContent = courseText;
    const caption2Prefix = translations[currentLang].caption2Prefix;
    const caption2Suffix = translations[currentLang].caption2Suffix;
    caption2TextElement.textContent = `${caption2Prefix} ${selectedLevel || ''} ${caption2Suffix}`;
    // Update the level text content on the certificate
    levelElement.textContent = selectedLevel ||
    translations[currentLang].initialLevel; // Set initial level if none selected

    let items = topicsText.split(';').map(item => item.trim()).filter(item => item !== '');
    if (items.length > 0) {
        let ulHtml = '<ul>';
        items.forEach(item => {
            ulHtml += `<li>${item}</li>`;
        });
        ulHtml += '</ul>';
        customTextAreaElement.innerHTML = ulHtml;
    } else {
        customTextAreaElement.innerHTML = '';
    }

    updateHtmlContent();

    localStorage.setItem('selectedCourse-' + currentLang, selectedCourse);
    localStorage.setItem('selectedLevel-' + currentLang + '-' + selectedCourse, selectedLevel);
}

/**
 * Обновляет видимость штампа на основе состояния тоггла.
 */
function updateStampVisibility() {
    if (toggleStampInput.checked) {
        stampImageElement.style.opacity = '1';
        stampImageElement.style.display = 'block';
    } else {
        stampImageElement.style.opacity = '0';
        setTimeout(() => {
            if (!toggleStampInput.checked) {
                 stampImageElement.style.display = 'none';
            }
        }, 300);
    }
}

/**
 * Обновляет содержимое HTML-страницы на основе значений полей ввода.
 */
function updateHtmlContent() {
    const dateValue = dateInput.value;
    if (dateValue) {
        const date = new Date(dateValue);
        const day = date.getDate();
        const year = date.getFullYear();
        // Month names in different languages
        const monthNames = {
            ru: ["января", "февраля", "марта", "апреля", "мая", "июня",
                "июля", "августа", "сентября", "октября", "ноября", "декабря"
            ],
            en: ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"
            ]
        };
        // Get current language from the active button
        const currentLang = document.querySelector('.segment-control button.active').dataset.lang;
        // Get the month name based on the current language
        const monthName = monthNames[currentLang][date.getMonth()];
        // Set the date text content in "Day, month, year" format
        dateTextElement.textContent = `${day} ${monthName}, ${year}`;
    } else {
        dateTextElement.textContent = '';
    }

    line2TextElement.textContent = line2Input.value;

    backgroundImageElement.src = DEFAULT_BACKGROUND_IMAGE_URL;
    backgroundImageElement.onerror = () => {
        console.warn('Не удалось загрузить фоновое изображение по умолчанию. Возможно, проблемы с CORS или неверный URL.', DEFAULT_BACKGROUND_IMAGE_URL);
        backgroundImageElement.src = 'https://placehold.co/' + A4_WIDTH_PX + 'x' + A4_HEIGHT_PX + '/cccccc/333333?text=Image+Load+Error';
    };
}

/**
 * Экспортирует содержимое HTML-страницы в PDF.
 */
exportPdfBtn.addEventListener('click', async () => { // Made async to use await
    const currentLang = document.querySelector('.segment-control button.active').dataset.lang;

    // Check if line2 (student name) is empty
    if (line2Input.value.trim() === '') {
        showMessageBox(translations[currentLang].studentNameRequired);
        return; // Stop PDF generation
    }

    const loadingMessage = document.createElement('div');
    loadingMessage.textContent = translations[currentLang].pdfLoadingMessage;
    loadingMessage.className = 'absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-lg z-50';
    document.body.appendChild(loadingMessage);

    // Add thinking animation class to html-page-section
    htmlPageSection.classList.add('thinking-animation');
    // Add gradient animation class to a4Page
    a4Page.classList.add('certificate-gradient-animation');
    try {
        // Create a promise that resolves after 4 seconds
        const minAnimationDuration = new Promise(resolve => setTimeout(resolve, 4000));
        // Wait for both the minimum animation duration and html2canvas to complete
        const [canvasImage] = await Promise.all([
            html2canvas(a4Page, {
                scale: 4,
                useCORS: true,
                logging: false
            }),
            minAnimationDuration // Ensure animation runs for at least this long
        ]);
        document.body.removeChild(loadingMessage);
        htmlPageSection.classList.remove('thinking-animation'); // Ensure it's removed
        a4Page.classList.remove('certificate-gradient-animation');
        // Remove gradient animation
        a4Page.style.backgroundImage = '';
        // Clear background image
        a4Page.style.backgroundSize = '';
        // Clear background size

        const imgData = canvasImage.toDataURL('image/jpeg', 0.8);
        const pdf = new window.jspdf.jsPDF({
            orientation: 'landscape',
            unit: 'px',
            format: [A4_WIDTH_PX, A4_HEIGHT_PX]
        });
        pdf.addImage(imgData, 'JPEG', 0, 0, A4_WIDTH_PX, A4_HEIGHT_PX);
        pdf.save('html_page_content.pdf');

    } catch (error) {
        document.body.removeChild(loadingMessage);
        htmlPageSection.classList.remove('thinking-animation'); // Ensure it's removed on error
        a4Page.classList.remove('certificate-gradient-animation');
        // Remove gradient animation on error
        a4Page.style.backgroundImage = '';
        // Clear background image
        a4Page.style.backgroundSize = '';
        // Clear background size
        console.error('Ошибка при создании PDF:', error);
        const errorMessage = translations[currentLang].pdfErrorMessagePrefix + ' ' + error.message + translations[currentLang].pdfErrorMessageSuffix;
        showMessageBox(errorMessage);
    }
});

// Слушаем изменения в полях ввода и обновляем HTML-содержимое
dateInput.addEventListener('input', updateHtmlContent);
line2Input.addEventListener('input', updateHtmlContent);

courseSelect.addEventListener('change', populateLevels);
levelSelect.addEventListener('change', updateCourseAndTopicsDisplay);

// Обработчик изменения состояния тоггла для штампа
toggleStampInput.addEventListener('change', updateStampVisibility);
// Обработчик закрытия модального окна
messageBoxCloseBtn.addEventListener('click', () => {
    messageBox.classList.add('hidden');
});
// Новый обработчик для сегментированного контрола
languageControl.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
        const selectedLang = event.target.dataset.lang;
        setLanguage(selectedLang);
    }
});
// Инициализация при загрузке страницы
window.onload = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateInput.value = `${year}-${month}-${day}`;
    const savedLang = localStorage.getItem('lang') || 'ru';
    setLanguage(savedLang); // Это также установит начальное состояние тоггла штампа

    scaleA4Page();
};

// Перемасштабируем страницу при изменении размера окна
window.addEventListener('resize', scaleA4Page);