<template>
  <div class="container py-4">
    <h1>Register Form</h1>
    <form @submit.prevent="register">
      <div class="form-group">
        <label for="full-name">Full Name</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.fullName.status }"
          id="full-name"
          placeholder="Enter Full name"
          v-model="input.fullName"
        />
        <div class="invalid-feedback" v-if="validationErrors.fullName.status">
          {{ validationErrors.fullName.msg }}
        </div>
      </div>
      <div class="form-group">
        <label for="email">Email</label>
        <input
          type="email"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.email.status }"
          id="email"
          placeholder="Enter email"
          v-model="input.email"
        />
        <div class="invalid-feedback" v-if="validationErrors.email.status">
          {{ validationErrors.email.msg }}
        </div>
      </div>
      <div class="form-group">
        <label for="nin">National Identification Number</label>
        <input
          type="text"
          class="form-control"
          :class="{ 'is-invalid': validationErrors.nin.status }"
          id="nin"
          placeholder="Enter NIN"
          v-model="input.nin"
        />
        <div class="invalid-feedback" v-if="validationErrors.nin.status">
          {{ validationErrors.nin.msg }}
        </div>
      </div>
      <div class="form-group">
        <label for="residence">Current Address</label>
        <textarea
          class="form-control"
          :class="{ 'is-invalid': validationErrors.residence.status }"
          id="residence"
          rows="3"
          v-model="input.residence"
        ></textarea>
        <div class="invalid-feedback" v-if="validationErrors.residence.status">
          {{ validationErrors.residence.msg }}
        </div>
      </div>
      <button class="btn btn-warning mt-2" type="submit">Register</button>
    </form>
  </div>
</template>

<script>
import useWeb3 from "@/composables/useWeb3";
export default {
  name: "RegisterComponent",
  data() {
    return {
      input: {
        fullName: "",
        email: "",
        nin: "",
        residence: "",
      },
      validationErrors: {
        fullName: {
          status: false,
          msg: "",
        },
        email: {
          status: false,
          msg: "",
        },
        nin: {
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
    const { registerUser } = useWeb3();
    return {
      registerUser,
    };
  },
  methods: {
    register() {
      if (this.validateInput()) {
        this.registerUser(
          this.input.fullName,
          this.input.email,
          this.input.nin,
          this.input.residence
        );
      }
    },
    validateInput() {
      let validated = true;
      if (this.input.fullName.trim().length < 5) {
        this.validationErrors.fullName.status = true;
        this.validationErrors.fullName.msg = "Please enter your full name.";
        validated = false;
      } else {
        this.validationErrors.fullName.status = false;
        this.validationErrors.fullName.msg = "";
      }

      if (this.input.email.trim().length < 5) {
        this.validationErrors.email.status = true;
        this.validationErrors.email.msg = "Please enter valid email address.";
        validated = false;
      } else {
        this.validationErrors.email.status = false;
        this.validationErrors.email.msg = "";
      }

      if (this.input.nin.trim().length < 7) {
        this.validationErrors.nin.status = true;
        this.validationErrors.nin.msg = "Please provide valid NIN.";
        validated = false;
      } else {
        this.validationErrors.nin.status = false;
        this.validationErrors.nin.msg = "";
      }

      if (this.input.residence.trim() < 5) {
        this.validationErrors.residence.status = true;
        this.validationErrors.residence.msg =
          "Please provide a valid residential address!";
        validated = false;
      } else {
        this.validationErrors.residence.status = false;
        this.validationErrors.residence.msg = "";
      }

      return validated;
    },
  },
};
</script>
