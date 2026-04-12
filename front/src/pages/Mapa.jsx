import { useNavigate } from "react-router-dom";

export default function Mapa() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <button onClick={() => navigate("/dashboard")} style={styles.back}>← Volver</button>
      <h1 style={styles.title}>Mapa del Campus UPB</h1>
      <div style={styles.mapWrapper}>
        <iframe
          title="Mapa UPB Medellín"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1!2d-75.5755!3d6.2006!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e4428dfb80fad05%3A0x42137cfcc7b53b56!2sUniversidad%20Pontificia%20Bolivariana!5e0!3m2!1ses!2sco!4v1"
          width="100%"
          height="500"
          style={{ border: 0, borderRadius: "12px" }}
          allowFullScreen
          loading="lazy"
        />
      </div>
    </div>
  );
}

const styles = {
  container: { padding: "2rem", maxWidth: "900px", margin: "0 auto" },
  back: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#555", marginBottom: "1rem" },
  title: { fontSize: "1.8rem", fontWeight: 500, marginBottom: "1.5rem" },
  mapWrapper: { borderRadius: "12px", overflow: "hidden", border: "1px solid #e0e0e0" },
};