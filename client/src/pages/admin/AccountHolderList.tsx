import { ListGroup, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { AccountHolder } from "../../types/AccountHolder";


const AccountHolderList: React.FC<{ accountHolders: AccountHolder[] }> = ({ accountHolders }) => {
  const navigate = useNavigate();

  const handleNavigateToDetail = (accountHolderId: number) => {
    navigate(`/account-holder-detail/${accountHolderId}`);
  };

  return (
    <div>
      <h5>Account Holders</h5>
      <ListGroup>
        {accountHolders.map((accountHolder) => (
          <ListGroup.Item key={accountHolder.id} className="d-flex justify-content-between align-items-center">
            <div className="fw-bold">
              {accountHolder.firstName} {accountHolder.surname}
            </div>
            <div>
              <Button
                variant="link"
                onClick={() => handleNavigateToDetail(accountHolder.id)}
                className="text-primary"
              >
                More
              </Button>
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
    </div>
  );
};

export default AccountHolderList;
