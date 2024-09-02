// sectionsHandler.js

export function initSectionsHandler(mainContent, sections) {
    let isScrolling;
    let isAnimate;
    let isSwiping = false;
    const swipeThreshold = 100;
    let startX;

    function scrollToSection(index) {
        const targetSection = sections[index];
        if (!targetSection) return;

        clearTimeout(isAnimate);
        mainContent.scrollTo({
            left: targetSection.offsetLeft,
            behavior: 'smooth'
        });

        isAnimate = setTimeout(() => {
            targetSection.classList.add('animate');
            sections.forEach((section) => {
                if (section !== targetSection) section.classList.remove('animate');
            });
        }, 300);
    }

    function handleScroll() {
        clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
            const scrollLeft = mainContent.scrollLeft;
            const sectionWidth = mainContent.clientWidth;
            const index = Math.round(scrollLeft / sectionWidth);
            scrollToSection(index);
            isSwiping = false;
        }, 100);
    }

    function handleWheel(event) {
        const delta = event.deltaY;
        const sectionWidth = mainContent.clientWidth;
        const currentIndex = Math.round(mainContent.scrollLeft / sectionWidth);

        if (delta > 0) {
            scrollToSection(Math.min(sections.length - 1, currentIndex + 1));
        } else if (delta < 0) {
            scrollToSection(Math.max(0, currentIndex - 1));
        }

        event.preventDefault();
    }

    function handleTouchStart(event) {
        if (event.touches.length === 1) {
            isSwiping = true;
            startX = event.touches[0].clientX;
        }
    }

    function handleTouchEnd(event) {
        if (!isSwiping) return;

        const endX = event.changedTouches[0].clientX;
        const deltaX = endX - startX;
        const sectionWidth = mainContent.clientWidth;
        const currentIndex = Math.round(mainContent.scrollLeft / sectionWidth);

        if (Math.abs(deltaX) > swipeThreshold) {
            if (deltaX > 0) {
                scrollToSection(Math.max(0, currentIndex - 1));
            } else {
                scrollToSection(Math.min(sections.length - 1, currentIndex + 1));
            }
        }

        isSwiping = false;
    }

    // Привязка событий
    mainContent.addEventListener('scroll', handleScroll);
    mainContent.addEventListener('wheel', handleWheel);
    mainContent.addEventListener('touchstart', handleTouchStart);
    mainContent.addEventListener('touchend', handleTouchEnd);
}
