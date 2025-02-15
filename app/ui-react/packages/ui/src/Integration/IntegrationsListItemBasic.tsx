import { ListView } from 'patternfly-react';
import * as React from 'react';

export interface IIntegrationsListItemBasicProps {
  integrationName: string;
  checkboxComponent?: React.ReactNode;
  additionalInfo: string;
}

export class IntegrationsListItemBasic extends React.Component<
  IIntegrationsListItemBasicProps
> {
  public render() {
    const { checkboxComponent, integrationName, additionalInfo } = this.props;
    return (
      <ListView.Item
        checkboxInput={checkboxComponent || undefined}
        heading={integrationName}
        additionalInfo={[
          <ListView.InfoItem key={1}>{additionalInfo}</ListView.InfoItem>,
        ]}
        stacked={true}
      />
    );
  }
}
