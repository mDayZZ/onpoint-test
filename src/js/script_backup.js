import '/src/css/style.css';

const scrollContainer = document.querySelector('#scroll-container');
const scrollElement = document.querySelector('#custom-scrollElement');

// Функция для обновления позиции кастомного скроллбара
function updateScrollElementPosition() {
    const containerHeight = scrollContainer.clientHeight;
    const contentHeight = scrollContainer.scrollHeight;
    const scrollPercentage = scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight) * 100;
    scrollElement.style.top = `calc(${scrollPercentage}%)`;
    scrollElement.style.transform = `translate(-50%, -${scrollPercentage}%)`;
}

// Обработчик события прокрутки
scrollContainer.addEventListener('scroll', e => {
    updateScrollElementPosition()
    e.stopPropagation() //Не сработало
});

let isDragging = false;
let startY;
let startScrollTop;

function startDragging(e) {
    isDragging = true;
    e.preventDefault(); // предотвращаем выделение текста и другие стандартные действия
    e.stopPropagation()
    // Запоминаем начальные координаты и положение прокрутки
    startY = e.clientY || e.touches[0].clientY;
    startScrollTop = scrollContainer.scrollTop;
}

function stopDragging(e) {
    e.stopPropagation()
    isDragging = false;
}

function onMouseMove(e) {
    if (isDragging) {
        e.stopPropagation()
        const clientY = e.clientY;
        const deltaY = clientY - startY;
        const containerHeight = scrollContainer.clientHeight;
        const maxScrollTop = scrollContainer.scrollHeight - containerHeight;
        const scrollTop = Math.min(Math.max(startScrollTop + deltaY / containerHeight * maxScrollTop, 0), maxScrollTop);

        scrollContainer.scrollTop = scrollTop;
    }
}

function onTouchMove(e) {
    if (isDragging) {
        e.stopPropagation()
        const touch = e.touches[0];
        const clientY = touch.clientY;
        const deltaY = clientY - startY;
        const containerHeight = scrollContainer.clientHeight;
        const maxScrollTop = scrollContainer.scrollHeight - containerHeight;
        const scrollTop = Math.min(Math.max(startScrollTop + deltaY / containerHeight * maxScrollTop, 0), maxScrollTop);

        scrollContainer.scrollTop = scrollTop;
    }
}

// Обработчики событий для перетаскивания
scrollElement.addEventListener('mousedown', startDragging);
scrollElement.addEventListener('touchstart', startDragging);

document.addEventListener('mousemove', onMouseMove);
document.addEventListener('touchmove', onTouchMove);

document.addEventListener('mouseup', stopDragging);
document.addEventListener('touchend', stopDragging);

// Инициализация
updateScrollElementPosition();






//Секции

const mainContent = document.querySelector('main');
const sections = document.querySelectorAll('.section');
let isScrolling;
let isAnimate
let startX;
let isSwiping = false;
const swipeThreshold = 100;

function scrollToSection(index) {
    const targetSection = sections[index];
    if (targetSection) {
        clearTimeout(isAnimate)
        mainContent.scrollTo({
            left: targetSection.offsetLeft,
            behavior: 'smooth'
        });
        isAnimate = setTimeout(()=> {
            targetSection.classList.add('animate')
            sections.forEach((section) => {
                if (section !== targetSection)
                    section.classList.remove('animate')
            })
        }, 100)

    }
}

mainContent.addEventListener('scroll', function() {
    // Очистить предыдущий таймер
    clearTimeout(isScrolling);

    // Установить таймер
    isScrolling = setTimeout(function() {
        const scrollLeft = mainContent.scrollLeft;
        const sectionWidth = mainContent.clientWidth;

        // Найти ближайший индекс секции к текущему положению прокрутки
        const index = Math.round(scrollLeft / sectionWidth);

        // Переход к следующей или предыдущей секции
        scrollToSection(index);
        isSwiping = false
    }, 100);
});

// Обработчик для прокрутки колесиком
mainContent.addEventListener('wheel', function(event) {
    const delta = event.deltaY;
    if (delta > 0) {
        // Прокрутка вниз, переход к следующей секции
        const nextIndex = Math.min(sections.length - 1, Math.round(mainContent.scrollLeft / mainContent.clientWidth) + 1);
        scrollToSection(nextIndex);
    } else if (delta < 0) {
        // Прокрутка вверх, переход к предыдущей секции
        const prevIndex = Math.max(0, Math.round(mainContent.scrollLeft / mainContent.clientWidth) - 1);
        scrollToSection(prevIndex);
    }
    event.preventDefault(); // Предотвратить стандартное поведение скроллбара
});

// Обработчики для свайпов
mainContent.addEventListener('touchstart', function(event) {
    if (event.touches.length === 1) {
        isSwiping = true;
        startX = event.touches[0].clientX;
    }
});

mainContent.addEventListener('touchend', function(event) {
    if (isSwiping) {
        const endX = event.changedTouches[0].clientX;
        const deltaX = endX - startX;

        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                // Свайп вправо, переход к предыдущей секции
                const prevIndex = Math.max(0, Math.round(mainContent.scrollLeft / mainContent.clientWidth) - 1);
                scrollToSection(prevIndex);
            } else {
                // Свайп влево, переход к следующей секции
                const nextIndex = Math.min(sections.length - 1, Math.round(mainContent.scrollLeft / mainContent.clientWidth) + 1);
                scrollToSection(nextIndex);
            }
        }
        isSwiping = false;
    }
});

