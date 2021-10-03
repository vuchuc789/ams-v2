import { AppLayout, EditablePage, LoginRequired } from 'components';
import styles from 'styles/Editor.module.scss';

const Editor: React.FC = () => {
  return (
    <LoginRequired>
      <AppLayout>
        <EditablePage isEditable className={styles.editor} />
      </AppLayout>
    </LoginRequired>
  );
};

export default Editor;
