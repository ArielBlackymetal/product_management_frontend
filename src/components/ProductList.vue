<template>
    <div>
      <h2>Lista de Productos</h2>
      <div>
        <input v-model="filters.name" placeholder="Buscar por nombre" />
        <input type="number" v-model.number="filters.minPrice" placeholder="Precio mínimo" />
        <input type="number" v-model.number="filters.maxPrice" placeholder="Precio máximo" />
        <select v-model="filters.category_id">
          <option value="">Todas las categorías</option>
          <option value="1">Tecnología</option>
          <option value="2">Hogar</option>
          <option value="3">Mascotas</option>
          <option value="4">Cocina</option>
        </select>
        <button @click="applyFilters">Buscar</button>
      </div>
      <ul>
        <li v-for="product in products" :key="product.id">
          {{ product.attributes.name }} - ${{ product.attributes.price }}
        </li>
      </ul>
      <button @click="prevPage" :disabled="page <= 1">Anterior</button>
      <button @click="nextPage" :disabled="page * perPage >= total">Siguiente</button>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    computed: {
      ...mapState(['products', 'total', 'page', 'perPage', 'filters'])
    },
    methods: {
      ...mapActions(['fetchProducts']),
      applyFilters() {
        this.fetchProducts();
      },
      prevPage() {
        this.$store.commit('setPage', this.page - 1);
        this.fetchProducts();
      },
      nextPage() {
        this.$store.commit('setPage', this.page + 1);
        this.fetchProducts();
      }
    },
    mounted() {
      this.fetchProducts();
    }
  };
  </script>
  
  <style>
  div {
    margin-bottom: 10px;
  }
  input, select, button {
    margin: 5px;
  }
  </style>