const cartListProduct = JSON.parse(localStorage.getItem("cart")) || [];
const renderProductsCart = () => {
  const renderCart = cartListProduct.map(
    (data) =>
      `<tr class="item-cart">
      <td class="choose-products">
          <input type="checkbox" checked>
      </td>
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
      `
            <thead class="infor-cart">
            <tr>
                <th style="width: 70px;">Chọn</th>
                <th>Sản phẩm</th>
                <th>Giá</th>
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
  const totalAmount = () => {
    let total = 0;
    cartListProduct.forEach((event) => {
      const subtotal = parseInt(event.price) * event.quantity;
      total += subtotal;
    });
    $(".total-amount span").innerHTML = `${total.toLocaleString("vi-VN")}.000đ`;
  };
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
      totalAmount();
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
      totalAmount();
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
  totalAmount();
};
renderProductsCart();
