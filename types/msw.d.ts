interface MSWRequestBody {
  text(): Promise<string>;
  json(): Promise<any>;
}

interface MSWRequest {
  url: URL;
  method: string;
  headers: Headers;
  body: MSWRequestBody;
  params: Record<string, string>;
}

interface MSWResponse {
  status: number;
  statusText: string;
  headers: Headers;
  body: string;
  data: any;
}

interface MSWRequestHandler {
  all(): Promise<MSWRequest[]>;
  matching(predicate: (request: MSWRequest) => boolean): Promise<MSWRequest[]>;
}

interface MSWResponseHandler {
  all(): Promise<MSWResponse[]>;
  matching(predicate: (response: MSWResponse) => boolean): Promise<MSWResponse[]>;
}

interface MSW {
  requests: MSWRequestHandler;
  responses: MSWResponseHandler;
}

declare global {
  interface Window {
    __msw: MSW;
  }
}

export {}; // 모듈 처리
