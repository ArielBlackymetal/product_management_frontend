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
      <table>
        <thead>
          <tr>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Precio</th>
            <th>Categoría</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in products" :key="product.id">
            <td>
              <div class="image-container">
                  <img :src="product.attributes.image" alt="Producto" class="thumbnail" />
              </div>
            </td>
            <td>{{ product.attributes.name }}</td>
            <td>{{ product.attributes.description }}</td>
            <td>${{ product.attributes.price }}</td>
            <td>{{ categories[product.attributes.category_id] || 'Desconocida' }}</td>
          </tr>
        </tbody>
      </table>
      <button @click="prevPage" :disabled="page <= 1">Anterior</button>
      <button @click="nextPage" :disabled="page * perPage >= total">Siguiente</button>
    </div>
  </template>
  
  <script>
  import { mapState, mapActions } from 'vuex';
  
  export default {
    data() {
      return {
        categories: {
          1: 'Tecnología',
          2: 'Hogar',
          3: 'Mascotas',
          4: 'Cocina'
        }
      };
    },
    computed: {
      ...mapState(['products', 'total', 'page', 'perPage', 'filters'])
    },
    methods: {
      ...mapActions(['fetchProducts']),
      applyFilters() {
        this.$store.commit('setPage', 1);
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
  table {
        width: 100%;
        border-collapse: collapse;
        font-family: Arial, sans-serif;
        background-color: #fff;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        border-radius: 8px;
        overflow: hidden;
    }

    thead {
        background-color: #6a7581;
        color: white
    }

    th {
        padding: 10px 10px;
        text-align: left;
        font-weight: bold;
    }

    td {
        padding: 2px 10px;
        border-bottom: 1px solid #ddd;
        text-align: left;
    }

    tbody tr:nth-child(odd) {
        background-color: #f9f9f9;
    }

    tbody tr:hover {
        background-color: #f1f1f1;
        transition: background-color 0.3s ease;
    }

    .image-container {
        width: 50px;
        height: 50px;
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 4px;
    }

    .thumbnail {
        width: 100%;
        height: auto;
        border-radius: 4px;
    }

    td:nth-child(4) {
        color: #28a745;
        font-weight: bold;
    }

    td:nth-child(5) {
        font-style: italic;
        color: #6c757d;
    }
  </style>