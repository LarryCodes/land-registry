<template>
  <div class="container py-4">
    <div class="row">
      <div class="col">
        <h3>Portforlio Overview</h3>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <div class="card text-dark bg-warning mb-3" style="max-width: 18rem">
          <div class="card-header">Registered Properties</div>
          <div class="card-body">
            <h1 class="card-title">{{ propertiesCount }}</h1>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card text-white bg-dark mb-3" style="max-width: 18rem">
          <div class="card-header">Pending Property</div>
          <div class="card-body">
            <h1 class="card-title">{{ pendingCount }}</h1>
          </div>
        </div>
      </div>
      <div class="col">
        <div class="card text-white bg-danger mb-3" style="max-width: 18rem">
          <div class="card-header">Rejected Property</div>
          <div class="card-body">
            <h1 class="card-title">{{ rejectedCount }}</h1>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src
import useWeb3 from "@/composables/useWeb3";
export default {
  name: "AdminHomeView",
  data() {
    return {
      propertiesCount: 0,
      pendingCount: 0,
      rejectedCount: 0,
    };
  },
  setup() {
    const { connectMetaMask, getAllAssets } = useWeb3();
    return {
      connectMetaMask,
      getAllAssets,
    };
  },
  async mounted() {
    const properties = await this.getAllAssets();
    this.propertiesCount = properties.length;
    properties.forEach((asset) => {
      if (asset.isGovtApproved == "pending") this.pendingCount++;
      else if (asset.isGovtApproved == "rejected") this.rejectedCount++;
    });
  },
};
</script>
