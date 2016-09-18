export const getCookie = function(name) {
  const match = document.cookie.match(new RegExp(name + '=([^;]+)'));
  if (!!match) {
    return match[1];
  }
};

export const sort = function(array, key) {
  if (array.length < 1) {
    return array;
  }
  return array.sort(function(b, a) {
    const x = a[key];
    const y = b[key];
    return ((x < y) ? -1 : ((x > y) ? 1 : 0));
  });
};

export const DOMAIN = window.location.href;
