type SettingsRecord = Record<string, unknown>;

function numericBounds(key: string, parentPath: string): { min: number; max: number; decimals?: number } {
  const name = key.toLowerCase();
  const path = parentPath.toLowerCase();

  if (path.includes("repostimagesettings")) {
    const filter = path.split(".").at(-1);
    if (filter === "contrast" || filter === "brightness") return { min: 5, max: 250 };
    if (filter === "noise") return { min: 5, max: 15 };
    if (filter === "sharpen") return { min: 1, max: 2, decimals: 1 };
    if (filter === "pixelate") return { min: 0.9, max: 2.1, decimals: 1 };
  }

  if (/percent|pct|chance|order|skip|notused|ranking|before/.test(name)) {
    return { min: name.includes("ranking") ? 1 : 0, max: 100 };
  }
  if (/comment/.test(name)) return { min: 0, max: 50 };
  if (/age|days/.test(name)) return { min: 0, max: 3650 };
  if (/maxperday|maxperhour|perday|perhour|autostop.*followings|autostart.*followings|disableatpostcount/.test(name)) {
    return { min: 0, max: 10000 };
  }
  if (/timeonsite|timeonlinks/i.test(key)) return { min: 1, max: 60 };
  if (/delay|interval|wait|minutes|time/.test(name)) {
    if (/^delay(min|max)$/.test(name) || /checkinterval/.test(name)) return { min: 1, max: 120 };
    if (/after|between|like|reels|stories|highlights/.test(name)) return { min: 0, max: 300 };
    return { min: 0, max: 300 };
  }
  if (/viewprofilepostscount/.test(name)) return { min: 1, max: 20 };
  if (/exploreprofilescroll/.test(name)) return { min: 1, max: 50 };
  if (/exploreprofileclick|clickpost/.test(name)) return { min: 0, max: 20 };
  if (/injectprofilebrowsing.*feed(min|max)$/.test(name)) return { min: 1, max: 50 };
  if (/injectprofilebrowsing.*(reel|highlight|story|like|savemedia).*scroll/.test(name)) return { min: 0, max: 30 };
  if (/slide/.test(name)) return { min: 1, max: 10 };
  if (/followers|followings/.test(name) && /every/.test(name)) return { min: 1, max: 100 };
  if (/followers|followings/.test(name) && /auto|stop|start/.test(name)) return { min: 0, max: 100000 };
  if (/reelwatchcount/.test(name)) return { min: 1, max: 20 };
  if (/count|process|scroll|posts|reels|stories|users|links|sites|feed|follow|unfollow|messages/.test(name)) {
    return { min: /click|scroll/.test(name) ? 0 : 1, max: 100 };
  }

  return { min: 0, max: 100 };
}

function randomNumber(value: number, key: string, parentPath: string): number {
  const { min, max, decimals = 0 } = numericBounds(key, parentPath);
  const scale = 10 ** decimals;
  const minStep = Math.round(min * scale);
  const maxStep = Math.round(max * scale);
  if (maxStep <= minStep) return min;

  let result = Math.floor(Math.random() * (maxStep - minStep + 1)) + minStep;
  const currentStep = Math.round(value * scale);
  if (result === currentStep) result = result === maxStep ? minStep : result + 1;
  return result / scale;
}

function randomiseObject(value: SettingsRecord, parentPath: string): SettingsRecord {
  const next: SettingsRecord = { ...value };

  for (const [key, current] of Object.entries(value)) {
    if (typeof current === "number" && Number.isFinite(current)) {
      next[key] = randomNumber(current, key, parentPath);
    } else if (current && typeof current === "object" && !Array.isArray(current)) {
      next[key] = randomiseObject(current as SettingsRecord, parentPath ? `${parentPath}.${key}` : key);
    }
  }

  for (const key of Object.keys(next)) {
    const match = key.match(/^(.*?)(Min|Max)$/i);
    if (!match) continue;
    const lowerCaseSuffix = match[2] === match[2].toLowerCase();
    const minSuffix = lowerCaseSuffix ? "min" : "Min";
    const maxSuffix = lowerCaseSuffix ? "max" : "Max";
    const minKey = key.toLowerCase().endsWith("min") ? key : `${match[1]}${minSuffix}`;
    const maxKey = key.toLowerCase().endsWith("max") ? key : `${match[1]}${maxSuffix}`;
    if (typeof next[minKey] !== "number" || typeof next[maxKey] !== "number") continue;
    const low = Math.min(next[minKey] as number, next[maxKey] as number);
    const high = Math.max(next[minKey] as number, next[maxKey] as number);
    next[minKey] = low;
    next[maxKey] = high;
  }

  return next;
}

export function randomiseNumericSettings<T extends SettingsRecord>(settings: T): T {
  return randomiseObject(settings, "") as T;
}

export function randomIntegerBetween(min: number, max: number): number {
  const low = Math.ceil(Math.min(min, max));
  const high = Math.floor(Math.max(min, max));
  return Math.floor(Math.random() * (high - low + 1)) + low;
}