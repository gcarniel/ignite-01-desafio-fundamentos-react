import { Trash } from 'phosphor-react';
import { Item } from './List';

import checked from '../assets/checked.svg';
import unchecked from '../assets/unchecked.svg';

import { SyntheticEvent } from 'react';

import styles from './ListItem.module.css';

interface ItemProps {
  item: Item;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function ListItem({ item, onDelete, onToggle }: ItemProps) {
  function handleDelete(event: SyntheticEvent<EventTarget>, id: string) {
    event.stopPropagation();
    onDelete(id);
  }

  return (
    <li className={styles.item} onClick={() => onToggle(item.id)}>
      <span>
        {item.readAt ? <img src={checked} /> : <img src={unchecked} />}
      </span>
      <div className={item.readAt ? styles.read : ''}>{item.description}</div>
      <span className={styles.trash} onClick={(e) => handleDelete(e, item.id)}>
        <Trash size={24} />
      </span>
    </li>
  );
}
