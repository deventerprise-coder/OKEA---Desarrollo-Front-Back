import okeaLogo from '../../assets/iconos/okea_logo.svg';
import { useNavigate } from 'react-router-dom';

export default function Logo() {
  const navigate = useNavigate();

  return (
    <button
      className="ml-[130px] focus:outline-none"
      onClick={() => navigate('/')}
      style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer' }}
      aria-label="Ir al inicio"
    >
      <img src={okeaLogo} alt="Okea Logo" className="h-10 w-auto" />
    </button>
  );
}