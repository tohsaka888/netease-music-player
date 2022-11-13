import React, { createContext, useContext } from "react";
import { MusicPlayerProps } from "../type";

export const PropsContext = createContext<MusicPlayerProps>(null!);

function PropsController(
  props: MusicPlayerProps & { children: React.ReactNode }
) {
  return (
    <PropsContext.Provider value={props}>
      {props.children}
    </PropsContext.Provider>
  );
}

function usePlayerProps() {
  const props = useContext(PropsContext);
  return props;
}

export { usePlayerProps };
export default PropsController;
