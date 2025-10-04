"use client"

import { Card, Button } from "react-bootstrap"
import { CheckCircleIcon, ArrowUpCircleIcon } from "lucide-react"

interface TodoAlertProps {
  message: string
  link: string
}

export default function TodoAlert({ message, link }: TodoAlertProps) {
  const handleNavigate = () => {
    window.location.href = link
  }

  return (
    <Card
      className="mb-3 shadow-sm"
      style={{
        cursor: "pointer",
        border: "2px solid #1e3a8a",
        backgroundColor: "rgba(30,58,138,0.1)",
        transition: "background-color 0.3s ease",
      }}
      onClick={handleNavigate}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(30,58,138,0.2)"
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(30,58,138,0.1)"
      }}
    >
      <Card.Body className="d-flex flex-column align-items-center text-center gap-3">
        {/* Icon */}
        <div className="p-2 bg-primary-subtle rounded-circle">
          <CheckCircleIcon className="w-6 h-6 text-primary" />
        </div>

        {/* Content */}
        <div>
          <Card.Title className="text-primary fw-semibold mb-2">
            Admin Action Required
          </Card.Title>
          <Card.Text className="text-primary">{message}</Card.Text>
        </div>

        {/* Button */}
        <Button
          variant="outline-primary"
          onClick={(e) => {
            e.stopPropagation() // prevent card click
            handleNavigate()
          }}
          className="d-inline-flex align-items-center gap-2"
        >
          <span>Take Action</span>
          <ArrowUpCircleIcon className="w-4 h-4" />
        </Button>
      </Card.Body>
    </Card>
  )
}
