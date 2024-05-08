import styles from './ProgressBar.module.scss';
import { useTranslation } from 'react-i18next';

const ProgressBar = ({ progress }: { progress: number }) => {
  const { t } = useTranslation();
  return (
    <>
      <span className={styles.initialProgress}></span>
      <progress
        aria-label={t('progress.ariaLabel')}
        className={styles.progressBar}
        value={progress}
        max={100}
      ></progress>
    </>
  );
};

export default ProgressBar;
