import React from "react";
import "./Column.css";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";
export default function Column({ tasks }) {
    return (
        <div className="column mt-12">
            <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
            >
                {tasks.map((item, id) => (
                    <Task key={item.id} title={item.title} id={item.id} />
                ))}
            </SortableContext>
        </div>
    );
}
