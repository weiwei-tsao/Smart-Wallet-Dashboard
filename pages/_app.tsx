import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { wrapper } from '../src/store/store';
import '../src/styles/index.css';

function App({ Component, pageProps }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(pageProps);

  return (
    <Provider store={store}>
      <Component {...props.pageProps} />
    </Provider>
  );
}

export default App;
