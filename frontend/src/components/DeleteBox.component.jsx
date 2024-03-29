// your-dialog.jsx
import React from "react";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { DialogClose, DialogOverlay, DialogPortal } from "./ui/dialog";
import { X } from "lucide-react";
// import { Cross1Icon } from "@radix-ui/react-icons";

DialogContent.displayName = DialogPrimitive.Content.displayName;

export { DialogContent };

// export function DeleteBox(id) {
//   const handleDelete = () => {
//     console.log("I will delete this product id:", id);
//   };
//   return (
// <Dialog>
//   <DialogTrigger asChild>
//     <Button variant="outline">Delete Product</Button>
//   </DialogTrigger>
//   <DialogContent className="sm:max-w-[425px]">
//     <DialogHeader>
//       <DialogTitle>Delete</DialogTitle>
//       <DialogDescription>
//         Are you sure you want to delete this product ?
//       </DialogDescription>
//     </DialogHeader>

//     <DialogFooter>
//       <Button type="submit" variant="destructive" onClick={handleDelete}>
//         Delete
//       </Button>
//     </DialogFooter>
//   </DialogContent>
// </Dialog>
//   );
// }
