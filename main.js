import { menu, buttonsData } from "./db.js";

//HTML'den gelenler
const menuArea = document.getElementById("menu-area");
const buttonsArea = document.getElementById("buttons-area");

//!Olay izleyicileri
//sayfanın yüklenme olayını izleme
document.addEventListener("DOMContentLoaded", () => {
  renderButtons("all");
  renderMenuItems(menu);
});

//butonlar kısmında tıklanma olaylarını izleme
buttonsArea.addEventListener("click", searchCategory);

//! ekrana menü elemanlarını basma
function renderMenuItems(menuItems) {
  //dizideki her bir obje için bir elemanı temsil eden HTML oluşturma
  let menuHtml = menuItems.map(
    (item) => `
  <a href ="/productDetail.html?id=${item.id} "
  id="card"
  class="d-flex flex-column flex-md-row gap-3 text-decoration-none text-dark">
  <img
    class="rounded shadow"
    src=${item.img} />
  <div class="">
    <div class="d-flex justify-content-between">
      <h5>${item.title} </h5>
      <p class="text-success">$ ${item.price} </p>
    </div>
    <p class="lead"> ${item.desc}</p>
  </div>
</a>
  `
  );
  //diziyi stringe çevirme
  menuHtml = menuHtml.join();
  //oluşturulan HTML'i ekrana basma
  menuArea.innerHTML = menuHtml;
}

//! Filtreleme
// tıklanılan butona göre ekrana o butonun kategorisine ait ürünleri listeleme
function searchCategory(e) {
  const category = e.target.dataset.category;

  //tüm dizi elemanlarından yalnızca kategori değeri ile butonun değeri eşleşeleri getirme
  const filteredMenu = menu.filter((item) => item.category === category);

  //all butonuna basıldığında bütün menüyü ekrana basma
  if (category === "all") {
    renderMenuItems(menu);
  } else {
    //filterelenmiş dizinin ekrana basılması
    renderMenuItems(filteredMenu);
  }
  //butonları güncelleme
  renderButtons(category);
}

//! ekrana butonları basma
function renderButtons(active) {
  //eski butonları kaldırma
  buttonsArea.innerHTML = "";

  buttonsData.forEach((btn) => {
    //html butonu oluşturma
    const buttonELe = document.createElement("button");
    //gerekli class'ları verme
    buttonELe.className = "btn btn-outline-dark filter-btn";
    //içerisindeki yazıyı değiştirme
    buttonELe.innerText = btn.text;
    //hangi kategori olduğu bilgisini buton elementine ekleme
    buttonELe.dataset.category = btn.value;
    //eğerki aktif kategoriyle, buton eşleşirse ona farklı class verilmesi
    if (btn.value === active) {
      buttonELe.classList.add("bg-dark", "text-light");
    }

    //HTML'e gönderme
    buttonsArea.appendChild(buttonELe);
  });
}
