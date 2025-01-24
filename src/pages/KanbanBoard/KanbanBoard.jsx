import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Draggable } from "./Draggable";
import { Droppable } from "./Droppable";
import "./KanbanBoard.css"; // Import CSS for styling
import Layout from "../../layout/Layout";

const initialData = {
  TODO: [
    {
      id: "task-1",
      content: "iOS App home page",
      date: "18 Jul 2023",
      priority: "High",
      comments: 74,
    },
    {
      id: "task-2",
      content: "Topnav layout design",
      date: "15 Dec 2023",
      priority: "Medium",
      comments: 28,
    },
  ],
  IN_PROGRESS: [
    {
      id: "task-3",
      content: "Write a release note",
      date: "22 Jun 2023",
      priority: "Medium",
      comments: 17,
    },
    {
      id: "task-4",
      content: "Enable analytics tracking",
      date: "19 Jun 2023",
      priority: "Low",
      comments: 48,
    },
  ],
  REVIEW: [
    {
      id: "task-5",
      content: "Kanban board design",
      date: "2 May 2023",
      priority: "High",
      comments: 65,
    },
    {
      id: "task-6",
      content: "Code HTML email template",
      date: "7 May 2023",
      priority: "Medium",
      comments: 106,
    },
  ],
  DONE: [
    {
      id: "task-7",
      content: "Dashboard design",
      date: "16 Jul 2023",
      priority: "Low",
      comments: 287,
    },
  ],
};

const KanbanBoard = () => {
  const [data, setData] = useState(initialData);
  const [activeId, setActiveId] = useState(null);

  const handleDragStart = (event) => {
    setActiveId(event.active.id);
  };

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      setActiveId(null);
      return;
    }

    const sourceColumn = findColumn(active.id);
    const destinationColumn = over.id;

    if (sourceColumn && destinationColumn && sourceColumn !== destinationColumn) {
      const sourceItems = [...data[sourceColumn]];
      const destinationItems = [...data[destinationColumn]];

      const [movedItem] = sourceItems.splice(
        sourceItems.findIndex((item) => item.id === active.id),
        1
      );

      destinationItems.push(movedItem);

      setData({
        ...data,
        [sourceColumn]: sourceItems,
        [destinationColumn]: destinationItems,
      });
    }
    console.log(data)

    setActiveId(null);
  };

  const handleDragCancel = () => {
    setActiveId(null);
  };

  const findColumn = (id) => {
    for (const column in data) {
      if (data[column].find((item) => item.id === id)) {
        return column;
      }
    }
    return null;
  };

  return (
    <Layout>
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragCancel={handleDragCancel}
      
    >
      <div className="kanban-board">
        {Object.keys(data).map((column) => (
          <Droppable key={column} id={column} title={column}>
            <SortableContext
              items={data[column].map((item) => item.id)}
              strategy={verticalListSortingStrategy}
            >
              {data[column].map((item) => (
                <>
                
                <Draggable key={item.id} id={item.id} content={item}>
                  
                </Draggable>
                </>
              ))}
            </SortableContext>
          </Droppable>
        ))}
      </div>
      <DragOverlay>
        {activeId ? (
          <div className="kanban-card-overlay">{activeId}</div>
        ) : null}
      </DragOverlay>
    </DndContext>
    </Layout>
  );
};

export default KanbanBoard;
