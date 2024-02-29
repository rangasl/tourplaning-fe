import React from 'react'

const SelectedTrip = () => {
  return (
    <div class="flex flex-row mt-11">
        <div class="basis-1/5"></div>
        <div class="basis-3/5">
            <div className="bg-white rounded-lg shadow-md p-8">
                <div class="gap-8 columns-2 ...">
                    <div class="w-full aspect-square"> 
                        <div  class="flex justify-center pt-11">
                            <button> Place 01 </button>
                        </div>
                    </div>
                    <div class="w-full aspect-square"> 
                        <div  class="flex justify-center pt-11">
                            Place Name
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="basis-1/5"></div>
    </div>

  )
}

export default SelectedTrip
