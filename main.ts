class Slider {
    convertMillisecondToSecond(millisecond:number):number{
        return millisecond * 1000
    }

    private slides: HTMLCollectionOf<Element> = document.getElementsByClassName("slide-image")
    private slideNumbers: HTMLCollectionOf<Element> = document.getElementsByClassName("slide-title")
    private slideContents: NodeListOf<HTMLElement> = document.querySelectorAll(".content-container .slide-content")
    private pauseSlider: NodeListOf<HTMLElement> = document.querySelectorAll<HTMLElement>(".pause-slider")
    private sliderTimer: HTMLElement = document.querySelector(".slider-timer")
    private activeSlide: number = 0

    private readonly delay: number;
    private readonly duration: number;
    private timer: Array<number> = [0];
    private howMuchTimeHasPassedBeforeThePause: Array<number> = [0];
    private start: Date;

    private startCount(): void {
        this.start = new Date();
    }

    private endCount(): number {
        let end = new Date();
        return end.valueOf() - this.start.valueOf();
    }

    constructor(duration, delay) {
        this.duration = duration
        this.delay = delay

        setTimeout(this.load.bind(this), this.delay)
    }

    public load(): void {


        this.startCount();
        document.querySelector<HTMLElement>(':root').style.setProperty("--slider-animation-duration", this.convertMillisecondToSecond(this.duration) + 's')
        this.slides[this.slides.length - 1].classList.add("last");
        for (let i = 0; i < this.slideNumbers.length; i++) {
            this.slideNumbers[i].addEventListener("click", this.setActiveTo.bind(this, i))
        }
        this.sliderTimer.classList.add("animated");

        for (let i = 0; i < this.pauseSlider.length; i++) {
            this.pauseSlider[i].addEventListener("mouseenter", this.pause.bind(this))
            this.pauseSlider[i].addEventListener("mouseleave", this.play.bind(this))
        }
        // this.setSliderInterval()
        this.play()
    }


    private isFirstTime: boolean = true;

    private clearAllIntervals() {
        for (let i = 0; i < this.timer.length; i++) {
            clearInterval(this.timer[i]);
            clearTimeout(this.timer[i]);
        }
        this.timer = []
    }

    private pause(): void {
        this.isFirstTime = false
        this.sliderTimer.classList.add("paused");

        this.clearAllIntervals()
        this.howMuchTimeHasPassedBeforeThePause.push(this.endCount())

    }


    private play(): void {

        let allTime = 0;
        this.startCount();

        for (let i = 0; i < this.howMuchTimeHasPassedBeforeThePause.length; i++) {
            allTime += this.howMuchTimeHasPassedBeforeThePause[i]
        }

        this.sliderTimer.classList.remove("paused");
        if (!this.isFirstTime) {

        }
        this.timer.push(setTimeout(function () {
            this.setActive()

            this.setSliderInterval()

        }.bind(this), this.duration - allTime))
    }

    private setSliderInterval(): any {
        this.timer.push(setInterval(this.setActive.bind(this), this.duration))
    }


    private setActive(): TimerHandler {
        this.isFirstTime = true;

        this.startCount();
        this.howMuchTimeHasPassedBeforeThePause = [0]

        let nextSlide = this.activeSlide + 1
        if (nextSlide >= this.slides.length)
            nextSlide = 0
        this.slideContents[nextSlide].classList.add("active")
        this.slideContents[this.activeSlide].classList.remove("active")
        document.querySelector<HTMLElement>(".content-container").style.setProperty("--active-content", nextSlide.toString())
        this.slideNumbers[nextSlide].classList.add("active")
        this.slideNumbers[this.activeSlide].classList.remove("active")
        document.querySelector<HTMLElement>(".title-container").style.setProperty("--active-number", nextSlide.toString())
        this.slides[nextSlide].classList.add("active", "active-transition")
        this.slides[this.activeSlide].classList.remove("active", "active-transition")
        document.querySelector<HTMLElement>(".slider").style.setProperty("--active-slide", nextSlide.toString())
        this.activeSlide++
        if (this.activeSlide >= this.slides.length)
            this.activeSlide = 0
        return ""
    }

    private setActiveTo(nextSlide: number): TimerHandler {


        if (nextSlide !== this.activeSlide) {

            this.startCount();
            this.howMuchTimeHasPassedBeforeThePause = [0]
            this.clearAllIntervals()
            this.sliderTimer.style.animation = "none"
            setTimeout(() => {
                this.sliderTimer.style.animation = ""
            }, 1)

            this.slideContents[nextSlide].classList.add("active")
            this.slideContents[this.activeSlide].classList.remove("active")
            document.querySelector<HTMLElement>(".content-container").style.setProperty("--active-content", nextSlide.toString())

            this.slideNumbers[nextSlide].classList.add("active")
            this.slideNumbers[this.activeSlide].classList.remove("active")
            document.querySelector<HTMLElement>(".title-container").style.setProperty("--active-number", nextSlide.toString())

            this.slides[nextSlide].classList.add("active", "active-transition")
            this.slides[this.activeSlide].classList.remove("active", "active-transition")
            document.querySelector<HTMLElement>(".slider").style.setProperty("--active-slide", nextSlide.toString())

            this.activeSlide = nextSlide;
        }
        return ""
    }


}

class Untitled {
    constructor() {
        this.postsDetail()
        new Slider(5000, 0)
    }

    private postsDetail() {
        let hoverCover: NodeListOf<HTMLElement> = document.querySelectorAll(".box-cover:not(.short)")
        let shortHoverCover: NodeListOf<HTMLElement> = document.querySelectorAll(".box-cover.short")
        let marginTopMax: number;
        let marginTopMaxShort: number;


        for (let index: number = 0; index < hoverCover.length; index++) {
            marginTopMax = (this.outerHeight(hoverCover[index]) - (this.outerHeight(hoverCover[index].querySelector(".box-title")) + this.outerHeight(hoverCover[index].querySelector(".box-description")) + this.outerHeight(hoverCover[index].querySelector(".button")) + this.outerHeight(hoverCover[index].querySelector(".box-content"))))

            hoverCover[index].style.setProperty("--margin-top-max", marginTopMax + 'px')
        }
        for (let index: number = 0; index < shortHoverCover.length; index++) {
            marginTopMaxShort = (this.outerHeight(shortHoverCover[index]) - (this.outerHeight(shortHoverCover[index].querySelector(".box-title")) + this.outerHeight(hoverCover[index].querySelector(".box-description")) + this.outerHeight(shortHoverCover[index].querySelector(".button")) + this.outerHeight(shortHoverCover[index].querySelector(".box-content"))))
            shortHoverCover[index].style.setProperty("--margin-top-max", marginTopMaxShort + 'px')
        }
    }

    private outerHeight(element: HTMLElement) {
        const height = element.offsetHeight,
            style = window.getComputedStyle(element)

        return ['top', 'bottom']
            .map(side => parseInt(style[`margin-${side}`]))
            .reduce((total, side) => total + side, height)
    }
}

function main(): void {

    let right = document.querySelector<HTMLElement>(".right")
    let left = document.querySelector<HTMLElement>(".left")
    let itemContainerIn = document.querySelector<HTMLElement>(".sub-content .item-container > *")
    let itemContainer = document.querySelector<HTMLElement>(".sub-content .item-container")
    right.addEventListener("click", leftF)
    left.addEventListener("click", rightF)

    function rightF() {
        let currentIndex = parseInt(getComputedStyle(itemContainer).getPropertyValue("--index"))
        currentIndex++
        if (currentIndex >= Math.round(itemContainerIn.children.length / 2))
            currentIndex = 0
        itemContainer.style.setProperty("--index", currentIndex.toString())
    }

    function leftF() {
        let currentIndex = parseInt(getComputedStyle(itemContainer).getPropertyValue("--index"))
        currentIndex--
        if (currentIndex < 0)
            currentIndex = Math.round(itemContainerIn.children.length / 2) - 1
        itemContainer.style.setProperty("--index", currentIndex.toString())
    }


    new Untitled()
}



