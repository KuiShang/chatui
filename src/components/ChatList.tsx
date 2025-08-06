import { CopyOutlined, DislikeOutlined, LikeOutlined, OpenAIOutlined, ReloadOutlined, UserOutlined } from '@ant-design/icons'
import { Bubble } from '@ant-design/x'
import type { UIDataTypes, UIMessage, UITools } from 'ai'
import { Button, Spin } from 'antd'
import { useTheme } from 'antd-style'

export interface ChatListProps {
  messages: UIMessage<unknown, UIDataTypes, UITools>[]
}
export default function ChatList(props: ChatListProps) {
  const theme = useTheme()
  const { messages } = props
  return (
    /* 🌟 消息列表 */
    <Bubble.List
      items={messages?.map((m) => ({
        key: m.id,
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.parts.map((part) => (part.type === 'text' ? part.text : '')).join(''),
        avatar: m.role === 'user' ? { icon: <UserOutlined /> } : { icon: <OpenAIOutlined />, style: { backgroundColor: theme.colorInfoActive } },
      }))}
      style={{ height: '100%', paddingInline: 'calc(calc(100% - 1000px) /2)' }}
      roles={{
        assistant: {
          placement: 'start',
          styles: { content: { textAlign: 'left' } },
          footer: (
            <div style={{ display: 'flex' }}>
              <Button type='text' size='small' icon={<ReloadOutlined />} />
              <Button type='text' size='small' icon={<CopyOutlined />} />
              <Button type='text' size='small' icon={<LikeOutlined />} />
              <Button type='text' size='small' icon={<DislikeOutlined />} />
            </div>
          ),
          variant: 'borderless',
          loadingRender: () => <Spin size='small' />,
        },
        user: { placement: 'end', styles: { content: { maxWidth: 500 } } },
      }}
    />
  )
}
