<template>
  <div>
    <a class="btn" @click="handleClick"><i :class="icon"></i> </a>
  </div>
</template>

<script>
export default {
  name: "Button",
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  methods: {
    handleClick() {
      this.$emit("click");
    }
  }
};
</script>

<style>
.btn {
  text-decoration: none;
  color: #fff;
  background-color: var(--secondary-color);
  text-align: center;
  display: inline-block;
  line-height: 2em;
  width: 34px;
  height: 34px;
  border-radius: 50%;
  font-size: 120%;
  box-shadow: 2px 3px 2px rgba(0, 0, 0, 0.6);
  transition: transform 0.2s;
  opacity: 0.8;
  cursor: pointer;
}
.btn:hover {
  transform: scale(1.3);
  opacity: 1;
}
</style>
