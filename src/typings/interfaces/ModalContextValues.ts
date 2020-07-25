export interface ModalContextValues {
  isOpen: boolean;
  openModal: (type: string, objectid?: number) => void;
  closeModal: () => void;
  type: 'book-ticket' | undefined;
  objectId?: number;
}
