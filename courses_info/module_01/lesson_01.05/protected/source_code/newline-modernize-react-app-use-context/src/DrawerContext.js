import { createContext } from "react";

const DrawerContext = createContext({
  showDrawer: undefined,
  toggleDrawerState: () => {}
});

export default DrawerContext;
