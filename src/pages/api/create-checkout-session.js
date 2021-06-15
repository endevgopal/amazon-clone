const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY)

export default async(req,res)=>{

  const{items,email} = req.body
    const transformedItems =
      items.map((item=>({
        description:item.description,
        quantity:1,
        price_data:{
          currency:'INR',
          product_data:{
            name:item.title,
            images:[item.image]
          },
          unit_amount:item.price *100
        }
      })))
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: transformedItems,
        mode: 'payment',
        success_url: `${process.env.HOST }`,
        cancel_url: 'https://example.com/cancel',
      });

}