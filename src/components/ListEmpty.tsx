import clipboard from '../assets/clipboard.svg';

import styles from './ListEmpty.module.css';

export function ListEmpty() {
  return (
    <div className={styles.list}>
      <img src={clipboard} />
      <p>Você ainda não tem tarefas cadastradas</p>
      <p>Crie tarefas e organize seus itens a fazer</p>
    </div>
  );
}
