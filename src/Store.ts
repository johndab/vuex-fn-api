import Resource from "./Resource"
import { ActionTree, MutationTree, Module, GetterTree } from 'vuex';
import * as cloneDeep from "lodash.clonedeep"


export interface FullModule<S, R> extends Module<S, R> {
  state: S | (() => S);
  getters: GetterTree<S, R>;
  actions: ActionTree<S, R>;
  mutations: MutationTree<S>;
}

class StoreCreator {
  private resource: Resource
  private successSuffix: string = "SUCCEEDED"
  private errorSuffix: string = "FAILED"
  public store: FullModule<any, any>

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

  createGetters(): GetterTree<any, any> {
    return this.resource.getters;
  }

  createMutations(defaultState: Object): MutationTree<any> {
    const mutations = {}

    const actions = this.resource.actions
    Object.keys(actions).forEach((action) => {
      const { property, commitString, beforeRequest, onSuccess, onError } = actions[action]

      mutations[`${commitString}`] = (state, actionParams) => {

        if (property) {
          state.pending[property] = true
          state.error[property] = null
        }

        if (beforeRequest) {
          beforeRequest(state, actionParams)
        }
      }
      mutations[`${commitString}_${this.successSuffix}`] = (state, { payload, actionParams }) => {

        if (property) {
          state.pending[property] = false
          state.error[property] = null
        }

        if (onSuccess) {
          onSuccess(state, payload, actionParams)
        } else if (property) {
          state[property] = payload
        }
      }
      mutations[`${commitString}_${this.errorSuffix}`] = (state, { payload, actionParams }) => {

        if (property) {
          state.pending[property] = false
          state.error[property] = payload
        }

        if (onError) {
          onError(state, payload, actionParams)
        } else if (property) {

          // sets property to it's default value in case of an error
          state[property] = defaultState[property]
        }
      }
    })

    return mutations
  }

  createActions(): ActionTree<any, any> {
    const storeActions = {}

    const actions = this.resource.actions
    Object.keys(actions).forEach((action) => {
      const { dispatchString, commitString, request } = actions[action]

      storeActions[dispatchString] = async ({ commit }, actionParams = {}) => {
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

  createStore(): FullModule<any, any> {
    const state = this.createState()

    return {
      state,
      namespaced: this.resource.namespaced,
      mutations: this.createMutations(state),
      actions: this.createActions(),
      getters: this.createGetters()
    }
  }
}

export function createStore(resource: Resource): FullModule<any, any> {
  return new StoreCreator(resource).store
}