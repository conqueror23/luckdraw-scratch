import {DEFAULT,storage} from '../globalConfig.js'

  const addItem = () => {
    storage.setItem(DEFAULT, JSON.stringify([...list, name]));
    setList([...list, name]);
    setName("");
  };
  const deleteItem = (e) => {
    const { item } = e.currentTarget.dataset;
    storage.setItem(DEFAULT, JSON.stringify(list.filter((e) => e !== item)));
    setList(list.filter((e) => e !== item));
  };
  const reset=()=>{
    storage.clear()
    window.location.reload()
  }

export {addItem,deleteItem,reset}
