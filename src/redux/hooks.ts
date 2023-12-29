/* eslint-disable react-hooks/exhaustive-deps */
import {useDispatch, useSelector} from 'react-redux';
import type {TypedUseSelectorHook} from 'react-redux';
import type {RootState, AppDispatch} from './store';
import {addTask, deleteTask, editTask, toggleDone} from './slices/tasksSlice';
import {useCallback, useState} from 'react';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export type TypeToDoItem = {
  id: number;
  text: string;
  done: boolean;
  time: number;
};

export const useManageTasks = () => {
  const tasks = useAppSelector(state => state.tasks);
  const [textInput, setTextInput] = useState<string>('');
  const [editItem, setEditItem] = useState<any>(null);
  const dispatch = useAppDispatch();

  const addToDoItem = (): void => {
    if (!textInput) {
      return;
    }
    const newItem: TypeToDoItem = {
      id: editItem ? editItem?.id : Date.now(),
      text: textInput,
      done: false,
      time: Date.now(),
    };

    const editedItem = {
      index: editItem?.index,
      updatedItem: {...newItem},
    };

    if (editItem) {
      dispatch(editTask(editedItem));
      setEditItem(null);
    } else {
      dispatch(addTask(newItem));
    }
    setTextInput('');
  };

  const markCompleted = useCallback((id: number): void => {
    dispatch(toggleDone(id));
  }, []);

  const deleteToDoItem = useCallback((id: number): void => {
    dispatch(deleteTask(id));
  }, []);

  const editTodoItem = useCallback((index: number) => {
    setTextInput(tasks?.[index]?.text);
    setEditItem({...tasks?.[index], index});
  }, []);

  return {
    tasks,
    addToDoItem,
    deleteToDoItem,
    markCompleted,
    setTextInput,
    textInput,
    editTodoItem,
  };
};
