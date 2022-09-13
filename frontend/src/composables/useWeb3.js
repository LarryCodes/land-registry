import { ethers } from "@/ethers-5.6.esm.min.js";
import { store } from "@/store";
import { contractAddress, abi } from "@/constants";

export default function useWeb3() {
  // Methods
  async function connectMetaMask() {
    if (window.ethereum && window.ethereum.isMetaMask) {
      try {
        console.log(`Connecting to metamask!`);
        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = await signer.getAddress();
        console.log(`Connected using address ${address}`);
        // Commit the connected account address to state
        store.commit("setConnectedAddress", address);
        // Set the metamask connection status to true
        store.commit("setMetaMaskConnectionStatus", true);

        // Try to fetch the user details from the chain
        await getUserDetails();
        return true;
      } catch (error) {
        console.error("Connection Failed");
        console.error(error);
      }
    } else {
      alert(
        "MetaMask not detected! Please install metamask extension for your browser to continue!"
      );
      console.error(
        "MetaMask not detected! Please install metamask extension for your browser to continue!"
      );
      return false;
    }
  }

  async function getUserDetails() {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      try {
        const connectedAddress = store.state.connectedAddress;
        console.log(`Getting user details for address ${connectedAddress}`);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const userDetails = await contract.getUser(connectedAddress);
        if (userDetails["exists"]) {
          store.commit("updateUserDetails", userDetails);
        }
      } catch (error) {
        console.error("Failed to retrieve user details");
        console.error(error);
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  async function registerUser(fullName, email, nin, residence) {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      const connectedAddress = store.state.connectedAddress;
      console.log(`Registering user with address ${connectedAddress}`);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const transactionResponse = await contract.registerUser(
          connectedAddress,
          fullName,
          email,
          nin,
          residence
        );
        console.log(transactionResponse);
        // Listen for tx to be mined
        await listenForTransactionMine(transactionResponse, provider);
        console.log("Done!");

        // Now call getUserDetails() as well
        await getUserDetails();
      } catch (error) {
        console.warn(error);
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  async function isAdmin() {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const result = await contract.isAdmin();
        return result;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  async function generatePropertyKey(
    district,
    county,
    subcounty,
    parish,
    village,
    surveyNumber
  ) {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const propertyKey = await contract.computeId(
          district,
          county,
          subcounty,
          parish,
          village,
          surveyNumber
        );

        return propertyKey.toString();
      } catch (error) {
        console.warn(error);
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  async function registerLand(
    district,
    county,
    subcounty,
    parish,
    village,
    surveyNumber,
    marketValue,
    key
  ) {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      console.log(`Registering land with key ${key}`);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const transactionResponse = await contract.registerLand(
          district,
          county,
          subcounty,
          parish,
          village,
          surveyNumber,
          marketValue,
          key
        );
        console.log(transactionResponse);
        // Listen for tx to be mined
        await listenForTransactionMine(transactionResponse, provider);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  async function getUserPortfolio() {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      try {
        const connectedAddress = store.state.connectedAddress;
        console.log(`Getting user portfolio for address ${connectedAddress}`);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const portfolio = await contract.viewAssets();
        return portfolio;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  async function getAllAssets() {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const assets = await contract.allAssets();
        return assets;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  async function govtPropertyStatus(propertyId, status) {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      console.log(`Updating status for land with key ${propertyId}`);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const transactionResponse = await contract.govtStatus(
          propertyId,
          status
        );
        console.log(transactionResponse);
        // Listen for tx to be mined
        await listenForTransactionMine(transactionResponse, provider);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  async function listProperty(propertyId) {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      console.log(`Listing land with key ${propertyId}`);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const transactionResponse = await contract.listProperty(propertyId);
        // Listen for tx to be mined
        await listenForTransactionMine(transactionResponse, provider);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  async function unListProperty(propertyId) {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      console.log(`unListing land with key ${propertyId}`);
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(contractAddress, abi, signer);

      try {
        const transactionResponse = await contract.unlistProperty(propertyId);
        // Listen for tx to be mined
        await listenForTransactionMine(transactionResponse, provider);
        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  async function getListedAssets() {
    if (
      window.ethereum &&
      window.ethereum.isMetaMask &&
      store.state.metaMaskConnection
    ) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);

        const assets = await contract.getListedProperties();
        return assets;
      } catch (error) {
        console.error(error);
        return false;
      }
    } else {
      console.error(
        "MetaMask not detected or not connected! Please install metamask extension for your browser and click connect again to continue!"
      );
    }
  }

  function listenForTransactionMine(transactionResponse, provider) {
    console.log(`Mining ${transactionResponse.hash}...`);
    // listen for transaction to finish
    return new Promise((resolve) => {
      provider.once(transactionResponse.hash, (transactionReceipt) => {
        console.log(
          `Completed with ${transactionReceipt.confirmations} confirmations`
        );
        resolve();
      });
    });
  }

  return {
    connectMetaMask,
    getUserDetails,
    registerUser,
    generatePropertyKey,
    registerLand,
    getUserPortfolio,
    isAdmin,
    getAllAssets,
    govtPropertyStatus,
    listProperty,
    unListProperty,
    getListedAssets,
  };
}
