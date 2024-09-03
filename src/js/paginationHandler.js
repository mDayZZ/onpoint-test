import {list} from "postcss";

export function initPagination(listElements, pageButtonsContainer, elementsInPage = 3) {
    const prevPageButton = document.getElementById('prevPage')
    const nextPageButton = document.getElementById('nextPage')


    pageButtonsContainer.innerHTML = ``;
    const pagesCount = Math.ceil(listElements.length / elementsInPage)
    let currentPage = 0;
    prevPageButton.addEventListener('click', () => {
        const newPage = currentPage - 1;
        if (newPage >= 0) {
            currentPage = newPage
            updatePageButtons()
            updateListElements()
        }

    })
    nextPageButton.addEventListener('click', () => {
        const newPage = currentPage + 1
        if (newPage < pagesCount) {
            currentPage = newPage
            updatePageButtons()
            updateListElements()
        }

    })




    const updateListElements = () => {
        const startIndex = elementsInPage * currentPage;
        listElements.forEach((listElement, index) => {
            if (index >= startIndex && index < startIndex + elementsInPage) {
                listElement.classList.add('hidden')

            }

            else {
                listElement.classList.remove('show')
                listElement.classList.add('hide')
            }

        })
        setTimeout(() => {

            listElements.forEach((listElement, index) => {
                if (index >= startIndex && index < startIndex + elementsInPage) {
                    listElement.classList.remove('hidden')
                    listElement.classList.remove('hide')
                    listElement.classList.add('show')
                }

                else
                    listElement.classList.add('hidden')
                    // listElement.classList.remove('show')
                    // listElement.classList.add('animate')
            })

        }, 500)

    }

    const updatePageButtons = () => {
        Array.from(pageButtonsContainer.children).forEach((pageButtonElement, index) => {
            if (index <= currentPage)
                pageButtonElement.classList.add('pageButton--active')
            else
                pageButtonElement.classList.remove('pageButton--active')
        })
    }

    for (let i = 0; i < pagesCount; i++) {
        console.log('iter:', i)
        const pageButtonElement = document.createElement('button')
        pageButtonElement.id = `pageButton_${i}`
        pageButtonElement.className = 'pageButton'
        pageButtonsContainer.insertAdjacentElement('beforeend', pageButtonElement)
        pageButtonElement.addEventListener('click', () => {
            currentPage = i;
            updateListElements();
            updatePageButtons();
        })
    }


    updateListElements()
    updatePageButtons()
}