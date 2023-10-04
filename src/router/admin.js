export default {
  path: "/admin",
  name: "admin",
  component: () => {
    return import("@/views/admin/Admin.vue");
  },
  children: [
    {
      path: "/products",
      name: "products",
      component: () => {
        return import("@/views/admin/Products.vue");
      },
    },
    {
      path: "/single_product/:id",
      name: "single_product",
      meta: {
        child: "product_lists",
      },
      component: () => {
        return import("@/views/admin/SingleProduct.vue");
      },
    },
  ],
};
