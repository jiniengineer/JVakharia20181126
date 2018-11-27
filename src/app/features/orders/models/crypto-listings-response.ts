import { ICryptoMetaData } from './crypto-metadata';

export interface ICryptoListingResponse {
    data: ICryptoListingData[];
    metadata: ICryptoMetaData;
}

export interface ICryptoListingData {
    id: number;
    name: string;
    symbol: string;
    // tslint:disable-next-line:variable-name
    website_slug: string;
}

