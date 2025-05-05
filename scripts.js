document.addEventListener("DOMContentLoaded", () => {
  const faqItems = document.querySelectorAll(".faq-item");

  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    question.addEventListener("click", () => {
      // Check if the clicked item is already active
      const isActive = item.classList.contains("active");

      // Collapse all FAQ items
      faqItems.forEach((otherItem) => {
        otherItem.classList.remove("active");
        const otherAnswer = otherItem.querySelector(".faq-answer");
        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
      });

      // Expand the clicked item if it was not already active
      if (!isActive) {
        item.classList.add("active");
        if (answer) {
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      }
    });
  });

  const sections = document.querySelectorAll("section");

  const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    sections.forEach((section) => {
      const sectionTop = section.getBoundingClientRect().top;
      if (sectionTop < windowHeight * 0.8) { // 20% from the top
        section.classList.add("visible");
      } else {
        section.classList.remove("visible");
      }
    });
  };

  window.addEventListener("scroll", revealOnScroll);
  revealOnScroll(); // Trigger on page load in case some sections are already in view
});

document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navbar = document.querySelector('.navbar');
  const navbarLinks = document.querySelector('.navbar-links');

  if (menuToggle && navbar && navbarLinks) {
    menuToggle.addEventListener('click', () => {
      navbarLinks.classList.toggle('expanded');
      navbar.classList.toggle('expanded');
    });
  }
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll(
        ".header-section, .features-list-section, .feature-section, .testimonial-section, .cta-section, .faq-section"
    );
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("visible");
                }
            });
        },
        { threshold: 0.1 }
    );

    sections.forEach((section) => observer.observe(section));
});

document.addEventListener("DOMContentLoaded", () => {
    const scrollItems = document.querySelectorAll(".scroll-animation-item");

    const handleScrollAnimation = () => {
        scrollItems.forEach((item) => {
            const rect = item.getBoundingClientRect();
            const speed = item.dataset.speed || 1;
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                item.style.opacity = 1;
                item.style.transform = `translateY(${rect.top * speed * -0.1}px)`;
            } else {
                item.style.opacity = 0;
                item.style.transform = "translateY(50px)";
            }
        });
    };

    window.addEventListener("scroll", handleScrollAnimation);
    handleScrollAnimation(); // Trigger on load
});

document.addEventListener("DOMContentLoaded", () => {
    const floatingItems = document.querySelectorAll(".floating-item");

    function detectCollisions() {
        floatingItems.forEach((item1, index1) => {
            const rect1 = item1.getBoundingClientRect();
            floatingItems.forEach((item2, index2) => {
                if (index1 !== index2) {
                    const rect2 = item2.getBoundingClientRect();
                    if (
                        rect1.left < rect2.right &&
                        rect1.right > rect2.left &&
                        rect1.top < rect2.bottom &&
                        rect1.bottom > rect2.top
                    ) {
                        // Reverse directions on collision
                        item1.style.animationDirection = "reverse";
                        item2.style.animationDirection = "reverse";
                    }
                }
            });
        });
    }

    setInterval(detectCollisions, 100); // Check for collisions every 100ms
});

document.addEventListener("DOMContentLoaded", () => {
    const scrollSection = document.querySelector(".scrollable-section");
    const rows = document.querySelectorAll(".scroll-row");
    let currentRow = 0;
    let isThrottled = false;

    const changeRow = (direction) => {
        if (isThrottled) return;
        isThrottled = true;

        rows.forEach((row) => row.classList.remove("active"));

        currentRow += direction;

        if (currentRow < 0) {
            // Move to the previous section when scrolling up from the first row
            const previousSection = scrollSection.previousElementSibling;
            if (previousSection) {
                previousSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            currentRow = 0; // Reset to the first row
        } else if (currentRow >= rows.length) {
            // Move to the next section when scrolling down from the last row
            const nextSection = scrollSection.nextElementSibling;
            if (nextSection) {
                nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
            }
            currentRow = rows.length - 1; // Reset to the last row
        } else {
            rows[currentRow].classList.add("active");
        }

        setTimeout(() => (isThrottled = false), 800); // Match transition duration
    };

    const handleScroll = (event) => {
        if (scrollSection.classList.contains("scrollable-section")) {
            event.preventDefault(); // Prevent default scrolling behavior
            if (event.deltaY > 0) {
                if (currentRow === rows.length - 1) {
                    // Automatically move to the next section after the last row
                    const nextSection = scrollSection.nextElementSibling;
                    if (nextSection) {
                        nextSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                } else {
                    changeRow(1); // Scroll down
                }
            } else {
                if (currentRow === 0) {
                    // Automatically move to the previous section before the first row
                    const previousSection = scrollSection.previousElementSibling;
                    if (previousSection) {
                        previousSection.scrollIntoView({ behavior: "smooth", block: "start" });
                    }
                } else {
                    changeRow(-1); // Scroll up
                }
            }
        }
    };

    scrollSection.addEventListener("wheel", handleScroll);

    // Initialize the first row as active
    rows[currentRow].classList.add("active");
});