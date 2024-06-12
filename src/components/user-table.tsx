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

export default function UserTable() {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Users</CardTitle>
        <CardDescription>List of Porum users.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Username</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead className="hidden sm:table-cell">First Name</TableHead>
              <TableHead className="hidden sm:table-cell">Last Name</TableHead>
              <TableHead className="hidden sm:table-cell">Phone #</TableHead>
              <TableHead className="hidden sm:table-cell">Password</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow className="bg-accent">
              <TableCell>
                <div className="font-medium">TestUser</div>
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                Tester@Test.com
              </TableCell>
              <TableCell className="hidden sm:table-cell">First Test</TableCell>
              <TableCell className="hidden sm:table-cell">Last Test</TableCell>
              <TableCell className="hidden sm:table-cell">
                +63 917 356 2345
              </TableCell>
              <TableCell className="hidden sm:table-cell">
                4WhDg82AljbiO12938W
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
