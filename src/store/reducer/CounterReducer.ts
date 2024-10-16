import { IAction } from '../store';

const initialState = { counter: 0 };

export interface ICounterReducerState {
  counter: number;
}

export const counterReducer = (state: ICounterReducerState = initialState, action: IAction) => {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, counter: state.counter + 1 };
    case 'DECREMENT':
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};
