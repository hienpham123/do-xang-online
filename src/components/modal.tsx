import type { ReactNode } from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import Button from './button';

export interface ModalProps {
  open: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
  confirmText?: string;
  onConfirm?: () => void;
}

const Modal = ({
  open,
  title,
  children,
  onClose,
  confirmText,
  onConfirm,
}: ModalProps) => {
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm"
        onMouseDown={onClose}
        role="presentation"
      />
      <div className="absolute inset-x-0 top-1/2 mx-auto w-full max-w-lg -translate-y-1/2 px-4">
        <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-5 shadow-glow">
          <div className="mb-3 flex items-start justify-between gap-4">
            <h2 className="text-lg font-bold text-slate-50">{title}</h2>
            <button
              type="button"
              className="rounded-lg px-2 py-1 text-slate-300 hover:bg-slate-800 hover:text-slate-50"
              onClick={onClose}
              aria-label="Đóng modal"
            >
              ✕
            </button>
          </div>
          <div className="text-slate-200">{children}</div>
          <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:justify-end">
            <Button variant="secondary" onClick={onClose}>
              Đóng
            </Button>
            {confirmText && onConfirm ? (
              <Button onClick={onConfirm}>{confirmText}</Button>
            ) : null}
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Modal;

