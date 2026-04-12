import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth.service";

export default function Register() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    role: "estudiante",
    programa: "",
    semestre: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register({
        email: form.email,
        password: form.password,
        fullName: form.fullName,
        role: form.role,
        programa: form.programa,
        semestre: parseInt(form.semestre),
      });
      navigate("/dashboard");
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.page}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <h2 style={styles.title}>Crear cuenta</h2>
        <p style={styles.subtitle}>Regístrate con tu correo institucional UPB</p>

        {error && <p style={styles.error}>{error}</p>}

        <div style={styles.field}>
          <label style={styles.label}>Nombre completo</label>
          <input name="fullName" value={form.fullName} onChange={handleChange} style={styles.input} placeholder="Tu nombre completo" required />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Correo institucional</label>
          <input name="email" type="email" value={form.email} onChange={handleChange} style={styles.input} placeholder="correo@upb.edu.co" required />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Contraseña</label>
          <input name="password" type="password" value={form.password} onChange={handleChange} style={styles.input} placeholder="Mínimo 6 caracteres" required />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Rol</label>
          <select name="role" value={form.role} onChange={handleChange} style={styles.input}>
            <option value="estudiante">Estudiante</option>
            <option value="profesor">Profesor</option>
          </select>
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Programa académico</label>
          <input name="programa" value={form.programa} onChange={handleChange} style={styles.input} placeholder="Ej: Ingeniería de Sistemas" required />
        </div>

        {form.role === "estudiante" && (
          <div style={styles.field}>
            <label style={styles.label}>Semestre</label>
            <select name="semestre" value={form.semestre} onChange={handleChange} style={styles.input} required>
              <option value="">Selecciona tu semestre</option>
              {[1,2,3,4,5,6,7,8,9,10].map(s => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        <button type="submit" disabled={loading} style={styles.button}>
          {loading ? "Registrando..." : "Crear cuenta"}
        </button>

        <p style={styles.login}>
          ¿Ya tienes cuenta?{" "}
          <span onClick={() => navigate("/")} style={styles.link}>Inicia sesión</span>
        </p>
      </form>
    </div>
  );
}

const styles = {
  page: { minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#f5f5f5" },
  form: { display: "flex", flexDirection: "column", gap: "1rem", width: "100%", maxWidth: "400px", padding: "2rem", borderRadius: "12px", border: "1px solid #e0e0e0", backgroundColor: "#fff" },
  title: { margin: 0, fontSize: "1.4rem", fontWeight: 500 },
  subtitle: { margin: 0, fontSize: "13px", color: "#888" },
  field: { display: "flex", flexDirection: "column", gap: "6px" },
  label: { fontSize: "14px", color: "#555" },
  input: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "15px", outline: "none" },
  button: { padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#111", color: "#fff", fontSize: "15px", fontWeight: 500, cursor: "pointer" },
  error: { color: "#c0392b", fontSize: "13px", padding: "8px 10px", backgroundColor: "#fdecea", borderRadius: "6px", margin: 0 },
  login: { fontSize: "13px", textAlign: "center", color: "#888", margin: 0 },
  link: { color: "#111", fontWeight: 500, cursor: "pointer", textDecoration: "underline" },
};