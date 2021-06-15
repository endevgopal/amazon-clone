import Header from '../components/Header';
import Image from 'next/image';
import { useSelector } from 'react-redux';
import { selectItems, TotalItems } from '../slices/basketSlice';
import CheckOutProduct from '../components/checkoutproduct';
import Currency from 'react-currency-formatter';
import { useSession } from 'next-auth/client';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
const stripePromise = loadStripe(process.env.stripe_public_key);

import { motion } from 'framer-motion';

function Checkout() {
  const items = useSelector(selectItems);
  const total = useSelector(TotalItems);
  const [session] = useSession();

  const stipeSessionCreate = async () => {
    const stripe = await stripePromise;

    const response = axios.post('/api/create-checkout-session', {
      items: items,
      email: session.user.email,
    });
  };

  return (
    <div className="bg-gray-100">
      <Header />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="lg:flex max-w-screen-xl mx-auto"
      >
        <div className="flex-grow m-5 sha dow-sm ">
          <Image
            src="https://links.papareact.com/ikj"
            width={1020}
            height={250}
            objectFit="container"
          />

          <div className="flex flex-col p-5 space-y-5 shadow-md bg-white rounded-md">
            <h1 className=" font-bold md:text-3xl border-b pb-4">
              {items.length === 0 ? ' Your Basket is empty' : 'Shopping Basket'}
            </h1>

            {items.map((item, i) => (
              <CheckOutProduct
                key={i}
                id={item.id}
                title={item.title}
                rating={item.rating}
                description={item.description}
                image={item.image}
                hasPrime={item.hasPrime}
                price={item.price}
                category={item.category}
              />
            ))}
          </div>
        </div>

        <div className="flex flex-col bg-white p-10 my-5 shadow-md rounded-md">
          {items.length > 0 && (
            <>
              <h2 className="whitespace-nowrap">
                Subtotal {items.length} items :
                <span className="font-bold">
                  <Currency quantity={total} currency="INR" />
                </span>
              </h2>
              <button
                role="link"
                onClick={stipeSessionCreate}
                className={`button ${!session && 'cursor-not-allowed'}`}
                disabled={!session}
              >
                {!session ? 'Sign In to checkOut' : 'Proceed To checkout'}
              </button>
            </>
          )}
        </div>
      </motion.main>
    </div>
  );
}

export default Checkout;
