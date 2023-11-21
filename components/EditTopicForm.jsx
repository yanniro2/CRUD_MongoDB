"use client";

import { useState, useEffect } from "react";

export default function EditTopicForm({ id, title, description }) {
  const [newTitle, setNewTitle] = useState(title);
  const [newDescription, setNewDescription] = useState(description);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") {
      setNewTitle(value);
    } else if (name === "description") {
      setNewDescription(value);
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [newTitle, newDescription]);

  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3001/api/topics/${id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ newTitle, newDescription }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    // <form onSubmit={handleSubmit} className="flex flex-col gap-3">
    <div>
      <input
        onChange={handleChange}
        value={newTitle}
        name="title"
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Title"
      />

      <input
        onChange={handleChange}
        value={newDescription}
        name="description"
        className="border border-slate-500 px-8 py-2"
        type="text"
        placeholder="Topic Description"
      />

      {/* <button className="bg-green-600 font-bold text-white py-3 px-6 w-fit">
          Update Topic
        </button> */}
    </div>
    // {/* </form> */}
  );
}
