import { user } from "./user"


export class basket{
  public id: number
  public userId: number
  public date: string
  public products: basketProduct[]
  public user: user | undefined
  public sum: number

  constructor(){
    this.id = 0
    this.userId = 0
    this.date = ""
    this.products = []
    this.user = new user;
    this.sum = 0
  }
}

export class basketProduct{
  public productId: number
  public productTitle: string
  public productImage: string
  public quantity: number
  public price: number

  constructor(){
    this.productId = 0
    this.productTitle = ""
    this.productImage = ""
    this.quantity = 0
    this.price = 0
  }
}
