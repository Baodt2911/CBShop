const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//Reload to top
document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
});
//Focus search
$(".search-input").addEventListener("focus", () => {
  $(".search").style.border = "1px solid #6c5ce7";
  $(".suggest").style.opacity = "1";
  $(".suggest").style.visibility = "inherit";
});
$(".search-input").addEventListener("blur", () => {
  $(".search").style.border = "1px solid #b2bec3";
  $(".suggest").style.opacity = "0";
  $(".suggest").style.visibility = "hidden";
});

//Scrooll-header
window.addEventListener("scroll", () => {
  let Y = window.scrollY;
  if (Y >= 350) {
    $("#btn-to-top").style.display = "block";
  } else if (Y >= 40) {
    $(".main-header").style.top = `0`;
  } else if (Y < 40) {
    $(".main-header").style.top = `41px`;
    $("#btn-to-top").style.display = "none";
  }
});
//Hiệu ứng load trang
window.addEventListener("load", function () {
  $(".main-loader").style.display = "block";
  $("body").style.overflow = "hidden";
  setTimeout(function () {
    $(".main-loader").style.display = "none";
    $("body").style.overflow = "auto";
  }, 1000); // thời gian mô phỏng load
});
//Chuyển hướng đến sản phẩm
const handleClick = (event) => {
  window.location.href = `/src/products.html?id=${event.dataset.id}`;
};
//Search
$(".search-input").addEventListener("change", (e) => {
  $(".search-input").value = e.target.value;
});
$(".search-input").addEventListener("keypress", (e) => {
  if (e.key == "Enter") {
    window.location.href = `/src/results-search.html?search=${e.target.value}`;
  }
});
const saveProducts = (id, img, name, price, color, size, quantity) => {
  const cartList = JSON.parse(localStorage.getItem("cart")) || [];
  const findProducts = cartList.find(
    (item) => item.id === id && item.color == color && item.size == size
  ); //Nếu id,color,size trùng nhau thì sẽ trả ra phần tử đó
  const pushProduct = () => {
    // Tạo một đối tượng chứa thông tin sản phẩm
    const product = {
      id: id,
      name: name,
      color: color,
      size: size,
      price: price,
      imgSrc: img,
      quantity: quantity,
    };
    cartList.push(product);
  };
  if (findProducts) {
    findProducts.quantity++; //Tăng số lượng sản phẩm
  } else {
    pushProduct();
  }
  localStorage.setItem("cart", JSON.stringify(cartList));
  $(".cart").dataset.count =
    JSON.parse(localStorage.getItem("cart")).length || 0; //Cập nhật khi giỏ hàng được thêm
};

let index = 0;
const handleAddCart = () => {
  $(".add-cart").addEventListener("click", (item) => {
    $(".notice").style = "transform:translateX(0)";
    setTimeout(() => {
      $(".notice").style = "transform:translateX(105%)";
    }, 2000);
    const id = item.target.dataset.id;
    const img = $(".item-slide-products img").src;
    const name = $(".name").textContent;
    const price = $(".price span").textContent;
    const color = $(".color .active-color").textContent;
    const size = $(".size").value;
    const quantity = parseInt($(".btn_quantity_input").value);
    saveProducts(id, img, name, price, color, size, quantity);
  });
};
$(".cart").dataset.count = JSON.parse(localStorage.getItem("cart")).length || 0; //Set count bằng length của giỏ hàng
