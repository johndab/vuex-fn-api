# vuex-fn-api

## Installation
```bash
npm install @ilabo/vuex-fn-api
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
  .add({
    request: ({ projectId } : any) => client.getProject(projectId);
    property: "project",
  })
  // Add more request definitions here ..
  .getStore()

export default projects;
```
