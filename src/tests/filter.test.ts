/**
 * @jest-environment jsdom
 */
import { Bike } from "../scripts/bike";
import { Filter } from "../scripts/filter";
import { Storage } from "../scripts/storage";

const realLocalStorage = Object.create(global.localStorage);

const myLocalStorage = {
  length: 0,
  getItem: () => null,
  setItem: () => null,
  clear: () => null,
  removeItem: () => null,
  key: () => null,
};

const mockResponse = jest.fn();
Object.defineProperty(window, "location", {
  value: {
    hash: {
      endsWith: mockResponse,
      includes: mockResponse,
    },
    reload: mockResponse,
  },
  writable: true,
});

beforeEach(() => {
  global.localStorage = myLocalStorage;
});

afterEach(() => {
  global.localStorage = realLocalStorage;
});

it("We can reset filters", () => {
  const filter = new Filter(2018, 2022, 1, 34, 0, 0, false, []);
  expect(filter.resetFilters("str", 0)).toStrictEqual(filter);
});

it("We can reset filters, but save searching string", () => {
  const storage = new Storage();
  const filter = new Filter(2018, 2022, 1, 34, 0, 0, false, []);
  filter.resetFilters("str", 0);
  expect(storage.getSearchString()).toBe("str");
});

it("We can filter array", () => {
  const bikes: Array<Bike> = [];
  bikes.push(new Bike(1, "Bike1", "", 0, "", "", "", 2022, 0, 0));
  bikes.push(new Bike(1, "Bike2", "", 0, "", "", "", 2021, 0, 0));
  const filter = new Filter(2021, 2021, 0, 0, 0, 0, false, []);
  expect(filter.filterArray(bikes, filter, "", 0).length).toBe(1);
});
