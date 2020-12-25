const capitalize = (str) => {
  let newStr = '';
  if (str !== '') {
    newStr = str.trim().split(' ').map((element) => element.charAt(0).toUpperCase() + element.slice(1));
    newStr = newStr.join(' ');
  }

  return newStr;
}

export { capitalize };