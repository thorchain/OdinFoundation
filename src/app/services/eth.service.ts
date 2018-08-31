import { Injectable } from '@angular/core';
import { debug } from 'util';
import Web3 from 'web3';

declare let require: any;
declare let window: any;

@Injectable({
  providedIn: 'root'
})
// This service should be called upon whenever you need any Web3-based functions
export class EthService {
  private _account: string = null;
  private _web3: any;
  private _tokenContract: any;

  constructor() {
    if (typeof window.web3 !== 'undefined') {
      this._web3 = new Web3(window.web3.currentProvider);
    }
  }
  async getEthAmountFromAddress(address) {
    let amount;
    this._web3.eth.getBalance(address).then(balance => {
      console.log('balance :' + this._web3.utils.fromWei(balance, 'ether'));
      amount = this._web3.utils.fromWei(balance, 'ether');
      console.log('amount :' + amount);
    });
    return amount;
  }

  async createTransaction(userAddress, targetAddress, value) {
     this._web3.eth.sendTransaction({
      to: targetAddress,
      from: userAddress,
      value: this._web3.utils.toWei(value, 'ether')
    });
  }

  async checkNetwork() {
    this._web3.eth.net.getNetworkType((err, netId) => {
      switch (netId) {
        case 'main':
          console.log('This is mainnet');
          return 'main';
        case 'morden':
          console.log('This is the deprecated Morden test network.');
          return 'morden';
        case 'ropsten':
          console.log('This is the ropsten test network.');
          return 'ropsten';
        case 'rinkeby':
          console.log('This is the Rinkeby test network.');
          return 'rinkeby';
        case 'kovan':
          console.log('This is the kovan test network.');
          return 'kovan';
        default:
          console.log('This is an unknown network.');
      }
    });
  }

  /** JSON Parser */
  getJSON(url) {
    let resp;
    let xmlHttp;
    resp = '';
    xmlHttp = new XMLHttpRequest();
    if (xmlHttp != null) {
      xmlHttp.open('GET', url, false);
      xmlHttp.send(null);
      resp = xmlHttp.responseText;
    }
    return JSON.parse(resp);
  }

  getEthereumPrice() {
    const cmcApi = 'https://api.coinmarketcap.com/v1/ticker/ethereum/';
    const result = (this.getJSON(cmcApi));
    return Math.floor(result[0].price_usd);
  }

  getTokenBalanceAtAddress(targetAddress, tokenAddress, precision) {
    const etherscanApi = 'https://api.etherscan.io/api?module=account&action=tokenbalance&contractaddress='; // the API link.
    const etherscanApiToken = etherscanApi + tokenAddress; // change this value if you want to use other token.
    const tokensAtAddress = etherscanApiToken + '&address=' + targetAddress + '&tag=latest';
    const result = Math.floor(this.getJSON(tokensAtAddress).result / (Math.pow(10, precision)));
    return result;
  }

  getEthBalanceAtAddress(targetAddress) {
    const etherscanApi = 'https://api.etherscan.io/api?module=account&action=balance&address=' + targetAddress;
    console.log(this.getJSON(etherscanApi).result);
    return this.getJSON(etherscanApi).result / (Math.pow(10, 18));
  }
}
