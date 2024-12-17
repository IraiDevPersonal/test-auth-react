import { useCallback, useEffect, useRef } from "react";

export function useMountEffect<T extends any[]>(callback: () => void, deps: T) {
  const hasMounted = useRef(false);
  const memoizedCallback = useCallback(callback, [callback, ...deps]);

  useEffect(() => {
    if (hasMounted.current) return;

    memoizedCallback();

    hasMounted.current = true;
  }, [memoizedCallback]);
}
