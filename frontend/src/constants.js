export const contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
export const abi = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "allAssets",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address payable",
            "name": "id",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "district",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "county",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "subcounty",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "parish",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "village",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "survey_code",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "market_value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "key",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "isGovtApproved",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isAvailable",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          }
        ],
        "internalType": "struct Registry.landDetails[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_district",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_county",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_subcounty",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_parish",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_village",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_surveyNumber",
        "type": "string"
      }
    ],
    "name": "computeId",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "pure",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getListedProperties",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address payable",
            "name": "id",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "district",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "county",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "subcounty",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "parish",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "village",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "survey_code",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "market_value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "key",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "isGovtApproved",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isAvailable",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          }
        ],
        "internalType": "struct Registry.landDetails[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "uid",
        "type": "address"
      }
    ],
    "name": "getUser",
    "outputs": [
      {
        "internalType": "address",
        "name": "id",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_fullname",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_user_address",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_nin",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_id",
        "type": "uint256"
      },
      {
        "internalType": "bool",
        "name": "status",
        "type": "bool"
      }
    ],
    "name": "govtStatus",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "isAdmin",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "lands",
    "outputs": [
      {
        "internalType": "address payable",
        "name": "id",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "district",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "county",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "subcounty",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "parish",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "village",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "survey_code",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "market_value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "key",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "isGovtApproved",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "isAvailable",
        "type": "bool"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "key",
        "type": "uint256"
      }
    ],
    "name": "listProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_district",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_county",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_subcounty",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_parish",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_village",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_survey_code",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "_market_value",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_key",
        "type": "uint256"
      }
    ],
    "name": "registerLand",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "uid",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_full_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_uemail",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_nin",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "_uaddress",
        "type": "string"
      }
    ],
    "name": "registerUser",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_key",
        "type": "uint256"
      },
      {
        "internalType": "address",
        "name": "_new_owner",
        "type": "address"
      }
    ],
    "name": "transferLand",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "key",
        "type": "uint256"
      }
    ],
    "name": "unlistProperty",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "users",
    "outputs": [
      {
        "internalType": "address",
        "name": "id",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "full_name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "user_address",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "email",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "national_id_number",
        "type": "string"
      },
      {
        "internalType": "bool",
        "name": "exists",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "viewAssets",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address payable",
            "name": "id",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "district",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "county",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "subcounty",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "parish",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "village",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "survey_code",
            "type": "string"
          },
          {
            "internalType": "uint256",
            "name": "market_value",
            "type": "uint256"
          },
          {
            "internalType": "uint256",
            "name": "key",
            "type": "uint256"
          },
          {
            "internalType": "string",
            "name": "isGovtApproved",
            "type": "string"
          },
          {
            "internalType": "bool",
            "name": "isAvailable",
            "type": "bool"
          },
          {
            "internalType": "bool",
            "name": "exists",
            "type": "bool"
          }
        ],
        "internalType": "struct Registry.landDetails[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// rugamba.rutihunza
// 2019