import '/src/css/style.css';
import { initCustomScrollbar } from './customScrollbar';
import { initSectionsHandler } from './sectionsHandler';
import {initPagination} from "./paginationHandler";

const scrollContainer = document.querySelector('#scroll-container');
const scrollElement = document.querySelector('#custom-scrollElement');
const mainContent = document.querySelector('main');
const sections = document.querySelectorAll('.section');
const detailsModal = document.querySelector('#detailsModal')
const closeModalButton = document.querySelector('#closeModalButton')
const detailsButton = document.querySelector('#detailsButton')


// Инициализация кастомного скроллбара
initCustomScrollbar(scrollContainer, scrollElement);

// Инициализация обработки секций
initSectionsHandler(mainContent, sections);


const listElements = document.querySelectorAll('.modal__item');
const pageButtonsContainer = document.querySelector('.modal__pagesButtons')

initPagination(listElements, pageButtonsContainer, 3)

const openModal = () =>  {
    detailsModal.classList.remove('hidden');
}

const closeModal = () => {
    detailsModal.classList.add('hidden');
}

detailsButton.addEventListener('click', () => openModal() )
closeModalButton.addEventListener('click', () => closeModal() )








