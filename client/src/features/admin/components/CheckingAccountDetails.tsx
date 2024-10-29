import { Row, Col, Button } from "react-bootstrap";

const CheckingAccountDetails = ({ clientId }: { clientId: number }) => (
    <Row>
      <Col lg={3} md={4} sm={12}>
        <Button variant="info" className="w-100 mb-2" >
          Edit Account Details (no Transfers)
        </Button>
      </Col>
      <Col lg={3} md={4} sm={12}>
        <Button variant="secondary" className="w-100 mb-2">
          View Checking Account Details
        </Button>
      </Col>
    </Row>
  );
export default CheckingAccountDetails  