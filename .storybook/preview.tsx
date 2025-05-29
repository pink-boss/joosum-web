import type { Preview } from "@storybook/react";
import "../app/globals.css";

import { initialize, mswLoader } from "msw-storybook-addon";
import { http, passthrough, HttpResponse } from "msw";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "../stories/mocks/store.mocks";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

initialize({
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
});

const preview: Preview = {
  decorators: [
    (Story) => (
      <QueryClientProvider client={queryClient}>
        <Story />
        <div id="drawer-root" />
        <div id="modal-root" />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
    ),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextjs: {
      appDirectory: true,
    },
    msw: {
      handlers: [
        http.get("/icons/:imageName", () => {
          return passthrough();
        }),
        http.get("/api/settings/tags", () => {
          return HttpResponse.json([]);
        }),
        http.get("/api/link-books", () => {
          return HttpResponse.json({
            linkBooks: [],
            totalLinkCount: 0,
          });
        }),
        http.get("/api/tags", () => {
          return HttpResponse.json([]);
        }),
        http.get("https://picsum.photos/*", () => {
          return passthrough();
        }),
        http.get("/api/links", () => {
          return HttpResponse.json([]);
        }),
        http.post("/api/links/thumbnail", () => {
          return HttpResponse.json({
            thumbnailURL: "https://example.com/thumbnail.jpg",
            title: "Example Title",
            url: "https://example.com",
          });
        }),
        http.post("/api/links", () => {
          return HttpResponse.json({ success: true });
        }),
        http.put("/api/links/:linkId", () => {
          return HttpResponse.json({ success: true });
        }),
        http.delete("/api/links/:linkId", () => {
          return HttpResponse.json({ success: true });
        }),
        http.put("/api/links/:linkId/link-book-id/:linkBookId", () => {
          return HttpResponse.json({ success: true });
        }),
        http.post("/api/settings/tags", () => {
          return HttpResponse.json({ success: true });
        }),
        http.delete("/api/settings/tags/:tag", () => {
          return HttpResponse.json({ success: true });
        }),
        http.get("/api/link-books/:linkBookId/links", () => {
          return HttpResponse.json([]);
        }),
      ],
    },
  },

  loaders: [mswLoader],
  tags: ["autodocs"],
};

export default preview;
