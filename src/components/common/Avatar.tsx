import React from "react";

interface AvatarProps {
  firstName: string;
  lastName: string;
}

const Avatar: React.FC<AvatarProps> = ({ firstName, lastName }) => {
  // Get the first and last letter of the name
  const initials = `${firstName.charAt(0)}${lastName.charAt(0)}`;

  return (
    <div className="w-16 h-16 bg-blue-500 text-white rounded-full flex justify-center items-center text-2xl font-bold">
      {initials.toUpperCase()}
    </div>
  );
};

export default Avatar;
