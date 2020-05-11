import minimist from 'minimist';

import { esConfig } from "./es.config";
import { cloudFunctionsConfig } from "./cloud-functions.config";
import { umdConfig } from "./cjs.config";
import { unpkgConfig } from "./iife.config";

const buildFormats = [cloudFunctionsConfig];
const argv = minimist(process.argv.slice(2));

if (!argv.format || argv.format === 'es') buildFormats.push(esConfig);
if (!argv.format || argv.format === 'cjs') buildFormats.push(umdConfig);
if (!argv.format || argv.format === 'iife') buildFormats.push(unpkgConfig);

export default buildFormats;
