import Image from "next/image";
import { useState, useRef } from "react";
import api from "@/api";

export default function Home() {
  const [users, setUsers] = useState();
  const [feedback, setFeedback] = useState();
  const usernameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const createUser = async (event) => {
    event.preventDefault();
    const response = await api.post("/users", {
      username: usernameRef?.current?.value,
      password: passwordRef?.current?.value,
    });
    setFeedback(response.data);
  };
  const fetchUsers = async () => {
    const response = await api.get("/users");
    setUsers(response.data);
  };
  return (
    <div className="text-blue-500">
      <h1>Home Page</h1>
      <h1>Insert User: </h1>
      <form className="text-black" onSubmit={createUser}>
        <input ref={usernameRef} type="text" placeholder="username" />
        <input ref={passwordRef} type="password" placeholder="password" />
        <button type="submit">Create</button>
      </form>
      {feedback && <p>{JSON.stringify(feedback)}</p>}
      <button onClick={fetchUsers}>Fetch Users</button>
      {users && (
        <>
          <h1>Users List: </h1>
          {JSON.stringify(users)}
        </>
      )}
    </div>
  );
}
