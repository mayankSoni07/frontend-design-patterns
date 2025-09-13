import { GetServerSideProps } from 'next';
import { HomeContainer } from '../containers/HomeContainer';

interface HomePageProps {
  initialData?: any;
}

export default function HomePage({ initialData }: HomePageProps) {
  return <HomeContainer />;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    // Simulate fetching initial data for SSR
    const initialData = {
      timestamp: new Date().toISOString(),
      userAgent: context.req.headers['user-agent'] || '',
    };

    return {
      props: {
        initialData,
      },
    };
  } catch (error) {
    console.error('Error in getServerSideProps:', error);
    return {
      props: {
        initialData: null,
      },
    };
  }
};
