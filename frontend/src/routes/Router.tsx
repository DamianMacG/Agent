// src/routes/Router.tsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Dashboard from '../pages/Dashboard';
import NotFound from '../pages/NotFound';
import AgentConfig from '../pages/AgentConfig';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/agents/:agentId" element={<AgentConfig />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
