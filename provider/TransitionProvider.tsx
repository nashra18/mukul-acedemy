"use client";
import { TransitionRouter } from "next-transition-router";
import {useRef, useEffect} from "react";
import gsap from "gsap";

const ROWS = 4;
const COLS = 16;




export default function TransitionProvider({ children }){
    const transitionGridRef = useRef(null);
    const blockRef  = useRef([]);
    


    return <TransitionRouter auto>
        <div ref={transitionGridRef} className="transition-grid" />
        {children}
    </TransitionRouter>
}