import { AppLayout, EditablePage } from 'components';
import styles from 'styles/Editor.module.scss';

const Editor: React.FC = () => {
  return (
    <AppLayout>
      <EditablePage isEditable className={styles.editor} />
    </AppLayout>
  );
};

export default Editor;
