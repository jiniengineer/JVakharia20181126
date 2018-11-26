import * as Actions from './error.actions';

export interface ErrorState {
  error: any;
}

export function reducer(state: any = null, action: Actions.All) {
  switch (action.type) {
    case Actions.LOAD_GLOBAL_ERROR: {
      return { ...state, isLoading: false };
    }
    default:
      return state;
    }
}
