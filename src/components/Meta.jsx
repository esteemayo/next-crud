import Head from 'next/head';

const Meta = ({ title, keywords, description }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta name='keywords' content={keywords} />
      <meta name='description' content={description} />
      <meta http-equiv='X-UA-Compatible' content='IE=7' />
      <meta http-equiv='Content-Type' content='text/html;charset=UTF-8' />
      <meta name='viewport' content='width=device-width, initial-scale=1.0' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  );
};

Meta.defaultProps = {
  title: 'Task App',
  keywords: 'Task app is a task management application',
  description: 'tasks, todos etc',
};

export default Meta;
