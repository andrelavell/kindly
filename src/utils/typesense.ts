import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesenseInstantsearchAdapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: 'xyz123',
    nodes: [
      {
        host: 'localhost',
        port: 8108,
        protocol: 'http',
      },
    ],
  },
  additionalSearchParameters: {
    query_by: 'name,ein,city,state,category',
    facet_by: 'state,category',
    max_facet_values: 100,
  },
});

// Add a request interceptor to log search parameters
const originalSearchClient = typesenseInstantsearchAdapter.searchClient;
const wrappedSearchClient = {
  ...originalSearchClient,
  search: async (requests) => {
    // Log detailed request information
    requests.forEach((req, index) => {
      const params = new URLSearchParams(req.params);
      console.log(`Request ${index + 1} details:`, {
        indexName: req.indexName,
        filter_by: params.get('filter_by'),
        query_by: params.get('query_by'),
        q: params.get('q'),
        raw_params: req.params
      });
    });
    
    const results = await originalSearchClient.search(requests);
    
    // Log response details
    console.log('Search response details:', {
      nbHits: results.results[0].nbHits,
      hits: results.results[0].hits.slice(0, 3).map(hit => ({
        name: hit.name,
        state: hit.state,
        category: hit.category
      })),
      facets: results.results[0].facets
    });
    
    return results;
  }
};

export const searchClient = wrappedSearchClient;
