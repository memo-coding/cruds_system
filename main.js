let title = document.querySelector(".title");
let price = document.querySelector(".price");
let taxes = document.querySelector(".taxes");
let ads = document.querySelector(".ads");
let discount = document.querySelector(".discount");
let totlaspan = document.querySelector(".totla-span");
let count = document.querySelector(".count");
let category = document.querySelector(".category");
let creat = document.querySelector(".creat");
let pricetaxesadstotal = document.querySelectorAll(
  ".price-taxes-ads-total input"
);
let tbody = document.querySelector("tbody");
let buttonsearch = document.querySelector(".button-search");
let adddeletebutton = document.querySelector(".add-delete-button");
let search = document.querySelector(".search");
let date = document.getElementById("date");
let clock = document.getElementById("clock");
let tmpi;
// Date & Time
// Get Date
setInterval(() => {
  let getDate = Date();
  let dateValue = getDate.slice(0, 16);
  date.innerText = `${dateValue}`;
}, 1000);

// Get Time
setInterval(() => {
  let getTime = Date();
  let timeValue = getTime.slice(16, 24);
  clock.innerText = `${timeValue}`;
}, 1000);

price.addEventListener("keyup", () => {
  getTotal();
});
taxes.addEventListener("keyup", () => {
  getTotal();
});
ads.addEventListener("keyup", () => {
  getTotal();
});
discount.addEventListener("keyup", () => {
  getTotal();
});

price.addEventListener("click", () => {
  getTotal();
});
taxes.addEventListener("click", () => {
  getTotal();
});
ads.addEventListener("click", () => {
  getTotal();
});
discount.addEventListener("click", () => {
  getTotal();
});

function getTotal() {
  let priceTotal = Number(price.value);
  let taxesTotal = Number(taxes.value);
  let adsTotal = Number(ads.value);
  let discountTotal = Number(discount.value);

  if (price.value != "") {
    let TotalNumper = priceTotal + taxesTotal + adsTotal - discountTotal;
    totlaspan.innerText = TotalNumper;
  } else {
    totlaspan.innerText = "";
  }
}

let dataPro = [];

if (localStorage.getItem("product") != null) {
  dataPro = JSON.parse(localStorage.getItem("product"));
} else {
  dataPro = [];
}

creat.addEventListener("click", function () {
  getData();
  ShowData();
});

function getData() {
  let titleget = title.value;
  let priceget = price.value;
  let taxesget = taxes.value;
  let adsget = ads.value;
  let discountget = discount.value;
  let totlaspanget = totlaspan.innerText;
  let countget = count.value;
  let categoryget = category.value;

  let newPro = {
    title: titleget,
    price: priceget,
    taxes: taxesget,
    ads: adsget,
    discount: discountget,
    totlaspan: totlaspanget,
    count: countget,
    category: categoryget,
  };

  if (title.value != "" && price.value != "" && category.value != "") {
    if (creat.innerText === "CREATE") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[tmpi] = newPro;
      creat.innerText = "create";
      count.style.display = "block";
    }
    clearinputs();
  } else {
  }

  localStorage.setItem("product", JSON.stringify(dataPro));
}

function clearinputs() {
  title.value = "";
  price.value = "";
  taxes.value = "";
  ads.value = "";
  discount.value = "";
  totlaspan.innerText = "";
  count.value = "";
  category.value = "";
}

function ShowData() {
  let table = ``;
  table = `       
      <tr>
      <th>id</th>
      <th>title</th>
      <th>price</th>
      <th>taxes</th>
      <th>ads</th>
      <th>category</th>
      <th>total</th>
      <th class="update-td">update</th>
      <th class="delete-td">delete</th>
      </tr>`;
  for (let i = 0; i < dataPro.length; i++) {
    table += `
      <tr>
      <td>${i + 1}</td>
      <td>${dataPro[i].title}</td>
      <td>${dataPro[i].price}</td>
      <td>${dataPro[i].taxes}</td>
      <td>${dataPro[i].ads}</td>
      <td>${dataPro[i].category}</td>
      <td>${dataPro[i].totlaspan}</td>
      <td><button onclick="updatedata(${i})" class="update">update</button></td>
      <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
      </tr>`;
  }
  tbody.innerHTML = table;

  showdelet();
}

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  ShowData();
}

function showdelet() {
  if (dataPro.length > 1) {
    adddeletebutton.innerHTML = `
    <button  onclick="deletall()" class="delet-all">Delete All ( ${dataPro.length} ) </button>
    `;
  } else {
    adddeletebutton.innerHTML = "";
  }
}

function deletall() {
  localStorage.clear();
  dataPro.splice(0);
  ShowData();
}

ShowData();

function updatedata(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  taxes.value = dataPro[i].taxes;
  ads.value = dataPro[i].ads;
  discount.value = dataPro[i].discount;
  count.style.display = "none";
  category.value = dataPro[i].category;

  creat.innerText = `update`;
  getTotal();
  tmpi = i;
}

let searchmood = "title";

function getsearchmood(id) {
  if (id == `search-title`) {
    searchmood = "title";
    search.placeholder = `search by title`;
  } else {
    searchmood = "catogeryMood";
    search.placeholder = `search by category`;
  }
  search.focus();
}

search.addEventListener("keyup", function () {
  searchdata(this.value);
});

function searchdata(value) {
  let table = ``;
  table = `
    <tr>
      <th>id</th>
      <th>title</th>
      <th>price</th>
      <th>taxes</th>
      <th>ads</th>
      <th>category</th>
      <th>totoal</th>
      <th class="update-td">update</th>
      <th class="delete-td">delete</th>
    </tr>
    `;
  if (searchmood == "title") {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].title.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].totlaspan}</td>
        <td><button onclick="updatedata(${i})" class="update">update</button></td>
        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
      </tr>`;
      }
    }
  } else {
    for (let i = 0; i < dataPro.length; i++) {
      if (dataPro[i].category.toLowerCase().includes(value.toLowerCase())) {
        table += `
        <tr>
        <td>${i}</td>
        <td>${dataPro[i].title}</td>
        <td>${dataPro[i].price}</td>
        <td>${dataPro[i].taxes}</td>
        <td>${dataPro[i].ads}</td>
        <td>${dataPro[i].category}</td>
        <td>${dataPro[i].totlaspan}</td>
        <td><button onclick="updatedata(${i})" class="update">update</button></td>
        <td><button onclick="deleteData(${i})" class="delete">delete</button></td>
      </tr>`;
      }
    }
  }
  tbody.innerHTML = table;
}
