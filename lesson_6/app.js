function isEmpty(value) {
    let type = typeof value;
    if(value === undefined || value === null){
      return true;
    } else if(Array.isArray(value)){
      return value.length === 0 || value.every(x => x === undefined) || value.every(x => x === null);
    } else if (type === 'object') {
      return Object.keys(value).length === 0;
    } else if (type === 'string') {
      return value.length === 0;
    }
  }

  // current test cases
  isEmpty({});                  // true
  isEmpty({ name: 'Janice' });  // false
  isEmpty('');                  // true
  isEmpty('Janice');            // false
  isEmpty([]);                  // true
  isEmpty(['Janice']);          // false
  console.log(isEmpty([null]));              // true
  console.log(isEmpty([undefined]));         // true
  console.log(isEmpty(null));                // true
  console.log(isEmpty(undefined));           // true
  console.log(isEmpty([undefined, undefined, undefined]));