/* global Vue */
/* eslint-disable no-new */

new Vue({
  el: '#app',
  data: {
    products: [{
        id: 1586934917210,
        unit: '台',
        category: '掌上主機',
        title: 'Switch',
        origin_price: 20000,
        price: 9980,
        description: '想玩就玩',
        content: '動森太好玩惹',
        is_enabled: 1,
        imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      },
      {
        id: 1196934917910,
        unit: '台',
        category: '主機',
        title: 'PS5 Wifi',
        origin_price: 29999,
        description: '次世代超強規格',
        content: '我也想要換一台 PS5 Wifi',
        price: 9487,
        is_enabled: 0,
        imageUrl: 'https://images.unsplash.com/photo-1592107761705-30a1bbc641e7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80',
      },
    ],
    tempProduct: {},
  },
  methods: {
    // 彈出畫面並將資料塞入 tempProduct
    openModal(isNew, item) {
      switch (isNew) {
        case 'new':
          this.tempProduct = {};
          $('#addProductModal').modal('show');
          break;

        case 'edit':
          this.tempProduct = Object.assign({}, item);
          $('#updateProductModal').modal('show');
          break;

        case 'delete':
          $('#delProductModal').modal('show');
          this.tempProduct = Object.assign({}, item);
          break;

        default:
          break;
      }
    },
    // 新增
    addProduct() {
      // 生成 key
      // Unix Timestamp 可返回 1970/01/01 至今的毫秒數
      const id = new Date().getTime();
      this.tempProduct.id = id;
      // Vue 可觀察到 Array.prototype.push()
      this.products.push(this.tempProduct);

      this.tempProduct = {};
      $('#addProductModal').modal('hide');
    },
    // 編輯
    updateProduct() {
      const id = this.tempProduct.id;
      this.products.forEach((item, i) => {
        if (item.id === id) {
          this.products[i] = this.tempProduct;
        }
      });

      this.tempProduct = {};
      $('#updateProductModal').modal('hide');
    },
    // 刪除
    delProduct() {
      if (this.tempProduct.id) {
        const id = this.tempProduct.id;
        this.products.forEach((item, i) => {
          if (item.id === id) {
            // Vue 可觀察到 Array.prototype.slice()
            // 將第 i 個以空白覆蓋 移除
            this.products.splice(i, 1);
            this.tempProduct = {};
          }
        });
      }
      $('#delProductModal').modal('hide');
    },
  },
});

// 為什麼畫面沒有隨資料更新 - Vue 響應式原理（Reactivity）
// https://pjchender.blogspot.com/2017/05/vue-vue-reactivity.html
// 使用 Vue 可觀察到的陣列方法
// 在 Vue 中包含一組可以觀察陣列的方法，而這些方法將能促使畫面重新渲染。
// 這些方法包含：push()、pop()、shift()、unshift()、splice()、sort()、reverse()。