import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPosts, createPost, getRespuestas, createRespuesta, deletePost, deleteRespuesta } from "../services/foro.service";

export default function ForoPage() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [postSeleccionado, setPostSeleccionado] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    getPosts().then(setPosts).finally(() => setLoading(false));
  }, []);

  const handleCrearPost = async (e) => {
    e.preventDefault();
    if (!titulo || !contenido) return;
    await createPost(titulo, contenido);
    setTitulo("");
    setContenido("");
    getPosts().then(setPosts);
  };

  const handleVerPost = async (post) => {
    setPostSeleccionado(post);
    getRespuestas(post.post_id).then(setRespuestas);
  };

  const handleResponder = async (e) => {
    e.preventDefault();
    if (!respuesta) return;
    await createRespuesta(postSeleccionado.post_id, respuesta);
    setRespuesta("");
    getRespuestas(postSeleccionado.post_id).then(setRespuestas);
  };

  const handleEliminarPost = async (e, postId) => {
    e.stopPropagation();
    await deletePost(postId);
    getPosts().then(setPosts);
    if (postSeleccionado?.post_id === postId) setPostSeleccionado(null);
  };

  const handleEliminarRespuesta = async (respuestaId) => {
    await deleteRespuesta(respuestaId);
    getRespuestas(postSeleccionado.post_id).then(setRespuestas);
  };

  return (
    <div style={styles.page}>
      <div style={styles.left}>
        <button onClick={() => navigate("/dashboard")} style={styles.back}>← Volver</button>
        <h2 style={styles.title}>Foro Comunitario</h2>
        <p style={styles.subtitle}>Publica dudas para que la comunidad UPB te responda.</p>

        <form onSubmit={handleCrearPost} style={styles.form}>
          <input
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título de tu pregunta"
            style={styles.input}
            required
          />
          <textarea
            value={contenido}
            onChange={(e) => setContenido(e.target.value)}
            placeholder="Describe tu duda..."
            style={styles.textarea}
            required
          />
          <button type="submit" style={styles.btn}>Publicar</button>
        </form>

        <div style={styles.lista}>
          {loading ? <p>Cargando...</p> : posts.map((p) => (
            <div key={p.post_id} onClick={() => handleVerPost(p)} style={styles.postCard}>
              <div style={styles.avatar}>{p.profiles?.full_name?.charAt(0) || "?"}</div>
              <div style={{ flex: 1 }}>
                <p style={styles.postTitulo}>{p.titulo}</p>
                <p style={styles.postMeta}>{p.profiles?.full_name} · {new Date(p.fecha).toLocaleDateString()}</p>
              </div>
              <button onClick={(e) => handleEliminarPost(e, p.post_id)} style={styles.btnEliminar}>✕</button>
            </div>
          ))}
        </div>
      </div>

      {postSeleccionado && (
        <div style={styles.right}>
          <button onClick={() => setPostSeleccionado(null)} style={styles.cerrar}>✕</button>
          <h3 style={styles.postTituloDetalle}>{postSeleccionado.titulo}</h3>
          <p style={styles.postMeta}>{postSeleccionado.profiles?.full_name} · {new Date(postSeleccionado.fecha).toLocaleDateString()}</p>
          <p style={styles.postContenido}>{postSeleccionado.contenido}</p>

          <h4 style={styles.respuestasTitle}>Respuestas</h4>
          <div style={styles.respuestasList}>
            {respuestas.length === 0
              ? <p style={styles.sinResp}>Sé el primero en responder.</p>
              : respuestas.map((r) => (
                <div key={r.respuesta_id} style={styles.respuestaCard}>
                  <div style={styles.avatar}>{r.profiles?.full_name?.charAt(0) || "?"}</div>
                  <div style={{ flex: 1 }}>
                    <p style={styles.respTexto}>{r.contenido}</p>
                    <p style={styles.postMeta}>{r.profiles?.full_name}</p>
                  </div>
                  <button onClick={() => handleEliminarRespuesta(r.respuesta_id)} style={styles.btnEliminar}>✕</button>
                </div>
              ))}
          </div>

          <form onSubmit={handleResponder} style={styles.respForm}>
            <input
              value={respuesta}
              onChange={(e) => setRespuesta(e.target.value)}
              placeholder="Escribe tu respuesta..."
              style={styles.input}
              required
            />
            <button type="submit" style={styles.btn}>Responder</button>
          </form>
        </div>
      )}
    </div>
  );
}

const styles = {
  page: { display: "flex", gap: "1.5rem", padding: "2rem", maxWidth: "1100px", margin: "0 auto" },
  left: { flex: 1, display: "flex", flexDirection: "column", gap: "1rem" },
  right: { width: "400px", backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "12px", padding: "1.5rem", display: "flex", flexDirection: "column", gap: "1rem", position: "relative" },
  back: { background: "none", border: "none", cursor: "pointer", fontSize: "14px", color: "#555", alignSelf: "flex-start" },
  cerrar: { position: "absolute", top: "12px", right: "12px", background: "none", border: "none", fontSize: "18px", cursor: "pointer", color: "#888" },
  title: { fontSize: "1.6rem", fontWeight: 500, margin: 0 },
  subtitle: { fontSize: "13px", color: "#888", margin: 0 },
  form: { display: "flex", flexDirection: "column", gap: "8px" },
  input: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", outline: "none" },
  textarea: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", outline: "none", minHeight: "80px", resize: "vertical" },
  btn: { padding: "10px", borderRadius: "8px", border: "none", backgroundColor: "#111", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer" },
  lista: { display: "flex", flexDirection: "column", gap: "8px" },
  postCard: { display: "flex", gap: "12px", alignItems: "center", padding: "12px", backgroundColor: "#fff", border: "1px solid #e0e0e0", borderRadius: "10px", cursor: "pointer" },
  avatar: { width: "36px", height: "36px", borderRadius: "50%", backgroundColor: "#111", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: 500, flexShrink: 0 },
  postTitulo: { fontSize: "14px", fontWeight: 500, margin: 0 },
  postMeta: { fontSize: "12px", color: "#888", margin: 0 },
  postTituloDetalle: { fontSize: "16px", fontWeight: 500, margin: 0 },
  postContenido: { fontSize: "14px", color: "#444", margin: 0 },
  respuestasTitle: { fontSize: "14px", fontWeight: 500, margin: 0 },
  respuestasList: { display: "flex", flexDirection: "column", gap: "8px" },
  respuestaCard: { display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px" },
  respTexto: { fontSize: "13px", margin: 0 },
  sinResp: { fontSize: "13px", color: "#888" },
  respForm: { display: "flex", flexDirection: "column", gap: "8px", marginTop: "auto" },
  btnEliminar: { background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: "16px", flexShrink: 0 },
};