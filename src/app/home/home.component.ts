import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {  debounceTime, distinctUntilChanged, switchMap } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  search = '';
  filterDrop = '';
  selectedValue = 'test';
  regions = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  countries: any;

  searchForm : FormGroup = new FormGroup({
    search: new FormControl('', [Validators.required])
  })

  constructor(
    private countryService: CountryService,
   
  ) {

  }

ngOnInit(): void {
  this.getCountries();
 
}

getCountries() {
  this.countryService.getCountries().subscribe((res: any) => {
    console.log(res)
    this.countries = res;
  })
}


onSearchChange(type: any) {
  if(this.searchForm.valid) {
    this.filterDrop = '';
    this.searchForm.get('search')?.valueChanges.pipe(
      debounceTime(1000),
      distinctUntilChanged(),
      switchMap((value : any) => 
        this.countryService.getCountryFilter(type,value)),
        ).subscribe((res) => {
          this.countries = res;
        }, err => {
          this.search = '';
          this.getCountries();
        })
      }
    }

    onRegionChange(type : any, event : any) {
      this.searchForm.get('search')?.setValue('');
      this.countryService.getCountryFilter(type, event.target.value).subscribe((res) => {
        this.countries = res;
      }, err => {
        this.search = '';
          this.getCountries();
      })
    }

}
