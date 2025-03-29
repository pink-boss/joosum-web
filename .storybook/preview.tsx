import type { Preview } from "@storybook/react";
import "../app/globals.css";

import { initialize, mswLoader } from "msw-storybook-addon";
import { http, passthrough } from "msw";
import { QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import { queryClient } from "../stories/mocks/store.mocks";

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
      ],
    },
  },

  loaders: [mswLoader],
  tags: ["autodocs"],
};

export default preview;
