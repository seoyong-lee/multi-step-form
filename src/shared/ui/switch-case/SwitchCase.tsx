import React from 'react';

interface Props<Case extends string | number> {
  caseBy: Partial<Record<Case, React.ReactElement | null>>;
  value: Case;
  defaultComponent?: React.ReactElement | null;
}

export function SwitchCase<Case extends string | number>({
  value,
  caseBy,
  defaultComponent = null,
}: Props<Case>) {
  if (value == null) {
    return defaultComponent;
  }

  return caseBy[value] ?? defaultComponent;
}
