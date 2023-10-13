import { constants } from "../constants";
import { Bike } from "./bike";

export class Card {
  public createCards(bikes: Array<Bike>, inCart: Array<string>): void {
    const container: HTMLDivElement | null = document.querySelector(".goods");
    if (container) {
      this.clearCards();
      bikes.forEach((bike: Bike) => {
        const goods_card: HTMLDivElement = document.createElement("div");
        goods_card.className = "goods_card";
        goods_card.dataset.id = bike.id.toString();
        if (inCart.indexOf(bike.id.toString()) !== -1) {
          goods_card.classList.add("choosen");
        }
        container.appendChild(goods_card);

        const goods_name: HTMLElement = document.createElement("h6");
        goods_name.innerHTML = bike.model;
        goods_card.appendChild(goods_name);

        const goods_img: HTMLImageElement = document.createElement("img");
        goods_img.className = "goods_img";
        goods_img.src = bike.picture;
        goods_card.appendChild(goods_img);

        const goods_desc: HTMLElement = document.createElement("ul");
        goods_desc.className = "goods_desc";
        goods_card.appendChild(goods_desc);

        const quantity_el: HTMLElement = document.createElement("li");
        quantity_el.innerHTML = "Quantity in stock: <b>" + bike.amount + "</b>";
        goods_desc.appendChild(quantity_el);

        const year_el: HTMLElement = document.createElement("li");
        year_el.innerHTML = "Release year: <b>" + bike.year + "</b>";
        goods_desc.appendChild(year_el);

        const color_el: HTMLElement = document.createElement("li");
        color_el.innerHTML = "Color: <b>" + bike.color + "</b>";
        goods_desc.appendChild(color_el);

        const brand_el: HTMLElement = document.createElement("li");
        brand_el.innerHTML = "Brand: <b>" + bike.brand + "</b>";
        goods_desc.appendChild(brand_el);

        const price_el: HTMLElement = document.createElement("li");
        price_el.innerHTML = "Price: <b>$" + bike.price + "</b>";
        goods_desc.appendChild(price_el);

        const goods_btn: HTMLButtonElement = document.createElement("button");
        goods_btn.className = "goods_btn";
        if (inCart.indexOf(bike.id.toString()) !== -1) {
          goods_btn.classList.add("clicked");
          goods_btn.innerHTML = constants.REMOVE_BTN;
        } else {
          goods_btn.innerHTML = constants.ADD_BTN;
        }
        goods_card.appendChild(goods_btn);
      });
    }
  }

  private clearCards(): void {
    const elementList: NodeListOf<Element> = document.querySelectorAll(
      ".goods_card"
    );
    if (elementList) {
      elementList.forEach(function (elem: Element): void {
        if (elem.parentNode) elem.parentNode.removeChild(elem);
      });
    }
  }

  public drawCards(Bikes: Array<Bike>, inCart: Array<string>): void {
    const nothingFound: HTMLElement | null = document.querySelector(
      ".nothingFound"
    );
    const cards: HTMLElement | null = document.querySelector(".goods");
    if (Bikes.length === 0 && cards) {
      this.clearCards();
      if (nothingFound) {
        nothingFound.classList.remove("hired");
      }
    } else {
      this.createCards(Bikes, inCart);
      if (nothingFound) {
        nothingFound.classList.add("hired");
      }
    }
  }
}
