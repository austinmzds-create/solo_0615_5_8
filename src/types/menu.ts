export interface MenuItem {
  id: number
  name: string
  categoryId: number
  price: number
  image: string
  description: string
}

export interface Category {
  id: number
  name: string
  icon: string
}

export interface CartItem {
  menuItem: MenuItem
  quantity: number
  remark?: string
}

export interface Order {
  id: string
  items: CartItem[]
  total: number
  status: 'pending' | 'completed'
  createdAt: string
  tableNumber?: string
  remark?: string
}
