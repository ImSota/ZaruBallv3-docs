// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import Icons from "unplugin-icons/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://ImSota.github.io",
  base: "/ZaruBallv3-docs",
  trailingSlash: "always",
  integrations: [
    starlight({
      title: "ZaruBallv3",
      favicon: "/favicon.ico",
      head: [
        {
          tag: "script",
          attrs: {
            src: "https://www.googletagmanager.com/gtag/js?id=G-V389NYJ8FP",
            async: "true",
          },
        },
        {
          tag: "script",
          content: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-V389NYJ8FP');
          `,
        },
      ],
      customCss: ["./src/styles/custom.css"],
      social: [
        { icon: "github", label: "GitHub", href: "https://github.com/ImSota/" },
        { icon: "x.com", label: "X", href: "https://x.com/sh80645614" },
      ],
      sidebar: [
        {
          label: "ビルドガイド",
          autogenerate: { directory: "build-guide" },
        },
        {
          label: "ファームウェア",
          autogenerate: { directory: "firmware" },
        },
      ],
    }),
  ],
  vite: {
    plugins: [Icons({ compiler: "astro" })],
  },
});
