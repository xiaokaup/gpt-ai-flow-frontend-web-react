import React, { useEffect, DependencyList } from 'react';

export function useDebounceEffect(fn: () => void, waitTime: number, deps?: DependencyList) {
  useEffect(() => {
    const t = setTimeout(() => {
      if (!deps) deps = [];
      fn.apply(undefined, deps as []);
    }, waitTime);

    return () => {
      clearTimeout(t);
    };
  }, deps);
}
