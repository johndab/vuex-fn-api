import { FullModule } from "./Store";
import { ResourceActionOptions, ResourceOptions } from "./Resource";
export declare class Vapi {
    private resource;
    constructor(options: ResourceOptions);
    add<REQ, RES>(options: ResourceActionOptions<REQ, RES>): Vapi;
    getStore(): FullModule<any, any>;
}
export default Vapi;
