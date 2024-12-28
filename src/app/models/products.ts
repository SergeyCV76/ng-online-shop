
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
