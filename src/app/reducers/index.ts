import {
  MetaReducer, createFeatureSelector,
} from '@ngrx/store';
import { Params, RouterStateSnapshot } from '@angular/router';
import { ActionReducer, combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import { storeLogger } from 'ngrx-store-logger';
import { routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import * as fromRouter from '@ngrx/router-store';

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

export interface AppState {
  router: fromRouter.RouterReducerState<RouterStateUrl>;
}

const modules = {
  'router': routerReducer
};

export const syncReducers = {
  router: routerReducer
};

export const getRouterState = createFeatureSelector<
  fromRouter.RouterReducerState<RouterStateUrl>
>('router');

export class CustomSerializer implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;
    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}


const deepCombineReducers = (allReducers: any) => {
  Object.getOwnPropertyNames(allReducers).forEach((prop) => {
    if (allReducers.hasOwnProperty(prop)
      && allReducers[prop] !== null
      && typeof allReducers[prop] !== 'function') {
      allReducers[prop] = deepCombineReducers(allReducers[prop]);
    }
  });
  return combineReducers(allReducers);
};

const createReducer = (asyncReducers = {}) => {
  const allReducers = { ...syncReducers, ...asyncReducers };
  return deepCombineReducers(allReducers);
};

// Generate a reducer to set the root state in dev mode for HMR
function stateSetter(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state: any, action: any) {
    if (action.type === 'SET_ROOT_STATE') {
      return action.payload;
    }
    return reducer(state, action);
  };
}

function logout(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state: AppState, action: any): AppState {
    if (action.type === '[Order] Logout Success') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export function resetOnLogout(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function (state, action) {
    let newState;
    if (action.type === '[Order] Logout Success') {
      newState = Object.assign({}, state);
      Object.keys(modules).forEach((key) => {
        newState[key] = modules[key]['initialState'];
      });
    }
    return reducer(newState || state, action);
  };
}

export const DEV_REDUCERS: MetaReducer<AppState>[] = [stateSetter, storeFreeze];
// set in constants.js file of project root
if (['logger', 'both'].indexOf(STORE_DEV_TOOLS) !== -1) {
  DEV_REDUCERS.push(storeLogger());
}

