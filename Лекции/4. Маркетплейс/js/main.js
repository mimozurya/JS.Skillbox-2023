const swiper = new Swiper(
    '.swiper-container',
    {
        loop: true,
        navigation: {
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev'
        }
    }
);

let allGoods = [];

function getGoods() {
    fetch('db/db.json').then(res => res.json()).then(result => { allGoods = result; })
}

const cart = {
    cartGoods: [],
    addCartID(id) {
        const goodItem = this.cartGoods.find(good => good.id === id);
        if (goodItem) {
            this.plusGood(id)
        } else {
            const { id: idx, name, price } = allGoods.find(good => good.id === id);
            this.cartGoods.push({ id: idx, name, price, count: 1 });
            this.cartRender();
        }
    },
    cartRender() {
        cartTableGoods.textContent = '';
        this.cartGoods.forEach(({ name, id, price, count }) => {
            const trGood = document.createElement('tr');
            trGood.className = 'cart-item';
            trGood.dataset.id = id;
            trGood.innerHTML = `
            <td>${name}</td>
            <td>${price}$</td>
            <td><button class="cart-btn-minus" data-id=${id}>-</button></td>
            <td>${count}</td>
            <td><button class="cart-btn-plus" data-id=${id}>+</button></td>
            <td>${count * price}$</td>
            <td><button class="cart-btn-delete" data-id=${id}>x</button></td>
            `
            cartTableGoods.append(trGood);
        })
        const totalPrice = this.cartGoods.reduce((sum, item) => sum + item.price * item.count, 0);
        cartTableTotal.textContent = `${totalPrice}\$`;
        cartCount.textContent = this.cartGoods.reduce((sum, item) => sum + item.count, 0);
    },
    plusGood(id) {
        const elem = this.cartGoods.find(el => el.id === id);
        if (elem) {
            elem.count++;
        }
        this.cartRender();
    },
    minusGood(id) {
        const elem = this.cartGoods.find(el => el.id === id);
        if (elem.count === 1) {
            this.deleteGood(id);
        } else {
            elem.count--;
        }
        this.cartRender();
    },
    deleteGood(id) {
        this.cartGoods = this.cartGoods.filter(el => el.id !== id);
        this.cartRender();
    }
}

const buttonCart = document.querySelector('.button-cart');
const modalCart = document.querySelector('#modal-cart');
const cartTableGoods = document.querySelector('.cart-table__goods');
const cartTableTotal = document.querySelector('.card-table__total');
const cartCount = document.querySelector('.cart-count');
const navigationItems = document.querySelectorAll('.navigation-link');
const longGoodList = document.querySelector('.long-goods-list');
const logoLink = document.querySelector('.logo-link');

function scrollTop() { // мягкий скролл наверх страницы
    const scrollLinks = document.querySelectorAll('a.scroll-link');
    for (let i = 0; i < scrollLinks.length; i++) {
        scrollLinks[i].addEventListener('click', (e) => {
            e.preventDefault();
            const id = scrollLinks[i].getAttribute('href');
            document.querySelector(id).scrollIntoView({
                behavior: "smooth",
                block: 'start'
            })
        })
    }
}
scrollTop();

cartTableGoods.addEventListener('click', (e) => {
    const target = e.target;
    if (target.tagName === 'BUTTON') {
        const className = target.className;
        const id = target.dataset.id;
        switch (className) {
            case 'cart-btn-delete':
                cart.deleteGood(id);
                break;
            case 'cart-btn-minus':
                cart.minusGood(id);
                break;
            case 'cart-btn-plus':
                cart.plusGood(id);
                break;
        }
    }
})

function renderCards(data) {
    longGoodList.textContent = '';
    const cards = data.map(good => createCard(good));
    longGoodList.append(...cards);
    document.body.classList.add('show-goods');
}

logoLink.addEventListener('click', () => {
    if (document.body.classList.contains('show-goods')) {
        document.body.classList.remove('show-goods');
    }
});

function createCard(objCard) {
    const card = document.createElement('div');
    card.className = 'col-lg-3 col-sm-6';
    card.innerHTML = `
    <div class="goods-card">
    ${objCard.label && `<span class="label">${objCard.label}</span>`}
    <img src="db/${objCard.img}" alt="${objCard.name}" class="goods-image">
    <h3 class="goods-title">${objCard.name}</h3>
    <p class="goods-description">${objCard.description}</p>
    <button class="button goods-card-btn add-to-cart" data-id="${objCard.id}"><span class="button-price">${objCard.price}$</span></button>
    </div>
    `;
    return card;
}

function filterCards(field, value) {
    renderCards(allGoods.filter(good => good[field] === value))
}

navigationItems.forEach((link) => {
    link.addEventListener('click', (e) => {
        const field = link.dataset.field;
        if (field) {
            const value = link.textContent;
            filterCards(field, value);
            return;
        }
        renderCards(allGoods);
    })
})

buttonCart.addEventListener('click', () => {
    // cart.renderCart();
    modalCart.classList.add('show');
})

document.addEventListener('mouseup', (e) => { // если кликнули за пределы формы
    const target = e.target;
    if (!target.closest('.modal') || target.classList.contains('modal-close')) {
        if (modalCart.classList.contains('show')) {
            modalCart.classList.remove('show');
        }
    }
})

document.body.addEventListener('click', (e) => {
    const target = e.target.closest('.add-to-cart');
    if (target) {
        cart.addCartID(target.dataset.id);
    }
})
getGoods();