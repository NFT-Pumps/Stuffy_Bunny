//npx hardhat run .\other\couponGenerator.js 
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
        { address: '0x98a5EF89293ee3c5D24b00d7f71E8cD165892B1f', qty: 50 },
        { address: '0x76A1205358f0B759Ed640E76340185C7708DABEc', qty: 50 },
        { address: '0xF15031d57826B7a0a8e03bDe484e0Cd028E77cfa', qty: 50 },
        { address: '0x5868C525c939837bFd8930044C9269A5C2816Fd6', qty: 50 },
        { address: '0xa793EBC07b3c44123933c3e4e2b0A7807FEE8257', qty: 50 },
        { address: '0xcd43adcb61949ab14d3f4574bfbda53d46389715', qty: 50 },
        { address: '0xa7531f5a9d56089a79ebcb295baba41bed80ca22', qty: 50 },
        { address: '0x6A6a6e04579C93426A8e65e4268DF862Edc9bBF2', qty: 50 },
        { address: '0x203A550caB392e30B09048bBAb2F7C133f553e15', qty: 50 },
        { address: '0x3006e2b2A605064925425a3eB7CbD1B3F82BC56b', qty: 50 },
        { address: '0xFAb4936A514d86Ec1d418803508Cc785b70F08e6', qty: 50 },
        { address: '0x4A6D41513783B0023C4De563DE751e698E5F962a', qty: 50 },
        { address: '0x3E924f14779a6e32f832f4Db3471045edD95900D', qty: 50 },
        { address: '0xB1422a9945256CFa1dfAf9E8f05966ee4ce78A90', qty: 50 },
        { address: '0xDF740AD3D23182cbD8600321796b888A63C1478d', qty: 50 },
        { address: '0x015f0998709D5f38fb220095227C38B9F958907E', qty: 50 },
        { address: '0x2Aac35E94D5CdE231eFF80c755E254c778aC352b', qty: 50 },
        { address: '0x35Fdf1A28CF3f9539a5AC4eff439c0518b3bee58', qty: 50 },
        { address: '0xFc79330C1b8c1a6a795289e320ADDf704BB3d073', qty: 50 },
        { address: '0x768D280111e0fDc53E355ceFB1962eB91b6cca2d', qty: 50 },
        { address: '0xED06c9c5029e036a4C939EdbB60359eDD7889aa0', qty: 50 },
        { address: '0x6727172b265998f7A8aAE3Ef73CC0d62b8DFe289', qty: 50 },
        { address: '0xce6407D652A04dDAD71e817A59d7777e904daBB3', qty: 50 },
        { address: '0xb8A51d5745C34812D51B26d049AE45ACe0193246', qty: 50 },
        { address: '0xE948725e72ee73f844d3d8F5843085bE6883aDC8', qty: 50 },
        { address: '0x1baf91Fa6d655A3Ec8A8Cf2bC3958f052dae0F5E', qty: 50 },
        { address: '0xbfFF841E27860169d06ddF897EA1342daC388606', qty: 50 },
        { address: '0x6eDA843E23c6136558C39954d1313F7E4Cb1D108', qty: 50 },
        { address: '0xb144fBB33A712aD945B2CdC5Ed88214206Eb83F8', qty: 50 },
        { address: '0xe926A0ACE01dCD8BaF7171e3dd8FD5d8194b8a6d', qty: 50 },
        { address: '0x6DEB726F1731Ee8182C23fafd0bb42d4010e9209', qty: 50 },
        { address: '0x67011010B5193f26c0EE1ffd8262c14420115223', qty: 50 },
        { address: '0xD54589B97Be02753d37439265F6D4cC2b7C2E53F', qty: 50 },
        { address: '0xf4F1BBF39689916Dd531648217580AF39cb493aD', qty: 50 },
        { address: '0x17d9E5500bD88f7E0d8F87Dc80287C7104a3269E', qty: 50 },
        { address: '0xa6896d47B5d3bD19663858e44D8bb6ADd55C2Ff6', qty: 50 },
        { address: '0xE887365C83E20C7AD9f9F009bc7b865261Fa333c', qty: 50 },
        { address: '0x7a26C3Bb902C608414E5018d716CaDc79305139b', qty: 50 },
        { address: '0x95BFf33f83E7433e4aD9b05b1080A1f66bE80eCE', qty: 50 },
        { address: '0x344308cb07d0DB042F29E90a00fB16A7F5f4E440', qty: 50 },
        { address: '0xc94C43D8e2CB19625EA90Ddb5E20242b8873aEF6', qty: 50 },
        { address: '0xedeCa5A2C3EBaffA7a450A9bBbad932961EBf7BB', qty: 50 },
        { address: '0x0a1174E2C1E8994283d263738f914e74552670ad', qty: 50 },
        { address: '0x3c9dede677fc619b531ce9e799d02d0db4df1951', qty: 50 },
        { address: '0x91d88aaba5312c55d737f28d14bc0b5ffcda5fbb', qty: 50 },
        { address: '0xc5e349c8B9B381e2e849EDF2dE38264e60D0C2F8', qty: 50 },
        { address: '0xe8fff56ebc79a8a66d2295750e7ec9991410c502', qty: 50 },
        { address: '0x1e294079ACd08228c0d2F7eAbf25E1d07D1bCa23', qty: 50 },
        { address: '0xf512b10fF46D40536F826304D8b8C47E4B77c6C8', qty: 50 },
        { address: '0x36CD5Dc24234332B3B7B2DC77AbC57242a05B7c9', qty: 50 },
        { address: '0x0175029133873c3C855aB955c368060409B9d527', qty: 50 },
        { address: '0x31e34622470260da7D1Ba628cEc094bB68891C4B', qty: 50 },
        { address: '0x3006e2b2A605064925425a3eB7CbD1B3F82BC56b', qty: 50 },
        { address: '0xDE36Aa44b09aD04538Ef232bA9bb6b822cB3A3D3', qty: 50 },
        { address: '0x07a18F422C494C5Bea38c595A1C9904A99F9d9B4', qty: 50 },
        { address: '0xD5214a87Caed6FdC40c01d5FE31C5215693D9320', qty: 50 },
        { address: '0x6c83Bc12E9FDC5cA7C73AF017A516720daB2ba52', qty: 50 },
        { address: '0x3ab78490800591DFEd32984C33e99C25b46a91AE', qty: 50 },
        { address: '0xAdBCAFe456F6466a41Bffc6a297f1EA872E455BE', qty: 50 },
        { address: '0xf10b4c0013afc7f78e7bb4801e23d013edf3e515', qty: 50 },
        { address: '0x34ad819A6c26BA4637892e6b327657E542f75D92', qty: 50 },
        { address: '0xAF3054ca6FAf4A7e134C09112130f2A08Ba473CC', qty: 50 },
        { address: '0x015f0998709D5f38fb220095227C38B9F958907E', qty: 50 },
        { address: '0x37D60fC1E5481A105Ff3Ddeb407dab70988623Ba', qty: 50 },
        { address: '0x87ccfD5B2cCA1A9007133DF7016fF7e5202bF7f0', qty: 50 },
        { address: '0x0DaDd93907841eE4BF49257e42eFe6C4D88Ec37e', qty: 50 },
        { address: '0xBD85d42f8f78DF7d332AC14d49b24bDec4A1Ba45', qty: 50 },
        { address: '0xD0c42922E603f388b3a2F4512B9C368127f6CB74', qty: 50 },
        { address: '0x4aeDfFDEac4bC6218a29dfBee9bBa0306E8A4Ca7', qty: 50 },
        { address: '0x01901688a35a7094EAFa505ffa587d15AeB5465d', qty: 50 },
        { address: '0xFdC6fB7716175Aa71715BDe10438011908a5722D', qty: 50 },
        { address: '0x59DfCB5944846a5db01eb611149e18A59Fc1E7C0', qty: 50 },
        { address: '0x4937e4fEC636A615D9A49178865e349af67c906f', qty: 50 },
        { address: '0xE3df83F3b4A336046D20F1F4527e8651a8F4E166', qty: 50 },
        { address: '0xdd2cD8B0AB065Ce0052f629F0de4FC69A7A67532', qty: 50 },
        { address: '0x0AB13dC09c78a449E7c3A9C2454C25dFdbb465b0', qty: 50 },
        { address: '0xA06037B19B326BE3e97964747C1C0d67b13Eb4D1', qty: 50 },
        { address: '0x1881B9dA003DF9F7ADC5c5bABFf753f6Da0C4768', qty: 50 },
        { address: '0x8096Ecf71cFd4A501C23E10C910B0745593ED446', qty: 50 },
        { address: '0x072001d9a7fD9Aaa1D0AE426024Cb956d25D93aC', qty: 50 },
        { address: '0xf816f374C5A26c5c00BDE1CC7703c06fb619Baa3', qty: 50 },
        { address: '0xD0c42922E603f388b3a2F4512B9C368127f6CB74', qty: 50 },
        { address: '0x49b2c294Af0be91Ff79FD36b80Cd656ccb87729D', qty: 50 },
        { address: '0x867Ff4EBD4D2bA33Bd9f39F40C240eA5c489d1Ba', qty: 50 },
        { address: '0xB61ce22041cebd957F6E259600e7960E28CB4F4d', qty: 50 },
        { address: '0xcBcD4CCbCC5894518E3315DC189BB539fD7aB30D', qty: 50 },
        { address: '0x8A934A2144bAc20807fC8acc42993b07B88bc753', qty: 50 },
        { address: '0x941418B80b30716dC908d7c0a2CdaC6BCf9B634c', qty: 50 },
        { address: '0x5B10229aDD9d8340D414246B0c9ab5784fCfb7FB', qty: 50 },
        { address: '0x1d7C23F37e15Dbf275dF373De214783bE8a65Ec4', qty: 50 },
        { address: '0x79871D31F5C4150Ed717d0ce02FD71381d31a3A7', qty: 50 },
        { address: '0xf00F459e6EeC67F3700316f6fef6da0DB8576aE3', qty: 50 },
        { address: '0x8a7cBc544726b3f2Fb43d08abbFF6cAe4FA23413', qty: 50 },
        { address: '0x36E1F340220392Db45D739B6F2De96d3558DA86A', qty: 50 },
        { address: '0x6125f4451f35419B9132bCE4322F7B367095C013', qty: 50 },
        { address: '0x764147B036C914ca460Dd42494Cfa863D3A2C560', qty: 50 },
        { address: '0xc2Ef44a5aBF728Bbcc6DCe3A29b2EF37d6e06d93', qty: 50 },
        { address: '0x6d10aB9b038122124de213a2BA8C9E6234fF3D4c', qty: 50 },
        { address: '0xaF9390Ae0c19975A8062638B6BD0c24F35694A7c', qty: 50 },
        { address: '0x07a18F422C494C5Bea38c595A1C9904A99F9d9B4', qty: 50 },
        { address: '0xFdC6fB7716175Aa71715BDe10438011908a5722D', qty: 50 },
        { address: '0xE73bae5ff0944458D1032346663b24a37475c4F3', qty: 50 },
        { address: '0x63591bf292D0694b911785caef11c2ea70832007', qty: 50 },
        { address: '0xBD85d42f8f78DF7d332AC14d49b24bDec4A1Ba45', qty: 50 },
        { address: '0x2A9b62A2C38007bb06c79f811E082DDa97a78FF9', qty: 50 },
        { address: '0x8a7cBc544726b3f2Fb43d08abbFF6cAe4FA23413', qty: 50 },
        { address: '0xDE36Aa44b09aD04538Ef232bA9bb6b822cB3A3D3', qty: 50 },
        { address: '0x3bbd0659D24b79eC932A2D9114e1d9BF67E010b0', qty: 50 },
        { address: '0x31e34622470260da7D1Ba628cEc094bB68891C4B', qty: 50 },
        { address: '0x2c0919D888acb6c505a0746881d42315269e00cE', qty: 50 },
        { address: '0xb681157f8265ebc3d32888649c5446ee3815A4ff', qty: 50 },
        { address: '0x05A6D22A1569299E4b58e912efF7bdAb12C24333', qty: 50 },
        { address: '0x59a306f79006E50D31798c6aaA7f042E324997aA', qty: 50 },
        { address: '0x87A39A6fd1DCA6555233597091EcAC0751628F6D', qty: 50 },
        { address: '0xF2671bfF1A6F2825b960AABCc62c8b71D71f0301', qty: 50 },
        { address: '0xA06037B19B326BE3e97964747C1C0d67b13Eb4D1', qty: 50 },
        { address: '0x1881B9dA003DF9F7ADC5c5bABFf753f6Da0C4768', qty: 50 },
        { address: '0x8096Ecf71cFd4A501C23E10C910B0745593ED446', qty: 50 },
        { address: '0x072001d9a7fD9Aaa1D0AE426024Cb956d25D93aC', qty: 50 },
        { address: '0xf816f374C5A26c5c00BDE1CC7703c06fb619Baa3', qty: 50 },
        { address: '0xD0c42922E603f388b3a2F4512B9C368127f6CB74', qty: 50 },
        { address: '0x4FAaE1Fa3860813c5Beb45C919FCb6EdE48124C7', qty: 50 },
        { address: '0x3540C4c7736768061Fcd174ed0a6f067824198D2', qty: 50 },
        { address: '0x8602f42677C4B89ADB387d6F880Abf650369FEAE', qty: 50 },
        { address: '0xF15031d57826B7a0a8e03bDe484e0Cd028E77cfa', qty: 50 },
        { address: '0x5750526d21809B0Fb39d48899DB3A3a17b3ec4a7', qty: 50 },
        { address: '0xacD40053ffB2060ECDB2a178dc810fafbea95e0e', qty: 50 },
        { address: '0xc05bf74f13aabBC3895686b37B4706869C3b8def', qty: 50 },
        { address: '0xc2Ef44a5aBF728Bbcc6DCe3A29b2EF37d6e06d93', qty: 50 },
        { address: '0xDF740AD3D23182cbD8600321796b888A63C1478d', qty: 50 },
        { address: '0x1a23609c868721bC6FdA3DdD71AaeC1aD377165c', qty: 50 },
        { address: '0x90EC57E6Cf1fb1d15EEBbd22ca99b0d93Efb543E', qty: 50 },
        { address: '0xb02Ea00FB3cc59e6aeFE4C8F92FD060195CCc8eA', qty: 50 },
        { address: '0x76A1205358f0B759Ed640E76340185C7708DABEc', qty: 50 },
        { address: '0x764147B036C914ca460Dd42494Cfa863D3A2C560', qty: 50 },
        { address: '0x5bA18858CC31B6DABae0fcA189AEdB660B31138D', qty: 50 },
        { address: '0x5868C525c939837bFd8930044C9269A5C2816Fd6', qty: 50 },
        { address: '0x6C228d8f8FA2C860bCD26C165Bb0E6510EF43875', qty: 50 },
        { address: '0x98a5EF89293ee3c5D24b00d7f71E8cD165892B1f', qty: 50 },
        { address: '0x76A1205358f0B759Ed640E76340185C7708DABEc', qty: 50 },
        { address: '0x3Aa7eCD5eedD68C7Aef768F74De01F6b36BD25c8', qty: 50 },
        { address: '0x9f5E1A9d9f3480Db10f65Fbf637b00eFF78f731F', qty: 50 },
        { address: '0x5D30dc36255aE4aD6022c7b8bA640e709993c4D4', qty: 50 },
        { address: '0xb770Ee85fAF6556493ffdc248f004D5225634dCF', qty: 50 },
        { address: '0x36CD5Dc24234332B3B7B2DC77AbC57242a05B7c9', qty: 50 },
        { address: '0xD0c42922E603f388b3a2F4512B9C368127f6CB74', qty: 50 },
        { address: '0xBD85d42f8f78DF7d332AC14d49b24bDec4A1Ba45', qty: 50 },
        { address: '0x3aE51fF7fD17F0F2AAd0f0B01458d95C07F7222c', qty: 50 },
        { address: '0xD5214a87Caed6FdC40c01d5FE31C5215693D9320', qty: 50 },
        { address: '0x07A7883fC13094e57079742B9D646b4B61bE3f2a', qty: 50 },
        { address: '0xc2A6Cb8D9B25B751056330B37dbdb5f2834769F4', qty: 50 },
        { address: '0x379A9D99Edf728F26a599B26B24e7187ca58aFE5', qty: 50 },
        { address: '0x036D0560582c444ff13d5822e2759A9f1E3D1e1e', qty: 50 },
        { address: '0xD078FBE87b8BFB77d2eE4DCA0b8cab0D37f0Be88', qty: 50 },
        { address: '0xB4fcc748Fe8755773d1d205e18a3603F11eCc8E5', qty: 50 },
        { address: '0x30CDe1d49cF05c45981d94C48670Bf016097a450', qty: 50 },
        { address: '0x1C8eb6DD4b4519d82D2Bdd471d2e3248e74Aeb24', qty: 50 },
        { address: '0x8857de38699e2368E89d8D9Bb2f19FAfEEBfd02c', qty: 50 },
        { address: '0xe1B024805Bd419a61dA24181dd9d0bd0DB1D6363', qty: 50 },
        { address: '0xaCCe3C5793f5425B7519acF1FaaFD30A52964892', qty: 50 },
        { address: '0x775Ab8541aDcd2C92f9F076A67A1A420a47bEef6', qty: 50 },
        { address: '0xFAb4936A514d86Ec1d418803508Cc785b70F08e6', qty: 50 },
        { address: '0x73ae6842ecE0a3A29b74095c54e97A763e630631', qty: 50 },
        { address: '0xF96CbCE7c0F4E9ee8D3f3b1cC1be8BEA4D983434', qty: 50 },
        { address: '0x44f1D66f3471aB1E5a13C6C8E9e17203B4EFaF2D', qty: 50 },
        { address: '0xB57d8618AaB5dA16ef48B557ff150fDa53B7Cf0D', qty: 50 },
        { address: '0xBdAfdA054598558ecC6e8F9552A1355c72c26f58', qty: 50 },
        { address: '0x4A6D41513783B0023C4De563DE751e698E5F962a', qty: 50 },
        { address: '0x39f579f8472fE6a1191D859093fEe9aE4D3c409a', qty: 50 },
        { address: '0xDE36Aa44b09aD04538Ef232bA9bb6b822cB3A3D3', qty: 50 },
        { address: '0x1d7C23F37e15Dbf275dF373De214783bE8a65Ec4', qty: 50 },
        { address: '0x8e408A8cb51C975FE8376150B1c5D1331f9E3F1E', qty: 50 },
        { address: '0xAA2E7C0C762E73D6fd7d2c17E00C109fEB91EBB6', qty: 50 },
        { address: '0x4aeDfFDEac4bC6218a29dfBee9bBa0306E8A4Ca7', qty: 50 },
        { address: '0x92C132C15f12bA61A59D9B483263f409E642d330', qty: 50 },
        { address: '0x6A6a6e04579C93426A8e65e4268DF862Edc9bBF2', qty: 50 },
        { address: '0xde818aEbD0B99e8b9d5D04a7b8824d749ba6FbB9', qty: 50 },
        { address: '0xaF9463ADbFdE93E1Cc99f8024636CdBc5246Fa53', qty: 50 },
        { address: '0x38201e227eC0624906f214F4Aa4Fa6F4Cf0D1d76', qty: 50 },
        { address: '0xcDc41C9bc406685e674e1D4e4bF4369d4Bf08bb4', qty: 50 },
        { address: '0xA61371FFae7573A5e3043D25E22625010eCe1fd0', qty: 50 },
        { address: '0x93b953CE07C27Ee4ba46AE302AB099aF544acDfB', qty: 50 },
        { address: '0xc6ddD3E9e2debb5247877Fc16160963682b6d1B3', qty: 50 },
        { address: '0x01901688a35a7094EAFa505ffa587d15AeB5465d', qty: 50 },
        { address: '0xA602f382a7262e5d2Ca3924eE20E382d6E09dFb3', qty: 50 },
        { address: '0x2c0919D888acb6c505a0746881d42315269e00cE', qty: 50 },
        { address: '0x5868C525c939837bFd8930044C9269A5C2816Fd6', qty: 50 },
        { address: '0x5deD2743649cbfbF5849C44525cFcB23b8aBADAe', qty: 50 },
        { address: '0xA424400dd0b902BF287e6f9eBDE1D3FA2Cd9CdC3', qty: 50 },
        { address: '0x33Ff506f763A2Ca65031dF42b717F00831bF265F', qty: 50 },
        { address: '0x7f459174b55CF63cB85AdFd7eA6F8EBD4eAADEbc', qty: 50 },
        { address: '0x8B972577f77d994323Aa6ef60aFdC8E160686D44', qty: 50 },
        { address: '0x7A0620D17Cb73131425cc89A080f1374a8943846', qty: 50 },
        { address: '0x070af7F4f08c99809b40B6CEdcC89F8336C5B04E', qty: 50 },
        { address: '0x0175029133873c3C855aB955c368060409B9d527', qty: 50 },
        { address: '0x897f1569a22Ab89ED2ED363acAF9b8613EDd27a7', qty: 50 },
        { address: '0xD73a2C2f34588C496B7317F203c2564D5CCD2319', qty: 50 },
        { address: '0x2b36be52ef1a874291dea59f6f45dac141bfdabd', qty: 50 },
        { address: '0x1F47Ad261CD065Ae294E41755b119ea0Cfa3E187', qty: 50 },
        { address: '0xf816f374C5A26c5c00BDE1CC7703c06fb619Baa3', qty: 50 },
        { address: '0x36B3bEA0aC8431Ce54F48CB81eb05001c143466A', qty: 50 },
        { address: '0x9f0a099db850a6945207366A2164dCd79E75D3a6', qty: 50 },
        { address: '0x941418B80b30716dC908d7c0a2CdaC6BCf9B634c', qty: 50 },
        { address: '0xCD973A06743A41341F0a1e5F13e9dB73961816E9', qty: 50 },
        { address: '0xD078abd803E47AE5C5B95d4343997676BE9C8458', qty: 50 },
        { address: '0x89c4a115f50C7D2bc48394B3530c6ec013E8cEb3', qty: 50 },
        { address: '0x94Cb4600FCCefd16408f7020AB64D8E0Fa7AA61D', qty: 50 },
        { address: '0x000AffF3F35EA25B39e07C7E5B01C98778C3C6fA', qty: 50 },
        { address: '0xa7e729943DA6D7258017D133Acdd9315Bef2f805', qty: 50 },
        { address: '0x2B5161c1D1EE7C059E6528B0484C7550434C29d1', qty: 50 },
        { address: '0x4a83d2e44afDf5B6C87e24fa0Dcd5F0AD42d26aC', qty: 50 },
        { address: '0x52C270450a55c79dD9BaCC1Ecc990A5Dbf2496ee', qty: 50 },
        { address: '0x0d5958b734d528EE979853Dad79728EF18900eD1', qty: 50 },
        { address: '0x658596F6CEb09b60240003a53548Cd72F7421728', qty: 50 },
        { address: '0x44Fc64EC231687da05E119210A047d9aD40C8699', qty: 50 },
        { address: '0xd9680f8db17B872764a2BB45F3d2c9eF73e1a1dE', qty: 50 },
        { address: '0x369443134fb7cbc759f8a2bb958e9e5abb804161', qty: 50 },
        { address: '0x7502792c4648C548793274Cf0C3f662b321f7373', qty: 50 },
        { address: '0xe142f89F8b99673D2f3A15c48A2926e0008c87f0', qty: 50 },
        { address: '0xf6266b0bCa87121a8AC42E85E1A29017090caB2A', qty: 50 },
        { address: '0x7Ea45F210B25E02474db4fafeb3582139faaC16A', qty: 50 },
        { address: '0x4FAaE1Fa3860813c5Beb45C919FCb6EdE48124C7', qty: 50 },
        { address: '0x0DedcA4951c9F5aFCfd8fFD3456eEa6271AbeEC2', qty: 50 },
        { address: '0x59a306f79006E50D31798c6aaA7f042E324997aA', qty: 50 },
        { address: '0x3E207be84f0dCFDaB83a4eE5b90757c791D2c963', qty: 50 },
        { address: '0x6c4E83dB8d4789E5db140326e15d0d712F69b3c1', qty: 50 },
        { address: '0xFdC6fB7716175Aa71715BDe10438011908a5722D', qty: 50 },
        { address: '0x5750526d21809B0Fb39d48899DB3A3a17b3ec4a7', qty: 50 },
        { address: '0x23f0470f278eC5675cc31807e619aC2F27156C18', qty: 50 },
        { address: '0xaF20A004179372E108493a10BF66BdEf4f2D9E8f', qty: 50 },
        { address: '0x40d67cAa5cC51fa3f4d3f7015D354d86EE16b6bd', qty: 50 },
        { address: '0x0c691B4f2A18e50445151009341Cc6EC49999999', qty: 50 },
        { address: '0xC3593dD2971BD62B2C22b286D6229E37D516ef1a', qty: 50 },
        { address: '0xac30CCA79f52725151F97E68038D23211513F9c6', qty: 50 },
        { address: '0x8417F1827A43Ec92e48BD04db359bD59B3789a00', qty: 50 },
        { address: '0x3540C4c7736768061Fcd174ed0a6f067824198D2', qty: 50 },
        { address: '0x322C9C5B0c7BA50B06702dBE051FD37c939f6570', qty: 50 },
        { address: '0x45E9fE1FeC0Aa4FbBA78A9A8B353b3C2E8dc2e4d', qty: 50 },
        { address: '0xef9c68F67c24486c148Dc532f16dFAd7f4bBbB58', qty: 50 },
        { address: '0x72Df4024AC8167e7674F56E8dE5360B7cd46E1C5', qty: 50 },
        { address: '0xcDa0f4981F45Ba89cF27a3571f3eA68Da9f4e150', qty: 50 },
        { address: '0xc156124D67f8868e2D5F191C295b09F20Bf88D0e', qty: 50 },
        { address: '0xcBC2146cF2699940F039dCd08ba619D0bD6d8339', qty: 50 },
        { address: '0x7682DCBE45B4E563610Ea2879d8dD95a0FF6c403', qty: 50 },
        { address: '0x4613B82f7C87d11406B455414464fF3F495304cb', qty: 50 },
        { address: '0x0AB13dC09c78a449E7c3A9C2454C25dFdbb465b0', qty: 50 },
        { address: '0xd7007ba27B68779bb2B62535BfCf8B56CF23091f', qty: 50 },
        { address: '0x01805FA1d279434178E4dD73e848EaCCD93D9778', qty: 50 },
        { address: '0xE97562FB75dD09a0CD44F185c4C9B6FB07f05332', qty: 50 },
        { address: '0x75d6c938552E4d808Ca4e9881308972905fBD2CB', qty: 50 },
        { address: '0xBcdfF9cd33C047D10fba830B9E2fa70FC67B0288', qty: 50 }
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
        stdout: fs.createWriteStream("0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266-signed-coupons.txt"),
        stderr: fs.createWriteStream("errStdErr.txt"),
    });

    myLogger.log(StuffyBunnyWL);

}

getClaimCodes()






