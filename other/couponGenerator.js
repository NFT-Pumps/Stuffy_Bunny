// npx hardhat run .\other\couponGenerator.js 
const { ethers } = require("hardhat");
require('dotenv').config();
const fs = require("fs");


const {
    keccak256,
    toBuffer,
    ecsign,
    bufferToHex,
} = require("ethereumjs-utils");

let signerPvtKey1 = process.env.SigPK;

//const signerPvtKey = Buffer.from(signerPvtKey1.substring(2,66), "hex");
const signerPvtKey = Buffer.from(signerPvtKey1, "hex");


let StuffyBunnyWL = {};

async function getClaimCodes() {
    //const [owner, _1, _2, _3, _4, _5, _6, _7, _8, _9, _10, _11, _12, _13, _14, _15, _16, _17, _18, _19, _20] = await ethers.getSigners();

    let presaleAddresses = [
        { address: '0xcd43adcb61949ab14d3f4574bfbda53d46389715', qty: 66 },
        { address: '0xdd2cd8b0ab065ce0052f629f0de4fc69a7a67532', qty: 18 },
        { address: '0x5b10229add9d8340d414246b0c9ab5784fcfb7fb', qty: 30 },
        { address: '0x59a306f79006e50d31798c6aaa7f042e324997aa', qty: 36 },
        { address: '0xc6ddd3e9e2debb5247877fc16160963682b6d1b3', qty: 6 },
        { address: '0xed06c9c5029e036a4c939edbb60359edd7889aa0', qty: 6 },
        { address: '0xc3593dd2971bd62b2c22b286d6229e37d516ef1a', qty: 126 },
        { address: '0x0dedca4951c9f5afcfd8ffd3456eea6271abeec2', qty: 12 },
        { address: '0xb144fbb33a712ad945b2cdc5ed88214206eb83f8', qty: 30 },
        { address: '0x36cd5dc24234332b3b7b2dc77abc57242a05b7c9', qty: 24 },
        { address: '0xbd85d42f8f78df7d332ac14d49b24bdec4a1ba45', qty: 6 },
        { address: '0x4a6d41513783b0023c4de563de751e698e5f962a', qty: 30 },
        { address: '0x40d67caa5cc51fa3f4d3f7015d354d86ee16b6bd', qty: 12 },
        { address: '0x93b953ce07c27ee4ba46ae302ab099af544acdfb', qty: 66 },
        { address: '0x0ab13dc09c78a449e7c3a9c2454c25dfdbb465b0', qty: 42 },
        { address: '0x5ded2743649cbfbf5849c44525cfcb23b8abadae', qty: 6 },
        { address: '0x6c228d8f8fa2c860bcd26c165bb0e6510ef43875', qty: 30 },
        { address: '0x38201e227ec0624906f214f4aa4fa6f4cf0d1d76', qty: 18 },
        { address: '0x897f1569a22ab89ed2ed363acaf9b8613edd27a7', qty: 6 },
        { address: '0xb681157f8265ebc3d32888649c5446ee3815a4ff', qty: 12 },
        { address: '0x8096ecf71cfd4a501c23e10c910b0745593ed446', qty: 6 },
        { address: '0xb1ef4840213e387e5cebcf5472d88fe9c2775dfa', qty: 6 },
        { address: '0x2d4d0c9290b8647c8283abb77058db3bd8b71461', qty: 30 },
        { address: '0xe3df83f3b4a336046d20f1f4527e8651a8f4e166', qty: 6 },
        { address: '0x01805fa1d279434178e4dd73e848eaccd93d9778', qty: 6 },
        { address: '0x59dfcb5944846a5db01eb611149e18a59fc1e7c0', qty: 6 },
        { address: '0x000afff3f35ea25b39e07c7e5b01c98778c3c6fa', qty: 6 },
        { address: '0x015f0998709d5f38fb220095227c38b9f958907e', qty: 6 },
        { address: '0xb1422a9945256cfa1dfaf9e8f05966ee4ce78a90', qty: 18 },
        { address: '0x2c0919d888acb6c505a0746881d42315269e00ce', qty: 12 },
        { address: '0x7502792c4648c548793274cf0c3f662b321f7373', qty: 6 },
        { address: '0x9a7ed8a35dd9af2cb42e2a81d8ba305bcdbc7499', qty: 6 },
        { address: '0xdc3fb536ade4f15f2a4efdd709b8ca92f226248f', qty: 25 },
        { address: '0x7682dcbe45b4e563610ea2879d8dd95a0ff6c403', qty: 6 },
        { address: '0x783298f90334b8df1f2a00208b4cb53eb0e8d068', qty: 6 },
        { address: '0xcbcd4ccbcc5894518e3315dc189bb539fd7ab30d', qty: 6 },
        { address: '0xa06037b19b326be3e97964747c1c0d67b13eb4d1', qty: 12 },
        { address: '0x0319e1d708eb4faa2090d564a04622c0c38f69ca', qty: 15 },
        { address: '0x6a6a6e04579c93426a8e65e4268df862edc9bbf2', qty: 24 },
        { address: '0x49b2c294af0be91ff79fd36b80cd656ccb87729d', qty: 6 },
        { address: '0x55cb8a133ac8529606d2dcd07941688f009223e6', qty: 6 },
        { address: '0xa02404f1da6ad191737558966651c10a7745db69', qty: 6 },
        { address: '0xae671a7aafbe75fb9e5e2364d8fb7d378073996b', qty: 30 },
        { address: '0xcf4629925eb3e81ac01a5f48e9558d15a052e220', qty: 12 },
        { address: '0xf4c3069b42888e679ceae20ec88c497e61d27668', qty: 6 },
        { address: '0x37d60fc1e5481a105ff3ddeb407dab70988623ba', qty: 6 },
        { address: '0xac30cca79f52725151f97e68038d23211513f9c6', qty: 6 },
        { address: '0x226970a965bec8659609dea9a6f770e89c0b95b8', qty: 6 },
        { address: '0x89c50d41bef923cc949051e1358d67bf13cad976', qty: 12 },
        { address: '0x9b781c925ceae60008049b41382c84801057d282', qty: 6 },
        { address: '0x87a39a6fd1dca6555233597091ecac0751628f6d', qty: 6 },
        { address: '0xcdc41c9bc406685e674e1d4e4bf4369d4bf08bb4', qty: 6 },
        { address: '0x59a58f0f2002f2f3231799b2b929dc6e1950b647', qty: 12 },
        { address: '0x3f8a41913df38708d068dbee522e7c7e84db0d7a', qty: 6 },
        { address: '0x36fa3e52d58a7401be46353f50667fbf931e4f42', qty: 12 },
        { address: '0x4937e4fec636a615d9a49178865e349af67c906f', qty: 12 },
        { address: '0xa7531f5a9d56089a79ebcb295baba41bed80ca22', qty: 48 },
        { address: '0x94cb4600fccefd16408f7020ab64d8e0fa7aa61d', qty: 12 },
        { address: '0x90ec57e6cf1fb1d15eebbd22ca99b0d93efb543e', qty: 24 },
        { address: '0xb86b654d1bf7d68795ca5cf33d9b9db065a4f2cf', qty: 12 },
        { address: '0x5868c525c939837bfd8930044c9269a5c2816fd6', qty: 12 },
        { address: '0x9e64542f7ad483aedd9e4253e718ce14dc97d25f', qty: 12 },
        { address: '0xf15031d57826b7a0a8e03bde484e0cd028e77cfa', qty: 12 },
        { address: '0x98a5ef89293ee3c5d24b00d7f71e8cd165892b1f', qty: 12 },
        { address: '0x25d3fa386bb1087c779b4b66c5024cadad591bf5', qty: 18 },
        { address: '0x5ba18858cc31b6dabae0fca189aedb660b31138d', qty: 12 },
        { address: '0xc3593dd2971bd62b2c22b286d6229e37d516ef1a', qty: 126 },
        { address: '0x93b953ce07c27ee4ba46ae302ab099af544acdfb', qty: 66 },
        { address: '0x039d959d12C66CC98Bbe9B7f384dD981697bC98E', qty: 50 }
    ]

    function createCoupon(hash, signerPvtKey) {
        return ecsign(hash, signerPvtKey);
    }

    function generateHashBuffer(typesArray, valueArray) {
        return keccak256(
            toBuffer(ethers.utils.defaultAbiCoder.encode(typesArray,
                valueArray))
        );
    }

    function serializeCoupon(coupon) {
        return {
            r: bufferToHex(coupon.r),
            s: bufferToHex(coupon.s),
            v: coupon.v
        };
    }

    for (let i = 0; i < presaleAddresses.length; i++) {
        const userAddress = ethers.utils.getAddress(presaleAddresses[i].address);
        const hashBuffer = generateHashBuffer(
            ["uint256", "address"],
            [presaleAddresses[i].qty, userAddress]
        );
        const coupon = createCoupon(hashBuffer, signerPvtKey);

        StuffyBunnyWL[userAddress] = {
            q: presaleAddresses[i].qty,
            whitelistClaimPass: serializeCoupon(coupon)
        };
    }
    // HELPER FUNCTIONS

    // get the Console class
    const { Console } = require("console");
    // get fs module for creating write streams
    const fs = require("fs");

    // make a new logger
    const myLogger = new Console({
        stdout: fs.createWriteStream("ProjectWhitelist-signed-coupons.txt"),
        stderr: fs.createWriteStream("errStdErr.txt"),
    });

    myLogger.log(StuffyBunnyWL);

}

getClaimCodes()






