export default function LoadingCard() {
  return (
    <div
      className="w-60 m-2 flex flex-col justify-center hover:scale-105 hover:shadow-xl
          transform transition-all duration-200 ease-out text-center"
    >
      <div
        className="w-44 h-44 rounded-full bg-gray-600 z-10 m-auto
      animate-pulse"
      />
      <div className="bg-gray-700 rounded-2xl shadow-md p-4 pt-32 -mt-28">
        <h3 className="w-2/3 bg-gray-600 rounded-full h-7 m-auto animate-pulse my-1" />
        <div className="flex justify-center space-x-2 mt-2">
          <p className="w-[30%] bg-gray-600 rounded-full h-7 m-auto animate-pulse" />
        </div>
      </div>
    </div>
  );
}
