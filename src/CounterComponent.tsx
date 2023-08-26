import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { decrement, increment } from "./store/actions/counterAction";

export function CounterComponent() {
  const count: number = useSelector((state) => {
    return (state as any).counterReducer.counter;
  }) as number;

  const dispatch = useDispatch();

  return (
    <div>
      <button onClick={() => dispatch(decrement())}>-</button>
      {count}
      <button onClick={() => dispatch(increment())}>+</button>
    </div>
  );
}
