import Image from "next/image";
import styles from "./page.module.css";
import Render from "@/app/components/render";

export default function Home() {
  return (
    <main className={styles.main}>
      <Render/>
    </main>
  );
}
