import React, { ReactNode, useContext, useState } from 'react';

type Tabs = 'home' | 'leader-board' | 'payment' | 'profile';

type TabsContext = {
  selectedTab: Tabs;
  setSelectedTab: React.Dispatch<React.SetStateAction<Tabs>>;
};

export const TabsContext = React.createContext<TabsContext>({} as TabsContext);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (context === undefined) {
    throw new Error('useTabContext must be used within a TabsContextProvider');
  }
  return context;
};

const TabsContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedTab, setSelectedTab] = useState<Tabs>('home');

  return (
    <TabsContext.Provider
      value={{
        selectedTab,
        setSelectedTab,
      }}
    >
      {children}
    </TabsContext.Provider>
  );
};

export default TabsContextProvider;
