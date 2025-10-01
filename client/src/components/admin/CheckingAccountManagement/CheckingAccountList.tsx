import React, { Dispatch, SetStateAction } from 'react';
import { Table, Button, Badge, Pagination, Spinner } from 'react-bootstrap';
import { Edit, Trash2, Eye } from 'lucide-react';

import { CheckingAccount, PaginationInfo } from '../../../types';
import { useDeleteCheckingAccount } from '../../../hooks/useCheckingAccount';
import { QueryType } from '../../../pages/admin/AccountHolders';


interface CheckingAccountListProps {
  accounts: CheckingAccount[];
  pagination?: PaginationInfo;
  isLoading: boolean;
  onEdit: (account: CheckingAccount) => void;
  onRefetch: () => void;
   setParams:Dispatch<SetStateAction<QueryType>>
}

const CheckingAccountList: React.FC<CheckingAccountListProps> = ({
  accounts,
  pagination,
  isLoading,
  onEdit,
  onRefetch,
  setParams
}) => {
  const deleteAccountMutation = useDeleteCheckingAccount();

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this checking account?')) {
      try {
        await deleteAccountMutation.mutateAsync(id);
        onRefetch();
      } catch (error) {
        console.error('Error deleting checking account:', error);
      }
    }
  };

  const handleViewDetails = (account: CheckingAccount) => {
    // Navigate to checking account details page
    console.log('View details for:', account.id);
  };

  if (isLoading) {
    return (
      <div className="text-center py-4">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (accounts.length === 0) {
    return (
      <div className="text-center py-4">
        <p>No checking accounts found.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="table-responsive">
        <Table striped hover>
          <thead>
            <tr>
              <th>ID</th>
              <th>Account Number</th>
              <th>Account Holder</th>
              <th>Balance</th>
              <th>Status</th>
              <th>Created At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) => (
              <tr key={account.id}>
                <td>{account.id}</td>
                <td>{account.accountNumber}</td>
                {/* <td>
                  {account.accountHolder 
                    ? `${account.accountHolder.firstName} ${account.accountHolder.lastName}`
                    : `Account Holder #${account.accountHolderId}`
                  }
                </td> */}
                <td>${account.balance.toFixed(2)}</td>
                <td>
                  <Badge bg={account.isActive ? 'success' : 'secondary'}>
                    {account.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </td>
                <td>
                  {account.createdAt ? new Date(account.createdAt).toLocaleDateString() : '-'}
                </td>
                <td>
                  <div className="d-flex gap-2">
                    <Button
                      variant="outline-info"
                      size="sm"
                      onClick={() => handleViewDetails(account)}
                    >
                      <Eye size={16} />
                    </Button>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      onClick={() => onEdit(account)}
                    >
                      <Edit size={16} />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(account.id)}
                      disabled={deleteAccountMutation.isPending
 || account.balance > 0}
                      title={account.balance > 0 ? 'Cannot delete account with balance' : ''}
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
      {pagination && pagination.totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <Pagination>
            <Pagination.First 
              disabled={pagination.currentPage === 1} 
              onClick={() => setParams((params)=>({...params, page: 1, limit: pagination.itemsPerPage }))}
            />
            <Pagination.Prev 
              disabled={pagination.currentPage === 1} 
              onClick={() =>setParams((params)=>({...params,page: pagination.currentPage - 1, limit: pagination.itemsPerPage }))}
            />
            
            {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
              <Pagination.Item
                key={page}
                active={page === pagination.currentPage}
                onClick={() =>setParams((params)=>({...params,page, limit: pagination.itemsPerPage }))}
              >
                {page}
              </Pagination.Item>
            ))}
            
            <Pagination.Next 
              disabled={pagination.currentPage === pagination.totalPages} 
              onClick={() =>setParams((params)=>({...params,page: pagination.currentPage + 1, limit: pagination.itemsPerPage }))}
            />
            <Pagination.Last 
              disabled={pagination.currentPage === pagination.totalPages} 
              onClick={() =>setParams((params)=>({...params,page: pagination.totalPages, limit: pagination.itemsPerPage }))}
            />
          </Pagination>
        </div>
      )}
    </div>
  );
};

export default CheckingAccountList;