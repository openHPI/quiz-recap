import { createContext } from 'react';

type AppContextType = {
  index: number;
  setIndex: (index: number) => void;
};

const AppContext = createContext<AppContextType>({} as AppContextType);

export default AppContext;
