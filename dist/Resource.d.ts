import { AxiosInstance } from "axios";
import { GetterTree } from "vuex";
export interface ResourceAction {
    request: (params: any) => Promise<any>;
    property: string;
    beforeRequest: Function;
    onSuccess: Function;
    onError: Function;
    dispatchString: string;
    commitString: string;
    axios: AxiosInstance;
}
export interface ResourceActionMap {
    [action: string]: ResourceAction;
}
export interface ResourceActionOptions {
    action: string;
    request: (params: any) => Promise<any>;
    property?: string;
    beforeRequest?: Function;
    onSuccess?: Function;
    onError?: Function;
}
export interface ResourceOptions {
    namespaced?: boolean;
    state?: object;
    axios?: AxiosInstance;
    getters?: GetterTree<any, any>;
}
export declare class Resource {
    namespaced: boolean;
    actions: ResourceActionMap;
    state: object;
    getters: GetterTree<any, any>;
    axios: AxiosInstance;
    constructor(options: ResourceOptions);
    add(options: ResourceActionOptions): Resource;
    private getDispatchString;
    private getCommitString;
}
export default Resource;
