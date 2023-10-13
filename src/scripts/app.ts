import { Storage } from "./storage";
import { Bike } from "./bike";
import { Filter } from "./filter";
import { Card } from "./card";
import { getBikes } from "../goods";
import * as noUiSlider from "nouislider";
import "nouislider/dist/nouislider.css";
import { constants } from "../constants";

export class App {
  storage: Storage;
  constructor() {
    this.storage = new Storage();
  }
  public start(): void {
    // инициализация
    this.showInfoAbout(); // выводит в консоль информацию о приложении
    this.createSliders(); // создает бегунки для фильтров по году и количеству

    const Bikes: Array<Bike> = getBikes(); // получает информацию о товарах
    const goodsInCart: Array<string> = this.storage.getGoodsInCart(); // получает информацию о товарах, положенных в корзину
    let count_cart: number = goodsInCart.length;

    const card: Card = new Card();
    card.createCards(Bikes, goodsInCart); // создает карточки товаров

    let filter: Filter = this.storage.getFilterFromStorage(); // получает сохраненные настройки фильтров
    let search_str: string = this.storage.getSearchString(); // получает сохраненное значение строки поиска
    let sort_ind: number = this.storage.getSorting(); // получает сохраненные настройки сортировки товаров

    // обработка событий
    const cart: HTMLElement | null = document.querySelector(
      ".cart_group__count"
    );
    const cards: HTMLElement | null = document.querySelector(".goods");
    if (cards && cart) {
      cards.addEventListener("click", (event: MouseEvent): void => {
        const target: HTMLElement = event.target as HTMLElement;
        const parent: HTMLElement = target.parentNode as HTMLElement;
        if (event && target.className === "goods_btn") {
          if (count_cart < constants.MAX_AMOUNT_OF_GOODS) {
            count_cart++;
            target.classList.add("clicked");
            if (parent) parent.classList.add("choosen");
            target.innerHTML = constants.REMOVE_BTN;
            if (parent.dataset.id) {
              goodsInCart.push(parent.dataset.id);
            }
          } else {
            alert(constants.SLOTS_FULL_MSG);
          }
        } else if (event && target.className === "goods_btn clicked") {
          count_cart--;
          target.classList.remove("clicked");
          if (parent) parent.classList.remove("choosen");
          target.innerHTML = constants.ADD_BTN;
          if (parent.dataset.id) {
            goodsInCart.splice(goodsInCart.indexOf(parent.dataset.id), 1);
          }
        }
        cart.innerHTML = count_cart.toString();
        this.storage.saveGoodsInCart(goodsInCart);
      });
    }

    const sortBy: HTMLSelectElement | null = document.querySelector(
      ".sort_category select"
    );
    if (sortBy) {
      sortBy.addEventListener("change", (): void => {
        sort_ind = sortBy.selectedIndex;
        const fBikes: Array<Bike> = filter.filterArray(
          Bikes,
          filter,
          search_str,
          sort_ind
        );
        card.drawCards(fBikes, goodsInCart);
      });
    }

    const search: HTMLElement | null = document.querySelector(".search");
    if (search) {
      search.addEventListener("input", (event: Event): void => {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        search_str = target.value;
        const fBikes: Array<Bike> = filter.filterArray(
          Bikes,
          filter,
          search_str,
          sort_ind
        );
        card.drawCards(fBikes, goodsInCart);
      });
    }

    const yearSlider: noUiSlider.target = document.querySelector(
      "#slider_year"
    ) as noUiSlider.target;
    if (yearSlider.noUiSlider) {
      yearSlider.noUiSlider.on(
        "update",
        function (values: Array<string | number>): void {
          filter.yearFrom = +values[0];
          filter.yearTo = +values[1];
          const fBikes: Array<Bike> = filter.filterArray(
            Bikes,
            filter,
            search_str,
            sort_ind
          );
          card.drawCards(fBikes, goodsInCart);
        }
      );
    }

    const amountSlider: noUiSlider.target = document.querySelector(
      "#slider_amount"
    ) as noUiSlider.target;
    if (amountSlider.noUiSlider) {
      amountSlider.noUiSlider.on(
        "update",
        function (values: Array<string | number>): void {
          filter.amountFrom = +values[0];
          filter.amountTo = +values[1];
          const fBikes: Array<Bike> = filter.filterArray(
            Bikes,
            filter,
            search_str,
            sort_ind
          );
          card.drawCards(fBikes, goodsInCart);
        }
      );
    }

    const brandSelect: HTMLSelectElement | null = document.querySelector(
      ".brands"
    );
    if (brandSelect) {
      brandSelect.addEventListener("change", (): void => {
        filter.brand = brandSelect.selectedIndex;
        const fBikes: Array<Bike> = filter.filterArray(
          Bikes,
          filter,
          search_str,
          sort_ind
        );
        card.drawCards(fBikes, goodsInCart);
        if (brandSelect.selectedIndex !== 0) {
          brandSelect.classList.add("select_active");
        } else {
          brandSelect.classList.remove("select_active");
        }
      });
    }

    const sizeSelect: HTMLSelectElement | null = document.querySelector(
      ".size"
    );
    if (sizeSelect) {
      sizeSelect.addEventListener("change", (): void => {
        filter.size = sizeSelect.selectedIndex;
        const fBikes: Array<Bike> = filter.filterArray(
          Bikes,
          filter,
          search_str,
          sort_ind
        );
        card.drawCards(fBikes, goodsInCart);
        if (sizeSelect.selectedIndex !== 0) {
          sizeSelect.classList.add("select_active");
        } else {
          sizeSelect.classList.remove("select_active");
        }
      });
    }

    const popularCheckbox: HTMLElement | null = document.querySelector(
      "#popular"
    );
    if (popularCheckbox) {
      popularCheckbox.addEventListener("change", (event: Event): void => {
        const target: HTMLInputElement = event.target as HTMLInputElement;
        filter.onlyPopular = target.checked;
        const fBikes: Array<Bike> = filter.filterArray(
          Bikes,
          filter,
          search_str,
          sort_ind
        );
        card.drawCards(fBikes, goodsInCart);
      });
    }

    const colors: HTMLElement | null = document.querySelector(
      ".filters_colors"
    );
    if (colors) {
      colors.addEventListener("click", (event: MouseEvent): void => {
        event.preventDefault();
        const target: HTMLButtonElement = event.target as HTMLButtonElement;
        if (target.name === "color") {
          const data: string = target.dataset.color
            ? target.dataset.color
            : "-";
          if (target.classList.contains("active_color")) {
            target.classList.remove("active_color");
            filter.color.splice(filter.color.indexOf(data), 1);
          } else {
            target.classList.add("active_color");
            filter.color.push(data);
          }
          const fBikes: Array<Bike> = filter.filterArray(
            Bikes,
            filter,
            search_str,
            sort_ind
          );
          card.drawCards(fBikes, goodsInCart);
        }
      });
    }

    const fullReset: HTMLElement | null = document.querySelector(
      ".reset_settings"
    );
    if (fullReset) {
      fullReset.addEventListener("click", (): void =>
        this.storage.resetStorage()
      );
    }

    const resetFiltersBtn: HTMLElement | null = document.querySelector(
      ".reset_filters"
    );
    if (resetFiltersBtn) {
      resetFiltersBtn.addEventListener("click", (): void => {
        filter = filter.resetFilters(search_str, sort_ind);
        const fBikes: Array<Bike> = filter.filterArray(
          Bikes,
          filter,
          search_str,
          sort_ind
        );
        card.drawCards(fBikes, goodsInCart);
      });
    }
  }

  private showInfoAbout(): void {
    console.log("Online-Store - Интернет магазин");
    console.log(
      "https://github.com/rolling-scopes-school/tasks/tree/master/tasks/online-store"
    );
    console.log(
      "1. Главная страница содержит все товары магазина, а также фильтры, строку поиска, поле для сортировки. Выполняются требования к вёрстке +10"
    );
    console.log(
      "2. Карточка товара содержит его изображение, название, количество данного товара на складе, год выхода на рынок, цвет, производитель, цену, находится ли товар в корзине (выделяется рамкой) +10"
    );
    console.log("3. Реализовано добавление товаров в корзину +20");
    console.log("4. Реализована сортировка товаров +20");
    console.log("5. Реализованы фильтры в указанном диапазоне от и до +30");
    console.log("6. Реализованы фильтры по значению +30");
    console.log(
      "7. Можно отфильтровать товары по нескольким фильтрам разного типа +20"
    );
    console.log("8. Реализован сброс фильтров +20");
    console.log("9. Реализовано сохранение настроек в local storage +30");
    console.log("10. Реализован поиск +30");
  }

  private createSliders(): void {
    const yearSlider: noUiSlider.target = document.querySelector(
      "#slider_year"
    ) as noUiSlider.target;
    const amountSlider: noUiSlider.target = document.querySelector(
      "#slider_amount"
    ) as noUiSlider.target;
    noUiSlider.create(yearSlider, {
      start: [constants.YEAR_FROM, constants.YEAR_TO],
      step: 1,
      animate: false,
      range: {
        min: constants.YEAR_FROM,
        max: constants.YEAR_TO,
      },
      connect: true,
      tooltips: true,
      format: {
        to: function (value: number): number {
          return Math.round(value);
        },
        from: function (value: string): number {
          return Math.round(Number(value));
        },
      },
    });

    noUiSlider.create(amountSlider, {
      start: [constants.AMOUNT_FROM, constants.AMOUNT_TO],
      step: 1,
      range: {
        min: constants.AMOUNT_FROM,
        max: constants.AMOUNT_TO,
      },
      connect: true,
      tooltips: true,
      animate: false,
      format: {
        to: function (value: number): number {
          return Math.round(value);
        },
        from: function (value: string): number {
          return Math.round(Number(value));
        },
      },
    });
  }
}
