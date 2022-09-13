<template>
  <div class="home">
    <div class="container py-4" v-if="!$store.state.metaMaskConnection">
      <div class="p-5 mb-4 bg-light rounded-3">
        <div class="container-fluid py-5">
          <h1 class="display-5 fw-bold">Blockchain Land Registry</h1>
          <p class="col-md-8 fs-4">
            View your property, list for sale, get approved by government agency
            with minimal effort, submit bids to purcahse new property, transfer
            property to other users, approve bids and get paid, withdraw funds
            to your wallet address and purchase more land. Connect your metamask
            wallet to get started.
          </p>
          <button
            class="btn btn-outline-warning"
            @click.prevent="connectMetaMask()"
          >
            Connect MetaMask
          </button>
        </div>
      </div>

      <div class="row align-items-md-stretch">
        <div class="col-md-6">
          <div class="h-100 p-5 text-bg-dark rounded-3">
            <h2>Change the background</h2>
            <p>
              Swap the background-color utility and add a `.text-*` color
              utility to mix up the jumbotron look. Then, mix and match with
              additional component themes and more.
            </p>
            <button class="btn btn-outline-light" type="button">
              Example button
            </button>
          </div>
        </div>
        <div class="col-md-6">
          <div class="h-100 p-5 bg-light border rounded-3">
            <h2>Add borders</h2>
            <p>
              Or, keep it light and add a border for some added definition to
              the boundaries of your content. Be sure to look under the hood at
              the source HTML here as we've adjusted the alignment and sizing of
              both column's content for equal-height.
            </p>
            <button class="btn btn-outline-secondary" type="button">
              Example button
            </button>
          </div>
        </div>
      </div>
      <footer class="pt-3 mt-4 text-muted border-top">© 2022</footer>
    </div>
    <div class="container py-4" v-else>
      <DashboardComponent v-if="$store.state.userDetails.exists" />
      <RegisterComponent v-else />
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import useWeb3 from "@/composables/useWeb3";
import RegisterComponent from "@/components/Register.vue";
import DashboardComponent from "@/components/Dashboard.vue";
export default {
  name: "HomeView",
  setup() {
    const { connectMetaMask } = useWeb3();
    return {
      connectMetaMask,
    };
  },
  components: {
    RegisterComponent,
    DashboardComponent,
  },
  mounted() {
    // await this.connectMetaMask();
  },
};
</script>
