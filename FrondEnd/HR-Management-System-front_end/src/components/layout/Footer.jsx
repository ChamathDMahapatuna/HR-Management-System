import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-light border-top py-4 mt-5">
      <Container>
        <Row className="align-items-center">
          <Col md={6} className="text-center text-md-start mb-3 mb-md-0">
            <div className="d-flex align-items-center justify-content-center justify-content-md-start">
              <i className="fas fa-users me-2 text-primary-custom" style={{ fontSize: '1.5rem' }}></i>
              <div>
                <h6 className="mb-1 fw-bold text-primary-custom">HR Management System</h6>
                <p className="small text-muted mb-0">Streamline your HR operations</p>
              </div>
            </div>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p className="text-muted mb-0">
              © {currentYear} HR Management System. All rights reserved.
            </p>
            <div className="mt-2">
              <small className="text-muted">
                <i className="fas fa-code me-1"></i>
                Built with React & Bootstrap
              </small>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 