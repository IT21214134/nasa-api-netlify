import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../firebase/config.js";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

function PasswordResetModal({ show, handleClose }) {
  const [email, setEmail] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setShowSuccessMessage(true);
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Reset Password</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {showSuccessMessage ? (
          <Alert variant="success">
            Email has sent! Check your email for password reset guidelines.
          </Alert>
        ) : (
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
          />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        {!showSuccessMessage && (
          <Button variant="primary" onClick={handlePasswordReset}>
            Send Password Reset Email
          </Button>
        )}
      </Modal.Footer>
    </Modal>
  );
}

export default PasswordResetModal;
