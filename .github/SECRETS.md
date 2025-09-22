# GitHub Secrets 配置指南

本文档说明如何在 GitHub 仓库中配置必要的 Secrets，以支持 CI/CD 流程。

## 必需的 Secrets

### 1. ETHERSCAN_API_KEY

- **描述**: Etherscan API 密钥，用于获取区块链数据
- **获取方式**:
  1. 访问 [Etherscan API 页面](https://etherscan.io/apis)
  2. 注册免费账户
  3. 创建新的 API 密钥
- **配置位置**: Settings → Secrets and variables → Actions → New repository secret
- **名称**: `ETHERSCAN_API_KEY`
- **值**: 你的 Etherscan API 密钥

### 2. SONAR_TOKEN (可选)

- **描述**: SonarCloud 分析令牌，用于代码质量检查
- **获取方式**:
  1. 访问 [SonarCloud](https://sonarcloud.io)
  2. 登录并创建项目
  3. 在项目设置中生成令牌
- **配置位置**: Settings → Secrets and variables → Actions → New repository secret
- **名称**: `SONAR_TOKEN`
- **值**: 你的 SonarCloud 令牌

## 环境变量配置

### 开发环境

```bash
# .env.local
ETHERSCAN_API_KEY=your_etherscan_api_key_here
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001/api
```

### 生产环境

```bash
# 生产环境变量（通过GitHub Secrets管理）
ETHERSCAN_API_KEY=${{ secrets.ETHERSCAN_API_KEY }}
DATABASE_URL=${{ secrets.DATABASE_URL }}
REDIS_URL=${{ secrets.REDIS_URL }}
CORS_ORIGIN=${{ secrets.CORS_ORIGIN }}
```

## 配置步骤

1. **进入仓库设置**

   - 点击仓库页面的 "Settings" 标签
   - 在左侧菜单中找到 "Secrets and variables" → "Actions"

2. **添加新的 Secret**

   - 点击 "New repository secret"
   - 输入 Secret 名称（如 `ETHERSCAN_API_KEY`）
   - 输入 Secret 值
   - 点击 "Add secret"

3. **验证配置**
   - 在 Actions 页面查看 CI/CD 运行状态
   - 确保所有步骤都能成功执行

## 安全注意事项

- ⚠️ **永远不要**将 API 密钥提交到代码仓库
- ✅ 使用 GitHub Secrets 管理敏感信息
- ✅ 定期轮换 API 密钥
- ✅ 限制 API 密钥的权限范围
- ✅ 监控 API 使用情况

## 故障排除

### 问题：CI/CD 失败，显示"Secret not found"

**解决方案**：

1. 检查 Secret 名称是否正确
2. 确认 Secret 已正确配置
3. 检查仓库权限设置

### 问题：API 调用失败

**解决方案**：

1. 验证 API 密钥是否有效
2. 检查 API 密钥权限
3. 确认网络连接正常

### 问题：数据库连接失败

**解决方案**：

1. 检查 DATABASE_URL 格式
2. 确认数据库服务可用
3. 验证网络配置
