// TODO: autotomize the acquisitions of NFTs from the blockchain

export const NFTMedia = (momentFlowID: string, mediaType: string) => {
  return `https://assets.nbatopshot.com/media/${momentFlowID}/${mediaType}`;
};

export const NFTs: { [key: string]: string[] } = {
  'Lebron James': ['673595', '114023', '496849', '27148369', '974488'],
  'Giannis Antetokounmpo': ['31907', '10077829', '16480089'],
  Magic: ['37143971', '36687031', '36686122', '36686551'],
  'Devin Booker': ['34883', '36269563', '300245', '15160407'],
  'Kevin Durant': ['16218736', '826636', '35786010', '14680265'],
};
