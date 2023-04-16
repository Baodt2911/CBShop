const cartListProduct = JSON.parse(localStorage.getItem("cart")) || [];
const totalAmount = (totalAmount) => {
  let total = 0;
  cartListProduct.forEach((event) => {
    const subtotal = parseInt(event.price) * event.quantity;
    total += subtotal;
  });
  totalAmount.innerHTML = `${total.toLocaleString("vi-VN")}.000đ`;
};
const renderProductsCart = () => {
  const renderCart = cartListProduct.map(
    (data) =>
      `<tr class="item-cart">
      <td class="images_title_cart" data-id=${data.id}>
          <div class="images-cart-product">
              <img src=${data.imgSrc}
                  alt=${data.color}>
          </div>
          <div class="title-cart">
              <p class="name-products">${data.name}</p>
              <p class="color">Màu: <span>${data.color}</span></p>
              <p class="size">Size: <span>${data.size}</span></p>
          </div>
      </td>
      <td class="price-cart">${data.price}đ</td>
      <td class="quantity-cart">
          <input type="button" value="-" class="btn_decrenment-cart">
          <input type="number" class="btn_quantity_input_cart" min="1" max="10" value=${data.quantity}>
          <input type="button" value="+" class="btn_increment-cart">
      </td>
      <td class="remove-products">
          <i class="fa-regular fa-trash-can btn_remove"></i>
      </td>
  </tr>`
  );
  if (renderCart.length != 0) {
    $(".main-cart").innerHTML =
      `<thead class="infor-cart">
            <tr>
                <th>Sản phẩm</th>
                <th style="width:200px;">Giá</th>
                <th>Số lượng</th>
                <th style="width: 70px;">Xóa</th>
            </tr>
          </thead>` + renderCart.join("");
  } else {
    $(
      ".cart-products"
    ).innerHTML = `<h3>Bạn chưa có sản phẩm nào trong giỏ hàng!</h3> 
        <p class="title-temp">CBshop cung cấp những món đồ độc đáo,sành điệu dành cho bạn, bạn có thể tìm những bộ quần áo phù hợp với mình ở đây</p>
      `;
  }
  $(".container h1 span").innerHTML = `(${cartListProduct.length} sản phẩm)`;
  $$(".images_title_cart").forEach((item) => {
    item.addEventListener("click", (event) => {
      window.location.href = `/src/products.html?id=${event.currentTarget.dataset.id}`;
    });
  });
  $$(".btn_increment-cart").forEach((e) => {
    e.addEventListener("click", (event) => {
      const name =
        event.target.parentNode.parentNode.querySelector(
          ".name-products"
        ).textContent;
      const size =
        event.target.parentNode.parentNode.querySelector(
          ".size span"
        ).textContent;
      const color =
        event.target.parentNode.parentNode.querySelector(
          ".color span"
        ).textContent;
      const increaseValue = event.target.parentNode.querySelector(
        ".btn_quantity_input_cart"
      ).value++;

      if (increaseValue > 9) {
        event.target.parentNode.querySelector(
          ".btn_quantity_input_cart"
        ).value = increaseValue;

        cartListProduct.forEach((e) => {
          if (name === e.name && size === e.size && color === e.color) {
            e.quantity = increaseValue;
            localStorage.setItem("cart", JSON.stringify(cartListProduct));
          }
        });
      } else {
        cartListProduct.forEach((e) => {
          if (name === e.name && size === e.size && color === e.color) {
            e.quantity++;
            localStorage.setItem("cart", JSON.stringify(cartListProduct));
          }
        });
      }
      totalAmount($(".total-amount span"));
    });
  });
  $$(".btn_decrenment-cart").forEach((e) => {
    e.addEventListener("click", (event) => {
      const name =
        event.target.parentNode.parentNode.querySelector(
          ".name-products"
        ).textContent;
      const size =
        event.target.parentNode.parentNode.querySelector(
          ".size span"
        ).textContent;
      const color =
        event.target.parentNode.parentNode.querySelector(
          ".color span"
        ).textContent;
      const increaseValue = event.target.parentNode.querySelector(
        ".btn_quantity_input_cart"
      ).value--;
      if (increaseValue <= 1) {
        event.target.parentNode.querySelector(
          ".btn_quantity_input_cart"
        ).value = 1;

        cartListProduct.forEach((e) => {
          if (name === e.name && size === e.size && color === e.color) {
            e.quantity = increaseValue;
            localStorage.setItem("cart", JSON.stringify(cartListProduct));
          }
        });
      } else {
        cartListProduct.forEach((e) => {
          if (name === e.name && size === e.size && color === e.color) {
            e.quantity--;
            localStorage.setItem("cart", JSON.stringify(cartListProduct));
          }
        });
      }
      totalAmount($(".total-amount span"));
    });
  });
  $$(".btn_remove").forEach((item) => {
    item.addEventListener("click", (element) => {
      cartListProduct.forEach((e) => {
        const name =
          element.target.parentNode.parentNode.querySelector(
            ".name-products"
          ).textContent;
        const size =
          element.target.parentNode.parentNode.querySelector(
            ".size span"
          ).textContent;
        const color =
          element.target.parentNode.parentNode.querySelector(
            ".color span"
          ).textContent;
        //Xóa phần tử có name,size,color trùng với trong mảng khi click remove
        if (name === e.name && size === e.size && color === e.color) {
          cartListProduct.splice(cartListProduct.indexOf(e), 1);
          localStorage.setItem("cart", JSON.stringify(cartListProduct));
          $(".cart").dataset.count =
            JSON.parse(localStorage.getItem("cart")).length || 0; //Cập nhật khi giỏ hàng bị xóa
          renderProductsCart();
        }
      });
    });
  });
  totalAmount($(".total-amount span"));
};
const payment = () => {
  const $ = document.querySelector.bind(document);
  const $$ = document.querySelectorAll.bind(document);
  $(".card-right h2 span").innerHTML =`(${cartListProduct.length || 0} sản phẩm)`
  const renderItem = cartListProduct.map(
    (data) =>
      `<div class="item-products">
                    <div class="item-img" data-quantity=${data.quantity}>
                        <img src=${data.imgSrc}
                            alt="">
                    </div>
                    <div class="title-products">
                        <p class="name">${data.name}</p>
                        <p class="color-size">${data.color} / Size ${data.size}</p>
                    </div>
                    <p class="price">${data.price}đ</p>
                </div>`
  );
  $(".main-right").innerHTML = renderItem.join("");
  totalAmount($(".total-payment"));
  (function validationInfor (){
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    const regexPhone = /^(03[2-9]|05[6|8|9]|07[0|6-9]|08[1-9]|09[0-9]|01[2|6|8|9])+([0-9]{7})$/
    let condition = false; 
    $(".btn-pay").addEventListener("click",()=>{
      if ($(".name").value.trim().length < 3 || $(".name").value.trim().length >= 50) {
        $(".name").style.border = "1px solid red"
        condition = false
      }else{
        $(".name").style.border = "1px solid gray"
        condition = true
      }

      if (regexEmail.test($(".email").value.trim())) {
        $(".email").style.border = "1px solid gray"
        condition = true       
      }else{
        $(".email").style.border = "1px solid red"
        condition = false
      }
      
      if (regexPhone.test($(".phone").value.trim())) {
        $(".phone").style.border = "1px solid gray"
        condition = true       
      }else{
        $(".phone").style.border = "1px solid red"
        condition = false
      }

      if ($(".address").value.trim().length <= 5 || $(".address").value.trim().length > 100) {
        $(".address").style.border = "1px solid red"
        condition = false
      }else{
        $(".address").style.border = "1px solid gray"
        condition = true
      }

      if ($(".province-city").value.trim().length <= 5 || $(".province-city").value.trim().length > 50) {
        $(".province-city").style.border = "1px solid red"
        condition = false
      }else{
        $(".province-city").style.border = "1px solid gray"
        condition = true
      }
      if ($(".district").value.trim().length <= 5 || $(".district").value.trim().length > 50) {
        $(".district").style.border = "1px solid red"
        condition = false
      }else{
        $(".district").style.border = "1px solid gray"
        condition = true
      }
      
      if ($(".wards").value.trim().length <= 5 || $(".wards").value.trim().length > 50) {
        $(".wards").style.border = "1px solid red"
        condition = false
      }else{
        $(".wards").style.border = "1px solid gray"
        condition = true
      }
      if (condition) {
        $(".notice-success").style.opacity = "1"
        $(".notice-success").style.visibility = "inherit"
        setTimeout(()=>{
            window.location.href = "/src/cart.html"
            localStorage.removeItem("cart")
        },10000)
      }else{
      alert("Vui lòng điền đầy đủ và đúng thông tin")
      }
    })
    $(".close").addEventListener("click",()=>{
      window.location.href = "/src/cart.html"
      localStorage.removeItem("cart")
    })
  })()
};
const getQueryString = window.location.search;
const urlQuery = new URLSearchParams(getQueryString);
const getStatusValue = urlQuery.get("status");
if (getStatusValue != "payment") {
  renderProductsCart();
} else {
  payment();
}
