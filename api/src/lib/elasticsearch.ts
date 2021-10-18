import { Client } from '@elastic/elasticsearch'

export const esClient = new Client({
  node: `http://${process.env.ES_HOST}:9200`,
})