import React, { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { Card, Spinner, Container } from "react-bootstrap"
import { FixedTermDeposit } from "../../types"

export default function FixedTermDepositDetailsPage() {
  const { accountId } = useParams<{ accountId: string }>()
  const [account, setAccount] = useState<FixedTermDeposit | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Mock fetch - replace with API call
    setTimeout(() => {
      const mockAccount: FixedTermDeposit = {
        id: Number(accountId),
        accountNumber: "FTD001",
        balance: 5000,
        term: 12,
        interestRate: 5,
        maturityDate: new Date(new Date().setMonth(new Date().getMonth() + 12)),
        accountHolderId: 1,
        isActive: true,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
      setAccount(mockAccount)
      setLoading(false)
    }, 500)
  }, [accountId])

  if (loading) return <Spinner animation="border" />

  if (!account) return <p>Account not found</p>

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title>Fixed Term Deposit Details</Card.Title>
          <p><strong>Account Number:</strong> {account.accountNumber}</p>
          <p><strong>Balance:</strong> ${account.balance.toFixed(2)}</p>
          <p><strong>Term:</strong> {account.term} months</p>
          <p><strong>Interest Rate:</strong> {account.interestRate}%</p>
          <p><strong>Maturity Date:</strong> {account.maturityDate.toLocaleDateString()}</p>
          <p><strong>Status:</strong> {account.isActive ? "Active" : "Inactive"}</p>
          <p><strong>Created At:</strong> {account.createdAt?.toLocaleDateString()}</p>
          <p><strong>Last Updated:</strong> {account.updatedAt?.toLocaleDateString()}</p>
        </Card.Body>
      </Card>
    </Container>
  )
}
