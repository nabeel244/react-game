import { useState } from "react";
import { useUserStore } from "@/store/user-store";
import { $http } from "@/lib/http";
import { toast } from "react-toastify";
import { Button } from "@/components/ui/button";

export const UpdateProfile = () => {
    const user = useUserStore();
  const { first_name, last_name, username, updateUser ,} = useUserStore(); // Destructure state and updater from store
  const [firstName, setFirstName] = useState(first_name);
  const [lastName, setLastName] = useState(last_name);
  const [userName, setUserName] = useState(username);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      // HTTP PUT request to update user data
      await $http.put("/user/update", {
        first_name: firstName,
        last_name: lastName,
        username: userName,
      });

      // Update the Zustand store with the new data
      updateUser({ first_name: firstName, last_name: lastName, username: userName });

      // Success message
      toast.success("Profile updated successfully");
    } catch (error: any) {
      // Error handling
      const errorMessage = error?.response?.data?.message || "Failed to update profile. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div
    className="flex flex-col bg-cover flex-1 pb-16"
    style={{
      background:
        'linear-gradient(90deg, rgba(127,0,255,0.2) 0%, rgba(62,0,116,0.83) 78%, rgba(43,0,78,1) 100%)',
    }}
  >
    <div className="flex mt-1 space-x-1.5 justify-center items-center select-none">
      <img
        src="/images/coins.png"
        alt="coins"
        className="object-contain w-15 h-15"
      />
      <span className="text-3xl mt-3 font-bold text-gradient">
        {Math.floor(user.balance)?.toLocaleString()}
      </span>
    </div>
    <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4 mt-6">
      <label className="block w-full max-w-md">
        <span className="text-lg font-semibold text-white-700">First Name</span>
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="block w-full px-6 py-3 text-xl text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </label>
      <label className="block w-full max-w-md">
        <span className="text-lg font-semibold text-white-700">Last Name</span>
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="block w-full px-6 py-3 text-xl text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </label>
      <label className="block w-full max-w-md">
        <span className="text-lg font-semibold text-white-700">Username</span>
        <input
          type="text"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          className="block w-full px-6 py-3 text-xl text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-primary-500 focus:border-primary-500"
        />
      </label>
      <Button
        type="submit"
        className="mt-4 px-8 py-3 rounded-full text-white font-semibold text-base bg-gradient-to-r from-purple-700 to-cyan-400 shadow-md"
      >
        Update Profile
      </Button>
    </form>
  </div>
  
  );
};
