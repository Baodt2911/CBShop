const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
//Reload to top
document.addEventListener("DOMContentLoaded", () => {
  window.scrollTo(0, 0);
});
//Focus search
$(".search-input").addEventListener("focus", () => {
  $(".search").style.width = "300px";
  $(".search").style.border = "1px solid #6c5ce7";
});
$(".search-input").addEventListener("blur", () => {
  $(".search").style.width = "250px";
  $(".search").style.border = "1px solid #b2bec3";
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
const handleClick = (event) => {
  window.location.href = `/src/products.html?id=${event.dataset.id}`;
};
