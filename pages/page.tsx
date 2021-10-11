import { EditablePage } from 'components';
import lz from 'lzutf8';

const Page: React.FC = () => {
  const encoded = window.localStorage.getItem('state') || '';
  const state = lz.decompress(lz.decodeBase64(encoded)) || undefined;

  return <EditablePage isEditable={false} state={state} />;
};

export default Page;
