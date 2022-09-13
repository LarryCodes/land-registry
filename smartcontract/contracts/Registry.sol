// SPDX-License-Identifier: MIT
pragma solidity ^0.8.8;

contract Registry {

    address private immutable i_owner;

    struct user {
        address id;
        string full_name;
        string user_address;
        string email;
        string national_id_number;
        bool exists;
    }

    struct landDetails {
        address payable id;
        string district;
        string county;
        string subcounty;
        string parish;
        string village;
        string survey_code;
        uint256 market_value;
        uint256 key;
        string isGovtApproved;
        bool isAvailable;
        bool exists;
    }

    struct portforlio {
        uint256[] assetList;
    }

    address[] users_array;
    uint256[] assets;
    uint256[] listed_assets;
    mapping(address => user) public users;
    mapping(uint256 => landDetails) public lands;
    mapping(address => portforlio) profiles;
    mapping(uint256 => bool) is_listed_asset;
    // enum reqStatus {Default, Pending, Rejected, Approved}

    constructor() {
        i_owner = msg.sender;
    }

    function registerUser(
        address uid,
        string memory _full_name,
        string memory _uemail,
        string memory _nin,
        string memory _uaddress
    ) public returns(bool) {
        users[uid] = user(
            uid,
            _full_name,
            _uaddress,
            _uemail,
            _nin,
            true
        );
        users_array.push(uid);
        return true;
    }

    function isAdmin() public view returns (bool) {
        if (msg.sender == i_owner) {
            return true;
        }
        return false;
    }

    function getUser(address uid) public view returns(
        address id,
        string memory _fullname,
        string memory _user_address,
        string memory _email,
        string memory _nin,
        bool exists
    ) {

        if (users[uid].exists) {
            return (
                users[uid].id,
                users[uid].full_name,
                users[uid].user_address,
                users[uid].email,
                users[uid].national_id_number,
                users[uid].exists
            );
        }

    }

    function registerLand(
        string memory _district,
        string memory _county,
        string memory _subcounty,
        string memory _parish,
        string memory _village,
        string memory _survey_code,
        uint256 _market_value,
        uint256 _key
    ) public returns (bool) {

         if(lands[_key].exists) revert("Property already exists");

        lands[_key] = landDetails(
            payable(msg.sender),
            _district,
            _county,
            _subcounty,
            _parish,
            _village,
            _survey_code,
            _market_value,
            _key,
            "pending",
            false,
            true
        );
        profiles[msg.sender].assetList.push(_key);
        assets.push(_key);
        return true;
    }

    function computeId(
        string memory _district,
        string memory _county,
        string memory _subcounty,
        string memory _parish,
        string memory _village,
        string memory _surveyNumber
    ) public pure returns(uint256){
        return uint(keccak256(abi.encodePacked(_district,_county,_subcounty,_parish,_village,_surveyNumber)))%10000000000000;
    }

    function viewAssets() public view returns (landDetails[] memory) {
        landDetails[] memory propertyList = new landDetails[](profiles[msg.sender].assetList.length);
        uint array_count = 0;
        for (uint256 i = 0; i < profiles[msg.sender].assetList.length; i++) {
            if(lands[profiles[msg.sender].assetList[i]].exists) {
                propertyList[array_count] = lands[profiles[msg.sender].assetList[i]];
                array_count++;
            }
        }
        return propertyList;
    }

    function allAssets() public view returns (landDetails[] memory) {
        landDetails[]memory propertyList = new landDetails[](assets.length);
        uint array_count = 0;

        for (uint256 i = 0; i < assets.length; i++) {
            if(lands[assets[i]].exists) {
                propertyList[array_count] = lands[assets[i]];
                array_count++;
            }
        }
        return propertyList;
    }

    function govtStatus(
        uint256 _id,
        bool status
    ) public returns (bool) {
        require(msg.sender == i_owner);
        lands[_id].isGovtApproved = (status) ? "approved" : "rejected";
        return true;
    }

    function transferLand(
        uint256 _key,
        address _new_owner
    ) public {
        if(!lands[_key].exists) revert("Property not found!");

        require(lands[_key].id == msg.sender);

        // Detach the asset from the old owner
        detachAsset(_key, msg.sender);

        // Attach asset to new owner 
        lands[_key].id = payable(_new_owner);
        profiles[_new_owner].assetList.push(_key);

    }

    function listProperty(uint256 key) public {
        require(lands[key].id == msg.sender);
        if (!is_listed_asset[key]) {
            lands[key].isAvailable = true;
            listed_assets.push(key);
            is_listed_asset[key] = true;
        }
    }

    function unlistProperty(uint256 key) public {
        require(lands[key].id == msg.sender);
        if (is_listed_asset[key]) {
            lands[key].isAvailable = false;
            is_listed_asset[key] = false;
            removeListing(key);
        }
    }

    function detachAsset(
        uint256 key,
        address owner
    ) internal {
        (uint256 _index, bool found) = findProfileAssetIndex(key, owner);

        if (_index >= profiles[owner].assetList.length || !found) return;
        for (uint256 i = _index; i < profiles[owner].assetList.length-1; i++) {
            profiles[owner].assetList[i] = profiles[owner].assetList[i+1];
        }
        profiles[owner].assetList.pop();
    }

    function findProfileAssetIndex(uint256 key, address owner) internal view returns(uint256 index, bool found) {
        for (uint256 i = 0; i < profiles[owner].assetList.length; i++) {
            if (profiles[owner].assetList[i] == key) {
                return (i, true);
            }
        }

        return (0, false);
    }

    function removeListing(uint256 key) internal {
        (uint256 _index, bool found) = findListingIndex(key);
        if (!found)
            return;

        if (_index >= listed_assets.length) return;
        for (uint256 i = _index; i < listed_assets.length-1; i++) {
            listed_assets[i] = listed_assets[i+1];
        }
        listed_assets.pop();
    }

    function findListingIndex(uint256 key) internal view returns(uint256 index, bool found) {
        for (uint256 i = 0; i < listed_assets.length; i++) {
            if (listed_assets[i] == key)
                return (i, true);
        }

        return (0, false);
    }

    function getListedProperties() public view returns(landDetails[] memory){
        landDetails[]memory propertyList = new landDetails[](listed_assets.length);
        uint array_count = 0;

        for (uint256 i = 0; i < listed_assets.length; i++) {
            if(lands[listed_assets[i]].exists && is_listed_asset[listed_assets[i]]) {
                propertyList[array_count] = lands[listed_assets[i]];
                array_count++;
            }
        }
        return propertyList;
    }

    
}