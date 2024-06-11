// https://github.com/iansinnott/react-string-replace

import { ReactNode } from 'react';

/* eslint-disable vars-on-top, no-var, prefer-template */
var isRegExp = function (re: any) {
  return re instanceof RegExp;
};
var escapeRegExp = function escapeRegExp(string: string) {
  var reRegExpChar = /[\\^$.*+?()[\]{}|]/g;
  var reHasRegExpChar = RegExp(reRegExpChar.source);

  return (string && reHasRegExpChar.test(string))
    ? string.replace(reRegExpChar, '\\$&')
    : string;
};
var isString = function (value: any) {
  return typeof value === 'string';
};
var flatten = function (array: any[]) {
  var newArray: any[] = [];

  array.forEach((item: ConcatArray<any>) => {
    if (Array.isArray(item)) {
      newArray = newArray.concat(item);
    } else {
      newArray.push(item);
    }
  });

  return newArray;
};

/**
 * Given a string, replace every substring that is matched by the `match` regex
 * with the result of calling `fn` on matched substring. The result will be an
 * array with all odd indexed elements containing the replacements. The primary
 * use case is similar to using String.prototype.replace except for React.
 *
 * React will happily render an array as children of a react element, which
 * makes this approach very useful for tasks like surrounding certain text
 * within a string with react elements.
 *
 * Example:
 * matchReplace(
 *   'Emphasize all phone numbers like 884-555-4443.',
 *   /([\d|-]+)/g,
 *   (number, i) => <strong key={i}>{number}</strong>
 * );
 * // => ['Emphasize all phone numbers like ', <strong>884-555-4443</strong>, '.'
 *
 * @param {string} str
 * @param {RegExp|str} match Must contain a matching group
 * @param {function} fn
 * @return {array}
 */
function replaceString(str: string, match: any, fn: (arg0: any, arg1: number, arg2: number) => any) {
  var curCharStart = 0;
  var curCharLen = 0;

  if (str === '') {
    return str;
  } if (!str || !isString(str)) {
    throw new TypeError('First argument to react-string-replace#replaceString must be a string');
  }

  var re = match;

  if (!isRegExp(re)) {
    re = new RegExp('(' + escapeRegExp(re) + ')', 'gi');
  }

  var result = str.split(re);

  // Apply fn to all odd elements
  for (var i = 1, { length } = result; i < length; i += 2) {
    /** @see {@link https://github.com/iansinnott/react-string-replace/issues/74} */
    if (result[i] === undefined || result[i - 1] === undefined) {
      console.warn('reactStringReplace: Encountered undefined value during string replacement. Your RegExp may not be working the way you expect.');
      continue;
    }

    curCharLen = result[i].length;
    curCharStart += result[i - 1].length;
    result[i] = fn(result[i], i, curCharStart);
    curCharStart += curCharLen;
  }

  return result;
}

export default function reactStringReplace(source: string | string[], match: string | RegExp, fn: (matchedString: string, index: number) => ReactNode) {
  if (!Array.isArray(source)) source = [source];

  return flatten(source.map((x: any) => (isString(x) ? replaceString(x, match, fn) : x)));
}
