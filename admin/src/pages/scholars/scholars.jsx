import React, { useEffect, useState } from "react";
import { StatisticsCard } from "@/widgets/cards";
import getStatisticsCardsData from "@/data/statistics-cards-data";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Avatar,
  Chip,
  Button,
  Alert,
} from "@material-tailwind/react";
import { ClipboardDocumentCheckIcon, MapPinIcon, ShoppingBagIcon, TruckIcon } from "@heroicons/react/24/solid";

const handleFetchOrder = async (setOrderData) => {
  try {
    const response = await fetch('http://localhost:4000/order', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setOrderData(data);
  } catch (error) {
    console.error("Error fetching order data:", error);
  }
};

const handleApprove = async (setOrderData, id, setOpen) => {
  setOpen(false)
  try {
    const response = await fetch(`http://localhost:4000/order/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          order_status: 1
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setOpen(true)
    handleFetchOrder(setOrderData);
  } catch (error) {
    console.error("Error fetching order data:", error);
  }
}

const handleStatus = async (setOrderData, id, status , setOpen) => {
  setOpen(false)
  try {
    const response = await fetch(`http://localhost:4000/order/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
          status: status
      })
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    setOpen(true)
    handleFetchOrder(setOrderData);
  } catch (error) {
    console.error("Error fetching order data:", error);
  }
}

export function Scholar() {
  const [open, setOpen] = useState(false);
  const [orderData, setOrderData] = useState([]);
  const [statisticsCardsData, setStatisticsCardsData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const statisticsData = await getStatisticsCardsData();
      setStatisticsCardsData(statisticsData);
      await handleFetchOrder(setOrderData);
    };

    fetchData();
  }, []);

  useEffect(() => {
    console.log(orderData); // Logging orderData to check if it is being set correctly
  }, [orderData]);

  return (
    <div className="mt-12">
      <div className="mb-12 grid gap-y-10 gap-x-6 md:grid-cols-2 xl:grid-cols-4">
        {statisticsCardsData.map(({ icon, title, footer, ...rest }) => (
          <StatisticsCard
            key={title}
            {...rest}
            title={title}
            icon={React.createElement(icon, {
              className: "w-6 h-6 text-white",
            })}
            footer={
              <Typography className="font-normal text-blue-gray-600">
                <strong className={footer.color}>{footer.value}</strong>
                &nbsp;{footer.label}
              </Typography>
            }
          />
        ))}
      </div>
      
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <Alert color="green" open={open} onClose={() => setOpen(false)}>Successfully Updated</Alert>
       
      </div>
    </div>
  );
}

export default Scholar;
