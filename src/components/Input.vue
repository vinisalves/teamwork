<template>
  <div class="input-form">
    <input
      class="input"
      id="customInput"
      @input="handleInput"
      type="text"
      required
    />
    <label for="customInput">{{ label }}</label>
    <span class="border"></span>
  </div>
</template>

<script>
export default {
  name: "Input",
  props: {
    label: String
  },
  data() {
    return {
      content: this.value
    };
  },
  methods: {
    handleInput(e) {
      this.$emit("input", e.target.value);
    }
  }
};
</script>

<style>
.input-form {
  width: 100%;
  position: relative;
  margin: 10px 0;
}

.input {
  margin: 20px 0 0 0;
  padding: 5px;
  width: 100%;
  background-color: transparent;
  border: none;
  border-bottom: 3px solid rgba(0, 0, 0, 0.2);
  outline: none;

  font-size: 15px;
}

.input ~ .border {
  position: absolute;
  bottom: 0;
  left: 0;
  height: 3px;
  width: 100%;
  transform: scale(0);
  background-color: var(--secondary-color);
  transition: transform 0.2s;
}

.input:focus ~ .border {
  transform: scale(1);
}

.input ~ label {
  position: absolute;
  transform: translateY(20px);
  left: 0;
  font-size: 15px;
  color: rgba(252, 244, 255, 0.2);
  transition: transform 0.5s, color 0.5s;
  pointer-events: none;
}

.input ~ label {
  position: absolute;
  transform: translateY(20px);
  left: 0;
  font-size: 15px;
  color: black;
  transition: transform 0.5s, color 0.5s;
  pointer-events: none;
}

.input:focus ~ label,
.input:valid ~ label {
  transform: scale(0.8) translateY(0);
  color: var(--secondary-color);
}
</style>
