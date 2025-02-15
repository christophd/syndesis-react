import { APISummary } from '@syndesis/models';
import * as React from 'react';
import { ApiContext } from './ApiContext';
import { callFetch } from './callFetch';

export function useApiConnectorSummary(specification: string) {
  const apiContext = React.useContext(ApiContext);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<false | Error>(false);
  const [apiSummary, setApiSummary] = React.useState<APISummary | undefined>(
    undefined
  );

  React.useEffect(() => {
    const fetchSummary = async () => {
      setLoading(true);
      try {
        const response = await callFetch({
          body: {
            configuredProperties: {
              specification,
            },
            connectorTemplateId: 'swagger-connector-template',
          },
          headers: apiContext.headers,
          includeAccept: true,
          includeContentType: true,
          method: 'POST',
          url: `${apiContext.apiUri}/connectors/custom/info`,
        });
        const summary = await response.json();
        if (summary.errorCode || summary.errors) {
          throw new Error(
            summary.userMsg ||
              (summary.errors || [])
                .map((e: any) => e.message)
                .filter((m: string) => m)
                .join('\n')
          );
        }
        setApiSummary(summary as APISummary);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    };
    fetchSummary();
  }, [specification, apiContext, setLoading, setApiSummary, setError]);

  return { apiSummary, loading, error };
}

export interface ICreateConnectorProps {
  authenticationType?: string | undefined;
  authorizationEndpoint?: string;
  tokenEndpoint?: string;
  specification: string;
  name: string;
  description?: string;
  host?: string;
  basePath?: string;
  icon?: string;
}

export function useApiConnectorCreator() {
  const apiContext = React.useContext(ApiContext);

  const createConnector = async (connector: ICreateConnectorProps) => {
    const body = new FormData();
    body.append(
      'connectorSettings',
      new Blob(
        [
          JSON.stringify({
            configuredProperties: {
              authenticationType: connector.authenticationType,
              authorizationEndpoint: connector.authorizationEndpoint,
              basePath: connector.basePath,
              host: connector.host,
              specification: connector.specification,
              tokenEndpoint: connector.tokenEndpoint,
            },
            connectorTemplateId: 'swagger-connector-template',
            description: connector.description,
            icon: connector.icon,
            name: connector.name,
          }),
        ],
        { type: 'application/json' }
      )
    );
    const response = await callFetch({
      body,
      headers: apiContext.headers,
      includeAccept: true,
      includeContentType: false,
      method: 'POST',
      url: `${apiContext.apiUri}/connectors/custom`,
    });
    const integration = await response.json();
    if (integration.errorCode) {
      throw new Error(integration.userMsg);
    }
    return integration;
  };

  return createConnector;
}
