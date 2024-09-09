import { UserManageFilter } from "./UserManageFilter";
import { UserManageTable } from "./UserManageTable";

type Props = {};

const UserManagePageComponent = () => {
  return (
    <>
      <UserManageFilter />
      <UserManageTable />
    </>
  );
};
export default UserManagePageComponent;
