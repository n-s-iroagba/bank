import React from 'react';
import {
  Edit,
  Trash2,
  Package,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight
} from 'lucide-react';
import '../../../styles/BankList.css'; // <-- Import the CSS file
import { Bank, PaginationInfo } from '../../../types';



// Mock hook for demo
const useDeleteBank = () => ({
  mutateAsync: async (id: number) => console.log('Delete:', id),
  isPending: false
});

interface BankListProps {
  banks: Bank[];
  pagination?: PaginationInfo;
  isLoading: boolean;
  onEdit: (bank: Bank) => void;
  onRefetch: () => void;
}

const BankList: React.FC<BankListProps> = ({
  banks,
  pagination,
  isLoading,
  onEdit,
  onRefetch
}) => {
  const deleteBankMutation = useDeleteBank();

  const handleDelete = async (id: number) => {
    if (window.confirm('Are you sure you want to delete this bank?')) {
      try {
        await deleteBankMutation.mutateAsync(id);
        onRefetch();
      } catch (error) {
        console.error('Error deleting bank:', error);
      }
    }
  };

  if (isLoading) {
    return (
      <div className="bank-loading">
        <div className="bank-loading-spinner" />
        <p>Loading banks...</p>
      </div>
    );
  }

  if (banks.length === 0) {
    return (
      <div className="bank-empty">
        <div className="bank-empty-icon">
          <Package size={40} color="#adb5bd" />
        </div>
        <h5>No Banks Found</h5>
        <p>Create your first bank to get started.</p>
      </div>
    );
  }

  return (
    <div>
      <div className="bank-table-card">
        <div style={{ overflowX: 'auto' }}>
          <table className="bank-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Logo</th>
                <th>Bank Name</th>
                <th>Created Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {banks.map((bank) => (
                <tr key={bank.id}>
                  <td>
                    <span className="bank-id-badge">#{bank.id}</span>
                  </td>
                  <td>
                    {bank.logo ? (
                      <div className="bank-logo-container">
                        <img src={bank.logo} alt={bank.name} />
                      </div>
                    ) : (
                      <div className="bank-logo-placeholder">
                        <span>No Logo</span>
                      </div>
                    )}
                  </td>
                  <td>
                    <span className="bank-name">{bank.name}</span>
                  </td>
                  <td>
                    <span className="bank-date">
                      {bank.createdAt
                        ? new Date(bank.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })
                        : '-'}
                    </span>
                  </td>
                  <td>
                    <span className="status-badge">Active</span>
                  </td>
                  <td>
                    <div style={{ display: 'flex' }}>
                      <button
                        className="action-button action-button-edit"
                        onClick={() => onEdit(bank)}
                        title="Edit bank"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        className="action-button action-button-delete"
                        onClick={() => handleDelete(bank.id)}
                        disabled={deleteBankMutation.isPending}
                        title="Delete bank"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {pagination && pagination.totalPages > 1 && (
        <div className="custom-pagination">
          <button
            className="pagination-button"
            disabled={pagination.currentPage === 1}
            onClick={() => console.log('First page')}
          >
            <ChevronsLeft size={18} />
          </button>

          <button
            className="pagination-button"
            disabled={pagination.currentPage === 1}
            onClick={() => console.log('Previous page')}
          >
            <ChevronLeft size={18} />
          </button>

          {Array.from({ length: Math.min(pagination.totalPages, 7) }, (_, i) => {
            let page:number;
            if (pagination.totalPages <= 7) {
              page = i + 1;
            } else if (pagination.currentPage <= 4) {
              page = i + 1;
            } else if (pagination.currentPage >= pagination.totalPages - 3) {
              page = pagination.totalPages - 6 + i;
            } else {
              page = pagination.currentPage - 3 + i;
            }

            return (
              <button
                key={page}
                className={`pagination-button ${
                  page === pagination.currentPage ? 'active' : ''
                }`}
                onClick={() => console.log('Page', page)}
              >
                {page}
              </button>
            );
          })}

          <button
            className="pagination-button"
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => console.log('Next page')}
          >
            <ChevronRight size={18} />
          </button>

          <button
            className="pagination-button"
            disabled={pagination.currentPage === pagination.totalPages}
            onClick={() => console.log('Last page')}
          >
            <ChevronsRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
};

export default BankList;
