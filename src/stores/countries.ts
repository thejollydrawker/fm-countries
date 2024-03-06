import { defineStore } from 'pinia'

export interface State {
  countries: Country[];
  selectedCountry: Country | null;
  regions: any[];
  selectedRegion?: string;
  search?: string;
  darkMode: boolean
}

export interface Country {
  name: any;
  flags: any;
  population: number;
  region: string;
  subregion: string;
  capital: string[];
  tld: string[];
  currencies: any;
  languages: any;
}

const useCountriesStore = defineStore('countries', {
  state: (): State => ({ countries: [], selectedCountry: null, regions:[], darkMode: true}),
  getters: {
    getCountryInfo(): any[] {
      return [
          { label: 'Native Name', value: this.selectedCountry?.name ? Object.values(this.selectedCountry.name.nativeName)[0]?.common : '' },
          { label: 'Population', value: this.selectedCountry?.population },
          { label: 'Region', value: this.selectedCountry?.region },
          { label: 'Sub Region', value: this.selectedCountry?.subregion },
          { label: 'Capital', value: this.selectedCountry?.capital?.toString() },
          { label: 'Top Level Domain', value: this.selectedCountry?.tld?.toString() },
          { label: 'Currencies', value: this.selectedCountry?.currencies ? Object.values(this.selectedCountry.currencies)[0]?.name : '' },
          { label: 'Languages', value: this.selectedCountry?.languages ? Object.values(this.selectedCountry.languages).toString() : '' },
      ]
    },
    filterCountries: (state) => {
      return (filter?: {field: string, value: string}) => {
        if (filter) {
          return state.countries.filter((country: any) => country[filter.field] === filter.value)
        }
        return state.countries
      }
    }
  },
  actions: {
    async fetchCountries() {
      fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,borders')
      .then(response => response.json())
      .then(
        data => {
          this.countries = data;
          const regions = data.flatMap((country: any) => country.region)
          this.regions = regions.filter((value, index, array) => array.indexOf(value) === index)
        }
      );
    },
    async fetchCountry(name: string) {
      fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => response.json())
      .then(
        data => {
          this.selectedCountry = data.at(0);
        }
      );
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    }
  },
});

export default useCountriesStore;