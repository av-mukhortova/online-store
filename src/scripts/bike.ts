import { iBike } from "../types";

export class Bike implements iBike {
  id: number;
  model: string;
  picture: string;
  price: number;
  brand: string;
  color: string;
  size: string;
  year: number;
  popular: number;
  amount: number;

  constructor(
    id: number,
    model: string,
    picture: string,
    price: number,
    brand: string,
    color: string,
    size: string,
    year: number,
    popular: number,
    amount: number
  ) {
    this.id = id;
    this.model = model;
    this.picture = picture;
    this.price = price;
    this.brand = brand;
    this.color = color;
    this.size = size;
    this.year = year;
    this.popular = popular;
    this.amount = amount;
  }
}
