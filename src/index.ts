import { createStore, FullModule } from "./Store"
import { Resource, ResourceActionOptions, ResourceOptions } from "./Resource"

export class Vapi {
  private resource: Resource

  constructor(options: ResourceOptions) {
    this.resource = new Resource(options)
    return this
  }

  add<REQ, RES>(options: ResourceActionOptions<REQ, RES>): Vapi {
    this.resource.add<REQ, RES>(options)
    return this
  }

  getStore(): FullModule<any, any> {
    return createStore(this.resource)
  }
}

export default Vapi