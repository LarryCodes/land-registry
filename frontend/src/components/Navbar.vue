<template>
  <nav class="navbar navbar-expand-lg fixed-top navbar-dark bg-dark">
    <div class="container-fluid">
      <router-link
        class="navbar-brand"
        :to="{ name: 'admin.dashboard' }"
        v-if="$store.state.metaMaskConnection && $store.state.isAdmin"
      >
        Land Registry Admin
      </router-link>
      <router-link class="navbar-brand" :to="{ name: 'home' }" v-else>
        Land Registry
      </router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul
          class="navbar-nav me-auto mb-2 mb-lg-0"
          v-if="$store.state.metaMaskConnection && $store.state.isAdmin"
        >
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $store.state.activeArea == 'admin.dashboard' }"
              :to="{ name: 'admin.dashboard' }"
            >
              Dashboard
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $store.state.activeArea == 'admin.assets' }"
              :to="{ name: 'admin.assets' }"
            >
              List Assets
            </router-link>
          </li>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $store.state.activeArea == 'admin.users' }"
              :to="{ name: 'admin.assets' }"
            >
              List Users
            </router-link>
          </li>
        </ul>
        <ul class="navbar-nav me-auto mb-2 mb-lg-0" v-else>
          <li class="nav-item">
            <router-link
              class="nav-link"
              :class="{ active: $store.state.activeArea == 'home' }"
              :to="{ name: 'home' }"
            >
              Home
            </router-link>
          </li>
          <li
            class="nav-item"
            :class="{ active: $store.state.activeArea == 'assets' }"
            v-if="
              $store.state.metaMaskConnection && $store.state.userDetails.exists
            "
          >
            <router-link class="nav-link" :to="{ name: 'assets' }">
              My Assets
            </router-link>
          </li>
          <li
            class="nav-item"
            :class="{ active: $store.state.activeArea == 'listing' }"
            v-if="
              $store.state.metaMaskConnection && $store.state.userDetails.exists
            "
          >
            <router-link class="nav-link" :to="{ name: 'listing' }">
              Property Listing
            </router-link>
          </li>
        </ul>
        <form class="d-flex">
          <template v-if="$store.state.metaMaskConnection">
            <button
              class="btn btn-success"
              v-if="$store.state.userDetails.exists"
            >
              {{ $store.state.userDetails.fullname }}
            </button>
            <button class="btn btn-secondary" v-else disabled>Connected</button>
          </template>
          <button
            class="btn btn-warning"
            @click.prevent="connectMetaMask()"
            v-else
          >
            Connect MetaMask
          </button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
import useWeb3 from "@/composables/useWeb3";
export default {
  name: "NavBar",
  setup() {
    const { connectMetaMask } = useWeb3();
    return {
      connectMetaMask,
    };
  },
};
</script>
