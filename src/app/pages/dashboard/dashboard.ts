import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { ContractsService } from '../../services/contracts';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss'
})
export class Dashboard implements OnInit {

  contracts: any[] = [];
  expiringContracts = 0;

  constructor(private contractService: ContractsService) {}

  ngOnInit() {
    this.contractService.getContracts().subscribe((data: any[]) => {
      this.contracts = data;

      this.contracts.forEach(c => {
        if (c.endDate) {
          c.endDate = new Date(c.endDate);
        }
      });

      this.calculateExpiring();
    });
  }

  calculateExpiring() {
    const today = new Date();

    this.expiringContracts = this.contracts.filter(c => {
      if (!c.endDate) return false;

      const diffDays = Math.ceil(
        (c.endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
      );

      return diffDays <= 30 && diffDays >= 0;
    }).length;
  }
}