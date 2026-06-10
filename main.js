import './style.css';

document.addEventListener('DOMContentLoaded', () => {
  window.scrollTo(0, 0);
  
  const track = document.querySelector('.carousel-track');
  const slides = Array.from(document.querySelectorAll('.snapshot-slide'));
  const nextButton = document.querySelector('[data-carousel-next]');
  const prevButton = document.querySelector('[data-carousel-prev]');
  const dots = Array.from(document.querySelectorAll('[data-carousel-dot]'));

  if (!track || slides.length === 0) return;

  let currentIndex = 0;

  const viewport = document.querySelector('.carousel-viewport');

  const updateCarousel = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === index);
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === index);
    });

    track.style.transform = `translateX(-${index * 100}%)`;
    currentIndex = index;

    if (viewport && slides[index]) {
      viewport.style.height = `${slides[index].offsetHeight}px`;
    }
  };

  // Wait for images to load before setting initial height
  window.addEventListener('load', () => {
    updateCarousel(currentIndex);
  });

  window.addEventListener('resize', () => {
    updateCarousel(currentIndex);
  });

  nextButton?.addEventListener('click', () => {
    const nextIndex = (currentIndex + 1) % slides.length;
    updateCarousel(nextIndex);
  });

  prevButton?.addEventListener('click', () => {
    const prevIndex = (currentIndex - 1 + slides.length) % slides.length;
    updateCarousel(prevIndex);
  });

  dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
      updateCarousel(index);
    });
  });
});
