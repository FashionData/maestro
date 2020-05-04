import Vue, { PluginFunction, VueConstructor } from 'vue';
import _Vue from 'vue';
import {InstallOptions} from './src/types';

interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const Maestro: { install: InstallFunction };
export default Maestro;

export declare const initializeApp: (Vue: VueConstructor<_Vue>, App: any, options: InstallOptions) => void;

export const MaestroSample: VueConstructor<Vue>;
