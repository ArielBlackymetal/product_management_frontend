<template>
  <div>
    <h1>Gestión de Productos</h1>
    <button @click="showModal = true">Agregar Producto</button>
    <ProductList />
    <div v-if="showModal" class="modal">
      <div class="modal-content">
        <span class="close" @click="showModal = false">&times;</span>
        <ProductForm @closeModal="showModal = false" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';
import ProductForm from './components/ProductForm.vue';

export default {
  components: {
    ProductList,
    ProductForm
  },
  data() {
    return {
      showModal: false
    };
  }
};
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 20px;
  padding: 0;
  background-color: #f4f4f4;
}
h1 {
  text-align: center;
}
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal-content {
  background: white;
  padding: 20px;
  border-radius: 5px;
  position: relative;
}
.close {
  position: absolute;
  top: 10px;
  right: 15px;
  font-size: 20px;
  cursor: pointer;
}
.error-message {
  color: red;
  margin-top: 10px;
}
</style>