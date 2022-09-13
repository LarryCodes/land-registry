import { createStore } from "vuex";

export const store = createStore({
  state() {
    return {
      metaMaskConnection: false,
      connectedAddress: "",
      userDetails: {},
      activeArea: "home",
      isAdmin: false,
    };
  },
  mutations: {
    setConnectedAddress(state, address) {
      state.connectedAddress = address;
    },
    setMetaMaskConnectionStatus(state, status) {
      state.metaMaskConnection = status;
    },
    updateUserDetails(state, userDetails) {
      state.userDetails.exists = userDetails["exists"];
      state.userDetails.id = userDetails["id"];
      state.userDetails.email = userDetails["_email"];
      state.userDetails.fullname = userDetails["_fullname"];
      state.userDetails.nin = userDetails["_nin"];
      state.userDetails.residence = userDetails["_user_address"];
    },
    setActiveArea(state, area) {
      state.activeArea = area;
    },
    hasAdminAccess(state, status) {
      state.isAdmin = status;
    },
  },
});
