import { Store } from "./Store";
import { ResourceActionOptions, ResourceOptions } from "./Resource";
export declare class Vapi {
    private resource;
    constructor(options: ResourceOptions);
    add(options: ResourceActionOptions): Vapi;
    getStore(): Store;
}
export default Vapi;
