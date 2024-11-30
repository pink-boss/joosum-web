import Folder from "./folder";
import DropdownFilter from "./dropdown/filter";
import CreateButton from "./create/button";

export default function MyFolder() {
  return (
    <div className="flex w-full flex-1 flex-col gap-8 px-10">
      <div className="flex items-center justify-end gap-3">
        <DropdownFilter />
        <CreateButton />
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-8">
        {/* {new Array(30).fill(<Folder linkBook={{}} />)} */}
      </div>
    </div>
  );
}
