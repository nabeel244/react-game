// import React, { useState, FormEvent } from "react";
// import { $http } from "@/lib/http";
// import { useQuery, useMutation } from "@tanstack/react-query";
// import { Button } from "./ui/button";
// import { useUserStore } from "@/store/user-store";
// import { toast } from "react-toastify";

// interface CipherDetails {
//   code: string;
//   reward: number;
//   valid_for: string;
// }

// interface ApiResponse {
//   success: boolean;
//   message?: string;
//   reward?: number;
// }

// const DailyCipher: React.FC = () => {
//   const [code, setCode] = useState<string>("");
//   // Fetch today's cipher details
//   const { data: cipherData, isLoading: isLoadingCipher } = useQuery({
//     queryKey: ["dailyCipher"],
//     queryFn: async () => {
//       const response = await $http.$get<CipherDetails>("/daily-cipher");
//       return response;
//     },
//     staleTime: 1000 * 60 * 60, // Cache for 1 hour
//     retry: 1, // Retry once if the fetch fails
//   });

//   // Submit cipher code
//   const { mutate: submitCipherCode, status: submitStatus } = useMutation({
//     mutationFn: async (submittedCode: string) => {
//       const response = await $http.post<ApiResponse>("/daily-cipher", { code: submittedCode });
//       return response.data;
//     },
//     onSuccess: (data) => {
//       if (data.success) {
//         useUserStore.setState((state) => { 
//           state.balance += data.reward ?? 0;
//           return state;
//         });
//          setCode("");
//         toast.success(`You've received ${data.reward} coins!`);
//       } else {
//         toast.error(data.message || "Failed to redeem the code.")
//       }
//     },
//     onError: (error: any) => {
//       toast.error("An error occurred. Please try again later."),
//       console.error("Error submitting daily cipher:", error);
//     },
//   });

//   const handleSubmit = (e: FormEvent) => {
//     e.preventDefault();
//     submitCipherCode(code); // Call the mutation
//   };

//   const isSubmitting = submitStatus === "pending";


//   return (
//     <div className="flex flex-col items-center justify-center p-4">
//       {isLoadingCipher ? (
//         <p>Loading today's cipher...</p>
//       ) : cipherData && (
//         <div>
//           <p>Today's Reward: {cipherData.reward} coins</p>
//           <p>Valid For: {new Date(cipherData.valid_for).toLocaleDateString()}</p>
//         </div>
//       )}

//       <form onSubmit={handleSubmit} className="mt-6 flex items-center space-x-2 w-full max-w-md">
//         <div className="relative flex-grow">
//           <input
//             type="text"
//             placeholder="Enter cipher code"
//             value={code}
//             onChange={(e) => setCode(e.target.value)}
//             className="block w-full px-4 py-2 text-sm text-gray-900 placeholder-gray-400 bg-gray-100 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 peer"
//           />
//         </div>
//         <Button
//            className={`flex-1 items-center justify-center px-6 py-3 rounded-full text-white font-semibold text-base bg-gradient-to-r from-purple-700 to-cyan-400 shadow-md ${isSubmitting
//             ? "bg-blue-300 cursor-not-allowed"
//             : ""
//           }`}
//           disabled={isSubmitting}
//           >
//              {isSubmitting ? "Submitting..." : "Submit"}
//           </Button>
//       </form>
//     </div>
//   );
// };

// export default DailyCipher;
