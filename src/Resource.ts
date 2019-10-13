import axios, { AxiosInstance } from "axios"

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
  state?: object,
  axios?: AxiosInstance,
}

export class Resource {
  public actions: ResourceActionMap = {}
  public state: object
  public axios: AxiosInstance

  constructor(options: ResourceOptions) {
    this.actions = {}
    this.state = options.state || {}
    this.axios = options.axios || axios
  }

  add(options: ResourceActionOptions): Resource {
    options.property = options.property || null

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