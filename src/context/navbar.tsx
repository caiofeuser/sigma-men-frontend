"use client";
import { createContext, useState, useContext } from "react";

export interface NavbarContextType {
  isOpenCart: boolean;
  setIsOpenCart: (isOpenCart: boolean) => void;
  setIsNavbarVisible: (isNavbarVisible: boolean) => void;
  isNavbarVisible: boolean;
  shouldCloseCartMenu: boolean;
  setShouldCloseCartMenu: (shouldCloseCartMenu: boolean) => void;
}

const NavbarContext = createContext({} as NavbarContextType);

export function NavabarWrapper({ children }: { children: React.ReactNode }) {
  const [isOpenCart, setIsOpenCart] = useState<boolean>(false);
  const [isNavbarVisible, setIsNavbarVisible] = useState<boolean>(true);
  const [shouldCloseCartMenu, setShouldCloseCartMenu] = useState<boolean>(true);

  return (
    <NavbarContext.Provider
      value={{
        isOpenCart,
        setIsOpenCart,
        setIsNavbarVisible,
        isNavbarVisible,
        shouldCloseCartMenu,
        setShouldCloseCartMenu,
      }}
    >
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbarContext() {
  return useContext(NavbarContext);
}
