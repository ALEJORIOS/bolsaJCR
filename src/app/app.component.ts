import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Bolsa JCR';
  prices: number[] = [208,224,257,263,270,250,199,183,160,173];
  currentRound: number = 0;
  currentPrice = this.prices[this.currentRound];
  currentStock:number = 0;
  currentCash: number = 1000;
  passwords:string[] =  ["chucho", "pablito", "deivid", "marcus", "juancho", "james", "mateito", "pedrusco", "esteban"];
  quantity: number = 0;
  password: string = "";

  constructor() {
    let checkProgress: string | null = localStorage.getItem("flagPoint");
    let progress: any;
    if(checkProgress) {
      this.currentRound = JSON.parse(checkProgress).round;
      this.currentCash = JSON.parse(checkProgress).cash;
      this.currentStock = JSON.parse(checkProgress).stocks;
    }
  }

  buy() {
    const total: number = this.quantity * this.currentPrice;
    if(total < this.currentCash) {
      this.currentCash -= total;
      this.currentStock += this.quantity;
    }
  }

  sell() {
    if(this.quantity <= this.currentStock) {
      this.currentStock -= this.quantity;
      this.currentCash += this.quantity * this.currentPrice;
    }
  }

  changeRound() {
    if(this.password === "Diosito") {
      localStorage.removeItem("flagPoint");
      location.reload();
    }
    if(this.password === this.passwords[this.currentRound]) {
      this.currentRound++;
      this.quantity = 0;
      this.password = "";
      const flagPoint: any = {
        cash: this.currentCash,
        stocks: this.currentStock,
        round: this.currentRound
      }
      localStorage.setItem("flagPoint", JSON.stringify(flagPoint));
    }
  }
}
