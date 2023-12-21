import React from 'react';
import { createRoot } from 'react-dom/client';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
//import { Provider } from 'react-redux';
//import { store } from './app/store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const container = document.getElementById('root')!;
const root = createRoot(container);
const queryClient = new QueryClient({
    defaultOptions:{
        queries: {
            refetchOnWindowFocus: false,
            staleTime: Infinity,
            cacheTime: Infinity,

        }
    }
})

root.render(
  <React.StrictMode>

        <QueryClientProvider client={queryClient}>
            <App />
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>

  </React.StrictMode>
);

reportWebVitals();
