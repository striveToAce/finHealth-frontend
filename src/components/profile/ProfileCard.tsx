"use client";

import React, { useEffect, useState } from "react";
import { logout } from "../../redux/slices/authSlice";
import { toast } from "react-toastify";
import { useRouter, useSearchParams } from "next/navigation";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { getUserDataService } from "@/services/authService";
import { useDispatch } from "react-redux";
import Avatar from "../common/Avatar";

export const ProfileCard: React.FC = () => {
  const searchParams = useSearchParams();
  const username = searchParams.get("username");

  // Fetch the logged-in user from Redux store
  const { loggedInUser } = useSelector((state: RootState) => state.auth);
  const [loader, setLoader] = useState<boolean>(true);
  const [userProfile, setUserProfile] = useState<IUser | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const isSelf = !username || username === loggedInUser?.username;

  // Handle logout action
  const handleLogout = () => {
    toast.success("Logging out...");
    dispatch(logout());
    setTimeout(() => {
      router.push("/");
    }, 500);
  };

  const getUserProfile = async () => {
    if (!loggedInUser?.username) return;
    try {
      setLoader(true);
      toast.loading("Fetching profile...");
      const user = await getUserDataService(
        username || loggedInUser?.username || ""
      );
      toast.dismiss();
      toast.success("Fetched profile :)");
      setUserProfile(user);
    } catch (err) {
      toast.dismiss();
      console.error(err);
      toast.error("Something went wrong :(");
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    getUserProfile();
  }, [loggedInUser?.username]);

  return !loader && userProfile?.id ? (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-r from-purple-900 via-black to-blue-900 text-white">
      <div className="bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800 p-8 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-3xl font-extrabold mb-6 text-center text-glow">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">
            Profile
          </span>
        </h2>

        <div className="bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            {/* Avatar */}
            <Avatar
              firstName={userProfile.firstName}
              lastName={userProfile.lastName}
            />

            {/* Name */}
            <h3 className="text-xl font-semibold text-gray-200">
              {userProfile?.firstName} {userProfile?.lastName}
            </h3>

            {/* Username */}
            <p className="text-gray-400">Username: {userProfile?.username}</p>

            {/* Logout Button */}
            {isSelf && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-transform transform hover:scale-105 shadow-md"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : null;
};