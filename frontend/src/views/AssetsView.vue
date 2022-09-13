<template>
  <div class="container py-4">
    <div class="row">
      <div class="col">
        <h3>My Assets</h3>
        <router-link class="btn btn-primary" :to="{ name: 'register-asset' }">
          Register Land
        </router-link>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <table class="table table-success table-striped-columns table-hover">
          <thead>
            <tr>
              <th scope="col">Key</th>
              <th scope="col">District</th>
              <th scope="col">County</th>
              <th scope="col">SubCounty</th>
              <th scope="col">Parish</th>
              <th scope="col">Village</th>
              <th scope="col">Survey Code/ Number</th>
              <th scope="col">Status</th>
              <th scope="col">For Sale</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="asset in assetsList" :key="asset.key">
              <th scope="row">{{ asset.key }}</th>
              <td>{{ asset.district }}</td>
              <td>{{ asset.county }}</td>
              <td>{{ asset.subcounty }}</td>
              <td>{{ asset.parish }}</td>
              <td>{{ asset.village }}</td>
              <td>{{ asset.surveyCode }}</td>
              <td>
                <span
                  class="badge text-bg-secondary"
                  v-if="asset.approved == 'pending'"
                >
                  Pending...
                </span>
                <span
                  class="badge text-bg-danger"
                  v-if="asset.approved == 'rejected'"
                >
                  Rejected
                </span>
                <span
                  class="badge text-bg-success"
                  v-if="asset.approved == 'approved'"
                >
                  Approved
                </span>
              </td>
              <td>
                <span
                  class="badge text-bg-danger"
                  v-if="
                    asset.approved == 'rejected' || asset.approved == 'pending'
                  "
                >
                  N/A
                </span>
                <span
                  class="badge text-bg-secondary"
                  v-else-if="asset.approved == 'approved' && !asset.isAvailable"
                >
                  Not Listed
                </span>
                <span
                  class="badge text-bg-success"
                  v-else-if="asset.approved == 'approved' && asset.isAvailable"
                >
                  Listed
                </span>
              </td>
              <td>
                <div class="dropdown" v-if="asset.approved == 'approved'">
                  <button
                    class="btn btn-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Actions
                  </button>
                  <ul class="dropdown-menu">
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="listAsset(asset.key)"
                        v-if="!asset.isAvailable"
                      >
                        List Property
                      </a>
                      <a
                        class="dropdown-item"
                        href="#"
                        @click.prevent="unListAsset(asset.key)"
                        v-else
                      >
                        Remove Listing
                      </a>
                    </li>
                    <li>
                      <a
                        class="dropdown-item"
                        href="#"
                        :disabled="!asset.isAvailable"
                      >
                        View Bids
                      </a>
                    </li>
                  </ul>
                </div>
                <button type="button" class="btn btn-secondary" v-else disabled>
                  Actions
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
    <div class="toast-container position-fixed bottom-0 end-0 p-3">
      <div
        id="successToast"
        class="toast text-bg-success"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong class="me-auto">Success</strong>
          <small>Just now</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">Property updated successfully!</div>
      </div>
      <div
        id="errorToast"
        class="toast text-bg-danger"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="toast-header">
          <strong class="me-auto">Error</strong>
          <small>Just now</small>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
        <div class="toast-body">
          Something went wrong. Failed to add property!Seems like same property
          has been added before.
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import useWeb3 from "@/composables/useWeb3";
import bootstrap from "bootstrap/dist/js/bootstrap.min.js";
export default {
  name: "AssetsView",
  data() {
    return {
      assetsList: [],
    };
  },
  setup() {
    const { getUserPortfolio, listProperty, unListProperty } = useWeb3();
    return {
      getUserPortfolio,
      listProperty,
      unListProperty,
    };
  },
  methods: {
    async listAsset(key) {
      const result = await this.listProperty(key);
      if (result) {
        const index = this.assetsList
          .map((asset) => {
            return asset.key;
          })
          .indexOf(key);
        this.assetsList[index].isAvailable = true;

        const successToast = document.getElementById("successToast");
        const toast = new bootstrap.Toast(successToast);
        toast.show();
      } else {
        const errorToast = document.getElementById("errorToast");
        const toast = new bootstrap.Toast(errorToast);
        toast.show();
      }
    },
    async unListAsset(key) {
      const result = await this.unListProperty(key);
      if (result) {
        const index = this.assetsList
          .map((asset) => {
            return asset.key;
          })
          .indexOf(key);
        this.assetsList[index].isAvailable = false;

        const successToast = document.getElementById("successToast");
        const toast = new bootstrap.Toast(successToast);
        toast.show();
      } else {
        const errorToast = document.getElementById("errorToast");
        const toast = new bootstrap.Toast(errorToast);
        toast.show();
      }
    },
  },
  async mounted() {
    const portfolio = await this.getUserPortfolio();
    if (portfolio) {
      portfolio.forEach((asset) => {
        this.assetsList.push({
          owner: asset.id,
          district: asset.district,
          county: asset.county,
          subcounty: asset.subcounty,
          parish: asset.parish,
          village: asset.village,
          surveyCode: asset.survey_code,
          isAvailable: asset.isAvailable,
          approved: asset.isGovtApproved,
          key: asset.key.toString(),
        });
      });
    }
  },
};
</script>
