import { createContext, PropsWithChildren, use, useState } from "react";
import { createStore, StoreApi, useStore } from "zustand";

type CounterStore = {
  count: number;
  inc: () => void;
};

const CounterContext = createContext<StoreApi<CounterStore> | undefined>(
  undefined
);

type CounterProviderProps = PropsWithChildren & { initialCount: number };

export default function CounterProvider({
  initialCount,
  children,
}: CounterProviderProps) {
  const [store] = useState(() =>
    createStore<CounterStore>((set) => ({
      count: initialCount,
      inc: () => set((state) => ({ count: state.count + 1 })),
    }))
  );

  return <CounterContext value={store}>{children}</CounterContext>;
}

export function useCounterStore<T>(selector: (state: CounterStore) => T) {
  const context = use(CounterContext);

  if (!context) {
    throw new Error("useCounterStore must be used within a CounterProvider");
  }

  return useStore(context, selector);
}
