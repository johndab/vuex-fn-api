import axios, { AxiosInstance } from "axios"
import { GetterTree } from "vuex"

export interface ResourceAction {
  request: (params: any) => Promise<any>
  property: string,
  beforeRequest: Function,
  onSuccess: Function,
  onError: Function,
  dispatchString: string,
  commitString: string,
  axios: AxiosInstance,
}

export interface ResourceActionMap {
  [action: string]: ResourceAction
}

export interface ResourceActionOptions {
  action: string
  request: (params: any) => Promise<any>
  property?: string
  beforeRequest?: Function
  onSuccess?: Function
  onError?: Function
}

export interface ResourceOptions {
  namespaced?: boolean,
  state?: object,
  axios?: AxiosInstance,
  getters?: GetterTree<any, any>
}

export class Resource {
  public namespaced: boolean
  public actions: ResourceActionMap = {}
  public state: object
  public getters: GetterTree<any, any>
  public axios: AxiosInstance

  constructor(options: ResourceOptions) {
    this.actions = {}
    this.namespaced = options.namespaced || false
    this.state = options.state || {}
    this.getters = options.getters || {}
    this.axios = options.axios || axios
  }

  add(options: ResourceActionOptions): Resource {
    this.actions[options.action] = {
      request: options.request,
      property: options.property,
      beforeRequest: options.beforeRequest,
      onSuccess: options.onSuccess,
      onError: options.onError,
      dispatchString: this.getDispatchString(options.action),
      commitString: this.getCommitString(options.action),
      axios: this.axios
    }

    return this
  }

  private getDispatchString(action: string): string {
    return action
  }

  private getCommitString(action: string): string {
    const capitalizedAction: string = action.replace(/([A-Z])/g, "_$1").toUpperCase()
    return `API_${capitalizedAction}`
  }
}

export default Resource