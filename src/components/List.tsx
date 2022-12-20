import { ListItem } from './ListItem';

import styles from './List.module.css';

export interface Item {
  id: string;
  description: string;
  readAt?: Date | null;
}

interface ListProps {
  items: Item[];
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
}

export function List({ items, onDelete, onToggle }: ListProps) {
  return (
    <div className={styles.list}>
      <main className={styles.content}>
        <ul>
          {items.map((item) => {
            return (
              <ListItem
                key={item.id}
                item={item}
                onDelete={onDelete}
                onToggle={onToggle}
              />
            );
          })}
        </ul>
      </main>
    </div>
  );
}
