import "./App.css";
import MyBarChart from "./components/exChart";

function App() {
  return (
    <div className="w-full  bg-gray-100 flex items-center justify-center">
      <h1 className="text-5xl font-bold text-green-600">
        Hello, Tailwind with React and TypeScript!
      </h1>
      <MyBarChart />
    </div>
  );
}

export default App;
