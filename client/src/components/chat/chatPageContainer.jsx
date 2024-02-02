import styles from '../../styles/chatPage.module.scss'

export default function ChatPageContainer({children}) {
  return (
    <main className={styles.chatPage}>
        {children}
    </main>
  )
}
