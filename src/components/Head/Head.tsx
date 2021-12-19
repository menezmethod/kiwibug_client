import { Helmet } from 'react-helmet-async';

type HeadProps = {
  title?: string;
  description?: string;
};

export const Head = ({ title , description = '' }: HeadProps = {}) => {
  return (
    <Helmet
      title={title ? `${title} | KiwiBug Issue Tracker` : undefined}
      defaultTitle="KiwiBug Issue Tracker"
    >
      <meta name="description" content={description} />
    </Helmet>
  );
};