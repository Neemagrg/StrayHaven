export const api = {
  async createAdoption() {
    // Demo fallback: in the real app this would call your backend.
    // Keeping it as a resolved promise lets the UI work without a server.
    return Promise.resolve({ ok: true });
  },
};

