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
      router.push("/auth?type=login");
    }, 500);
  };

  const getUserProfile = async () => {
    if (!loggedInUser?.username) return;
    try {
      setLoader(true);
      toast.loading("fetching profile...");
      const user = await getUserDataService(
        username || loggedInUser?.username || ""
      );
      toast.dismiss();
      toast.success("fetched profile :)");
      setUserProfile(user);
    } catch (err) {
      toast.dismiss();
      console.log(err);
      toast.error("something went wrong :)");
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    getUserProfile();
  }, [loggedInUser?.username]);

  return !loader && userProfile?.id ? (
    <div className="min-h-screen flex justify-center items-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Profile</h2>

        <div className="bg-gray-50 p-6 rounded-lg shadow-lg">
          <div className="flex flex-col items-center space-y-4">
            <Avatar
              firstName={userProfile.firstName}
              lastName={userProfile.lastName}
            />
            <h3 className="text-xl font-semibold">
              {userProfile?.firstName} {userProfile?.lastName}
            </h3>
            <p className="text-gray-600">Username: {userProfile?.username}</p>

            {/* Show logout button if it's their own profile */}
            {isSelf && (
              <button
                onClick={handleLogout}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
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
