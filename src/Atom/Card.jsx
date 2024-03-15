const Card = ({ title, content, color }) => {
  return ( 
    <div className="rounded-sm p-5 sm:col-span-3 text-white shadow-sm" style={{ backgroundColor: color }}>
      <h2 className="text-lg">{title}</h2>
      <p className="text-left text-3xl font-bold my-5">{content}</p>
    </div>
  );
}

export default Card;