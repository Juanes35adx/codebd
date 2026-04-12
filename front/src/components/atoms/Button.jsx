export default function Button({ text, onClick, type = "button", disabled = false, variant = "primary" }) {
  const styles = {
    primary: { backgroundColor: "#111", color: "#fff", border: "none" },
    secondary: { backgroundColor: "transparent", color: "#111", border: "1px solid #ccc" },
    danger: { backgroundColor: "#c0392b", color: "#fff", border: "none" },
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{
        ...styles[variant],
        padding: "10px 16px",
        borderRadius: "8px",
        fontSize: "15px",
        fontWeight: 500,
        cursor: disabled ? "not-allowed" : "pointer",
        opacity: disabled ? 0.6 : 1,
        width: "100%",
      }}
    >
      {text}
    </button>
  );
}