import React, { useEffect, useState } from 'react';
import './css/style.css';
import logo from'./images/logo.png';
import {
    getLocalStorageTodoData,
    setLocalStorageTodoData
} from "./LocalStorage";

const Todo = () => {
    const [item, setItem] = useState("");
    const [store, setStore] = useState(getLocalStorageTodoData() || []);  
    const [toggleSubmit, setToggleSubmit] = useState(true);
    const [iseditItem, setIsEditItem] = useState('');

    const inputEvent = (event) => {
        setItem(event.target.value);
    }

    useEffect(() => {
        setLocalStorageTodoData(store);
    }, [store]);

    const setEvent = () => {
        if(!item){
            return;
        }else if(item && !toggleSubmit){
            setStore(
                store.map((ele)=>{
                    if(ele.id === iseditItem){
                        return{...ele, name:item}
                    }
                    return ele;
                })
            )
            setToggleSubmit(true);
            setItem('');
            setIsEditItem('');
        }else{
            const allInputData = {id : new Date().getTime().toString(), name:item}
            setStore((preValue) => {
                return [...preValue,allInputData];
            });
            setItem("");
        }
    }
    const deleteItem = (index) => {
        setStore(store.filter((ele)=>{
            return ele.id!==index;
        }))
    }

    const deleteAll = () => {
        setStore([]);
    }

    const editItem = (id) => {
        let newEditItem = store.find((ele)=>{
            return id===ele.id;
        });
        setToggleSubmit(false);
        setItem(newEditItem.name);
        setIsEditItem(id);
    }

  return (
    <>
        <div className="main">
            <div className="child">
                <figure>
                    <img src={logo} alt='logo'/>
                    <figcaption>Add Your Items Here✌️</figcaption>
                </figure>
                <div className="addItems">
                    <input type='text' placeholder="✍️ Add Items" autoComplete='off' name='item' value={item} onChange={inputEvent}/>
                    {
                        toggleSubmit ? <i className="fa-duotone fa-solid fa-circle-plus" title="Add Item" onClick={setEvent}></i> :
                        <i class="fa-duotone fa-solid fa-circle-check" title="Update Item" onClick={setEvent}></i>
                    }
                </div>
                <div className="showItems">
                    {store.map((ele)=>{
                        return(
                        <div className="eachItem" key={ele.id}>
                            <h3>{ele.name}</h3>
                            <i className="edit fa-duotone fa-solid fa-pen-to-square" title="Edit Item" onClick={() => editItem(ele.id)}></i>
                            <i className="del fa-duotone fa-solid fa-trash-can" title="Delete Item" onClick={() => deleteItem(ele.id)}></i>
                        </div>
                        )
                    })}   
                    </div>
                <div className="showItems">
                    <button className='btn effect-04' data-sm-link-text="REMOVE ALL" title="Clear All Items" onClick={deleteAll}><span>CHECK LIST</span></button>
                </div>
            </div>
        </div>
    </>
  )
}

export default Todo;
