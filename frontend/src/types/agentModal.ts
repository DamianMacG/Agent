export type AddAgentModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onCreate: (agent: { name: string; role: string; goal: string }) => void;
};