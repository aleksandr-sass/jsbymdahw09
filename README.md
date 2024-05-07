# jsbymdahw09
JS by MDA. Homework to lesson #09

## Задачи
1. Подсчитать общую сумму всех товаров в корзине и вывести над таблицей сверху.
2. Подсчитать кол-во всех товаров (не строк) в корзине и вывести над таблицей сверху.
3. Добавить кнопку в корзине (над таблицей) очистить корзину и по клику на кнопку удалить (очистить) всю корзину.

## Решение
### 1 Подсчёт общей стоимости всех товаров:
1. Добавляем в разметку нужные html-элементы:
```
<div class="total">
  <h3>Общая сумма: <span class="total__sum">0</span> рублей</h3>
</div>
```
2. JS:
```
const totalSum = document.querySelector('.total__sum')

const sumToTotalSumSpan = () => {
  const cardsLS = JSON.parse(localStorage.getItem('shopCart')) || [];
  let sum = 0;
  cardsLS.forEach((el) => {
    sum += el.count * el.price;
  })
  totalSum.innerHTML = sum;
}

const paintShopCart = () => {
  ...
  sumToTotalSumSpan();
}
```

3. CSS:
```
.total {
    padding-left: 20px;
}
```