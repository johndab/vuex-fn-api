# vuex-fn-api

## Installation
```bash
npm install vuex-fn-api
```

```js
// store/modules/projects.js

import FnApi from "vuex-fn-api"
// Import api client
import client from '../api/client';

const projects = new FnApi({
    state: {
      projects: []
    }
  })
  // Step 3
  .add({
    request: ({ projectId } : any) => client.getProject(projectId);
    property: "project",
  })
  // Add more request definitions here ..
  .getStore()

// Step 5
export default projects
```
