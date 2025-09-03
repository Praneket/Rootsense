import React, { useEffect, useState } from "react";
import {
  collection,
  addDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
  where,
} from "firebase/firestore";
import { db } from "../firebase"; // adjust this path
import FarmerNavbar from "./FarmerNavbar";
import { Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTasks } from "react-icons/fa";

const TaskManager = () => {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);

  // Fetch tasks on load
  useEffect(() => {
    fetchTasks();
  }, []);

  // Auto-delete completed tasks older than 7 days
  useEffect(() => {
    const deleteOldCompletedTasks = async () => {
      const now = Date.now();
      const q = query(collection(db, "tasks"), where("completed", "==", true));
      const snapshot = await getDocs(q);

      snapshot.forEach(async (docSnap) => {
        const data = docSnap.data();
        if (data.completedAt?.toMillis() < now - 7 * 24 * 60 * 60 * 1000) {
          await deleteDoc(doc(db, "tasks", docSnap.id));
        }
      });
    };

    deleteOldCompletedTasks();
  }, []);

  const fetchTasks = async () => {
    const q = query(collection(db, "tasks"), orderBy("createdAt", "asc"));
    const querySnapshot = await getDocs(q);
    const taskData = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));
    setTasks(taskData);
  };

  const handleAddTask = async () => {
    if (!task.trim()) return;

    await addDoc(collection(db, "tasks"), {
      title: task,
      completed: false,
      createdAt: serverTimestamp(),
      completedAt: null,
    });

    setTask("");
    fetchTasks();
  };

  const handleToggleComplete = async (id, completed) => {
    await updateDoc(doc(db, "tasks", id), {
      completed: !completed,
      completedAt: !completed ? serverTimestamp() : null,
    });
    fetchTasks();
  };

  const sortedTasks = [
    ...tasks.filter((t) => !t.completed),
    ...tasks.filter((t) => t.completed),
  ];

  return (
    <>
      <FarmerNavbar />
      <div className="bg-white p-6 rounded-lg shadow mt-8">
        <h2 className="text-3xl font-bold text-green-700 mb-4 flex gap-1">
          <span className="text-red-700 text-3xl flex justify-center items-center gap-1">
            <FaTasks />
          </span>
          Task Manager
        </h2>

        <div className="flex items-center gap-2 mb-4">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Enter a task..."
            className="border border-gray-300 px-3 py-2 rounded w-full"
          />
          <button
            onClick={handleAddTask}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2 max-h-screenoverflow-y-auto scrollbar-thin">
          <AnimatePresence>
            {sortedTasks.map((t) => (
              <motion.li
                key={t.id}
                layout
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
                className={`flex justify-between items-center px-4 py-2 border rounded shadow-sm transition-all duration-300 ${
                  t.completed
                    ? "bg-green-100 text-gray-500 line-through"
                    : "bg-gray-50"
                }`}
              >
                <span className="flex">
                  {t.completed ? (
                    <Check className="text-white bg-yellow-600 w-5 h-5 mr-2" />
                  ) : (
                    ""
                  )}

                  {t.title}
                </span>
                <button
                  onClick={() => handleToggleComplete(t.id, t.completed)}
                  className="text-sm text-white bg-green-600 px-3 py-1 rounded hover:bg-green-700"
                >
                  {t.completed ? "Undo" : "Complete"}
                </button>
              </motion.li>
            ))}
          </AnimatePresence>
        </ul>
      </div>
    </>
  );
};

export default TaskManager;
