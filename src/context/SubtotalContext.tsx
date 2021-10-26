import { createContext, ReactNode } from 'react';
import useStateWithStorage from 'hooks/useStateWithStorage';

export const Context = createContext<{
  subtotal?: number;
  setSubtotal?: (value: number) => void;
}>({});

const SubtotalContext = ({ children }: { children: ReactNode }) => {
  const [subtotal, setSubtotal] = useStateWithStorage<number>('subtotal', 0);

  return (
    <Context.Provider
      value={{
        subtotal,
        setSubtotal,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default SubtotalContext;
