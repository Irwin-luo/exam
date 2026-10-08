import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "AI应用教学开放日报名系统",
  description: "Trae Code 实操认证考试基准项目"
}

/**
 * 渲染应用根布局。
 * @param props - 包含子页面内容。
 * @returns 带全局 HTML 结构的 React 节点。
 */
export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN">
      <body>{children}</body>
    </html>
  )
}
