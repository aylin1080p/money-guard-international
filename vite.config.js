import { defineConfig } from "vite";

export default defineConfig(({ command }) => ({
  base: command === "build" ? "/goit-js-hw-12/" : "/",
}));
