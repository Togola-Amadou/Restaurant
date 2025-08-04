// src/components/PrivateRoute.jsx
import { Navigate } from 'react-router-dom';
import { useAuthState } from '../../firebase';
import { auth } from "../../firebase";

export default function PrivateRoute({ children }) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <p>Chargement...</p>;
  return user ? children : <Navigate to="/" />;
}
