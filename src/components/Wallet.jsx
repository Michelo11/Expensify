export default function Wallet() {
  return (
    <div className="card h-1/2 bg-modal shadow-xl mt-10">
      <figure className="px-10 pt-10">
        <img
          src="/card.png"
          alt="Card"
          className="rounded-xl"
          draggable={false}
        />
      </figure>
      <div className="card-body items-center text-center px-10">
        <div className="flex justify-between w-full">
          <h2 className="card-title">Card 3</h2>
          <div className="flex items-center gap-2">
            <span className="indicator-item badge badge-success"></span>
            <p>Active</p>
          </div>
        </div>
        <p className="w-full text-left">
          If a dog chews shoes whose shoes does he choose?
        </p>
        <div className="card-actions mt-4">
          <button className="btn btn-primary uppercase">Add new</button>
        </div>
      </div>
    </div>
  );
}
