<template>
  <transition name="fade">
    <div class="overlay" v-show="showDialog">
      <transition name="popup">
        <slot></slot>
      </transition>
    </div>
  </transition>
</template>

<script>
export default {
  name: "Dialog",
  props: {
    showDialog: Boolean
  }
};
</script>

<style>
.overlay {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  overflow: hidden;
  z-index: 9999;
}
.popup-enter-active {
  animation: popup 0.2s linear;
}
.popup-leave-active {
  animation: popup 0.2s reverse;
}
@keyframes popup {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}

.fade-enter-active {
  animation: fade-in 0.1s linear;
}
.fade-leave-active {
  animation: fade-in 0.1s reverse;
  animation-delay: 0.3s;
}
@keyframes fade-in {
  0% {
    transform: scale(1);
  }
}
</style>
