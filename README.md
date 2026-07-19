# WorkflowOperations

A lightweight React microservice-style module for workflow dialogs that can call the supplied REST endpoints.

## What is included
- A reusable workflow launcher component.
- A link-style launcher for embedding as a simple anchor in an existing app.
- A modal-based workflow UI with two steps: start workflow and submit action.
- A simple integration example that can be embedded in an existing React app.

## Run locally
```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Integrate into an existing app
Use either the button or link component and render the modal when the user clicks it:

```jsx
import { WorkflowLink, WorkflowModule } from './workflow';
import { useState } from 'react';

function MyPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WorkflowLink onOpen={() => setOpen(true)} />
      {open ? <WorkflowModule onClose={() => setOpen(false)} /> : null}
    </>
  );
}
```

## API hook points
The module calls these endpoints by default through the browser using the VITE_API_BASE_URL environment variable:
- POST /api/procedures/sp_startworkflow
- POST /api/procedures/sp_workflowaction

Set VITE_API_BASE_URL if your backend lives behind a different origin:

```bash
VITE_API_BASE_URL=https://your-api-host/api npm run dev
```
