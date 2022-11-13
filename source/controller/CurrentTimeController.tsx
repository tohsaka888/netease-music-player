import React, { createContext, useContext, useState } from "react";

type PlayTimeProps = { currentTime: number; bufferedTime: number };

const CurrentTimeContext = createContext<PlayTimeProps | null>(null);
const DispatchCurrentTimeContext = createContext<React.Dispatch<
  React.SetStateAction<PlayTimeProps>
> | null>(null!);

type Props = {
  children: React.ReactNode;
};

function CurrentTimeController({ children }: Props): JSX.Element {
  const [currentTime, setCurrentTime] = useState<PlayTimeProps>({
    currentTime: 0,
    bufferedTime: 0,
  });
  return (
    <CurrentTimeContext.Provider value={currentTime}>
      <DispatchCurrentTimeContext.Provider value={setCurrentTime}>
        {children}
      </DispatchCurrentTimeContext.Provider>
    </CurrentTimeContext.Provider>
  );
}

export function useCurrentTime() {
  const currentTime = useContext(CurrentTimeContext)!;
  return currentTime;
}

export function useDispathCurrentTime() {
  const dispath = useContext(DispatchCurrentTimeContext)!;
  return dispath;
}

export default CurrentTimeController;
