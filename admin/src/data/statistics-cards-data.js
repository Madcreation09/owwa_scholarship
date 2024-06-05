import {
  UsersIcon,
  Square3Stack3DIcon,
  ArrowPathRoundedSquareIcon,
  TableCellsIcon,
} from "@heroicons/react/24/solid";

const handleFetchUser = async () => {
  const response = await fetch('http://localhost:4000/user', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data.length; // Return the length of the fetched data
};

const handleFetchItem = async () => {
  const response = await fetch('http://localhost:4000/item', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data.length; // Return the length of the fetched data
};

const handleFetchOrder = async () => {
  const response = await fetch('http://localhost:4000/order', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  return data.length; // Return the length of the fetched data
};

const handleFetchPendingOrder = async () => {
  let filtered = []
  const response = await fetch('http://localhost:4000/order', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  const data = await response.json();
  data.map((item) => {
    if (item.order_status == 0) {
      filtered.push(item)
    }
  })
  return filtered.length; // Return the length of the fetched data
};

export const getStatisticsCardsData = async () => {
  const usersCount = await handleFetchUser();
  const itemCount = await handleFetchItem();
  const itemOrder = await handleFetchOrder();
  const PendingOrder = await handleFetchPendingOrder();

  return [
    {
      color: "gray",
      icon: UsersIcon,
      title: "Users",
      value: usersCount.toString(),
      footer: {
        color: "text-green-500",
        value: "Connected",
        label: "MongoDB Atlas",
      },
    },
    {
      color: "gray",
      icon: Square3Stack3DIcon,
      title: "Scholars",
      value: itemCount.toString(),
      footer: {
        color: "text-green-500",
        value: "Connected",
        label: "MongoDB Atlas",
      },
    },
    {
      color: "gray",
      icon: ArrowPathRoundedSquareIcon,
      title: "Request",
      value: PendingOrder,
      footer: {
        color: "text-green-500",
        value: "Connected",
        label: "MongoDB Atlas",
      },
    },
    {
      color: "gray",
      icon: TableCellsIcon,
      title: "Disburstment",
      value: itemOrder,
      footer: {
        color: "text-green-500",
        value: "Connected",
        label: "MongoDB Atlas",
      },
    },
  ];
};

export default getStatisticsCardsData;
