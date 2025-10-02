import React, { Dispatch, SetStateAction } from 'react';
import { Table, Button, Badge, Pagination, Spinner } from 'react-bootstrap';
import { Edit, Trash2, Eye, Calendar, Clock, Percent, DollarSign, User } from 'lucide-react';

import { FixedTermDeposit, PaginationInfo } from '../../../types';
import { useDeleteFixedDeposit } from '../../../hooks/useFixedDeposit';
import '../../../styles/FixedDepositList.css';
import { useNavigate} from 'react-router-dom';

export interface QueryType {
  page: number;
  limit: number;
}

interface FixedDepositListProps {
  deposits: FixedTermDeposit[];
  pagination?: PaginationInfo;
  isLoading: boolean;
  onEdit: (deposit: FixedTermDeposit) => void;
  onRefetch: () => void;
  setParams: Dispatch<SetStateAction<QueryType>>;
}

const FixedDepositList: React.FC<FixedDepositListProps> = ({
  deposits,
  pagination,
  isLoading,
  onEdit,
  onRefetch,
  setParams
}) => {
  const deleteDepositMutation = useDeleteFixedDeposit();
  const navigate= useNavigate()

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this fixed deposit account? This action cannot be undone.')) {
      try {
        await deleteDepositMutation.mutateAsync(id);
        onRefetch();
      } catch (error) {
        console.error('Error deleting fixed deposit:', error);
      }
    }
  };

  const handleViewDetails = (deposit: FixedTermDeposit) => {
     navigate(`/admin/account-details/fixed/${deposit.id}`)
  };

  const getMaturityStatus = (maturityDate: Date, isActive: boolean) => {
    if (!isActive) return 'Closed';
    const today = new Date();
    const maturity = new Date(maturityDate);
    return maturity < today ? 'Matured' : 'Active';
  };

  const getDaysUntilMaturity = (maturityDate: Date) => {
    const today = new Date();
    const maturity = new Date(maturityDate);
    const diffTime = maturity.getTime() - today.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (dateString: Date) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  if (isLoading) {
    return (
      <div className="loading-container-fixed">
        <Spinner animation="border" className="loading-spinner-fixed" />
        <div className="loading-text-fixed">Loading fixed deposits...</div>
      </div>
    );
  }

  if (deposits.length === 0) {
    return (
      <div className="empty-state-fixed">
        <Calendar size={48} className="empty-state-icon" />
        <div className="empty-state-text">No Fixed Deposit Accounts Found</div>
        <div className="empty-state-subtext">
          Create your first fixed deposit account to start earning higher interest rates.
        </div>
      </div>
    );
  }

  return (
    <div className="fixed-deposit-list">
      <div className="table-container-fixed">
        <Table className="table-custom-fixed">
          <thead>
            <tr>
              <th>ID</th>
              <th>Account Number</th>
              <th>Account Holder</th>
              <th>Balance</th>
              <th>Term</th>
              <th>Interest Rate</th>
              <th>Maturity Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit, index) => {
              const maturityStatus = getMaturityStatus(deposit.maturityDate, deposit.isActive);
              const daysUntilMaturity = getDaysUntilMaturity(deposit.maturityDate);
              
              return (
                <tr key={deposit.id} style={{ animationDelay: `${index * 0.05}s` }}>
                  <td className="id-cell-fixed">
                    <Badge bg="slate-200" text="slate-700" className="status-badge-fixed">
                      #{deposit.id}
                    </Badge>
                  </td>
                  <td className="account-number-cell-fixed">
                    <div className="d-flex align-items-center gap-2">
                      <Calendar size={16} className="text-slate-400" />
                      {deposit.accountNumber}
                    </div>
                  </td>
                  <td className="account-holder-cell-fixed">
                    <div className="d-flex align-items-center gap-2">
                      <User size={14} className="text-slate-400" />
                      Account Holder #{deposit.accountHolderId}
                    </div>
                  </td>
                  <td className="balance-cell-fixed">
                    <div className="d-flex align-items-center gap-2">
                      <DollarSign size={14} className="text-slate-400" />
                      {formatCurrency(deposit.balance)}
                    </div>
                  </td>
                  <td className="term-cell-fixed">
                    <div className="d-flex align-items-center gap-2 justify-content-center">
                      <Clock size={14} className="text-slate-400" />
                      {deposit.term} months
                    </div>
                  </td>
                  <td className="interest-cell-fixed">
                    <div className="d-flex align-items-center gap-2 justify-content-center">
                      <Percent size={14} className="text-green-500" />
                      {deposit.interestRate}%
                    </div>
                  </td>
                  <td className="date-cell-fixed">
                    <div className="d-flex align-items-center gap-2">
                      <Calendar size={14} className="text-slate-400" />
                      {formatDate(deposit.maturityDate)}
                    </div>
                    {maturityStatus === 'Active' && daysUntilMaturity <= 30 && (
                      <div className="maturity-warning">
                        {daysUntilMaturity} days left
                      </div>
                    )}
                  </td>
                  <td>
                    <Badge className={`status-badge-fixed ${
                      maturityStatus === 'Active' ? 'status-active-fixed' :
                      maturityStatus === 'Matured' ? 'status-matured-fixed' :
                      'status-closed-fixed'
                    }`}>
                      {maturityStatus}
                    </Badge>
                  </td>
                  <td>
                    <div className="action-buttons-fixed">
                      <Button
                        variant="outline"
                        className="btn-view-fixed"
                        onClick={() => handleViewDetails(deposit)}
                        title="View account details"
                      >
                        <Eye size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        className="btn-edit-fixed"
                        onClick={() => onEdit(deposit)}
                        disabled={!deposit.isActive}
                        title={!deposit.isActive ? 'Cannot edit closed accounts' : 'Edit fixed deposit'}
                      >
                        <Edit size={14} />
                      </Button>
                      <Button
                        variant="outline"
                        className="btn-delete-fixed"
                        onClick={() => handleDelete(deposit.id)}
                        disabled={deleteDepositMutation.isPending || deposit.balance > 0}
                        title={deposit.balance > 0 ? 'Cannot delete account with balance' : 'Delete fixed deposit'}
                      >
                        {deleteDepositMutation.isPending ? (
                          <Spinner animation="border" size="sm" />
                        ) : (
                          <Trash2 size={14} />
                        )}
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="pagination-container-fixed">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="pagination-info-fixed">
              Page {pagination.currentPage} of {pagination.totalPages}
              {pagination.totalItems && (
                <span className="text-slate-500 ms-2">
                  ({pagination.totalItems} total accounts)
                </span>
              )}
            </div>
            
            <Pagination className="pagination-custom-fixed">
              <Pagination.First 
                disabled={pagination.currentPage === 1} 
                onClick={() => setParams((params) => ({...params, page: 1, limit: pagination.itemsPerPage }))}
                title="First page"
              />
              <Pagination.Prev 
                disabled={pagination.currentPage === 1} 
                onClick={() => setParams((params) => ({...params, page: pagination.currentPage - 1, limit: pagination.itemsPerPage }))}
                title="Previous page"
              />
              
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <Pagination.Item
                  key={page}
                  active={page === pagination.currentPage}
                  onClick={() => setParams((params) => ({...params, page, limit: pagination.itemsPerPage }))}
                >
                  {page}
                </Pagination.Item>
              ))}
              
              <Pagination.Next 
                disabled={pagination.currentPage === pagination.totalPages} 
                onClick={() => setParams((params) => ({...params, page: pagination.currentPage + 1, limit: pagination.itemsPerPage }))}
                title="Next page"
              />
              <Pagination.Last 
                disabled={pagination.currentPage === pagination.totalPages} 
                onClick={() => setParams((params) => ({...params, page: pagination.totalPages, limit: pagination.itemsPerPage }))}
                title="Last page"
              />
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default FixedDepositList;