document.addEventListener('click', documentClick);

function documentClick(e){
    const targetItem = e.target;
    if(targetItem.closest('.icon-menu')){
        document.documentElement.classList.toggle('menu-open');
    }
}

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

const characterElements = document.querySelectorAll('.characters__item-character');
const titleElements = document.querySelectorAll('.characters__item-title');

characterElements.forEach((character, index) => {
  character.addEventListener('mouseover', () => {
    color = ''
    switch (index) {
        case 0:
          color = "#D616A1";
          break;
        case 1:
            color = "#4D098C";
          break;
        case 2:
            color = "#590E7B";
          break;
        case 3:
            color = "#C300E3";
          break;
        case 4:
            color = "#D616A1";
          break;
        case 5:
            color = "#FF4AFF";
          break;
        default:
            color = "#7B149E";
          break;
      }
    titleElements[index].style.color = color;
  });

  character.addEventListener('mouseout', () => {
    titleElements[index].style.color = ''; // Повернути колір за замовчуванням
  });
});


document.addEventListener('DOMContentLoaded', function() {
    const historyRows = document.querySelectorAll('.history__row');

    function animateOnScroll() {
        historyRows.forEach((row, index) => {
          const item1 = row.querySelector(".history__row-item:first-child")
          const item2 = row.querySelector(".history__row-item:last-child")
          const blockPositionTop1 = item1.getBoundingClientRect().top;
          const blockPositionTop2 = item2.getBoundingClientRect().top;
          const blockPositionBottom1 = item1.getBoundingClientRect().bottom;
          const blockPositionBottom2 = item2.getBoundingClientRect().bottom;
          
          if(window.innerWidth >= 991.98){
              const isVisible = blockPositionTop1 + 200 < window.innerHeight && blockPositionBottom2 + 250 > 0;
              const isAboveViewport = blockPositionBottom2 - 200 < 0;
              if (isVisible && !isAboveViewport) {
                  item1.style.opacity = '1';
                  item1.classList.add('left-animation');
                  item2.style.opacity = '1';
                  item2.classList.add('right-animation');
              } else {
                  item1.classList.remove('left-animation');
                  item2.classList.remove('right-animation');
                  item1.style.opacity = '';
                  item2.style.opacity = '';
              }
          } else {
              const isVisible1 = blockPositionTop1 + 50 < window.innerHeight && blockPositionBottom1 + 50 > 0;
              const isAboveViewport1 = blockPositionBottom1 - 100 < 0;

              const isVisible2 = blockPositionTop2 + 50 < window.innerHeight && blockPositionBottom2 + 50 > 0;
              const isAboveViewport2 = blockPositionBottom2 - 100 < 0;

              if (isVisible1 && !isAboveViewport1) {
                  item1.style.opacity = '1';
                  
                  if (index % 2 === 0) {
                      item1.classList.add('right-animation');
                  } else {
                      item1.classList.add('left-animation');
                  }
              } else{
                  item1.classList.remove('left-animation');
                  item1.classList.remove('right-animation');
              }

              if (isVisible2 && !isAboveViewport2) {
                item2.style.opacity = '1';
                
                if (index % 2 === 0) {
                    item2.classList.add('left-animation');
                } else {
                    item2.classList.add('right-animation');
                }
            } else{
                item2.classList.remove('right-animation');
                item2.classList.remove('left-animation');
            }
          }
        });
    }

    window.addEventListener('scroll', animateOnScroll);
});

function showCards() {
  const cardsBlock = document.querySelector(".cards__items");
  cardsBlock.style.gridTemplateRows = " repeat(16, 1fr)";
  const closeCards = document.querySelectorAll(".cards__close-item");
  closeCards.forEach((card) => {
    card.style.display = "block";
  });
}



let scrolling = false;

function smoothScroll(target) {
    if (scrolling) return;
    scrolling = true;

    const offset = 100; // Відступ від верху секції (за потреби)
    const targetElement = document.querySelector(target);
    const targetPosition = targetElement.offsetTop - offset;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1000; // Тривалість анімації

    let startTimestamp;

    function animation(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = timestamp - startTimestamp;

        window.scrollTo(0, easeInOutCubic(progress, startPosition, distance, duration));

        if (progress < duration) {
            requestAnimationFrame(animation);
        } else {
            scrolling = false;
        }
    }

    requestAnimationFrame(animation);
}

function easeInOutCubic(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t * t + b;
    t -= 2;
    return c / 2 * (t * t * t + 2) + b;
}

document.querySelectorAll('.menu__link').forEach(item => {
    item.addEventListener('click', function(e) {
        e.preventDefault();
        const target = this.getAttribute('href');
        smoothScroll(target);
    });
});

var footerSocialLinks = document.querySelectorAll('.footer-menu__link');

footerSocialLinks.forEach((link) => {
    var computedStyles = window.getComputedStyle(link);
    var backgroundImage = computedStyles.getPropertyValue('background-image');
    var backgroundImageURL = backgroundImage.replace(/(url\("|"\))/g, '');
    backgroundImageURL = backgroundImageURL.replace(/\.svg$/, '');

    link.addEventListener('mouseenter', function() {
        link.style.backgroundImage = "url('" + backgroundImageURL + "-hover.svg')";
    });
    link.addEventListener('mouseleave', function() {
        link.style.backgroundImage = "url('" + backgroundImageURL + ".svg')";
    });
});

var footerUp = document.querySelector(".footer__up a");

var computedStyles = window.getComputedStyle(footerUp);
var backgroundImage = computedStyles.getPropertyValue('background-image');
var backgroundImageURL = backgroundImage.replace(/(url\("|"\))/g, '');
backgroundImageURL = backgroundImageURL.replace(/\.svg$/, '');

footerUp.addEventListener('mouseenter', function() {
    footerUp.style.backgroundImage = "url('" + backgroundImageURL + "-hover.svg')";
});
footerUp.addEventListener('mouseleave', function() {
    footerUp.style.backgroundImage = "url('" + backgroundImageURL + ".svg')";
});