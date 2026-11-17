import type { ReactNode } from "react";
import { Checkbox } from "./checkbox.js";
import { Button } from "./button.js";
import { cn } from "../lib/utils.js";

/** Selection scope and actions are supplied by the consuming application. */
function SelectionBar({
  selectedCount,
  totalCount,
  onSelectAll,
  onClear,
  disabled = false,
  children,
  description,
  className,
}: {
  selectedCount: number;
  totalCount: number;
  onSelectAll: (selected: boolean) => void;
  onClear: () => void;
  disabled?: boolean;
  children?: ReactNode;
  description?: ReactNode;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label="列表选择与批量操作"
      className={cn("shrink-0 space-y-2 border-b px-3 py-2", className)}
    >
      <div className="flex min-h-8 flex-wrap items-center gap-2">
        <label className="flex min-h-8 cursor-pointer items-center gap-2 text-xs">
          <Checkbox
            aria-label={`全选当前列表 ${totalCount} 项`}
            checked={
              selectedCount === 0
                ? false
                : selectedCount === totalCount
                  ? true
                  : "indeterminate"
            }
            disabled={disabled || totalCount === 0}
            onCheckedChange={(value) => onSelectAll(value === true)}
          />
          <span aria-live="polite">
            {selectedCount ? `已选 ${selectedCount} 项` : "全选当前列表"}
          </span>
        </label>
        {selectedCount > 0 && (
          <Button
            size="sm"
            variant="ghost"
            className="ml-auto"
            disabled={disabled}
            onClick={onClear}
          >
            取消
          </Button>
        )}
      </div>
      {selectedCount > 0 && children && (
        <div className="flex flex-wrap items-center gap-2">{children}</div>
      )}
      {description && (
        <p className="text-xs text-muted-foreground">{description}</p>
      )}
    </div>
  );
}

export { SelectionBar };
