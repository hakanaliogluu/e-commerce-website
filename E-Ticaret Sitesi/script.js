
// Ürünlerin tam listesi
var allProducts = [
  {
    name: "Erkek Kareli Gömlek",
    price: "$24.99",
    image: "Resimler/gömlek2.jpg",
    categories: ["gomlek", "erkek"]
  },
  {
    name: "Erkek Beyaz Gömlek",
    price: "$19.99",
    image: "Resimler/gömlek.jpg",
    categories: ["gomlek", "erkek"]
  },
  {
    name: "Erkek Bej Pantolon",
    price: "$29.99",
    image: "Resimler/pantolon.jpg",
    categories: ["pantolon", "erkek"]
  },
  {
    name: "Erkek Gri Pantolon",
    price: "$49.99".strike() + " $39.99",
    image: "Resimler/pantolon2.jpg",
    categories: ["pantolon", "erkek"]
  },
  {
    name: "Erkek Siyah Tişört",
    price: "$14.99",
    image: "Resimler/erkeksiyaht-shirt.jpg",
    categories: ["tisort", "erkek"]
  },
  {
    name: "Erkek Mavi Tişört",
    price: "$19.99",
    image: "Resimler/erkekmavit-shirt.jpg",
    categories: ["tisort", "erkek"]
  },
  {
    name: "Kadın Siyah Pantolon",
    price: "$24.99",
    image: "Resimler/Kadın Siyah Pantolon.jpg",
    categories: ["pantolon", "kadin"]
  },
  {
    name: "Kadın Beyaz Gömlek",
    price: ["$24.99".strike(), "$19.99"],
    image: "Resimler/Kadın Beyaz Gömlek.jpg",
    categories: ["gomlek", "kadin"]
  },
  {
    name: "Kadın Siyah Gömlek",
    price: "$14.99",
    image: "Resimler/Kadın Siyah Gömlek.jpg",
    categories: ["gomlek", "kadin"]
  },
  {
    name: "Kadın Lacivert Pantolon",
    price: "$34.99",
    image: "Resimler/Kadın Lacivert Pantolon.jpg",
    categories: ["pantolon", "kadin"]
  },
  {
    name: "Kadın Siyah Tişört",
    price: "$9.99",
    image: "Resimler/Kadın Siyah Tişört.jpg",
    categories: ["tisort", "kadin"]
  },
  {
    name: "Kadın Beyaz Tişört",
    price: "$14.99",
    image: "Resimler/KadınBeyaz Tişört.jpg",
    categories: ["tisort", "kadin"]
  },
];

// Ürünleri fiyatlarına göre sırala
function sortProducts(sortOrder) {
  if (sortOrder === "expensive") {
    allProducts.sort(function (a, b) {
      return parseFloat(b.price.replace("$", "")) - parseFloat(a.price.replace("$", ""));
    });
  } else if (sortOrder === "cheap") {
    allProducts.sort(function (a, b) {
      return parseFloat(a.price.replace("$", "")) - parseFloat(b.price.replace("$", ""));
    });
  }
}

// Filtreleme seçeneği değiştikçe ürünleri güncelle
function filterProducts() {
  var selectedCategories = document.getElementById("filter-select").value;
  var searchInput = document.getElementById("search-input").value.toLowerCase();

  var filteredProducts = allProducts.filter(function (product) {
    var productName = product.name.toLowerCase();

    // Ürün adında arama yapılan kelimeyi içeriyorsa ve seçilen kategorilerden birine sahipse
    return (
      productName.includes(searchInput) &&
      (selectedCategories === "all" || product.categories.includes(selectedCategories))
    );
  });

  sortProducts(selectedCategories); // Ürünleri sırala

  displayProducts(filteredProducts);
}



// Ürünleri görüntüle
function displayProducts(products) {
  var productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  for (var i = 0; i < products.length; i++) {
    var product = products[i];

    var productHTML =
      `<div class="product">
          <img src="${product.image}" alt="${product.name}">
          <h4>${product.name}</h4>
          <p>Fiyat: ${product.price}</p>
          <button class="add-to-cart">Sepete Ekle</button>
      </div>`;

    productContainer.innerHTML += productHTML;
  }
}

// Sayfa yüklendiğinde ürünleri gizle
window.onload = function () {
  var productContainer = document.getElementById("product-container");
  productContainer.style.display = "none";
};

// Filtreleme seçeneği değiştikçe ürünleri güncelle
var filterSelect = document.getElementById("filter-select");
filterSelect.addEventListener("change", filterProducts);

// Arama yapıldığında ürünleri görüntüle
function showProducts() {
  var productContainer = document.getElementById("product-container");
  productContainer.style.display = "block";
}

// Arama fonksiyonu
function searchProduct() {
  var searchInput = document.getElementById("search-input").value.toLowerCase();
  var selectedCategories = document.getElementById("filter-select").value;
  var productContainer = document.getElementById("product-container");
  productContainer.innerHTML = "";

  var filteredProducts = allProducts.filter(function (product) {
    var productName = product.name.toLowerCase();

    // Ürün adında arama yapılan kelimeyi içeriyorsa ve seçilen kategorilerden birine sahipse
    return productName.includes(searchInput) && (selectedCategories === "all" || product.categories.includes(selectedCategories));
  });

  displayProducts(filteredProducts);
}


// Sepete Ekle butonlarını seç
const addToCartButtons = document.querySelectorAll(".add-to-cart");

// Sepet listesi
const cartList = document.getElementById("cart-list");

// Her bir Sepete Ekle butonu için tıklama olayı dinleyici ekle
addToCartButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Ürün bilgilerini al
    const product = button.parentElement;
    const image = product.querySelector("img").src;
    const title = product.querySelector("h4").textContent;
    const price = product.querySelector("p").textContent;

    // Sepet öğesi oluştur
    const cartItem = document.createElement("li");
    cartItem.innerHTML = `
      <img src="${image}" alt="${title}">
      <div>
        <h4>${title}</h4>
        <p>${price}</p>
      </div>
      <button class="remove-from-cart">Sepetten Çıkar</button>
    `;

    // Sepet listesine öğeyi ekle
    cartList.appendChild(cartItem);

    // Sepetten Çıkar butonunu seç
    const removeFromCartButton = cartItem.querySelector(".remove-from-cart");

    // Sepetten Çıkar butonuna tıklama olayı dinleyici ekle
    removeFromCartButton.addEventListener("click", () => {
      cartItem.remove();
    });
  });
});

// Arama çubuğuna her tuşa basıldığında ürünleri görüntüle ve filtrele
var searchInput = document.getElementById("search-input");
searchInput.addEventListener("keyup", function () {
  var input = this.value.trim();

  showProducts();
  searchProduct();

  // Eğer arama çubuğu boş ise ürünleri temizle
  if (input == "") {
    var productContainer = document.getElementById("product-container");
    productContainer.style.display = "none";
  }
});
