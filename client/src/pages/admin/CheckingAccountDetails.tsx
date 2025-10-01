import React, { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Card, Button, Spinner, Container } from "react-bootstrap"
import { CheckingAccount } from "../../types";


export default function CheckingAccountDetailsPage() {
  const { accountId, id } = useParams<{ accountId: string; id: string }>() // id = accountHolderId
  const navigate = useNavigate()
  const [account, setAccount] = useState<CheckingAccount | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock fetch - replace with API call
    setTimeout(() => {
      const mockAccount: CheckingAccount = {
        id: Number(accountId),
        accountNumber: "CHK001",
        balance: 2500,
        accountHolderId: Number(id),
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setAccount(mockAccount)
      setLoading(false)
    }, 500)
  }, [accountId, id])

  if (loading) return <Spinner animation="border" />

  if (!account) return <p>Account not found</p>

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title>Checking Account Details</Card.Title>
          <p><strong>Account Number:</strong> {account.accountNumber}</p>
          <p><strong>Balance:</strong> ${account.balance.toFixed(2)}</p>
          <p><strong>Status:</strong> {account.isActive ? "Active" : "Inactive"}</p>
          <p><strong>Created At:</strong> {account.createdAt?.toLocaleDateString()}</p>
          <p><strong>Last Updated:</strong> {account.updatedAt?.toLocaleDateString()}</p>

          <div className="d-flex gap-2 mt-3">
            <Button
              onClick={() => navigate(`/account-holder/${id}/checking/${account.id}/transactions`)}
              variant="primary"
            >
              View Transactions
            </Button>
            <Button
              variant="secondary"
              onClick={() => navigate(`/account-holder/${id}/checking`)}
            >
              Back to Checking Accounts
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
