const container = document.getElementById("stock-exchange-container");
const searchForm = document.getElementById("search-form");
const loader = document.getElementById('loader');

function createStockExchangeCard(name, symbol) {
    const cardDiv = document.createElement("div");
    const cardA = document.createElement("a");

    cardA.setAttribute("href", "./company.html?symbol=" + symbol);
    cardA.setAttribute("target", "_blank");
    cardA.innerHTML = name + "(" + symbol + ")";

    cardDiv.classList.add("search-div");
    cardDiv.appendChild(cardA);

    return cardDiv;
}

async function getStockExchange(searchType, searchQuery, searchLimit, searchExchange) {
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
    const results = await getStockExchange("search", searchQuery, 10, "NASDAQ");
    loader.classList.remove("spinner-border");

    if (!results) return;

    results.forEach((item) => {
        const card = createStockExchangeCard(item.name, item.symbol);
        container.appendChild(card);
    });
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    runSearch();
});