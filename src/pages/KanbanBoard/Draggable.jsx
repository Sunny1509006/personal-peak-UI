import React from "react";
import { useDraggable } from "@dnd-kit/core";
import "./KanbanBoard.css"

export const Draggable = ({ id, content }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useDraggable({
      id,
    });

  const style = {
    transform: transform
      ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
      : undefined,
    transition,
    padding: "16px",
    background: "#fff",
    border: "1px solid #ccc",
    borderRadius: "4px",
    marginBottom: "8px",
  };

  return (
    <div ref={setNodeRef} 
    style={style} 
    {...listeners} {...attributes}>
      <div className="kanban-card">
                        <p key={content.id}>{content.id}</p>
                          <div className="card-header">
                            <span className="card-date">{content.date}</span>
                            <span className={`priority ${content.priority.toLowerCase()}`}>
                              {content.priority}
                            </span>
                          </div>
                          <div className="card-content">{content.content}</div>
                          <div className="card-footer">
                            <span>{content.comments} Comments</span>
                          </div>
                        </div>
    </div>
  );
};
