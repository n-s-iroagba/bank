import React, { useState } from 'react';
import { 
  Table, 
  Button, 
  Badge, 
  Pagination, 
  Spinner, 
  Form, 
  Row, 
  Col, 
  InputGroup,
  Dropdown,
  Card
} from 'react-bootstrap';
import { 
  Edit, 
  Trash2, 
  Eye, 
  Filter, 
  Search, 
  Download, 
  ChevronDown, 
  ChevronUp,
  ArrowUpDown
} from 'lucide-react';

import { Transaction, PaginationInfo, TransactionWithDetails } from '../../../types';
import { useCheckingAccounts } from '../../../hooks/useCheckingAccount';
import { useSecondParties } from '../../../hooks/useSecondParty';
import { useDeleteTransaction } from '../../../hooks/useTransaction';


interface TransactionListProps {
  transactions: TransactionWithDetails[];
  pagination?: PaginationInfo;
  isLoading: boolean;
  onEdit: (transaction: TransactionWithDetails) => void;
  onView: (transaction: TransactionWithDetails) => void;
  onRefetch: (params?: any) => void;
  showFilters?: boolean;
}

type SortField = 'createdAt' | 'amount' | 'type' | 'description' | 'balanceAfter';
type SortOrder = 'asc' | 'desc';

const TransactionList: React.FC<TransactionListProps> = ({
  transactions,
  pagination,
  isLoading,
  onEdit,
  onView,
  onRefetch,
  showFilters = true
}) => {
  const [sortField, setSortField] = useState<SortField>('createdAt');
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'debit' | 'credit'>('all');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  const deleteTransactionMutation = useDeleteTransaction();
  const { data: secondPartiesResponse } = useSecondParties({ page: 1, limit: 100 });
  const { data: checkingAccountsResponse } = useCheckingAccounts({ page: 1, limit: 100 });

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      try {
        await deleteTransactionMutation.mutateAsync(id);
        onRefetch();
      } catch (error) {
        console.error('Error deleting transaction:', error);
      }
    }
  };

  const handleSort = (field: SortField) => {
    if (field === sortField) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
    onRefetch({ sortBy: field, sortOrder: sortOrder });
  };

  const handleSearch = () => {
    onRefetch({ 
      search: searchTerm,
      type: typeFilter !== 'all' ? typeFilter : undefined
    });
  };

  const handlePageChange = (page: number) => {
    onRefetch({ page });
  };

  const handleFilterChange = (filter: string, value: any) => {
    onRefetch({ [filter]: value, page: 1 });
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setTypeFilter('all');
    onRefetch({ 
      search: undefined, 
      type: undefined, 
      page: 1 
    });
  };

  const formatAmount = (amount: number, type: 'debit' | 'credit') => {
    const formatted = new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
    
    return type === 'debit' ? `-${formatted}` : `+${formatted}`;
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getSortIcon = (field: SortField) => {
    if (field !== sortField) return <ArrowUpDown size={14} />;
    return sortOrder === 'asc' ? <ChevronUp size={14} /> : <ChevronDown size={14} />;
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading transactions...</p>
      </div>
    );
  }

  const hasFilters = searchTerm || typeFilter !== 'all';

  return (
    <div>
      {/* Filters */}
      {showFilters && (
        <Card className="mb-4">
          <Card.Header className="d-flex justify-content-between align-items-center">
            <h6 className="mb-0">
              <Filter size={18} className="me-2" />
              Filters
            </h6>
            <Button
              variant="link"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            >
              {showAdvancedFilters ? 'Hide Advanced' : 'Show Advanced'}
            </Button>
          </Card.Header>
          <Card.Body>
            <Row>
              <Col md={6}>
                <InputGroup>
                  <Form.Control
                    type="text"
                    placeholder="Search by description, account number, or second party..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                  />
                  <Button variant="outline-secondary" onClick={handleSearch}>
                    <Search size={18} />
                  </Button>
                </InputGroup>
              </Col>
              <Col md={3}>
                <Form.Select
                  value={typeFilter}
                  onChange={(e) => setTypeFilter(e.target.value as any)}
                >
                  <option value="all">All Types</option>
                  <option value="debit">Debit</option>
                  <option value="credit">Credit</option>
                </Form.Select>
              </Col>
              <Col md={3}>
                <div className="d-flex gap-2">
                  <Button variant="outline-secondary" onClick={handleSearch}>
                    Apply Filters
                  </Button>
                  {hasFilters && (
                    <Button variant="outline-danger" onClick={handleClearFilters}>
                      Clear
                    </Button>
                  )}
                </div>
              </Col>
            </Row>

            {showAdvancedFilters && (
              <Row className="mt-3">
                <Col md={4}>
                  <Form.Select
                    onChange={(e) => handleFilterChange('secondPartyId', e.target.value)}
                  >
                    <option value="">All Second Parties</option>
                    {secondPartiesResponse?.data?.data?.map((party) => (
                      <option key={party.id} value={party.id}>
                        {party.name}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={4}>
                  <Form.Select
                    onChange={(e) => handleFilterChange('checkingAccountId', e.target.value)}
                  >
                    <option value="">All Accounts</option>
                    {checkingAccountsResponse?.data?.data?.map((account) => (
                      <option key={account.id} value={account.id}>
                        {account.accountNumber}
                      </option>
                    ))}
                  </Form.Select>
                </Col>
                <Col md={4}>
                  <Button variant="outline-secondary">
                    <Download size={18} className="me-2" />
                    Export
                  </Button>
                </Col>
              </Row>
            )}
          </Card.Body>
        </Card>
      )}

      {/* Transactions Table */}
      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>
                <Button
                  variant="link"
                  className="p-0 text-decoration-none text-dark"
                  onClick={() => handleSort('createdAt')}
                >
                  Date & Time {getSortIcon('createdAt')}
                </Button>
              </th>
              <th>Type</th>
              <th>
                <Button
                  variant="link"
                  className="p-0 text-decoration-none text-dark"
                  onClick={() => handleSort('amount')}
                >
                  Amount {getSortIcon('amount')}
                </Button>
              </th>
              <th>Description</th>
              <th>Account Number</th>
              <th>Second Party</th>
              <th>
                <Button
                  variant="link"
                  className="p-0 text-decoration-none text-dark"
                  onClick={() => handleSort('balanceAfter')}
                >
                  Balance After {getSortIcon('balanceAfter')}
                </Button>
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="align-middle">
                <td>
                  <div className="text-nowrap">
                    {formatDate(new Date(transaction?.createdAt))}
                  </div>
                </td>
                <td>
                  <Badge bg={transaction.type === 'credit' ? 'success' : 'danger'}>
                    {transaction.type.toUpperCase()}
                  </Badge>
                </td>
                <td className={transaction.type === 'credit' ? 'text-success' : 'text-danger'}>
                  <strong>{formatAmount(transaction.amount, transaction.type)}</strong>
                </td>
                <td>
                  <div className="text-truncate" style={{ maxWidth: '200px' }} title={transaction.description}>
                    {transaction.description}
                  </div>
                </td>
                <td>
                  {transaction.checkingAccount?.accountNumber || 'N/A'}
                </td>
                <td>
                  {transaction.secondParty?.name || 'N/A'}
                  {transaction.secondParty?.bank && (
                    <small className="text-muted d-block">
                      {transaction.secondParty.bank.name}
                    </small>
                  )}
                </td>
                <td>
                  <strong>
                    {new Intl.NumberFormat('en-US', {
                      style: 'currency',
                      currency: 'USD'
                    }).format(transaction.balanceAfter)}
                  </strong>
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => onView(transaction)}
                      title="View Details"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onEdit(transaction)}
                      title="Edit Transaction"
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(transaction.id)}
                      disabled={deleteTransactionMutation.isPending}
                      title="Delete Transaction"
                    >
                      <Trash2 size={16} />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Empty State */}
      {transactions.length === 0 && (
        <div className="text-center py-5">
          <div className="text-muted mb-3">
            <Filter size={48} />
          </div>
          <h5>No transactions found</h5>
          <p className="text-muted">
            {hasFilters 
              ? 'Try adjusting your filters to see more results.' 
              : 'There are no transactions to display.'
            }
          </p>
          {hasFilters && (
            <Button variant="outline-primary" onClick={handleClearFilters}>
              Clear Filters
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {pagination && pagination.totalPages > 1 && (
        <div className="d-flex justify-content-between align-items-center mt-4">
          <div className="text-muted">
            Showing {((pagination.currentPage - 1) * pagination.itemsPerPage) + 1} to{' '}
            {Math.min(pagination.currentPage * pagination.itemsPerPage, pagination.totalItems)} of{' '}
            {pagination.totalItems} transactions
          </div>
          
          <Pagination>
            <Pagination.First 
              disabled={pagination.currentPage === 1} 
              onClick={() => handlePageChange(1)}
            />
            <Pagination.Prev 
              disabled={pagination.currentPage === 1} 
              onClick={() => handlePageChange(pagination.currentPage - 1)}
            />
            
            {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
              const pageNum = Math.max(1, Math.min(
                pagination.currentPage - 2,
                pagination.totalPages - 4
              )) + i;
              
              return (
                <Pagination.Item
                  key={pageNum}
                  active={pageNum === pagination.currentPage}
                  onClick={() => handlePageChange(pageNum)}
                >
                  {pageNum}
                </Pagination.Item>
              );
            })}
            
            <Pagination.Next 
              disabled={pagination.currentPage === pagination.totalPages} 
              onClick={() => handlePageChange(pagination.currentPage + 1)}
            />
            <Pagination.Last 
              disabled={pagination.currentPage === pagination.totalPages} 
              onClick={() => handlePageChange(pagination.totalPages)}
            />
          </Pagination>

          <div className="text-muted">
            Page {pagination.currentPage} of {pagination.totalPages}
          </div>
        </div>
      )}
    </div>
  );
};

export default TransactionList;