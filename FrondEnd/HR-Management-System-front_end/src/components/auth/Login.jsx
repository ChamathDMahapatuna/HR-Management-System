import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Card, Alert, Spinner } from 'react-bootstrap';
import AuthService from '../../services/AuthService';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await AuthService.login(username, password);
      navigate('/dashboard');
    } catch (err) {
      setError(
        err.response?.data?.message || 
        err.response?.data || 
        'An error occurred during login. Please try again.'
      );
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
                    <i className="fas fa-users" style={{ fontSize: '3rem', color: '#3498db' }}></i>
                  </div>
                  <h2 className="fw-bold text-primary-custom mb-2">Welcome Back</h2>
                  <p className="text-muted">Sign in to your HR Management System</p>
                </div>

                {error && (
                  <Alert variant="danger" className="border-0 rounded-3">
                    <i className="fas fa-exclamation-triangle me-2"></i>
                    {error}
                  </Alert>
                )}

                <Form onSubmit={handleLogin}>
                  <Form.Group className="mb-4">
                    <Form.Label className="fw-semibold text-muted mb-2">
                      <i className="fas fa-user me-2"></i>
                      Username
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
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
                      placeholder="Enter your password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
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
                          Signing In...
                        </>
                      ) : (
                        <>
                          <i className="fas fa-sign-in-alt me-2"></i>
                          Sign In
                        </>
                      )}
                    </Button>
                  </div>
                </Form>

                <div className="text-center">
                  <p className="text-muted mb-0">
                    Don't have an account?{' '}
                    <Link to="/register" className="text-decoration-none fw-semibold">
                      Create one here
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

export default Login; 