import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter} from 'react-router-dom'
import './index.css';
import App from './App';
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "./dev";

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   <QueryClientProvider client={queryClient}>
      <BrowserRouter>
         <DevSupport ComponentPreviews={ComponentPreviews}
                     useInitialHook={useInitial}
         >
            <App/>
         </DevSupport>
      </BrowserRouter>
   </QueryClientProvider>
)
