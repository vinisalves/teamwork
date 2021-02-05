<template>
  <div>
    <Card>
      <template #title>
        <div class="header">
          <div>
            <h2>People</h2>
          </div>
          <div class="form">
            <Input
              v-model="personName"
              @keyup.enter.native="getPeople(`?search=${personName}`)"
              label="Search by Name"
            />
            <div>
              <Button
                icon="fas fa-search"
                @click="getPeople(`?search=${personName}`)"
              />
            </div>
          </div>
        </div>
      </template>
      <template #content>
        <table class="table">
          <thead>
            <tr>
              <th
                v-for="item of headers"
                :key="item.id"
                @click="sort(item)"
                class="th-header"
              >
                {{ item.text }}
                <i
                  v-show="item.sort && !item.reverse"
                  class="fas fa-arrow-up"
                ></i>
                <i v-show="item.reverse" class="fas fa-arrow-down"></i>
              </th>
            </tr>
          </thead>
          <tr v-if="people.length === 0">
            <td colspan="6" class="no-results text-center">
              No results for you search
            </td>
          </tr>
          <tr v-for="person of people" :key="person.url" class="tr">
            <td>
              {{ person.name }}
            </td>
            <td class="text-center">
              {{ person.height }}
            </td>
            <td class="text-center">
              {{ person.mass }}
            </td>
            <td class="text-center">
              {{ person.created | formatDate }}
            </td>
            <td class="text-center">
              {{ person.edited | formatDate }}
            </td>
            <td>
              <a @click="openDialogPlanet(person.homeworld)">
                {{ person.planetName }}</a
              >
            </td>
          </tr>
        </table>

        <div class="footer">
          <a
            @click="getPeople(previousPage)"
            :class="!previousPage ? 'disabled' : ''"
            ><i class="fas fa-arrow-left"></i
          ></a>
          <span>{{ currentPage }} / {{ totalPages }}</span>
          <a @click="getPeople(nextPage)" :class="!nextPage ? 'disabled' : ''"
            ><i class="fas fa-arrow-right"></i
          ></a>
        </div>
      </template>
    </Card>
    <DialogPlanet
      :showDialog="showDialogPlanet"
      :planet="dialogPlanet"
      @close="closeDialogPlanet"
    />
  </div>
</template>

<script>
import Card from "@/components/Card.vue";
import Button from "@/components/Button.vue";
import Input from "@/components/Input.vue";
import DialogPlanet from "@/components/DialogPlanet.vue";
export default {
  name: "PeopleTable",
  components: {
    Card,
    Button,
    Input,
    DialogPlanet
  },
  data() {
    return {
      people: [],
      planets: [],
      nextPage: null,
      previousPage: null,
      currentPage: 1,
      totalPages: 0,
      rowsPerPage: 10,
      personName: "",
      showDialogPlanet: false,
      dialogPlanet: {},
      currentSortColumn: null,
      headers: [
        {
          id: 1,
          text: "Name",
          value: "name",
          type: "string",
          sort: false,
          reverse: false
        },
        {
          id: 2,
          text: "Height",
          value: "height",
          type: "number",
          sort: false,
          reverse: false
        },
        {
          id: 3,
          text: "Mass",
          value: "mass",
          type: "number",
          sort: false,
          reverse: false
        },
        {
          id: 4,
          text: "Created",
          value: "created",
          type: "date",
          sort: false,
          reverse: false
        },
        {
          id: 5,
          text: "Edited",
          value: "edited",
          type: "date",
          sort: false,
          reverse: false
        },
        {
          id: 6,
          text: "Planet Name",
          value: "planetName",
          type: "string",
          sort: false,
          reverse: false
        }
      ]
    };
  },
  mounted() {
    this.getPeople();
  },
  methods: {
    async getPeople(peopleUrl) {
      this.$store.commit("setAppLoading", true);
      this.getPageNumber(peopleUrl);
      this.people = [];
      await this.$axios
        .get(peopleUrl)
        .then(async response => {
          const people = response.data.results;
          this.nextPage = response.data.next;
          this.previousPage = response.data.previous;
          this.totalPages = Math.ceil(response.data.count / this.rowsPerPage);

          for (const person of people) {
            const planet = await this.getPlanet(person.homeworld);
            person.planetName = planet.name;
            this.people.push(person);
          }
        })
        .catch(() => {
          alert("Could not query data");
        });
      this.$store.commit("setAppLoading", false);
    },
    async getPlanet(planetUrl) {
      // avoid redundant requests
      const planetCached = this.checkPlanet(planetUrl);
      if (planetCached !== undefined) return planetCached;

      return await this.$axios.get(planetUrl).then(response => {
        const planet = response.data;
        this.planets.push(planet);
        return planet;
      });
    },
    checkPlanet(planetUrl) {
      return this.planets.find(planet => planet.url === planetUrl);
    },
    getPageNumber(peopleUrl) {
      if (!peopleUrl) return 1;

      let pageNumber = parseInt(peopleUrl.replace(/[^\d]/g, ""));
      this.currentPage = pageNumber > 0 ? pageNumber : 1;
    },
    async openDialogPlanet(planetUrl) {
      this.dialogPlanet = await this.getPlanet(planetUrl);
      this.showDialogPlanet = true;
    },
    closeDialogPlanet() {
      this.showDialogPlanet = false;
      this.dialogPlanet = {};
    },
    sort(item) {
      this.headers.forEach(header => {
        if (header.id !== item.id) {
          header.sort = false;
          header.reverse = false;
        }
      });
      if (item.sort) item.reverse = !item.reverse;
      if (item.type === "string") {
        this.people = this.sortString(item.value);
      }
      if (item.type === "number") {
        this.people = this.sortNumber(item.value);
      }
      if (item.type === "date") {
        this.people = this.sortDate(item.value);
      }
      if (item.reverse) {
        this.people = this.people.reverse();
      }
      item.sort = true;
    },
    sortString(field) {
      return this.people.sort((a, b) =>
        a[field].toLowerCase().localeCompare(b[field].toLowerCase())
      );
    },
    sortNumber(field) {
      return this.people.sort(
        (a, b) => parseFloat(a[field]) - parseFloat(b[field])
      );
    },
    sortDate(field) {
      return this.people.sort(
        (a, b) => new Date(a[field]) - new Date(b[field])
      );
    }
  }
};
</script>

<style>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.form {
  flex: 0 0 30%;
  display: flex;
  align-items: center;
}
.table {
  width: 100%;
  min-height: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}
.th-header {
  cursor: pointer;
}
.tr td {
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  padding: 10px 20px;
}
.tr:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
.footer {
  display: flex;
  justify-content: center;
  align-items: center;
}

.disabled {
  display: none;
}
.no-results {
  padding: 30px;
}
</style>
