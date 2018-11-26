import { ICryptoMetaData } from './crypto-metadata';

export interface ICryptoListingResponse {
    data: ICryptoListingData;
    metadata: ICryptoMetaData;
}

export class ICryptoListingData {
    id: number;
    name: string;
    symbol: string;
    // tslint:disable-next-line:variable-name
    website_slug: string;
    rank: number;
    // tslint:disable-next-line:variable-name
    circulating_supply: number;
    // tslint:disable-next-line:variable-name
    total_supply: number;
    // tslint:disable-next-line:variable-name
    max_supply: number;
    quotes: {
        USD: {
            price: number;
            volume_24h: number;
            market_cap: number;
            percent_change_1h: number;
            percent_change_24h: number;
            percent_change_7d: number;
        }
    };
    // tslint:disable-next-line:variable-name
    last_updated: number;
}

