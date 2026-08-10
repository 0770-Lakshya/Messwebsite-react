export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const SECTIONS = ['BREAKFAST', 'LUNCH', 'Tea Time', 'DINNER']

export const LEADERSHIP = [
  {
    name: 'Director, IIT Bhilai',
    role: 'Dr Rajiv Prakash',
    quote: '',
    photo: 'images/director.jpg',
  },
  {
    name: 'Dean of Student Affairs, IIT Bhilai',
    role: 'Dr Shudhanwa Patra',
    quote: '',
    photo: 'images/dosa.jpg',
  },
  {
    name: 'Faculty In-Charge (FIC), Mess',
    role: 'Dr Yagnesh Shadangi',
    quote: '',
    photo: 'images/fic.jpg',
  },
  {
    name: 'Mess Coordinator, IIT Bhilai',
    role: 'Manish Kumar',
    quote: '',
    photo: null,
  },
]

export const COMMITTEE = [
  {
    name: 'Mess Coordinator',
    role: 'Manish Kumar Yadav',
    email: 'messcoordinator@iitbhilai.ac.in',
    photo: null,
  },
  {
    name: 'Member',
    role: 'Abhishek Kumar',
    email: 'abhishekkumar@iitbhilai.ac.in',
    photo: null,
  },
  {
    name: 'Lakshya soni',
    role: 'Website Incharge',
    // email: 'ficmess@iitbhilai.ac.in',
    photo: null,
  },
]

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
    title: 'Special Independence Day Dinner — 15 Aug',
    message: 'Join us for a festive dinner with special dishes across all counters. Timings: 8:00–10:00 PM.',
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
    { name: 'Galav Caterers', email: 'galav@iitbhilai.ac.in' },
    { name: 'Shreesai Caterers', email: 'shreesai@iitbhilai.ac.in' },
  ],
}

// Google OAuth — create credentials at https://console.cloud.google.com/apis/credentials
// (OAuth 2.0 Client ID, Web application) and paste the Client ID here.
export const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID.apps.googleusercontent.com'

export const COMPLAINTS = {
  description:
    'Spot a problem at the mess? Sign in with your Institute Google account, then scan the QR code at the mess entrance to file a complaint. The mess committee reviews every submission.',
   // TODO: replace with your real Google Form link
}