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
