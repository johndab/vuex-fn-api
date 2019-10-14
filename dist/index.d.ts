import { Module } from "vuex";
import { ResourceActionOptions, ResourceOptions } from "./Resource";
export declare class Vapi {
    private resource;
    constructor(options: ResourceOptions);
    add(options: ResourceActionOptions): Vapi;
    getStore(): Module<any, any>;
}
export default Vapi;
