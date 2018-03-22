//存储

export const setStore = (name, content) => {
  if(!name) return;
  if(typeof content !== 'string'){
    content = JSON.stringify(content);
  }
  window.localStorage.setItem(name, content);
}

//取

export const getStore = (key)=> {
  if(!key) return;
  return window.localStorage.getItem(key);
}

//delete

export const removeStore = (key) => {
  if(!key) return ;
   window.localStorage.removeItem(key);
}
