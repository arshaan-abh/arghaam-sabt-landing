class Slider {
    constructor(duration, delay) {
        this.slides = document.getElementsByClassName("slide-image");
        this.slideNumbers = document.getElementsByClassName("slide-title");
        this.slideContents = document.querySelectorAll(".content-container .slide-content");
        this.pauseSlider = document.querySelectorAll(".pause-slider");
        this.sliderTimer = document.querySelector(".slider-timer");
        this.activeSlide = 0;
        this.timer = [0];
        this.howMuchTimeHasPassedBeforeThePause = [0];
        this.isFirstTime = true;
        this.duration = duration;
        this.delay = delay;
        setTimeout(this.load.bind(this), this.delay);
    }
    convertMillisecondToSecond(millisecond) {
        return millisecond * 1000;
    }
    startCount() {
        this.start = new Date();
    }
    endCount() {
        let end = new Date();
        return end.valueOf() - this.start.valueOf();
    }
    load() {
        this.startCount();
        document.querySelector(':root').style.setProperty("--slider-animation-duration", this.convertMillisecondToSecond(this.duration) + 's');
        this.slides[this.slides.length - 1].classList.add("last");
        for (let i = 0; i < this.slideNumbers.length; i++) {
            this.slideNumbers[i].addEventListener("click", this.setActiveTo.bind(this, i));
        }
        this.sliderTimer.classList.add("animated");
        for (let i = 0; i < this.pauseSlider.length; i++) {
            this.pauseSlider[i].addEventListener("mouseenter", this.pause.bind(this));
            this.pauseSlider[i].addEventListener("mouseleave", this.play.bind(this));
        }
        // this.setSliderInterval()
        this.play();
    }
    clearAllIntervals() {
        for (let i = 0; i < this.timer.length; i++) {
            clearInterval(this.timer[i]);
            clearTimeout(this.timer[i]);
        }
        this.timer = [];
    }
    pause() {
        this.isFirstTime = false;
        this.sliderTimer.classList.add("paused");
        this.clearAllIntervals();
        this.howMuchTimeHasPassedBeforeThePause.push(this.endCount());
    }
    play() {
        let allTime = 0;
        this.startCount();
        for (let i = 0; i < this.howMuchTimeHasPassedBeforeThePause.length; i++) {
            allTime += this.howMuchTimeHasPassedBeforeThePause[i];
        }
        this.sliderTimer.classList.remove("paused");
        if (!this.isFirstTime) {
        }
        this.timer.push(setTimeout(function () {
            this.setActive();
            this.setSliderInterval();
        }.bind(this), this.duration - allTime));
    }
    setSliderInterval() {
        this.timer.push(setInterval(this.setActive.bind(this), this.duration));
    }
    setActive() {
        this.isFirstTime = true;
        this.startCount();
        this.howMuchTimeHasPassedBeforeThePause = [0];
        let nextSlide = this.activeSlide + 1;
        if (nextSlide >= this.slides.length)
            nextSlide = 0;
        this.slideContents[nextSlide].classList.add("active");
        this.slideContents[this.activeSlide].classList.remove("active");
        document.querySelector(".content-container").style.setProperty("--active-content", nextSlide.toString());
        this.slideNumbers[nextSlide].classList.add("active");
        this.slideNumbers[this.activeSlide].classList.remove("active");
        document.querySelector(".title-container").style.setProperty("--active-number", nextSlide.toString());
        this.slides[nextSlide].classList.add("active", "active-transition");
        this.slides[this.activeSlide].classList.remove("active", "active-transition");
        document.querySelector(".slider").style.setProperty("--active-slide", nextSlide.toString());
        this.activeSlide++;
        if (this.activeSlide >= this.slides.length)
            this.activeSlide = 0;
        return "";
    }
    setActiveTo(nextSlide) {
        if (nextSlide !== this.activeSlide) {
            this.startCount();
            this.howMuchTimeHasPassedBeforeThePause = [0];
            this.clearAllIntervals();
            this.sliderTimer.style.animation = "none";
            setTimeout(() => {
                this.sliderTimer.style.animation = "";
            }, 1);
            this.slideContents[nextSlide].classList.add("active");
            this.slideContents[this.activeSlide].classList.remove("active");
            document.querySelector(".content-container").style.setProperty("--active-content", nextSlide.toString());
            this.slideNumbers[nextSlide].classList.add("active");
            this.slideNumbers[this.activeSlide].classList.remove("active");
            document.querySelector(".title-container").style.setProperty("--active-number", nextSlide.toString());
            this.slides[nextSlide].classList.add("active", "active-transition");
            this.slides[this.activeSlide].classList.remove("active", "active-transition");
            document.querySelector(".slider").style.setProperty("--active-slide", nextSlide.toString());
            this.activeSlide = nextSlide;
        }
        return "";
    }
}
class Untitled {
    constructor() {
        this.postsDetail();
        new Slider(5000, 0);
    }
    postsDetail() {
        let hoverCover = document.querySelectorAll(".box-cover:not(.short)");
        let shortHoverCover = document.querySelectorAll(".box-cover.short");
        let marginTopMax;
        let marginTopMaxShort;
        for (let index = 0; index < hoverCover.length; index++) {
            marginTopMax = (this.outerHeight(hoverCover[index]) - (this.outerHeight(hoverCover[index].querySelector(".box-title")) + this.outerHeight(hoverCover[index].querySelector(".box-description")) + this.outerHeight(hoverCover[index].querySelector(".button")) + this.outerHeight(hoverCover[index].querySelector(".box-content"))));
            hoverCover[index].style.setProperty("--margin-top-max", marginTopMax + 'px');
        }
        for (let index = 0; index < shortHoverCover.length; index++) {
            marginTopMaxShort = (this.outerHeight(shortHoverCover[index]) - (this.outerHeight(shortHoverCover[index].querySelector(".box-title")) + this.outerHeight(hoverCover[index].querySelector(".box-description")) + this.outerHeight(shortHoverCover[index].querySelector(".button")) + this.outerHeight(shortHoverCover[index].querySelector(".box-content"))));
            shortHoverCover[index].style.setProperty("--margin-top-max", marginTopMaxShort + 'px');
        }
    }
    outerHeight(element) {
        const height = element.offsetHeight, style = window.getComputedStyle(element);
        return ['top', 'bottom']
            .map(side => parseInt(style[`margin-${side}`]))
            .reduce((total, side) => total + side, height);
    }
}
function main() {
    let right = document.querySelector(".right");
    let left = document.querySelector(".left");
    let itemContainerIn = document.querySelector(".sub-content .item-container > *");
    let itemContainer = document.querySelector(".sub-content .item-container");
    right.addEventListener("click", leftF);
    left.addEventListener("click", rightF);
    function rightF() {
        let currentIndex = parseInt(getComputedStyle(itemContainer).getPropertyValue("--index"));
        currentIndex++;
        if (currentIndex >= Math.round(itemContainerIn.children.length / 2))
            currentIndex = 0;
        itemContainer.style.setProperty("--index", currentIndex.toString());
    }
    function leftF() {
        let currentIndex = parseInt(getComputedStyle(itemContainer).getPropertyValue("--index"));
        currentIndex--;
        if (currentIndex < 0)
            currentIndex = Math.round(itemContainerIn.children.length / 2) - 1;
        itemContainer.style.setProperty("--index", currentIndex.toString());
    }
    new Untitled();
}
//# sourceMappingURL=main.js.map