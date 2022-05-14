// import { ethers } from "ethers";

// function getEth(){
//     // @ts-ignore
//     const eth = window.ethereum;
//     if(!eth){
//         throw new Error("Get metamask and a positive attitude");
//     }
//     return eth;
// }

// async function hasAccounts() {
//     const eth = getEth();
//     const accounts = await eth.request({method: "eth_accounts"}) as string[];

//     return accounts && accounts.length;
// }

// async function requestAccounts() {
//     const eth = getEth();
//     const accounts = await eth.request({method: "eth_requestAccounts"}) as string[];

//     return accounts && accounts.length;
// }

// async function run() {
//     if(! await hasAccounts() && ! await requestAccounts()){
//         throw new Error("BSDK, Metamask ka access de");
//     }

//     const hello = new ethers.Contract("0x5fbdb2315678afecb367f032d93f642f64180aa3",["function hello() public pure returns (string memory)",],new ethers.providers.Web3Provider(getEth()))

//     document.body.innerHTML = await hello.hello();
// }

// run();


import { ethers } from "ethers";
import Counter from "../artifacts/contracts/Counter.sol/Counter.json";

function getEth(){
    // @ts-ignore
    const eth = window.ethereum;
    if(!eth){
        throw new Error("Get metamask and a positive attitude");
    }
    return eth;
}

async function hasAccounts() {
    const eth = getEth();
    const accounts = await eth.request({method: "eth_accounts"}) as string[];

    return accounts && accounts.length;
}

async function requestAccounts() {
    const eth = getEth();
    const accounts = await eth.request({method: "eth_requestAccounts"}) as string[];

    return accounts && accounts.length;
}

async function run() {
    if(! await hasAccounts() && ! await requestAccounts()){
        throw new Error("BSDK, Metamask ka access de");
    }

    const counter = new ethers.Contract(process.env.CONTRACT_ADDRESS,
        Counter.abi,
        new ethers.providers.Web3Provider(getEth()).getSigner())

    const el = document.createElement("div");
    async function setCounter(count?) {
        el.innerHTML = count || await counter.getCounter();
    }
    setCounter();

    const button = document.createElement("button");
    button.innerText = "increment";
    button.onclick = async function() {
        await counter.count();
        // await tx.wait();
        // setCounter();
    }

    counter.on(counter.filters.CounterInc(),function(count) {
        setCounter(count);
    })

    document.body.appendChild(el);
    document.body.appendChild(button);
}

run();

