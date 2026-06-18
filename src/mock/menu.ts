import type { Category, MenuItem } from '../types/menu'

export const categories: Category[] = [
  { id: 1, name: '热销推荐', icon: '🔥' },
  { id: 2, name: '主食', icon: '🍚' },
  { id: 3, name: '炒菜', icon: '🥬' },
  { id: 4, name: '汤品', icon: '🍲' },
  { id: 5, name: '饮品', icon: '🥤' },
  { id: 6, name: '甜点', icon: '🍰' }
]

export const menuItems: MenuItem[] = [
  {
    id: 1,
    name: '招牌红烧肉',
    categoryId: 1,
    price: 48,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=delicious%20braised%20pork%20belly%20chinese%20food%20on%20white%20plate&image_size=square',
    description: '肥而不腻，入口即化，招牌必点'
  },
  {
    id: 2,
    name: '宫保鸡丁',
    categoryId: 1,
    price: 38,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=kung%20pao%20chicken%20with%20peanuts%20chinese%20cuisine&image_size=square',
    description: '经典川菜，麻辣鲜香'
  },
  {
    id: 3,
    name: '白米饭',
    categoryId: 2,
    price: 3,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=bowl%20of%20steamed%20white%20rice%20japanese%20style&image_size=square',
    description: '优质东北大米，香糯可口'
  },
  {
    id: 4,
    name: '牛肉面',
    categoryId: 2,
    price: 28,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=beef%20noodle%20soup%20chinese%20lanzhou%20style&image_size=square',
    description: '手工拉面，大块牛肉'
  },
  {
    id: 5,
    name: '蛋炒饭',
    categoryId: 2,
    price: 18,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20egg%20fried%20rice%20with%20vegetables&image_size=square',
    description: '粒粒分明，蛋香四溢'
  },
  {
    id: 6,
    name: '麻婆豆腐',
    categoryId: 3,
    price: 22,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mapo%20tofu%20sichuan%20spicy%20dish&image_size=square',
    description: '麻辣鲜香，豆腐嫩滑'
  },
  {
    id: 7,
    name: '清炒时蔬',
    categoryId: 3,
    price: 18,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=stir%20fried%20green%20vegetables%20healthy%20chinese%20food&image_size=square',
    description: '新鲜时令蔬菜，清淡爽口'
  },
  {
    id: 8,
    name: '糖醋里脊',
    categoryId: 3,
    price: 36,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=sweet%20and%20sour%20pork%20chinese%20food%20crispy&image_size=square',
    description: '外酥里嫩，酸甜可口'
  },
  {
    id: 9,
    name: '西红柿鸡蛋汤',
    categoryId: 4,
    price: 12,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tomato%20egg%20soup%20chinese%20home%20style&image_size=square',
    description: '家常美味，营养丰富'
  },
  {
    id: 10,
    name: '紫菜蛋花汤',
    categoryId: 4,
    price: 10,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=seaweed%20egg%20drop%20soup%20chinese&image_size=square',
    description: '清淡鲜美，开胃解腻'
  },
  {
    id: 11,
    name: '酸辣汤',
    categoryId: 4,
    price: 15,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=hot%20and%20sour%20soup%20chinese%20cuisine&image_size=square',
    description: '酸辣开胃，暖身暖胃'
  },
  {
    id: 12,
    name: '冰镇可乐',
    categoryId: 5,
    price: 6,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=glass%20of%20cola%20with%20ice%20cubes%20and%20lemon&image_size=square',
    description: '冰爽解渴，经典口味'
  },
  {
    id: 13,
    name: '鲜榨橙汁',
    categoryId: 5,
    price: 15,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=fresh%20orange%20juice%20in%20glass%20with%20orange%20slices&image_size=square',
    description: '100%鲜榨，维C满满'
  },
  {
    id: 14,
    name: '柠檬蜂蜜茶',
    categoryId: 5,
    price: 12,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=honey%20lemon%20tea%20in%20glass%20cup&image_size=square',
    description: '酸甜可口，润喉养颜'
  },
  {
    id: 15,
    name: '芒果布丁',
    categoryId: 6,
    price: 16,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=mango%20pudding%20dessert%20in%20glass%20cup&image_size=square',
    description: '香甜芒果，丝滑布丁'
  },
  {
    id: 16,
    name: '提拉米苏',
    categoryId: 6,
    price: 28,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=tiramisu%20italian%20dessert%20on%20plate&image_size=square',
    description: '意式经典，咖啡香浓'
  },
  {
    id: 17,
    name: '双皮奶',
    categoryId: 6,
    price: 12,
    image: 'https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=chinese%20double%20skin%20milk%20pudding%20dessert&image_size=square',
    description: '粤式甜品，奶香浓郁'
  }
]
