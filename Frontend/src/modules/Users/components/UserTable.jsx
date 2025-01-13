import React from "react";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";

// Initialize Cloudinary instance
const cld = new Cloudinary({
  cloud: {
    cloudName: "dtyc0iz95", 
  },
});

const UserTable = ({ users, onDelete }) => (
  <table className="w-full border-collapse mb-4">
    <thead>
      <tr className="bg-gray-200">
        <th className="p-2 text-left" style={{ width: "120px" }}>
          AVATAR
        </th>
        <th className="p-2 text-left" >NAME</th>
        <th className="p-2 text-left">ROLE</th>
        <th className="p-2 text-left">EMAIL</th>
        <th className="p-2 text-left">COUNTRY</th>
        <th className="p-2 text-left">TYPE</th>
        <th className="p-2 text-left">ACTION</th>
      </tr>
    </thead>
    <tbody>
      {users.map((user, index) => {
        const image = user.img_url
          ? cld.image(user.img_url).resize(fill().width(100).height(100))
          : null;

        return (
          <tr key={index} className="odd:bg-white even:bg-gray-50">
            <td
              className="p-2 flex items-center justify-center"
              style={{ width: "120px" }}
            >
              {image ? (
                <AdvancedImage
                  cldImg={image}
                  alt={`${user.name}'s avatar`}
                  className="rounded-full"
                />
              ) : (
                <span className="p-2">No Avatar</span>
              )}
            </td>
            <td className="p-2">{user.name}</td>
            <td className="p-2">{user.role}</td>
            <td className="p-2">{user.email}</td>
            <td className="p-2">{user.country}</td>
            <td className="p-2">{user.type}</td>
            <td className="p-2">
              <button
                className="text-red-500"
                onClick={() => onDelete(user.id)}
              >
                <DeleteOutlineIcon />
              </button>
            </td>
          </tr>
        );
      })}
    </tbody>
  </table>
);

export default UserTable;
