import {
     Card,
     CardHeader,
     CardBody,
     Typography,
     Avatar,
     Chip,
     Tooltip,
     Progress,
     Button
   } from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { scholarsTableData } from "@/data";
   
   export function Scholars() {
     return (
       <div className="mt-12 mb-8 flex flex-col gap-12">
        <a href="">
         <Button style={{width:'15%'}}>
            Add Scholar
          </Button>
        </a>
         <Card>
           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
             <table className="w-full min-w-[640px] table-auto">
               <thead>
                 <tr>
                   {["name", "year level", "mobile number", "email", "status", ""].map((el) => (
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
                 {scholarsTableData.map(
                   ({ img, name, email, year_level, mobile, status }, key) => {
                     const className = `py-3 px-5 ${
                       key === scholarsTableData.length - 1
                         ? ""
                         : "border-b border-blue-gray-50"
                     }`;
   
                     return (
                       <tr key={name}>
                         <td className={className}>
                           <div className="flex items-center gap-4">
                             <Avatar src={img} alt={name} size="sm" variant="rounded" />
                             <div>
                               <Typography
                                 variant="small"
                                 color="blue-gray"
                                 className="font-semibold"
                               >
                                 {name}
                               </Typography>
                             </div>
                           </div>
                         </td>
                         <td className={className}>
                         <Typography className="text-xs font-semibold text-blue-gray-600">
                             {year_level}
                           </Typography>
                         </td>
                         <td className={className}>
                           <Typography className="text-xs font-semibold text-blue-gray-600">
                             {mobile}
                           </Typography>
                         </td>
                         <td className={className}>
                           <Typography className="text-xs font-semibold text-blue-gray-600">
                             {email}
                           </Typography>
                         </td>
                         <td className={className}>
                           <Typography className="text-xs font-semibold text-blue-gray-600">
                             {status}
                           </Typography>
                         </td>
                         <td>
                           <Typography
                           as="a"
                           href="#"
                           className="text-xs text-red font-semibold text-blue-gray-600"
                           >
                           Delete
                           </Typography>
                         </td>
                       </tr>
                     );
                   }
                 )}
               </tbody>
             </table>
           </CardBody>
         </Card>
       </div>
     );
   }
   
   export default Scholars;
   