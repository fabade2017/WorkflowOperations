import { WorkflowLauncher, WorkflowModule } from './workflow';
import { useState } from 'react';

export function ExampleHost() {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Existing app integration</h2>
      <p>
        Drop this component inside your app and render the launcher wherever you want.
      </p>
      <WorkflowLauncher onOpen={() => setOpen(true)} />
      {open ? <WorkflowModule onClose={() => setOpen(false)} /> : null}
    </div>
  );
}
