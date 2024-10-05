import { useGlobal } from "../utils/UserContext";
const Shimmer = ({ listOfRestaurants }) => {
  const { dark } = useGlobal();
  const count = listOfRestaurants.length || 15;
  return (
    <div className={`flex flex-wrap ${dark ? "bg-gray-800" : "bg-white"}`}>
      {Array(count).fill().map((_, index) => (
        <div key={index} className="bg-gray-300 w-[200px] h-[250px] m-6 rounded-lg"></div>
      ))}
    </div>
  );
};

export default Shimmer;
