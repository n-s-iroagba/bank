import React, { Dispatch, SetStateAction } from 'react';
import { Table, Button, Badge, Pagination, Spinner } from 'react-bootstrap';
import { Edit, Trash2, Eye } from 'lucide-react';

import { FixedTermDeposit, PaginationInfo } from '../../../types';
import { useDeleteFixedDeposit } from '../../../hooks/useFixedDeposit';
import { QueryType } from '../../../pages/admin/AccountHolders';


interface FixedDepositListProps {
  deposits: FixedTermDeposit[];
  pagination?: PaginationInfo;
  isLoading: boolean;
  onEdit: (deposit: FixedTermDeposit) => void;
  onRefetch: () => void;
   setParams:Dispatch<SetStateAction<QueryType>>
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

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this fixed deposit account?')) {
      try {
        await deleteDepositMutation.mutateAsync(id);
        onRefetch();
      } catch (error) {
        console.error('Error deleting fixed deposit:', error);
      }
    }
  };

  const handleViewDetails = (deposit: FixedTermDeposit) => {
    // Navigate to fixed deposit details page
    console.log('View details for:', deposit.id);
  };

  const getMaturityStatus = (maturityDate: Date, isActive: boolean) => {
    if (!isActive) return 'Closed';
    const today = new Date();
    const maturity = new Date(maturityDate);
    return maturity < today ? 'Matured' : 'Active';
  };

  const getMaturityStatusVariant = (status: string) => {
    switch (status) {
      case 'Active': return 'success';
      case 'Matured': return 'warning';
      case 'Closed': return 'secondary';
      default: return 'secondary';
    }
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

  if (deposits.length === 0) {
    return (
      <div className="text-center py-4">
        <p>No fixed deposit accounts found.</p>
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
              <th>Term (months)</th>
              <th>Interest Rate</th>
              <th>Maturity Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {deposits.map((deposit) => {
              const maturityStatus = getMaturityStatus(deposit.maturityDate, deposit.isActive);
              
              return (
                <tr key={deposit.id}>
                  <td>{deposit.id}</td>
                  <td>{deposit.accountNumber}</td>
                  {/* <td>
                    {deposit.accountHolder 
                      ? `${deposit.accountHolder.firstName} ${deposit.accountHolder.lastName}`
                      : `Account Holder #${deposit.accountHolderId}`
                    }
                  </td> */}
                  <td>${deposit.balance.toFixed(2)}</td>
                  <td>{deposit.term}</td>
                  <td>{deposit.interestRate}%</td>
                  <td>
                    {new Date(deposit.maturityDate).toLocaleDateString()}
                  </td>
                  <td>
                    <Badge bg={getMaturityStatusVariant(maturityStatus)}>
                      {maturityStatus}
                    </Badge>
                  </td>
                  <td>
                    <div className="d-flex gap-2">
                      <Button
                        variant="outline-info"
                        size="sm"
                        onClick={() => handleViewDetails(deposit)}
                      >
                        <Eye size={16} />
                      </Button>
                      <Button
                        variant="outline-primary"
                        size="sm"
                        onClick={() => onEdit(deposit)}
                        disabled={!deposit.isActive}
                        title={!deposit.isActive ? 'Cannot edit closed accounts' : ''}
                      >
                        <Edit size={16} />
                      </Button>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => handleDelete(deposit.id)}
                        disabled={deleteDepositMutation.isPending
 || deposit.balance > 0}
                        title={deposit.balance > 0 ? 'Cannot delete account with balance' : ''}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
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
    </div>  
  );
};

export default FixedDepositList;