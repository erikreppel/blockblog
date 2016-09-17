export const getCookie = function(name) {
  const match = document.cookie.match(new RegExp(name + '=([^;]+)'));
  if (!!match) {
    return match[1];
  }
};
