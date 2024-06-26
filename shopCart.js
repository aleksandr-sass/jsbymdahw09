function shopCart() {
    



const shopContent = document.querySelector('.shop__content')
const tableBody = document.querySelector('.table__body')
const navCount = document.querySelector('.nav__count')
const totalSum = document.querySelector('.total__sum')
const totalCount = document.querySelector('.total__count')
const totalClear = document.querySelector('.total__clear')


/**ФУНКЦИЯ изменения кол-ва товара в корзине */
const updateCardsInShopCart = (card, count) => {
    const cardsLS = JSON.parse(localStorage.getItem('shopCart')) || []
    const newArr = cardsLS.map(el => {
        if (el.id === card.id) {
            el.count = count
        }
        return el
    })
    localStorage.setItem('shopCart', JSON.stringify(newArr))
    paintShopCart()
}

//***ФУНКЦИЯ подсчета строк в корзине с товарами */
const calcCountItemsInShopCart = () => {
    const cardsLS = JSON.parse(localStorage.getItem('shopCart')) || []
    navCount.textContent = cardsLS.length
}

/**ФУНКЦИЯ подсчета общей стоимости товаров, и вывода результата в консоль при каждом открытии корзины*/
const getTotalSumAndCountOfGoods = () => {
    const cardsLS = JSON.parse(localStorage.getItem('shopCart')) || [];
    let sum = 0;
    let count = 0;
    cardsLS.forEach((el) => {
        sum += el.count * el.price;
        count += +el.count;
    })
    totalSum.innerHTML = sum;
    totalCount.innerHTML = count;
}

//***ФУНКЦИЯ отрисовки карточек в корзине */
const paintShopCart = () => {
    // let i = 0
    tableBody.innerHTML = ''
    const cardsLS = JSON.parse(localStorage.getItem('shopCart'))
    cardsLS.forEach((el, index) => {
        let tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${index+1}</td>
            <td class="table__photo">
                <div class="table__img ${imgCards[el.type]}"></div>
            </td>
            <td>${el.name}</td> 
            <td>${el.price}</td>
            <td>
                <div class="table__count-add">&#8743;</div>
                <input class="table__input" type='number' min="1" value="${el.count}">
                <div class="table__count-remove">&#8744;</div>   
            </td>
            <td>${el.price*el.count}</td>
            <td>
                <button class="table__delete">X</button>
            </td>
        `
        tableBody.append(tr)
        tr.addEventListener('click', (e)=> {
           if (e.target.closest('.table__delete')) {
                cardsLS.splice(index,1)
                localStorage.setItem('shopCart', JSON.stringify(cardsLS))
                paintShopCart()
           }
           if (e.target.closest('.table__count-add')) {
                updateCardsInShopCart(el,++el.count)
           }

           if (e.target.closest('.table__count-remove')) {
            updateCardsInShopCart(el, Math.max(1, --el.count))
           }

           if (e.target.closest('.table__input')) {
                const tableInput = e.target;
                
                tableInput.addEventListener('change', ()=> {
                    (tableInput.value > 1) ? updateCardsInShopCart(el, tableInput.value) : updateCardsInShopCart(el, el.count)
                })
           }


           




        })
    })
    calcCountItemsInShopCart();
    getTotalSumAndCountOfGoods();
}

const clearShopCart = () => {
    localStorage.setItem('shopCart', '[]');
    paintShopCart();
}

totalClear.addEventListener('click', clearShopCart);

//метод some возвращает true если найден обьект ПЕРВЫЙ удовлетворяющий условию
//***ФУНКЦИЯ поиска карточки товара (объекта)
const searchCard = (clickedCardId) => { 
    cardsInShopCart = JSON.parse(localStorage.getItem('shopCart')) || []
    const foundCard = cards.find(el => el.id === clickedCardId)
    //проверка обьекта в корзине
    if(cardsInShopCart.some(el => el.id === foundCard.id)) {
        cardsInShopCart.map(el => {
            if (el.id === foundCard.id) {
                el.count++
            }
        })
    } else {
        foundCard.count = 1
        cardsInShopCart.push(foundCard)
    }     
    localStorage.setItem('shopCart', JSON.stringify(cardsInShopCart))
    paintShopCart()
}

//получение ID карточки товара по клику на товар
shopContent.addEventListener('click', (e) => {
    e.preventDefault();
    if (e.target.classList.contains('shop__link') && e.target.dataset.id !== undefined) {
        const clickedCardId = e.target.dataset.id;
        searchCard(clickedCardId);
    }
})

//открытие модального окна 
navLinkShopCart.addEventListener('click', (e)=> {
    e.preventDefault();
    modal.style.display = 'flex';
    paintShopCart() //метод отрисовки
 })



 calcCountItemsInShopCart()

}
shopCart()


