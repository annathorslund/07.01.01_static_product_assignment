const url = "https://kea-alt-del.dk/t7/api/products";

fetch(url)
  .then(function (res) {
    return res.json();
  })

  .then(function (data) {
    handleProductList(data);
  });

function handleProductList(data) {
  //   console.log(data);
  data.forEach(showProduct);
}

function showProduct(product) {
  console.log(product);

  //soldOut onSale

  //grab the template
  const template = document.querySelector("#smallProductTemplate").content;
  //clone it
  const copy = template.cloneNode(true);
  //chnage content

  copy.querySelector(
    ".subtitle"
  ).textContent = `${product.articletype} | ${product.brandname}`;

  copy.querySelector("h3").textContent = product.productdisplayname;

  copy.querySelector(
    "img.productimage"
  ).src = `https://kea-alt-del.dk/t7/images/webp/640/${product.id}.webp`;
  copy.querySelector("img.productimage").alt = product.productdisplayname;

  copy.querySelector(".discounted p").textContent =
    "-" + product.discount + "%";

  copy.querySelector(".price").textContent = "DKK " + product.price;

  if (product.soldout) {
    copy.querySelector("article").classList.add("soldOut");
  }

  if (product.discount) {
    copy.querySelector("article").classList.add("onSale");
    copy.querySelector(".price").textContent =
      "DKK " + (product.price - (product.discount / 100) * product.price);
    copy.querySelector(".prev").textContent = "DKK " + product.price;
  }

  //grab the parent
  const parent = document.querySelector("main");
  //append it
  parent.appendChild(copy);
}
