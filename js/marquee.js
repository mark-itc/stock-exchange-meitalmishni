class Marquee {
    constructor(marqueeElement) {
        this.marqueeElement = marqueeElement;
    }

    async load() {
        try {
            this.marqueeElement.style.visibility = "hidden";
            const response = await fetch("https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/stock/list");
            const result = await response.json();
            this.marqueeElement.style.visibility = "visible";

            this.createMarqueeElement(result);

        } catch (error) {
            return false;
        }
    }

    async createMarqueeElement(data) {
        const marqueeData = await data;
        const marqueeDataSlice = marqueeData.slice(0, 50);
        const marqueeUi = this.marqueeElement.querySelector("#marquee-content");

        marqueeDataSlice.forEach(item => {
            const div = document.createElement("div");
            div.classList.add("marquee-tag");
            div.innerHTML = item.symbol + " $" + item.price;
            marqueeUi.append(div);
        });
    }
}