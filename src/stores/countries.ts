import { defineStore } from 'pinia'
import type { Country, State } from './countries.model';

const useCountriesStore = defineStore('countries', {
  state: (): State => ({ countries: [], selectedCountry: null, regions:[], darkMode: true, loading: false}),
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
          { label: 'Languages', value: this.selectedCountry?.languages ? Object.values(this.selectedCountry.languages).join(', ') : '' },
      ]
    },
    filterCountries: (state) => {
        let result = state.countries;
        if (state.selectedRegion) {
          result = result.filter((country: Country) => country['region'] === state.selectedRegion)
        }

        if (state.search) {
          result = result.filter((country: Country) => country.name.common.toLowerCase().includes(state.search))
        }
        return result
    },
    getCountry: (state) => (code: string) => {
      return state.countries.find(country => country.cca3 === code)
    },
    getBorderNames: (state) => (borders: any[]) => {
      return borders.map(border => {
        return {cca3: border, name: state.countries.find(c => c.cca3 === border)?.name.common || border}
      });
    }
  },
  actions: {
    async fetchCountries() {
      this.loading = true
      fetch('https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,borders,cca3')
      .then(response => response.json())
      .then(
        data => {
          this.countries = data;
          const regions = data.flatMap((country: Country) => country.region)
          this.regions = regions.filter((value: string, index: number, array: string[]) => array.indexOf(value) === index)
        }
      ).finally(() => this.loading = false);
    },
    async fetchCountry(name: string) {
      this.loading = true
      fetch(`https://restcountries.com/v3.1/name/${name}`)
      .then(response => response.json())
      .then(
        data => {
          this.selectedCountry = data.at(0);
        }
      ).finally(() => this.loading = false);
    },
    toggleDarkMode() {
      this.darkMode = !this.darkMode
    }
  },
});

export default useCountriesStore;