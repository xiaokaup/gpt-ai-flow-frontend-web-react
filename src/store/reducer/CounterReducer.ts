const initialState = { counter: 0 };

export interface ICounterReducerState {
  counter: number;
}

export const counterReducer = (
  state: ICounterReducerState = initialState,
  action: { type: any }
) => {
  switch (action.type) {
    case "INCREMENT":
      return { ...state, counter: state.counter + 1 };
    case "DECREMENT":
      return { ...state, counter: state.counter - 1 };
    default:
      return state;
  }
};
