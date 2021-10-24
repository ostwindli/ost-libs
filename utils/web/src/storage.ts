type StorageData = {
  value?: any;
  expires?: any;
};
/**
 * ls
 * 	ls('name', value, expires);
 * 	ls('name');
 * 	ls('name', null);
 */
export function ls(name, value, expires) {
  // remove
  if (value === null) {
    removeItem(name);
    return;
  }

  // get
  if (typeof value == "undefined") {
    return getItem(name);
  }

  // set
  setItem(name, value, expires);
}

/**
 * set item
 *  name
 *  value
 *  expires, days
 */
function setItem(name, value, expires) {
  let obj: StorageData = { value };
  if (expires) obj.expires = Date.now() + expires * 24 * 60 * 60 * 1000;

  localStorage.setItem(name, JSON.stringify(obj));
}

/**
 * get item
 *  name
 */
function getItem(name) {
  let objStr = localStorage.getItem(name);
  let obj;
  try {
    obj = JSON.parse(objStr);
  } catch (e) {
    console.log("json parse error:");
    console.log(e);
  }
  if (!obj) return;

  if (obj.expires && obj.expires < Date.now()) {
    localStorage.removeItem(name);
    return;
  }

  return obj.value;
}

/**
 * remove item
 */
function removeItem(name) {
  if (!localStorage) {
    console.log("unsupport localStorage");
    return;
  }

  localStorage.removeItem(name);
}
