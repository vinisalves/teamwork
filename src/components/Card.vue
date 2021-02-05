<template>
  <div class="card">
    <div class="container">
      <slot name="title"></slot>
      <div class="content">
        <slot name="content"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Card"
};
</script>

<style>
.card {
  border: #222;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.6);
  padding: 10px;
}
</style>
