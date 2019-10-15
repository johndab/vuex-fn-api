import Resource from "./Resource";
import { ActionTree, MutationTree, Module, GetterTree } from 'vuex';
export interface FullModule<S, R> extends Module<S, R> {
    state: S | (() => S);
    getters: GetterTree<S, R>;
    actions: ActionTree<S, R>;
    mutations: MutationTree<S>;
}
export declare function createStore(resource: Resource): FullModule<any, any>;
