import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/telecom-customer-portal/",
  build: { sourcemap: false },
  plugins: [react()],
});
