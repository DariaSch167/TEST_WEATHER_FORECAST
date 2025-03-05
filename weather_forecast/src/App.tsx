import "./App.css";
// import MyBarChart from "./components/exChart";
import CityInput from "./components/CityInput";

function App() {
  return (
    <div className="w-full h-full bg-gray-100 flex items-center justify-center">
      <h1 className="text-5xl font-bold text-green-600">
        Hello, Tailwind with React and TypeScript!
      </h1>
      {/* <MyBarChart /> */}
      <div className="text-black">
        <CityInput />
      </div>
    </div>
  );
}

export default App;
