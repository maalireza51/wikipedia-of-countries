import React, { useEffect, useRef } from 'react'

export default function Summary({ summary }) {
    const content = useRef();

    useEffect(() => {
        content.current.innerHTML = summary;
    }, [summary])

    return (
        <div ref={content}></div>
    )
}
