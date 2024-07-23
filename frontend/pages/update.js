import UpdateProduct from '../components/UpdateProduct';

// To get info from URL have to use this page (pass in {query})
export default function UpdatePage({ query }) {
  console.log(query);
  return (
    <div>
      <UpdateProduct id={query.id} />
    </div>
  );
}
