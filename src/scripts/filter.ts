import { iFilter, eBrand, eSize } from "../types";
import { Bike } from "./bike";
import * as noUiSlider from "nouislider";
import { Storage } from "./storage";
import { constants } from "../constants";

export class Filter implements iFilter {
  yearFrom: number;
  yearTo: number;
  amountFrom: number;
  amountTo: number;
  brand: number;
  size: number;
  onlyPopular: boolean;
  color: Array<string>;
  storage: Storage;

  constructor(
    yearFrom: number,
    yearTo: number,
    amountFrom: number,
    amountTo: number,
    brand: number,
    size: number,
    onlyPopular: boolean,
    color: Array<string>
  ) {
    this.yearFrom = yearFrom;
    this.yearTo = yearTo;
    this.amountFrom = amountFrom;
    this.amountTo = amountTo;
    this.brand = brand;
    this.size = size;
    this.onlyPopular = onlyPopular;
    this.color = color;
    this.storage = new Storage();
  }

  public filterArray(
    bikes: Array<Bike>,
    filter: Filter,
    searchStr: string,
    sortIndex: number
  ): Array<Bike> {
    const res: Array<Bike> = [];
    for (let i = 0; i < bikes.length; i++) {
      if (bikes[i].year >= filter.yearFrom && bikes[i].year <= filter.yearTo) {
        if (
          bikes[i].amount >= filter.amountFrom &&
          bikes[i].amount <= filter.amountTo
        ) {
          if (filter.brand === 0 || eBrand[filter.brand] === bikes[i].brand) {
            if (filter.size === 0 || eSize[filter.size] === bikes[i].size) {
              if (!filter.onlyPopular || bikes[i].popular) {
                if (
                  filter.color.length === 0 ||
                  filter.color.indexOf(bikes[i].color) >= 0
                ) {
                  const name: string = bikes[i].model.toLowerCase();
                  if (
                    searchStr === "" ||
                    name.indexOf(searchStr.toLowerCase()) !== -1
                  ) {
                    res.push(bikes[i]);
                  }
                }
              }
            }
          }
        }
      }
    }
    res.sort(function (a: Bike, b: Bike) {
      const nameA: string | number = sortIndex < 2 ? a.model : a.year;
      const nameB: string | number = sortIndex < 2 ? b.model : b.year;
      if (nameA < nameB) return sortIndex == 0 || sortIndex == 2 ? -1 : 1;
      if (nameA > nameB) return sortIndex == 0 || sortIndex == 2 ? 1 : -1;
      return 0;
    });

    this.storage.saveSettings(filter, searchStr, sortIndex);

    return res;
  }

  public resetFilters(searchStr: string, sortIndex: number): Filter {
    const filter: Filter = new Filter(
      constants.YEAR_FROM,
      constants.YEAR_TO,
      constants.AMOUNT_FROM,
      constants.AMOUNT_TO,
      0,
      0,
      false,
      []
    );
    this.storage.saveSettings(filter, searchStr, sortIndex);

    const brandSelect: HTMLSelectElement | null = document.querySelector(
      ".brands"
    );
    if (brandSelect) {
      brandSelect.selectedIndex = 0;
      brandSelect.classList.remove("select_active");
    }
    const sizeSelect: HTMLSelectElement | null = document.querySelector(
      ".size"
    );
    if (sizeSelect) {
      sizeSelect.selectedIndex = 0;
      sizeSelect.classList.remove("select_active");
    }
    const popularCheckbox: HTMLInputElement | null = document.querySelector(
      "#popular"
    );
    if (popularCheckbox) popularCheckbox.checked = false;
    const yearSlider: noUiSlider.target = document.querySelector(
      "#slider_year"
    ) as noUiSlider.target;
    if (yearSlider) {
      if (yearSlider.noUiSlider)
        yearSlider.noUiSlider.set([constants.YEAR_FROM, constants.YEAR_TO]);
    }
    const amountSlider: noUiSlider.target = document.querySelector(
      "#slider_amount"
    ) as noUiSlider.target;
    if (amountSlider) {
      if (amountSlider.noUiSlider)
        amountSlider.noUiSlider.set([
          constants.AMOUNT_FROM,
          constants.AMOUNT_TO,
        ]);
    }
    const color_btns: NodeListOf<HTMLButtonElement> = document.querySelectorAll(
      ".color_btn"
    );
    color_btns.forEach(function (btn: HTMLButtonElement | null): void {
      if (btn) {
        const color: string | undefined = btn.dataset.color;
        if (color) {
          btn.classList.remove("active_color");
        }
      }
    });
    return filter;
  }
}
