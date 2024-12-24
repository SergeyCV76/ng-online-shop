
export interface IProducts{
    id: number;
    title: string,
    price: number,
    description: string,
    category: string,
    image: string,
    rating: IRating[]
}

export interface IRating{
  rate: number,
  count: number
}

export interface ICategories{
}

export interface ICarts{
    id: number,
    userId: number,
    date: Date,
    products: ICartsProducts[]
}

export interface ICartsProducts{
  productId: number,
  quantity: number
}

export class user{
  public username: string
  public password: string
  public token: string

  constructor(){
    this.username = "donero"
    this.password = "ewedon"
    this.token = ""
  }
}
