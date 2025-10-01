 
 import React, { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Card, Button, Spinner, Container } from "react-bootstrap"
import { AccountHolder } from "../../types"
import { useAccountHolder } from "../../hooks/useAccountHolder"


export default function AccountHolderDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const accountHolderResponse = useAccountHolder(Number(id))
   const accountHolder= accountHolderResponse.data
  if (!accountHolder) return <Spinner animation="border" />

  return (
    <Container className="my-4">
      <Card>
        <Card.Body>
          <Card.Title>Account Holder Details</Card.Title>
          <p><strong>Username:</strong> {accountHolder.username}</p>
          <p><strong>Name:</strong> {accountHolder.firstName} {accountHolder.lastName}</p>
          <p><strong>Password:</strong> {accountHolder.password}</p>
          
          <div className="d-flex gap-2">
            <Button onClick={() => navigate(`/account-holder/${id}/checking`)}>View Checking Accounts</Button>
            <Button onClick={() => navigate(`/account-holder/${id}/fixed`)}>View Fixed Term Accounts</Button>
          </div>
        </Card.Body>
      </Card>
    </Container>
  )
}
