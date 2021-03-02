const slider = document.getElementById('slider'),
    sliderItems = document.getElementById('slides'),
    prev = document.getElementById('prev'),
    next = document.getElementById('next');

function slide(wrapper, items, prev, next) {
    let posX1 = 0,
        posX2 = 0,
        posInitial,
        posFinal,
        threshold = 100,
        slides = items.getElementsByClassName('slide'),
        slidesLength = slides.length,
        slideSize = window.matchMedia("(max-width: 600px)").matches ? 320 : 500,
        firstSlide = slides[0],
        lastSlide = slides[slidesLength - 1],
        cloneFirst = firstSlide.cloneNode(true),
        cloneLast = lastSlide.cloneNode(true),
        index = 0,
        small = window.matchMedia("(max-width: 600px)").matches,
        allowShift = true;

    // Clone first and last slide
    items.appendChild(cloneFirst);
    items.insertBefore(cloneLast, firstSlide);
    wrapper.classList.add('loaded');

    // Mouse events
    items.onmousedown = dragStart;

    // Touch events
    items.addEventListener('touchstart', dragStart);
    items.addEventListener('touchend', dragEnd);
    items.addEventListener('touchmove', dragAction);

    // Click events
    prev.addEventListener('click', function () { shiftSlide(-1) });
    next.addEventListener('click', function () { shiftSlide(1) });

    // Transition events
    items.addEventListener('transitionend', checkIndex);

    setData();

    function dragStart (e) {
        e = e || window.event;
        e.preventDefault();
        posInitial = items.offsetLeft;

        if (e.type == 'touchstart') {
            posX1 = e.touches[0].clientX;
        } else {
            posX1 = e.clientX;
            document.onmouseup = dragEnd;
            document.onmousemove = dragAction;
        }
    }

    function dragAction (e) {
        e = e || window.event;

        if (e.type == 'touchmove') {
            posX2 = posX1 - e.touches[0].clientX;
            posX1 = e.touches[0].clientX;
        } else {
            posX2 = posX1 - e.clientX;
            posX1 = e.clientX;
        }
        items.style.left = (items.offsetLeft - posX2) + "px";
    }

    function dragEnd (e) {
        posFinal = items.offsetLeft;
        if (posFinal - posInitial < -threshold) {
            shiftSlide(1, 'drag');
        } else if (posFinal - posInitial > threshold) {
            shiftSlide(-1, 'drag');
        } else {
            items.style.left = (posInitial) + "px";
        }
        document.onmouseup = null;
        document.onmousemove = null;
    }

    function point() {
        let adjustedIndex = index + 1;
        if(index + 1 > slidesLength) adjustedIndex = 1;
        small = window.matchMedia("(max-width: 600px)").matches
        slideSize = small ? 320 : 500;
        console.log(slideSize * adjustedIndex)
        items.style.left = -slideSize * adjustedIndex + "px";
    }

    window.matchMedia("(max-width: 600px)").addEventListener("change", point)

    function checkURLIndex() {
        let adjustedIndex = index + 1;
        if(index + 1 > slidesLength) adjustedIndex = 1;
        const urlParams = new URLSearchParams(window.location.search);
        const urlIndex = urlParams.get("characterIndex");
        let indexDiff = adjustedIndex - urlIndex;
        if(indexDiff !== 0) {
            while(indexDiff !== 0) {
                if (indexDiff > 0) {
                    shiftSlide(1);
                    indexDiff--;
                } else {
                    shiftSlide(-1);
                    indexDiff++;
                }
            }
        }
    }

    function setData() {
        let adjustedIndex = index + 1;
        if(index + 1 > slidesLength) adjustedIndex = 1;
       // window.history.pushState(null,null,window.location.search + "?characterIndex=" + adjustedIndex);
        document.getElementById("name").innerHTML = slides[adjustedIndex].dataset.name;
        document.getElementById("character-description").innerHTML = slides[adjustedIndex].dataset.description;
        document.getElementById("job").innerHTML = "<strong>Job:</strong> " + slides[adjustedIndex].dataset.job;
        document.getElementById("country").innerHTML = "<strong>Country:</strong> " + slides[adjustedIndex].dataset.country;
    }

    function shiftSlide(dir, action) {
        items.classList.add('shifting');
        if (allowShift) {
            if (!action) {
                posInitial = items.offsetLeft;
            }
            if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;
            } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;
            }
        }
        setData();
        allowShift = false;
    }

    function checkIndex (){
        items.classList.remove('shifting');

        if (index == -1) {
            items.style.left = -(slidesLength * slideSize) + "px";
            index = slidesLength - 1;
        }

        if (index == slidesLength) {
            items.style.left = -(1 * slideSize) + "px";
            index = 0;
        }

        allowShift = true;
    }
}

slide(slider, sliderItems, prev, next);
