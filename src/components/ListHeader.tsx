import styles from './ListHeader.module.css';

interface ListHeaderProps {
  read: number;
  tasks: number;
}

export function ListHeader({ read, tasks }: ListHeaderProps) {
  const finishedCount = tasks > 0 ? `${read} de ${tasks}` : 0;
  return (
    <header className={styles.listHeader}>
      <div className={styles.created}>
        <span>Tarefas criadas</span>
        <span>{tasks}</span>
      </div>
      <div className={styles.finished}>
        <span>Concluídas</span>
        <span>{finishedCount}</span>
      </div>
    </header>
  );
}
