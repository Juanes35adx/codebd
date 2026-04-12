import LoginForm from "../components/organisms/LoginForm";

export default function Login() {
  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#f5f5f5",
    }}>
      <LoginForm />
    </div>
  );
}