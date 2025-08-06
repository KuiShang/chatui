import { Sender } from '@ant-design/x'
import { createStyles } from 'antd-style'
import { useRef, useState } from 'react'
import SenderHeader from './SenderHeader'
import { PaperClipOutlined } from '@ant-design/icons'
import { Button, Flex } from 'antd'

// 定义Prop接口
interface DefaultChatSenderProps {
  /** 处理提交的回调函数 */
  onSubmit: (text: string) => void

  loading: boolean
}

const useStyle = createStyles(({ token, css }) => {
  return {
    // sender 样式
    sender: css`
      padding-inline: calc(calc(100% - 1000px) / 2);
      margin: 0 auto;
      width: 100%;
      box-sizing: border-box;
    `,
    speechButton: css`
      font-size: 18px;
      color: ${token.colorText} !important;
    `,
  }
})
function ChatSender(props: DefaultChatSenderProps) {
  const { styles } = useStyle()
  const { onSubmit, loading } = props
  const [attachmentsOpen, setAttachmentsOpen] = useState(false)

  const abortController = useRef<AbortController>(null)

  const [inputValue, setInputValue] = useState('')

  return (
    <div className={styles.sender}>
      {/* 🌟 输入框 */}
      <Sender
        value={inputValue}
        header={<SenderHeader setAttachmentsOpen={setAttachmentsOpen} attachmentsOpen={attachmentsOpen} />}
        onSubmit={() => {
          onSubmit(inputValue)
          setInputValue('')
        }}
        onChange={setInputValue}
        onCancel={() => {
          abortController.current?.abort()
        }}
        prefix={<Button type='text' icon={<PaperClipOutlined style={{ fontSize: 18 }} />} onClick={() => setAttachmentsOpen(!attachmentsOpen)} />}
        loading={loading}
        allowSpeech
        actions={(_, info) => {
          const { SendButton, LoadingButton, SpeechButton } = info.components
          return (
            <Flex gap={4}>
              <SpeechButton className={styles.speechButton} />
              {loading ? <LoadingButton type='default' /> : <SendButton type='primary' />}
            </Flex>
          )
        }}
        placeholder='Ask or input / use skills'
      />
    </div>
  )
}

export default ChatSender
