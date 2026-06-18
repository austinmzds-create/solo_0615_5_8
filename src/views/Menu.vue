<template>
  <div class="menu-container">
    <header class="header">
      <h1>🍽️ 美味点餐</h1>
      <el-button type="primary" @click="showOrders = true">
        我的订单
        <el-badge :value="orders.length" class="ml-2" />
      </el-button>
    </header>

    <div class="content">
      <aside class="category-sidebar">
        <div
          v-for="cat in categories"
          :key="cat.id"
          class="category-item"
          :class="{ active: activeCategory === cat.id }"
          @click="activeCategory = cat.id"
        >
          <span class="category-icon">{{ cat.icon }}</span>
          <span class="category-name">{{ cat.name }}</span>
        </div>
      </aside>

      <main class="menu-list">
        <h2 class="category-title">{{ currentCategory?.icon }} {{ currentCategory?.name }}</h2>
        <div class="menu-grid">
          <div v-for="item in filteredMenu" :key="item.id" class="menu-card">
            <div class="menu-image">
              <img :src="item.image" :alt="item.name" />
            </div>
            <div class="menu-info">
              <h3 class="menu-name">{{ item.name }}</h3>
              <p class="menu-desc">{{ item.description }}</p>
              <div class="menu-bottom">
                <span class="menu-price">¥{{ item.price }}</span>
                <div class="quantity-control">
                  <el-button
                    v-if="getItemQuantity(item.id) > 0"
                    circle
                    size="small"
                    icon="Minus"
                    @click.stop="removeFromCart(item.id)"
                  />
                  <span v-if="getItemQuantity(item.id) > 0" class="quantity">
                    {{ getItemQuantity(item.id) }}
                  </span>
                  <el-button
                    circle
                    size="small"
                    type="primary"
                    icon="Plus"
                    @click.stop="addToCart(item)"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>

    <div v-if="cartCount > 0" class="cart-bar">
      <div class="cart-icon-wrapper" @click="showCart = true">
        <el-icon class="cart-icon"><ShoppingCart /></el-icon>
        <el-badge :value="cartCount" class="cart-badge" />
      </div>
      <div class="cart-info">
        <span class="cart-total">¥{{ cartTotal.toFixed(2) }}</span>
        <span class="cart-hint">共 {{ cartCount }} 件商品</span>
      </div>
      <el-button type="primary" class="submit-btn" @click="showCart = true">
        去结算
      </el-button>
    </div>

    <el-drawer v-model="showCart" direction="rtl" title="购物车" size="400px">
      <div v-if="cartItems.length === 0" class="empty-cart">
        <el-empty description="购物车是空的" />
      </div>
      <div v-else class="cart-list">
        <div v-for="item in cartItems" :key="item.menuItem.id" class="cart-item">
          <img :src="item.menuItem.image" :alt="item.menuItem.name" class="cart-item-img" />
          <div class="cart-item-info">
            <h4>{{ item.menuItem.name }}</h4>
            <p class="cart-item-price">¥{{ item.menuItem.price }}</p>
          </div>
          <div class="quantity-control">
            <el-button
              circle
              size="small"
              icon="Minus"
              @click="removeFromCart(item.menuItem.id)"
            />
            <span class="quantity">{{ item.quantity }}</span>
            <el-button
              circle
              size="small"
              type="primary"
              icon="Plus"
              @click="addToCart(item.menuItem)"
            />
          </div>
        </div>
        <el-divider />
        <div class="order-form">
          <el-form label-width="80px">
            <el-form-item label="桌号">
              <el-input v-model="tableNumber" placeholder="请输入桌号，如：A1" />
            </el-form-item>
            <el-form-item label="备注">
              <el-input
                v-model="remark"
                type="textarea"
                :rows="2"
                placeholder="口味偏好、忌口等"
              />
            </el-form-item>
          </el-form>
        </div>
        <div class="cart-summary">
          <span>合计：</span>
          <span class="total-amount">¥{{ cartTotal.toFixed(2) }}</span>
        </div>
        <el-button type="primary" class="checkout-btn" @click="handleSubmitOrder">
          提交订单
        </el-button>
      </div>
    </el-drawer>

    <el-drawer v-model="showOrders" direction="ltr" title="我的订单" size="500px">
      <div v-if="orders.length === 0" class="empty-cart">
        <el-empty description="暂无订单" />
      </div>
      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.id" class="order-card">
          <div class="order-header">
            <span class="order-id">订单号：{{ order.id }}</span>
            <el-tag :type="order.status === 'completed' ? 'success' : 'warning'">
              {{ order.status === 'completed' ? '已完成' : '待处理' }}
            </el-tag>
          </div>
          <div class="order-meta">
            <span v-if="order.tableNumber">桌号：{{ order.tableNumber }}</span>
            <span>{{ formatDate(order.createdAt) }}</span>
          </div>
          <div v-if="order.remark" class="order-remark">
            备注：{{ order.remark }}
          </div>
          <el-divider class="order-divider" />
          <div class="order-items">
            <div v-for="item in order.items" :key="item.menuItem.id" class="order-item">
              <span>{{ item.menuItem.name }}</span>
              <span>x{{ item.quantity }}</span>
              <span>¥{{ (item.menuItem.price * item.quantity).toFixed(2) }}</span>
            </div>
          </div>
          <el-divider class="order-divider" />
          <div class="order-total">
            <span>合计</span>
            <span class="total-price">¥{{ order.total.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </el-drawer>

    <el-dialog v-model="showSuccess" title="下单成功" width="400px" :close-on-click-modal="false">
      <div class="success-content">
        <el-icon class="success-icon" color="#67c23a" size="64"><CircleCheck /></el-icon>
        <p class="success-text">订单提交成功！</p>
        <p v-if="lastOrder" class="order-info">
          订单号：{{ lastOrder.id }}<br />
          金额：¥{{ lastOrder.total.toFixed(2) }}
        </p>
      </div>
      <template #footer>
        <el-button type="primary" @click="showSuccess = false">好的</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { ElMessage } from 'element-plus'
import { ShoppingCart, CircleCheck } from '@element-plus/icons-vue'
import { categories, menuItems } from '../mock/menu'
import { useOrderStore } from '../stores/orderStore'
import type { Order } from '../types/menu'

const {
  cartItems,
  cartTotal,
  cartCount,
  orders,
  addToCart,
  removeFromCart,
  getItemQuantity,
  submitOrder
} = useOrderStore()

const activeCategory = ref(1)
const showCart = ref(false)
const showOrders = ref(false)
const showSuccess = ref(false)
const tableNumber = ref('')
const remark = ref('')
const lastOrder = ref<Order | null>(null)

const currentCategory = computed(() =>
  categories.find((c) => c.id === activeCategory.value)
)

const filteredMenu = computed(() =>
  menuItems.filter((item) => item.categoryId === activeCategory.value)
)

function handleSubmitOrder() {
  if (cartItems.value.length === 0) {
    ElMessage.warning('购物车是空的')
    return
  }
  const order = submitOrder(tableNumber.value || undefined, remark.value || undefined)
  lastOrder.value = order
  showCart.value = false
  showSuccess.value = true
  tableNumber.value = ''
  remark.value = ''
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr)
  return date.toLocaleString('zh-CN', {
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>

<style scoped>
.menu-container {
  min-height: 100vh;
  background: #f5f5f5;
  padding-bottom: 80px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 100;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  color: white;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.header h1 {
  margin: 0;
  font-size: 20px;
  font-weight: 600;
}

.content {
  display: flex;
  height: calc(100vh - 130px);
  overflow: hidden;
}

.category-sidebar {
  width: 100px;
  background: white;
  overflow-y: auto;
  border-right: 1px solid #eee;
}

.category-item {
  padding: 16px 8px;
  text-align: center;
  cursor: pointer;
  transition: all 0.2s;
  border-left: 3px solid transparent;
}

.category-item:hover {
  background: #fff5f5;
}

.category-item.active {
  background: #fff5f5;
  border-left-color: #ff6b6b;
  font-weight: 600;
}

.category-icon {
  display: block;
  font-size: 24px;
  margin-bottom: 4px;
}

.category-name {
  font-size: 13px;
  color: #333;
}

.menu-list {
  flex: 1;
  overflow-y: auto;
  padding: 16px;
}

.category-title {
  margin: 0 0 16px 0;
  font-size: 18px;
  color: #333;
}

.menu-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;
}

.menu-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
}

.menu-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
}

.menu-image {
  width: 100px;
  height: 100px;
  flex-shrink: 0;
}

.menu-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.menu-info {
  flex: 1;
  padding: 12px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.menu-name {
  margin: 0 0 4px 0;
  font-size: 16px;
  color: #333;
}

.menu-desc {
  margin: 0 0 8px 0;
  font-size: 12px;
  color: #999;
  line-height: 1.4;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.menu-bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.menu-price {
  font-size: 18px;
  font-weight: 600;
  color: #ff6b6b;
}

.quantity-control {
  display: flex;
  align-items: center;
  gap: 8px;
}

.quantity {
  min-width: 20px;
  text-align: center;
  font-size: 14px;
  font-weight: 600;
}

.cart-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 70px;
  background: white;
  border-top: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0 24px;
  box-shadow: 0 -2px 8px rgba(0, 0, 0, 0.1);
  z-index: 100;
}

.cart-icon-wrapper {
  position: relative;
  width: 50px;
  height: 50px;
  background: #333;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  margin-top: -20px;
}

.cart-icon {
  font-size: 24px;
  color: white;
}

.cart-badge {
  position: absolute;
  top: -5px;
  right: -5px;
}

.cart-info {
  flex: 1;
  margin-left: 16px;
  display: flex;
  flex-direction: column;
}

.cart-total {
  font-size: 20px;
  font-weight: 700;
  color: #ff6b6b;
}

.cart-hint {
  font-size: 12px;
  color: #999;
}

.submit-btn {
  height: 44px;
  padding: 0 32px;
  font-size: 16px;
  border-radius: 22px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border: none;
}

.cart-list {
  padding: 16px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 12px 0;
  border-bottom: 1px solid #f0f0f0;
}

.cart-item-img {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  object-fit: cover;
  margin-right: 12px;
}

.cart-item-info {
  flex: 1;
}

.cart-item-info h4 {
  margin: 0 0 4px 0;
  font-size: 15px;
}

.cart-item-price {
  margin: 0;
  color: #ff6b6b;
  font-weight: 600;
}

.order-form {
  padding: 16px 0;
}

.cart-summary {
  display: flex;
  justify-content: flex-end;
  align-items: baseline;
  gap: 8px;
  padding: 16px 0;
  font-size: 16px;
}

.total-amount {
  font-size: 24px;
  font-weight: 700;
  color: #ff6b6b;
}

.checkout-btn {
  width: 100%;
  height: 48px;
  font-size: 16px;
  background: linear-gradient(135deg, #ff6b6b, #ee5a24);
  border: none;
}

.empty-cart {
  padding: 40px 0;
}

.orders-list {
  padding: 16px;
}

.order-card {
  background: white;
  border-radius: 12px;
  padding: 16px;
  margin-bottom: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
  border: 1px solid #eee;
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
}

.order-id {
  font-size: 14px;
  color: #666;
  font-family: monospace;
}

.order-meta {
  display: flex;
  gap: 16px;
  font-size: 13px;
  color: #999;
  margin-bottom: 8px;
}

.order-remark {
  font-size: 13px;
  color: #666;
  background: #f5f5f5;
  padding: 8px 12px;
  border-radius: 6px;
  margin-bottom: 8px;
}

.order-divider {
  margin: 12px 0;
}

.order-items {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.order-item {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #333;
}

.order-total {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 16px;
  font-weight: 600;
}

.total-price {
  font-size: 20px;
  color: #ff6b6b;
}

.success-content {
  text-align: center;
  padding: 24px 0;
}

.success-icon {
  margin-bottom: 16px;
}

.success-text {
  font-size: 18px;
  font-weight: 600;
  margin: 0 0 12px 0;
}

.order-info {
  font-size: 14px;
  color: #666;
  line-height: 1.8;
  margin: 0;
}

.ml-2 {
  margin-left: 8px;
}
</style>
