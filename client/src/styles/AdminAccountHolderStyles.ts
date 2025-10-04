export const accountHolderManagemntStyles = `
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.5; }
        .container { max-width: 1200px; margin: 0 auto; padding: 0 20px; }
        .row { display: flex; flex-wrap: wrap; margin: 0 -15px; }
        .col { flex: 1; padding: 0 15px; min-width: 0; }
        .col-3 { flex: 0 0 25%; max-width: 25%; padding: 0 15px; }
        .col-4 { flex: 0 0 33.333%; max-width: 33.333%; padding: 0 15px; }
        .col-auto { flex: 0 0 auto; padding: 0 15px; }
        .card { background: white; border: 1px solid #e2e8f0; border-radius: 12px; box-shadow: 0 1px 3px rgba(0,0,0,0.1); }
        .card-body { padding: 24px; }
        .btn { display: inline-flex; align-items: center; justify-content: center; padding: 10px 20px; border-radius: 8px; font-weight: 600; cursor: pointer; border: none; transition: all 0.2s; font-size: 14px; }
        .btn-primary { background: linear-gradient(135deg, #dc2626, #b91c1c); color: white; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .btn-primary:hover { background: linear-gradient(135deg, #b91c1c, #991b1b); transform: translateY(-1px); }
        .btn-secondary { background: #334155; color: white; }
        .btn-secondary:hover { background: #475569; }
        .btn-outline { background: white; border: 1px solid #cbd5e1; color: #334155; }
        .btn-outline:hover { background: #f1f5f9; }
        .btn-sm { padding: 6px 12px; font-size: 13px; }
        .input-group { position: relative; }
        .form-control { width: 100%; padding: 12px 12px 12px 40px; border: 1px solid #cbd5e1; border-radius: 8px; background: #f8fafc; font-size: 14px; }
        .form-control:focus { outline: none; border-color: #dc2626; background: white; box-shadow: 0 0 0 3px rgba(220,38,38,0.1); }
        .input-icon { position: absolute; left: 12px; top: 50%; transform: translateY(-50%); color: #94a3b8; pointer-events: none; }
        .mb-4 { margin-bottom: 24px; }
        .mb-5 { margin-bottom: 40px; }
        .d-flex { display: flex; }
        .gap-3 { gap: 12px; }
        .gap-2 { gap: 8px; }
        .align-items-center { align-items: center; }
        .justify-content-between { justify-content: space-between; }
        .text-muted { color: #64748b; }
        .fw-bold { font-weight: 700; }
        .avatar { width: 48px; height: 48px; border-radius: 12px; background: linear-gradient(135deg, #dc2626, #334155); display: flex; align-items: center; justify-content: center; color: white; font-weight: 700; margin-right: 16px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .badge { display: inline-flex; align-items: center; padding: 6px 12px; border-radius: 20px; font-size: 12px; font-weight: 600; }
        .stat-card { transition: all 0.2s; }
        .stat-card:hover { transform: translateY(-4px); box-shadow: 0 10px 15px rgba(0,0,0,0.1); }
        .account-row { padding: 20px; border-bottom: 1px solid #f1f5f9; transition: all 0.2s; }
        .account-row:hover { background: linear-gradient(135deg, #fef2f2, #f8fafc); transform: scale(1.01); box-shadow: 0 4px 6px rgba(0,0,0,0.05); }
        .loading { width: 48px; height: 48px; border: 4px solid #e2e8f0; border-top-color: #dc2626; border-radius: 50%; animation: spin 1s linear infinite; margin: 0 auto; }
        @keyframes spin { to { transform: rotate(360deg); } }
        .gradient-header { background: linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #7f1d1d 100%); color: white; padding: 48px 0; }
        .action-btn { padding: 8px 12px; border-radius: 6px; border: none; cursor: pointer; font-weight: 500; transition: all 0.2s; font-size: 13px; }
        .action-btn-view { background: #dbeafe; color: #1e40af; }
        .action-btn-view:hover { background: #bfdbfe; }
        .action-btn-edit { background: #fee2e2; color: #dc2626; }
        .action-btn-edit:hover { background: #fecaca; }
        .action-btn-delete { background: #fee2e2; color: #dc2626; }
        .action-btn-delete:hover { background: #fecaca; }
        .modal-overlay { position: fixed; inset: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000; }
        .modal-content { background: white; border-radius: 12px; padding: 32px; max-width: 500px; width: 90%; }
        select { padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; background: white; width: 100%; }
        select:focus { outline: none; border-color: #dc2626; }
        label { display: block; margin-bottom: 8px; font-weight: 600; color: #334155; font-size: 14px; }
        .filter-section { padding: 24px; background: #f8fafc; border-top: 1px solid #e2e8f0; margin-top: 16px; border-radius: 0 0 12px 12px; }
        @media (max-width: 768px) {
          .col-3, .col-4 { flex: 0 0 100%; max-width: 100%; margin-bottom: 16px; }
          .gradient-header { padding: 32px 0; }
          .account-row { flex-direction: column; }
          .avatar { margin-bottom: 12px; }
        }
      `