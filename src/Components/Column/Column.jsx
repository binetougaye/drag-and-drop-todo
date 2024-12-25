import React from "react";
import "./Column.css";
import {
    SortableContext,
    verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import Task from "../Task/Task";
export default function Column({ tasks }) {
    return (
        <div className="column mt-12 gap-y-4">
            <SortableContext
                items={tasks}
                strategy={verticalListSortingStrategy}
            >
                {tasks?.length === 0 ? (
                    <div className="text-center">
                        Aucune tache disponible 😻
                    </div>
                ) : (
                    <div className="py-3">
                        {tasks.map((item, id) => (
                            <Task
                                key={item.id}
                                title={item.title}
                                id={item.id}
                            />
                        ))}
                    </div>
                )}
            </SortableContext>
        </div>
    );
}
