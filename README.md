# 🍽️ 餐饮点餐系统 - 前台基础版

基于 Vue 3 + TypeScript + Vite + Element Plus 开发的餐饮点餐基础前台系统。

## ✨ 功能特性

- **菜品分类浏览**：左侧分类导航，右侧菜品列表，支持6大分类（热销推荐、主食、炒菜、汤品、饮品、甜点）
- **购物车加减**：菜品卡片和购物车抽屉中均可加减数量，实时计算总价
- **提交订单**：支持填写桌号和备注，订单自动保存到本地
- **数据持久化**：购物车和订单数据使用 localStorage 存储，刷新页面不丢失
- **订单查询**：可查看历史订单列表及详情

## 🚀 启动方式

### 前置要求
- Node.js >= 18

### 安装依赖
```bash
npm install
```

### 开发模式运行
```bash
npm run dev
```
启动后访问 `http://localhost:5173`

### 构建生产版本
```bash
npm run build
```

### 预览生产构建
```bash
npm run preview
```

## 📁 项目结构

```
src/
├── types/menu.ts          # 类型定义
├── mock/menu.ts           # Mock 菜品数据
├── stores/orderStore.ts   # 订单状态管理（含 localStorage 持久化）
├── views/Menu.vue         # 主页面（菜单浏览+购物车+订单）
├── router/index.ts        # 路由配置
├── App.vue                # 根组件
├── main.ts                # 入口文件
└── style.css              # 全局样式
```

## 🔧 数据持久化说明

系统使用两个 localStorage key 存储数据：

- `restaurant_cart` - 购物车数据
- `restaurant_orders` - 历史订单数据

**验证刷新后订单不丢失的方法**：
1. 启动应用 `npm run dev`
2. 添加几个菜品到购物车
3. 填写桌号（如 A1）和备注，提交订单
4. 点击右上角「我的订单」查看订单是否存在
5. **刷新浏览器页面**（F5 或 Cmd+R）
6. 再次点击「我的订单」，确认订单仍然存在
7. 也可以在浏览器开发者工具 → Application → Local Storage 中查看数据

## 🛠️ 技术栈

- Vue 3 (Composition API + `<script setup>`)
- TypeScript
- Vite
- Element Plus (UI 组件库)
- Vue Router
- localStorage (数据持久化)

## ⏭️ 后续可扩展功能（暂未实现）

- 支付模块
- 后厨订单管理
- 会员系统
- 后端 API 对接
- 多终端适配
