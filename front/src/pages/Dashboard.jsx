import { useNavigate } from "react-router-dom";
import Layout from "../components/organisms/Layout";

export default function Dashboard() {
  const navigate = useNavigate();

  const secciones = [
    { label: "🗺️ Mapa del Campus", ruta: "/mapa" },
    { label: "👨‍🏫 Profesores", ruta: "/profesores" },
    { label: "❓ Preguntas Frecuentes", ruta: "/faqs" },
    { label: "💬 Foro Comunitario", ruta: "/foro" },
  ];

  return (
    <Layout>
      <h1 style={styles.title}>Bienvenido a UPB Primíparos 🎓</h1>
      <p style={styles.subtitle}>¿Qué quieres explorar hoy?</p>
      <div style={styles.grid}>
        {secciones.map((s) => (
          <div key={s.ruta} onClick={() => navigate(s.ruta)} style={styles.card}>
            <span style={styles.cardLabel}>{s.label}</span>
          </div>
        ))}
      </div>
    </Layout>
  );
}

const styles = {
  title: { fontSize: "1.8rem", fontWeight: 500, margin: "0 0 8px 0" },
  subtitle: { color: "#888", fontSize: "15px", marginBottom: "2rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "1rem" },
  card: { backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "2rem", cursor: "pointer", textAlign: "center", minHeight: "120px", display: "flex", alignItems: "center", justifyContent: "center" },
  cardLabel: { fontSize: "16px", fontWeight: 500 },
};