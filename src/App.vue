<template>
  <div id="app">
    <Loader />
    <router-view />
  </div>
</template>
<script>
import Loader from "@/components/Loader.vue";
export default {
  components: {
    Loader
  }
};
</script>
<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@100;300;500;700&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
html,
body {
  font-weight: 300;
  font-size: 15px;
  font-family: "Poppins", sans-serif;
}

h1 {
  font-size: 140%;
  word-spacing: 4px;
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: 1px;
  font-weight: 700;
}
h2 {
  font-size: 120%;
  word-spacing: 4px;
  text-align: center;
  margin-bottom: 30px;
  letter-spacing: 1px;
  font-weight: 300;
}
a {
  text-decoration: none;
  margin: 5px 30px;
  cursor: pointer;
  color: var(--secondary-color);
  font-weight: 700;
}
:root {
  --primary-color: #fff;
  --secondary-color: #ff22b1;
}

.container {
  margin: 10px 20px;
}
.text-center {
  text-align: center;
}

.text-bold {
  font-weight: 700;
}
</style>
