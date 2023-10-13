import { Filter } from "./filter";
import * as noUiSlider from "nouislider";
import { constants } from "../constants";

export class Storage {
  public saveGoodsInCart(goods: Array<string>): void {
    localStorage.setItem("inCart", goods.join());
  }

  public saveSettings(
    filter: Filter,
    searchStr: string,
    sortIndex: number
  ): void {
    localStorage.setItem("amountFrom", filter.amountFrom.toString());
    localStorage.setItem("amountTo", filter.amountTo.toString());
    localStorage.setItem("yearFrom", filter.yearFrom.toString());
    localStorage.setItem("yearTo", filter.yearTo.toString());
    localStorage.setItem("brand", filter.brand.toString());
    localStorage.setItem("color", filter.color.join());
    localStorage.setItem("onlyPopular", "" + filter.onlyPopular);
    localStorage.setItem("size", filter.size.toString());
    localStorage.setItem("searchStr", searchStr);
    localStorage.setItem("sortIndex", sortIndex.toString());
  }

  public getGoodsInCart(): Array<string> {
    let res: Array<string> = [];
    const inCart: string | null = localStorage.getItem("inCart");
    if (inCart) res = inCart.split(",");

    const cart: HTMLElement | null = document.querySelector(
      ".cart_group__count"
    );
    if (cart) {
      cart.innerHTML = res.length.toString();
    }
    return res;
  }

  public resetStorage(): void {
    localStorage.clear();
    location.reload();
  }

  public getSorting(): number {
    const sortBy: string | null = localStorage.getItem("sortIndex");
    if (sortBy && +sortBy !== 0) {
      const sortByEl: HTMLSelectElement | null = document.querySelector(
        ".sort_category select"
      );
      if (sortByEl) sortByEl.selectedIndex = +sortBy;
      return +sortBy;
    }
    return 0;
  }

  public getSearchString(): string {
    const searchStr: string | null = localStorage.getItem("searchStr");
    if (searchStr) {
      const search: HTMLInputElement | null = document.querySelector(".search");
      if (search) search.value = searchStr;
      return searchStr;
    }
    return "";
  }

  public getFilterFromStorage(): Filter {
    const yearFrom: string | null = localStorage.getItem("yearFrom");
    const yearTo: string | null = localStorage.getItem("yearTo");
    const amountFrom: string | null = localStorage.getItem("amountFrom");
    const amountTo: string | null = localStorage.getItem("amountTo");
    const brand: string | null = localStorage.getItem("brand");
    const size: string | null = localStorage.getItem("size");
    const onlyPopular: string | null = localStorage.getItem("onlyPopular");
    const colors: string | null = localStorage.getItem("color");

    if (brand && +brand > 0) {
      const brandSelect: HTMLSelectElement | null = document.querySelector(
        ".brands"
      );
      if (brandSelect) {
        brandSelect.selectedIndex = +brand;
        if (brandSelect.selectedIndex !== 0) {
          brandSelect.classList.add("select_active");
        } else {
          brandSelect.classList.remove("select_active");
        }
      }
    }

    if (size && +size > 0) {
      const sizeSelect: HTMLSelectElement | null = document.querySelector(
        ".size"
      );
      if (sizeSelect) {
        sizeSelect.selectedIndex = +size;
        if (sizeSelect.selectedIndex !== 0) {
          sizeSelect.classList.add("select_active");
        } else {
          sizeSelect.classList.remove("select_active");
        }
      }
    }

    if (onlyPopular === "true") {
      const popularCheckbox: HTMLInputElement | null = document.querySelector(
        "#popular"
      );
      if (popularCheckbox) popularCheckbox.checked = true;
    }

    const arrColors: string[] = colors ? colors.split(",") : [];
    if (arrColors.length != 0) {
      const color_btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
        ".color_btn"
      );
      color_btns.forEach(function (btn: HTMLButtonElement | null): void {
        if (btn) {
          const color: string | undefined = btn.dataset.color;
          if (color && arrColors.indexOf(color) !== -1) {
            btn.classList.add("active_color");
          }
        }
      });
    }

    const yearSlider: noUiSlider.target = document.querySelector(
      "#slider_year"
    ) as noUiSlider.target;
    if (yearSlider && yearFrom && yearTo) {
      if (yearSlider.noUiSlider)
        yearSlider.noUiSlider.set([+yearFrom, +yearTo]);
    }

    const amountSlider: noUiSlider.target = document.querySelector(
      "#slider_amount"
    ) as noUiSlider.target;
    if (amountSlider && amountFrom && amountTo) {
      if (amountSlider.noUiSlider)
        amountSlider.noUiSlider.set([+amountFrom, +amountTo]);
    }

    return new Filter(
      yearFrom ? +yearFrom : constants.YEAR_FROM,
      yearTo ? +yearTo : constants.YEAR_TO,
      amountFrom ? +amountFrom : constants.AMOUNT_FROM,
      amountTo ? +amountTo : constants.AMOUNT_TO,
      brand ? +brand : 0,
      size ? +size : 0,
      onlyPopular === "true",
      arrColors
    );
  }
}
