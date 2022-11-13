// slides swipe
let slides = document.querySelectorAll('.carousel__slide');
slides.forEach(function (s) {
    // when mouse pressed down
    s.addEventListener('mousedown', function (e) {
        let originalEle = e.target
        let startPoint = e.clientX;
        // adding mouse move event
        this.addEventListener('mousemove', swipe);
        // removing mouse move event
        document.addEventListener('mouseup', function () {
            originalEle.removeEventListener('mousemove', swipe);
        });
        // swipe func
        function swipe(e) {
            let change = startPoint - e.clientX;
            originalEle.parentNode.scrollBy(change, 0);
        }
    });
})

// when carousel__container onscroll
let conts = document.querySelectorAll('.carousel__container');
conts.forEach(function (c) {
    // when buttons click
    let prevBtn = c.querySelector('.prev-button');
    let nexBtn = c.querySelector('.next-button');
    prevBtn.addEventListener('click', function () {
        console.log('prev');
        c.scrollBy(-50, 0);
    })
    nexBtn.addEventListener('click', function () {
        console.log('next');
        c.scrollBy(50, 0);
    })

    let slides = c.querySelectorAll('.carousel__slide');
    let slideNum = slides.length;
    let gap = parseFloat(window.getComputedStyle(c).gap);

    c.addEventListener('scroll', function (e) {
        let originalEle = e.target;
        let slides = this.querySelectorAll('.carousel__slide')
        this.classList.add('onScroll');
        setTimeout(function () {
            originalEle.classList.remove('onScroll');
        }, 150)

        let cw = this.clientWidth;
        carouselSpy.bind(this)(gap, cw, slideNum, slides, prevBtn, nexBtn);
    })
})

// carousel spy
function carouselSpy(gap, cw, slideNum, slides, prevBtn, nexBtn) {

    // reset disable btn
    prevBtn.removeAttribute('disabled');
    nexBtn.removeAttribute('disabled');

    // to disable btn
    if (this.scrollLeft == 0) {
        prevBtn.setAttribute('disabled', true);
    } else if(this.scrollLeft == ((cw * (slideNum - 1)) + ((slideNum - 1) * gap))){
        nexBtn.setAttribute('disabled', true);
    } 

    // scroll-left: 0 => 1st slide, prev (disabled)
    // scroll-left: (cw * 1) + (1 * 50) => 2nd slide
    // scroll-left: (cw * 2) + (2 * 50) => 3nd slide
    // scroll-left: (cw * 3) + (3 * 50) => 4nd slide        

    // to change aria-hidden attribute
    for (let i = 0; i < slideNum; i++){
        let scrollLeft = (cw * i) + (i * gap);
        if (scrollLeft == this.scrollLeft) {
            // (i+1)th slide go here => in 'index' = i
            slides[i].setAttribute('aria-hidden', 'false');
            break;
        } else {
            slides[i].setAttribute('aria-hidden', 'true');
        }
    }  
}





