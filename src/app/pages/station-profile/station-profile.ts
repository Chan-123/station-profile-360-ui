import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-station-profile',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  templateUrl: './station-profile.html',
  styleUrl: './station-profile.scss'
})
export class StationProfile {

  stationForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.stationForm = this.fb.group({
      stationName: ['', Validators.required],
      stationCode: ['', Validators.required],
      category: ['', Validators.required],
      platforms: ['', Validators.required],
      suburbanFootfall: [''],
      nonSuburbanFootfall: [''],
      dailyEarnings: [''],
      acWaitingHall: ['No'],
      executiveLounge: ['No'],
      cloakRoom: ['No'],
      parkingAvailable: ['No'],
      cateringContracts: this.fb.array([]),
      parkingContracts: this.fb.array([])
    });
  }

    // 🔹 Catering FormArray
  get cateringContracts(): FormArray {
    return this.stationForm.get('cateringContracts') as FormArray;
  }

  addCatering() {
    this.cateringContracts.push(
      this.fb.group({
        stallNo: [''],
        location: [''],
        licensee: [''],
        startDate: [''],
        endDate: [''],
        annualFee: ['']
      })
    );
  }

  removeCatering(index: number) {
    this.cateringContracts.removeAt(index);
  }

  // 🔹 Parking FormArray
  get parkingContracts(): FormArray {
    return this.stationForm.get('parkingContracts') as FormArray;
  }

  addParking() {
    this.parkingContracts.push(
      this.fb.group({
        type: ['2W'],
        area: [''],
        licensee: [''],
        startDate: [''],
        endDate: [''],
        annualFee: ['']
      })
    );
  }

  removeParking(index: number) {
    this.parkingContracts.removeAt(index);
  }

  getContractStatus(endDate: any): { status: string; color: string } {

  if (!endDate) {
    return { status: 'Not Set', color: 'gray' };
  }

  const today = new Date();
  const expiry = new Date(endDate);

  const diffTime = expiry.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 3600 * 24));

  if (diffDays < 0) {
    return { status: 'Expired', color: 'red' };
  }

  if (diffDays <= 30) {
    return { status: `Expiring in ${diffDays} days`, color: 'orange' };
  }

  return { status: 'Active', color: 'green' };
}

  onSubmit() {
    console.log(this.stationForm.value);
    alert('Station Profile Saved Successfully!');
  }
}