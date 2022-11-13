import React, { createContext, useContext, useState } from "react";

const DurationContext = createContext<number>(0);
const DispatchDurationContext = createContext<React.Dispatch<
  React.SetStateAction<number>
> | null>(null);

type Props = {
  children: React.ReactNode;
};

function DurationController({ children }: Props) {
  const [duration, setDuration] = useState<number>(0);
  return (
    <DurationContext.Provider value={duration}>
      <DispatchDurationContext.Provider value={setDuration}>
        {children}
      </DispatchDurationContext.Provider>
    </DurationContext.Provider>
  );
}

export function useDuration() {
  const duration = useContext(DurationContext)!;
  return duration;
}

export function useDispathDuration() {
  const dispath = useContext(DispatchDurationContext)!;
  return dispath;
}

export default DurationController;
