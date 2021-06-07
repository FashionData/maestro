import Vue from 'vue';
import { AnyObject } from "@/types";

declare global {
  interface Object {
    byString: (object: AnyObject, string: string) => AnyObject | undefined;
  }
}

export const injectPrototypes = () => {
  Object.byString = function(o: AnyObject, s: string) {
    s = s.replace(/\[(\w+)\]/g, '.$1'); // convert indexes to properties
    s = s.replace(/^\./, '');           // strip a leading dot
    let a = s.split('.');
    for (let i = 0, n = a.length; i < n; ++i) {
      let k = a[i];
      if (k in o) {
        o = o[k];
      } else {
        return;
      }
    }
    return o;
  }

  Vue.prototype.$roundToOneDecimal = (numberToRound: number) => {
    return Math.round(numberToRound * 10) / 10;
  };

  Vue.prototype.$roundToTwoDecimals = (numberToRound: number) => {
    return Math.round((numberToRound + Number.EPSILON) * 100) / 100;
  };

  Vue.prototype.$formatWithSign = (numberToFormat: number) => {
    return Math.sign(numberToFormat) > 0 ? `+${numberToFormat}` : numberToFormat;
  };
}
