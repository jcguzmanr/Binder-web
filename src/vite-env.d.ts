/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_EVENTS_WEBHOOK_URL?: string;
  readonly VITE_LINKEDIN_PARTNER_ID?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
