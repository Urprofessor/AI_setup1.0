# Air One Setup 教程内容填充规范 v1.0

> **谁该读这份文档**：负责为 Air One Setup 教程填充内容的硬件 PM
> **目的**：让任何 PM 按这份文档都能产出风格统一、用户能看懂、不需要前端反复返工的内容
> **使用方式**：填写每一步内容时对照「字段说明 + 检查清单」，提交给前端的内容就直接可上线

---

## 目录

1. [流程框架](#一流程框架不能改的结构)
2. [核心内容原则](#二核心内容原则先记住这-5-条)
3. [字段填充规则](#三字段填充规则)
4. [图片素材规范](#四图片素材规范)
5. [语气与措辞守则](#五语气与措辞守则)
6. [提交格式](#六提交格式直接给前端)
7. [提交前自检清单](#七提交前自检清单)
8. [常见错误案例库](#八常见错误案例库)
9. [流程协作建议](#九流程协作建议)
10. [版本控制](#十版本控制)
11. **[组件化框架（重点）](#十一组件化框架)**

---

## 一、流程框架（不能改的结构）

Setup 是 **7 步固定结构**。每一步包含：

```
┌───────────────────────────────────────┐
│ 1. 顶部进度（自动渲染，不需填）        │
│ 2. 大标题（Step 标题）                 │
│ 3. 副标题                              │
│ 4. 教学视频（≤ 20s 推荐）              │
│ 5. 视频下方副文案（1 句话）            │
│ 6. Tips 内容卡（1–3 条手风琴）         │
│ 7. Back / Next 按钮（自动渲染）        │
└───────────────────────────────────────┘
```

**PM 需要填充的字段共 6 类**：① 大标题 ② 副标题 ③ 视频 ④ 视频副文案 ⑤ Tips ⑥ Tip 内的图/正文/警示。

> 更灵活的「组件化」框架见 [第十一章](#十一组件化框架)。

---

## 二、核心内容原则（先记住这 5 条）

| 原则 | 含义 | 反例 |
|---|---|---|
| **1. 一步一目标** | 每一步只解决一件事，用户做完一件就走 | 在「拆卸」里塞清洗信息 |
| **2. 看图能懂，看字加深** | 图先承担信息，文字只补充图无法表达的部分 | 一大段文字 + 装饰性图 |
| **3. 行动优先** | 文案首字用动词、写"做什么"而不是"是什么" | "本部件是用于..." |
| **4. 温和不命令** | 产后用户敏感，避免"必须""禁止"，多用"建议""请" | "你必须..." |
| **5. 安全 > 体验** | 安全相关内容必须出现警示样式，不能藏在普通正文里 | 在正文中提"切勿浸水" |

---

## 三、字段填充规则

### 3.1 大标题（Step Title）

| 项目 | 要求 |
|---|---|
| 字数 | **3–5 个英文单词 / 4–8 个汉字** |
| 句式 | 动宾短语 或 名词短语 |
| 大小写（英文） | Title Case |
| 禁用 | 标点、感叹号、emoji、品牌名 |

- ✅ `Measure Flange Size` / `测量喇叭罩尺寸`
- ✅ `Wear It Right` / `正确穿戴`
- ❌ `How to measure the flange size correctly!`
- ❌ `Air One 的清洗步骤`（不重复品牌名）

---

### 3.2 副标题（Subtitle）

| 项目 | 要求 |
|---|---|
| 字数 | **5–10 个英文单词 / 8–15 个汉字** |
| 用途 | 补充标题、说"做完会怎样" |
| 句式 | 短句，不用句号 |

- ✅ `Find the size that fits you` / `找到适合你的尺寸`
- ✅ `Position for a good seal` / `贴合到位确保密封`
- ❌ `This step will teach you how to wear the pump correctly.`（太长 + 句号）

---

### 3.3 教学视频

| 项目 | 要求 |
|---|---|
| 时长 | **10–20 秒**，最长不超过 30s |
| 内容 | 仅展示"动作"，不放语音解说 |
| 画面 | 居中拍摄，浅色背景，手部动作清晰可辨 |
| 文件 | `step{N}.mp4`，H.264 编码，≤ 5MB，720p |
| 命名 | 严格 `step1.mp4` ~ `step7.mp4`，不能改名 |
| 循环 | 默认 loop 播放，所以**结尾要能自然接回开头** |

- ✅ 一段拆卸喇叭罩的特写，10 秒内完成动作
- ❌ 一段 1 分钟的产品介绍片

---

### 3.4 视频副文案

| 项目 | 要求 |
|---|---|
| 字数 | **15–25 个英文单词 / 25–40 个汉字** |
| 句式 | 以 `N. <动作描述>` 开头（N 是步骤编号） |
| 用途 | 1 句话告诉用户：这一步的关键动作是什么 |

- ✅ `2. Measure your nipple diameter and match it to the correct flange size.`
- ✅ `2. 测量乳头直径，匹配正确的喇叭罩尺寸。`
- ❌ `Please carefully follow this video to learn the right way of wearing the breast pump.`（太长太空泛）

---

### 3.5 Tips（手风琴）

**整步的 Tips 数量：**

| 步骤特点 | 推荐 Tips 数量 |
|---|---|
| 简单一致动作 | **1 条**（用轮播覆盖全流程） |
| 2–3 个分散知识点 | **2–3 条** |
| 超过 3 条 | **拆成两个 step** 或合并相关 tip |

**关键决策：Tip 类型选哪种？**

```
这条 tip 要传达什么？
├─ 只有 1 个动作/概念
│   ├─ 需要图示？ → 【带图 image】
│   └─ 不需要？  → 【纯文字 text】
└─ 多个连贯动作（按顺序） → 【轮播 carousel】
```

- **带图（image）**：单个概念有视觉示意时用。可放 1 张或多张垂直堆叠（如 Step 6 Tip 1）
- **纯文字（text）**：故障排查、纯说明、联系方式
- **轮播（carousel）**：连贯的 N 步动作（拆卸、组装）。每张图配一句 caption

---

### 3.6 Tip 标题

| 项目 | 要求 |
|---|---|
| 字数 | **2–5 个英文单词 / 4–10 个汉字** |
| 句式 | 动词开头（做什么）或 主题短语（什么） |
| 风格 | 像目录项，不是完整句子 |

- ✅ `How to measure` / `如何测量`
- ✅ `Choose your flange size` / `选择喇叭罩尺寸`
- ✅ `Missing or damaged parts?` / `配件缺失或损坏？`
- ❌ `Let's talk about how you should measure your nipple correctly`
- ❌ `What's important about cleaning your pump every day before storing it`

---

### 3.7 Tip 正文

| 项目 | 要求 |
|---|---|
| 字数 | **15–80 个英文单词 / 30–120 个汉字** |
| 段落 | 单段或多段；多段时**每段用换行符 `\n` 分隔**，前端会自动换行 |
| 句式 | 短句优先，每句 ≤ 20 词 |
| 列表 | 用 `• ` 开头表示列表项，前端会渲染 |
| 禁用 | 加粗 / 斜体 / 链接 / 图片嵌入（用 image 字段即可） |

**多段示例**：
```
Hand-wash all detachable parts with mild soap and warm water.
Air-dry on a clean cloth before assembly.
```

**列表示例**：
```
If any part is missing or damaged, please contact Momcozy Support.
• WhatsApp: +1 (619) 848-0676
• Email: support@momcozy.com
```

❌ 不要写：`<b>Important:</b> Wash the parts.`

---

### 3.8 Warning Callout（重点警示）

> 只有 `image` 和 `text` 类型 tip 支持。轮播暂不支持。

| 何时该用 | 何时不该用 |
|---|---|
| 涉及**安全风险**（变形、烫伤、损坏部件） | 普通操作建议 |
| 涉及**身体不适风险**（错误尺寸引起疼痛） | 行为优化建议 |
| 涉及**保修/责任**问题（误清洗会失保） | 营销文案 |

| 项目 | 要求 |
|---|---|
| 字数 | **15–40 个英文单词 / 30–60 个汉字** |
| 句式 | 中性陈述，不喊话不威胁 |
| 数量 | 一条 tip **最多 1 个** warning |

- ✅ `Your nipple size may change over time. Re-measuring occasionally can help maintain a comfortable fit.`
- ❌ `WARNING!!! DO NOT use the wrong flange size or you will be hurt!!!`

---

### 3.9 轮播专属字段

**共用上文 sharedIntro**：图片前固定不变的引导语
- 字数：**10–20 个英文单词 / 15–30 个汉字**
- 用途：告诉用户"接下来要做什么、为什么按顺序"
- ✅ `Follow the steps below to safely separate the washable parts from the motor unit before cleaning.`

**Slide 数量**：建议 **3–6 张**。超过 6 张说明动作太碎，考虑拆分；少于 3 张直接用普通带图 tip。

**Caption（每张图下方文字）**：
- 字数：**5–15 个英文单词 / 10–25 个汉字**
- 句式：单一动作的祈使句，动词开头
- 一句话只描述一张图的动作
- 最后一张可以用多行（如安全提醒），但不超过 2 行

- ✅ `Push the duckbill valve firmly into the collector base.`
- ❌ `In this step, you should carefully take the duckbill valve and slowly push it into the base of the collector while making sure...`

---

### 3.10 图标选择规则

只有两个图标可选：

| 图标 | 用途 | 关键词 |
|---|---|---|
| **问号 ?** | 教程类、解释类、how-to 类 | 如何、怎样、什么是、步骤、指南 |
| **感叹号 !** | 警示类、故障类、需要小心的操作 | 小心、缓慢、避免、缺失、损坏、错误、问题 |

**决策树**：
```
这条 tip 的标题中有「小心 / 避免 / 缺失 / 损坏 / 错误」类词？
├─ Yes → 感叹号
└─ No → 这条 tip 的正文主要在讲风险/警告？
         ├─ Yes → 感叹号
         └─ No  → 问号（默认）
```

---

## 四、图片素材规范

| 项目 | 要求 |
|---|---|
| 格式 | PNG（透明背景优先）或 JPG |
| 尺寸 | 短边 ≥ 750px，长边 ≤ 1500px |
| 比例 | **任意**，前端会按原比例显示（高度跟随图片） |
| 文件大小 | ≤ 500KB 单张 |
| 命名 | `step{N}tips{M}.png`（带图）/ `step{N}tips{M}-{S}.png`（多图）/ `step{N}tipsX.png` 轮播第 X 张 |
| 文件夹 | `images/steps/{NN}-{slug}/` |

**命名示例**：
- Step 1 Tip 1 单图 → `images/steps/01-unbox-inspect/step1tips1.png`
- Step 6 Tip 1 多图 → `step6tips1-1.png`、`step6tips1-2.png`
- Step 3 轮播第 4 张 → `step3tips4.png`

**配图原则**：
- 背景统一（浅色 / 中性）
- 主体居中
- 不出现真人面部（涉及隐私）
- 涉及身体部位时用插画或示意图，不用照片

---

## 五、语气与措辞守则

### 5.1 必做（Do）

| 场景 | 怎么说 |
|---|---|
| 引导动作 | "请将..." / "Place the..." |
| 提示备选 | "如果...，建议..." |
| 故障 | "如发现...，请联系我们" |
| 完成感 | "完成后即可进入下一步" |

### 5.2 不该做（Don't）

| 不要 | 改为 |
|---|---|
| "你必须 / You must" | "建议 / We suggest" |
| "切勿 / Never" | "请避免 / Avoid" |
| 全大写吼用户：`DO NOT TILT` | "请勿过快倾斜" |
| 多个感叹号 `!!!` | 普通句号 |
| 表情符号 emoji | 文本图标（问号/感叹号） |

### 5.3 术语统一表

| 英文 | 中文 |
|---|---|
| Flange | 喇叭罩 |
| Collector | 储奶器 |
| Diaphragm | 隔膜片 |
| Duckbill valve | 鸭嘴阀 |
| Motor unit | 主机 |
| Letdown | 下奶 |
| Stimulation mode | 刺激模式 |
| Expression mode | 吸乳模式 |
| Sanitize | 消毒 |
| Nursing bra | 哺乳文胸 |

---

## 六、提交格式（直接给前端）

按以下结构填表，前端可一键导入：

```yaml
step:
  num: 3
  title: "Disassemble Parts"             # 大标题
  subtitle: "Take it apart in order"     # 副标题
  videoTitle: "Disassemble Parts"        # 视频标签前缀
  videoSub: "3. Detach the flange..."    # 视频副文案
  video: step3.mp4                       # 视频文件名

  tips:
    - type: carousel                     # image / text / carousel
      icon: question                     # question / alert
      title: "Disassembly sequence"
      sharedIntro: "Follow the steps below to safely..."
      frameHeight: 173                   # 轮播专用，可选
      slides:
        - image: step3tips1.png
          caption: "Detach the flange from the pump."
        - image: step3tips2.png
          caption: "Separate the milk collector..."
```

也可用 Excel/Sheets 每步一个 sheet，列：`type | icon | title | body | image(s) | warning | sharedIntro`

---

## 七、提交前自检清单

**整步层面**
- [ ] 大标题 ≤ 5 词 / 8 字，无标点
- [ ] 副标题清晰说明这一步的目标
- [ ] 视频 ≤ 20s，文件 ≤ 5MB，结尾可循环
- [ ] 视频副文案以 `N. ` 开头，1 句话讲清动作

**每条 Tip 层面**
- [ ] 选对了类型（image / text / carousel）
- [ ] 标题动词开头或主题短语，无完整句子
- [ ] 正文每句 ≤ 20 词，多段用 `\n` 分隔
- [ ] 列表项用 `• ` 开头
- [ ] 选对了图标（问号 / 感叹号）
- [ ] 警示内容**已经**放进 warning 字段（不要藏在正文里）

**图片层面**
- [ ] 命名规则 `step{N}tips{M}.png`
- [ ] 文件 ≤ 500KB
- [ ] 主体居中、背景一致
- [ ] 没有真人面部

**整体语气**
- [ ] 没用"必须""切勿""禁止"
- [ ] 没用 emoji
- [ ] 没有多个感叹号
- [ ] 术语对照表中的词全部统一

---

## 八、常见错误案例库

### ❌ 错误 1：把警示藏在正文

```yaml
# Bad
type: image
title: "Clean the parts"
body: |
  Wash all parts with warm water and mild soap.
  Do not soak the motor unit in water as it will damage the device.

# Good
type: image
title: "Clean the parts"
body: "Wash all parts with warm water and mild soap."
warning: "Do not soak the motor unit in water — soaking damages internal electronics."
```

### ❌ 错误 2：标题太长且像句子

```
Bad : "How you should measure your nipple size correctly to find the right flange"
Good: "How to measure"
```

### ❌ 错误 3：轮播 caption 过长

```
Bad : "Now in this step you'll need to carefully remove the duckbill valve from inside
       the collector by gently pulling it out, making sure not to damage it."
Good: "Remove the duckbill valve from inside the collector."
```

### ❌ 错误 4：图标选错

```yaml
# Bad: "Missing or damaged parts" 用 question
icon: question
title: "Missing or damaged parts?"

# Good: 故障问题用 alert
icon: alert
title: "Missing or damaged parts?"
```

---

## 九、流程协作建议

**PM → 前端 → 上线** 的标准流程：

```
1. PM 按本规范填表（YAML 或表格）+ 准备图片/视频
2. PM 自检（用第七节清单）
3. 提交给前端：表格 + 图片包 + 视频
4. 前端导入并预览
5. PM 在预览环境确认（每一步都点开看）
6. 上线
```

**特殊情况**：
- 涉及医疗/安全声明 → 必须经法务 review 再提交
- 涉及新术语 → 先沟通是否加入术语对照表
- Tip 数 > 3 → 先和设计/前端讨论是否拆分步骤

---

## 十、版本控制

每次内容变更：
- 在文档头部加版本号 + 修改人 + 修改日期
- 重大改动（删除某 step、改流程框架）需要 PRD 同步
- 文案微调（错别字、术语统一）由 PM 自决

---

## 十一、组件化框架

每一步现在由「**模块（module）**」拼装而成。PM 可以为每个 step 自由选择：① 用哪些模块 ② 模块放什么顺序 ③ 每个模块放什么内容。

### 11.1 模块清单

**固定模块（不能移动，不能删除）**

| 模块 | 位置 | 说明 |
|---|---|---|
| `header` | 最顶部 | X 按钮 + `Air One Setup` 标题 |
| `timeline` | 顶部固定 | 7 步进度条 + 当前 Step 号 + 大标题 |
| `footer` | 最底部 | Back / Next 按钮 |

**可选模块（PM 自由组合排列）**

| 模块 | 用途 | 典型场景 |
|---|---|---|
| `video` | 内联视频播放器（可全屏） | 演示动作 |
| `subtitle` | 单行说明文字 | 补充大标题、说"做完会怎样" |
| `image` | 独立全宽图片块（不在手风琴里） | 结构示意图、产品 hero 图 |
| `text` | 独立段落文字（不在手风琴里） | 重要说明、引语 |
| `warning` | 全宽警示条（带感叹号 icon） | 全 step 都要小心的提醒 |
| `tips` | 手风琴容器（内含 1-3 条 tip） | 默认的教学内容承载方式 |
| `cta-button` | 辅助按钮（独立于 Back/Next） | 「看完整指南」「联系客服」之类 |

---

### 11.2 排列规则

- `header` + `timeline` 永远在最顶部；`footer` 永远在最底部，不可调换
- 可选模块按 PM 提供的 `modules` 数组从上到下渲染
- 可选模块可以缺失、重复、或者只用其中一个（如某步无视频，仅有 tips）
- **一个 step 最多 8 个可选模块**（避免页面过长）
- `subtitle` 不一定要在 `video` 下方——可以放最上面当开场白，也可以放 tips 之间作分隔

---

### 11.3 配置示例

**示例 A · 极简步骤（只用 1 个模块）**

```yaml
step:
  num: 1
  title: "Quick Check"
  modules:
    - type: tips
      items:
        - type: text
          title: "Ready to go?"
          body: "If your battery shows 100%, you're good to start."
```

**示例 B · 标准步骤（当前默认结构）**

```yaml
step:
  num: 3
  title: "Disassemble Parts"
  modules:
    - type: video
      src: step3.mp4
    - type: subtitle
      text: "Take it apart in order"
    - type: tips
      items:
        - type: carousel
          title: "Disassembly sequence"
          sharedIntro: "Follow the steps below..."
          slides: [...]
```

**示例 C · 复杂步骤（双视频 + 警示 + 多 tip）**

```yaml
step:
  num: 5
  title: "Assemble & Test"
  modules:
    - type: video
      src: step5a.mp4          # 演示组装
    - type: subtitle
      text: "Assemble the parts in order"
    - type: warning            # 全宽警示，不在手风琴里
      text: "Do not force any parts. Stop if you feel resistance."
    - type: tips
      items:
        - type: carousel
          title: "Assembly sequence"
          slides: [...]
    - type: video              # 第二段视频，演示测试
      src: step5b.mp4
    - type: subtitle
      text: "Then test the fit"
    - type: tips
      items:
        - type: image
          title: "Check the seal"
          body: "Press the assembled pump to your palm and turn it on."
          image: step5tips-test.png
```

**示例 D · 纯阅读步骤（无视频 + hero 图 + 警示）**

```yaml
step:
  num: 7
  title: "Read the Rhythm"
  modules:
    - type: image
      src: rhythm-hero.png
    - type: text
      content: "Air One starts in stimulation mode — fast, light suction to trigger letdown."
    - type: warning
      text: "If you feel sharp pain, stop immediately and recheck the flange size."
    - type: tips
      items:
        - type: text
          title: "What to expect"
          body: "Letdown can take 2–5 minutes during the first session."
```

---

### 11.4 各模块字段速查

**`video`**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `src` | string | ✓ | 视频文件名，如 `step3.mp4` |
| `label` | string |  | 视频角标文字，默认显示该 step 的大标题 |
| `autoplay` | bool |  | 默认 `true` |
| `loop` | bool |  | 默认 `true` |
| `duration` | string |  | 默认自动检测，可手填如 `"15s"` |

**`subtitle`**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `text` | string | ✓ | 单行说明文字（≤ 30 字） |

**`image`（独立图片，不在手风琴内）**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `src` | string | ✓ | 图片路径 |
| `alt` | string |  | 无障碍说明 |
| `caption` | string |  | 图下方文字说明 |
| `frameHeight` | number |  | 固定高度（如 `173`），不填则宽度撑满 |

**`text`（独立段落，不在手风琴内）**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `content` | string | ✓ | 正文，支持 `\n` 多行 |
| `style` | enum |  | `normal` / `quote` / `emphasis`（默认 normal） |

**`warning`（全宽警示条）**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `text` | string | ✓ | 警示文本（≤ 40 字 / 20 词） |
| `icon` | enum |  | `alert` / `info`（默认 alert） |

**`tips`（手风琴容器）**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `items` | array | ✓ | tip 数组（1–3 条），每条结构见前文 3.5–3.9 |

**`cta-button`（辅助按钮）**

| 字段 | 类型 | 必填 | 说明 |
|---|---|---|---|
| `text` | string | ✓ | 按钮文案 |
| `action` | enum | ✓ | `navigate` / `external-link` / `call-support` |
| `target` | string | 视情况 | 导航目标（page id 或 URL） |
| `variant` | enum |  | `primary` / `secondary`（默认 secondary） |

---

### 11.5 使用建议（避免乱拼）

- **默认就保持标准结构**（`video → subtitle → tips`），用户已经熟悉这个节奏
- 只在该 step 内容确实"非常规"时才打破默认（纯阅读步骤、多段视频、整步级警示）
- **不要为了"用足模块"而增加无效内容**；少即是多
- **同一产品里所有 step 的模块组合应保持节奏一致**——过度个性化会让用户每步都重新学习页面结构
- `warning` 模块用于"**全 step 都要小心**"的整体提醒；单条 tip 内的小提醒仍用 tip 内的 `warning` 字段
- 同类型模块尽量不连续出现（如连续 2 个 video 之间至少夹一个 subtitle 或 tips 做分隔）

---

### 11.6 提交模块化配置的检查清单

- [ ] `modules` 数组顺序符合该 step 的认知节奏（**先看 → 后做 → 再注意**）
- [ ] 没有出现两个连续的同类型模块
- [ ] 每个模块的必填字段都已填
- [ ] 所有引用的图片/视频文件都已就位且命名规范
- [ ] 若用了 `warning` 模块，确认它真的需要"全宽强调"，而不是塞进 tip 内的 warning 字段就够
- [ ] 若用了 `cta-button`，确认它与 `footer` 的 Next 按钮在用户认知上**不冲突**（不会让用户犹豫该点哪个）

---

### 11.7 决策树：我该用哪个模块？

```
你要表达的是什么？
│
├─ 演示动作过程（动态）
│   └─ 用 video
│
├─ 一张关键示意图（静态，全宽，独立）
│   └─ 用 image（不在 tips 内）
│
├─ 1–3 条可折叠的教学要点
│   └─ 用 tips（内部可放 image / text / carousel）
│
├─ 全 step 级别的安全提醒（很重要、想被一眼看到）
│   └─ 用 warning
│
├─ 简短补充说明 / 引导文案
│   └─ 用 subtitle（单行）或 text（多行）
│
└─ 需要跳到其他页（如客服、详细指南）
    └─ 用 cta-button
```

---

— 文档完 —
