# WorkflowOperations

WorkflowOperations is a lightweight React module for launching a modal-based workflow experience that can connect to the stored procedure endpoints in your API contract. It is designed to be easy to embed in an existing React application as either a button or a simple link.

## Overview
The module currently provides:
- A reusable launcher component for opening the workflow dialog.
- A link-style launcher for embedding as a simple anchor in an existing app.
- A two-step modal workflow UI:
  1. Start workflow with a form for workflow metadata.
  2. Submit a workflow action with action and comments.
- Browser-side POST calls to two procedural endpoints:
  - POST /api/procedures/sp_startworkflow
  - POST /api/procedures/sp_workflowaction

## Project structure
- [src/App.jsx](src/App.jsx) – demo host page showing the workflow launcher and modal.
- [src/workflow.jsx](src/workflow.jsx) – reusable workflow components and API call logic.
- [src/styles.css](src/styles.css) – styling for the demo and dialog experience.
- [src/index.js](src/index.js) – simple export entry point for reuse.

## Prerequisites
- Node.js 18+
- npm 9+

## Installation
From the repository root, install dependencies:

```bash
npm install
```

## Run the demo locally
Start the development server:

```bash
npm run dev
```

Open the local URL shown by Vite, typically:

```text
http://localhost:3000/
```

## Build for production
Generate a production build:

```bash
npm run build
```

The output will be placed in the dist folder.

## Usage in an existing React app
You can use the workflow module in any React app by importing the launcher and modal components.

### Button-based usage
```jsx
import { useState } from 'react';
import { WorkflowLauncher, WorkflowModule } from './src';

function MyPage() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <WorkflowLauncher onOpen={() => setOpen(true)} />
      {open ? <WorkflowModule onClose={() => setOpen(false)} /> : null}
    </>
  );
}
```

### Link-based usage
```jsx
import { useState } from 'react';
import { WorkflowLink, WorkflowModule } from './src';

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

## Configuration
The module calls your backend through the browser. By default it assumes your API is served under `/api`, but you can override the base path with an environment variable:

```bash
VITE_API_BASE_URL=https://your-api-host/api npm run dev
```

If you are using a different backend route such as `/workflow-api`, make sure the value includes that prefix.

## API payloads
The component sends simple JSON payloads to the procedure endpoints.

### Start workflow
```json
{
  "WorkflowKey": "sample-workflow",
  "EntityType": "Invoice",
  "EntityId": "INV-1001",
  "InitiatedBy": "demo-user"
}
```

### Submit workflow action
```json
{
  "WorkflowTaskId": "sample-task",
  "Action": "approve",
  "Comments": "Approved by the demo user"
}
```

## Notes
- This starter module is intentionally simple and does not yet include authentication, advanced validation, or a real persistence layer.
- The modal uses sample values by default, which can be replaced with actual state from your application.
- You can extend the workflow UI by adding more steps, custom fields, or backend-specific request mapping.

## Next steps
Possible improvements include:
- Integrating with your real workflow backend.
- Adding form validation and loading states.
- Supporting multiple workflow types and dynamic step logic.
- Exposing the modal as a package for npm consumption.
