import { Component, OnInit } from '@angular/core';
import { EthService } from '../services/eth.service';

const runeAddress = '0xdee02d94be4929d26f67b64ada7acf1914007f10';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  runePrice = 0.00008;
  ethPrice = 280;
  funds = [
    {
      name: 'LIQUIDITY FUND',
      description: 'Used to tokenise existing digital assets on to THORChain. Assets are chosen through community feedback',
      ethAddress: '0x7ad1ef362ba60a2a6cc78ef008c2041a40cf9398',
      rune: 0,
      eth: 0,
      total: 0
    },
    {
      name: 'DEVELOPMENT FUND',
      description: 'Allocated to research and development grants for the protocol. Awarded through a competitive selection process.',
      ethAddress: '0x8359ffaeefc5f10c507e49715c2992c5831a136d',
      rune: 0,
      eth: 0,
      total: 0
    },
    {
      name: 'OPERATIONAL FUND',
      description: 'Used by the Foundation for operational expenses. Budgets are determined every 6 months.',
      ethAddress: '0x5c8fd6852434300ce3326a6c2b84be6d4aa03b57',
      rune: 0,
      eth: 0,
      total: 0
    }
  ];
  constructor(private ethService: EthService) { }

  ngOnInit() {
    this.updateDistributionAmount();
    this.ethService.getEthereumPrice();
  }

  get runePriceUSD() {
    return this.runePrice * this.ethPrice ;
  }
  async updateDistributionAmount() {
    for (let i = 0; i < this.funds.length; i++) {
      if (this.funds[i].ethAddress !== '') {
      this.funds[i].eth = this.ethService.getEthBalanceAtAddress(this.funds[i].ethAddress);
      this.funds[i].rune = this.ethService.getTokenBalanceAtAddress(this.funds[i].ethAddress, runeAddress, 18);
      }
    }
  }

  convertToLocaleString(variable) {
   const withCommas = parseFloat(variable).toFixed(2);
   return withCommas.replace(/\d(?=(\d{3})+\.)/g, '$&,');
  }

  getDollarsAmountFromRune(runeAmount) {
    console.log('calculating rune @0.008/rune ' + runeAmount);
    const result = (runeAmount * (this.runePrice * this.ethPrice) );
    console.log(result);
    return result;
  }

  getDollarsAmountFromEth(ethAmount) {
    return ((ethAmount * this.ethService.getEthereumPrice()));
  }
  getTotalDollarsAmount(runeAmount, ethAmount) {
    return this.getDollarsAmountFromEth(ethAmount) + this.getDollarsAmountFromRune(runeAmount);
  }
}
