import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { decrement, increment } from './store/actions/counterAction';
import { IReduxRootState } from './store/reducer';

export function CounterComponent() {
  const count: number = useSelector((state: IReduxRootState) => {
    return state.counterInfo.counter;
  });

  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}
