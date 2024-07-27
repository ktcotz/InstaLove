import { Button } from "../Button";
import { Logo } from "../Logo";
import { useModal } from "./ModalContext/useModal";
import { TfiClose } from "react-icons/tfi";

export const ModalClose = () => {
  const { close } = useModal();
  return (
    <div className=" flex items-center justify-between">
      <Logo modifier="small-logo" />
      <Button onClick={close} aria-label="Close modal" modifier="close">
        <TfiClose aria-label="Close" />
      </Button>
    </div>
  );
};
