import Vue from "vue";
Vue.filter("formatDate", function(date, format) {
  const dateAux = Date.parse(date);
  if (!isNaN(dateAux)) {
    return new Intl.DateTimeFormat("en", format).format(dateAux);
  }
});
