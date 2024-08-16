import React from 'react'

function HomeComponent() {
    const boxes = [
        {
          heading: "The Impact of Technology on Communication",
          subheading: "In today's digital age, communication methods have evolved significantly. Some argue that technology has improved communication."
        },
        {
          heading: "The Role of Education in Shaping Society",
          subheading: "Education plays a crucial role in shaping individuals and societies. Some advocate for free education, while others emphasize the importance of personal responsibility."
        },
        {
          heading: "The Environmental Consequences of Urbanization",
          subheading: "As cities expand, environmental challenges arise. Urbanization affects ecosystems, air quality, and community well-being."
        },
        {
          heading: "The Value of Handwriting in the Digital Era",
          subheading: "With the decline of handwritten communication, the art of writing by hand faces challenges. Investigate the reasons behind this shift and evaluate whether it is positive or negative for individuals and society."
        },
      ];
    
      return (
        <>
    
    <div className="relative flex-1 px-20 pb-10 pt-10 text-white transform -translate-y-10">
  <div className="container mx-auto mt-[-2rem]">
    <h1 className="text-3xl font-bold bg-gradient-to-b from-white to-[#7A5A9F] bg-clip-text text-transparent mb-8">Hello, Khushi!</h1>
    <p className="text-2xl text-white mb-12">How may I assist you today?</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
      {boxes.map((box, index) => (
        <div
          key={index}
          className="border p-6 rounded-lg shadow-md text-black bg-gradient-to-b from-customTop to-customBottom overflow-hidden"
          style={{ borderColor: '#4E4D9D', height: '9rem', width: '100%' }} // Adjust the height and width as needed
        >
          <h2 className="text-xl font-semibold mb-2"
              style={{color:'#7A5A9F'}}
              >{box.heading}</h2>
          <p className="text-md text-gray-600" style={{color:"white"}}>{box.subheading}</p>
        </div>
      ))}
    </div>
  </div>
</div>

            </>
        
      );
    }
export default HomeComponent