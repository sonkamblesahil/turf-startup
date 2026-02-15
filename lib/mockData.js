export const mockUsers = [
  {
    id: "user1",
    name: "John Doe",
    email: "john@example.com",
    phone: "+91 9876543210",
    age: 28,
    gender: "male",
    role: "user",
  },
  {
    id: "user2",
    name: "Amit Patel",
    email: "amit@example.com",
    phone: "+91 9876543299",
    age: 26,
    gender: "male",
    role: "user",
  },
  {
    id: "user3",
    name: "Sarah Williams",
    email: "sarah@example.com",
    phone: "+91 9876543288",
    age: 30,
    gender: "female",
    role: "user",
  },
  {
    id: "owner1",
    name: "Rajesh Kumar",
    email: "rajesh@turfowner.com",
    phone: "+91 9876543211",
    age: 35,
    gender: "male",
    role: "owner",
    bankDetails: {
      accountNumber: "XXXX XXXX 1234",
      ifscCode: "HDFC0001234",
      accountHolderName: "Rajesh Kumar",
    },
  },
  {
    id: "owner2",
    name: "Priya Sharma",
    email: "priya@turfowner.com",
    phone: "+91 9876543212",
    age: 32,
    gender: "female",
    role: "owner",
    bankDetails: {
      accountNumber: "XXXX XXXX 5678",
      ifscCode: "ICIC0005678",
      accountHolderName: "Priya Sharma",
    },
  },
];

export const mockTurfs = [
  {
    id: "turf1",
    name: "Green Field Arena",
    location: "Mumbai",
    sports: ["football", "cricket", "box-cricket"],
    address: "123 Sports Complex, Andheri West, Mumbai - 400058",
    size: "100x60 feet",
    details: "Premium artificial turf with floodlights and changing rooms",
    ownerId: "owner1",
    ownerContact: {
      name: "Rajesh Kumar",
      phone: "+91 9876543211",
      email: "rajesh@turfowner.com",
    },
    pricePerHour: 2000,
    timings: [
      "06:00-07:00",
      "07:00-08:00",
      "08:00-09:00",
      "17:00-18:00",
      "18:00-19:00",
      "19:00-20:00",
    ],
    bookedSlots: [
      {
        date: "2026-02-20",
        startTime: "18:00",
        endTime: "19:00",
        bookingId: "booking1",
      },
      {
        date: "2026-02-20",
        startTime: "19:00",
        endTime: "20:00",
        bookingId: "booking4",
      },
    ],
    refundPolicy: {
      enabled: true,
      refundPercent: 80,
      refundDeadlineHours: 12,
    },
    platformFees: {
      monthlyFee: 1500,
      bidCommissionPercent: 10,
    },
    images: [
      "https://images.unsplash.com/photo-1529900748604-07564a03e7a6?w=800",
      "https://images.unsplash.com/photo-1551958219-acbc608c6377?w=800",
    ],
    amenities: [
      "Floodlights",
      "Changing Rooms",
      "Parking",
      "Washrooms",
      "Drinking Water",
    ],
    rating: 4.5,
    reviewCount: 124,
  },
  {
    id: "turf2",
    name: "Victory Sports Club",
    location: "Bangalore",
    sports: ["football", "badminton", "cricket"],
    address: "456 MG Road, Koramangala, Bangalore - 560034",
    size: "90x55 feet",
    details: "Natural grass turf with professional amenities",
    ownerId: "owner2",
    ownerContact: {
      name: "Priya Sharma",
      phone: "+91 9876543212",
      email: "priya@turfowner.com",
    },
    pricePerHour: 1800,
    timings: [
      "06:00-07:00",
      "07:00-08:00",
      "08:00-09:00",
      "16:00-17:00",
      "17:00-18:00",
      "18:00-19:00",
    ],
    bookedSlots: [
      {
        date: "2026-02-16",
        startTime: "16:00",
        endTime: "17:00",
        bookingId: "booking2",
      },
    ],
    refundPolicy: {
      enabled: true,
      refundPercent: 70,
      refundDeadlineHours: 6,
    },
    platformFees: {
      monthlyFee: 1200,
      bidCommissionPercent: 8,
    },
    images: [
      "https://images.unsplash.com/photo-1575361204480-aadea25e6e68?w=800",
      "https://images.unsplash.com/photo-1624880357913-a8539238245b?w=800",
    ],
    amenities: [
      "Floodlights",
      "Changing Rooms",
      "Cafeteria",
      "First Aid",
      "Equipment Rental",
    ],
    rating: 4.3,
    reviewCount: 89,
  },
  {
    id: "turf3",
    name: "Champions Arena",
    location: "Delhi",
    sports: ["football", "cricket", "tournament"],
    address: "789 Stadium Road, Saket, New Delhi - 110017",
    size: "110x70 feet",
    details: "FIFA standard artificial turf with professional facilities",
    ownerId: "owner1",
    ownerContact: {
      name: "Rajesh Kumar",
      phone: "+91 9876543211",
      email: "rajesh@turfowner.com",
    },
    pricePerHour: 2500,
    timings: [
      "06:00-07:00",
      "07:00-08:00",
      "08:00-09:00",
      "09:00-10:00",
      "10:00-11:00",
      "18:00-19:00",
    ],
    bookedSlots: [
      {
        date: "2026-02-25",
        startTime: "09:00",
        endTime: "13:00",
        bookingId: "booking3",
      },
    ],
    refundPolicy: {
      enabled: false,
      refundPercent: 0,
      refundDeadlineHours: 0,
    },
    platformFees: {
      monthlyFee: 1800,
      bidCommissionPercent: 12,
    },
    images: [
      "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=800",
      "https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=800",
    ],
    amenities: [
      "Floodlights",
      "VIP Seating",
      "Commentary Box",
      "Changing Rooms",
      "Parking",
    ],
    rating: 4.8,
    reviewCount: 203,
  },
];

export const mockBookings = [
  {
    id: "booking1",
    turfId: "turf1",
    userId: "user1",
    date: "2026-02-20",
    startTime: "18:00",
    endTime: "19:00",
    type: "hourly",
    numberOfPeople: 12,
    equipment: { bats: 2, balls: 1 },
    totalAmount: 2150,
    status: "confirmed",
    createdAt: "2026-02-14T10:30:00Z",
  },
  {
    id: "booking2",
    turfId: "turf2",
    userId: "user1",
    date: "2026-02-16",
    startTime: "16:00",
    endTime: "17:00",
    type: "hourly",
    numberOfPeople: 10,
    equipment: { bats: 0, balls: 0 },
    totalAmount: 1800,
    status: "completed",
    createdAt: "2026-02-10T14:20:00Z",
  },
  {
    id: "booking3",
    turfId: "turf3",
    userId: "user1",
    date: "2026-02-25",
    startTime: "09:00",
    endTime: "13:00",
    type: "tournament",
    numberOfPeople: 50,
    equipment: { bats: 4, balls: 3 },
    totalAmount: 10500,
    status: "confirmed",
    createdAt: "2026-02-12T09:15:00Z",
  },
  {
    id: "booking4",
    turfId: "turf1",
    userId: "user2",
    date: "2026-02-20",
    startTime: "19:00",
    endTime: "20:00",
    type: "hourly",
    numberOfPeople: 10,
    equipment: { bats: 0, balls: 0 },
    totalAmount: 2000,
    status: "confirmed",
    createdAt: "2026-02-14T08:20:00Z",
  },
];

export const mockReviews = [
  {
    id: "review1",
    turfId: "turf1",
    userId: "user1",
    userName: "John Doe",
    rating: 5,
    comment:
      "Excellent facility! The turf quality is top-notch and the staff is very professional.",
    createdAt: "2026-02-10T15:30:00Z",
  },
  {
    id: "review2",
    turfId: "turf1",
    userId: "user2",
    userName: "Amit Patel",
    rating: 4,
    comment:
      "Great experience overall. Good lighting and well-maintained grounds.",
    createdAt: "2026-02-08T18:45:00Z",
  },
  {
    id: "review3",
    turfId: "turf2",
    userId: "user3",
    userName: "Sarah Williams",
    rating: 4,
    comment:
      "Nice location and good facilities. Could use better parking space.",
    createdAt: "2026-02-05T12:20:00Z",
  },
];

export const mockTournaments = [
  {
    id: "tournament1",
    turfId: "turf3",
    ownerId: "owner1",
    name: "Champions League 2026",
    date: "2026-02-28",
    startTime: "09:00",
    endTime: "18:00",
    maxTeams: 8,
    registeredTeams: [
      { name: "Thunder FC", captain: "Ravi", size: 8, location: "Delhi" },
      { name: "Blue Strikers", captain: "Manish", size: 8, location: "Noida" },
    ],
    entryFee: 5000,
    prizePool: 35000,
    status: "upcoming",
  },
  {
    id: "tournament2",
    turfId: "turf1",
    ownerId: "owner1",
    name: "Weekend Warriors Cup",
    date: "2026-03-05",
    startTime: "10:00",
    endTime: "17:00",
    maxTeams: 6,
    registeredTeams: [
      { name: "Mumbai Titans", captain: "Kunal", size: 7, location: "Mumbai" },
    ],
    entryFee: 3000,
    prizePool: 15000,
    status: "upcoming",
  },
];

export const mockBidRequests = [
  {
    id: "bid1",
    turfId: "turf1",
    currentBookingId: "booking4",
    bidderUserId: "user1",
    date: "2026-02-20",
    startTime: "19:00",
    endTime: "20:00",
    offeredAmount: 2600,
    commissionPercent: 10,
    ownerSharePercent: 40,
    status: "open",
  },
];

export const mockMatchRequests = [
  {
    id: "match1",
    userId: "user1",
    teamName: "John XI",
    teamSize: 6,
    preferredLocation: "Mumbai",
    preferredDate: "2026-02-22",
    status: "matched",
    matchedWith: "Amit Warriors",
    suggestedTurfId: "turf1",
  },
  {
    id: "match2",
    userId: "user2",
    teamName: "Amit Warriors",
    teamSize: 6,
    preferredLocation: "Mumbai",
    preferredDate: "2026-02-22",
    status: "open",
    matchedWith: null,
    suggestedTurfId: "turf1",
  },
];

export const mockNotifications = [
  {
    id: "notif1",
    userId: "user1",
    type: "booking",
    title: "Booking Confirmed",
    message:
      "Your booking at Green Field Arena for Feb 20, 2026 at 18:00 is confirmed.",
    read: false,
    createdAt: "2026-02-14T10:31:00Z",
    link: "/my-bookings",
  },
  {
    id: "notif2",
    userId: "user1",
    type: "discount",
    title: "Special Discount Available!",
    message: "Get 20% off on Victory Sports Club this weekend!",
    read: false,
    createdAt: "2026-02-14T08:00:00Z",
  },
  {
    id: "notif3",
    userId: "user1",
    type: "reminder",
    title: "Booking Reminder",
    message: "Your booking at Green Field Arena starts in 1 hour!",
    read: true,
    createdAt: "2026-02-13T17:00:00Z",
  },
  {
    id: "notif4",
    userId: "user1",
    type: "competition",
    title: "Tournament Registration Open",
    message:
      "Weekend Warriors Cup has opened registrations. Join before slots fill up.",
    read: false,
    createdAt: "2026-02-14T11:45:00Z",
  },
  {
    id: "notif5",
    userId: "user1",
    type: "timing_over",
    title: "Session Completed",
    message:
      "Your booking slot at Victory Sports Club has ended. Rate your experience.",
    read: false,
    createdAt: "2026-02-16T17:05:00Z",
  },
];

export const mockDiscounts = [
  {
    id: "discount1",
    turfId: "turf2",
    title: "Weekend Special",
    description: "Get 20% off on all bookings this weekend!",
    discountPercentage: 20,
    validFrom: "2026-02-16",
    validTo: "2026-02-17",
    active: true,
  },
  {
    id: "discount2",
    turfId: "turf1",
    title: "Early Bird Offer",
    description: "15% off on morning slots (6 AM - 10 AM)",
    discountPercentage: 15,
    validFrom: "2026-02-15",
    validTo: "2026-02-28",
    active: true,
  },
];

export function initializeMockData() {
  if (!localStorage.getItem("turfs")) {
    localStorage.setItem("turfs", JSON.stringify(mockTurfs));
  }
  if (!localStorage.getItem("bookings")) {
    localStorage.setItem("bookings", JSON.stringify(mockBookings));
  }
  if (!localStorage.getItem("reviews")) {
    localStorage.setItem("reviews", JSON.stringify(mockReviews));
  }
  if (!localStorage.getItem("tournaments")) {
    localStorage.setItem("tournaments", JSON.stringify(mockTournaments));
  }
  if (!localStorage.getItem("notifications")) {
    localStorage.setItem("notifications", JSON.stringify(mockNotifications));
  }
  if (!localStorage.getItem("discounts")) {
    localStorage.setItem("discounts", JSON.stringify(mockDiscounts));
  }
  if (!localStorage.getItem("bidRequests")) {
    localStorage.setItem("bidRequests", JSON.stringify(mockBidRequests));
  }
  if (!localStorage.getItem("matchRequests")) {
    localStorage.setItem("matchRequests", JSON.stringify(mockMatchRequests));
  }
  if (!localStorage.getItem("currentUser")) {
    localStorage.setItem("currentUser", JSON.stringify(mockUsers[0]));
  }
  if (!localStorage.getItem("users")) {
    localStorage.setItem("users", JSON.stringify(mockUsers));
  }
}
