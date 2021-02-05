<template>
  <Dialog :showDialog="showDialog">
    <Card v-if="showDialog" class="planet-card">
      <template #title>
        <h1 class="title">Planet Detail</h1>
      </template>
      <template #content>
        <div class="row">
          <span class="text-bold">Name:</span>{{ planet.name }}
        </div>
        <div class="row">
          <span class="text-bold">Diameter:</span>
          {{ planet.diameter }}
        </div>

        <div class="row">
          <span class="text-bold">Climate:</span>
          {{ planet.climate }}
        </div>

        <div class="row">
          <span class="text-bold">Population:</span>
          <span>{{ planet.population }}</span>
        </div>
        <div class="actions">
          <div>
            <a @click="closeDialog" class="btn-dismiss">Dismiss</a>
          </div>
        </div>
      </template>
    </Card>
  </Dialog>
</template>

<script>
import Dialog from "@/components/Dialog.vue";
import Card from "@/components/Card.vue";
export default {
  name: "DialogPlanet",
  components: {
    Dialog,
    Card
  },
  props: {
    showDialog: Boolean,
    planet: Object
  },

  methods: {
    closeDialog() {
      this.$emit("close");
    }
  }
};
</script>

<style>
.title {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.planet-card {
  min-width: 400px;
}
.row {
  margin: 14px;
  width: 100%;
  display: flex;
  margin-left: 50px;
}

.row span:first-child {
  flex: 0 0 120px;
  margin-right: 10px;
}
.actions {
  display: flex;
  justify-content: flex-end;
  border-top: 1px solid rgba(0, 0, 0, 0.2);
}

.btn-dismiss {
  border: 1px solid var(--secondary-color);
  padding: 8px;
  margin: 10px 0;
  display: inline-block;
  line-height: 1.5em;
  border-radius: 8px;
  transition: all 0.2s;
}
.btn-dismiss:hover {
  background-color: var(--secondary-color);
  color: white;
}
</style>
