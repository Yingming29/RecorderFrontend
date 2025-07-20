// TailwindCSS 配置
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    // 包含所有入口文件
    "./index.html",
    "./src/index.jsx",
    
    // 包含所有组件
    "./src/**/*.{js,jsx,ts,tsx}",
    
    // 包含公共 HTML 文件
    "./public/**/*.html",
  ],
  theme: {
    extend: {
      // 自定义颜色
      colors: {
        'cloth-primary': '#3b82f6',
        'cloth-secondary': '#6366f1',
      },
      // 自定义间距
      spacing: {
        '128': '32rem',
      }
    },
  },
  plugins: [
    // 添加插件
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}
