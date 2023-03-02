import { Component, OnInit } from '@angular/core';
import { CountryService } from '../services/country.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit{
  country: any;
  name: any;

  constructor(
    private countryService: CountryService,
    private router: ActivatedRoute
  ) {

  }

  ngOnInit() {
// this.getSingleCountry()
this.router.params.subscribe((param) => {
  this.name = param['name'];
  this.getSingleCountry(this.name);
})
  }

  getSingleCountry(name : any) {
    this.countryService.getCountryFilter('name',name).subscribe((res) => {
      this.country = res[0];
    })
  }

}
