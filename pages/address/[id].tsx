import { GetServerSideProps, GetStaticProps } from 'next';
import Head from 'next/head';
import { Dashboard } from '../../src/pages';
import { Transaction, Token } from '../../src/types';

interface AddressPageProps {
  address: string;
  txs: Transaction[];
  tokens: Token[];
  error?: string;
}

// SSR 版本 - 每次请求都获取最新数据
export const getServerSideProps: GetServerSideProps<AddressPageProps> = async (
  context
) => {
  const address = context.query.id as string;

  if (!address) {
    return {
      notFound: true,
    };
  }

  try {
    // 调用 BFF 服务获取数据
    const baseUrl = process.env.BFF_BASE_URL || 'http://localhost:3001';

    const [txsRes, tokensRes] = await Promise.all([
      fetch(`${baseUrl}/api/txs?address=${address}`),
      fetch(`${baseUrl}/api/tokens?address=${address}`),
    ]);

    if (!txsRes.ok || !tokensRes.ok) {
      throw new Error('Failed to fetch data from BFF service');
    }

    const txsData = await txsRes.json();
    const tokensData = await tokensRes.json();

    return {
      props: {
        address,
        txs: txsData.transactions || [],
        tokens: tokensData.tokens || [],
      },
    };
  } catch (error) {
    console.error('Error fetching data:', error);

    return {
      props: {
        address,
        txs: [],
        tokens: [],
        error: 'Failed to load wallet data. Please try again later.',
      },
    };
  }
};

// ISR 版本 - 增量静态生成（注释掉，可以根据需要启用）
/*
export const getStaticProps: GetStaticProps<AddressPageProps> = async (context) => {
  const address = context.params?.id as string;
  
  if (!address) {
    return {
      notFound: true,
    };
  }

  try {
    const baseUrl = process.env.BFF_BASE_URL || 'http://localhost:3001';
    
    const [txsRes, tokensRes] = await Promise.all([
      fetch(`${baseUrl}/api/txs?address=${address}`),
      fetch(`${baseUrl}/api/tokens?address=${address}`),
    ]);

    const txsData = await txsRes.json();
    const tokensData = await tokensRes.json();

    return {
      props: {
        address,
        txs: txsData.transactions || [],
        tokens: tokensData.tokens || [],
      },
      revalidate: 60, // 每60秒重新生成页面
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};

export const getStaticPaths = async () => {
  // 对于动态路由，我们可以返回空数组让 Next.js 按需生成
  return {
    paths: [],
    fallback: 'blocking', // 当页面不存在时，在服务器端生成
  };
};
*/

function AddressPage({ address, txs, tokens, error }: AddressPageProps) {
  return (
    <>
      <Head>
        <title>Wallet Dashboard - {address}</title>
        <meta
          name='description'
          content={`View wallet details for address ${address}`}
        />
      </Head>
      <Dashboard
        address={address}
        initialTransactions={txs}
        initialTokens={tokens}
        error={error}
      />
    </>
  );
}

export default AddressPage;
