import React from "react"

const Popup = (props) => {
    return (props.trigger) ? (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center min-w-full min-h-full p-4 bg-zinc-950 bg-opacity-60">
            <div className="relative p-4 bg-slate-200">
            {props.children}

            </div>
        </div>
    ) : ""
}

export default Popup