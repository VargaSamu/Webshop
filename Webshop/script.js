let jelenlegiTermekek = [];
let kosarTartalom = [];

document.addEventListener("DOMContentLoaded", () => {

    kategoriakBetoltese();
    esemenyekBeallitasa();

});

function esemenyekBeallitasa() {

    document.getElementById("logo")
        .addEventListener("click", kezdooldal);

    document.getElementById("keresGomb")
        .addEventListener("click", termekKereses);

}

function kezdooldal() {
    document.getElementById("termekek").innerHTML = "";
    document.getElementById("udvozlo").style.display = "block";
}

function kategoriakBetoltese() {

    fetch(`https://fakestoreapi.com/products/categories`)
        .then(response => response.json())
        .then(kategoriak => {

            let menu = document.getElementById("kategoriak");
            menu.innerHTML = "";

            kategoriak.forEach(kategoria => {

                let li = document.createElement("li");
                li.className = "nav-item";

                let a = document.createElement("a");
                a.className = "nav-link";
                a.href = "#";
                a.textContent = kategoria;

                a.addEventListener("click", () => {
                    termekekBetoltese(kategoria);
                });

                li.appendChild(a);
                menu.appendChild(li);

            });

        });

}


function termekekBetoltese(kategoria) {

     fetch("https://fakestoreapi.com/products/category/" + kategoria)
        .then(response => response.json())
        .then(adatok => {

            jelenlegiTermekek = adatok;
            termekekMegjelenitese(adatok);

        });

}

function termekekMegjelenitese(termekek) {

    document.getElementById("udvozlo").style.display = "none";

    let tartalom = document.getElementById("termekek");
    tartalom.innerHTML = "";

    termekek.forEach(termek => {

        let col = document.createElement("div");
        col.className = "col-md-4 mb-4";

        col.innerHTML = `
            <div class="card h-100">

                <img src="${termek.image}">

                <div class="card-body">

                    <h6>${termek.title}</h6>
                    <p>${termek.price} USD</p>

                    <button class="btn btn-success">
                        Kosárba
                    </button>

                </div>

            </div>
        `;

        col.querySelector("button")
            .addEventListener("click", () => {
                kosarhozAd(termek.title, termek.price);
            });

        tartalom.appendChild(col);

    });

}


function termekKereses() {

    let szoveg = document.getElementById("kereso").value.toLowerCase();

    let szurt = jelenlegiTermekek.filter(termek =>
        termek.title.toLowerCase().includes(szoveg)
    );

    termekekMegjelenitese(szurt);
}

function kosarhozAd(nev, ar) {

    kosarTartalom.push({ nev, ar });
    kosarMegjelenitese();

}

function kosarMegjelenitese() {

    let kosarElem = document.getElementById("kosar");
    kosarElem.innerHTML = "";

    let osszeg = 0;

    kosarTartalom.forEach(tetel => {

        osszeg += tetel.ar;

        kosarElem.innerHTML += `
            <div class="kosarElem">
                ${tetel.nev} - ${tetel.ar} USD
            </div>
        `;

    });

    kosarElem.innerHTML += `
        <hr>
        <strong>Végösszeg: ${osszeg.toFixed(2)} USD</strong>
    `;
}