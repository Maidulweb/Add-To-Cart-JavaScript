let showItem = document.getElementById("show");
let basket = JSON.parse(localStorage.getItem("data")) || [];
let showData = () => {
  return (showItem.innerHTML = data
    .map((item) => {
      let { id, name, description, price, image } = item;
      let search = basket.find((x) => x.id === id) || [];
      return `
    <div class="border rounded border-gray-500 p-3">
         <img class='w-full h-[150px]' src="images/${image}" alt="">
          <h2 class='text-xl font-medium'>${name}</h2>
          <p>${description}</p>
          <div class="flex justify-between mt-4">
            <p>${price}</p>
            <div class='flex'>
              <button onclick="decrement(${id})">-</button>
              <span id=${id}>${
        search.item === undefined ? 0 : search.item
      }</span>
              <button onclick="increment(${id})">+</button>
            </div>
          </div>
        </div>
    `;
    })
    .join(""));
};
let decrement = (id) => {
  let selectItem = id;
  let search = basket.find((x) => x.id === selectItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectItem.id);
  basket = basket.filter((x) => x.item !== 0);
  localStorage.setItem("data", JSON.stringify(basket));
};
let increment = (id) => {
  let selectItem = id;
  let search = basket.find((x) => x.id === selectItem.id);
  if (search === undefined) {
    basket.push({
      id: selectItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  update(selectItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let addToCart = document.getElementById("addToCart");
  addToCart.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

showData();
calculation();
