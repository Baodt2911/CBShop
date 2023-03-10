const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
let API = "https://api-fashion.vercel.app/products?status=bestseller";
//Reload to top
document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
});
// định nghĩa các API
const api1 = "https://api-fashion.vercel.app/products?status=bestseller";
const api2 = "https://api-fashion.vercel.app/products?status=sale";
const api3 = "https://api-fashion.vercel.app/products?status=favourite";
// tạo hàm xử lý yêu cầu API
async function fetchData(api) {
  const response = await fetch(api);
  const data = await response.json();
  return data;
}
// gọi các API và xử lý dữ liệu trả về
(async function () {
  const data1 = await fetchData(api1);
  const data2 = await fetchData(api2);
  const data3 = await fetchData(api3);
  //Render bestseller
  const htmls1 = data1.map((data) => {
    return `
    <div class="item-products">
                  <img src=${data.main[0].images} alt="" class="item-img">
                  <p class="name">${data.name}</p>
                  <p class="price">Giá: <span style="color:#e74c3c;">${data.price.toLocaleString(
                    "vi-VN"
                  )}</span></p>
                  <div class="buy-add">
                      <div class="add-cart">
                          <img src="./assets/icon/addcart.png" alt="">
                          Thêm vào giỏ hàng
                      </div>
                      <a href="" class="buy">Mua ngay</a>
                  </div>
      </div>
    `;
  });
  $(".bestseller-content").innerHTML =
    $(".bestseller-content").innerHTML + htmls1.join("");
  //Render sale
  const htmls2 = data2.map((data) => {
    return `
    <div class="item-products">
                  <img src=${data.main[0].images} alt="" class="item-img">
                  <p class="name">${data.name}</p>
                  <p class="price">Giá: <span style="color:#e74c3c;">${data.price.toLocaleString(
                    "vi-VN"
                  )}</span></p>
                  <div class="buy-add">
                      <div class="add-cart">
                          <img src="./assets/icon/addcart.png" alt="">
                          Thêm vào giỏ hàng
                      </div>
                      <a href="" class="buy">Mua ngay</a>
                  </div>
      </div>
    `;
  });
  $(".sale-content").innerHTML = $(".sale-content").innerHTML + htmls2.join("");
  //Render favourite
  const htmls3 = data3.map((data) => {
    return `
    <div class="item-products">
                  <img src=${data.main[0].images} alt="" class="item-img">
                  <p class="name">${data.name}</p>
                  <p class="price">Giá: <span style="color:#e74c3c;">${data.price.toLocaleString(
                    "vi-VN"
                  )}</span></p>
                  <div class="buy-add">
                      <div class="add-cart">
                          <img src="./assets/icon/addcart.png" alt="">
                          Thêm vào giỏ hàng
                      </div>
                      <a href="" class="buy">Mua ngay</a>
                  </div>
      </div>
    `;
  });
  $(".favourite-content").innerHTML =
    $(".favourite-content").innerHTML + htmls3.join("");
})();

// Xem thêm Bán chạy nhất
$$(".more").forEach((item) => {
  item.addEventListener("click", (e) => {
    if (e.target.dataset.status == "bestseller") {
      window.location.href = "./src/more.html";
      API = "https://api-fashion.vercel.app/products?status=bestseller";
    } else if (e.target.dataset.status == "sale") {
      $(".sale-content").classList.add("swap-content");
    } else if (e.target.dataset.status == "favourite") {
      $(".favourite-content").classList.add("swap-content");
    }
  });
});
//Slider-Scroll
$(".next").addEventListener("click", () => {
  $(".bestseller-content").scrollLeft += $(".item-products").offsetWidth * 3;
});
$(".prev").addEventListener("click", () => {
  $(".bestseller-content").scrollLeft -= $(".item-products").offsetWidth * 3;
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
export { API };
