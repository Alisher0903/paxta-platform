import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter as Router} from 'react-router-dom';
import {QueryClient, QueryClientProvider} from 'react-query';
import App from './App.tsx'
import './index.css'
import {Toaster} from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <Router>
            <QueryClientProvider client={queryClient}>
                <App/>
                <Toaster
                    position="bottom-right"
                    reverseOrder={true}
                    toastOptions={{
                        style: {
                            zIndex: 10000,
                        },
                    }}
                />
            </QueryClientProvider>
        </Router>
    </StrictMode>
)
