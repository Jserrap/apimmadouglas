import Sidebar from './components/Sidebar';
import AppRoutes from './routes/AppRoutes';
import './index.css';

export default function App() {
  return (
    <div className="min-h-screen bg-neutral-950 text-gray-100">
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <AppRoutes />
        </main>
      </div>
    </div>
  );
}