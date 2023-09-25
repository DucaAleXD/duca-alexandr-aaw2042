const produseDiv = document.getElementById('produse')
const formFilter = document.getElementById('form-filter')
const cateegoriiDiv = document.getElementById('categorii')
const afiseazaProduse = (produse) => {
    produseDiv.innerHTML = ''
    produse.forEach(produs => {
        produseDiv.innerHTML += `<div class ='card' id='${produs.id}'>
        <img src="${produs.imagine}" alt="">
        <h6>${produs.nume}</h6>
        <p>Pret: ${produs.pret} lei</p>
        <p>Categorie: ${produs.categoria}</p>
        <button class="btn_botom">Cumpara acum</button>
        </div>`
    })
}

const sortProduse = (data, condition) => {
    switch (condition) {
        case 'asc':
            data.sort((a, b) => a.pret - b.pret)
            break;
        case 'desc':
            data.sort((a, b) => b.pret - a.pret)
            break;
        default:
            console.log('Nu exista asa conditie')
            break;
    }
    return data
}
const filtreazaProdusele = () => {
    fetch('produse.json')
        .then(response => response.json())
        .then(produse => {
            const checks = document.querySelectorAll('input:checked')
            produseDiv.innerHTML = ""
            Array.from(checks).forEach(check => {
                const produseFiltrate = produse.filter(produs => {
                    return produs.categoria === check.id

                })
                produseFiltrate.forEach(produs => {
                    produseDiv.innerHTML += `<div class ='card' id='${produs.id}'>
                    <img src="${produs.imagine}" alt="">
                        <h6>${produs.nume}</h6>
                        <p>Pret: ${produs.pret} lei</p>
                        <p>Categoria: ${produs.categoria}</p>
                        <button class="btn_botom">Cumpara acum</button>
                    </div>`
                })
            })
        })
}
const afiseazaCategorii = (data) => {
    const categorii = data.map(produs => produs.categoria)
    const categoriiUnice = new Set(categorii)
    Array.from(categoriiUnice).forEach(categorie => {
        cateegoriiDiv.innerHTML += `<div class="categorie">
        <input type="checkbox" id="${categorie}"name="categorie" oninput="filtreazaProdusele()">
        <label for="${categorie}">${categorie}</label>
        </div>`
    })

}
fetch('produse.json')
    .then(response => response.json())
    .then(data => {
        afiseazaProduse(data)
        afiseazaCategorii(data)
    })
    .catch(e => console.error(e))

formFilter.addEventListener('submit', (e) => {
    e.preventDefault()
    fetch('produse.json')
        .then(response => response.json())
        .then(data => {
            let condition = e.target.pret.value
            const produseSortate = sortProduse(data, condition)
            afiseazaProduse(produseSortate)
        })
        .catch(e => console.error(e))
})