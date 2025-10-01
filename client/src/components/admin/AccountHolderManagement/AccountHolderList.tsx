import React, { Dispatch, SetStateAction, useState } from 'react';
import { Table, Button, Badge, Pagination, Spinner, Card, Row, Col } from 'react-bootstrap';
import { Edit, Trash2, Eye, Phone, User, Hash, Shield, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';
import '../../../styles/AccountHolderList.css'
import { useDeleteAccountHolder } from '../../../hooks/useAccountHolder';
import { useNavigate } from 'react-router-dom';
import { AccountHolder } from '../../../types';

interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  itemsPerPage: number;
  totalItems: number;
}

interface QueryType {
  page: number;
  limit: number;
  search?: string;
}

interface AccountHolderListProps {
  accountHolders: AccountHolder[];
  pagination?: PaginationInfo;
  isLoading: boolean;
  onEdit: (accountHolder: AccountHolder) => void;
  onRefetch: () => void;
  setParams: Dispatch<SetStateAction<QueryType>>;
}

const AccountHolderList: React.FC<AccountHolderListProps> = ({
  accountHolders,
  pagination,
  isLoading,
  onEdit,
  onRefetch,
  setParams
}) => {
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);
  const navigate = useNavigate()

  const deleteAccountHolderMutation = useDeleteAccountHolder();

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this second party? This action cannot be undone.')) {
      try {
        await deleteAccountHolderMutation.mutateAsync(id);
        onRefetch();
      } catch (error) {
        console.error('Error deleting second party:', error);
      }
    }
  };

  const handleViewDetails = (accountHolder: AccountHolder) => {
    navigate(`/admin/account-holder/${accountHolder.id}`);
  };



  if (isLoading) {
    return (
      <Card className="loading-card">
        <Card.Body className="text-center py-5">
          <div className="loading-container">
            <div className="dual-ring-spinner"></div>
            <h5 className="mt-4 text-slate-700 fw-semibold">Loading Account Holders</h5>
            <p className="text-slate-600 mb-0">Please wait while we fetch the data...</p>
          </div>
        </Card.Body>
      </Card>
    );
  }

  if (accountHolders.length === 0) {
    return (
      <Card className="empty-state-card">
        <Card.Body className="text-center py-5">
          <div className="empty-icon-wrapper">
            <User size={40} className="text-slate-400" />
          </div>
          <h4 className="fw-bold text-slate-800 mb-3">No Account Holders Found</h4>
          <p className="text-slate-600 mb-0">
            There are no account holders matching your current filters. Try adjusting your search criteria or create a new account holder.
          </p>
        </Card.Body>
      </Card>
    );
  }

  return (
    <div className="account-holder-list-container">
      {/* Desktop Table View */}
      <Card className="table-card d-none d-lg-block">
        <div className="table-responsive">
          <Table hover className="account-holder-table mb-0">
            <thead className="table-header">
              <tr>
                <th>ACCOUNT HOLDER</th>
                <th>CONTACT INFORMATION</th>
                <th>SECURITY</th>
           
                <th className="text-center">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {accountHolders.map((accountHolder, index) => (
                <tr 
                  key={accountHolder.id}
                  className={`account-row ${hoveredRow === accountHolder.id ? 'hovered' : ''}`}
                  onMouseEnter={() => setHoveredRow(accountHolder.id)}
                  onMouseLeave={() => setHoveredRow(null)}
                >
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="avatar-gradient">
                        <span className="avatar-text">
                          {accountHolder.firstName.charAt(0)}{accountHolder.lastName.charAt(0)}
                        </span>
                      </div>
                      <div className="ms-3">
                        <div className="holder-name">
                          {accountHolder.firstName} {accountHolder.lastName}
                        </div>
                        <small className="holder-id">
                          <Hash size={12} className="me-1" />
                          Account ID: {accountHolder.id}
                        </small>
                      </div>
                    </div>
                  </td>
                  <td>
                    <div className="contact-info">
                      <div className="d-flex align-items-center mb-1">
                        <Phone size={16} className="contact-icon me-2" />
                        <span className="contact-text">{accountHolder.phoneNumber}</span>
                      </div>
                      {accountHolder.email && (
                        <div className="email-text">{accountHolder.email}</div>
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="ssn-badge">
                      <Shield size={16} className="ssn-icon me-2" />
                      <span className="ssn-text">***-**-{accountHolder.ssn.slice(-4)}</span>
                    </div>
                  </td>
             
                  <td>
                    <div className="d-flex justify-content-center gap-2">
                      <Button 
                        size="sm" 
                        className="action-btn action-btn-view"
                        onClick={() => handleViewDetails(accountHolder)}
                      >
                        <Eye size={14} className="me-1" />
                        View
                      </Button>
                      <Button 
                        size="sm" 
                        className="action-btn action-btn-edit"
                        onClick={() => onEdit(accountHolder)}
                      >
                        <Edit size={14} className="me-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        className="action-btn action-btn-delete"
                        onClick={() => handleDelete(accountHolder.id)}
                      >
                        <Trash2 size={14} className="me-1" />
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Card>

      {/* Mobile Card View */}
      <div className="d-lg-none mobile-cards">
        {accountHolders.map((accountHolder, index) => (
          <Card key={accountHolder.id} className="mobile-card mb-3">
            <Card.Body>
              <div className="d-flex align-items-center justify-content-between mb-3">
                <div className="d-flex align-items-center">
                  <div className="avatar-gradient">
                    <span className="avatar-text">
                      {accountHolder.firstName.charAt(0)}{accountHolder.lastName.charAt(0)}
                    </span>
                  </div>
                  <div className="ms-3">
                    <div className="holder-name">
                      {accountHolder.firstName} {accountHolder.lastName}
                    </div>
                    <small className="holder-id">
                      <Hash size={12} className="me-1" />
                      ID: {accountHolder.id}
                    </small>
                  </div>
                </div>
              
              </div>

              <div className="mobile-info mb-3">
                <div className="d-flex align-items-center mb-2">
                  <Phone size={16} className="contact-icon me-2" />
                  <span className="contact-text">{accountHolder.phoneNumber}</span>
                </div>
                <div className="d-flex align-items-center mb-2">
                  <Shield size={16} className="ssn-icon me-2" />
                  <span className="ssn-text">***-**-{accountHolder.ssn.slice(-4)}</span>
                </div>
                {accountHolder.email && (
                  <div className="email-text ms-4">{accountHolder.email}</div>
                )}
              </div>

              <Row className="g-2">
                <Col xs={4}>
                  <Button 
                    size="sm" 
                    className="action-btn action-btn-view w-100"
                    onClick={() => handleViewDetails(accountHolder)}
                  >
                    <Eye size={14} className="me-1" />
                    View
                  </Button>
                </Col>
                <Col xs={4}>
                  <Button 
                    size="sm" 
                    className="action-btn action-btn-edit w-100"
                    onClick={() => onEdit(accountHolder)}
                  >
                    <Edit size={14} className="me-1" />
                    Edit
                  </Button>
                </Col>
                <Col xs={4}>
                  <Button 
                    size="sm" 
                    className="action-btn action-btn-delete w-100"
                    onClick={() => handleDelete(accountHolder.id)}
                  >
                    <Trash2 size={14} className="me-1" />
                    Delete
                  </Button>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        ))}
      </div>

      {/* Enhanced Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <Card className="pagination-card mt-4">
          <Card.Body>
            <Row className="align-items-center">
              <Col md={6} className="mb-3 mb-md-0">
                <p className="pagination-info mb-0">
                  Showing <strong className="text-crimson">{((pagination.currentPage - 1) * pagination.itemsPerPage) + 1}</strong> to{' '}
                  <strong className="text-crimson">
                    {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)}
                  </strong>{' '}
                  of <strong className="text-slate-900">{pagination.totalItems}</strong> results
                </p>
              </Col>
              <Col md={6}>
                <Pagination className="custom-pagination justify-content-md-end mb-0">
                  <Pagination.First 
                    disabled={pagination.currentPage === 1}
                    onClick={() => setParams((params) => ({...params, page: 1}))}
                  >
                    <ChevronsLeft size={16} />
                  </Pagination.First>
                  
                  <Pagination.Prev 
                    disabled={pagination.currentPage === 1}
                    onClick={() => setParams((params) => ({...params, page: pagination.currentPage - 1}))}
                  >
                    <ChevronLeft size={16} />
                  </Pagination.Prev>
                  
                  {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                    let pageNum;
                    if (pagination.totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (pagination.currentPage >= pagination.totalPages - 2) {
                      pageNum = pagination.totalPages - 4 + i;
                    } else {
                      pageNum = pagination.currentPage - 2 + i;
                    }
                    
                    return (
                      <Pagination.Item
                        key={pageNum}
                        active={pageNum === pagination.currentPage}
                        onClick={() => setParams((params) => ({...params, page: pageNum}))}
                      >
                        {pageNum}
                      </Pagination.Item>
                    );
                  })}
                  
                  <Pagination.Next 
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => setParams((params) => ({...params, page: pagination.currentPage + 1}))}
                  >
                    <ChevronRight size={16} />
                  </Pagination.Next>
                  
                  <Pagination.Last 
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() => setParams((params) => ({...params, page: pagination.totalPages}))}
                  >
                    <ChevronsRight size={16} />
                  </Pagination.Last>
                </Pagination>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default AccountHolderList;