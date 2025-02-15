// tslint:disable react-unused-props-and-state
// remove the above line after this goes GA https://github.com/Microsoft/tslint-microsoft-contrib/pull/824
import {
  Breadcrumb as PFBreadcrumb,
  BreadcrumbItem,
  Level,
  LevelItem,
} from '@patternfly/react-core';
import * as React from 'react';
import { AppBreadcrumb } from './AppBreadcrumb';

export interface IBreadcrumbProps {
  actions?: React.ReactNode;
}

/**
 * A component to show breadcrumbs. All its children will be wrapped in a tag
 * that will automatically handle the active/inactive state by setting the
 * appropriate class to the wrapper.
 *
 * It's suggested to use only anchors or spans as children node.
 */
export const Breadcrumb: React.FunctionComponent<IBreadcrumbProps> = ({
  actions,
  children,
}) => {
  const items = React.Children.toArray(children).filter(c => c);
  const count = items.length;
  return (
    <AppBreadcrumb>
      <Level gutter={'md'}>
        <LevelItem>
          <PFBreadcrumb>
            {items.map((c, idx) => (
              <BreadcrumbItem key={idx} isActive={idx === count - 1}>
                {c}
              </BreadcrumbItem>
            ))}
          </PFBreadcrumb>
        </LevelItem>
        {actions && <LevelItem>{actions}</LevelItem>}
      </Level>
    </AppBreadcrumb>
  );
};
