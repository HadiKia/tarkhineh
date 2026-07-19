"use client";

import { useRef } from "react";

const DRAG_THRESHOLD = 5;

export function useHorizontalDrag() {
  const ref = useRef<HTMLDivElement>(null);

  const dragState = useRef({
    startX: 0,
    scrollLeft: 0,
    isDragging: false,
  });

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;

    if (!el || e.button !== 0) return;

    dragState.current = {
      startX: e.clientX,
      scrollLeft: el.scrollLeft,
      isDragging: false,
    };
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;

    if (!el || (e.buttons & 1) === 0) return;

    const dx = e.clientX - dragState.current.startX;

    if (!dragState.current.isDragging && Math.abs(dx) >= DRAG_THRESHOLD) {
      dragState.current.isDragging = true;
    }

    if (!dragState.current.isDragging) return;

    e.preventDefault();

    el.scrollLeft = dragState.current.scrollLeft - dx;
  };

  const handlePointerEnd = () => {
    requestAnimationFrame(() => {
      dragState.current.isDragging = false;
    });
  };

  return {
    ref,
    isDragging: dragState,
    handlers: {
      onPointerDown: handlePointerDown,
      onPointerMove: handlePointerMove,
      onPointerUp: handlePointerEnd,
      onPointerLeave: handlePointerEnd,
      onPointerCancel: handlePointerEnd,
    },
  };
}
