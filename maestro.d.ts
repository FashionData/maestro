import Vue, { PluginFunction, VueConstructor } from 'vue';


interface InstallFunction extends PluginFunction<any> {
  installed?: boolean;
}

declare const Maestro: { install: InstallFunction };
export default Maestro;

export const MaestroSample: VueConstructor<Vue>;
