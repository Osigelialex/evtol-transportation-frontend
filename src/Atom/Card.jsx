const Card = ({ title, content, color }) => {
  return (
    <div className="rounded-sm sm:col-span-3 text-gray-800 shadow-md">
      <div className="w-full h-1" style={{ backgroundColor: color }}></div>
      <div className="p-5">
        <h2 className="text-lg">{title}</h2>
        <p className="text-left text-3xl font-bold my-5">{content}</p>
      </div>
    </div>
  );
};

export default Card;
