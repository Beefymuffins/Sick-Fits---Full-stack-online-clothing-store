import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells apollo we will take care of everything
    read(existing = [], { args, cache }) {
      // console.log({ existing, args, cache });
      const { skip, first } = args;

      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count; // '?' will check if the value is there before continuing. Makes sure it don't break
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);

      // If there are items AND there aren't enough items to satisfy how many were requested AND we are on the last page THEN just send it
      if (items.length && items.length !== first && page === pages) {
        return items;
      }
      if (items.length !== first) {
        // We don't have any items, we must go to the network to fetch them
        return false;
      }

      // If there are items, just return them from the cache and we don't need to go to the network
      if (items.length) {
        // console.log(
        //   `There are ${items.length} items in the cache! Gonna send them to Apollo`
        // );
        return items;
      }

      return false; // fallback to network if either if statements don't work out

      // 'args' will be the "first and skip" values. 'cache' will be the Apollo cache
      // First thing it does is ask the read function for those items
      // we can either do one of a two things
      // First thing we can do is return the items because they are already in the cache
      // The other thing we can do is to return false from here, (network request)
    },

    merge(existing, incoming, { args }) {
      const { skip, first } = args;
      // This runs when the Apollo client comes back from the network with our product
      // console.log(`Merging items from the network ${incoming.length}`);
      const merged = existing ? existing.slice(0) : [];
      for (let i = skip; i < skip + incoming.length; ++i) {
        merged[i] = incoming[i - skip];
      }
      // console.log(merged);
      // Finally we return the merged items from the cache
      return merged;
    },
  };
}
