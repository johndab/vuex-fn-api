# vuex-fn-api

## Installation
```bash
npm install vuex-fn-api
```
<!-- 
> Some notes: This readme assumes that you're using at least ES2015.

## Steps
1. Import `vuex-rest-api` (I called it `Vapi`).
1. Create a `Vapi` instance.  
   At least you have to set the base URL of the API you're requesting from. You can also define the default state. If you don't define a default state from a property it will default to `null`.
   In the example
1. Create the actions.  
   Each action represents a Vuex action. If it will be called (property `action`), it requests a specific API endpoint (property `path`) and sets the related property named `property` to the response's payload.
1. Create the store object
1. Pass it to Vuex. Continue reading [here](https://christianmalek.github.io/vuex-rest-api/miscellaneous.html#calling-the-actions) to know how to *call the actions*. -->

```js
// store.js

import Vuex from "vuex"
import Vue from "vue"
// Step 1
import Vapi from "vuex-rest-api"

Vue.use(Vuex)

// Step 2
const posts = new Vapi({
  baseURL: "https://jsonplaceholder.typicode.com",
    state: {
      posts: []
    }
  })
  // Step 3
  .get({
    action: "getPost",
    property: "post",
    path: ({ id }) => `/posts/${id}`
  })
  .get({
    action: "listPosts",
    property: "posts",
    path: "/posts"
  })
  .post({
    action: "updatePost",
    property: "post",
    path: ({ id }) => `/posts/${id}`
  })
  // Step 4
  .getStore()

// Step 5
export const store = new Vuex.Store(posts)
```

## Minimal example 
Yep, here: https://codesandbox.io/s/8l0m8qk0q0

## API and further documentation
The docs are now available under http://vuex-rest-api.org
