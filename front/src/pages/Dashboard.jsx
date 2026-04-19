import { useNavigate } from "react-router-dom";
import { logout } from "../services/auth.service";

export default function Dashboard() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  const secciones = [
    { label: "🗺️ Mapa del Campus", ruta: "/mapa" },
    { label: "👨‍🏫 Profesores", ruta: "/profesores" },
    { label: "❓ Preguntas Frecuentes", ruta: "/faqs" },
    { label: "💬 Foro Comunitario", ruta: "/foro" },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Bienvenido a UPB Primíparos 🎓</h1>
        <button onClick={handleLogout} style={styles.logout}>Cerrar sesión</button>
      </div>
      <p style={styles.subtitle}>¿Qué quieres explorar hoy?</p>
      <div style={styles.grid}>
        {secciones.map((s) => (
          <div key={s.ruta} onClick={() => navigate(s.ruta)} style={styles.card}>
            <span style={styles.cardLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "800px", margin: "0 auto" },
  header: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" },
  title: { fontSize: "1.8rem", fontWeight: 500, margin: 0 },
  subtitle: { color: "#888", fontSize: "15px", marginBottom: "2rem" },
  logout: { background: "none", border: "1px solid #ccc", borderRadius: "8px", padding: "8px 16px", cursor: "pointer", fontSize: "14px" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" },
  card: { backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "2rem", cursor: "pointer", textAlign: "center", minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" },
  cardLabel: { fontSize: "16px", fontWeight: 500 },
};