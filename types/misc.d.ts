import { User } from "./model";

export interface HeadInfo {
  title?: string;
  description?: string;
  ogImagePath?: string;
  ogTitle?: string;
  ogDesc?: string;
  isCurrentPath?: boolean;
  specPath?: string;
  isNoIndex?: boolean;
}

export type AuthInfo = {
  user: User;
};

export type UpdateParam = {
  key: string;
  value: any;
};

export type LinkItem = {
  title: string;
  href?: string;
  to?: string;
};

export interface Dialog<P> {
  show(param: P): void;
  close(): void;
}

export interface AnalyticsMock {
  logEvent(name: string, params: any): void;
}

export type AppMode = "prod" | "stag" | "dev";
