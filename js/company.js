async function getCompanyHistory(symbol) {
    try {
        const url =
            "https://stock-exchange-dot-full-stack-course-services.ew.r.appspot.com/api/v3/historical-price-full/" +
            symbol + "?serietype = line";

        const response = await fetch(url);
        const result = response.json();

        return result;
    } catch (error) {
        return false;
    }
}

export async function getCompanyData(symbol) {
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

window.onload = async () => {
    const companyImg = document.getElementById("company-img");
    const companyName = document.getElementById("company-name");
    const companyPrice = document.getElementById("company-price");
    const companyPercentages = document.getElementById("company-percentages");
    const companyDetails = document.getElementById("company-details");
    const loader = document.getElementById("loader");

    const urlParams = new URLSearchParams(window.location.search);
    const symbolName = urlParams.get("symbol");

    loader.classList.add('spinner-border');

    const details = await getCompanyData(symbolName);
    const companyProfile = details.profile;

    companyImg.setAttribute("src", companyProfile.image);

    companyName.setAttribute("href", companyProfile.website);
    companyName.setAttribute("target", "_blank");
    companyName.innerHTML = companyProfile.companyName;

    companyPrice.innerHTML = "Stock price: " + companyProfile.price + "$";
    companyPercentages.innerHTML = "(" + parseFloat(companyProfile.changesPercentage).toFixed(2) + "%)";

    if (companyProfile.changesPercentage > 0) {
        companyPercentages.style.color = "#74AB8D";
    } else {
        companyPercentages.style.color = "red";
    }

    companyDetails.innerHTML = companyProfile.description;

    const history = await getCompanyHistory(symbolName);
    const historyData = history.historical;

    const stockExchangeData = [];
    historyData.forEach((item) => {
        const object = { x: item.date, y: item.close }
        stockExchangeData.push(object);
    });

    stockExchangeData.reverse()

    const ctx = document.getElementById('myChart');
    const data = {
        datasets: [{
            label: 'Stock Price History',
            data: stockExchangeData,
            fill: true,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    };
    const myChart = new Chart(ctx, {
        type: 'line',
        data: data,
    });

    loader.classList.remove('spinner-border');
};