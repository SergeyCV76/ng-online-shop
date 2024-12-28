

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
