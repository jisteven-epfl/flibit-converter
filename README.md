# Flibit Converter

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Vercel](https://img.shields.io/badge/vercel-%23000000.svg?style=for-the-badge&logo=vercel&logoColor=white)](https://flibit-converter.vercel.app/)

*A simple binary converter that lets you intuitively play with bits.*

🚀 **Live Demo:** [https://flibit-converter.vercel.app/](https://flibit-converter.vercel.app/)

[English](#english) | [中文说明](#%E4%B8%AD%E6%96%87%E8%AF%B4%E6%98%8E)

---

## English

**Flibit Converter** is an interactive web tool built to help you visualize, manipulate, and convert binary numbers. Designed with a focus on education and developer utility, it supports deep diving into bit-level operations with a modern UI.

### ✨ Features

- **8 / 16 / 32-Bit Modes**: Seamlessly switch between different bit lengths.
- **Signed & Unsigned Support**: Real-time Two's Complement logic for signed integers.
- **Swipe-to-Toggle**: Click or natively swipe across bits to effortlessly paint bit patterns instead of clicking one by one.
- **One-Click Copy**: Instantly copy decimal values or binary strings to your clipboard.
- **Mathematical Overflow Protection**: Custom reduce logic bypassing JavaScript's native 32-bit signed bitwise limits to safely compute large unsigned integers.
- **A11y Compliant**: Full keyboard navigation, ARIA labels, and live screen reader support for error states.
- **Responsive Card UI**: A beautifully polished, stable layout built with Tailwind CSS that prevents UI jittering during scrollbar or placeholder changes.

### 🚀 Getting Started

1. Clone the repository: `git clone https://github.com/jisteven-epfl/flibit-converter.git`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

### 🧰 Tech Stack

- [React](https://react.dev/) - UI framework
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Fast build tool
- [TailwindCSS](https://tailwindcss.com/) - Utility-first styling

### 💡 About This Project

This project started as a **self-study initiative** to learn React web development. It focuses on understanding state management, derived state patterns, and complex user interactions.

Furthermore, this project serves as an exploration into **AI-native workflows**. By leveraging advanced AI pair programming with **Antigravity**, I've experienced a significant boost in development efficiency—from rapid logic prototyping to solving complex UI stability and overflow issues—effectively modeling the future of software engineering. Feedback and suggestions are welcome!

---

## 中文说明

**Flibit Converter** 是一个互动式的 Web 工具，旨在帮助你可视化、操作和转换二进制数。它的设计侧重于教育和开发者实用性，通过现代化的 UI 帮助你深入了解位级别的操作。

### ✨ 核心功能

- **8 / 16 / 32 位架构支持**: 无缝切换不同位长度的数据表示。
- **有符号与无符号整数**: 实时支持基于补码（Two's Complement）的负数逻辑。
- **丝滑的涂鸦模式 (Swipe-to-Toggle)**: 按住鼠标在方块上划过即可连续翻转位状态，告别繁琐的单点操作。
- **一键复制**: 快速将十进制数值或二进制字符串复制到剪贴板。
- **数学级溢出保护**: 放弃 JS 原生的 32位有符号位移限制，改用纯数学逻辑计算，安全处理大额无符号整数。
- **无障碍访问 (A11y)**: 完整的键盘导航支持，ARIA 标签，以及支持屏幕阅读器的实时错误播报。
- **稳固的卡片布局**: 基于 Tailwind CSS 打造的大厂级 UI，完美解决滚动条和占位符变化导致的页面宽度抖动问题。

### 🚀 快速开始

1. 克隆仓库: `git clone https://github.com/jisteven-epfl/flibit-converter.git`
2. 安装依赖: `npm install`
3. 运行开发服务器: `npm run dev`

### 🧰 技术栈

- [React](https://react.dev/) - UI 框架
- [TypeScript](https://www.typescriptlang.org/) - 静态类型检查
- [Vite](https://vitejs.dev/) - 极速构建工具
- [TailwindCSS](https://tailwindcss.com/) - 实用优先的 CSS 框架

### 💡 关于本项目

本项目最初是一个**自主学习实践项目**，旨在系统学习 React 开发。核心重点在于理解状态管理、派生状态模式，以及如何在 React 应用中妥善处理复杂的用户交互逻辑。

此外，本项目也是对 **AI 原生工作流** 和人机协作编程思想的一次深度探索。通过与 **Antigravity** 等先进 AI 深度配合，我体验到了开发效率的质感提升——从快速逻辑原型构建到攻克复杂的 UI 稳定性与溢出难题——这不仅缩短了开发周期，更展现了未来软件工程的新范式。非常欢迎任何反馈和改进建议！

---

*Crafted by Steven Ji 2026 // MIT License*
