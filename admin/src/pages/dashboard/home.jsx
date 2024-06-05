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

export function Home() {
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
        {/* <Card>
          <CardHeader variant="gradient" color="gray" className="mb-8 p-6">
            <Typography variant="h6" color="white">
              Orders Table
            </Typography>
          </CardHeader>
          <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
            <table className="w-full min-w-[640px] table-auto">
              <thead>
                <tr>
                  {["Name", "Order", "Status", "Process", ""].map((el) => (
                    <th
                      key={el}
                      className="border-b border-blue-gray-50 py-3 px-5 text-left"
                    >
                      <Typography
                        variant="small"
                        className="text-[11px] font-bold uppercase text-blue-gray-400"
                      >
                        {el}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {orderData.map((item, key) => {
                  const { name, email, job, online, date, img } = item;
                  const jobTitle = job && job[0] ? job[0] : "N/A"; // Default value if job[0] is undefined
                  const jobRole = job && job[1] ? job[1] : "N/A"; // Default value if job[1] is undefined
                  const orderStatus = item.order_status == 0 ? "Pending" : "Approve";
                  const className = `py-3 px-5 ${
                    key === orderData.length - 1 ? "" : "border-b border-blue-gray-50"
                  }`;

                  return (
                    <tr key={key}>
                      <td className={className}>
                        <div className="flex items-center gap-4">
                          <Avatar src={'/img/icon.jpg'} alt={item.userDetail.name} size="sm" variant="rounded" />
                          <div>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-semibold"
                            >
                              {item.userDetail.name}
                            </Typography>
                            <Typography className="text-xs font-normal text-blue-gray-500">
                              {item.userDetail.email}
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={className}>
                        <Typography className="text-xs font-semibold text-blue-gray-600">
                          {item.itemDetail.name}
                        </Typography>
                        <Typography className="text-xs font-normal text-blue-gray-500">
                          ₱ {item.itemDetail.price}
                        </Typography>
                      </td>
                      <td className={className}>
                        <Chip
                          variant="gradient"
                          color={item.order_status == 1 ? "green" : "blue-gray"}
                          value={orderStatus}
                          className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        />
                      </td>
                      <td className={className}>
                        <div className="flex space-x-5">
                          <ShoppingBagIcon color={item.status >= 0 ? 'green' : ''} className=' h-5 w-5 cursor-pointer' onClick={() => handleStatus(setOrderData, item._id, 0, setOpen)}/>
                          <ClipboardDocumentCheckIcon color={item.status >= 1 ? 'green' : ''} className=' h-5 w-5 cursor-pointer' onClick={() => handleStatus(setOrderData, item._id, 1, setOpen)}/>
                          <TruckIcon color={item.status >= 2 ? 'green' : ''} className=' h-5 w-5 cursor-pointer' onClick={() => handleStatus(setOrderData, item._id, 2, setOpen)}/>
                          <MapPinIcon color={item.status == 3 ? 'green' : ''} className=' h-5 w-5 cursor-pointer' onClick={() => handleStatus(setOrderData, item._id, 3, setOpen)}/>
                        </div>
                      </td>
                      <td className={className}>
                        <Button 
                        color={item.order_status == 0 ? "yellow" : "blue-gray"} 
                        className="py-0.5 px-2 text-[11px] font-medium w-fit"
                        onClick={() => handleApprove(setOrderData, item._id, setOpen)}
                        >Approve</Button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CardBody>
        </Card> */}
      </div>
    </div>
  );
}

export default Home;
