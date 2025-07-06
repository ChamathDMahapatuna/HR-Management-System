import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../../services/AuthService';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Register as employee by default
      const response = await AuthService.register(
        formData.username,
        formData.email,
        formData.password,
        ['employee']
      );

      setSuccess('Registration successful! Please login.');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.response?.data || 
        'An error occurred during registration. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100 d-flex align-items-center" style={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5} xl={4}>
            <Card className="shadow-lg border-0">
              <Card.Body className="p-5">
                <div className="text-center mb-4">
                  <div className="mb-3">
                    <i className="fas fa-user-plus" style={{ fontSize: '3rem', color: '#3498db' }}></i>
                  </div>
                  <h2 className="fw-bold text-primary-custom mb-2">Create Account</h2>
                  <p className="text-muted">Join our HR Management System</p>
                </div>

                {error && (
                  <Alert variant="danger" className="border-0 rounded-3">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </Alert>
                )}

                {success && (
                  <Alert variant="success" className="border-0 rounded-3">
                    <i className="fas fa-check-circle me-2"></i>
                    {success}
                  </Alert>
                )}

                <Form onSubmit={handleRegister}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-muted mb-2">
                      <i className="fas fa-user me-2"></i>
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Choose a username"
                      value={formData.username}
                      onChange={handleChange}
                      required
                      minLength="3"
                      className="py-3"
                      disabled={loading}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-muted mb-2">
                      <i className="fas fa-envelope me-2"></i>
                      Email Address
                    </Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="py-3"
                      disabled={loading}
                    />
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-muted mb-2">
                      <i className="fas fa-lock me-2"></i>
                      Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Create a password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                      minLength="6"
                      className="py-3"
                      disabled={loading}
                    />
                    <Form.Text className="text-muted">
                      <i className="fas fa-info-circle me-1"></i>
                      Password must be at least 6 characters long.
                    </Form.Text>
                  </Form.Group>

                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-muted mb-2">
                      <i className="fas fa-lock me-2"></i>
                      Confirm Password
                    </Form.Label>
                    <Form.Control
                      type="password"
                      name="confirmPassword"
                      placeholder="Confirm your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                      className="py-3"
                      disabled={loading}
                    />
                  </Form.Group>

                  <div className="d-grid gap-2 mb-4">
                    <Button 
                      variant="primary" 
                      type="submit" 
                      disabled={loading}
                      className="py-3 fw-semibold"
                      size="lg"
                    >
                      {loading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                            className="me-2"
                          />
                          Creating Account...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-user-plus me-2"></i>
                          Create Account
                        </>
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Already have an account?{' '}
                    <Link to="/login" className="text-decoration-none fw-semibold">
                      Sign in here
                    </Link>
                  </p>
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register; 