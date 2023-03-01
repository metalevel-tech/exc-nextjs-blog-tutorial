import { useState } from "react";

function Header({ title = "Develop. Preview. Ship. 🚀..." }) {
  return <h1>{title}</h1>;
}

export default function HomePage() {
  const [likes, setLikes] = useState(0);
  const names = ["Ada Lovelace", "Grace Hopper", "Margaret Hamilton"];

  function handleOnClick() {
    setLikes(likes + 1);
  }

  return (
    <div>
      <Header title="React 💙" />
      <Header />
      <ul>
        {names.map((name, index) => (
          <li key={index}>{name}</li>
        ))}
      </ul>
      {likes} <button onClick={handleOnClick}>Like</button>
    </div>
  );
}

// const app = document.getElementById("app");
// ReactDOM.createRoot(app).render(<HomePage />);
