import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from 'react-query'
import { RecoilRoot } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { darkTheme } from './theme';
import App from "./App";

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement);
root.render(
  <div>
    <RecoilRoot>
      <ThemeProvider theme = {darkTheme}>
          <QueryClientProvider client={queryClient}>
              <App/>
          </QueryClientProvider>
        </ThemeProvider>
    </RecoilRoot>
  </div>
);

