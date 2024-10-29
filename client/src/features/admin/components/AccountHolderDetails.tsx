import { Row, Col, Button } from "react-bootstrap";


const AccountHolderDetails = ({ clientId }: { clientId: number }) => (
    <Row>
      <Col lg={3} md={4} sm={12}>
        <Button variant="info" className="w-100 mb-2" >
          Edit Account Holder Details
        </Button>
      </Col>
      <Col lg={3} md={4} sm={12}>
        <Button variant="danger" className="w-100 mb-2">
          Delete Client
        </Button>
      </Col>
    </Row>
  );
export default AccountHolderDetails;  