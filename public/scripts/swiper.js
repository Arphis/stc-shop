const carousel = document.querySelector('.container')
const section = document.querySelector('.swiper-section')
const arrowBtns = document.querySelectorAll('.swiper-section .arrows')
const firstCardWidth = carousel.querySelector('.content').offsetWidth;
const carouselChildren = [...carousel.children]
const cardWidth = carousel.querySelector('.content').width
const rightArrowBtn = document.getElementById('right')
let isDragging = false, startX, startScrollLeft,timeoutId;

//get the number of cards that can fit in the carousel at once

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth)
//insert copes of the last few cards to beginning of carousel for infinite scrolling
carouselChildren.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML('afterbegin', card.outerHTML)
})

carouselChildren.slice(0, +cardPerView).forEach(card => {
    carousel.insertAdjacentHTML('beforeend', card.outerHTML)
})

arrowBtns.forEach(btn => {

    btn.addEventListener('click', () => {
        console.log(firstCardWidth)
  carousel.scrollLeft += btn.id === 'right' ? -firstCardWidth : firstCardWidth
 }
)})

const dragstart = (e) => {
    isDragging = true;
    carousel.classList.add('dragging');

    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}

const dragging = (e) => {
    if(!isDragging) return;

    carousel.scrollLeft = startScrollLeft - ( e.pageX - startX );
}


const autoPlay = (e) => {

    if(window.innerWidth < 800) return;

    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500)
}

autoPlay();


const dragStop = () => {
    isDragging = false;
    carousel.classList.remove('dragging')
}




const reveal = () => {
  
let reveals = document.querySelector('.swiper-section')
 
        let windowHeight = window.innerHeight;
        var revealtop = reveals.getBoundingClientRect().top;
        var revealpoint = 100

        if(revealtop < windowHeight - revealpoint) {
           reveals.classList.add('active')
        }
        else {
            reveals.classList.remove('active')
        }

 }
 const reveal2 = () => {
  
    let reveals1 = document.querySelector('.featured-product')
     
            let windowHeight1 = window.innerHeight;
            var revealtop = reveals1.getBoundingClientRect().top;
            var revealpoint = 100
    
            if(revealtop < windowHeight1 - revealpoint) {
               reveals1.classList.add('active')
            }
            else {
                reveals1.classList.remove('active')
            }
    
     }


 window.addEventListener('scroll', reveal)
 window.addEventListener('scroll', reveal2 )





const infiniteScroll = () => {
  console.log(carousel.offsetWidth)
  console.log(carousel.scrollWidth)
    //if the carousel is at hte bginning scroll to the end
    if(carousel.scrollLeft === 0 ) {
        console.log('u be scrolled to the left')
        carousel.classList.add('no-transition')
carousel.scrollLeft = carousel.scrollWidth  -  (2 * carousel.offsetWidth) 
carousel.classList.remove('no-transition')

// if the carousel is at the end scroll to the beginning
//I need to make this part work in 6 clicks instead of 7
//the reson this doesnt work is because somehow the offsetWidth is less than needed, maybe margins etc.
//I resolved the issue: it was due to not the same card size and therefore grid-auto-columns and gap calculation ratio.

    } else if (carousel.scrollLeft === carousel.scrollWidth - carousel.offsetWidth   ) {

    carousel.classList.remove('no-transition')  
 console.log('scrolled to the right end')
carousel.classList.add('no-transition');
 carousel.scrollLeft =  carousel.offsetWidth  ;
    carousel.classList.remove('no-transition')
    }
    clearTimeout(timeoutId)
    if (!section.matches(":hover")) autoPlay()
}





carousel.addEventListener('mousedown', dragstart)

carousel.addEventListener('mousemove', dragging)

document.addEventListener('mouseup', dragStop)
section.addEventListener('mouseenter', () => clearTimeout(timeoutId) )
section.addEventListener('mouseleave', autoPlay)

carousel.addEventListener('scroll', infiniteScroll)


"use strict"
const leftArrow = document.querySelector('.left-arrow .bxs-left-arrow' ),
    rightArrow = document.querySelector('.right-arrow .bxs-right-arrow'),
    slider = document.querySelector('.slider');
/*--------scroll to right------------*/   
function scrollRight(){
    if (slider.scrollWidth - slider.clientWidth === slider.scrollLeft) {
        slider.scrollTo({
            left: 0,
            behavior: "smooth"
        });
    }else{
        slider.scrollBy({
            left: window.innerWidth,
            behavior: "smooth"
        })
    }
}
/*--------scroll to left------------*/ 
function scrollLeft(){
    slider.scrollBy({
        left: -window.innerWidth,
            behavior: "smooth"
    })
} 
let timerId = setInterval(scrollRight, 5000);

/*--------reset timer to scroll right------------*/ 
function resetTimer(){
    clearInterval(timerId);
    timerId = setInterval(scrollRight, 5000);
}
/*--------scroll event------------*/ 
slider.addEventListener("click", function (event) {
    if (event.target === leftArrow) {
        scrollLeft();
        resetTimer();
    }
});

slider.addEventListener("click", function (event) {
    if (event.target === rightArrow) {
        scrollRight();
        resetTimer();
    }
});
