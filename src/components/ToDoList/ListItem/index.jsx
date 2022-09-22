import { useState } from 'react';
import { Check, CheckCircle, PencilLine, Trash } from "phosphor-react";
import * as Checkbox from '@radix-ui/react-checkbox';
import './styles.scss';

export function ListItem({ task, indexItem, isDone, list, setList }) {
  const [updateTask, setUpdateTask] = useState(task);
  const [isEditMode, setIsEditMode] = useState(false);
  
  function handleEditInput(id, isEdit) {
    const pencilIcon = '<rect width="256" height="256" fill="none"></rect><path d="M96,216H48a8,8,0,0,1-8-8V163.3a7.9,7.9,0,0,1,2.3-5.6l120-120a8,8,0,0,1,11.4,0l44.6,44.6a8,8,0,0,1,0,11.4Z" fill="none" stroke="#04A0D9" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></path><line x1="136" y1="64" x2="192" y2="120" fill="none" stroke="#04A0D9" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="44" y1="156" x2="104" y2="216" fill="none" stroke="#04A0D9" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="216" y1="216" x2="96" y2="216" fill="none" stroke="#04A0D9" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line><line x1="164" y1="92" x2="72" y2="184" fill="none" stroke="#04A0D9" stroke-linecap="round" stroke-linejoin="round" stroke-width="24"></line>';
    
    document.querySelectorAll('input[type="text"].input-task').forEach((item) => {
      item.parentElement.parentElement.lastChild.firstChild.innerHTML = pencilIcon;
      item.readOnly = true;
      item.style = 'border-color: transparent';
    })

    const inputSelected = document.getElementById(id);
    inputSelected.readOnly = !isEdit;
    inputSelected.focus();
    inputSelected.style = `border-color: ${isEdit ? '#468a9d63' : 'transparent'}`;
    setIsEditMode(true)
  }

  function handleUpdateTask(e, id) {
    if (e.code === 'Enter' || e.code === 'NumpadEnter' || e._reactName) {
      const newList = list.map((item) => {
        updateTask === '' && item.id === id && setUpdateTask(item.task);
        
        return {
          id: item.id,
          task: item.id === id ? updateTask : item.task,
          isDone: item.isDone
        }
      })
      setList(newList);
      handleEditInput(id, false);
      setIsEditMode(false);
    }
  }

  function handleRemoveTask(id) {
    const newList = list.filter((item) => item.id !== id).map((item) => {
      return {
        id: item.id,
        task: item.task,
        isDone: item.isDone
      }
    })
    setList(newList);
  }

  function handleEditTaskCheck(isChecked, id) {
    const newList = list.map((item) => {
      return {
        id: item.id,
        task: item.task,
        isDone: item.id == id ? isChecked : item.isDone
      }
    })
    setList(newList);
  }

  return (
    <div className={isDone ? 'task isDone' : 'task'}>
      
      <div className='inputs'>
        <input
          type="text" value={updateTask} className="input input-task" id={indexItem}
          readOnly
          style={{borderColor: 'transparent'}}
          onChange={e => setUpdateTask(e.target.value)}
          onKeyUp={e => handleUpdateTask(e, indexItem)}
        />
        <Checkbox.Root
          className="checkbox"
          checked={isDone}
          onCheckedChange={(checked) => handleEditTaskCheck(checked, indexItem) }
        >
          <Checkbox.Indicator>
            {isDone && <Check className="checkbox-icon" weight="bold" />}
          </Checkbox.Indicator>
        </Checkbox.Root>
      </div>
      <div>
        {isEditMode ? 
          <CheckCircle 
            className='icon' 
            size={26} color="#04a0d9" weight="bold"
            onClick={(e) => handleUpdateTask(e, indexItem)} 
          /> :
          <PencilLine
            className='icon'
            size={26} color="#04A0D9" weight="bold"
            onClick={() => handleEditInput(indexItem, true)}
          />
        }
        <Trash
          className='icon' 
          size={26} color="#843453" weight="bold"
          onClick={() => handleRemoveTask(indexItem)} 
        />
      </div>
    </div>
  )
}