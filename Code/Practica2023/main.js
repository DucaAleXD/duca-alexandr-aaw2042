const  bar = document.getElementById('bar')
const close =document.getElementById('close')
const nav = document.getElementById('navbar')

if (bar) {
    bar.addEventListener('click', () =>{
        nav.classList.add('active')
      
    })
}
if (close) {
    close.addEventListener('click', () =>{
        nav.classList.remove('active')
    })
}


fetch('js/category.json')
    .then(response => response.json())
    .then(category =>{
        const postBlock = document.querySelector('.category')
        category.forEach(categor => {
            postBlock.innerHTML+=`<div class='card'>
            <img src="${categor.imagine}">
            <h1>${categor.nume_category}</h1>
            </div>`
            
        });
    })

const sidebar = document.querySelector(".sidebar ")
const sidebarClose = document.querySelector("#sidebar-close ")
const sidebarOpen = document.querySelector("#sidebar-open")
const menu = document.querySelector(".menu-content")
const menuItems = document.querySelectorAll(".submenu-item")
const subMenuTitles = document.querySelectorAll(".submenu .menu-title")

sidebarClose.addEventListener("click", () => sidebar.classList.toggle("close"))
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close"))


menuItems.forEach((item, index) => {
    item.addEventListener("click", () => {
        menu.classList.add("submenu-active");
        item.classList.add("show-submenu");
        menuItems.forEach((item2, index2) => {
            if (index !== index2) {
                item2.classList.remove("show-submenu")
            }
        });
    });
});
subMenuTitles.forEach((title) => {
    title.addEventListener("click", () => {
        menu.classList.remove("submenu-active")
    });
});

console.log(menuItems, subMenuTitles)




(function() {

    let field = document.querySelector('.items');
    let li = Array.from(field.children);

    function FilterProduct() {
        for (let i of li) {
            const name = i.querySelector('strong');
            const x = name.textContent;
            i.setAttribute("data-category", x);
        }

        let indicator = document.querySelector('.indicator').children;

        this.run = function() {
            for (let i = 0; i < indicator.length; i++) {
                indicator[i].onclick = function() {
                    for (let x = 0; x < indicator.length; x++) {
                        indicator[x].classList.remove('active');
                    }
                    this.classList.add('active');
                    const displayItems = this.getAttribute('data-filter');

                    for (let z = 0; z < li.length; z++) {
                        li[z].style.transform = "scale(0)";
                        setTimeout(() => {
                            li[z].style.display = "none";
                        }, 500);

                        if ((li[z].getAttribute('data-category') == displayItems) || displayItems == "all") {
                            li[z].style.transform = "scale(1)";
                            setTimeout(() => {
                                li[z].style.display = "block";
                            }, 500);
                        }
                    }
                };
            }
        }
    }

    function SortProduct() {
        let select = document.getElementById('select');
        let ar = [];
        for (let i of li) {
            const last = i.lastElementChild;
            const x = last.textContent.trim();
            const y = Number(x.substring(1));
            i.setAttribute("data-price", y);
            ar.push(i);
        }
        this.run = () => {
            addevent();
        }

        function addevent() {
            select.onchange = sortingValue;
        }

        function sortingValue() {

            if (this.value === 'Default') {
                while (field.firstChild) { field.removeChild(field.firstChild); }
                field.append(...ar);
            }
            if (this.value === 'LowToHigh') {
                SortElem(field, li, true)
            }
            if (this.value === 'HighToLow') {
                SortElem(field, li, false)
            }
        }

        function SortElem(field, li, asc) {
            let dm, sortli;
            dm = asc ? 1 : -1;
            sortli = li.sort((a, b) => {
                const ax = a.getAttribute('data-price');
                const bx = b.getAttribute('data-price');
                return ax > bx ? (1 * dm) : (-1 * dm);
            });
            while (field.firstChild) { field.removeChild(field.firstChild); }
            field.append(...sortli);
        }
    }

    new FilterProduct().run();
    new SortProduct().run();
})();