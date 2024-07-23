import { useRouter } from 'next/dist/client/router';
import Form from './styles/Form';
import { useUser } from './User';

export default function Account() {
  const user = useUser();
  const router = useRouter();

  const handleClick = () => {
    router.push({
      pathname: '/orders',
    });
  };

  return (
    <Form>
      <fieldset aria-busy="false" />
      <h1>Welcome Back, {user.name}!</h1>
      <p>Account Email: {user.email}</p>
      <button type="submit" onClick={handleClick}>
        Recent Orders
      </button>
    </Form>
  );
}
