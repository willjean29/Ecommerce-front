import { Modal, Button } from "react-bootstrap";
interface ModalProps {
  isVisible: boolean;
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  children?: React.ReactNode;
  title: string;
  description: string;
  onSuccess: () => void;
}

const ModalApp: React.FC<ModalProps> = ({
  isVisible,
  setIsVisible,
  children = null,
  title,
  description,
  onSuccess,
}) => {
  const closeModal = () => setIsVisible(false);
  return (
    <Modal show={isVisible} onHide={closeModal}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <span> {description} </span>
        {children}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={closeModal}>
          Close
        </Button>
        <Button variant="primary" onClick={onSuccess}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalApp;
