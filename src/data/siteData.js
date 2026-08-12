export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const SECTIONS = ['BREAKFAST', 'LUNCH', 'Tea Time', 'DINNER']

export const LEADERSHIP = [
  
  
  {
    name: 'Director, IIT Bhilai',
    role: 'Dr Rajiv Prakash',
    // quote: 'A well-nourished campus is a thriving campus.',
    photo: 'images/director.jpg',
  },
  {
    name: 'Dean of Student Affairs, IIT Bhilai',
    role: 'Dr Shudhanwa Patra',
    // quote: 'Your well-being at the mess is my priority.',
    photo: 'images/dosa.jpg',
  },
  {
    name: 'Faculty In-Charge (FIC), Mess',
    role: 'Dr Yagnesh Shadangi',
    // quote: 'Good food, great conversations, better days.',
    photo: 'images/fic.jpg',
  },
  {
    name: 'Mess Coordinator, IIT Bhilai',
    role: 'Manish Kumar',
    // quote: 'We listen, we improve, we serve.',
    photo: "images/coordinator.png",
  },
]

export const COMMITTEE = [
  {
    name: 'Manish Kumar ',
    role: 'Mess Coordinator',
    email: 'messcoordinator@iitbhilai.ac.in',
    photo: "images/coordinator.png",
  },
  {
    name: 'Sudhanshu Mishra',
    role: 'Member',
    email: "",
    photo: "images/sudhanshu.png",
  },
  {
    name: 'Abhishek Kumar',
    role: 'Member',
    email: 'abhishekkumar@iitbhilai.ac.in',
    photo: "images/abhishekkumar.png",
  },
  {
    name: 'Lakshya Soni',
    role: 'Website Incharge',
    photo: "images/Lakshya.png",
  },
  {
    name: 'Krish Shiyani',
    role: 'Website Manager',
    photo: "images/krish.png",
  },
  {
    name: 'Dheeraj Preetham Reddy',
    role: 'Member',
    photo: "images/dheeraj.png",
  },
  {
    name: 'Abhishek Singh',
    role: 'Member',
    photo: "images/abhishekk.png",
  },
  {
    name: 'Arpit Panday',
    role: 'Member',
    photo: "images/arpit.jpg",
  },
  {
    name: 'Pushkar Surendra Chaudhari',
    role: 'Member',
    photo: "images/pushkar.png",
  },
  {
    name: 'Venna Yaswanth',
    role: 'Member',
    photo: "images/yaswanth.png",
  },
  {
    name: 'Kavita Negi',
    role: 'Member',
    photo: "images/kavita.png",
  },
  {
    name: 'Bikka Akshara Venus',
    role: 'Member',
    photo: "images/akshara.png",
  },
  {
    name: 'Shubham Kumar',
    role: 'Member',
    photo: "images/shubham.png",
  },
  {
    name: 'Sadhana Gupta',
    role: 'Member',
    photo: "images/sadhana.png",
  },
  {
    name: 'Sanjay Kumar Verma',
    role: 'Member',
    photo: "images/sanjay.png",
  },
  {
    name: 'Akash Netam',
    role: 'Member',
    photo: "images/akash.png",
  },
]

export const MESS_INCHARGE = {
  name: 'Mahesh Koli',
  role: 'Mess Incharge',
  email: null,
  photo: 'images/incharge.jpg',
}

export const NOTICES = [
  {
    title: 'ID card is Mandatory at Every Meal',
    date: 'Important',
    category: 'Rules',
    text: 'All students must carry their mess card while entering the dining hall. Entry without a mess card will be denied.',
    color: '#d4183d',
  },
  {
    title: 'Meal Timings — Strictly Enforced',
    date: 'Important',
    category: 'Timings',
    text: 'Breakfast 8:00–10:00 AM • Lunch 12:30–2:30 PM • Snacks 5:00–6:00 PM • Dinner 8:00–10:00 PM. No service outside these hours.',
    color: '#2541b2',
  },
  {
    title: 'Hygiene Rules — Wash Hands Before Serving',
    date: 'Reminder',
    category: 'Hygiene',
    text: 'Hand sanitizer and wash basins are available at both entrances. Do not touch food directly while serving yourself.',
    color: '#10b981',
  },
  {
    title: 'No Food or Utensils to Be Taken Out',
    date: 'Reminder',
    category: 'Rules',
    text: 'Food, plates and cutlery must not be removed from the mess hall. Violators will be reported to the mess committee.',
    color: '#45347d',
  },
]

export const ANNOUNCEMENTS = [{
    title: 'Special Independence Day Lunch — 15 Aug',
    message: 'Join us for a festive Lunch with special dishes across all counters. Timings: 12:30–2:30 PM.',
    kind: 'special', // 🎉 special | 🕒 timing | 🍛 meal | 📢 general
    color: '#d97706', // matches your CSS palette
  },
]

export const MEAL_TIMINGS = [
  { label: 'Breakfast', time: '8:00 – 10:00 AM', emoji: '🍌', color: 'text-hunger-yellow' },
  { label: 'Lunch', time: '12:30 – 2:30 PM', emoji: '🥗', color: 'text-hunger-green' },
  { label: 'Snacks', time: '5:00 – 6:00 PM', emoji: '🍪', color: 'text-hunger-yellow' },
  { label: 'Dinner', time: '8:00 – 10:00 PM', emoji: '🍛', color: 'text-hunger-green' },
]

export const CONTACT = {
  address: [
    'Mess Office, Mess Block',
    'IIT Bhilai Campus, Kutelabhata,',
    'Bhilai, Chhattisgarh 491002',
  ],
  email: 'messcoordinator@iitbhilai.ac.in',
  caterers: [
    { name: 'Galav Mess', email: null },
    { name: 'Shreesai Mess', email: null },
  ],
}

// Google OAuth — create credentials at https://console.cloud.google.com/apis/credentials
// (OAuth 2.0 Client ID, Web application) and paste the Client ID here.
export const GOOGLE_CLIENT_ID = '233144735739-1or3fmoqnn6rkhf4t2s52k62m4evnc63.apps.googleusercontent.com'

// Only emails ending with this domain may use the complaints desk.
export const ALLOWED_EMAIL_DOMAIN = 'iitbhilai.ac.in'

export const COMPLAINTS = {
  description:
    'Spot a problem or complain at the mess? Sign in with your Institute Google account and you will be redirected to the official feedback form. Every submission goes directly to the mess committee for review.',
  url: 'https://forms.gle/F9sVJp31PGQrodE48',
}