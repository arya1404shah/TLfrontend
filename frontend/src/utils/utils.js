export const logout = () => {
  localStorage.removeItem('email')
  localStorage.removeItem('lname')
  localStorage.removeItem('fname')
  localStorage.removeItem('token')
  return ({
    email: null,
    fname: null,
    lname: null,
    token: null,
  })
}

export const getUser = () => ({
  email: localStorage.getItem('email'),
  fname: localStorage.getItem('fname'),
  lname: localStorage.getItem('lname'),
  token: localStorage.getItem('token'),
})

export const parseKVData = (arr) => {
  const res = {}
  arr.forEach(item => { res[item.key] = item.val })
  return res
}

export function debounce(func, wait, immediate) {
  var timeout;
  return function() {
      var context = this, args = arguments;
      var later = function() {
          timeout = null;
          if (!immediate) func.apply(context, args);
      };
      var callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func.apply(context, args);
  };
};
