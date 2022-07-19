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
        { address: '0x7d116123bc836b532ec6d8121bc48bd509abfb4d', qty: 2 },
        { address: '0x7682dcbe45b4e563610ea2879d8dd95a0ff6c403', qty: 12 },
        { address: '0x981033bb724bf17bdce49ddf9c1296b1186dd181', qty: 31 },
        { address: '0x49b2c294af0be91ff79fd36b80cd656ccb87729d', qty: 20 },
        { address: '0x9b9e19734358255290f83092c8cc7ae07bbd1f1a', qty: 3 },
        { address: '0x443265881ee8778a05271b08681e3f351507b50d', qty: 2 },
        { address: '0x4c4293dedf15ea93190044d1edc3299a11ae28fe', qty: 4 },
        { address: '0xa30d96fe345847412703cac5a1e46c82ce1a1c14', qty: 2 },
        { address: '0x38201e227ec0624906f214f4aa4fa6f4cf0d1d76', qty: 29 },
        { address: '0x3a59842fbf20b54d84c3505fc206f5cf7b56f4d9', qty: 20 },
        { address: '0x44fc64ec231687da05e119210a047d9ad40c8699', qty: 4 },
        { address: '0xed920c591dd73b334465621d16f0a19fb71af2b2', qty: 35 },
        { address: '0xd0f6ddbc9fb8b8bac9fb89af8b21e640a4b47e8e', qty: 9 },
        { address: '0x0175029133873c3c855ab955c368060409b9d527', qty: 3 },
        { address: '0x1d7c23f37e15dbf275df373de214783be8a65ec4', qty: 13 },
        { address: '0x59a58f0f2002f2f3231799b2b929dc6e1950b647', qty: 108 },
        { address: '0xd80f3de05da52204407266f5b549ffe837dc35c0', qty: 29 },
        { address: '0x13405d2ce45cc2533ff7df7dac2a2a3dd0ea6c20', qty: 2 },
        { address: '0x5377a91abb35b5aaa7a2bf54e8516005acfb2fa3', qty: 4 },
        { address: '0x2c0919d888acb6c505a0746881d42315269e00ce', qty: 35 },
        { address: '0xa07efe542b7a2e8de47b4ceacfa02c5a2475a444', qty: 4 },
        { address: '0xc0993abf3095f8acd99a2585a10e85706401b44b', qty: 10 },
        { address: '0xd5214a87caed6fdc40c01d5fe31c5215693d9320', qty: 7 },
        { address: '0xb5bb09ecaecb7fca6c837ab706ce321b3a3dd949', qty: 12 },
        { address: '0xdc5403a94ef5069bffd5f11306baace7974c3c76', qty: 90 },
        { address: '0xe9302645442b87381ef9837838c73937c104e4cd', qty: 13 },
        { address: '0x5d30dc36255ae4ad6022c7b8ba640e709993c4d4', qty: 4 },
        { address: '0xfca2dd13022057fa6edd96d6e1370380d66632c2', qty: 5 },
        { address: '0xd3590cc6726c37f8c2b18fa3565df4fad80671d9', qty: 4 },
        { address: '0xaac4548a187ab30269a64bbf16116d453a784143', qty: 2 },
        { address: '0x5e7fc6ef1c67fc77fbfbedd019d6f19f10e12802', qty: 2 },
        { address: '0x9b92a40cea49de66cef497aa9896fe27b53c3f52', qty: 14 },
        { address: '0x3af64df6337247591754f86718e4057e6d82cd5c', qty: 4 },
        { address: '0x7252fdc3c60736962f635dff57607534ff04f3f8', qty: 4 },
        { address: '0x5950e45026969440e5ab6955ad488509aaa8c3a9', qty: 10 },
        { address: '0x92534daca073d6a8c771e40ae2fe3c9faa829ea9', qty: 10 },
        { address: '0x328ae832099b9eb98ce9850ecab9e2656907bf6b', qty: 4 },
        { address: '0xbd78a6d8c4b4b7c00ac9daadf473f89fd2df997d', qty: 6 },
        { address: '0xf00281a9df18769008f999c7403ad9504e669f60', qty: 2 },
        { address: '0x9fba79f499898df0f178d42eb93bf01c48831d94', qty: 16 },
        { address: '0x7a0620d17cb73131425cc89a080f1374a8943846', qty: 2 },
        { address: '0xec642ea9dd6659e51d1857f9b780be591bb2edac', qty: 20 },
        { address: '0xacfcb257fe4a8eda83094b8d0563ce618ce92c47', qty: 2 },
        { address: '0xb681157f8265ebc3d32888649c5446ee3815a4ff', qty: 43 },
        { address: '0x32efed832f962d2d8e3d660ace4b05556dc2126f', qty: 3 },
        { address: '0xfcc3840f1d0ec0edff319da490397648c0e8cecf', qty: 2 },
        { address: '0x7090679caa03809b888c0c9af54a8ff286bc6783', qty: 4 },
        { address: '0x02daeccf9f84e9227ffe22f03818b84f37713a03', qty: 5 },
        { address: '0x4ea10e61b7f52df9bfba87bda6e612aeca055dd8', qty: 3 },
        { address: '0x0dadd93907841ee4bf49257e42efe6c4d88ec37e', qty: 19 },
        { address: '0x4e121fb084d6b263e4b639113efd88f50185fbf3', qty: 4 },
        { address: '0x11e8dca75f2b739dbc599d8377e40b387557a6a8', qty: 6 },
        { address: '0xf36a9ad78342df24ba49add3b9bd90579bf8c0ab', qty: 2 },
        { address: '0x5ae92b69725fab29524ee91ff5127a7159bf9d95', qty: 4 },
        { address: '0x185b0d7850e2e1d50e129033cddfed2ddc9071cd', qty: 2 },
        { address: '0x610042251030610bf25283688ee8427a60499ac7', qty: 4 },
        { address: '0x9455b2be14c63aafae8deae5b35d1e723b521721', qty: 3 },
        { address: '0xa60fd2ba12f87a8e906cc7ff5221b1a855331f78', qty: 8 },
        { address: '0x69d227255c73e18036019cff1d63108f28724330', qty: 4 },
        { address: '0xf8b48918440dff9628f8f587206b679026ac77f0', qty: 2 },
        { address: '0xb9decbf694ba4a758660d9fdf45494099e62ae24', qty: 4 },
        { address: '0xb650e277aff971890115bde9fde5cf9577b106b3', qty: 2 },
        { address: '0x84130d507c245484ff63cfa780a39ae6ade441bf', qty: 6 },
        { address: '0x3e925fce49c02fcac7e96eaa727b2044e968d21c', qty: 2 },
        { address: '0xf6167865afbc367dee27cb08cd6002db89f59173', qty: 4 },
        { address: '0xf8cd00d272d8530845cc02c98e22321fe4e2dbeb', qty: 2 },
        { address: '0xfff5633c65da9178e7878279094ad391d6624a52', qty: 3 },
        { address: '0xa894077e96375bdbda09d93627bbe7e4ca52fad1', qty: 4 },
        { address: '0x1c8d18bf320ecc81dd480aa9230c192c4847909c', qty: 3 },
        { address: '0xc3241afa761db496e1a6935dd616417ff607ecd0', qty: 9 },
        { address: '0x4615c1c4512222cb1a7d3cc55708d4d88bf04c6f', qty: 2 },
        { address: '0x76f1441f942d50cf19fb43abb78e3977cdc06ee3', qty: 4 },
        { address: '0xf7de4c7da19a1fa57c96778f4ce4b5dc46fc2726', qty: 7 },
        { address: '0xe706d4f3e6abbfd68f9d5dffaf5fb9c9944a71cd', qty: 2 },
        { address: '0x91bd20b6d7a9dcd7931471c4a328ecfbfaf9795f', qty: 2 },
        { address: '0x7d2d154eb06681905f9c739b3e28f40c5e685ce7', qty: 6 },
        { address: '0x8b972577f77d994323aa6ef60afdc8e160686d44', qty: 2 },
        { address: '0x015f0998709d5f38fb220095227c38b9f958907e', qty: 14 },
        { address: '0xd50624ad0e2fb008bfecc672434676ddb55576f0', qty: 2 },
        { address: '0xfbf24654e413c69a1e9611ff24084cf51f70a695', qty: 6 },
        { address: '0x327a9c175abef215b5a31612d19315c5411325c7', qty: 3 },
        { address: '0xc33d9f31a8e8a72c66bf211204554626da55f6db', qty: 2 },
        { address: '0x7e8c69c23dec1fd514d3dbca78eb0522c2b6e790', qty: 2 },
        { address: '0x658869c45d009034944f183b9dbee29bb222abf1', qty: 2 },
        { address: '0xefd6e29ed1b602b4d0410bf008bd667562df1013', qty: 3 },
        { address: '0x6c0b623c9de411245e9b675a1e0e711340823e3f', qty: 4 },
        { address: '0x0590b42695ff91e96f62f74d23166aa2cd6f516c', qty: 2 },
        { address: '0x2b47bf5e2f09c5e0410fe58d7c9c4211b6c89e5c', qty: 50 },
        { address: '0xb6eade9593dd6a82e1394f85262fcd0dc1c2d613', qty: 72 },
        { address: '0xb70917c742a2b78863ddcdcc9ed5b60a73264e98', qty: 8 },
        { address: '0xeb5c60bba45d835bd4d963bac2eb0b124a3c03aa', qty: 2 },
        { address: '0x37c47ac8a0a24adcbbd2a2895ec3df237a29a454', qty: 2 },
        { address: '0x40313d6f7e339fca1f38dcc9d61011f8cb57a7ab', qty: 2 },
        { address: '0x412888471ee3c00bab43848e5dfe6870ee2fc723', qty: 2 },
        { address: '0xa58ac80b7509b8e5f306233250e461c0a7a33c73', qty: 4 },
        { address: '0x9fa08466fc8ffeb8e49d23885d8a84dd820852db', qty: 40 },
        { address: '0xcac9fffc784d9171e5f78d39ba89b3cb92eec4df', qty: 2 },
        { address: '0xd73a2c2f34588c496b7317f203c2564d5ccd2319', qty: 4 },
        { address: '0xac4c74bbf3ec177ecae8806614a904f86e4d6787', qty: 2 },
        { address: '0xCd43AdcB61949ab14D3f4574BFbDA53d46389715', qty: 82 },
        { address: '0xe57aa96ae6ded8f909aee38e44794929682fda17', qty: 4 },
        { address: '0x68798f112b93d968d3de696cdc714102b6a99515', qty: 10 }
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






