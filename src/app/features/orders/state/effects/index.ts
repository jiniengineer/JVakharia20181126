import { OrderEffects } from './order.effect';
import { CurrencyTypesEffects } from './currencytype.effect';

export const effects: any[] = [CurrencyTypesEffects, OrderEffects];

export * from './currencytype.effect';
export * from './order.effect';
