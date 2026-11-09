import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import Button from "./Button";

interface PaginationProps {
  currentPage: number;
  limit: number;
  totalCount: number;
  entityName: string;
  onPrevClick: () => void;
  onNextClick: () => void;
}

function Pagination({
  currentPage,
  limit,
  totalCount,
  entityName,
  onPrevClick,
  onNextClick,
}: PaginationProps) {
  const minPage = 1;
  const maxPage = Math.ceil(totalCount / limit);
  return (
    <div className="flex justify-between mt-4 px-1">
      <p className="text-[#2E3445] text-sm">
        Showing {Math.min(currentPage - 1) * limit + 1} to{" "}
        {totalCount < limit ? totalCount : (currentPage - 1) * limit + 1} of{" "}
        {totalCount} {entityName}
      </p>
      <div className="flex gap-2 items-center">
        <Button
          size="sm"
          className="aspect-square"
          onClick={onPrevClick}
          disabled={currentPage === minPage}
        >
          <FaChevronLeft size={12} />
        </Button>
        <Button
          size="sm"
          className="aspect-square"
          onClick={onNextClick}
          disabled={currentPage === maxPage}
        >
          <FaChevronRight size={12} />
        </Button>
      </div>
    </div>
  );
}

export default Pagination;
