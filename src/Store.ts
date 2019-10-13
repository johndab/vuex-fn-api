import Resource from "./Resource"
import * as cloneDeep from "lodash.clonedeep"

export interface Store {
  state: Object | Function
  mutations: MutationMap
  actions: ActionMap
}

export interface ActionMap {
  [action: string]: Function
}

export interface MutationMap {
  [action: string]: Function
}

class StoreCreator {
  private resource: Resource
  private successSuffix: string = "SUCCEEDED"
  private errorSuffix: string = "FAILED"
  public store: Store

  constructor(resource: Resource) {
    this.resource = resource
    this.store = this.createStore()
  }
  
  private createState(): Object {
    const resourceState: Object = cloneDeep(this.resource.state)

    const state: Object = Object.assign({
      pending: {},
      error: {}
    }, resourceState)

    const actions = this.resource.actions
    Object.keys(actions).forEach((action) => {
      const property = actions[action].property

      // don't do anything if no property is set
      if (property === null) {
        return;
      }

      // if state is undefined set default value to null
      if (state[property] === undefined) {
        state[property] = null
      }

      state["pending"][property] = false
      state["error"][property] = null
    })

    return state
  }

  createGetter(): Object {
    return {}
  }

  createMutations(defaultState: Object): MutationMap {
    const mutations = {}

    const actions = this.resource.actions
    Object.keys(actions).forEach((action) => {
      const { property, commitString, beforeRequest, onSuccess, onError, axios } = actions[action]

      mutations[`${commitString}`] = (state, actionParams) => {

        if (property !== null) {
          state.pending[property] = true
          state.error[property] = null
        }

        if (beforeRequest) {
          beforeRequest(state, actionParams)
        }
      }
      mutations[`${commitString}_${this.successSuffix}`] = (state, { payload, actionParams }) => {

        if (property !== null) {
          state.pending[property] = false
          state.error[property] = null
        }

        if (onSuccess) {
          onSuccess(state, payload, actionParams)
        } else if (property !== null) {
          state[property] = payload.data
        }
      }
      mutations[`${commitString}_${this.errorSuffix}`] = (state, { payload, actionParams }) => {

        if (property !== null) {
          state.pending[property] = false
          state.error[property] = payload
        }

        if (onError) {
          onError(state, payload, actionParams)
        } else if (property !== null) {

          // sets property to it's default value in case of an error
          state[property] = defaultState[property]
        }
      }
    })

    return mutations
  }

  createActions(): ActionMap {
    const storeActions = {}

    const actions = this.resource.actions
    Object.keys(actions).forEach((action) => {
      const { dispatchString, commitString, request } = actions[action]

      storeActions[dispatchString] = async ({ commit }, actionParams) => {
        commit(commitString, actionParams)
        return request(actionParams)
          .then((response) => {
            commit(`${commitString}_${this.successSuffix}`, {
              payload: response, actionParams
            })
            return Promise.resolve(response)
          }, (error) => {
            commit(`${commitString}_${this.errorSuffix}`, {
              payload: error, actionParams
            })
            return Promise.reject(error)
          })
      }
    })

    return storeActions
  }

  createStore(): Store {
    const state = this.createState()

    return {
      state,
      mutations: this.createMutations(state),
      actions: this.createActions()
    }
  }
}

export function createStore(resource: Resource): Store {
  return new StoreCreator(resource).store
}