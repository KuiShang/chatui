# React + TypeScript + Vite 聊天 UI 项目

这个项目提供了一个基于 React、TypeScript 和 Vite 的聊天 UI 界面，集成了 Ant Design X 组件库和 AI 功能。

## 项目简介

该项目是一个现代化的聊天界面应用，具有以下特点：
- 使用 React 函数式组件和 Hooks
- TypeScript 提供类型安全
- Vite 提供快速的开发体验和热模块替换
- Ant Design X 组件库提供美观的 UI 组件
- 集成 AI 聊天功能

## 项目结构

```
├── .gitignore
├── README.md
├── eslint.config.js
├── index.html
├── package.json
├── public/
│   └── vite.svg
├── src/
│   ├── App.css
│   ├── App.tsx
│   ├── assets/
│   │   └── react.svg
│   ├── components/
│   │   ├── ChatList.tsx
│   │   ├── ChatSender.tsx
│   │   ├── DefaultWelcome.tsx
│   │   └── SenderHeader.tsx
│   ├── index.css
│   ├── main.tsx
│   └── vite-env.d.ts
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
├── vite.config.ts
└── yarn.lock
```

## 安装依赖

使用 Yarn 安装项目依赖：

```bash
yarn install
```

## 运行项目

开发模式：
```bash
yarn dev
```

构建生产版本：
```bash
yarn build
```

预览生产构建：
```bash
yarn preview
```

## 代码检查

```bash
yarn lint
```

## 技术栈

- React 19
- TypeScript
- Vite
- Ant Design
- Ant Design X
- Antd Style
- AI SDK

## 分支说明

- `v1`: 默认初始版本模型调用
- `v2`: 升级为最新版模型调用

## 扩展 ESLint 配置

如果您正在开发生产应用，建议更新配置以启用类型感知的 lint 规则：

```js
// eslint.config.js
export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 其他配置...

      // 移除 tseslint.configs.recommended 并替换为以下内容
      ...tseslint.configs.recommendedTypeChecked,
      // 或者使用更严格的规则
      ...tseslint.configs.strictTypeChecked,
      // 可选，添加样式规则
      ...tseslint.configs.stylisticTypeChecked,

      // 其他配置...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 其他选项...
    },
  },
])
```

您还可以安装 [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) 和 [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) 以获取 React 特定的 lint 规则：

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default tseslint.config([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // 其他配置...
      // 启用 React lint 规则
      reactX.configs['recommended-typescript'],
      // 启用 React DOM lint 规则
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // 其他选项...
    },
  },
])
```
