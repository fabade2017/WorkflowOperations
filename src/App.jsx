import { useState } from 'react';
import { WorkflowLauncher, WorkflowLink, WorkflowModule } from './workflow';

export default function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <p className="eyebrow">WorkflowOperations</p>
          <h1>Magical workflow dialog module</h1>
        </div>
        <div className="launcher-group">
          <WorkflowLink onOpen={() => setIsOpen(true)} />
          <WorkflowLauncher onOpen={() => setIsOpen(true)} />
        </div>
      </header>

      <main className="app-main">
        <section className="card">
          <h2>Use this as a drop-in React module</h2>
          <p>
            The launcher opens a dialog-driven workflow that can call the stored-procedure endpoints exposed in your API contract.
          </p>
          <ul>
            <li>Start workflow via /api/procedures/sp_startworkflow</li>
            <li>Submit actions via /api/procedures/sp_workflowaction</li>
            <li>Collect form inputs in a multi-step experience</li>
          </ul>
        </section>
      </main>

      {isOpen ? <WorkflowModule onClose={() => setIsOpen(false)} /> : null}
    </div>
  );
}
