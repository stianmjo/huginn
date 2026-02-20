export default function Page() {
  
  return (
    <div>
        <h1 className="m-2 text-2xl">Box with flex</h1>
        <div className="flex border-white border-solid border-2">
            <div className="border-white border-solid border-2 p-2 m-2">
                <h1>box2</h1>
            </div>
            <div className="border-white border-solid border-2 p-2 m-2">
                <h1>box1</h1>
            </div>
        </div>
        <h1 className="m-2 text-2xl">Box with no flex</h1>
        <div className=" border-white border-solid border-2">
            <div className="border-white border-solid border-2 p-2 m-2">
                <h1>box2</h1>
            </div>
            <div className="border-white border-solid border-2 p-2 m-2">
                <h1>box1</h1>
            </div>
        </div>
    </div>
  );
}