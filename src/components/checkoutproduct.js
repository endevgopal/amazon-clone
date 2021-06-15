import { StarIcon } from '@heroicons/react/solid';
import Image from 'next/image';
import Currency from 'react-currency-formatter';
import { useDispatch, useSelector } from 'react-redux';
import {addToBasket,removeFromBasket} from '../slices/basketSlice'

function CheckOutProduct({
  id,
  title,
  rating,
  description,
  image,
  hasPrime,
  price,
  category,
}) {
   const dispatch = useDispatch()
    

  const addItemToBasket =()=>{
    const product = {
      title,
      price,
      description,
      category,
      id,
      image,
      hasPrime,
    };
    dispatch(addToBasket(product));
  }

  const removeItem =()=>{
    dispatch(removeFromBasket({id}));
  }
  return (
    <div className="grid grid-cols-5">
      <Image src={image} height={200} width={200} objectFit="contain" />
      <div className="col-span-3 mx-5">
        <p>{title}</p>
        <div className="flex">
          {Array(rating)
            .fill()
            .map((_, i) => (
              <StarIcon className="h-5 text-yellow-500" />
            ))}
        </div>

        <p className="text-xs my-2 line-clamp-3 ">{description}</p>
        <Currency quantity={price} currency="INR" />
        {hasPrime && (
          <div className="flex items-center space-x-2">
            <img className="w-12" src="https://links.papareact.com/fdw" />
            <p className="text-xs text-gray-500">FREE Next-day Delivery</p>
          </div>
        )}
      </div>
      <div className="flex flex-col space-y-2 my-auto justify-items-end">
        <button className="button mt-auto" onClick={addItemToBasket}>
          Add To Basket
        </button>
        <button className="button mt-auto" onClick={removeItem}>
          Remove from Basket
        </button>
      </div>
    </div>
  );
}

export default CheckOutProduct;
