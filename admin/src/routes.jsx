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
import { Home, Profile, Tables, Notifications } from "@/pages/dashboard";
import { Scholar } from "@/pages/scholars"
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
    layout: "Scholar",
    pages: [
      {
        icon: <AcademicCapIcon {...icon} />,
        name: "scholars",
        path: "/scholar",
        element: <Scholar />,
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
        element: <Scholar />,
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
        element: <Scholar />,
      },
    ],
  },
  {
    layout: "Activity",
    pages: [
      {
        icon: <WalletIcon {...icon} />,
        name: "disbursement",
        path: "/acivity",
        element: <Scholar />,
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
        element: <Scholar />,
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
        element: <Scholar />,
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
        element: <Scholar />,
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
