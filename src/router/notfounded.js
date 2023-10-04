export default {
  path: "/notfound",
  name: "404",
  component: () => {
    return import("@/views/404/PageNotFounded.vue");
  },
};
