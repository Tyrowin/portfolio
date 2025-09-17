import styles from '@/styles/Home.module.css';
import { OperatingSystem } from '@/components/OperatingSystem';

export default function Home() {
  return (
    <main className={styles.main}>
      <OperatingSystem />
    </main>
  );
}
