# Changelog

## [2.2.0] - 2026-03-06

### Changed
- 将测试框架从 Mocha 迁移至 Node.js 原生测试运行器 (`node:test`)。
- 移除了 `mocha` 和 `should` 开发依赖。
- 更新 `npm test` 脚本为 `node --test test/index.test.js`。
- 重构测试用例以使用 `node:assert`。
