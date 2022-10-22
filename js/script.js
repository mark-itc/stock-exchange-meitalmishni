import { getCompanyData } from './company.js';

const container = document.getElementById("stock-exchange-container");
const searchForm = document.getElementById("search-form");
const loader = document.getElementById('loader');
const marquee = document.getElementById("marquee");
const marqueeUi = document.getElementById("marquee-content");

function createCompanyCard(name, symbol, image, percentage) {
    const cardDiv = document.createElement("div");
    const cardA = document.createElement("a");
    const cardImg = document.createElement("img");
    const cardSpan = document.createElement("span");

    cardA.setAttribute("href", "./company.html?symbol=" + symbol);
    cardA.setAttribute("target", "_blank");
    cardA.innerHTML = name + "(" + symbol + ")";

    cardImg.setAttribute("src", image);
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

async function getSearchData(searchType, searchQuery, searchLimit, searchExchange) {
    try {
        const url =
            "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/" +
            searchType +
            "?query=" +
            encodeURIComponent(searchQuery) +
            "&limit=" +
            searchLimit +
            "&exchange=" +
            searchExchange;

        const response = await fetch(url);
        const results = await response.json();

        return results;
    } catch (error) {
        return [];
    }
}


async function runSearch(e) {
    const searchQuery = document.getElementById("search-input").value;

    container.innerHTML = "";

    loader.classList.add("spinner-border");
    const results = await getSearchData("search", searchQuery, 10, "NASDAQ");
    loader.classList.remove("spinner-border");

    if (!results) return;

    results.forEach(async (item) => {
        const details = await getCompanyData(item.symbol);
        const companyProfile = details.profile;

        const card = createCompanyCard(item.name, item.symbol, companyProfile.image, companyProfile.changesPercentage);
        container.appendChild(card);
    });
}

window.onload = async () => {
    searchForm.addEventListener("submit", (e) => {
        e.preventDefault();
        runSearch();
    });

    const marqueeElement = new Marquee(marquee);
}