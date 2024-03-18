"use client";
import { createContext, useState, useContext } from "react";
import { CartItem, CartContextType } from "@/types";

const NavbarContext = createContext({
  isOpenCart: false,
  setIsOpenCart: (isOpenCart: boolean) => {},
  setIsNavbarVisible: (isNavbarVisible: boolean) => {},
  isNavbarVisible: true,
  shouldCloseCartMenu: true,
  setShouldCloseCartMenu: (shouldCloseCartMenu: boolean) => {},
});

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
