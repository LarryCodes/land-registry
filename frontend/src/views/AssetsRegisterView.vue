<template>
  <div class="container py-4">
    <div class="row">
      <div class="col">
        <h3>Register Land</h3>
        <router-link class="btn btn-primary" :to="{ name: 'assets' }">
          Back to Assets
        </router-link>
        <hr />
      </div>
    </div>
    <div class="row">
      <div class="col">
        <form @submit.prevent="register">
          <div class="row">
            <div class="col-sm-6 mt-2">
              <div class="form-group">
                <label for="district">District</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.district.status }"
                  id="district"
                  placeholder="Enter District"
                  v-model="input.district"
                />
                <div
                  class="invalid-feedback"
                  v-if="validationErrors.district.status"
                >
                  {{ validationErrors.district.msg }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 mt-2">
              <div class="form-group">
                <label for="county">County</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.county.status }"
                  id="county"
                  placeholder="Enter county"
                  v-model="input.county"
                />
                <div
                  class="invalid-feedback"
                  v-if="validationErrors.county.status"
                >
                  {{ validationErrors.county.msg }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 mt-2">
              <div class="form-group">
                <label for="sub-county">Sub-county</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.subCounty.status }"
                  id="sub-county"
                  placeholder="Sub County"
                  v-model="input.subCounty"
                />
                <div
                  class="invalid-feedback"
                  v-if="validationErrors.subCounty.status"
                >
                  {{ validationErrors.subCounty.msg }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 mt-2">
              <div class="form-group">
                <label for="parish">Parish</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.parish.status }"
                  id="parish"
                  placeholder="Parish"
                  v-model="input.parish"
                />
                <div
                  class="invalid-feedback"
                  v-if="validationErrors.parish.status"
                >
                  {{ validationErrors.parish.msg }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 mt-2">
              <div class="form-group">
                <label for="village">Village</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.village.status }"
                  id="village"
                  placeholder="Village"
                  v-model="input.village"
                />
                <div
                  class="invalid-feedback"
                  v-if="validationErrors.village.status"
                >
                  {{ validationErrors.village.msg }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 mt-2">
              <div class="form-group">
                <label for="survey-number">Survey Number</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{
                    'is-invalid': validationErrors.surveyNumber.status,
                  }"
                  id="survey-number"
                  placeholder="Survey Record Number"
                  v-model="input.surveyNumber"
                />
                <div
                  class="invalid-feedback"
                  v-if="validationErrors.surveyNumber.status"
                >
                  {{ validationErrors.surveyNumber.msg }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 mt-2">
              <div class="form-group">
                <label for="market-value">Market Value</label>
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.marketValue.status }"
                  id="market-value"
                  placeholder="Property Market Value"
                  v-model="input.marketValue"
                />
                <div
                  class="invalid-feedback"
                  v-if="validationErrors.marketValue.status"
                >
                  {{ validationErrors.marketValue.msg }}
                </div>
              </div>
            </div>
            <div class="col-sm-6 mt-4">
              <div class="input-group">
                <input
                  type="text"
                  class="form-control"
                  :class="{ 'is-invalid': validationErrors.key.status }"
                  id="key"
                  placeholder="Property Key"
                  v-model="input.key"
                  readonly
                />
                <button
                  class="btn btn-primary"
                  type="button"
                  @click.prevent="generateKey"
                >
                  Generate Key
                </button>
                <div
                  class="invalid-feedback"
                  v-if="validationErrors.key.status"
                >
                  {{ validationErrors.key.msg }}
                </div>
              </div>
            </div>
          </div>
          <button class="btn btn-warning mt-2" type="submit">Register</button>
        </form>
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
        <div class="toast-body">
          Property added successfully. Approval pending!
        </div>
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
  name: "AssetsRegisterView",
  data() {
    return {
      input: {
        district: "",
        county: "",
        subCounty: "",
        parish: "",
        village: "",
        surveyNumber: "",
        marketValue: "",
        key: "",
      },
      validationErrors: {
        district: {
          status: false,
          msg: "",
        },
        county: {
          status: false,
          msg: "",
        },
        subCounty: {
          status: false,
          msg: "",
        },
        parish: {
          status: false,
          msg: "",
        },
        village: {
          status: false,
          msg: "",
        },
        surveyNumber: {
          status: false,
          msg: "",
        },
        marketValue: {
          status: false,
          msg: "",
        },
        key: {
          status: false,
          msg: "",
        },
        residence: {
          status: false,
          msg: "",
        },
      },
    };
  },
  setup() {
    const { generatePropertyKey, registerLand } = useWeb3();
    return {
      generatePropertyKey,
      registerLand,
    };
  },
  methods: {
    async generateKey() {
      if (this.validateInput()) {
        this.input.key = await this.generatePropertyKey(
          this.input.district,
          this.input.county,
          this.input.subCounty,
          this.input.parish,
          this.input.village,
          this.input.surveyNumber
        );
      }
    },
    async register() {
      if (this.validateInput() && this.validateKey()) {
        const status = await this.registerLand(
          this.input.district,
          this.input.county,
          this.input.subCounty,
          this.input.parish,
          this.input.village,
          this.input.surveyNumber,
          this.input.marketValue,
          this.input.key
        );

        if (status) {
          const successToast = document.getElementById("successToast");
          const toast = new bootstrap.Toast(successToast);
          toast.show();
          this.resetForm();
        } else {
          const errorToast = document.getElementById("errorToast");
          const toast = new bootstrap.Toast(errorToast);
          toast.show();
        }
      }
    },
    validateInput() {
      let validated = true;
      if (this.input.district.trim().length == 0) {
        this.validationErrors.district.status = true;
        this.validationErrors.district.msg = "District is required.";
        validated = false;
      } else {
        this.validationErrors.district.status = false;
        this.validationErrors.district.msg = "";
      }

      if (this.input.county.trim().length == 0) {
        this.validationErrors.county.status = true;
        this.validationErrors.county.msg = "County is required.";
        validated = false;
      } else {
        this.validationErrors.county.status = false;
        this.validationErrors.county.msg = "";
      }

      if (this.input.subCounty.trim().length == 0) {
        this.validationErrors.subCounty.status = true;
        this.validationErrors.subCounty.msg = "Sub County is required.";
        validated = false;
      } else {
        this.validationErrors.subCounty.status = false;
        this.validationErrors.subCounty.msg = "";
      }

      if (this.input.parish.trim().length == 0) {
        this.validationErrors.parish.status = true;
        this.validationErrors.parish.msg = "Parish is required.";
        validated = false;
      } else {
        this.validationErrors.parish.status = false;
        this.validationErrors.parish.msg = "";
      }

      if (this.input.village.trim().length == 0) {
        this.validationErrors.village.status = true;
        this.validationErrors.village.msg = "Village is required.";
        validated = false;
      } else {
        this.validationErrors.village.status = false;
        this.validationErrors.village.msg = "";
      }

      if (this.input.surveyNumber.trim().length == 0) {
        this.validationErrors.surveyNumber.status = true;
        this.validationErrors.surveyNumber.msg = "Survey Number is required.";
        validated = false;
      } else {
        this.validationErrors.surveyNumber.status = false;
        this.validationErrors.surveyNumber.msg = "";
      }

      if (this.input.marketValue.trim().length == 0) {
        this.validationErrors.marketValue.status = true;
        this.validationErrors.marketValue.msg = "Please provide market value.";
        validated = false;
      } else {
        this.validationErrors.marketValue.status = false;
        this.validationErrors.marketValue.msg = "";
      }

      return validated;
    },
    validateKey() {
      let validated = true;
      if (this.input.key.trim().length == 0) {
        this.validationErrors.key.status = true;
        this.validationErrors.key.msg = "Please generate property key.";
        validated = false;
      } else {
        this.validationErrors.key.status = false;
        this.validationErrors.key.msg = "";
      }
      return validated;
    },
    resetForm() {
      this.input = {
        district: "",
        county: "",
        subCounty: "",
        parish: "",
        village: "",
        surveyNumber: "",
        marketValue: "",
        key: "",
      };

      this.validationErrors = {
        district: {
          status: false,
          msg: "",
        },
        county: {
          status: false,
          msg: "",
        },
        subCounty: {
          status: false,
          msg: "",
        },
        parish: {
          status: false,
          msg: "",
        },
        village: {
          status: false,
          msg: "",
        },
        surveyNumber: {
          status: false,
          msg: "",
        },
        marketValue: {
          status: false,
          msg: "",
        },
        key: {
          status: false,
          msg: "",
        },
        residence: {
          status: false,
          msg: "",
        },
      };
    },
  },
};
</script>
