import {useDrag} from "react-dnd";
import React, {useRef} from "react";
import styles from './component.module.css'

const Component = ({name, props, btn, children}: {
    name?: string,
    props?: any,
    btn?: boolean,
    children?: React.JSX.Element
}) => {
    const ref = useRef(null);
    const [, drag] = useDrag({
        type: 'div',
        item: {
            id: new Date(),
            name: 'div'
        }
    })
    drag(ref)
    return <div ref={ref} className={btn && styles.component} {...props}>{btn ? name : children}</div>;
}

export default Component;