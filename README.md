# 浪尖雷达 · 实例数据仓（breaker-delta-data）

这是 Dai 的浪尖雷达 / Breaker Delta **实例数据仓**：只放数据，不放代码。

- 引擎（生成器、抓取器、站点模板、浏览器扩展源码）在另一个仓库：**daiyanze/breaker-delta**
- 本仓的 CI（`.github/workflows/pages.yml`）在每次推送时拉取引擎，把本仓数据覆盖进引擎目录，运行构建，并把站点部署到本仓的 GitHub Pages：
  **https://daiyanze.github.io/breaker-delta-data/**

## 内容说明

| 路径 | 是什么 |
|---|---|
| `editions/` | 每一期的扫描成果（JSON），一期一个文件，是站点的唯一事实源 |
| `state/seen-topics.json` | 话题台账状态：每个话题的首现、历次浪高与等级，构建和去重都靠它 |
| `seen-topics.md` | 台账的人读版，和上面的 JSON 对应 |
| `track-record.md` | 战绩台账：已发布期次的 🔥必看 / 👀关注 逐条登记，D+14 到期复核；站点「🏆 战绩」页由它在构建时生成 |
| `config.yaml` / `config.json` | （可选）个人配置：关键词静音/加权/提醒、每源开关等。放了就覆盖引擎的示例配置，不放则用引擎的 `config.example.*` |
| `.github/ISSUE_TEMPLATE/seed.md` | 投苗模板 |

## 投苗

看到值得追的种子信息，在本仓开 Issue（选「🌱 投苗」模板，填标题 / 链接 / 一句话理由即可）。投来的苗头先进收件箱，下一期扫描时去重、查共振，够格才进苗头榜，不承诺收录。
