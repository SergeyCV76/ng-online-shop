

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
  public id: number

  constructor(){
    this.username = "donero"
    this.password = "ewedon"
    this.token = ""
    this.id = 0
  }
}

export class basket{
  public id: number
  public userId: number
  public date: string
  public products: basketProduct[]

  constructor(){
    this.id = 0
    this.userId = 0
    this.date = ""
    this.products = []
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


export class products{
  public id: number;
  public title: string
  public price: number
  public description: string
  public category: string
  public image: string
  public rating: rating[]

  constructor(){
    this.id = 0
    this.title = ""
    this.price = 0
    this.description = ""
    this.category = ""
    this.image = ""
    this.rating = []
  }
}

export class rating{
  public rate: number
  public count: number

  constructor(){
    this.rate = 0
    this.count = 0
  }
}
