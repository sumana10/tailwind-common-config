import React from 'react'
import {Test, Web3card} from "ui"


const page =()=> {
  return(
    <div className='h-full flex flex-col items-center justify-center'>
  <h2 className='text-white w-full max-w-sm p-4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700 my-4'>
    "Success is not the key to happiness. Happiness is the key to success. If you love what you are doing, you will be successful." - Albert Schweitzer
  </h2>
  <div className="flex items-center justify-center">
    <Test />
  </div>
</div>

  
  )
}
export default page