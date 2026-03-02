import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ExpenditureService } from '../../services/expenditure';
import { TrafficUnreservedService } from '../../services/traffic-unreserved';

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

  constructor(
    private fb: FormBuilder,
    private service: ExpenditureService,
    private unreservedService: TrafficUnreservedService
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
}