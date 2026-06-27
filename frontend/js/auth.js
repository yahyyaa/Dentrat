/**
 * Client-side authentication matching the Figma DENTRAT login.
 * Credentials: admin / admin123
 */
const Auth = {
  STORAGE_KEY: "dentrat_session",
  USERNAME: "admin",
  PASSWORD: "admin123",

  login(username, password) {
    if (username === this.USERNAME && password === this.PASSWORD) {
      sessionStorage.setItem(
        this.STORAGE_KEY,
        JSON.stringify({ username, loggedInAt: Date.now() })
      );
      return true;
    }
    return false;
  },

  logout() {
    sessionStorage.removeItem(this.STORAGE_KEY);
    sessionStorage.removeItem("dentrat_last_result");
  },

  isLoggedIn() {
    return !!sessionStorage.getItem(this.STORAGE_KEY);
  },

  requireAuth() {
    if (!this.isLoggedIn()) {
      Router.navigate("/login");
      return false;
    }
    return true;
  },
};
