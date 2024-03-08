export interface State {
    countries: Country[];
    selectedCountry: Country | null;
    regions: string[];
    selectedRegion?: string;
    search?: string;
    darkMode: boolean;
    loading: boolean;
}

export interface Country {
    name: {common: string; official: string; nativeName: any};
    flags: {png: string; svg: string; alt: string};
    population: number;
    region: string;
    subregion: string;
    capital: string[];
    tld: string[];
    borders: string[];
    currencies: { [k:string]: {name: string; symbol: string}};
    languages: { [k:string]: string };
    cca3: string;
}