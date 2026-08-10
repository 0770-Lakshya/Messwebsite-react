export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const SECTIONS = ['BREAKFAST', 'LUNCH', 'Tea Time', 'DINNER']

export const LEADERSHIP = [
  {
    name: 'Director, IIT Bhilai',
    role: 'Dr Rajiv Prakash',
    quote: 'A well-nourished campus is a thriving campus.',
    photo: 'images/director.jpg',
  },
  {
    name: 'Dean of Student Affairs, IIT Bhilai',
    role: 'Dr Shudhanwa Patra',
    quote: 'Your well-being at the mess is my priority.',
    photo: 'images/dosa.jpg',
  },
  {
    name: 'Faculty In-Charge (FIC), Mess',
    role: 'Dr Yagnesh Shadangi',
    quote: 'Good food, great conversations, better days.',
    photo: 'images/fic.jpg',
  },
  {
    name: 'Mess Coordinator, IIT Bhilai',
    role: 'Manish Kumar',
    quote: 'We listen, we improve, we serve.',
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
    name: 'Member',
    role: 'Feedback In-Charge — Complaints & Suggestions',
    email: 'ficmess@iitbhilai.ac.in',
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

export const ANNOUNCEMENTS = []

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

export const COMPLAINTS = {
  description:
    'Spot a problem at the mess? Scan the QR code at the mess entrance, or use the button below to file a complaint anonymously. The mess committee reviews every submission.',
  url: 'https://forms.gle/YOUR_FEEDBACK_FORM', // TODO: replace with your real Google Form link
  email: 'messcoordinator@iitbhilai.ac.in',
}