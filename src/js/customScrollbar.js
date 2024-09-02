// customScrollbar.js

export function initCustomScrollbar(scrollContainer, scrollElement) {
    let isDragging = false;
    let startY;
    let startScrollTop;

    // Обновление позиции скроллбара
    function updateScrollElementPosition() {
        const containerHeight = scrollContainer.clientHeight;
        const contentHeight = scrollContainer.scrollHeight;
        const scrollPercentage = (scrollContainer.scrollTop / (contentHeight - containerHeight)) * 100;
        scrollElement.style.top = `calc(${scrollPercentage}%)`;
        scrollElement.style.transform = `translate(-50%, -${scrollPercentage}%)`;
    }

    // Начало перетаскивания
    function startDragging(e) {
        isDragging = true;
        e.preventDefault();
        startY = e.clientY || e.touches[0].clientY;
        startScrollTop = scrollContainer.scrollTop;
    }

    // Завершение перетаскивания
    function stopDragging() {
        isDragging = false;
    }

    // Обработка движения мыши
    function onMouseMove(e) {
        if (!isDragging) return;

        const clientY = e.clientY;
        const deltaY = clientY - startY;
        const containerHeight = scrollContainer.clientHeight;
        const maxScrollTop = scrollContainer.scrollHeight - containerHeight;
        const scrollTop = Math.min(Math.max(startScrollTop + (deltaY / containerHeight) * maxScrollTop, 0), maxScrollTop);
        scrollContainer.scrollTop = scrollTop;
    }

    // Обработка движения при касании
    function onTouchMove(e) {
        if (!isDragging) return;

        const touch = e.touches[0];
        const clientY = touch.clientY;
        const deltaY = clientY - startY;
        const containerHeight = scrollContainer.clientHeight;
        const maxScrollTop = scrollContainer.scrollHeight - containerHeight;
        const scrollTop = Math.min(Math.max(startScrollTop + (deltaY / containerHeight) * maxScrollTop, 0), maxScrollTop);
        scrollContainer.scrollTop = scrollTop;
    }

    // Привязка событий
    scrollContainer.addEventListener('scroll', updateScrollElementPosition);
    scrollElement.addEventListener('mousedown', startDragging);
    scrollElement.addEventListener('touchstart', startDragging);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('touchmove', onTouchMove);
    document.addEventListener('mouseup', stopDragging);
    document.addEventListener('touchend', stopDragging);

    // Инициализация
    updateScrollElementPosition();
}
