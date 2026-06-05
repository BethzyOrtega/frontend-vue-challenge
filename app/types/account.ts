export interface Account {
  id: string
  alias: string
  accountNumber: number
  bank: string
  currency: 'PEN' | 'USD'
  accountType: 'Ahorro' | 'Corriente'
}