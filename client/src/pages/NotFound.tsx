import React from 'react';
import { Alert, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

interface NotFoundProps {
  message?: string;
}

const NotFound: React.FC<NotFoundProps> = ({ message = 'Page not found' }) => {
  return (
    <div className="text-center">
      <Alert variant="danger" className="mb-4">
        <Alert.Heading>404 - Not Found</Alert.Heading>
        <p>{message}</p>
      </Alert>
      <Link to="/">
        <Button variant="primary">
          <Home size={18} className="me-2" />
          Go to Home
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;