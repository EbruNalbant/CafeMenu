import { menu } from "./db.js";

//HTML'de arayüzü göndereceğimiz yer
const outlet = document.getElementById("outlet");

/* URL'deki paremetleri yönetebilmek için URLSearchParams
class'ından bir örnek oluşturma */

const searchParams = new URLSearchParams(window.location.search);
//get methodu ile URL'deki id parametresine erişme
const paramid = searchParams.get("id");

//menu içerisinde id'si bilinen elemana erişme
const product = menu.find((item) => item.id === Number(paramid));

//Bulunan ürüne göre arayüzü ekrana basma
outlet.innerHTML = `
<div class="d-flex justify-content-between align-items-center"> 
    <a href="/">
    <i class="bi bi-house fs-1"></i>
    </a>
    <div>
    home / ${product.category} / ${product.title.toLocaleLowerCase()}
    </div>
</div>  
<h1 class="text-center my-2 shadow p-2">${product.title} </h1>
<div class="d-flex align-items-center justify-content-center">
  <img
    class="img-fluid rounded shadow-lg"
    style="max-width: 500px"
    src= ${product.img}
  />
</div>
<div> 
    <h3 class="my-5"> 
    Category: <span class="text-success">${product.category} </span>
    </h3>
    <h3 class="my-5">
    Price: <span class="text-success">$ ${product.price} </span>
    </h3>
</div>
<p class="lead fs-3">${product.desc}</p>
`;
console.log(product);
