import { reactive, computed, watch } from 'vue'
import type { CartItem, Order, MenuItem } from '../types/menu'

const CART_STORAGE_KEY = 'restaurant_cart'
const ORDER_STORAGE_KEY = 'restaurant_orders'

function loadFromStorage<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key)
    return stored ? JSON.parse(stored) : defaultValue
  } catch {
    return defaultValue
  }
}

function saveToStorage<T>(key: string, value: T): void {
  localStorage.setItem(key, JSON.stringify(value))
}

interface OrderState {
  cart: CartItem[]
  orders: Order[]
}

const state = reactive<OrderState>({
  cart: loadFromStorage<CartItem[]>(CART_STORAGE_KEY, []),
  orders: loadFromStorage<Order[]>(ORDER_STORAGE_KEY, [])
})

watch(
  () => state.cart,
  (newCart) => saveToStorage(CART_STORAGE_KEY, newCart),
  { deep: true }
)

watch(
  () => state.orders,
  (newOrders) => saveToStorage(ORDER_STORAGE_KEY, newOrders),
  { deep: true }
)

export function useOrderStore() {
  const cartItems = computed(() => state.cart)

  const cartTotal = computed(() => {
    return state.cart.reduce((sum, item) => sum + item.menuItem.price * item.quantity, 0)
  })

  const cartCount = computed(() => {
    return state.cart.reduce((sum, item) => sum + item.quantity, 0)
  })

  const orders = computed(() => state.orders)

  function addToCart(menuItem: MenuItem) {
    const existing = state.cart.find((item) => item.menuItem.id === menuItem.id)
    if (existing) {
      existing.quantity++
    } else {
      state.cart.push({ menuItem, quantity: 1 })
    }
  }

  function removeFromCart(menuItemId: number) {
    const index = state.cart.findIndex((item) => item.menuItem.id === menuItemId)
    if (index !== -1) {
      if (state.cart[index].quantity > 1) {
        state.cart[index].quantity--
      } else {
        state.cart.splice(index, 1)
      }
    }
  }

  function getItemQuantity(menuItemId: number): number {
    const item = state.cart.find((i) => i.menuItem.id === menuItemId)
    return item ? item.quantity : 0
  }

  function clearCart() {
    state.cart.splice(0, state.cart.length)
    saveToStorage(CART_STORAGE_KEY, [])
  }

  function updateCartItemRemark(menuItemId: number, remark: string) {
    const item = state.cart.find((i) => i.menuItem.id === menuItemId)
    if (item) {
      item.remark = remark
    }
  }

  function submitOrder(tableNumber?: string, remark?: string): Order {
    const order: Order = {
      id: `ORD${Date.now()}`,
      items: JSON.parse(JSON.stringify(state.cart)),
      total: cartTotal.value,
      status: 'pending',
      createdAt: new Date().toISOString(),
      tableNumber,
      remark
    }
    state.orders.unshift(order)
    clearCart()
    return order
  }

  function getOrderById(orderId: string): Order | undefined {
    return state.orders.find((o) => o.id === orderId)
  }

  return {
    cartItems,
    cartTotal,
    cartCount,
    orders,
    addToCart,
    removeFromCart,
    getItemQuantity,
    clearCart,
    updateCartItemRemark,
    submitOrder,
    getOrderById
  }
}
