export interface Account {
  id: string
  alias: string
  accountNumber: string
  bank: string
  currency: 'PEN' | 'USD'
  accountType: 'saving' | 'checking'
}