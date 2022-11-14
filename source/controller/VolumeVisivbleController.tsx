import React, {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useState,
} from "react";

const VolumeVisibleContext = createContext<boolean>(null!);
const DispatchVolumeVisibleContext = createContext<
  Dispatch<SetStateAction<boolean>>
>(null!);

type Props = {
  children: ReactNode;
};

function VolumeVisivbleController({ children }: Props) {
  const [volumeVisible, setVolumeVisible] = useState<boolean>(false);
  return (
    <VolumeVisibleContext.Provider value={volumeVisible}>
      <DispatchVolumeVisibleContext.Provider value={setVolumeVisible}>
        {children}
      </DispatchVolumeVisibleContext.Provider>
    </VolumeVisibleContext.Provider>
  );
}

function useVolumeVisible() {
  const volumeVisible = useContext(VolumeVisibleContext)!;
  return volumeVisible;
}

function useDispatchVolumeVisible() {
  const dispatchVolumeVisible = useContext(DispatchVolumeVisibleContext)!;
  return dispatchVolumeVisible;
}

export { useVolumeVisible, useDispatchVolumeVisible };
export default VolumeVisivbleController;
