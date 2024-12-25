import { useEffect, useState } from "react";
import "./App.css";
import {
    DndContext,
    KeyboardSensor,
    PointerSensor,
    TouchSensor,
    closestCorners,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import Column from "./Components/Column/Column";
import { arrayMove, sortableKeyboardCoordinates } from "@dnd-kit/sortable";
import Input from "./Components/Input/Input";
function App() {
    const [tasks, setTask] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(localStorage.getItem("tasks")) : [];
    });
    const getTaskPos = (id) => tasks.findIndex((task) => task.id === id);
    const handleDragEnd = (event) => {
        const { active, over } = event;
        if (active.id === over.id) return;
        setTask((tasks) => {
            const originalPos = getTaskPos(active.id);
            const newPos = getTaskPos(over.id);
            return arrayMove(tasks, originalPos, newPos);
        });
    };

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const sensors = useSensors(
        useSensor(PointerSensor),
        useSensor(TouchSensor),
        useSensor(KeyboardSensor, {
            coordinateGetter: sortableKeyboardCoordinates,
        })
    );
    const addTask = (title) => {
        setTask((tasks) => [...tasks, { id: tasks.length + 1, title }]);
    };

    return (
        <DndContext
            sensors={sensors}
            onDragEnd={handleDragEnd}
            collisionDetection={closestCorners}
        >
            <div className="absolute inset-0 -z-10 size-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                <div className="absolute inset-x-0 top-0 -z-10 m-auto size-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]" />

                <div className="flex justify-center items-center flex-col">
                    <h1 className="text-4xl">My Tasks ✔ </h1>
                    <Input onSubmit={addTask} />
                    <Column tasks={tasks} />
                </div>
            </div>
        </DndContext>
    );
}

export default App;
