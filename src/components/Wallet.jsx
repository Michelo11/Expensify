import Image from "next/image";

export default function Wallet({ organization }) {
  return (
    <div className="card h-1/2 bg-modal shadow-xl mt-10">
      <figure className="px-10 pt-10">
        <Image
          src={`/cards/${organization.type.toLowerCase()}.png`}
          alt="Card"
          className="rounded-xl"
          width={500}
          height={300}
          draggable={false}
        />
      </figure>
      <div className="card-body items-center text-center px-10">
        <div className="flex justify-between w-full">
          <h2 className="card-title">{organization.type}</h2>
          <div className="flex items-center gap-2">
            <span className="indicator-item badge badge-success"></span>
            <p>Active</p>
          </div>
        </div>
        <p className="w-full text-left">
          You are using a {organization.type.toLowerCase()} integration
        </p>
      </div>
    </div>
  );
}
