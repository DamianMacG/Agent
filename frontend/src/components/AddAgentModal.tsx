import { useState, useEffect, useRef } from 'react';
import type { AddAgentModalProps } from '../types/agentModal';

export default function AddAgentModal({ isOpen, onClose, onCreate }: AddAgentModalProps) {
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [goal, setGoal] = useState('');
  const nameInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen && nameInputRef.current) {
      nameInputRef.current.focus();
    }
    // Optional: Reset form when modal opens
    if (isOpen) {
      setName('');
      setRole('');
      setGoal('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate({ name, role, goal });
    setName('');
    setRole('');
    setGoal('');
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50"
      aria-modal="true"
      role="dialog"
    >
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-bold mb-4">Add New Agent</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            ref={nameInputRef}
            className="w-full border rounded px-3 py-2"
            placeholder="Agent Name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            autoFocus
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Role"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          />
          <input
            className="w-full border rounded px-3 py-2"
            placeholder="Goal"
            value={goal}
            onChange={e => setGoal(e.target.value)}
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-blue-600 text-white"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}