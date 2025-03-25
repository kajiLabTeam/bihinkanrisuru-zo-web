import { CLIENT_LINK_DATA, TOP_LINK_DATA } from '@/constants';
import { Link } from 'react-router';
import fukidashi from '~/assets/fukidashi.svg';
import mogura from '~/assets/mogura.png';
import styles from './index.module.css';

interface Props {
  mode: 'top' | 'client';
}

export default function TopPage({ mode = 'top' }: Props) {
  const linkData = mode === 'top' ? TOP_LINK_DATA : CLIENT_LINK_DATA;

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
          {
            Object.entries(linkData).map(([path, text]) => (
              <Link className={styles.link} key={path} to={path}>{text}</Link>
            ))
          }
          <img alt="モグラ" className={styles.mogura} src={mogura} />
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
