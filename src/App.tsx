import './App.css'
import { message, Segmented, App } from 'antd'
import { createStyles, useThemeMode, type ThemeMode } from 'antd-style'

import { DefaultChatTransport } from 'ai'
import { useChat } from '@ai-sdk/react'
import ChatSender from './components/ChatSender'
import ChatList from './components/ChatList'
import DefaultWelcome from './components/DefaultWelcome'
const useStyle = createStyles(({ token, css }) => {
  return {
    layout: css`
      width: 100%;
      min-width: 1000px;
      display: flex;
      align-items: center;
      flex-direction: column;
      box-sizing: border-box;
      height: 100vh;
      background-color: ${token.colorBgBase};
      font-family: AlibabaPuHuiTi, ${token.fontFamily}, sans-serif;
      padding-bottom: ${token.paddingContentVerticalLG}px;
    `,

    chatList: css`
      flex: 1;
      width: 100%;
      overflow: auto;
      margin-top: ${token.marginLG}px;
    `,
  }
})
const options = [
  { label: '自动', value: 'auto' },
  { label: '亮色', value: 'light' },
  { label: '暗色', value: 'dark' },
]
function Application() {
  const { styles } = useStyle()
  const { themeMode, setThemeMode } = useThemeMode()

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({
      api: 'http://localhost:3000/api/chat',
      headers: { Authorization: 'Bearer token' },
    }),
    onError: (error) => {
      console.error('An error occurred:', error)
    },
    onData: (data) => {
      console.log('Received data part from server:', data)
    },
  })
  // 加载状态根据useChat的status判断
  const loading = status === 'streaming'

  // ==================== Event ====================
  const onSubmit = (val: string) => {
    if (!val) return

    if (loading) {
      message.error('Request is in progress, please wait for the request to complete.')
      return
    }

    // TODO: request
    // onRequest({
    //   stream: true,
    //   message: { role: 'user', content: val },
    // })
    sendMessage(
      { text: val }, // 第一个参数：原始消息（text 是默认字段，仍需传入）
      {
        // 第二个参数：请求级配置，覆盖默认请求体
        body: {
          question: val, // 服务端需要的 question 字段
          // 可选：添加其他自定义字段
          userId: 'user123',
          timestamp: new Date().toISOString(),
        },
      }
    )
  }

  return (
    <App>
      <div className={styles.layout}>
        <Segmented value={themeMode} onChange={(v) => setThemeMode(v as ThemeMode)} options={options} />
        <div className={styles.chatList}>{messages?.length ? <ChatList messages={messages} /> : <DefaultWelcome onSubmit={onSubmit} />}</div>
        {<ChatSender onSubmit={onSubmit} loading={loading} />}
      </div>
    </App>
  )
}

export default Application
