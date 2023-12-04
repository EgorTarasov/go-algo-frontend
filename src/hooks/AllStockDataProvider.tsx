import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import moexApiInstance, { SecuritiesInfoRequest } from '../services/apiMoex';
import { IMarketdatum } from '../models/IMarketdatum';
import { ISecurity } from '../models/ISecurity';

interface StockContextProps {
  stocks: IMarketdatum[];
  setStocks: React.Dispatch<React.SetStateAction<IMarketdatum[]>>;
  currentStock: IMarketdatum | null;
  setCurrentStock: React.Dispatch<React.SetStateAction<IMarketdatum | null>>;
}

const StockContext = createContext<StockContextProps | null>(null);

export function AllStockProvider({ children }: { children: ReactNode }) {
  const [stocks, setStocks] = useState<IMarketdatum[]>([]);
  const [currentStock, setCurrentStock] = useState<IMarketdatum | null>(null);

  useEffect(() => {
    const fetch = async () => {
      const data = await moexApiInstance.getSecuritiesInfo({
        ...SecuritiesInfoRequest,
        ticker: "",
      });
      if (data[1]?.marketdata && data[1]?.securities) {
        const marketdata = data[1].marketdata;
        const securities = data[1].securities;

        const securitiesMap = securities.reduce((map: { [key: string]: ISecurity }, security: ISecurity) => {
          map[security.SECID] = security;
          return map;
        }, {});

        const stocks = marketdata.map((datum: IMarketdatum) => {
          const security = securitiesMap[datum.SECID];
          return {
            ...datum,
            SHORTNAME: security?.SHORTNAME,
          };
        });
        setStocks(stocks);
      }
    };
    fetch();
    const intervalId = setInterval(fetch, 5000); 
    return () => clearInterval(intervalId);
}, []);


  const value = { stocks, setStocks, currentStock, setCurrentStock };

  return (
    <StockContext.Provider value={value}>
      {children}
    </StockContext.Provider>
  );
}

export function useAllStock() {
  return useContext(StockContext);
}
