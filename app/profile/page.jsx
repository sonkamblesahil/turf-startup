import { Award, CreditCard, Mail, Phone, User } from "lucide-react";
import { mockUsers } from "@/lib/mockData";

export default function ProfilePage() {
  const user = mockUsers.find((item) => item.id === "user1");
  const owner = mockUsers.find((item) => item.role === "owner");

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <h1 className="mb-8 text-3xl font-bold text-gray-900">
          Profile & Registration
        </h1>

        <div className="mb-8 overflow-hidden rounded-xl bg-white shadow">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-8 text-white">
            <div className="flex items-center gap-4">
              <div className="rounded-full bg-white p-4">
                <User className="h-8 w-8 text-green-600" />
              </div>
              <div>
                <h2 className="text-2xl font-bold">{user?.name}</h2>
                <p className="text-green-100">User Registration Details</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-6 p-8 md:grid-cols-2">
            <div className="flex items-center gap-3 text-gray-700">
              <User className="h-5 w-5 text-gray-400" />
              Name: {user?.name}
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Mail className="h-5 w-5 text-gray-400" />
              Email: {user?.email}
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Phone className="h-5 w-5 text-gray-400" />
              Phone: {user?.phone}
            </div>
            <div className="flex items-center gap-3 text-gray-700">
              <Award className="h-5 w-5 text-gray-400" />
              Age: {user?.age} | Gender: {user?.gender}
            </div>
          </div>
        </div>

        <div className="rounded-xl bg-white p-8 shadow">
          <h2 className="mb-4 flex items-center gap-2 text-xl font-semibold text-gray-900">
            <CreditCard className="h-5 w-5 text-green-600" /> Owner Bank Details
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>Account holder: {owner?.bankDetails?.accountHolderName}</p>
            <p>Account number: {owner?.bankDetails?.accountNumber}</p>
            <p>IFSC code: {owner?.bankDetails?.ifscCode}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
