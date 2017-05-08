/** @module utils/generate-unique-id */

export default function generateUniqueId () {
  var s4;

  if (typeof s4 === 'undefined') {
    s4 = function () {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    };
  }

  return [
    s4(), s4(),
    '-',
    s4(),
    '-',
    s4(),
    '-',
    s4(),
    '-',
    s4(), s4(), s4()
  ].join('');
};