import React from "react";
import { useDroppable } from "@dnd-kit/core";

export const Droppable = ({ id, title, children }) => {
  const { setNodeRef } = useDroppable({
    id,
  });

  const style = {
    background: "#f4f5f7",
    padding: "16px",
    borderRadius: "4px",
    width: "250px",
    minHeight: "200px",
  };

  return (
    <div ref={setNodeRef} style={style}>
      <h3>{title}</h3>
      {children}
    </div>
  );
};
