<template>
    <div>
      <h2>Agregar Producto</h2>
      <form @submit.prevent="submitProduct">
        <input v-model="product.name" placeholder="Nombre" required />
        <input type="file" @change="handleFileUpload" />
        <input v-model="product.description" placeholder="Descripción" required />
        <input type="number" v-model.number="product.price" placeholder="Precio" required />
        <select v-model="product.category_id" required>
          <option value="1">Tecnología</option>
          <option value="2">Hogar</option>
          <option value="3">Mascotas</option>
          <option value="4">Cocina</option>
        </select>
        <button type="submit">Agregar</button>
      </form>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    </div>
  </template>
  
  <script>
  import { mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        product: {
          name: '',
          image: null,
          description: '',
          price: null,
          category_id: ''
        },
        errorMessage: ''
      };
    },
    methods: {
      ...mapActions(['addProduct']),
      handleFileUpload(event) {
        this.product.image = event.target.files[0];
      },
      async submitProduct() {
        try {
          await this.addProduct(this.product);
          this.$emit('closeModal');
          this.product = { name: '', image: null, description: '', price: null, category_id: '' };
          this.errorMessage = '';
        } catch (error) {
          this.errorMessage = error.response?.data?.message || 'Error al agregar el producto';
        }
      }
    }
  };
  </script>
  
  <style>
  form {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  </style>