const ErrorComponent = ({ code, title, message }) => {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center p-4">
        <h1 className="text-6xl font-bold text-red-500">{code}</h1>
        <h2 className="text-2xl font-semibold mt-4">{title}</h2>
        <p className="mt-2 text-gray-600">{message}</p>
      </div>
    );
  };
  
  export default ErrorComponent;
  