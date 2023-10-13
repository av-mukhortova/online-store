/**
 * @jest-environment jsdom
 */
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

it("We can save goods in storage", () => {
  const storage = new Storage();
  storage.saveGoodsInCart(["1", "2"]);
  expect(localStorage.getItem("inCart")).toBe("1,2");
});

it("We can save settings in storage", () => {
  const storage = new Storage();
  const filter = new Filter(0, 0, 0, 0, 0, 0, false, []);
  storage.saveSettings(filter, "str", 0);
  expect(localStorage.getItem("searchStr")).toBe("str");
});

it("We can get goods in storage", () => {
  const storage = new Storage();
  expect(storage.getGoodsInCart()).toStrictEqual(["1", "2"]);
});

it("We can get sorting", () => {
  const storage = new Storage();
  const filter = new Filter(0, 0, 0, 0, 0, 0, false, []);
  storage.saveSettings(filter, "str", 5);
  expect(storage.getSorting()).toBe(5);
});

it("We can get search string", () => {
  const storage = new Storage();
  const filter = new Filter(0, 0, 0, 0, 0, 0, false, []);
  storage.saveSettings(filter, "str", 5);
  expect(storage.getSearchString()).toBe("str");
});

it("We can get filter from storage", () => {
  const storage = new Storage();
  const filter = new Filter(0, 0, 0, 0, 0, 0, false, []);
  storage.saveSettings(filter, "str", 5);
  expect(storage.getFilterFromStorage()).toStrictEqual(filter);
});

it("We can reset storage", () => {
  const storage = new Storage();
  storage.resetStorage();
  expect(localStorage.getItem("inCart")).toBe(null);
});

it("We can get default sorting after reset", () => {
  const storage = new Storage();
  const filter = new Filter(0, 0, 0, 0, 0, 0, false, []);
  storage.saveSettings(filter, "str", 5);
  storage.resetStorage();
  expect(storage.getSorting()).toBe(0);
});
