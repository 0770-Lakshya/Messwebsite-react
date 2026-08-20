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