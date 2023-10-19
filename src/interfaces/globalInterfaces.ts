interface ICountry {
  id: string
  nome: string
}
interface IForm {
  firstName: string,
  lastName: string,
  phone: string,
  email: string,
  cake: number,
  stretAddress?: string,
  stretAddress2?: string,
  city?: string,
  region?: string,
  zipCode?: string,
  selectedDate?: string,
  deliveryTime?: string
}
export type {
  ICountry,
  IForm
}