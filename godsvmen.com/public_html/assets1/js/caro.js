function slideCarousel() {
  let items = document.querySelectorAll('.carousel .carousel-item');

  items.forEach((el) => {
    const minPerSlide = 4;
    let next = el.nextElementSibling;
    for (var i = 1; i < minPerSlide; i++) {
      if (!next) {
        // Wrap carousel by using first child
        next = items[0];
      }
      let cloneChild = next.cloneNode(true);
      el.appendChild(cloneChild.children[0]);
      next = next.nextElementSibling;
    }
  });
}

// Set the interval (in milliseconds) for sliding
const slideInterval = 2000; // 2 seconds

// Call the function initially
slideCarousel();

// Set an interval to call the function periodically
setInterval(slideCarousel, slideInterval);