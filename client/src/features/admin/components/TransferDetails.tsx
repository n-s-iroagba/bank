import { Row, Col, Button } from "react-bootstrap";

const TransferDetails = ({ clientId }: { clientId: number }) => (
    <Row>
      <Col lg={3} md={4} sm={12}>
        <Button variant="success" className="w-100 mb-2" >
          Credit Account (with Visible Transfer)
        </Button>
      </Col>
      <Col lg={3} md={4} sm={12}>
        <Button variant="secondary" className="w-100 mb-2" >
          Credit Account (with no Transfer)
        </Button>
      </Col>
      <Col lg={3} md={4} sm={12}>
        <Button variant="danger" className="w-100 mb-2" >
          Debit Account (with Visible Transfer)
        </Button>
      </Col>
      <Col lg={3} md={4} sm={12}>
        <Button variant="warning" className="w-100 mb-2">
          Debit Account (with no Transfer)
        </Button>
      </Col>
    </Row>
  );
  export default TransferDetails