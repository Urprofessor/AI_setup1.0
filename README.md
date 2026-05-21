# Air One Setup Demo

Momcozy Air One 设备引导高保真原型 demo。纯静态 HTML，单文件实现。

## 部署到 Vercel（推荐）

### 方式 1：GitHub + Vercel（推荐）

1. 在 GitHub 创建新仓库（如 `airone-demo`）
2. 把这个文件夹的所有文件 push 上去：
   ```bash
   git init
   git add .
   git commit -m "init airone demo"
   git branch -M main
   git remote add origin https://github.com/你的用户名/airone-demo.git
   git push -u origin main
   ```
3. 打开 https://vercel.com → 用 GitHub 登录 → New Project → 选择刚才的仓库 → Deploy
4. 部署完成后会得到一个公网链接，手机浏览器打开即可

### 方式 2：Vercel CLI 直接部署

```bash
npm i -g vercel
cd airone-demo
vercel
```

## 本地预览

直接双击 `index.html` 用浏览器打开就能看，或者起一个简单 server：

```bash
# python
python3 -m http.server 8000
# 然后浏览器访问 http://localhost:8000
```

## 页面与跳转

| 页面 | 触发 | 跳转 |
|------|------|------|
| Welcome | 初始 | Skip → Skip Dialog；Get Started → Step 1 |
| Skip Dialog | Welcome 右上 Skip | Continue → 设备控制页；Cancel → 关闭 |
| Step 1-7 | Get Started | × → Back Dialog；Next → 下一步；Finish (Step 7) → Complete |
| Back Dialog | Step 页 × | Continue Setup → 回原步骤；Exit for now → 设备控制页 |
| Video 全屏 | Step 页视频右上扩展按钮 | 左下 collapse → 回 Step；Next Step / Last Step；Step 7 Next Step → Complete |
| Complete | Step 7 Finish | Start using Air One → 设备控制页 |
| 设备控制页 | 多种入口 | 齿轮 → 设备设置页 |
| 设备设置页 | 控制页齿轮 | How to Use → 中途退出过回原步骤，否则到 Tips 页 |
| Tips 页 | 设置页 How to Use | 点 tip 卡片 → Tips Step |
| Tips Step | Tips 页卡片 | 返回 → 设备设置页；底部圆点切换不同 tip |

## 中途退出判定

只有用户在 Step 7 点 Finish（无论横屏还是竖屏）走到 Complete 才算"完成 setup"。
任何其他路径（Skip 弹窗 Continue / Back Dialog Exit for now）都算"中途退出"。

