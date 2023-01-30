// SPDX-License-Identifier: UNLICENSED

// Khai báo phiên bản solidity sử dụng
pragma solidity ^0.8.0;

// contract gần giống với class trong OOP
contract Transactions {
    // https://www.google.com/search?q=uint256+l%C3%A0+g%C3%AC&rlz=1C1GCEA_enVN912VN912&oq=uint&aqs=chrome.0.69i59j69i57j0i512l8.5855j0j7&sourceid=chrome&ie=UTF-8
    uint256 transactionCount;

    // event không có thân hàm và được handle thông qua thư viện web3.js
    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    // struct gần giống với Object
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // Khai báo mảng 
    TransferStruct[] transactions;


    function addToBlockchain(
        address payable receiver, // Chỉ định function có thể nhận ETH
        uint256 amount,
        string memory message, // Chỉ định biến sẽ được lưu trong memory chứ không phải trong store
        string memory keyword 
    ) public {
        transactionCount += 1;
        transactions.push(
            TransferStruct(
                msg.sender, 
                receiver,
                amount,
                message,
                block.timestamp, // Lấy thời gian hiện tại 
                keyword
            )
        );

        // Gọi đến event
        emit Transfer(msg.sender, receiver, amount, message, block.timestamp, keyword);
    }
    // view: hàm không thay đổi trạng thái của contract
    function getAllTransactions()
        public
        view 
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function getTransactionCount() public view returns (uint256) {
        return transactionCount;
    }
}
