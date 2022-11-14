import React, {
  createContext,
  Dispatch,
  SetStateAction,
  useContext,
  useState,
} from "react";

const VolumeContext = createContext<number>(null!);
const DispatchVolumeContext = createContext<Dispatch<SetStateAction<number>>>(
  null!
);

type Props = {
  children: React.ReactNode;
};

function VolumeController({ children }: Props) {
  const [volume, setVolume] = useState<number>(0);

  return (
    <VolumeContext.Provider value={volume}>
      <DispatchVolumeContext.Provider value={setVolume}>
        {children}
      </DispatchVolumeContext.Provider>
    </VolumeContext.Provider>
  );
}

function useVolume() {
  const volume = useContext(VolumeContext)!;
  return volume;
}

function useDispatchVolume() {
  const dispatchVolume = useContext(DispatchVolumeContext)!;
  return dispatchVolume;
}

export { useVolume, useDispatchVolume };
export default VolumeController;
