import { useNavigate } from "react-router-dom";
import { logout } from "../../services/auth.service";

export default function Layout({ children }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div style={styles.wrapper}>
      <header style={styles.header}>
        <div style={styles.logo} onClick={() => navigate("/dashboard")}>
          <span style={styles.logoU}>U</span>
          <span style={styles.logoPB}>PB</span>
        </div>
        <div style={styles.headerRight}>
          <button style={styles.btnHeader} onClick={() => navigate("/perfil")}>Perfil</button>
          <button style={styles.btnHeader} onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </header>

      <main style={styles.main}>{children}</main>

      <footer style={styles.footer}>
        <div style={styles.footerLeft}>
          <p style={styles.footerTitle}>Contáctanos</p>
          <p style={styles.footerText}>Campus Laureles: Circular 1a 70-01</p>
          <p style={styles.footerText}>+57 604 448 83 88</p>
          <p style={styles.footerText}>313 603 56 30</p>
          <p style={styles.footerText}>asesoria.integral@upb.edu.co</p>
        </div>
        <div style={styles.footerRight}>
          <div style={styles.footerLogo}>
            <span style={styles.logoU}>U</span>
            <span style={styles.logoPB}>PB</span>
          </div>
          <p style={styles.footerText}>NIT UPB: 890.902.922-8</p>
          <p style={styles.footerText}>Otorgado por el Ministerio de Educación Nacional.</p>
          <p style={styles.footerText}>© Todos los derechos reservados, 2025</p>
        </div>
      </footer>
    </div>
  );
}

const styles = {
  wrapper: { minHeight: "100vh", display: "flex", flexDirection: "column", backgroundColor: "#f5f5f5" },
  header: { backgroundColor: "#fff", borderBottom: "3px solid #e8003d", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.8rem 2rem" },
  logo: { display: "flex", alignItems: "center", cursor: "pointer" },
  logoU: { fontSize: "28px", fontWeight: 700, color: "#e8003d" },
  logoPB: { fontSize: "28px", fontWeight: 700, color: "#c800a1" },
  headerRight: { display: "flex", gap: "12px" },
  btnHeader: { padding: "8px 20px", borderRadius: "6px", border: "none", backgroundColor: "#e8003d", color: "#fff", fontWeight: 500, cursor: "pointer", fontSize: "14px" },
  main: { flex: 1, padding: "2rem", maxWidth: "900px", width: "100%", margin: "0 auto" },
  footer: { backgroundColor: "#222", color: "#fff", display: "flex", justifyContent: "space-between", padding: "2rem", marginTop: "auto" },
  footerLeft: { display: "flex", flexDirection: "column", gap: "4px" },
  footerRight: { display: "flex", flexDirection: "column", gap: "4px", alignItems: "flex-end" },
  footerTitle: { fontWeight: 500, fontSize: "14px", margin: "0 0 8px 0" },
  footerText: { fontSize: "12px", color: "#aaa", margin: 0 },
  footerLogo: { display: "flex", marginBottom: "8px" },
};