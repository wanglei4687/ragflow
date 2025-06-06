import { RowSelectionState } from '@tanstack/react-table';
import { isEmpty } from 'lodash';
import { useMemo, useState } from 'react';

export function useRowSelection() {
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  return {
    rowSelection,
    setRowSelection,
    rowSelectionIsEmpty: isEmpty(rowSelection),
  };
}

export type UseRowSelectionType = ReturnType<typeof useRowSelection>;

export function useSelectedIds<T extends Array<{ id: string }>>(
  rowSelection: RowSelectionState,
  list: T,
) {
  const selectedIds = useMemo(() => {
    const indexes = Object.keys(rowSelection);
    return list
      .filter((x, idx) => indexes.some((y) => Number(y) === idx))
      .map((x) => x.id);
  }, [list, rowSelection]);

  return { selectedIds };
}
