'use client'
import Image from "next/image";
import styles from "./page.module.css";

import ChatContainer from "@/components/chat/chatContainer";

export default function Home() {
  return (
    <div className={styles.page}>
      <ChatContainer />
    </div>
  );
}
