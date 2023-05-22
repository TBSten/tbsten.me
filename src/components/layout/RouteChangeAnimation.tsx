import { Router } from "next/router";
import React, { FC, useEffect, useState } from "react";

interface RouteChangeAnimationProps {
}
const RouteChangeAnimation: FC<RouteChangeAnimationProps> = () => {
    const [progress, setProgress] = useState(0)
    useEffect(() => {
        const handleChangeStart = () => {
            setProgress(30)
            setTimeout(() => {
                setProgress(80)
            }, 100)
        }
        const handleChangeComplete = () => {
            setProgress(100)
            setTimeout(() => {
                setProgress(0)
            }, 1000)
        }
        Router.events.on("routeChangeStart", handleChangeStart)
        Router.events.on("routeChangeComplete", handleChangeComplete)
        return () => {
            Router.events.off("routeChangeStart", handleChangeStart)
            Router.events.off("routeChangeComplete", handleChangeComplete)
        }
    }, [])
    return (
        <div className="fixed left-0 top-0 right-0 w-screen h-2 z-[100]">
            {progress > 0 &&
                <div
                    className="transition-all duration-700 w-full h-full bg-primary animate-pulse "
                    style={{
                        width: `${progress}%`
                    }}
                />
            }
        </div>
    );
}

export default React.memo(RouteChangeAnimation);
