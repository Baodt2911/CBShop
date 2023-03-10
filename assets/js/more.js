const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const encodedUrl = urlParams.get("status");
const decodedUrl = decodeURIComponent(encodedUrl);

//Reload to top
document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
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

fetch(`https://api-fashion.vercel.app/products?status=${decodedUrl}`)
  .then((res) => res.json())
  .then((datas) => {
    const htmls = datas.map((data) => {
      return `
        <div class="item-products">
                      <img src=${data.main[0].images} alt="" class="item-img">
                      <p class="name">${data.name}</p>
                      <p class="price">Giá: <span style="color:#e74c3c;">${data.price.toLocaleString(
                        "vi-VN"
                      )}</span></p>
                      <div class="buy-add">
                          <div class="add-cart">
                              <img src="../assets/icon/addcart.png" alt="">
                              Thêm vào giỏ hàng
                          </div>
                          <a href="" class="buy">Mua ngay</a>
                      </div>
          </div>
        `;
    });
    $(".content").innerHTML = $(".content").innerHTML + htmls.join("");
  });
//Thay đổi status
$(".main-content h1").innerHTML =
  decodedUrl == "bestseller" ? "Bán chạy nhất" : "Sale 50%";
$(".main-content h1").innerHTML =
  decodedUrl == "favourite"
    ? `<i class="fa-solid fa-heart"></i><span>Yêu thích</span>`
    : "Sale <span>50%</span>";
