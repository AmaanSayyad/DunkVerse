// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import { gql } from 'graphql-request';
import { NextApiRequest, NextApiResponse } from 'next';

import { graphQLClient } from '@/constants/graphQL';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'GET') {
    const { flowid: flowId } = req.query;

    if (!flowId) {
      return res
        .status(400)
        .json({ success: false, message: 'flowId is required' });
    }

    const query = gql`
      {
        getMintedMoment(momentId: ${flowId}) {
          data {
            play {
              id
              version
              headline
              shortDescription
            }
            price
          }
        }
      }
    `;

    try {
      const data = await graphQLClient.request(query).then((res) => res);
      return res.status(200).json({ success: true, data });
    } catch (error) {
      return res.status(400).json({ success: false, error });
    }
  }
}
