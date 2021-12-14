// Fetch API
async function fetchAllCoins() {
    let url = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=false';
    try {
        let response = await fetch(url);
        return await response.json();
    } catch (error) {
        console.log(error);
    }
}

// Fetch and Populate API Data in HTML
async function showAllCoins() {
    let coins = await fetchAllCoins();
    let html = '';
    coins.forEach(coin => {
        let htmlSegment = `<div class="card-desc" onclick="handleClick('${coin.id}')">
                                <img src="${coin.image}" width="100">
                                <div class="desc-border">
                                    <h3>${coin.id}, ${coin.symbol}</h3>
                                    <h1>${coin.name}</h1>
                                    <p>$${coin.current_price}</p>
                                </div>
                            </div>`;
        html += htmlSegment;
    });
    let container = document.querySelector('.container-card');
    container.innerHTML = html;
}
showAllCoins();

//
async function handleClick(coinID) {
    let coins = await fetchAllCoins();
    let coinData = coins.filter(data => {
        return data.id === coinID
    })
    console.log("filteredData", coinData)
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < coinData.length; i++) {
        let list = document.createElement('tr');
        list.innerHTML = "<td>" + `<img src=${coinData[i].image} width="100">` + "</td>" + "<td>" + `<input type="text" value="${coinData[i].id}" required>` + "</td>" + "<td>" + `<input type="text" value="${coinData[i].symbol}" required>` + "</td>" + "<td>" + `<input type="text" value="${coinData[i].name}" required>` + "</td>" + "<td>" + `<input type="number" value="${coinData[i].current_price}" step="any" required>` + "</td>" + "<td>" + `<button onclick="updateCoin(${coinData[i].id});" class="btn btn-success">Update</button>` + "</td>" + "<td>" + `<button onclick="deleteCoin('${i}','${coinData[i].id}');" class="btn btn-danger">Delete</button>` + "</td>";
        mainContainer.appendChild(list);
    }
}

//Add Data from HTML to JSON
let form = document.getElementById("form");
form.addEventListener("submit", function (e) {
    e.preventDefault()
    let coinImage = document.getElementById("imageurl").value;
    let coinId = document.getElementById("id").value;
    let coinSymbol = document.getElementById("symbol").value;
    let coinName = document.getElementById("name").value;
    let coinPrice = document.getElementById("price").value;
    window.alert("Data Added!");
    return fetch('http://localhost:3000/posts', {
        method: "POST",
        headers: {
            "Content-Type": "application/json; charset=UTF-8",
            "Accept": "application/json"
        },
        body: JSON.stringify({
            id: "",
            cimg: coinImage,
            cid: coinId,
            cs: coinSymbol,
            cn: coinName,
            cp: coinPrice
        })
    })
        .then(function (response) {
            if (response.status == 201) {
                form.reset();
            }
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        })
});
