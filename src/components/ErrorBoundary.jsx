import { Component } from "react";

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    // eslint-disable-next-line no-console
    console.error("Render error:", error, info);
  }

  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: "3rem 1.5rem", fontFamily: "sans-serif", maxWidth: 640, margin: "0 auto" }}>
          <h1 style={{ fontSize: "1.5rem", marginBottom: "0.75rem" }}>Something went wrong loading the site.</h1>
          <p style={{ color: "#555", marginBottom: "1rem" }}>
            Open your browser console for the technical error. If this happened right after deploying,
            check that <code>VITE_SUPABASE_URL</code> and <code>VITE_SUPABASE_ANON_KEY</code> are set in
            your host's environment variables.
          </p>
          <pre style={{ background: "#f3f3f3", padding: "1rem", overflowX: "auto", fontSize: "0.8rem" }}>
            {String(this.state.error?.message || this.state.error)}
          </pre>
        </div>
      );
    }
    return this.props.children;
  }
}
