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
export interface ResourceActionOptions<REQ, RES> {
    action: string;
    request: (params: REQ) => Promise<RES>;
    property?: string;
    beforeRequest?: (s: any, req: REQ) => void;
    onSuccess?: (s: any, res: RES, req: REQ) => void;
    onError?: (s: any, res: RES, req: REQ) => void;
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
    add<REQ, RES>(options: ResourceActionOptions<REQ, RES>): Resource;
    private getDispatchString;
    private getCommitString;
}
export default Resource;
