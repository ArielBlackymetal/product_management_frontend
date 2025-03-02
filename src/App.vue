<template>
  <div>
    <h1>Gestión de Productos</h1>
    <ProductList />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue';

export default {
  components: {
    ProductList
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
</style>