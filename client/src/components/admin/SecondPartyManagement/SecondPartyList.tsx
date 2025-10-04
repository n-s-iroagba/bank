import React from 'react';
import { Table, Button, Pagination, Spinner, Badge } from 'react-bootstrap';
import { Edit, Trash2, Users, Calendar, Building, FileText } from 'lucide-react';

import { SecondParty, PaginationInfo, SecondPartyWithBank } from '../../../types';
import { useDeleteSecondParty } from '../../../hooks/useSecondParty';
import '../../../styles/SecondPartyList.css';

interface SecondPartyListProps {
  secondParties: SecondPartyWithBank[];
  pagination?: PaginationInfo;
  isLoading: boolean;
  onEdit: (secondParty: SecondParty) => void;
  onRefetch: () => void;
} 

const SecondPartyList: React.FC<SecondPartyListProps> = ({
  secondParties,
  pagination,
  isLoading,
  onEdit,
  onRefetch
}) => {
  const deleteSecondPartyMutation = useDeleteSecondParty();

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this second party? This action cannot be undone.')) {
      try {
        await deleteSecondPartyMutation.mutateAsync(id);
        onRefetch();
      } catch (error) {
        console.error('Error deleting second party:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="loading-container">
        <Spinner animation="border" className="loading-spinner" />
        <div className="loading-text">Loading second parties...</div>
      </div>
    );
  }

  if (secondParties.length === 0) {
    return (
      <div className="empty-state">
        <Users size={48} className="empty-state-icon" />
        <div className="empty-state-text">No Second Parties Found</div>
        <div className="empty-state-subtext">
          Create your first second party to get started with transaction management.
        </div>
      </div>
    );
  }

  return (
    <div className="second-party-list">
      <div className="table-container">
        <Table className="custom-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Details</th>
              <th>Bank ID</th>
              <th>Created Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {secondParties.map((secondParty, index) => (
              <tr key={secondParty.id} style={{ animationDelay: `${index * 0.05}s` }}>
                <td className="id-cell">
                  <Badge bg="slate-200" text="slate-700" className="status-badge">
                    #{secondParty.id}
                  </Badge>
                </td>
                <td className="name-cell">
                  <div className="d-flex align-items-center gap-2">
                    <Users size={16} className="text-slate-400" />
                    {secondParty.name}
                  </div>
                </td>
                <td className="details-cell" title={secondParty.details}>
                  <div className="d-flex align-items-center gap-2">
                    <FileText size={14} className="text-slate-400" />
                    {secondParty.details || 'No details provided'}
                  </div>
                </td>
                <td className="bank-id-cell">
                  <div className="d-flex align-items-center gap-2">
                    <Building size={14} className="text-slate-400" />
                    {secondParty.bank.name}
                  </div>
                </td>
                <td className="date-cell">
                  <div className="d-flex align-items-center gap-2">
                    <Calendar size={14} className="text-slate-400" />
                    {secondParty.createdAt ? new Date(secondParty.createdAt).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    }) : '-'}
                  </div>
                </td>
                <td>
                  <div className="action-buttons">
                    <Button
                      variant="outline"
                      className="btn-edit-custom"
                      onClick={() => onEdit(secondParty)}
                      title="Edit second party"
                    >
                      <Edit size={14} />
                    </Button>
                    <Button
                      variant="outline"
                      className="btn-delete-custom"
                      onClick={() => handleDelete(secondParty.id)}
                      disabled={deleteSecondPartyMutation.isPending}
                      title="Delete second party"
                    >
                      {deleteSecondPartyMutation.isPending ? (
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
        <div className="pagination-container">
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
            <div className="text-slate-600 fw-medium">
              Showing page {pagination.currentPage} of {pagination.totalPages}
              {pagination.totalItems && (
                <span className="text-slate-500 ms-2">
                  ({pagination.totalItems} total records)
                </span>
              )}
            </div>
            
            <Pagination className="pagination-custom">
              <Pagination.First 
                disabled={pagination.currentPage === 1}
                title="First page"
              />
              <Pagination.Prev 
                disabled={pagination.currentPage === 1}
                title="Previous page"
              />
              
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <Pagination.Item
                  key={page}
                  active={page === pagination.currentPage}
                >
                  {page}
                </Pagination.Item>
              ))}
              
              <Pagination.Next 
                disabled={pagination.currentPage === pagination.totalPages}
                title="Next page"
              />
              <Pagination.Last 
                disabled={pagination.currentPage === pagination.totalPages}
                title="Last page"
              />
            </Pagination>
          </div>
        </div>
      )}
    </div>
  );
};

export default SecondPartyList;