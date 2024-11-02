import React from "react";
import { BiSolidCameraMovie } from "react-icons/bi";

function Booking() {
  return (
    <div className="flex flex-col items-center bg-red-500 p-6 text-orange-950">
      <div className="flex gap-4 w-full max-w-2xl">
      <span>Let me know About new movies!</span>
      <BiSolidCameraMovie />
      </div>
      <div className="flex gap-4 w-full max-w-2xl">
        <label className="input input-bordered flex items-center gap-2">
          Name
          <input type="text" className="grow" placeholder="Daisy" />
        </label>
        <label className="input input-bordered flex items-center gap-2">
          Email
          <input type="text" className="grow" placeholder="daisy@site.com" />
        </label>
        <button className="btn btn-primary">Primary</button>
      </div>
    </div>
  );
}

export default Booking;
