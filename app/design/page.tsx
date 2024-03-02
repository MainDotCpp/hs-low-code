'use client'
import Render from "@/app/components/render";
import styles from './page.module.css'
import GroupItem from "@/app/components/group-item";
import Component from "@/app/components/component";
import {DndProvider} from "react-dnd";
import {HTML5Backend} from "react-dnd-html5-backend";

const Page = () => {
    return <DndProvider backend={HTML5Backend}>
        <div className={styles.layout}>
            <div className={styles.header}></div>
            <div className={styles.group}>
                <GroupItem name='组件' icon='https://fakeimg.pl/300'></GroupItem>
                <GroupItem name='素材' icon='https://fakeimg.pl/300'></GroupItem>
            </div>
            <div className={styles.sidebar}>
                <Component btn={true} name='容器'></Component>
                <Component btn={true} name='图片'></Component>
            </div>
            <div className={styles.main}><Render></Render></div>
            <div className={styles.config}></div>
        </div>
    </DndProvider>
}

export default Page;