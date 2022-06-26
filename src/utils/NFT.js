import Moralis from "moralis";
import Web3 from 'web3'
import config from '../Constants/config.json'
class NFT {

    constructor() {

       
    }

    static async upload(name, image) {
        try {
            const moralisFile = new Moralis.File(name, { base64: image })
            const imageFile = await moralisFile.saveIPFS()
            const imageURI = imageFile.ipfs();
            //Image will be in base64 Format
            const metadata = {
                "name": name,
                "description": "This is my cool ice cream named " + name,
                "image": imageURI
            }
            const metadataFile = new Moralis.File("metadata.json", { base64: btoa(JSON.stringify(metadata)) });
            await metadataFile.saveIPFS();
            const metadataURI = metadataFile.ipfs();
            return metadataURI

        } catch (error) {
            console.log("🚩 ~ file: NFT.js ~ line 18 ~ NFT ~ upload ~ error", error)

        }
    }

    static async checkBalance(mintAmount) {
        try {
            const options = {
                chain: config.chain,
              };
              const {balance} = await Moralis.Web3API.account.getNativeBalance(options);
            console.log("🚩 ~ file: NFT.js ~ line 35 ~ NFT ~ checkBalance ~ balance", balance)
            console.log(mintAmount ,Moralis.Units.FromWei(balance))
            if (mintAmount > Moralis.Units.FromWei(balance)) {
                throw new Error("Not enough balance!")
            }
        } catch (error) {
            console.log("🚩 ~ file: NFT.js ~ line 22 ~ NFT ~ checkBalance ~ error", error)
            throw error
        }
    }

    static async mintToken(mintAmount, _uri) {
        try {
            const web3 = new Web3(window.ethereum);
            const encodedFunction = web3.eth.abi.encodeFunctionCall({
                name: "mintToken",
                type: "function",
                inputs: [{
                    type: 'string',
                    name: 'tokenURI'
                }]
            }, [_uri]);

            const transactionParameters = {
                to: config.contractAddress,
                from: window.ethereum.selectedAddress,
                data: encodedFunction,
                value: Moralis.Units.Token(mintAmount, "18")
            };
            const txt = await window.ethereum.request({
                method: 'eth_sendTransaction',
                params: [transactionParameters]
            });
            return txt


        } catch (error) {
            console.log("🚩 ~ file: NFT.js ~ line 32 ~ NFT ~ MintToken ~ error", error)

        }
    }

}

export default NFT

