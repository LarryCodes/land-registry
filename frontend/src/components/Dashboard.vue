<template>
  <div class="container py-4">
    <div class="row">
      <div class="col">
        <h3>Portforlio Overview</h3>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col-sm-3">
        <div class="card text-dark bg-warning mb-3" style="max-width: 18rem">
          <div class="card-header">My Properties</div>
          <div class="card-body">
            <h1 class="card-title">{{ assetsCount }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card text-white bg-dark mb-3" style="max-width: 18rem">
          <div class="card-header">My Pending Property</div>
          <div class="card-body">
            <h1 class="card-title">{{ pendingCount }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
        <div class="card text-white bg-primary mb-3" style="max-width: 18rem">
          <div class="card-header">Listed Assets</div>
          <div class="card-body">
            <h1 class="card-title">{{ listedCount }}</h1>
          </div>
        </div>
      </div>
      <div class="col-sm-3">
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
import useWeb3 from "@/composables/useWeb3";
export default {
  name: "DashboardComponent",
  data() {
    return {
      assetsCount: 0,
      pendingCount: 0,
      rejectedCount: 0,
      listedCount: 0,
    };
  },
  setup() {
    const { connectMetaMask, getUserPortfolio, getListedAssets } = useWeb3();
    return {
      connectMetaMask,
      getUserPortfolio,
      getListedAssets,
    };
  },
  async mounted() {
    const assets = await this.getUserPortfolio();
    const listed_assets = await this.getListedAssets();

    this.assetsCount = assets.length;
    this.listedCount = listed_assets.length;
    assets.forEach((asset) => {
      if (asset.isGovtApproved == "pending") this.pendingCount++;
      else if (asset.isGovtApproved == "rejected") this.rejectedCount++;
    });
  },
};
</script>
