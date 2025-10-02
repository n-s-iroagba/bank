import React, { Dispatch, SetStateAction } from 'react';
import { Table, Button, Badge, Pagination, Spinner } from 'react-bootstrap';
import { Edit, Trash2, Eye, CreditCard, User, Calendar, DollarSign } from 'lucide-react';

import { CheckingAccount, PaginationInfo } from '../../../types';
import { useDeleteCheckingAccount } from '../../../hooks/useCheckingAccount';
import '../../../styles/CheckingAccountList.css';
import { useNavigate } from 'react-router-dom';

interface CheckingAccountListProps {
  accounts: CheckingAccount[];
  pagination?: PaginationInfo;
  isLoading: boolean;
  onEdit: (account: CheckingAccount) => void;
  onRefetch: () => void;
  setParams: Dispatch<SetStateAction<{page:number,limit:number}>>;
}

const CheckingAccountList: React.FC<CheckingAccountListProps> = ({
  accounts,
  pagination,
  isLoading,
  onEdit,
  onRefetch,
  setParams
}) => {
  const navigate = useNavigate()
  const deleteAccountMutation = useDeleteCheckingAccount();

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this checking account? This action cannot be undone.')) {
      try {
        await deleteAccountMutation.mutateAsync(id);
        onRefetch();
      } catch (error) {
        console.error('Error deleting checking account:', error);
      }
    }
  };

  const handleViewDetails = (account: CheckingAccount) => {
     navigate(`/admin/account-details/checking/${account.id}`)
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
  };

  const formatDate = (date: string | Date) => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};


  if (isLoading) {
    return (
      <div className="loading-container-checking">
        <Spinner animation="border" className="loading-spinner-checking" />
        <div className="loading-text-checking">Loading checking accounts...</div>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="empty-state-checking">
        <CreditCard size={48} className="empty-state-icon" />
        <div className="empty-state-text">No Checking Accounts Found</div>
        <div className="empty-state-subtext">
          Create your first checking account to get started with transaction management.
        </div>
      </div>
    );
  }

  return (
    <div className="checking-account-list">
      <div className="table-container-checking">
        <Table className="table-custom-checking">
          <thead>
            <tr>
              <th>ID</th>
              <th>Account Number</th>
              <th>Account Holder</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account, index) => (
              <tr key={account.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <td className="id-cell-checking">
                  <Badge bg="slate-200" text="slate-700" className="status-badge-checking">
                    #{account.id}
                  </Badge>
                </td>
                <td className="account-number-cell">
                  <div className="d-flex align-items-center gap-2">
                    <CreditCard size={16} className="text-slate-400" />
                    {account.accountNumber}
                  </div>
                </td>
                <td className="account-holder-cell">
                  <div className="d-flex align-items-center gap-2">
                    <User size={14} className="text-slate-400" />
                    Account Holder #{account.accountHolderId}
                  </div>
                </td>
                <td className={`balance-cell ${account.balance > 0 ? 'balance-positive' : account.balance === 0 ? 'balance-zero' : ''}`}>
                  <div className="d-flex align-items-center gap-2">
                    <DollarSign size={14} className="text-slate-400" />
                    {formatCurrency(account.balance)}
                  </div>
                </td>
                <td>
                  <Badge className={`status-badge-checking ${account.isActive ? 'status-active' : 'status-inactive'}`}>
                    {account.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td className="date-cell-checking">
                  <div className="d-flex align-items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    {account.createdAt ? formatDate(account.createdAt) : '-'}
                  </div>
                </td>
                <td>
                  <div className="action-buttons-checking">
                    <Button
                      variant="outline"
                      className="btn-view-checking"
                      onClick={() => handleViewDetails(account)}
                      title="View account details"
                    >
                      <Eye size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      className="btn-edit-checking"
                      onClick={() => onEdit(account)}
                      title="Edit checking account"
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      className="btn-delete-checking"
                      onClick={() => handleDelete(account.id)}
                      disabled={deleteAccountMutation.isPending || account.balance > 0}
                      title={account.balance > 0 ? 'Cannot delete account with balance' : 'Delete checking account'}
                    >
                      {deleteAccountMutation.isPending ? (
                        <Spinner animation="border" size="sm" />
                      ) : (
                        <Trash2 size={14} />
                      )}
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="pagination-container-checking">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="pagination-info">
              Page {pagination.currentPage} of {pagination.totalPages}
              {pagination.totalItems && (
                <span className="text-slate-500 ms-2">
                  ({pagination.totalItems} total accounts)
                </span>
              )}
            </div>
            
            <Pagination className="pagination-custom-checking">
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

export default CheckingAccountList;