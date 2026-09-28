export type UsageEvent = {
  type: "proposal_created" | "proposal_applied" | "proposal_rejected";
  units: number;
};

export type UsagePort = {
  canSpend: (units: number) => boolean | Promise<boolean>;
  record: (event: UsageEvent) => void | Promise<void>;
};

export const NoopUsagePort: UsagePort = {
  canSpend: () => true,
  record: () => undefined,
};
