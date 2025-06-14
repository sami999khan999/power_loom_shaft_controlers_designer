import { DataTablePropsType } from "@/types/props";
import { cn } from "@/utils/cn";
import Link from "next/link";

const DataTable = <T,>({
  data,
  columns,
  className,
  emptyMessage = "No Data Found",
}: DataTablePropsType<T>) => {
  return (
    <div className="overflow-x-auto">
      <div
        className={cn(
          "md:w-full w-[45rem] bg-on-surface rounded-radius-lg border border-muted",
          className
        )}
      >
        <div className="flex justify-between capitalize tracking-wide py-4 rounded-t-radius-sm px-4 text-basec font-semibold border-b border-muted">
          {columns.map((item, i) => {
            return (
              <p
                key={item.header}
                className={cn(
                  "line-clamp-1 border-r border-muted px-2 lg:px-4",
                  {
                    "border-none": i === columns.length - 1,
                  },
                  item.className ? item.className : "flex-1"
                )}
              >
                {item.header}
              </p>
            );
          })}
        </div>
        <div className="lg:text-base text-sm text-strong h-[20rem] overflow-y-auto px-4">
          {data.length === 0 ? (
            <div className="text-center py-4 text-strong">{emptyMessage}</div>
          ) : (
            <>
              {data.map((item, i) => {
                return (
                  <Link
                    href={"/"}
                    key={i}
                    className={cn(
                      "flex justify-between border-b border-secondary py-2 hover:bg-secondary duration-50 cursor-pointer",
                      {
                        "border-none": i === data.length - 1,
                      },
                      i % 2 !== 0 ? "bg-surface" : "bg-on-surface"
                    )}
                  >
                    {columns.map((column, colIndex) => {
                      const cellContent = column.render
                        ? column.render(item)
                        : (item[column.key] as React.ReactNode);

                      return (
                        <p
                          key={column.key as string}
                          className={cn(
                            "line-clamp-1 px-2 lg:px-4",
                            {
                              "border-none": colIndex === columns.length - 1,
                            },
                            column.className ? column.className : "flex-1"
                          )}
                        >
                          {cellContent}
                        </p>
                      );
                    })}
                  </Link>
                );
              })}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DataTable;
