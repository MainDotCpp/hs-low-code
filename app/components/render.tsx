'use client'
import React, {useRef} from "react";
import './render.css'
import styles from './render.module.css'
import {useDrag, useDrop} from "react-dnd";
import Component from "@/app/components/component";

const mapping = {
    div: (props: any) => <Component props={props} btn={false} key={props.key}/>,
    a: (props: any) => <a {...props} key={props.key}></a>,
    text: (props: any) => <span>{props.text} key={props.key}</span>,
}
const data = [
    {
        type: 'div',
        key: '1',
        children: [
            {
                type: 'div', key: '4', children: [
                    {type: 'a', key: '2', children: '百度', href: 'https://www.baidu.com'},
                ]
            },
            {
                type: 'div', key: '4', children: [
                    {type: 'a', key: '2', children: 'https://www.baidu.com', href: 'https://www.baidu.com'},
                ]
            },
            {
                type: 'div', key: '4', children: [
                    {type: 'a', key: '2', children: 'https://www.baidu.com', href: 'https://www.baidu.com'},
                ]
            },
        ]
    }
]

const DropArea = ({children, componentData}: { children: React.JSX.Element, componentData: any }) => {
    const ref = useRef(null)
    const [{dragging}, drop] = useDrop(() => ({
        accept: 'div',
        drop: (item: any, monitor) => {
            console.log(componentData)
        },
        canDrop: (item: any) => {
            return true
        },
        collect: (monitor) => ({dragging: monitor.didDrop()}),
    }))
    drop(ref)
    return React.cloneElement(children, {ref: ref, style: {border: dragging ? '1px dashed #00000030' : '1px dashed #00000080'}})
}

const getElement = ({children, ...props}: any) => {
    let els = <>{typeof children === 'string' ? children : undefined}</>
    if (children && Array.isArray(children) && children.length > 0) {
        els = <>
            {children.map((item: any) => {
                return getElement(item)
            })}
        </>
    }
    props.class = 'el'

    return <DropArea componentData={props}>
        {React.cloneElement(mapping[props.type](props), props, els)}
    </DropArea>
}

const engine = (data: any) => {
    let d = <>
        {data.map((item: any) => {
            return getElement(item)
        })}
    </>
    return d
}
const Render = () => {
    return <div className={styles.app}>
        {engine(data)}
    </div>
}

export default Render