import React, { createContext, useState, useContext, useCallback } from 'react';
import { CheckCircle, AlertCircle, Info, X } from 'lucide-react';

const ToastContext = createContext();

export const useToast = () => useContext(ToastContext);

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info') => {
        const id = Math.random().toString(36).substr(2, 9);
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => removeToast(id), 5000);
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(t => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ addToast }}>
            {children}
            <div className="toast-container">
                {toasts.map(toast => (
                    <div key={toast.id} className={`toast ${toast.type}`}>
                        {toast.type === 'success' && <CheckCircle size={20} />}
                        {toast.type === 'error' && <AlertCircle size={20} />}
                        {toast.type === 'info' && <Info size={20} />}
                        <span className="toast-message">{toast.message}</span>
                        <button onClick={() => removeToast(toast.id)} className="toast-close">
                            <X size={16} />
                        </button>
                    </div>
                ))}
            </div>
            <style jsx>{`
                .toast-container {
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    z-index: 9999;
                }
                .toast {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    padding: 1rem 1.5rem;
                    border-radius: 0.75rem;
                    background: var(--bg-primary);
                    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);
                    border: 1px solid var(--border-color);
                    min-width: 300px;
                    animation: slide-in 0.3s ease-out;
                }
                .toast.success { border-left: 4px solid var(--success); }
                .toast.error { border-left: 4px solid var(--danger); }
                .toast.info { border-left: 4px solid var(--accent-primary); }
                
                .toast-message { font-weight: 500; font-size: 0.9rem; flex: 1; }
                .toast-close { background: none; border: none; cursor: pointer; color: var(--text-secondary); display: flex; align-items: center; }
                
                @keyframes slide-in {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
            `}</style>
        </ToastContext.Provider>
    );
};
