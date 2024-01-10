import React from 'react'
import Image from 'next/image'

const Example = () => {
  return (
    <div class="flex flex-row">
            
            <div className="bg-white rounded-lg shadow-md p-8">
                <Image
                    src="/images/exampleImage.jpg" // Local image path
                    alt="map picture"
                    width={1500}
                    height={500}
                />
            </div>
        </div>
  )
}

export default Example
