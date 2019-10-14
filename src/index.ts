import { Module } from "vuex";
import { createStore } from "./Store"
import { Resource, ResourceActionOptions, ResourceOptions } from "./Resource"

export class Vapi {
  private resource: Resource

  constructor(options: ResourceOptions) {
    this.resource = new Resource(options)
    return this
  }

  add(options: ResourceActionOptions): Vapi {
    this.resource.add(options)
    return this
  }

  getStore(): Module<any, any> {
    return createStore(this.resource)
  }
}

export default Vapi