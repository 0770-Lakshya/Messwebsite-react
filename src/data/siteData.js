export const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

export const SECTIONS = ['BREAKFAST', 'LUNCH', 'Tea Time', 'DINNER']

export const LEADERSHIP = [
  
  {
    name: 'Dr Shudhanwa Patra ',
    role: 'Dean of Student Affairs, IIT Bhilai',
    // quote: 'Your well-being at the mess is my priority.',
    photo: 'images/dosa.webp',
  },
  {
    name: 'Dr Yagnesh Shadangi',
    role: 'Faculty In-Charge (FIC), Mess',
    // quote: 'Good food, great conversations, better days.',
    photo: 'images/fic.webp',
  },
  
  {
    name: 'Dr Milan Kumar Jena ',
    role: 'Associate FIC Mess, IIT Bhilai',
    // quote: 'We listen, we improve, we serve.',
    photo: 'images/milansir.webp',
  },{
    name: 'Arush Ranjan' ,
    role: 'President ,COSA IIT Bhilai',
    // quote: 'We listen, we improve, we serve.',
    photo: "images/arush.jpg",
  },
  {
    name: 'Manish Kumar' ,
    role: 'Mess Coordinator, IIT Bhilai',
    // quote: 'We listen, we improve, we serve.',
    photo: "images/coordinator.webp",
  },
  
]

export const COMMITTEE = [
  {
    name: 'Manish Kumar ',
    role: 'Mess Coordinator',
    email: 'messcoordinator@iitbhilai.ac.in',
    photo: "images/coordinator.webp",
  },
  {
    name: 'Sudhanshu Mishra',
    role: 'Member',
    email: "",
    photo: "images/sudhanshu.webp",
  },
  {
    name: 'Abhishek Kumar',
    role: 'Member',
    email: null,
    photo: "images/abhishekkumar.png",
  },
  {
    name: 'Lakshya Soni',
    role: 'Technical Member',
    photo: "images/Lakshya.webp",
  },
  {
    name: 'Krish Shiyani',
    role: 'Technical Member',
    photo: "images/krish.webp",
  },
  {
    name: 'Dheeraj Preetham Reddy',
    role: 'Member',
    photo: "images/dheeraj.webp",
  },
  {
    name: 'Abhishek Singh',
    role: 'Member',
    photo: "images/abhishekk.webp",
  },
  {
    name: 'Arpit Pandey',
    role: 'Member',
    photo: "images/arpit.webp",
  },
  {
    name: 'Pushkar Surendra Chaudhari',
    role: 'Member',
    photo: "images/pushkar.webp",
  },
  {
    name: 'Venna Yaswanth',
    role: 'Member',
    photo: "images/yaswanth.webp",
  },
  {
    name: 'Kavita Negi',
    role: 'Member',
    photo: "images/kavita.jpg",
  },
  {
    name: 'Bikka Akshara Venus',
    role: 'Member',
    photo: "images/akshara.webp",
  },
  {
    name: 'Shubham Kumar',
    role: 'Member',
    photo: "images/shubham.webp",
  },
  {
    name: 'Sadhana Gupta',
    role: 'Member',
    photo: "images/sadhana.webp",
  },
  {
    name: 'Sanjay Kumar Verma',
    role: 'Member',
    photo: "images/sanjay.webp",
  },
  {
    name: 'Akash Netam',
    role: 'Member',
    photo: "images/akash.webp",
  },
]

export const LEADERSHIP_IN_CHARGE = [
  {
    role: 'Dean of Student Affairs, IIT Bhilai',
    email: null,
    photo: 'images/dosa.webp',
    name: 'Dr Shudhanwa Patra',
  },
  {
    role: 'Faculty In-Charge (FIC), Mess',
    email: null,
    photo: 'images/fic.webp',
    name: 'Dr Yagnesh Shadangi',
  },
  {
    role: 'Associate FIC Mess, IIT Bhilai',
    email: null,
    photo: 'images/milansir.webp',
    name: 'Dr Milan Kumar Jena',
  },
]

export const MESS_INCHARGE = [
  {
    role: 'Mess Incharge',
    email: null,
    photo: 'images/incharge.webp',
    name: 'Mr Mahesh Koli',
  },
  {
    role: 'Mess Incharge',
    email: null,
    photo: 'images/yaswanthsir.webp',
    name: 'Mr Yashavant Kumar',
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
    { name: 'Krishna Kripa ', email: null },
    { name: 'Amul Parlour', email: null },

  ],
  // Canteens: [
  //   { name: 'NJC(Not Just Coffee)', email: null },
  //   { name: 'Tech Cafe', email: null },


  // ]

}

// Google OAuth — create credentials at https://console.cloud.google.com/apis/credentials
// (OAuth 2.0 Client ID, Web application) and paste the Client ID here.
export const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID

// Only emails ending with this domain may use the complaints desk.
export const ALLOWED_EMAIL_DOMAIN = 'iitbhilai.ac.in'

export const COMPLAINTS = {
  description:
    'Spot a problem or complain at the mess? Sign in with your Institute Google account and you will be redirected to the official feedback form. Every submission goes directly to the mess committee for review.',
  url: 'https://forms.gle/F9sVJp31PGQrodE48',
}
// Public link to the tentative (upcoming / draft) menu — a Google Sheet, Doc or
// Drive PDF shared as "Anyone with the link can view". Shown on the Complaints
// page to everyone, no sign-in needed. Leave url empty to hide the card.
export const TENTATIVE_MENU = {
  label: 'Tentative Menu',
  note: 'The menu drafted so far. Items may still change subject to availability and feedback.',
  url: 'https://docs.google.com/spreadsheets/d/1nPuDQTXZiuliWVCLe1juPNxjSv8QYiBHSiXNgm5DHdQ/edit?usp=sharing',
}

// The poll currently running. One vote per person is enforced by Google Forms
// itself, not by this site (a static site cannot remember who voted). In the
// form's Settings -> Responses, turn on BOTH:
//   - "Restrict to users in IIT Bhilai and its trusted organizations"
//   - "Limit to 1 response"
// To start a new poll, make a new form and replace formUrl. Leave it empty
// when no poll is running.
export const POLL = {
  title: '',
  description: '',
  // Use the full link from the form's Send -> link tab with "Shorten URL" OFF
  // (https://docs.google.com/forms/d/e/.../viewform). A forms.gle short link
  // still works, but only as a button - it cannot be embedded in the page.
  formUrl: 'https://forms.gle/fTzpDj7tjeZG9WrC8',
  // Optional public results sheet that holds ONLY vote counts (never the raw
  // responses, which contain voters' emails). Column A = option, column B =
  // votes. Leave empty to hide results. Setup steps are in usePollResults.js.
  resultsSheetUrl: 'https://docs.google.com/spreadsheets/d/1vCsB7OBYhPKOlkSpqftWc6emeImepekxkl1hBBCUIxQ/edit?usp=sharing',
}

// A sample poll for previewing the poll section on your own computer. It only
// appears under `npm run dev` while POLL.formUrl is empty, and is never part of
// the live site. Votes are kept in memory and reset on reload. Set options to
// [] to turn the preview off.
export const DEMO_POLL = {
  title: 'Sunday Special (sample poll)',
  description: 'Which dish should be the Sunday special next cycle?',
  options: [
    // { option: 'Paneer Butter Masala', votes: 42 },
    // { option: 'Chole Bhature', votes: 35 },
    // { option: 'Veg Biryani', votes: 28 },
    // { option: 'Masala Dosa', votes: 17 },
  ],
}
