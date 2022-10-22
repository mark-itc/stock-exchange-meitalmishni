class SearchResult {
    constructor(searchResultElement) {
        this.searchResultElement = searchResultElement;
    }

    async getCompanyData(symbol) {
        try {
            const url =
                "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/company/profile/" +
                symbol;

            const response = await fetch(url);
            const result = response.json();

            return result;
        } catch (error) {
            return false;
        }
    }

    createCompanyCard(name, symbol, image, percentage) {
        const cardDiv = document.createElement("div");
        const cardA = document.createElement("a");
        const cardImg = document.createElement("img");
        const cardSpan = document.createElement("span");

        cardA.setAttribute("href", "./company.html?symbol=" + symbol);
        cardA.setAttribute("target", "_blank");
        cardA.innerHTML = name + "(" + symbol + ")";
        cardA.innerHTML = cardA.innerHTML.replace(new RegExp(this.searchValue, "gi"), (match) => `<mark>${match}</mark>`);

        cardImg.setAttribute("src", image);
        cardImg.setAttribute("alt", "image");
        cardImg.classList.add("image-icone");

        cardSpan.innerHTML = "(" + percentage + ")";
        if (percentage > 0) {
            cardSpan.style.color = "#74AB8D";
        } else {
            cardSpan.style.color = "red";
        }

        cardDiv.classList.add("search-div");
        cardDiv.appendChild(cardImg);
        cardDiv.appendChild(cardA);
        cardDiv.appendChild(cardSpan);

        return cardDiv;
    }

    async renderResults(companies) {
        const searchValue = document.querySelector("#search-input").value;
        this.searchValue = searchValue;

        companies.forEach(async (item) => {
            const details = await this.getCompanyData(item.symbol);
            const companyProfile = details.profile;
            const card = this.createCompanyCard(item.name, item.symbol, companyProfile.image, companyProfile.changesPercentage);
            this.searchResultElement.appendChild(card);
        });
    }
}