const containerSlide = document.querySelector('.carousel-track');
const prev = document.querySelector('.prev');
const next = document.querySelector('.next');
const page = document.querySelector('.current-page');
const fullPage = document.querySelector('.current-full');
let count = 0;
const maxCount = containerSlide.children.length;
fullPage.textContent = maxCount;

const containerSlideGrid = document.querySelector('.stages-grid')
const prevGrid = document.querySelector('.prevGrid')
const nextGrid = document.querySelector('.nextGrid')
const pageGrid = document.querySelector('.pagination__item')
let countGrid = 0
const maxCountGrid = Math.floor(containerSlideGrid.children.length / 1.5)
const paginationCont = document.querySelector('.pagination')

Array.from(containerSlideGrid.children).forEach((item,index) => {
    const pagination = document.createElement('div')
    pagination.classList.add('pagination__item')
    paginationCont.appendChild(pagination)
    if(index === 0){
        pagination.classList.add('active')
    }
})

function slide() {
    const width = containerSlide.children[0].clientWidth + 30;
    containerSlide.scroll({
        left: count * width,
        behavior: 'smooth'
    });
    page.textContent = count + 1;
}

function nextSlide() {
    count = (count + 1) % maxCount;
    slide();
}

function prevSlide() {
    count = (count - 1 + maxCount) % maxCount;
    slide();
}

function slideGrid() {
    const width = containerSlideGrid.children[0].clientWidth + 20
    containerSlideGrid.scroll({
        left: countGrid * width,
        behavior: 'smooth'
    })
    Array.from(paginationCont.children).forEach(item => {
        item.classList.remove('active')
    })
    paginationCont.children[countGrid].classList.add('active')

}
//
// prev.addEventListener('click', () =>  {
//     count < 1 ? count = (maxCount) - 1 : count--
//     slide()
// })
// next.addEventListener('click', () => {
//     count > (maxCount) - 1 ? count = 0 : count++
//     slide()
// })

prevGrid.addEventListener('click', () => {
    countGrid > 0 ? countGrid-- : countGrid = maxCountGrid + 1
    slideGrid()
})
nextGrid.addEventListener('click', () => {
    countGrid > (maxCountGrid) ? countGrid = 0 : countGrid++
    slideGrid()
})

// let intervalId = setInterval(() => {
//     count = (count + 1) % maxCount;
//     slide();
// }, 4000);

let intervalId;
if (window.innerWidth <= 375) {
    intervalId = setInterval(nextSlide, 4000);
}

window.addEventListener('resize', () => {
    clearInterval(intervalId);
    if (window.innerWidth <= 375) {
        intervalId = setInterval(nextSlide, 4000);
    }
});

// containerSlide.addEventListener('mouseover', () => {
//     clearInterval(intervalId);
// });
//
// containerSlide.addEventListener('mouseout', () => {
//     intervalId = setInterval(() => {
//         count = (count + 1) % maxCount;
//         slide();
//     }, 4000);
// });
prev.addEventListener('click', () => {
    clearInterval(intervalId);
    prevSlide();
    if (window.innerWidth <= 375) {
        intervalId = setInterval(nextSlide, 4000);
    }
});

next.addEventListener('click', () => {
    clearInterval(intervalId);
    nextSlide();
    if (window.innerWidth <= 375) {
        intervalId = setInterval(nextSlide, 4000);
    }
});

containerSlide.addEventListener('mouseover', () => {
    clearInterval(intervalId);
});

containerSlide.addEventListener('mouseout', () => {
    if (window.innerWidth <= 375) {
        intervalId = setInterval(nextSlide, 4000);
    }
});