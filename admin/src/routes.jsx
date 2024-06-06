import {
  HomeIcon,
  AcademicCapIcon,
  PresentationChartLineIcon,
  DocumentCheckIcon,
  FolderOpenIcon,
  WalletIcon,
  PhoneIcon,
  Cog8ToothIcon,
  UsersIcon,
  UserCircleIcon,
  TableCellsIcon,
  InformationCircleIcon,
  ServerStackIcon,
  RectangleStackIcon,
} from "@heroicons/react/24/solid";
import { Home, Profile, Tables, Notifications, Scholars, Disbursement } from "@/pages/dashboard";
import { SignIn, SignUp } from "@/pages/auth";

const icon = {
  className: "w-5 h-5 text-inherit",
};

export const routes = [
  {
    layout: "dashboard",
    pages: [
      {
        icon: <HomeIcon {...icon} />,
        name: "dashboard",
        path: "/home",
        element: <Home />,
      },
    ],
  },
  {
    layout: "dashboard",
    pages: [
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "scholars",
        path: "/scholar",
        element: <Scholars />,
      },
    ],
  },
  {
    layout: "Activity",
    pages: [
      {
        icon: <DocumentCheckIcon {...icon} />,
        name: "activities",
        path: "/acivity",
        element: <Scholars />,
      },
    ],
  },
  {
    layout: "Activity",
    pages: [
      {
        icon: <FolderOpenIcon {...icon} />,
        name: "requirements",
        path: "/acivity",
        element: <Scholars />,
      },
    ],
  },
  {
    layout: "dashboard",
    pages: [
      {
        icon: <WalletIcon {...icon} />,
        name: "disbursement",
        path: "/disbursement",
        element: <Disbursement />,
      },
    ],
  },
  {
    layout: "Activity",
    pages: [
      {
        icon: <PhoneIcon {...icon} />,
        name: "contact",
        path: "/acivity",
        element: <Scholars />,
      },
    ],
  },
  {
    layout: "Activity",
    pages: [
      {
        icon: <Cog8ToothIcon {...icon} />,
        name: "settings",
        path: "/acivity",
        element: <Scholars />,
      },
    ],
  },
  {
    layout: "Activity",
    pages: [
      {
        icon: <UsersIcon {...icon} />,
        name: "acccounts",
        path: "/acivity",
        element: <Scholars />,
      },
    ],
  },
  {
    layout: "auth",
    pages: [
      {
        icon: <ServerStackIcon {...icon} />,
        name: "sign in",
        path: "/sign-in",
        element: <SignIn />,
      },
      {
        icon: <RectangleStackIcon {...icon} />,
        name: "sign up",
        path: "/sign-up",
        element: <SignUp />,
      },
    ],
  },
];

export default routes;
