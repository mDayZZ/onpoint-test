import '/src/css/style.css';
import { initCustomScrollbar } from './customScrollbar';
import { initSectionsHandler } from './sectionsHandler';

const scrollContainer = document.querySelector('#scroll-container');
const scrollElement = document.querySelector('#custom-scrollElement');
const mainContent = document.querySelector('main');
const sections = document.querySelectorAll('.section');

// Инициализация кастомного скроллбара
initCustomScrollbar(scrollContainer, scrollElement);

// Инициализация обработки секций
initSectionsHandler(mainContent, sections);
