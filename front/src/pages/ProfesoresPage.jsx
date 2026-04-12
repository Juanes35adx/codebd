import { useEffect, useState } from "react";
import { getProfesores } from "../services/profesores.service";
import { useNavigate } from "react-router-dom";

export default function ProfesoresPage() {
  const [profesores, setProfesores] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getProfesores()
      .then(setProfesores)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/dashboard")} style={styles.back}>← Volver</button>
      <h1 style={styles.title}>Profesores</h1>
      {loading ? <p>Cargando...</p> : (
        <div style={styles.grid}>
          {profesores.map((p) => (
            <div key={p.id} style={styles.card}>
              <div style={styles.avatar}>{p.nombre.charAt(0)}</div>
              <h3 style={styles.nombre}>{p.nombre}</h3>
              <p style={styles.materia}>{p.materia}</p>
              <p style={styles.facultad}>{p.facultad}</p>
              <a href={`mailto:${p.email_institucional}`} style={styles.email}>
                {p.email_institucional}
              </a>
              {p.extension && <p style={styles.ext}>Ext. {p.extension}</p>}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  back: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#555", marginBottom: "1rem" },
  title: { fontSize: "1.8rem", fontWeight: 500, marginBottom: "1.5rem" },
  grid: { display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "1rem" },
  card: { backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" },
  avatar: { width: "48px", height: "48px", borderRadius: "50%", backgroundColor: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "20px", fontWeight: 500 },
  nombre: { fontSize: "15px", fontWeight: 500, textAlign: "center", margin: 0 },
  materia: { fontSize: "13px", color: "#555", margin: 0 },
  facultad: { fontSize: "12px", color: "#888", margin: 0 },
  email: { fontSize: "12px", color: "#0066cc", margin: 0 },
  ext: { fontSize: "12px", color: "#888", margin: 0 },
};