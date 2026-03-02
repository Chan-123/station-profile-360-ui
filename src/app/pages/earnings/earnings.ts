import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpenditureService } from '../../services/expenditure';
import { TrafficUnreservedService } from '../../services/traffic-unreserved';
import { TrafficReservedService } from '../../services/traffic-reserved';
import { TrafficTicketCheckingService } from '../../services/traffic-ticket-checking';
@Component({
  selector: 'app-earnings',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './earnings.html',
  styleUrls: ['./earnings.scss']
})
export class Earnings implements OnInit {

  // ==============================
  // STATIC EARNINGS CARDS
  // ==============================
  earningsData = {
    unreserved: { avgPerDay: 2700136, total2024: 1011323290 },
    reserved: { avgPerDay: 36471, total2024: 13312059 },
    parcel: { avgPerDay: 1285828, total2024: 482919894 },
    ticketChecking: { avgPerDay: 22837, total2024: 11631132 },
    retiringRoom: { total2024: 6924084 }
  };

  // ==============================
  // EXPENDITURE
  // ==============================
  form!: FormGroup;
  list: any[] = [];
  editId: string | null = null;

  // ==============================
  // TRAFFIC - UNRESERVED
  // ==============================
  unreservedForm!: FormGroup;
  unreservedList: any[] = [];
  unreservedEditId: string | null = null;

    // RESERVED
  reservedForm!: FormGroup;
  reservedList: any[] = [];
  reservedEditId: string | null = null;

  // TICKET CHECKING
  ticketForm!: FormGroup;
  ticketList: any[] = [];
  ticketEditId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private service: ExpenditureService,
    private unreservedService: TrafficUnreservedService,
    private reservedService: TrafficReservedService,
    private ticketService: TrafficTicketCheckingService
  ) {}

  ngOnInit() {

    // Expenditure Form
    this.form = this.fb.group({
      contractHead: ['', Validators.required],
      licenseeName: ['', Validators.required],
      term: [''],
      fromDate: [''],
      toDate: [''],
      contractValue: [''],
      remarks: ['']
    });

    // Unreserved Form
    this.unreservedForm = this.fb.group({
      avgTicketsPerDay: [''],
      avgPassengersPerDay: [''],
      avgEarningsPerDay: ['']
    });

    // Load Data
    this.loadExpenditure();
    this.loadUnreserved();

    this.reservedForm = this.fb.group({
    avgTransactionsPerDay: [''],
    avgEarningsPerDay: [''],
    year: [''],
    totalTransactions: [''],
    totalEarnings: ['']
  });

  this.loadReserved();

    this.ticketForm = this.fb.group({
    staffWorking: [''],
    avgCasesPerDay: [''],
    avgEarningsPerDay: [''],
    year: [''],
    totalCases: [''],
    totalEarnings: ['']
  });

  this.loadTicketChecking();
  }

  // =====================================
  // EXPENDITURE METHODS
  // =====================================

  loadExpenditure() {
    this.service.getAll()
      .subscribe(data => this.list = data);
  }

  onSubmit() {
    if (this.form.invalid) return;

    if (this.editId) {
      this.service.update(this.editId, this.form.value)
        .subscribe(() => {
          this.loadExpenditure();
          this.form.reset();
          this.editId = null;
        });
    } else {
      this.service.create(this.form.value)
        .subscribe(() => {
          this.loadExpenditure();
          this.form.reset();
        });
    }
  }

  edit(item: any) {
    this.form.patchValue(item);
    this.editId = item._id;
  }

  delete(id: string) {
    this.service.delete(id)
      .subscribe(() => this.loadExpenditure());
  }

  // =====================================
  // UNRESERVED METHODS
  // =====================================

  loadUnreserved() {
    this.unreservedService.getAll()
      .subscribe(data => this.unreservedList = data);
  }

  saveUnreserved() {
    if (this.unreservedForm.invalid) return;

    if (this.unreservedEditId) {
      this.unreservedService.update(
        this.unreservedEditId,
        this.unreservedForm.value
      ).subscribe(() => {
        this.loadUnreserved();
        this.unreservedForm.reset();
        this.unreservedEditId = null;
      });
    } else {
      this.unreservedService.create(
        this.unreservedForm.value
      ).subscribe(() => {
        this.loadUnreserved();
        this.unreservedForm.reset();
      });
    }
  }

  editUnreserved(item: any) {
    this.unreservedForm.patchValue(item);
    this.unreservedEditId = item._id;
  }

  deleteUnreserved(id: string) {
    this.unreservedService.delete(id)
      .subscribe(() => this.loadUnreserved());
  }
  // RESERVED METHODS

loadReserved() {
  this.reservedService.getAll()
    .subscribe(data => this.reservedList = data);
}

saveReserved() {
  if (this.reservedForm.invalid) return;

  const payload = {
    avgTransactionsPerDay: this.reservedForm.value.avgTransactionsPerDay,
    avgEarningsPerDay: this.reservedForm.value.avgEarningsPerDay,
    yearlyData: [
      {
        year: this.reservedForm.value.year,
        totalTransactions: this.reservedForm.value.totalTransactions,
        totalEarnings: this.reservedForm.value.totalEarnings
      }
    ]
  };

  if (this.reservedEditId) {
    this.reservedService.update(this.reservedEditId, payload)
      .subscribe(() => {
        this.loadReserved();
        this.reservedForm.reset();
        this.reservedEditId = null;
      });
  } else {
    this.reservedService.create(payload)
      .subscribe(() => {
        this.loadReserved();
        this.reservedForm.reset();
      });
  }
}

editReserved(item: any) {
  this.reservedForm.patchValue({
    avgTransactionsPerDay: item.avgTransactionsPerDay,
    avgEarningsPerDay: item.avgEarningsPerDay,
    year: item.yearlyData?.[0]?.year,
    totalTransactions: item.yearlyData?.[0]?.totalTransactions,
    totalEarnings: item.yearlyData?.[0]?.totalEarnings
  });
  this.reservedEditId = item._id;
}

deleteReserved(id: string) {
  this.reservedService.delete(id)
    .subscribe(() => this.loadReserved());
}

// ===============================
// TICKET CHECKING METHODS
// ===============================

loadTicketChecking() {
  this.ticketService.getAll()
    .subscribe(data => this.ticketList = data);
}

saveTicketChecking() {

  if (this.ticketForm.invalid) return;

  const payload = {
    staffWorking: this.ticketForm.value.staffWorking,
    avgCasesPerDay: this.ticketForm.value.avgCasesPerDay,
    avgEarningsPerDay: this.ticketForm.value.avgEarningsPerDay,
    yearlyData: [
      {
        year: this.ticketForm.value.year,
        totalCases: this.ticketForm.value.totalCases,
        totalEarnings: this.ticketForm.value.totalEarnings
      }
    ]
  };

  if (this.ticketEditId) {
    this.ticketService.update(this.ticketEditId, payload)
      .subscribe(() => {
        this.loadTicketChecking();
        this.ticketForm.reset();
        this.ticketEditId = null;
      });
  } else {
    this.ticketService.create(payload)
      .subscribe(() => {
        this.loadTicketChecking();
        this.ticketForm.reset();
      });
  }
}

editTicket(item: any) {
  this.ticketForm.patchValue({
    staffWorking: item.staffWorking,
    avgCasesPerDay: item.avgCasesPerDay,
    avgEarningsPerDay: item.avgEarningsPerDay,
    year: item.yearlyData?.[0]?.year,
    totalCases: item.yearlyData?.[0]?.totalCases,
    totalEarnings: item.yearlyData?.[0]?.totalEarnings
  });

  this.ticketEditId = item._id;
}

deleteTicket(id: string) {
  this.ticketService.delete(id)
    .subscribe(() => this.loadTicketChecking());
}
}