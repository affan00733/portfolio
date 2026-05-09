import MainContainer from './components/MainContainer';
import { RoleProvider } from './context/RoleContext';

export default function App() {
  return (
    <RoleProvider>
      <MainContainer />
    </RoleProvider>
  );
}
