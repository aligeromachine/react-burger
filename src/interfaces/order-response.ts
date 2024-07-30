export interface IOrder {
  number: number;
}

export interface IResponseOrder {
  name: string;
  success: boolean;
  order: IOrder;
}

