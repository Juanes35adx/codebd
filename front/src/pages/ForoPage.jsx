import { useEffect, useState } from "react";
import { getPosts, createPost, getRespuestas, createRespuesta, deleteRespuesta } from "../services/foro.service";
import Layout from "../components/organisms/Layout";

export default function ForoPage() {
  const [posts, setPosts] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [postSeleccionado, setPostSeleccionado] = useState(null);
  const [respuestas, setRespuestas] = useState([]);
  const [respuesta, setRespuesta] = useState("");
  const [loading, setLoading] = useState(true);

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

  const handleEliminarRespuesta = async (respuestaId) => {
    await deleteRespuesta(respuestaId);
    getRespuestas(postSeleccionado.post_id).then(setRespuestas);
  };

  return (
    <Layout>
      <h2 style={styles.title}>Bienvenido al Foro Comunitario</h2>
      <p style={styles.subtitle}>Aquí podrás publicar dudas generales que tengas para que la comunidad UPB te responda.</p>

      <div style={styles.banner}>📚 Estudiantes UPB</div>

      <div style={styles.recuerda}>
        <h3 style={styles.recuerdaTitle}>Recuerda que....</h3>
        <p style={styles.recuerdaText}>Ante toda duda puedes también utilizar el medio de preguntas frecuentes en el cual puedes preguntar directamente a la asesoría integral.</p>
      </div>

      <form onSubmit={handleCrearPost} style={styles.form}>
        <input value={titulo} onChange={(e) => setTitulo(e.target.value)} placeholder="Título de tu pregunta" style={styles.input} required />
        <textarea value={contenido} onChange={(e) => setContenido(e.target.value)} placeholder="Describe tu duda..." style={styles.textarea} required />
        <button type="submit" style={styles.btnPublicar}>Publicar</button>
      </form>

      <div style={styles.lista}>
        {loading ? <p>Cargando...</p> : posts.map((p) => (
          <div key={p.post_id} style={styles.postCard}>
            <div style={styles.avatar}>{p.profiles?.full_name?.charAt(0) || "?"}</div>
            <div style={{ flex: 1 }}>
              <p style={styles.postTitulo}>{p.titulo}</p>
              <p style={styles.postMeta}>{p.profiles?.full_name}</p>
              <button onClick={() => handleVerPost(p)} style={styles.btnResponder}>Responder</button>
            </div>
          </div>
        ))}
      </div>

      <button style={styles.btnMostrar}>Mostrar Más...</button>

      {postSeleccionado && (
        <div style={styles.modalOverlay} onClick={() => setPostSeleccionado(null)}>
          <div style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <button onClick={() => setPostSeleccionado(null)} style={styles.cerrar}>✕</button>
            <div style={styles.modalHeader}>
              <div style={styles.avatar}>{postSeleccionado.profiles?.full_name?.charAt(0) || "?"}</div>
              <div>
                <h3 style={styles.postTituloDetalle}>{postSeleccionado.titulo}</h3>
                <p style={styles.postMeta}>{postSeleccionado.profiles?.full_name} · {new Date(postSeleccionado.fecha).toLocaleDateString()}</p>
              </div>
            </div>
            <p style={styles.postContenido}>{postSeleccionado.contenido}</p>

            <form onSubmit={handleResponder} style={styles.respForm}>
              <textarea value={respuesta} onChange={(e) => setRespuesta(e.target.value)} placeholder="Escribir..." style={styles.textarea} required />
              <button type="submit" style={styles.btnPublicar}>Publicar</button>
            </form>

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
          </div>
        </div>
      )}
    </Layout>
  );
}

const styles = {
  title: { fontSize: "1.8rem", fontWeight: 700, margin: "0 0 8px 0" },
  subtitle: { fontSize: "14px", color: "#555", margin: "0 0 1.5rem 0" },
  banner: { backgroundColor: "#ddd", borderRadius: "12px", height: "160px", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "1.5rem", fontSize: "18px", color: "#888" },
  recuerda: { marginBottom: "1.5rem" },
  recuerdaTitle: { fontSize: "1.4rem", fontWeight: 700, margin: "0 0 8px 0" },
  recuerdaText: { fontSize: "14px", color: "#555", margin: 0 },
  form: { display: "flex", flexDirection: "column", gap: "8px", marginBottom: "1.5rem" },
  input: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", outline: "none" },
  textarea: { padding: "10px 12px", borderRadius: "8px", border: "1px solid #ccc", fontSize: "14px", outline: "none", minHeight: "80px", resize: "vertical" },
  btnPublicar: { padding: "10px 24px", borderRadius: "20px", border: "none", backgroundColor: "#e8003d", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer", alignSelf: "flex-end" },
  lista: { display: "flex", flexDirection: "column", gap: "12px", marginBottom: "1.5rem" },
  postCard: { display: "flex", gap: "12px", alignItems: "center", padding: "16px", backgroundColor: "#e8e8e8", borderRadius: "10px" },
  avatar: { width: "40px", height: "40px", borderRadius: "50%", backgroundColor: "#555", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "16px", fontWeight: 500, flexShrink: 0 },
  postTitulo: { fontSize: "15px", fontWeight: 500, margin: "0 0 4px 0" },
  postMeta: { fontSize: "12px", color: "#888", margin: "0 0 8px 0" },
  btnResponder: { padding: "6px 16px", borderRadius: "20px", border: "none", backgroundColor: "#111", color: "#fff", fontSize: "13px", cursor: "pointer" },
  btnMostrar: { display: "block", margin: "0 auto", padding: "10px 32px", borderRadius: "20px", border: "none", backgroundColor: "#e8003d", color: "#fff", fontSize: "14px", fontWeight: 500, cursor: "pointer" },
  modalOverlay: { position: "fixed", top: 0, left: 0, width: "100vw", height: "100vh", backgroundColor: "rgba(0,0,0,0.5)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000 },
  modal: { backgroundColor: "#fff", borderRadius: "16px", padding: "2rem", width: "90%", maxWidth: "580px", maxHeight: "80vh", overflowY: "auto", position: "relative", display: "flex", flexDirection: "column", gap: "1rem" },
  modalHeader: { display: "flex", gap: "12px", alignItems: "flex-start" },
  cerrar: { position: "absolute", top: "12px", right: "16px", background: "none", border: "none", fontSize: "20px", cursor: "pointer", color: "#888" },
  postTituloDetalle: { fontSize: "16px", fontWeight: 500, margin: 0 },
  postContenido: { fontSize: "14px", color: "#444", margin: 0 },
  respuestasTitle: { fontSize: "14px", fontWeight: 500, margin: 0 },
  respuestasList: { display: "flex", flexDirection: "column", gap: "8px" },
  respuestaCard: { display: "flex", gap: "10px", alignItems: "flex-start", padding: "10px", backgroundColor: "#f9f9f9", borderRadius: "8px" },
  respTexto: { fontSize: "13px", margin: 0 },
  sinResp: { fontSize: "13px", color: "#888" },
  respForm: { display: "flex", flexDirection: "column", gap: "8px" },
  btnEliminar: { background: "none", border: "none", cursor: "pointer", color: "#888", fontSize: "16px", flexShrink: 0 },
};