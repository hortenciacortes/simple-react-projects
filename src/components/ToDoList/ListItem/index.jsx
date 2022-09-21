import { useState } from 'react';
import { Check, PencilLine, Trash } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import './styles.scss';

export function ListItem({ task, indexItem, isChecked, list, setList }) {
  const [updateTask, setUpdateTask] = useState(task);
  
  function handleEdit(id) {
    document.querySelectorAll('input[type="text"].input-task').forEach((item) => {
      item.readOnly = true
      item.style = 'border-color: transparent';
      item.parentElement.classList.remove('message');
    })
    handleInput(id, true);
  }
  
  function handleInput(id, isEdit) {
    const inputSelected = document.getElementById(id);
    inputSelected.parentElement.classList.toggle('message');
    inputSelected.readOnly = !isEdit;
    inputSelected.focus();
    inputSelected.style = `border-color: ${isEdit ? '#468a9d63' : 'transparent'}`;
  }

  function handleKeyUp(e, id) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter') {
      const newList = list.map((item) => {
        updateTask === '' && item.id === id && setUpdateTask(item.task);
        
        return {
          id: item.id,
          task: item.id === id ? updateTask : item.task,
          isChecked: item.isChecked
        }
      })

      setList(newList);
      handleInput(id, false)
    }
  }

  function handleDelete(id) {
    const newList = list.filter((item) => item.id !== id).map((item) => {
      return {
        id: item.id,
        task: item.task,
        isChecked: item.isChecked
      }
    })
    setList(newList);
  }

  function handleCheck(isChecked, id) {
    const newList = list.map((item) => {
      return {
        id: item.id,
        task: item.task,
        isChecked: item.id == id ? isChecked : item.isChecked
      }
    })
    setList(newList);
  }

  return (
    <div className={isChecked ? 'task isChecked' : 'task'}>
      
      <div className='inputs'>
        <input
          type="text" value={updateTask} className="input input-task" id={indexItem}
          readOnly
          style={{borderColor: 'transparent'}}
          onChange={e => setUpdateTask(e.target.value)}
          onKeyUp={e => handleKeyUp(e, indexItem)}
        />
        <Checkbox.Root
          className="checkbox"
          checked={isChecked}
          onCheckedChange={(checked) => handleCheck(checked, indexItem) }
        >
          <Checkbox.Indicator>
            {isChecked && <Check className="checkbox-icon" weight="bold" />}
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <div>
        <PencilLine 
          className='icon'
          size={26} color="#04A0D9" weight="bold" 
          onClick={() => {handleEdit(indexItem)}} 
        />
        <Trash
          className='icon' 
          size={26} color="#843453" weight="bold"
          onClick={() => handleDelete(indexItem)} 
        />
      </div>
    </div>
  )
}