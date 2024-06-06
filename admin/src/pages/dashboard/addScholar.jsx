import {
     Card,
     CardHeader,
     CardBody,
     Typography,
     Avatar,
     Chip,
     Tooltip,
     Progress,
     Button,
     Input
   } from "@material-tailwind/react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";
import { scholarsTableData } from "@/data";
   
   export function Scholars() {
     return (
       <div className="mt-12 mb-8 flex flex-col gap-12">
        <a href="addScholar.jsx">
         <Button style={{width:'15%'}}>
            Add Scholar
          </Button>
        </a>
         <Card>
           <CardBody className="overflow-x-scroll px-0 pt-0 pb-2">
             <form action="">
               <Typography>
                    Name
               </Typography>
               <Input 
               
               />
             </form>
           </CardBody>
         </Card>
       </div>
     );
   }
   
   export default Scholars;
   