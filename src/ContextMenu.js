import { useState, useEffect, useRef, useLayoutEffect } from 'react';
import './App.css';
import './ContextMenu.css';

const ContextMenu= ({ targetId, options, classes, gridSetStartingPoint, gridSetFinishPoint }) => {
    const [contextData, setContextData]= useState({ visible:false, posX: 0, posY: 0});
    const contextRef= useRef(null);;

    useEffect(() => {
        const contextMenuEventHandler= (event) => {
            const targetElement= document.getElementById(targetId)
            if(targetElement && targetElement.contains(event.target)){
                event.preventDefault();
                setContextData({ visible: true, posX: event.clientX, posY: event.clientY })
            } else if(contextRef.current && !contextRef.current.contains(event.target)){
                setContextData({ ...contextData, visible: false })
            }
        }

        const offClickHandler= (event) => {
            if(contextRef.current && !contextRef.current.contains(event.target)){
                setContextData({ ...contextData, visible: false })
                return;
            }

            console.log('Clicked on: ', event.target, 'Context menu: ', contextRef.current, 'Context data: ', contextData, 'Target id: ', targetId, 'Event: ', event);

            if (event.target.innerText === "Set starting point") {
                gridSetStartingPoint(1);
            } else if (event.target.innerText === "Set finish point") {
                gridSetFinishPoint(1);
            }
        }

        document.addEventListener('contextmenu', contextMenuEventHandler)
        document.addEventListener('click', offClickHandler)
        return () => {
            document.removeEventListener('contextmenu', contextMenuEventHandler)
            document.removeEventListener('click', offClickHandler)
        }
    }, [contextData, targetId])

    useLayoutEffect(() => {
        if(contextData.posX + contextRef.current?.offsetWidth > window.innerWidth){
            setContextData({ ...contextData, posX: contextData.posX - contextRef.current?.offsetWidth})
        }
        if(contextData.posY + contextRef.current?.offsetHeight > window.innerHeight){
            setContextData({ ...contextData, posY: contextData.posY - contextRef.current?.offsetHeight})
        }
    }, [contextData])

    return (
        <div ref={contextRef} className='contextMenu' style={{ display:`${contextData.visible ? 'block' : 'none'}`, left: contextData.posX, top: contextData.posY }}>
            <div className={`optionsList ${classes?.listWrapper}`}>
                {options.map((option) => (
                    <li key={option} className={`optionListItem ${classes?.listItem}`}>
                        {option}
                    </li>
                ))}
            </div>
        </div>
    );
}

export default ContextMenu;