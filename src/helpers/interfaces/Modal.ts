interface ModalProps {
  message: string;
  setMessage: SetModalMessage;
}

type SetModalMessage = (message: string) => void;

export type { ModalProps, SetModalMessage };
