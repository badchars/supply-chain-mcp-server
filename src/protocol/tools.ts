import { osvTools } from "../osv/index.js";
import { ghsaTools } from "../ghsa/index.js";
import { nvdTools } from "../nvd/index.js";
import { npmTools } from "../npm/index.js";
import { pypiTools } from "../pypi/index.js";
import { cratesTools } from "../crates/index.js";
import { goTools } from "../go/index.js";
import { depsdevTools } from "../depsdev/index.js";
import { scorecardTools } from "../scorecard/index.js";
import { librariesTools } from "../libraries/index.js";
import { rekorTools } from "../rekor/index.js";
import { typosquatTools } from "../typosquat/index.js";
import { epssTools } from "../epss/index.js";
import { kevTools } from "../kev/index.js";
import { govulnTools } from "../govuln/index.js";
import { clearlydefinedTools } from "../clearlydefined/index.js";
import { badgeTools } from "../badge/index.js";
import { repologyTools } from "../repology/index.js";
import { rubygemsTools } from "../rubygems/index.js";
import { nugetTools } from "../nuget/index.js";
import { packagistTools } from "../packagist/index.js";
import { metaTools } from "../meta/sources.js";
import type { ToolDef } from "../types/index.js";

export const allTools: ToolDef[] = [
  ...osvTools,
  ...ghsaTools,
  ...nvdTools,
  ...npmTools,
  ...pypiTools,
  ...cratesTools,
  ...goTools,
  ...depsdevTools,
  ...scorecardTools,
  ...librariesTools,
  ...rekorTools,
  ...typosquatTools,
  ...epssTools,
  ...kevTools,
  ...govulnTools,
  ...clearlydefinedTools,
  ...badgeTools,
  ...repologyTools,
  ...rubygemsTools,
  ...nugetTools,
  ...packagistTools,
  ...metaTools,
];
