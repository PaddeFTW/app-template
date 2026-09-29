import { LocalAuthAdapter } from "./local-adapter";
import type { AuthAdapter } from "./types";

export type { AuthAdapter } from "./types";

/** Products replace this with a Supabase adapter. */
export const authAdapter: AuthAdapter = LocalAuthAdapter;
