import { EditablePage } from 'components';
import lz from 'lzutf8';

const Page: React.FC = () => {
  if (typeof window === 'undefined') {
    return <div></div>;
  }
  const encoded = window.localStorage.getItem('state') || '';
  const state = lz.decompress(lz.decodeBase64(encoded)) || undefined;

  return <EditablePage isEditable={false} initData={state} />;
};

export default Page;
