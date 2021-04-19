let slide = document.querySelector('.slide');
let arrows = document.querySelectorAll('.slide__arrow');
let track = document.querySelector('.slide__track');
let items = document.querySelectorAll('.slide__item');
let cloneSlide;

// Set slide track width
track.style.width = slide.clientWidth * items.length + 'px';

// Function change slide
let changeSlide = (turn, items) => {
    if (turn === 'next') {
        cloneSlide = items[0].cloneNode(true);
        track.appendChild(cloneSlide);
        items[0].remove();
    } else {
        cloneSlide = items[items.length - 1].cloneNode(true);
        track.prepend(cloneSlide);
        items[items.length - 1].remove();
    }
};

// Handle event arrows slide
for (let arrow of arrows) {
    arrow.onclick = () => {
        items = document.querySelectorAll('.slide__item');
        if (arrow.classList.contains('slide__arrow--prev')) {
            changeSlide('prev', items);
        } else {
            changeSlide('next', items);
        }
    };
}
