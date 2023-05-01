
const Blend = () => {
  return (
<>
<h1 className="heading">Our Services</h1>
<div className="blend-container py-16 mt-12 mb-24 text-white flex justify-center -space-x-14 sm:flex-col sm:justify-center sm:items-center sm:-space-y-14">
  <div className="blend-cards bg-blue-900 flex flex-col">
    <h1 className='bg-blue-900 text-3xl w-3/4 text-center font-extrabold'>Dine In</h1>
    <h1 className='ave-font bg-blue-900 text-3xl w-3/4 text-center font-bold mt-2'>Experience tradition</h1>
  </div>
  <div className="blend-cards bg-green-900 flex flex-col sm:relative left-7">
  <h1 className='bg-green-900 text-3xl w-3/4 text-center font-extrabold'>Take Out</h1>
  <h1 className='ave-font bg-green-900 text-3xl w-3/4 text-center font-bold mt-2'>Enjoy it to-go!</h1>
  </div>
  <div className="blend-cards bg-red-900 flex flex-col sm:relative left-7">
  <h1 className='bg-red-900 text-3xl w-3/4 text-center font-extrabold'>Catering</h1>
  <h1 className='ave-font bg-red-900 text-3xl w-3/4 text-center font-bold mt-2'>Show off your taste!</h1>
  </div>
</div>
</>
  )
}

export default Blend
