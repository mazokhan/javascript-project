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
        let htmlSegment = `<div class="card-desc">
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



// Add Data from HTML to JSON
let form = document.getElementById("form");
form.addEventListener("submit", function(e) {
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
    .then(function(response) {
        return response.json()
    })
    .then(function(data) {
        console.log(data)
    })
})



// Fetch and Populate JSON Data in HTML
fetch('http://localhost:3000/posts').then(function(response) {
    return response.json();
})
.then(function(data) {
    showMyCoins(data);
})
.catch(function(error) {
    console.log('error: ' + error);
});
function showMyCoins(data) {
    var mainContainer = document.getElementById("myData");
    for (var i = 0; i < data.length; i++) {
        let list = document.createElement('tr');
        list.innerHTML = "<td>"+`<img src=${data[i].cimg} width="100">`+"</td>" + "<td>" + `<input type="text" value="${data[i].cid}" required>` + "</td>" + "<td>" + `<input type="text" value="${data[i].cs}" required>` + "</td>" + "<td>" + `<input type="text" value="${data[i].cn}" required>` + "</td>" + "<td>" + `<input type="number" value="${data[i].cp}" step="any" required>` + "</td>" + "<td>" + `<button onclick="updateCoin(${data[i].id});" class="btn btn-success">Update</button>` + "</td>" + "<td>" + `<button onclick="deleteCoin(${data[i].id});" class="btn btn-danger">Delete</button>` + "</td>";
        mainContainer.appendChild(list);
    }
}



// Update the Populated Row HTML
function updateCoin(id) {
    let coinId = document.getElementById("id").value;
    let coinSymbol = document.getElementById("symbol").value;
    let coinName = document.getElementById("name").value;
    let coinPrice = document.getElementById("price").value;
    return fetch(`http://localhost:3000/posts/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify({
            id: id,
            cimg: coinImage,
            cid: coinId,
            cs: coinSymbol,
            cn: coinName,
            cp: coinPrice
        })
    })
}



// Delete the Populated Data Row HTML
function deleteCoin(id) {
    return fetch(`http://localhost:3000/posts/${id}`, {
        method: "DELETE"
    })
}