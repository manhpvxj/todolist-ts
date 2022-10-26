import './index.css';
import Home from './components/Home/Home';
import { QueryClient, QueryClientProvider } from 'react-query'
 
const queryClient = new QueryClient()
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home/>
    </QueryClientProvider>
    
  );
}

export default App;
