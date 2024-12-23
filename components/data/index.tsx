import { TbLayoutDashboardFilled } from "react-icons/tb";
import { MdOutlinePersonPin } from "react-icons/md";
import { FaAnglesLeft, FaCodeBranch } from "react-icons/fa6";
import { MdPayments } from "react-icons/md";
import { IoGitBranchOutline } from "react-icons/io5";
import { LuScrollText } from "react-icons/lu";
import { FaRegImages } from "react-icons/fa6";
import { LiaMoneyBillWaveSolid } from "react-icons/lia";
import { IoPricetagsOutline } from "react-icons/io5";
import { IoMdCheckmarkCircleOutline } from "react-icons/io";
import { RiQuestionMark, RiTeamLine } from "react-icons/ri";
import { GrLineChart } from "react-icons/gr";
import { FaInfoCircle, FaTeamspeak } from "react-icons/fa";
import { TbLayoutListFilled } from "react-icons/tb";
export const SideBarInfoArr = [
  {
    title: "Dashboard",
    icon: <TbLayoutDashboardFilled />,
    items: [{ title: "Analytics", link: "/branch/dashboard/analytics" }],
  },
  {
    title: "Students",
    icon: <MdOutlinePersonPin />,
    items: [
      { title: "Add Student", link: "/branch/new-student" },
      { title: "Paid Students", link: "/branch/all-students" },
      { title: "Unpaid Students", link: "/branch/unpaid-students" },
      // { title: "Results", link: "/branch/student-results" },
    ],
  },
  {
    title: "Branch Info",
    icon: <FaCodeBranch />,
    items: [
      { title: "Branch Profile", link: "/branch/my-branch/profile" },
      // { title: "Billing Aggrement", link: "/branch/my-branch/aggrement" },
    ],
  },
  {
    title: "Billings",
    icon: <MdPayments />,
    items: [
      { title: "Payment History", link: "/branch/billings/payment-history" },
    ],
  },
  {
    title: "Info",
    icon: <FaInfoCircle />,
    items: [{ title: "Notices", link: "/branch/info/notices" }],
  },
];

export const managementInfo = {
  salaryLink: "/branch/salary-management",
  employeeLink: "/branch/employee-management",
  subAdminLink: "/branch/create-sub-admin",
};
export const AdminLinks = [
  {
    title: "Dashboard",
    icon: <TbLayoutDashboardFilled />,
    link: "/admin/analytics",
  },
  { title: "Branches", icon: <IoGitBranchOutline />, link: "/admin/branches" },
  { title: "Notices", icon: <LuScrollText />, link: "/admin/notices" },
  { title: "Gallery Images", icon: <FaRegImages />, link: "/admin/gallery" },
  {
    title: "Verified Branches",
    icon: <IoMdCheckmarkCircleOutline />,
    link: "/admin/varified-branches",
  },
  {
    title: "Unverfied Branches",
    icon: <RiQuestionMark />,
    link: "/admin/not-varified-branches",
  },

  {
    title: "Course Fees",
    icon: <LiaMoneyBillWaveSolid />,
    link: "/admin/course-fees",
  },
  {
    title: "Branch Payment",
    icon: <IoPricetagsOutline />,
    link: "/admin/branch-payment",
  },
  { title: "Revenue", icon: <GrLineChart />, link: "/admin/revenue" },
  {
    title: "Edit Banner",
    icon: <TbLayoutListFilled />,
    link: "/admin/edit-banner",
  },
  {
    title: "Update Team",
    icon: <RiTeamLine />,
    link: "/admin/edit-team",
  },
];

export const AllCourses = [
  {
    code: "01CA",
    name: "Computer Office Application",
    url: "https://img-c.udemycdn.com/course/750x422/5266096_3048_3.jpg",
  },
  {
    code: "27DP",
    name: "Database Programming",
    url: "https://img.freepik.com/free-vector/hand-drawn-flat-design-homepage-illustration_23-2149258059.jpg?size=626&ext=jpg&ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "30CS",
    name: "Diploma in Computer Science",
    url: "https://img.freepik.com/free-vector/online-certification-illustration-concept_23-2148573202.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "39ICT",
    name: "Diploma in ICT",
    url: "https://img.freepik.com/free-vector/online-certification-concept_23-2148562935.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "22MS",
    name: "Diploma in Multilingual Secretarial Science",
    url: "https://img.freepik.com/free-vector/online-certification-concept_23-2148575653.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "07GD",
    name: "Graphics Design",
    url: "https://img.freepik.com/free-vector/graphic-design-elements-collection_23-2147796019.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "32HD",
    name: "Higher Diploma in Computer Science",
    url: "https://img.freepik.com/free-photo/programming-background-with-person-working-with-codes-computer_23-2150010140.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "08WD",
    name: "Web Design & Development",
    url: "https://img.freepik.com/free-vector/app-development-concept-with-laptop_23-2148699364.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "21WP",
    name: "WordPress",
    url: "https://images.unsplash.com/photo-1453928582365-b6ad33cbcf64?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Y29tcHV0ZXIlMjBzaWNlbnR8ZW58MHx8MHx8fDA%3D",
  },
  {
    code: "17EE",
    name: "Diploma in Electric & Electronic Technology",
    url: "https://img.freepik.com/free-photo/medium-shot-man-wearing-vr-glasses_23-2149126949.jpg?ga=GA1.1.517858620.1695271177&semt=sph",
  },
  {
    code: "04DH",
    name: "Diploma in Hardware",
    url: "https://img.freepik.com/free-vector/wireless-technology-isometric-composition-poster_1284-15266.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "15SE",
    name: "Spoken English",
    url: "https://img.freepik.com/free-vector/hand-drawn-international-mother-language-day-landing-page-template_23-2149249059.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "26MT",
    name: "Dress Making & Tailoring",
    url: "https://img.freepik.com/free-vector/beautiful-blue-dress-sustainable-fashion-concept_23-2148823123.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "31HW",
    name: "Diploma in Electric & House Wiring",
    url: "https://img.freepik.com/free-vector/marketing-campaign_23-2148034302.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
  {
    code: "03DM",
    name: "Digital Marketing",
    url: "https://img.freepik.com/free-photo/digital-marketing-with-icons-business-people_53876-94833.jpg?ga=GA1.1.517858620.1695271177&semt=ais_user",
  },
];

export const contact_bg_Img =
  "https://img.freepik.com/free-photo/person-working-html-computer_23-2150038860.jpg?size=626&ext=jpg&ga=GA1.1.517858620.1695271177&semt=sph";
