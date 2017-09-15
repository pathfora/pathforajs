/** @module pathfora/utils/cookie/update-legacy-cookies */

// dom
import document from '../../dom/document';

// global
import {
  PREFIX_REC,
  PREFIX_UNLOCK,
  PREFIX_IMPRESSION,
  PREFIX_CONFIRM,
  PREFIX_CANCEL,
  PREFIX_CLOSE,
  PREFIX_AB_TEST,
  PF_PAGEVIEWS
} from '../../globals/config';

// utils
import deleteCookie from './delete-cookie';
import saveCookie from './save-cookie';


/**
 * Update legacy cookies to
 * encoded cookie values.
 *
 * @exports updateLegacyCookies
 */
export default function updateLegacyCookies () {
  // We should update all cookies that have these prefixes.
  var cookieFind = [
    PREFIX_REC,
    PREFIX_UNLOCK,
    PREFIX_IMPRESSION,
    PREFIX_CONFIRM,
    PREFIX_CANCEL,
    PREFIX_CLOSE,
    PREFIX_AB_TEST,
    PF_PAGEVIEWS
  ];

  var i = 0;

  var filterFunc = function (c) {
    return c.trim().indexOf(cookieFind[i]) === 0;
  };

  var cookieFunc = function (c) {
    var split = c.trim().split('=');

    if (split.length === 2) {
      var name = split[0];
      var val = split[1];
      if (val === decodeURIComponent(val)) {
        deleteCookie(name);
        saveCookie(encodeURIComponent(name), encodeURIComponent(val));
      }
    }
  };

  var sessionFunc = function (c) {
    var val = sessionStorage.getItem(c);
    if (val === decodeURIComponent(val)) {
      sessionStorage.removeItem(c);
      sessionStorage.setItem(encodeURIComponent(c), encodeURIComponent(val));
    }
  };

  for (i = 0; i < cookieFind.length; i++) {
    document.cookie.split(';').filter(filterFunc).forEach(cookieFunc);
    Object.keys(sessionStorage).filter(filterFunc).forEach(sessionFunc);
  }
}
