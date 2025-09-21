---
## 连接MetaMask钱包功能详解

### 1. 逻辑流程

这个功能的实现可以分为两个主要部分：前端的用户交互逻辑和与钱包的通信接口。

#### **步骤 1：环境检查**

当用户访问页面时，首先要检查浏览器是否安装了MetaMask。

-   **前端判断**: 检查 `window.ethereum` 对象是否存在。这是MetaMask注入到浏览器中的全局对象，是与钱包通信的入口。
-   **UI 提示**:
    -   **若 `window.ethereum` 存在**: 显示“连接钱包”按钮。
    -   **若不存在**: 隐藏“连接钱包”按钮，并显示“请安装 MetaMask 钱包”的提示，可附带下载链接。

#### **步骤 2：发起连接请求**

当用户点击“连接钱包”按钮时，应用将发起连接请求。

-   **发起请求**: 调用 `window.ethereum.request({ method: 'eth_requestAccounts' })`。这个方法是异步的，会触发MetaMask弹出窗口，请求用户授权。

#### **步骤 3：处理结果**

根据用户在MetaMask弹窗中的操作，有三种可能的结果。

-   **成功连接**:
    -   **返回结果**: 方法返回一个包含用户授权钱包地址的数组，例如 `['0x123...abc']`。
    -   **后续操作**:
        -   将钱包地址保存到应用状态中。
        -   更新UI，将按钮状态改为“已连接”，并显示地址。
        -   开始加载仪表盘数据（如余额、交易历史）。

-   **用户拒绝连接**:
    -   **返回结果**: 方法会抛出错误，通常错误码为 `4001`。
    -   **处理**: 捕获错误，显示提示信息，告知用户“连接已被拒绝”。

-   **连接失败（其他错误）**:
    -   **返回结果**: 抛出其他异常。
    -   **处理**: 捕获并处理这些异常，显示通用错误信息，如“连接失败，请重试”。

#### **步骤 4：监听账户和网络变化**

为了保证应用实时性，需要监听钱包状态变化。

-   **账户变化**: 监听 `window.ethereum.on('accountsChanged', listener)` 事件。当用户切换MetaMask账户时触发，需更新应用中的地址状态。
-   **网络变化**: 监听 `window.ethereum.on('chainChanged', listener)` 事件。当用户切换网络时触发，需更新网络信息并重新加载数据。

---

### 2. 页面接口

这些是你的前端应用需要调用的、由 MetaMask 提供的核心方法。

- **`window.ethereum.request({ method: 'eth_requestAccounts' })`**

  - **功能**: 请求用户授权连接钱包。这是整个流程的起点。

- **`provider.getSigner()` (Ethers.js) 或 `web3.eth.getAccounts()` (Web3.js)**

  - **功能**: 获取已连接的钱包地址。通常在成功连接后使用。

- **`window.ethereum.on('accountsChanged', listener)`**

  - **功能**: 订阅账户变化事件。

- **`window.ethereum.on('chainChanged', listener)`**

  - **功能**: 订阅网络变化事件。

- **`provider.getNetwork()` (Ethers.js) 或 `web3.eth.getChainId()` (Web3.js)**
  - **功能**: 获取当前连接的网络信息。
