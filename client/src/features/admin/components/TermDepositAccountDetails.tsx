import { Row, Col, Button } from "react-bootstrap";

const TermDepositAccountDetails = ({ clientId }: { clientId: number }) => (
    <Row>
      <Col lg={3} md={4} sm={12}>
        <Button variant="info" className="w-100 mb-2" >
          View Term Deposit Account Details
        </Button>
      </Col>
      <Col lg={3} md={4} sm={12}>
        <Button variant="info" className="w-100 mb-2">
          Edit Term Deposit Account Details
        </Button>
      </Col>
    </Row>
  );
  export default TermDepositAccountDetails