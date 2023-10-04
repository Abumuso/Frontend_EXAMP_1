export default {
  path: "/superadmin",
  name: "superadmin",
  component: () => {
    return import("@/views/superAdmin/SuperAdmin.vue");
  },
  children: [
    {
      path: "/users",
      name: "users",
      component: () => {
        return import("@/views/superAdmin/Users.vue");
      },
    },
  ],
};
