<template>
  <div class="container">
    <PeopleTable />
  </div>
</template>

<script>
import PeopleTable from "@/components/PeopleTable.vue";
export default {
  name: "Home",
  components: {
    PeopleTable
  }
};
</script>
