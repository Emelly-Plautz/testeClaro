import { DetailedHTMLProps, HTMLAttributes, RefObject, ReactNode } from "react";
import Button from "react-bootstrap/Button";
import Modal, { ModalProps } from "react-bootstrap/Modal";
import { Omit, BsPrefixProps } from "react-bootstrap/esm/helpers";
import { JSX } from "react/jsx-runtime";
export function MyVerticallyCenteredModal(
  props: JSX.IntrinsicAttributes &
    Omit<
      Omit<
        DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>,
        "ref"
      > & {
        ref?:
          | ((instance: HTMLDivElement | null) => void)
          | RefObject<HTMLDivElement>
          | null
          | undefined;
      },
      BsPrefixProps<"div"> & ModalProps
    > &
    BsPrefixProps<"div"> &
    ModalProps & { children?: ReactNode }
) {
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Order Confirmed
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <h4>Thanks!</h4>
        <p>
          Your order has been received about your cake of type {props.cake}!
          <br></br>
          And we will soon prepare it for delivery {props.name}, we will contact
          you with the email {props.email} or phone number {props.phone}.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
