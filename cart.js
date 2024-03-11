let basket = JSON.parse(localStorage.getItem("data")) || [];
let total = document.getElementById("total");
let cartEmpty = document.getElementById("cartEmpty");
let cartItems = document.getElementById("cartItems");
let calculation = () => {
  let addToCart = document.getElementById("addToCart");
  addToCart.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();

let getItems = () => {
  if (basket.length !== 0) {
    return (cartItems.innerHTML = basket.map((x) => {
      let { id, item } = x;
      let search = data.find((y) => y.id === id);
      return `
        <div class="max-w-md mx-auto">
        <div class="flex justify-between border rounded h-[100px] p-4 relative">
        <div onclick="removeItem(${id})" class="absolute top-0 right-1 font-bold text-red-400 cursor-pointer">X</div>
        <div class="w-[20%]"><img class='w-20 h-full' src="images/${
          search.image
        }" alt=""></div>
        <div class="w-[80%] pl-10">
        <div class="flex justify-between">
        <h2 class="text-lg font-medium">${search.name}</h2>
        <p>Price: ${search.price}BDT</p>
        </div>
        <div class="flex justify-between pt-3 pl-6">
        <div class='flex'>
              <button onclick="decrement(${id})">-</button>
              <span id=${id}>${item}</span>
              <button onclick="increment(${id})">+</button>
            </div>
        <p>Total Price: ${item * search.price}BDT</p>
        </div>
        </div>
        </div>
        <div id="total" class="text-center"></div>
        </div>
        `;
    }));
  } else {
    cartItems.innerHTML = ``;
    cartEmpty.innerHTML = `
        <div class="pt-20">
        <h2 class="text-3xl font-bold text-red-500">No Item</h2>
        <div class="pt-5">
        <a class="text-3xl font-bold text-green-500 underline" href="index.html">Add item</a>
        </div>
        </div>
        `;
  }
};

getItems();
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
  getItems();
  update(selectItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
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
  getItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
  totalAmount();
};

let removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((x) => x.id !== selectedItem.id);
  getItems();
  calculation();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

let removeAllItem = () => {
  basket = [];
  getItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let amount = basket
      .map((x) => {
        let { id, item } = x;
        let search = data.find((y) => y.id === id) || [];
        return item * search.price;
      })
      .reduce((x, y) => x + y, 0);
    cartEmpty.innerHTML = `
      <h2>Total price : ${amount}BDT</h2>
      <div onclick="removeAllItem()" class="text-center">Clear All</div>
      `;
  } else return;
};
totalAmount();
