import { store } from "@/store";
import useWeb3 from "@/composables/useWeb3";
import { createRouter, createWebHistory } from "vue-router";
import HomeView from "@/views/HomeView.vue";
import AssetsView from "@/views/AssetsView.vue";
import ListingView from "@/views/ListingView.vue";
import AssetsRegisterView from "@/views/AssetsRegisterView.vue";

import AdminHomeView from "@/views/admin/HomeView.vue";
import AdminAssetsView from "@/views/admin/AssetsView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/assets",
    name: "assets",
    component: AssetsView,
  },
  {
    path: "/assets/register",
    name: "register-asset",
    component: AssetsRegisterView,
  },
  {
    path: "/listing",
    name: "listing",
    component: ListingView,
  },
  {
    path: "/admin",
    name: "admin.dashboard",
    component: AdminHomeView,
  },
  {
    path: "/admin/assets",
    name: "admin.assets",
    component: AdminAssetsView,
  },
];

const protectedRoutes = ["assets", "listing", "register-asset"];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach(async (to, from, next) => {
  // First set active area for navigation
  store.commit("setActiveArea", to.name);

  // Check if auth is required
  const authRequired =
    protectedRoutes.includes(to.name) || to.path.startsWith("/admin");

  if (!authRequired) return next();

  // If trying to access admin route, don't check if details exist.
  if (to.path.startsWith("/admin")) {
    const { isAdmin, connectMetaMask } = useWeb3();
    // Check if metamask is connect and if not create connection, and check for admin level access.
    if (!store.state.metaMaskConnection && !(await connectMetaMask()))
      return next({ name: "home" });

    const result = await isAdmin();
    if (!result) return next({ name: "home" });

    store.commit("hasAdminAccess", true);
    return next();
  }

  if (store.state.metaMaskConnection && store.state.userDetails.exists) {
    return next();
  }

  return next({ name: "home" });
});

export default router;
