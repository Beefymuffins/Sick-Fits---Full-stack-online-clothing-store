import gql from 'graphql-tag';
import { useQuery, useMutation } from '@apollo/client';
import Form from './styles/Form';
import DisplayError from './ErrorMessage';
import useForm from '../lib/useForm';

const SINGLE_PRODUCT_QUERY = gql`
  query SINGLE_PRODUCT_QUERY($id: ID!) {
    Product(where: { id: $id }) {
      id
      name
      description
      price
    }
  }
`;

const UPDATE_PRODUCT_MUTATION = gql`
  mutation UPDATE_PRODUCT_MUTATION(
    # will take in the following
    $id: ID!
    $name: String
    $description: String
    $price: Int
  ) {
    # call the updateProduct function. "updateProduct" is a Graphql function
    updateProduct(
      id: $id
      data: { name: $name, description: $description, price: $price }
    ) {
      # Then return the following
      id
      name
      description
      price
    }
  }
`;

export default function UpdateProduct({ id }) {
  // 1. We need to get the existing product
  const { data, error, loading } = useQuery(SINGLE_PRODUCT_QUERY, {
    variables: { id },
  });

  // 2. We need to get the mutation to update the project
  const [
    updateProduct,
    // destructure and rename data, error, loading so you can reuse them here
    { data: updateData, error: updateError, loading: updateLoading },
  ] = useMutation(UPDATE_PRODUCT_MUTATION);

  // 2.5 Create some state for th form inputs:
  const { inputs, handleChange, clearForm, resetForm } = useForm(data?.Product);

  if (loading) return <p>Loading...</p>;

  // 3. We need the form to handle the updates
  return (
    <Form
      onSubmit={async (e) => {
        e.preventDefault();
        const res = await updateProduct({
          variables: {
            id,
            name: inputs.name,
            description: inputs.description,
            price: inputs.price,
          },
        }).catch(console.error);
        // console.log(res);
        // Submit the input fields to the backend
        // TODO: Handle Submit!
        // await createProduct();
        // const res = await createProduct();
        // clearForm();
        // // Automatically go to that products page after clicking submit
        // Router.push({
        //   pathname: `/product/${res.data.createProduct.id}`,
        // });
      }}
    >
      <DisplayError error={error || updateError} />
      <fieldset disabled={updateLoading} aria-busy={updateLoading}>
        <label htmlFor="name">
          Name
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Name"
            value={inputs.name}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price">
          Price
          <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            value={inputs.price}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="description"
            value={inputs.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Product</button>
      </fieldset>
    </Form>
  );
}
