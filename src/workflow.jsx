import { useMemo, useState } from 'react';

const API_BASE = import.meta.env.VITE_API_BASE_URL || '/api';

async function callProcedure(path, payload) {
  const response = await fetch(`${API_BASE}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with ${response.status}`);
  }

  return response.json().catch(() => ({}));
}

export function WorkflowLauncher({ onOpen }) {
  return (
    <button className="launcher" type="button" onClick={onOpen}>
      Launch workflow
    </button>
  );
}

export function WorkflowLink({ onOpen }) {
  return (
    <a className="link-launcher" href="#workflow" onClick={(event) => {
      event.preventDefault();
      onOpen();
    }}>
      Open workflow
    </a>
  );
}

export function WorkflowModule({ onClose }) {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    WorkflowKey: 'sample-workflow',
    EntityType: 'Invoice',
    EntityId: 'INV-1001',
    InitiatedBy: 'demo-user',
    Action: 'approve',
    Comments: ''
  });
  const [status, setStatus] = useState('Ready');
  const [error, setError] = useState('');

  const progress = useMemo(() => `${step}/2`, [step]);

  const updateField = (key, value) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const handleStart = async () => {
    setStatus('Starting workflow...');
    setError('');
    try {
      await callProcedure('/procedures/sp_startworkflow', {
        WorkflowKey: form.WorkflowKey,
        EntityType: form.EntityType,
        EntityId: form.EntityId,
        InitiatedBy: form.InitiatedBy
      });
      setStatus('Workflow started');
      setStep(2);
    } catch (err) {
      setError(err.message || 'Unable to start workflow');
      setStatus('Start failed');
    }
  };

  const handleAction = async () => {
    setStatus('Submitting action...');
    setError('');
    try {
      await callProcedure('/procedures/sp_workflowaction', {
        WorkflowTaskId: form.WorkflowTaskId || 'sample-task',
        Action: form.Action,
        Comments: form.Comments
      });
      setStatus('Action submitted');
    } catch (err) {
      setError(err.message || 'Unable to submit action');
      setStatus('Action failed');
    }
  };

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true">
      <div className="modal-card">
        <div className="modal-header">
          <div>
            <p className="eyebrow">Workflow dialog</p>
            <h2>Magical workflow form</h2>
          </div>
          <button className="ghost" onClick={onClose}>Close</button>
        </div>

        <div className="progress">Step {progress}</div>

        {step === 1 ? (
          <div className="form-grid">
            <label>
              Workflow key
              <input value={form.WorkflowKey} onChange={(event) => updateField('WorkflowKey', event.target.value)} />
            </label>
            <label>
              Entity type
              <input value={form.EntityType} onChange={(event) => updateField('EntityType', event.target.value)} />
            </label>
            <label>
              Entity id
              <input value={form.EntityId} onChange={(event) => updateField('EntityId', event.target.value)} />
            </label>
            <label>
              Initiated by
              <input value={form.InitiatedBy} onChange={(event) => updateField('InitiatedBy', event.target.value)} />
            </label>
            <div className="actions">
              <button className="primary" onClick={handleStart}>Start workflow</button>
            </div>
          </div>
        ) : (
          <div className="form-grid">
            <label>
              Workflow task id
              <input value={form.WorkflowTaskId || ''} onChange={(event) => updateField('WorkflowTaskId', event.target.value)} />
            </label>
            <label>
              Action
              <select value={form.Action} onChange={(event) => updateField('Action', event.target.value)}>
                <option value="approve">Approve</option>
                <option value="reject">Reject</option>
                <option value="comment">Comment</option>
              </select>
            </label>
            <label>
              Comments
              <textarea rows="4" value={form.Comments} onChange={(event) => updateField('Comments', event.target.value)} />
            </label>
            <div className="actions">
              <button className="ghost" onClick={() => setStep(1)}>Back</button>
              <button className="primary" onClick={handleAction}>Submit action</button>
            </div>
          </div>
        )}

        <div className="status-panel">
          <strong>Status:</strong> {status}
          {error ? <div className="error">{error}</div> : null}
        </div>
      </div>
    </div>
  );
}
