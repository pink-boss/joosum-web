import type { Preview } from "@storybook/react";
import "../app/globals.css";

import { initialize, mswLoader } from "msw-storybook-addon";
import { http, HttpResponse } from "msw";

initialize({
  serviceWorker: {
    url: `${process.env.PUBLIC_URL}/mockServiceWorker.js`,
  },
});

const preview: Preview = {
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
          return new HttpResponse(null, { status: 200 });
        }),
      ],
    },
  },
  loaders: [mswLoader],
};

export default preview;
