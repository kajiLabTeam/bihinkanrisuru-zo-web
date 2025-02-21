import { Link } from 'react-router';
import fukidashi from '~/assets/fukidashi.svg';
import mogura from '~/assets/mogura.png';
import styles from './index.module.css';

export default function TopPage() {
  return (
    <div className={styles.container}>
      <div>
        <div className={styles.message_box} data-fukidashi={fukidashi}>
          <p>
            <span>Welcome to</span>
            <br />
            <span>備品管理システム!!</span>
          </p>
          <img alt="吹き出し" src={fukidashi} />
        </div>

        <div className={styles.mogura_box}>
          <Link className={styles.link} to="/equipments">備品一覧</Link>
          <img alt="モグラ" className={styles.mogura} src={mogura} />
          <Link className={styles.link} to="/admin">管理者ログイン</Link>
        </div>

        <div className={styles.emphasis_line}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
}
