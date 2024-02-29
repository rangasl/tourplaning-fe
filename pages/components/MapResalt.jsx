import React from 'react'
import Image from 'next/image'

const MapResalt = () => {
  return (
        <div class="flex flex-row">
            <div class="basis-1/5"></div>
            <div class="basis-3/5">
                <div class="flex justify-center">map is here</div>
                
                <div className="bg-white rounded-lg shadow-md p-8">
                    <Image
                        src="/images/map.jpg" // Local image path
                        alt="map picture"
                        width={1500}
                        height={500}
                    />
                </div>
            </div>
            <div class="basis-1/5"></div>
        </div>
  )
}

export default MapResalt
