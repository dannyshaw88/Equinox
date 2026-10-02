type SettingsRecord = Record<string, unknown>;

export interface NumericFieldRule {
  path: string;
  min: number;
  max?: number;
  step?: number;
}

function pairRules(prefixes: string[], min: number, max?: number): NumericFieldRule[] {
  return prefixes.flatMap((prefix) => [
    { path: `${prefix}Min`, min, max },
    { path: `${prefix}Max`, min, max },
  ]);
}

function singleRules(paths: string[], min: number, max?: number): NumericFieldRule[] {
  return paths.map((path) => ({ path, min, max }));
}

const humanSessionPercentRanges = [
  "viewTimelineFeedOrder", "viewTimelineFeedNotUsed", "viewTimelineFeedRerunChance",
  "likeTimelinePostsPercent", "saveMediaPercent", "sharePostPercent",
  "viewPostProfilePercent", "viewProfileFeedPercent", "viewProfilePostsPercent",
  "viewProfilePostsInfoLookupPercent", "explorePageOrder", "explorePageSkip",
  "explorePageRerunChance", "exploreClick", "explorePostInfoLookupPercent",
  "exploreLikePct", "exploreShareToFeedPct", "exploreSaveMediaPct",
  "exploreVisitProfilePct", "humanSessionOrder", "humanSessionNotUsed",
  "humanSessionRerunChance", "notificationsRunChance", "ownProfileRunChance",
  "humanJitterTaggedPostsRunChance", "humanJitterRepostsTabRunChance",
  "settingsActivityRunChance", "viewSavedRunChance", "viewReelsOrder",
  "viewReelsNotUsed", "viewReelsRerunChance", "reelWatchPercent",
  "reelLikePercent", "reelShareToFeedPercent", "checkTimelineStoriesOrder",
  "checkTimelineStoriesNotUsed", "checkTimelineStoriesRerunChance",
  "checkTimelineStoriesWatchPct", "storyLikePct", "checkDmOrder",
  "checkDmNotUsed", "checkDmRerunChance", "checkDmSuggestedUsersChance",
  "checkDmPresence", "checkDmRankedRecipients", "repostOrder", "repostNotUsed",
  "repostRerunChance", "followOrder", "followSkip", "followRerunChance",
  "unfollowOrder", "unfollowSkip", "unfollowRerunChance", "contactOrder",
  "contactSkip", "contactRerunChance", "webBrowsingOrder", "webBrowsingSkip",
  "webBrowsingRerunChance",
];

export const HUMAN_SESSION_NUMERIC_RULES: NumericFieldRule[] = [
  ...pairRules(humanSessionPercentRanges, 0, 100),
  ...pairRules(["delay"], 1, 10000),
  ...pairRules(["viewTimelineFeed", "exploreScroll", "checkDm"], 1, 100),
  ...pairRules(["viewProfilePostsCount", "repost"], 1, 20),
  ...pairRules([
    "viewTimelineComments", "viewReelsComments", "exploreProfileScroll",
    "reelWatchCount", "webBrowsingInternalLinks",
  ], 0, 50),
  ...pairRules(["checkTimelineStories"], 1, 50),
  ...pairRules(["checkTimelineStoriesSlide", "webBrowsingSites"], 1, 100),
  ...pairRules(["exploreProfileClick"], 0, 20),
  ...pairRules(["humanJitterFollowersEvery", "humanJitterFollowingsEvery"], 0, 1000),
  ...pairRules(["likeTimelinePostsDelay"], 0, 300),
  ...pairRules(["webBrowsingTimeOnSite", "webBrowsingTimeOnLinks"], 0, 60),
  { path: "repostDisableAtPostCount", min: 0 },
  { path: "repostImageSettings.contrast.min", min: 5, max: 250 },
  { path: "repostImageSettings.contrast.max", min: 5, max: 250 },
  { path: "repostImageSettings.brightness.min", min: 5, max: 250 },
  { path: "repostImageSettings.brightness.max", min: 5, max: 250 },
  { path: "repostImageSettings.noise.min", min: 5, max: 15 },
  { path: "repostImageSettings.noise.max", min: 5, max: 15 },
  { path: "repostImageSettings.sharpen.min", min: 1, max: 2, step: 0.1 },
  { path: "repostImageSettings.sharpen.max", min: 1, max: 2, step: 0.1 },
  { path: "repostImageSettings.pixelate.min", min: 0.9, max: 2.1, step: 0.1 },
  { path: "repostImageSettings.pixelate.max", min: 0.9, max: 2.1, step: 0.1 },
];

const followInjectBrowsingPercentRanges = [
  "injectProfileBrowsingBeforeFollowPct", "injectProfileBrowsingFeedChance",
  "injectProfileBrowsingFeedOrder", "injectProfileBrowsingPostInfoLookupPercent",
  "injectProfileBrowsingLikePct", "injectProfileBrowsingLikePctOrder",
  "injectProfileBrowsingShareToFeedPct", "injectProfileBrowsingShareToFeedPctOrder",
  "injectProfileBrowsingShareToDmPct", "injectProfileBrowsingShareToDmPctOrder",
  "injectProfileBrowsingSaveMediaPct", "injectProfileBrowsingSaveMediaPctOrder",
  "injectProfileBrowsingWatchStoriesPct", "injectProfileBrowsingWatchStoriesPctOrder",
  "injectProfileBrowsingViewHighlightsPct", "injectProfileBrowsingViewHighlightsPctOrder",
  "injectProfileBrowsingViewReelsPct", "injectProfileBrowsingViewReelsPctOrder",
  "injectProfileBrowsingCommentPct", "injectProfileBrowsingCommentPctOrder",
  "injectProfileBrowsingAbandonFollowPct",
];

export const FOLLOW_INJECT_BROWSING_NUMERIC_RULES: NumericFieldRule[] = [
  ...pairRules(["injectProfileBrowsing"], 1, 100),
  ...pairRules(followInjectBrowsingPercentRanges, 0, 100),
  ...pairRules(["injectProfileBrowsingFeed"], 1, 50),
  ...pairRules(["injectProfileBrowsingClickPost"], 0, 20),
  ...pairRules([
    "injectProfileBrowsingLikeScroll", "injectProfileBrowsingSaveMediaScroll",
    "injectProfileBrowsingWatchStoriesScroll", "injectProfileBrowsingViewHighlightsScroll",
    "injectProfileBrowsingViewReelsScroll",
  ], 0, 30),
];

export const UNFOLLOW_NUMERIC_RULES: NumericFieldRule[] = [
  ...pairRules(["delay", "process", "delayAfterUnfollow"], 1),
  ...singleRules(["minFollowAgeDays"], 1),
  ...pairRules(["autoStopUnfollowAtFollowings", "autoStartFollowAfter"], 0),
];

export const CONTACT_NUMERIC_RULES: NumericFieldRule[] = [
  ...pairRules(["contactCheckInterval"], 1, 10000),
  ...pairRules(["contactUsersPerCheck"], 1, 100),
  ...singleRules(["contactExtractCount"], 1, 10000),
  ...pairRules(["contactUsersSendCount"], 1, 500),
  ...pairRules(["contactUsersDelayBetween"], 1, 3600),
  ...pairRules(["contactUsersUnsend"], 1, 10000),
  ...singleRules(["stopOnBlockMinutes"], 1, 1440),
];

function cloneSettings(value: SettingsRecord): SettingsRecord {
  return Object.fromEntries(Object.entries(value).map(([key, current]) => [
    key,
    current && typeof current === "object" && !Array.isArray(current)
      ? cloneSettings(current as SettingsRecord)
      : current,
  ]));
}

function getAtPath(value: SettingsRecord, path: string): unknown {
  let current: unknown = value;
  for (const part of path.split(".")) {
    if (!current || typeof current !== "object" || Array.isArray(current)) return undefined;
    current = (current as SettingsRecord)[part];
  }
  return current;
}

function setAtPath(value: SettingsRecord, path: string, nextValue: number): void {
  const parts = path.split(".");
  let current: SettingsRecord = value;
  for (const part of parts.slice(0, -1)) {
    const child = current[part];
    if (!child || typeof child !== "object" || Array.isArray(child)) return;
    current[part] = { ...(child as SettingsRecord) };
    current = current[part] as SettingsRecord;
  }
  current[parts[parts.length - 1]] = nextValue;
}

function asFiniteNumber(value: unknown): number | null {
  if (typeof value === "number" && Number.isFinite(value)) return value;
  if (typeof value === "string" && value.trim() !== "") {
    const parsed = Number(value);
    if (Number.isFinite(parsed)) return parsed;
  }
  return null;
}

function randomNumber(value: number, rule: NumericFieldRule): number {
  const min = rule.min;
  const max = rule.max ?? Math.max(min + 100, Math.ceil(Math.abs(value) * 2), 100);
  const step = rule.step ?? 1;
  const scale = 1 / step;
  const minStep = Math.ceil(min * scale);
  const maxStep = Math.floor(max * scale);
  if (maxStep <= minStep) return min;

  let resultStep = Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;
  const currentStep = Math.round(value * scale);
  if (resultStep === currentStep) resultStep = resultStep === maxStep ? minStep : resultStep + 1;
  return resultStep / scale;
}

function pairedPath(path: string): string | null {
  if (path.endsWith("Min")) return `${path.slice(0, -3)}Max`;
  if (path.endsWith("Max")) return `${path.slice(0, -3)}Min`;
  if (path.endsWith(".min")) return `${path.slice(0, -4)}.max`;
  if (path.endsWith(".max")) return `${path.slice(0, -4)}.min`;
  return null;
}

export function randomiseNumericSettings<T extends SettingsRecord>(
  settings: T,
  rules: readonly NumericFieldRule[],
): T {
  const next = cloneSettings(settings);
  const ruleByPath = new Map(rules.map((rule) => [rule.path, rule]));

  for (const rule of rules) {
    const current = asFiniteNumber(getAtPath(settings, rule.path));
    if (current === null) continue;
    setAtPath(next, rule.path, randomNumber(current, rule));
  }

  for (const rule of rules) {
    const otherPath = pairedPath(rule.path);
    const isMinPath = rule.path.endsWith("Min") || rule.path.endsWith(".min");
    if (!otherPath || !isMinPath || !ruleByPath.has(otherPath)) continue;
    const current = asFiniteNumber(getAtPath(next, rule.path));
    const other = asFiniteNumber(getAtPath(next, otherPath));
    if (current === null || other === null) continue;
    setAtPath(next, rule.path, Math.min(current, other));
    setAtPath(next, otherPath, Math.max(current, other));
  }

  return next as T;
}