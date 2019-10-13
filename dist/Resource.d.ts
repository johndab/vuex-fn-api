import { AxiosInstance } from "axios";
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
    state?: object;
    axios?: AxiosInstance;
}
export declare class Resource {
    actions: ResourceActionMap;
    state: object;
    axios: AxiosInstance;
    constructor(options: ResourceOptions);
    add(options: ResourceActionOptions): Resource;
    private getDispatchString;
    private getCommitString;
}
export default Resource;
