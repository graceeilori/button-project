"use client";

import React from "react";
import "./SpacedockPanel.css";

interface SpacedockPanelProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    children?: React.ReactNode;
}

/**
 * SpacedockPanel - information display component
 */
export function SpacedockPanel({
    isOpen,
    onClose,
    title = "DATA ACCESS",
    children,
}: SpacedockPanelProps) {
    if (!isOpen) return null;

    return (
        <div className="spacedock-panel">
            {/* Corner Brackets */}
            <div className="corner-bracket top-left">
                <div className="status-indicator"></div>
            </div>
            <div className="corner-bracket top-right">
                <div className="status-indicator"></div>
            </div>
            <div className="corner-bracket bottom-left">
                <div className="status-indicator"></div>
            </div>
            <div className="corner-bracket bottom-right">
                <div className="status-indicator"></div>
            </div>

            {/* Scan Lines Overlay */}
            <div className="scan-lines"></div>

            {/* Header */}
            <div className="panel-header">
                <span className="blinking-arrow">▸</span>
                <span className="panel-title">{title}</span>
                <div className="header-underline"></div>
            </div>

            {/* Close Button */}
            <button className="close-button" onClick={onClose} aria-label="Close panel">
                ✕
            </button>

            {/* Content */}
            <div className="panel-content">
                {children}
            </div>
        </div>
    );
}

export default SpacedockPanel;
