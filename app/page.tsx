import styles from './page.module.css';
import {ChessGame} from "@/components/ChessGame";
import {ChessGameAI} from "@/components/ChessGameAI";

export default function Home() {
  return (
    <main className={styles.main}>
      <h1>Main Page Game</h1>
      
      <ChessGameAI/>
    
    </main>
  )
}
