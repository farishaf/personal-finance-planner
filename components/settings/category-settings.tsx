import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useCategory from "@/zustand/use-category";
import { useEffect } from "react";
import {
  Utensils, // for "utensils"
  Car, // for "car"
  ShoppingBag, // for "shopping-bag"
  FileText, // for "file-invoice" (Lucide doesn't have "file-invoice", FileText is closest)
  Film, // for "film"
  InfoIcon, // for "self transfer" (since it's a transfer, a refresh icon fits)
  CircleHelp, // Fallback for empty icons
  LucideIcon,
} from "lucide-react";
import { AddCategoryDialog } from "./add-category-dialog";

const iconMap: Record<string, LucideIcon> = {
  utensils: Utensils,
  car: Car,
  "shopping-bag": ShoppingBag,
  "file-invoice": FileText,
  film: Film,
  "": InfoIcon, // Fallback for empty strings
};

const CategorySettings = () => {
  const {
    categoryList,
    loadingCategory,
    getCategory
  } = useCategory();

  useEffect(() => {
    getCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center">
          <div>
            <CardTitle>Category Settings</CardTitle>
            <CardDescription>
              Add or edit your cashflow category
            </CardDescription>
          </div>
          <AddCategoryDialog />
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Id</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Icon</TableHead>
              <TableHead className="w-[40px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categoryList && categoryList.length > 0 && !loadingCategory ? (
              categoryList.map((category) => {
                const IconComponent = iconMap[category.icon] || CircleHelp;
                return (
                  <TableRow key={category.id}>
                    <TableCell>{category.id}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      <IconComponent className="h-4 w-4" />
                    </TableCell>
                    <TableCell>{/* Actions dropdown */}</TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="h-24 text-center">
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default CategorySettings;
