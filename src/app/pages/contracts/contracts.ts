import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-contracts',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule
  ],
  templateUrl: './contracts.html',
  styleUrl: './contracts.scss'
})
export class Contracts implements AfterViewInit {

  displayedColumns: string[] = [
    'type',
    'licensee',
    'location',
    'endDate',
    'status',
    'annualFee'
  ];

  dataSource = new MatTableDataSource<any>();

  searchText = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor() {
    const contracts = [
      {
        type: 'Catering',
        licensee: 'Amber Foods',
        location: 'PF-4/5',
        endDate: new Date('2026-03-20'),
        annualFee: 3200000
      },
      {
        type: 'Parking',
        licensee: 'Falcon Transport',
        location: 'Main Gate',
        endDate: new Date('2025-02-15'),
        annualFee: 1699999
      },
      {
        type: 'Catering',
        licensee: 'Green Star',
        location: 'Concourse',
        endDate: new Date('2024-01-10'),
        annualFee: 2100000
      }
    ];

    this.dataSource.data = contracts;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter() {
    this.dataSource.filter = this.searchText.trim().toLowerCase();
  }

  getStatus(endDate: Date): { status: string; color: string } {
    const today = new Date();
    const diffDays = Math.ceil(
      (endDate.getTime() - today.getTime()) / (1000 * 3600 * 24)
    );

    if (diffDays < 0) return { status: 'Expired', color: 'red' };
    if (diffDays <= 30)
      return { status: 'Expiring Soon', color: 'orange' };

    return { status: 'Active', color: 'green' };
  }
  exportToExcel() {
  const worksheet = XLSX.utils.json_to_sheet(this.dataSource.data);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Contracts');
  XLSX.writeFile(workbook, 'contracts.xlsx');
}
}