import logo from './logo.svg';
import './App.css';
import { RouterProvider } from 'react-router-dom';
import { router } from './Routes/Routes/Routes';

import {
  useQuery,
  
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Toaster } from 'react-hot-toast';


function App() {
  return (
   <div >
   <RouterProvider router={router}></RouterProvider>
  <Toaster></Toaster>
   </div>
  );
}

export default App;
