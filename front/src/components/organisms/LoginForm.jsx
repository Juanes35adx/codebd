import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/auth.service";
import Button from "../atoms/Button";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2 style={styles.title}>Bienvenido a UPB Primíparos</h2>
      <p style={styles.subtitle}>Inicia sesión con tu correo institucional</p>

      {error && <p style={styles.error}>{error}</p>}

      <div style={styles.field}>
        <label style={styles.label}>Correo</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          placeholder="correo@upb.edu.co"
          required
        />
      </div>

      <div style={styles.field}>
        <label style={styles.label}>Contraseña</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          placeholder="••••••••"
          required
        />
      </div>

      <Button type="submit" text={loading ? "Ingresando..." : "Entrar"} disabled={loading} />

      <p style={styles.register}>
        ¿No tienes cuenta?{" "}
        <span onClick={() => navigate("/register")} style={styles.link}>
          Regístrate
        </span>
      </p>
    </form>
  );
}

const styles = {
  form: {
    display: "flex", flexDirection: "column", gap: "1rem",
    width: "100%", maxWidth: "380px", padding: "2rem",
    borderRadius: "12px", border: "1px solid #e0e0e0",
    backgroundColor: "#ffffff",
  },
  title: { margin: 0, fontSize: "1.4rem", fontWeight: 500, color: "#111" },
  subtitle: { margin: 0, fontSize: "13px", color: "#888" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", color: "#555" },
  input: {
    padding: "10px 12px", borderRadius: "8px",
    border: "1px solid #ccc", fontSize: "15px", outline: "none",
  },
  error: {
    color: "#c0392b", fontSize: "13px", margin: 0,
    padding: "8px 10px", backgroundColor: "#fdecea", borderRadius: "6px",
  },
  register: { fontSize: "13px", textAlign: "center", color: "#888", margin: 0 },
  link: { color: "#111", fontWeight: 500, cursor: "pointer", textDecoration: "underline" },
};