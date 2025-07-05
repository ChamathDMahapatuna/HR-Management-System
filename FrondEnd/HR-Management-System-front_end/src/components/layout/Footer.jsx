import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={6} className="text-center text-md-start">
            <h5>HR Management System</h5>
            <p className="small">Manage your organization's human resources efficiently</p>
          </Col>
          <Col md={6} className="text-center text-md-end">
            <p>© {currentYear} HR Management System. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer; 