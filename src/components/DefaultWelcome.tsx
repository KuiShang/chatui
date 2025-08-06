import { CommentOutlined, EllipsisOutlined, HeartOutlined, PaperClipOutlined, ShareAltOutlined, SmileOutlined } from '@ant-design/icons'
import { Prompts, Welcome } from '@ant-design/x'
import { Button, Flex, Space } from 'antd'
import { createStyles, useThemeMode } from 'antd-style'

// 定义Prop接口
interface DefaultWelcomeProps {
  /** 处理提交的回调函数 */
  onSubmit: (text: string) => void
}

const HOT_TOPICS = {
  key: '1',
  label: 'Hot Topics',
  children: [
    {
      key: '1-1',
      description: 'What has Ant Design X upgraded?',
      icon: <span style={{ color: '#f93a4a', fontWeight: 700 }}>1</span>,
    },
    {
      key: '1-2',
      description: 'New AGI Hybrid Interface',
      icon: <span style={{ color: '#ff6565', fontWeight: 700 }}>2</span>,
    },
    {
      key: '1-3',
      description: 'What components are in Ant Design X?',
      icon: <span style={{ color: '#ff8f1f', fontWeight: 700 }}>3</span>,
    },
    {
      key: '1-4',
      description: 'Come and discover the new design paradigm of the AI era.',
      icon: <span style={{ color: '#00000040', fontWeight: 700 }}>4</span>,
    },
    {
      key: '1-5',
      description: 'How to quickly install and import components?',
      icon: <span style={{ color: '#00000040', fontWeight: 700 }}>5</span>,
    },
  ],
}

const DESIGN_GUIDE = {
  key: '2',
  label: 'Design Guide',
  children: [
    {
      key: '2-1',
      icon: <HeartOutlined />,
      label: 'Intention',
      description: 'AI understands user needs and provides solutions.',
    },
    {
      key: '2-2',
      icon: <SmileOutlined />,
      label: 'Role',
      description: "AI's public persona and image",
    },
    {
      key: '2-3',
      icon: <CommentOutlined />,
      label: 'Chat',
      description: 'How AI Can Express Itself in a Way Users Understand',
    },
    {
      key: '2-4',
      icon: <PaperClipOutlined />,
      label: 'Interface',
      description: 'AI balances "chat" & "do" behaviors.',
    },
  ],
}

const useStyle = createStyles(({ token, css }) => {
  return {
    chatPrompt: css`
      flex: 1;
      .ant-prompts-label {
        color: ${token.colorText};
      }
      .ant-prompts-desc {
        color: ${token.colorText};
        width: 100%;
      }
      .ant-prompts-icon {
        color: ${token.colorText};
      }
    `,

    placeholder: css`
      padding-top:  ${token.paddingLG}px;
      width: 100%;
      box-sizing: border-box;
      padding-inline: calc(calc(100% - 1000px) / 2);
    `,
  }
})

function DefaultWelcome(props: DefaultWelcomeProps) {
  const { styles } = useStyle()
  const { themeMode } = useThemeMode()
  const { onSubmit } = props
  return (
    <Space direction='vertical' size={16} className={styles.placeholder}>
      <Welcome
        variant='borderless'
        icon='https://mdn.alipayobjects.com/huamei_iwk9zp/afts/img/A*s5sNRo5LjfQAAAAAAAAAAAAADgCCAQ/fmt.webp'
        title="Hello, I'm Ant Design X"
        description='Base on Ant Design, AGI product interface solution, create a better intelligent vision~'
        style={{
          textAlign: 'left',
        }}
        extra={
          <Space>
            <Button icon={<ShareAltOutlined />} />
            <Button icon={<EllipsisOutlined />} />
          </Space>
        }
      />
      <Flex gap={16}>
        <Prompts
          items={[HOT_TOPICS]}
          styles={{
            list: { height: '100%' },
            item: {
              flex: 1,
              backgroundImage: themeMode === 'dark' ? 'linear-gradient(123deg, #0c030f 0%, #524b54 100%)' : 'linear-gradient(123deg, #e5f4ff 0%, #efe7ff 100%)',
              borderRadius: 12,
              border: 'none',
            },
            subItem: { padding: 0, background: 'transparent' },
          }}
          onItemClick={(info) => {
            onSubmit(info.data.description as string)
          }}
          className={styles.chatPrompt}
        />

        <Prompts
          items={[DESIGN_GUIDE]}
          styles={{
            item: {
              flex: 1,
              backgroundImage: themeMode === 'dark' ? 'linear-gradient(123deg, #0c030f 0%, #524b54 100%)' : 'linear-gradient(123deg, #e5f4ff 0%, #efe7ff 100%)',

              border: 'none',
            },
            subItem: { background: themeMode === 'dark' ? '#262230a6' : '#ffffffa6' },
          }}
          onItemClick={(info) => {
            onSubmit(info.data.description as string)
          }}
          className={styles.chatPrompt}
        />
      </Flex>
    </Space>
  )
}
export default DefaultWelcome
