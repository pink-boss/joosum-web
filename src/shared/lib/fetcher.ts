export enum HttpMethod {
  GET = "GET",
  POST = "POST",
  PUT = "PUT",
  DELETE = "DELETE",
}

export type FetchQuery = Record<string, string | number>;
export type FetchBody = Record<string, unknown>;

export type FetchOptions = {
  query?: FetchQuery;
  body?: FetchBody;
};

type FetcherConfig = {
  baseUrl?: string;
};

class Fetcher {
  constructor(private config: FetcherConfig) {}

  public async fetch<T>(
    method: HttpMethod,
    endpoint: string,
    options?: FetchOptions,
  ): Promise<T> {
    const response = await fetch(this.getUrl(endpoint, options?.query), {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: import.meta.env.AUTHORIZATION,
      },
      body: options?.body ? JSON.stringify(options.body) : undefined,
    });

    if (!response.ok) {
      //
    }
    return await response.json();
  }

  private getUrl(
    endpoint: string,
    query?: Record<string, string | number>,
  ): string {
    const url = new URL(endpoint, this.config.baseUrl);
    if (query) {
      Object.entries(query).forEach(([key, value]) => {
        url.searchParams.append(key, value.toString());
      });
    }
    return url.toString();
  }
}

export const fetcher = new Fetcher({
  baseUrl: import.meta.env.BASE_URL,
});
